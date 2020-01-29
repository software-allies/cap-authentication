import { Injectable, Optional } from '@angular/core';
@Injectable()
export class ConfigService {

  domain: string;
  clientId: string;
  clientSecret: string;

  constructor(@Optional() config: any) {
    if (config) {
      this.domain = config.domain;
      this.clientId = config.clientId;
      this.clientSecret = config.clientSecret;
    }
  }
}
