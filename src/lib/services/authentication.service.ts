import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService } from './config.service';
import { StateService } from './state.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private cookiesIndex: string = 'logged_in';

  constructor(
    private configService: ConfigService,
    private stateService: StateService,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) { }


  /**
   *
   * Stores the object it receives in cookies
   * @param session Object
   */
  saveSessionInCookies(session: object): void {
    let dateNow = new Date();
    dateNow.setUTCHours(dateNow.getUTCHours() + 10);
    this.cookieService.set(this.cookiesIndex, JSON.stringify(session),{expires:dateNow});
    this.saveCurrentUserAll(session);
  }

  /**
   * Function that receives the cookies field and if it finds it returns it, otherwise it will return false by exception of 'email_verified'
   * @param item : 'user' | 'email' | 'email_verified' | 'token' | 'refresh_token' | 'token_id' | 'id' | 'cap_uuid'
   */
  getItemFromCookies(item: 'user' | 'email' | 'email_verified' | 'token' | 'refresh_token' | 'token_id' | 'id' | 'cap_uuid') {
    if (this.cookieService.check(this.cookiesIndex)){
      let cookies: object = JSON.parse(this.cookieService.get(this.cookiesIndex));
      return cookies[item];
    } else return false
  }

  /**
   * GuardServices
   */
  userIsLogged(): boolean {
    let status = this.cookieService.check(this.cookiesIndex);
    if (status) {
      if (isNullOrUndefined(this.stateService.state.isLogged) || !this.stateService.state.isLogged) {
        let credentials = JSON.parse(this.cookieService.get(this.cookiesIndex));
        this.saveCurrentUserAll(credentials);
      }
    } else this.stateService.setState('isLogged', status);
    return status;
  }

  /**
   *
   * Apply in the app.component.ts
   *
   *  constructor( private authenticationService:AuthenticationService) {
   *    this.run();
   *  }
   *
   *  async run() {
   *    this.showMenu = await this.authenticationService.initialLoading();
   *  }
   */
  initialLoading(): boolean{
    let status = this.cookieService.check(this.cookiesIndex);
    if (status) {
      let credentials = JSON.parse(this.cookieService.get(this.cookiesIndex));
      this.saveCurrentUserAll(credentials);
    } else this.stateService.setState('isLogged', status);
    return true;
  }

  saveCurrentUserAll(userInformation) {
    this.stateService.setAllState({
      isLogged: true,
      email_verified: userInformation.email_verified,
      user: userInformation.user,
      email: userInformation.email,
      uuid: userInformation.cap_uuid,
      uid: userInformation.id
    });
  }

  /**
   * Deprecated
   * @param user
   */
  saveCurrentUser(user: {}) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('User', JSON.stringify(user));
      this.stateService.setState('isLogged', true);
    }
  }

  /**
   * Deprecated
   */
  isUserLoggedIn(): boolean | void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('User')) {
      const userStorage = JSON.parse(localStorage.getItem('User'));
      const helper = new JwtHelperService();
      if (!helper.isTokenExpired(userStorage.token)) {
        return true;
      } else {
        this.refreshToken(userStorage.refresh_token).subscribe((token: any) => {
          if (token) {
            this.saveCurrentUser({
              user: userStorage.user,
              email: userStorage.email,
              refresh_token: userStorage.refresh_token,
              token: token.access_token,
              token_id: token.id_token,
              id: userStorage.id
            });
            return true;
          }
        }, (error) => {
          console.log(error);
          return false;
        });
      }
    } else {
      return false;
    }
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('User')) {
      return JSON.parse(localStorage.getItem('User')).token;
    }
  }

  getExternalID() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('User')) {
      return JSON.parse(localStorage.getItem('User')).cap_uuid;
    }
  }

  private getCredentials() {
    return {
      client_id: `${this.configService.clientId}`,
      client_secret: `${this.configService.clientSecret}`,
      audience: `${this.configService.domain}/api/v2/`,
      grant_type: 'client_credentials'
    };
  }

  getAuth0Token(): Observable<string> {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    const httpParams = this.getCredentials();
    return this.http.post(`${this.configService.domain}/oauth/token`, httpParams, httpOptions)
      .pipe(
        map((data: any) => {
          return data.access_token;
        })
      );
  }

  getAuth0UserInfo(token: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/userinfo`, httpOptions);
  }

  getUserInfo(token: string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/userinfo`, httpOptions);
  }

  getUser(id: string, token: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/api/v2/users/${id}`, httpOptions);
  }

  refreshToken(refreshToken: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    const httpParams = new HttpParams().append('grant_type', 'refresh_token')
                                  .append('client_id', `${this.configService.clientId}`)
                                  .append('client_secret', `${this.configService.clientSecret}`)
                                  .append('refresh_token', `${refreshToken}`);
    return this.http.post(`${this.configService.domain}/oauth/token`, httpParams, httpOptions);
  }

  createUser(user: any, accessToken?: string)  {
    const User = {
      email: `${user.email}`,
      password: `${user.password}`,
      email_verified: false,
      name: `${user.firstName}`,
      family_name: `${user.lastName}`,
      nickname: `${user.lastName}`,
      connection: 'Username-Password-Authentication',
      verify_email: true,
      user_metadata: {
        CAP_UUID: uuidv4()
      },
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      })
    };
    return this.http.post(`${this.configService.domain}/api/v2/users`, User, httpOptions);
  }

  loginUser(user: any) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      })
    };
    const httpParams = new HttpParams().append('username', `${user.email}`)
                                .append('password', `${user.password}`)
                                .append('audience', `${this.configService.domain}/api/v2/`)
                                .append('scope', 'openid profile email offline_access')
                                .append('client_id', `${this.configService.clientId}`)
                                .append('client_secret', `${this.configService.clientSecret}`)
                                .append('realm', 'employees')
                                .append('grant_type', 'password');
    return this.http.post(`${this.configService.domain}/oauth/token`, httpParams, httpOptions);
  }


  /**
   * Remplazar por signOutAux()
   */
  signOutAux() {
    if (this.cookieService.check(this.cookiesIndex)) {
      this.cookieService.delete(this.cookiesIndex);
      this.stateService.setState('isLogged', false);
      this.router.navigate(['/']);
    } else {
      this.stateService.setState('isLogged', false);
      this.router.navigate(['/']);
    }
  }

  /**
   * Remplazar por signOutAux()
   */
  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('User')) {
        const token = JSON.parse(localStorage.getItem('User')).token;
        const httpParams = new HttpParams().append('client_id', `${this.configService.clientId}`)
        .append('returnTo', `http://localhost:4200`);

        this.http.get(`${this.configService.domain}/v2/logout`, {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`
          },
          params: httpParams
        })
        .subscribe(() => {
          console.log('LogOut');
        });
        localStorage.removeItem('User');
      }
      // Set isLogged State to false
      this.stateService.setState('isLogged', false);
      this.router.navigate(['/']);
    }
  }

  changePassword(email: any) {
    const User = {
      email: `${email}`,
      connection: 'Username-Password-Authentication',
    };
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json',
      })
    };
    return this.http.post(`${this.configService.domain}/dbconnections/change_password`, User, httpOptions);
  }

  updateProfile(user: any, id: string, token: string) {
    const httpParams = new HttpParams() .append('name', `${user.firstname}`)
                                        .append('family_name', `${user.lastname}`)
                                        .append('nickname', `${user.nickname}`);
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.patch(`${this.configService.domain}/api/v2/users/${id}`, httpParams, httpOptions);
  }

  verifyEmail(userId: string, token: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    const User = {
      user_id: `${userId}`,
    };
    return this.http.post(`${this.configService.domain}/api/v2/jobs/verification-email`, User, httpOptions);
  }

  createUserDB(user: any, token: string, authId: string, uuid: string) {
    if (this.configService.endPoint) {
      const userData = {
        SACAP__UUID__c: uuid,
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        Company: user.company,
        Type: 'Auth0',
        ExternalId: authId
      };
      const httpOptions = {
        headers : new HttpHeaders({
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
      this.http.post(`${this.configService.endPoint}`, userData, httpOptions).subscribe((User: any) => {
        console.log('user created successfully.');
      }, (error) => {
        console.log(error);
      });
    }
  }

  searchUserByEmail(email: string, token: string) {
    const httpParams = new HttpParams() .append('email', `${email}`);
    return this.http.get(`${this.configService.domain}/api/v2/users-by-email`, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`
      },
      params: httpParams
    });
  }

  getUserFromEndPoint(filter: object): Observable<Array<any>>{
      const httpOptions = {
        headers : new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`
        })
      };
      const url = `${this.configService.endPoint}?filter=${JSON.stringify(filter)}`;
      return this.http.get<[any]>(url)
  }

  getUserFromAPI(id: string) {
    if (this.ApiToConsult()) {
      let filter = {
        where: {ExternalId:id},
      };
      const url = `${this.configService.endPoint}?filter=${JSON.stringify(filter)}`;
      const httpOptions = {
        headers : new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`
        })
      };
      return this.http.get(url, httpOptions);
    }
  }

  updateProfileFromAPI(uuid: string, data: object) {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`
      })
    };
    return this.http.patch(`${this.configService.endPoint}/${uuid}`, data, httpOptions);
  }

  ApiToConsult(): boolean {
    return this.configService.endPoint ? true : false;
  }
}
