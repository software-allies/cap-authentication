import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import Uuidv4 from 'uuid/v4';

@Injectable()
export class AuthenticationAuth0Service {
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId,
  ) {}

  saveCurrentUSer(user: {}) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('User', JSON.stringify(user));
    }
  }

  isUserLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('User')) {
      let userStorage = JSON.parse(localStorage.getItem('User'));
      const helper = new JwtHelperService();
      if (!helper.isTokenExpired(userStorage.token)) {
        return true;
      } else {
        this.refreshToken(userStorage.refresh_token).subscribe((token: any) => {
          if (token) {
            this.saveCurrentUSer({
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

  getCredentials() {
    return {
      'client_id': `${this.configService.clientId}`,
      'client_secret': `${this.configService.clientSecret}`,
      'audience': `${this.configService.domain}/api/v2/`,
      'grant_type': 'client_credentials'
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
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/userinfo`, httpOptions);
  }

  createUser(user: any, access_token?: string)  {
    let User = {
      email: `${user.email}`,
      password: `${user.password}`,
      email_verified: false,
      name: `${user.firstName}`,
      family_name: `${user.lastName}`,
      nickname: `${user.lastName}`,
      connection: 'Username-Password-Authentication',
      verify_email: true
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${access_token}`
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

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('User')) {
          const token = JSON.parse(localStorage.getItem('User')).token;
          const httpParams = new HttpParams().append('client_id', `${this.configService.clientId}`)
          .append('returnTo', `http://localhost:4200`);

          this.http.get(`${this.configService.domain}/v2/logout`, {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            },
            params: httpParams
          })
          .subscribe((user: any) => {
            console.log(user, 'LogOut');
          });

        localStorage.removeItem('User');
      }
    }
  }

  getUser(id: string, token: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/api/v2/users/${id}`, httpOptions);
  }

  getUserInfo(token: string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/userinfo`, httpOptions);
  }


  changePassword(user: any) {
    const User = {
      email: `${user.email}`,
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
    const httpParams = new HttpParams() .append('name', `${user.name}`)
                                        .append('family_name', `${user.family_name}`)
                                        .append('nickname', `${user.nickname}`);
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.patch(`${this.configService.domain}/api/v2/users/${id}`, httpParams, httpOptions);
  }

  verifyEmail(userId: string, token: string) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const User = {
      user_id: `${userId}`,
    };
    return this.http.post(`${this.configService.domain}/api/v2/jobs/verification-email`, User, httpOptions);
  }

  createUserDB(user: any, token: string, authId: string) {
    if (this.configService.endPoint) {
      let userData = {
        UUID__c: Uuidv4(),
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        Company: user.company,
        Type:'Auth0',
        ExternalId: authId
      };
      const httpOptions = {
        headers : new HttpHeaders({
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      this.http.post(`${this.configService.endPoint}`, userData, httpOptions).subscribe((User: any) => {
        console.log('user created successfully.');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
