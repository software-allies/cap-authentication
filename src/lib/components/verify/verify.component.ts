import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-verify-firebase',
  template: `
<div class="box">
  <div>
    <div *ngIf="status">
      <div class="form-content">
        <div class="form-group d-flex justify-content-center row text-center">
          <label *ngIf="!emailSend" class="col-12 text-center col-form-label">
            Please verify your Account
          </label>
          <label *ngIf="emailSend" class="col-12 text-center col-form-label">
            An e-mail was sent to your email address that you provided, there you can verify your email.
          </label>
          <label *ngIf="errorEmailSend" class="col-12 text-danger text-center col-form-label">
            An error occurred with the server when checking your email, try again later
          </label>
          <div class="col-12 mb-4 text-center">
            <button type="submit" (click)="emailToVerifySent()" class="btn btn-success btn-block btnSubmit">Send verification email</button>
          </div>
          <label class="col-12 text-center col-form-label">
            Weather the account have been verified, please click the button.
          </label>
          <div class="col-12 text-center">
            <button type="button" (click)="VerifiedAccount()" class="btn btn-success btn-block btnSubmit"> Verified Account </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box>div {
    height: max-content;
    border-radius: 10px;
    border: 1px solid #f2f2f2;
    padding: 35px;
    width: 650px;
    margin: 40px;
  }

  .box .list-group-item {
    background-color: transparent;
  }

  .invalidField{
    border-color:#dc3545;
  }
  button {
    outline: none;
  }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthVerifyComponent implements OnInit {

  @Output() userProfileData = new EventEmitter();
  @Output() userProfileError = new EventEmitter();
  @Output() userProfileVerify = new EventEmitter();
  @Output() forwardedMail = new EventEmitter();
  @Output() forwardedMailError = new EventEmitter();
  @Input() redirectTo?: string = '/';

  emailSend: boolean;
  errorUpdate: boolean;
  errorEmailSend: boolean;
  status: boolean;
  userId: string;
  authenticationServiceErrorMessage = 'A problem has occurred while establishing communication with the authentication service';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : this.router.navigate(['/']);
    }
    this.status = false;
    this.emailSend = false;
    this.errorUpdate = false;
    this.errorEmailSend = false;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.getUser(this.userId, token).subscribe((user: any) => {
        this.userProfileData.emit(user);
        if (user) {
          console.log(user);
          this.status = true;
          this.userProfileVerify.emit(user.emailVerified);
          if (user.email_verified) { this.router.navigate([`${this.redirectTo}`]); }
        } else {
          this.authenticationService.signOut();
        }
      }, ((error: any) => {
        console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage);
        this.userProfileError.emit(error);
      }));

    }, (error: any) => {
      console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage);
      this.userProfileError.emit(error);
    });
  }

  emailToVerifySent() {
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.verifyEmail(this.userId, token).subscribe((verify:any) => {
        this.forwardedMail.emit(verify);
        this.emailSend = true;
      });
    }, (error: any) => {
      this.forwardedMailError.emit(error);
      console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage);
    });
  }

  VerifiedAccount() {
    window.location.reload();
  }
}
