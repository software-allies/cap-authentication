import { Injectable, Optional } from '@angular/core';
@Injectable()
export class ConfigService {

  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;

  constructor(@Optional() config: any) {
    if (config) {
      this.apiKey = config.apiKey;
      this.authDomain = config.authDomain;
      this.databaseURL = config.databaseURL;
      this.projectId = config.projectId;
      this.storageBucket = config.storageBucket;
      this.messagingSenderId = config.messagingSenderId;
      this.appId = config.appId;
      this.measurementId = config.measurementId;
    }
  }
}
