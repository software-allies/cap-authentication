// import { SocialMediaService } from '../../services/social-media.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'auth-app-log-out',
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

export class logOutComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.signOut();
  }

  ngOnInit() {
    this.router.navigate(['/']);
  }

}
