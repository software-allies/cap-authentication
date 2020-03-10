import { Injectable, ApplicationRef } from '@angular/core';

@Injectable()
export class StateService {

  state = {
    isLogged: false
  };

  constructor(private app: ApplicationRef) {}

  setState(key, value) {
    this.state = { ...this.state, [key]: value };
    // Run change detection on state change
    this.app.tick();
  }
}
