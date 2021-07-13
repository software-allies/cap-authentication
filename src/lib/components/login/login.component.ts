import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-login',
  template: `
<div class="register">
  <div class="register__form">
    <div class="form-container">

      <form [formGroup]="loginUserForm" (ngSubmit)="loginUser()" class="form">
        <div class="form__group">
          <input
            id="email"
            type="email"
            class="form__input u-border-light"
            placeholder="Email adress"
            formControlName="email"
            [ngClass]="{
              'invalidField':(!loginUserForm.get('email').valid && loginUserForm.get('email').touched) || (validatedForm && !loginUserForm.get('email').valid)
            }"
          >
          <label for="email" class="form__label">Email adress</label>
        </div>
        <div class="form__group">
          <input
            id="password"
            type="password"
            class="form__input u-border-light"
            placeholder="Password"
            formControlName="password"
            [ngClass]="{
              'invalidField':(!loginUserForm.get('password').valid && loginUserForm.get('password').touched)
              || (validatedForm && !loginUserForm.get('password').valid)
            }"
          >
          <!-- <small class="form-text">
            <a routerLink="/auth/forgot-password"> Forgot password? </a>
          </small> -->
          <label for="password" class="form__label">Password</label>
        </div>

        <div style="padding:0rem 2rem;width: 100%;">
          <label id="form__label__error" class="form__label__error">
          </label>
        </div>
        <div style="padding:0rem 2rem;width: 100%;">
          <label id="form__label__succeses" class="form__label__succeses">
          </label>
        </div>

        <a class="form__group" routerLink="{{redirectForgotPassword}}"> Forgot password? </a>

        <div class="button-container">
          <button type="submit" class="btns btns--blue">Login</button>
        </div>
      </form>
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
.invalidField {
  border-color:#dc3545!important;
}
label {
  margin-bottom: 0rem!important;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthLoginComponent implements OnInit {

  public loginUserForm: FormGroup;
  public validatedForm: boolean = false;

  /**
   * Inputs & Outputs
   */
  @Input() titleComponent? = 'Create your Account';
  @Input() redirectAfterTo?: string = '/';
  @Input() redirectForgotPassword?: string = '/';

  @Output() userLoginData = new EventEmitter();
  @Output() userLoginError = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginUserForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginUser() {
    if (this.loginUserForm.valid) {
      this.authenticationService.loginUser(this.loginUserForm.value).subscribe((token: any) => {
        this.authenticationService.getUserInfo(token.access_token).subscribe((userinfo: any) => {
          this.authenticationService.getUser(userinfo.sub, token.access_token).subscribe((user: any) => {
            this.userLoginData.emit(userinfo);
            this.authenticationService.saveSessionInCookies({
              user: user.name,
              email: user.email,
              email_verified: user.email_verified,
              refresh_token: token.refresh_token,
              token: token.access_token,
              token_id:  token.id_token,
              id: user.user_id,
              cap_uuid: user.user_metadata.CAP_UUID
            })
            this.router.navigate([this.redirectAfterTo]);
          });
        });
      }, (error) => {
        this.showErrorMessage('#form__label__error', error.error.error_description);
        this.userLoginError.emit(error);
      });
    } else this.validatedForm = true;
  }

  showErrorMessage(element: string, textMessage, disappear: boolean = true) {
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
}
