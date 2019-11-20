import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';

import { Router } from '@angular/router';

@Component({
  selector: "cap-change-password-auth0",
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
            <label *ngIf="errorEmailSend" class="col-12 text-danger text-center col-form-label">
              an error occurred with the server when checking your email, try again later
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
export class AuthChangePasswordComponent implements OnInit {

  changeform: FormGroup;
  emailSend: boolean;
  errorEmailSend: boolean;
  email: string;

  constructor(
    private authenticationAuth0Service: AuthenticationAuth0Service,
    private router: Router,
  ) {
    this.emailSend = false;
    this.errorEmailSend = false;
  }

  ngOnInit() {
    this.changeform = new FormGroup({
      'email': new FormControl('', [Validators.required]),
    });
  }

  forgorPassword() {
    if (this.changeform.valid) {
      this.authenticationAuth0Service.changePassword(this.changeform.value).subscribe((response: any) => {
      }, (error) => {
        if (error.status === 200) {
          this.emailSend = true;
        } else if (error.status > 400) {
          this.errorEmailSend = true;
        }
      });
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
