import { Injectable, Optional } from '@angular/core';


@Injectable()
export class ConfigService {

    apiUrl: string;
    loginEndpoint: string;

    constructor(@Optional() config: ConfigService) {
        if (config) { 
            this.apiUrl = config.apiUrl;
            this.loginEndpoint = config.loginEndpoint;
        }
    }

}