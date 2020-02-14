import { Injectable, Optional } from '@angular/core';
import { IConfig } from '../interfaces/config.interface';
@Injectable()
export class ConfigService {

  domain: string;
  clientId: string;
  clientSecret: string;
  endPoint: string;

  constructor(@Optional() config: IConfig) {
    if (config) {
      this.domain = config.domain;
      this.clientId = config.clientId;
      this.clientSecret = config.clientSecret;
      this.endPoint = config.endPoint;
    }
  }
}
