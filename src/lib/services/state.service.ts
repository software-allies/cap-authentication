import { Injectable, ApplicationRef } from '@angular/core';

@Injectable()
export class StateService {

  state = {
    email_verified: null,
    isLogged: null,
    user: null,
    email: null,
    uuid: null,
    uid: null
  };

  constructor(private app: ApplicationRef) {}

  setState(key, value) {
    this.state = { ...this.state, [key]: value };
    this.app.tick();
  }

  setAllState(userState) {
    this.state = {... userState};
    this.app.tick();
  }
}
