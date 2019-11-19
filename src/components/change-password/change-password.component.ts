import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: "cap-change-password-firebase",
  template: `
  <div class="container register-form">
    <div class="form">
      <div class="header">
          <p>Forgot Password</p>
      </div>

      <form [formGroup]="changeform" (ngSubmit)="forgorPassword()">
        <div class="form-content">
          <div class="form-group d-flex justify-content-center row">
            <label *ngIf="!emailSend" class="col-12  text-center col-form-label">
              Enter your email address and we will send you a link to reset your password.
            </label>
            <label *ngIf="emailSend" class="col-12  text-center col-form-label">
              An e-mail was sent to your email address that you provided, there you can change your password.
            </label>
            <div class="col-4">
              <input  *ngIf="!emailSend"
                      class="form-control"
                      type="email"
                      placeholder="Email address"
                      formControlName="email">
              <small id="passwordHelpBlock" class="form-text text-center text-muted">
              </small>
              <button *ngIf="!emailSend" type="submit" class="btnSubmit">Edit Profile</button>
              <button *ngIf="emailSend" type="button"  (click)="goToHome()" class="btnSubmit">Go to Home</button>
            </div>
          </div>
        </div>
      </form>

    </div>
  </div>
  `,
  styles: [`
.header
{
  text-align: center;
  height: 50px;
  background: black;
  color: #fff;
  font-weight: bold;
  line-height: 50px;
}
.form-content
{
  min-height: 150px;
  padding: 5%;
  border: 1px solid #ced4da;
  margin-bottom: 2%;
}
.form-control{
  border-radius:1.5rem;
}
.btnSubmit
{
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 100%;
  cursor: pointer;
  background: black;
  color: #fff;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthChangePasswordComponent {

  changeform: FormGroup;
  emailSend: boolean;
  errorEmailSend: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.emailSend = false;
    this.errorEmailSend = false;
    this.changeform = new FormGroup({
      'email': new FormControl('', [Validators.required]),
    });
  }

  forgorPassword() {
    if (this.changeform.valid) {
      this.authenticationService.resetPassword(this.changeform.get('email').value).then((user) => {
        this.emailSend = true;
      }).catch(error => this.errorEmailSend = true);
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
