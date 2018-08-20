import { Injectable, Optional } from '@angular/core';

@Injectable()
export class ConfigService {
    
    apiUrl: string;
    loginEndpoint: string;
    facebookId: string;
    googleId: string;

    constructor(@Optional() config: ConfigService) {
        if (config) { 
            this.apiUrl = config.apiUrl;
            this.loginEndpoint = config.loginEndpoint;
            this.facebookId = config.facebookId;
            this.googleId = config.googleId;
        } 
    }
}