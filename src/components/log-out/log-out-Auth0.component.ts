import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.logOutUser();
  }

  ngOnInit() { }

  logOutUser() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('User')) {
      console.log('dentro');
      localStorage.removeItem('User');
    }
    this.router.navigate(['/']);
  }

}
