import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { CredentialsInterface } from './credentials.interface';
export declare class AuthenticationService {
    private _http;
    private _config;
    _token: string;
    isLoggedIn: boolean;
    private actionUrl;
    private httpOptions;
    constructor(_http: HttpClient, _config: ConfigService);
    login(credentials: CredentialsInterface): Observable<any>;
    changePassword(credentials: CredentialsInterface): Observable<any>;
    register(credentials: CredentialsInterface): Observable<any>;
    logout(): void;
    token(): string;
    isAuthenticated(): boolean;
    private handleError(error);
}
