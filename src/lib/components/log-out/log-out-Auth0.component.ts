import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';

@Component({
  selector: 'cap-log-out-auth0',
  template:
    `
    <div class="d-flex justify-content-center">
      <div class="spinner-grow" style="width: 6rem; height: 6rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    `,
  styles: [``],
})

export class logOutAuth0Component implements OnInit {

  constructor(
    private router: Router,
    private authenticationAuth0Service: AuthenticationAuth0Service
  ) {
    this.logOutUser();
  }

  ngOnInit() { }

  logOutUser() {
    this.authenticationAuth0Service.signOut();
    this.router.navigate(['/']);
  }

}
