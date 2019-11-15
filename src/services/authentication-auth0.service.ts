import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationAuth0Service {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getCredentials() {
    return {
      'client_id': `${this.configService.clientId}`,
      'client_secret': `${this.configService.clientSecret}`,
      'audience': `${this.configService.domain}/api/v2/`,
      'grant_type': 'client_credentials'
    };
  }

  getToken(): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
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

  createUser(user: any, accessToken: string) {
    const User = {
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
        'Authorization': `Bearer ${accessToken}`
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


  getUserInfo(token: string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.configService.domain}/userinfo`, httpOptions);
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

  editProfile(user: any, id: string, token: string) {
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

  changePassword(email: string) {
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

}
