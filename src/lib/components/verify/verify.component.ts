import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-verify-firebase',
  template: `
<div class="register">
  <div class="register__form">
    <div class="form-container">

      <div style="padding:0rem 2rem;width: 100%;">
        <label id="form__label__error" class="form__label__error"></label>
      </div>
      <div style="padding:0rem 2rem;width: 100%;">
        <label id="form__label__succeses" class="form__label__succeses">
        </label>
      </div>
      <ng-container *ngIf="!emailSend">
        <div class="col-xl-11 col-12 mb-5 mb-3 text-center">
          <button type="submit" (click)="emailToVerifySent()" class="btns btns--blue btn-block btnSubmit">Send verification email</button>
        </div>
      </ng-container>

      <div style="padding:0rem 2rem;width: 100%;">
        <label id="form__label__error__verifyed" class="form__label__error"></label>
      </div>
      <div class="col-xl-11 col-12 mt-5 my-3 text-center">
        <button type="button" (click)="VerifiedAccount()" class="btns btns--blue btn-block btnSubmit">Verified Account</button>
      </div>

    </div>
    <ng-container isString(titleComponent)>
      <div class="form-title-container text-break">
        <h2 class="heading-secondary--light u-text-uppercase u-center-text u-margin-top-small u-text-white">
          {{titleComponent}}
        </h2>
      </div>
    </ng-container>
  </div>
</div>
  `,
  styles: [`
.invalidField{
  border-color:#dc3545;
}
p {
  font-size: 1.8rem;
}
span {
  font-weight:600;
}
.invalidField {
  border-color:#dc3545;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthVerifyComponent implements OnInit {

  /**
   * Inputs & Outputs
   */
  @Output() userProfileData = new EventEmitter();
  @Output() userProfileError = new EventEmitter();
  @Output() userProfileVerify = new EventEmitter();
  @Output() forwardedMail = new EventEmitter();
  @Output() forwardedMailError = new EventEmitter();
  @Input() titleComponent? = 'Verify your account';
  @Input() redirectIfVerified?: string = '/account';


  public emailSend = false;
  public errorUpdate = false;
  public errorEmailSend = false;
  public status = false;
  public userId: string =  null;
  public userVerified: boolean = null;
  public verifiedAccount = false;
  public authenticationServiceErrorMessage = 'A problem has occurred while establishing communication with the authentication service';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userId = this.authenticationService.getItemFromCookies('id') ? this.authenticationService.getItemFromCookies('id') : this.router.navigate(['/']);
    this.userVerified = this.authenticationService.getItemFromCookies('email_verified') && this.authenticationService.getItemFromCookies('email_verified')
    if (this.userVerified) this.router.navigate([this.redirectIfVerified]);
  }

  ngOnInit() {
    if (this.userVerified) {
      this.router.navigate(['/']);
    } else this.getProfile();
  }

  getProfile(verifiedAccount: boolean = false) {
    this.verifiedAccount = false;
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.getUser(this.userId, token).subscribe((user: any) => {
        if (user) {
          this.userProfileData.emit(user);
          if (user.email_verified) this.router.navigate([this.redirectIfVerified]);
          else if (verifiedAccount) this.showMessage('#form__label__error__verifyed', 'your account has not been verified yet')
        }
      }, ((error: any) => {
        this.userProfileError.emit(error);
      }));
    }, (error: any) => {
      this.userProfileError.emit(error);
    });
  }

  showMessage(element: string, textMessage, disappear: boolean = true) {
    const messageError = document.querySelector(element) as HTMLElement;
    messageError.style.padding = '1rem 2rem';
    messageError.innerHTML = textMessage;
    messageError.style.visibility = 'visible';
    messageError.style.opacity = '1';
    if (disappear) {
      setTimeout(()=>{
        messageError.style.visibility = 'hidden';
        messageError.style.opacity = '0';
        messageError.style.padding = '.5rem 2rem';
      }, 3000);
    }
  }

  emailToVerifySent() {
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.verifyEmail(this.userId, token).subscribe((verify:any) => {
        this.emailSend = true;
        this.forwardedMail.emit(verify);
        this.showMessage('#form__label__succeses', ' An e-mail was sent to your email address that you provided.', false)
      }, (error: any) => {
        this.forwardedMailError.emit(error);
        this.showMessage('#form__label__error', 'An error occurred with the server when checking your email, try again later')
      });
    }, (error: any) => {
      this.showMessage('#form__label__error', 'An error occurred with the server when checking your email, try again later')
    });
  }

  VerifiedAccount() {
    this.getProfile(true);
  }
}
