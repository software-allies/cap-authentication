import { IConfig } from './../interfaces/config.interface';
import { Injectable, Optional } from '@angular/core';


@Injectable()
export class ConfigService {
    
    apiUrl: string;
    loginEndpoint: string;
    facebookId: string;
    googleId: string;
    firebase:any;

    constructor(@Optional() config: IConfig) {
        if (config) { 
            this.apiUrl = config.apiUrl;
            this.loginEndpoint = config.loginEndpoint;
            this.facebookId = config.facebookId;
            this.googleId = config.googleId;
            this.firebase = config.firebase;
        } 
    }
}