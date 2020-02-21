import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GuardService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate() {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
