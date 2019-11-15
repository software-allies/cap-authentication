import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.authenticationService.signOut();
    this.logOutUser();
  }

  ngOnInit() { }

  logOutUser() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('User')) {
        localStorage.removeItem('User');
      }
    }
    this.router.navigate(['/']);
  }

}
