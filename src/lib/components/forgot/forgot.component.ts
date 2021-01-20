import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-forgot-password',
  template: `
<div class="box">
  <div>
    <form [formGroup]="changeform" (ngSubmit)="forgorPassword()">
      <div class="form-group">
        <label for="email" *ngIf="!emailSend" class="col-12  text-center col-form-label">
          Enter your email address and we will send you a link to reset your password.
        </label>
        <label for="email" *ngIf="emailSend" class="col-12  text-center col-form-label">
          An e-mail was sent to your email address that you provided, there you can change your password.
        </label>
        <label for="email" *ngIf="errorEmailSend" class="col-12 text-danger text-center col-form-label">
          an error occurred with the server when checking your email, try again later.
        </label>
        <label for="email" *ngIf="userNotFound" class="col-12 text-danger text-center col-form-label">
          There is none account using this email address.
        </label>
        <input *ngIf="!emailSend"
          [ngClass]="{
            'invalidField':validatedForm
          }"
          class="form-control"
          type="email"
          id="email"
          email
          placeholder="Email address *"
          formControlName="email">
        <small id="passwordHelpBlock" class="form-text text-center text-muted">
        </small>
      </div>
      <button *ngIf="!emailSend" type="submit" class="btn btn-primary btn-block">Send Email</button>
      <button *ngIf="emailSend" type="button" (click)="goToHome()" class="btn btn-secondary btn-block">Go to Home</button>
    </form>
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
  width: 450px;
  margin: 40px;
}
.invalidField{
  border-color:#dc3545;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthForgotPasswordComponent implements OnInit {

  changeform: FormGroup;
  emailSend: boolean;
  errorEmailSend: boolean;
  validatedForm: boolean;
  userNotFound: boolean;

  @Output() userEmail = new EventEmitter();
  @Output() forgotPasswordRequest = new EventEmitter();
  @Output() forgotPasswordRequestError = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.emailSend = false;
    this.errorEmailSend = false;
    this.validatedForm = false;
    this.userNotFound = false;
  }

  ngOnInit() {
    this.changeform = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  forgorPassword() {
    if (this.changeform.valid) {
      this.userEmail.emit(this.changeform.get(['email']).value);
      this.authenticationService.getAuth0Token().subscribe((token: any) => {
        this.authenticationService.searchUserByEmail(this.changeform.get(['email']).value, token)
            .subscribe((user: any) => {
              if (user.length) {
                this.authenticationService.changePassword(this.changeform.get(['email']).value)
                  .subscribe((response: any) => this.forgotPasswordRequest.emit(true),
                    (error) => {
                      if (error.status === 200) {
                        this.emailSend = true;
                        this.forgotPasswordRequest.emit(true);
                      } else if (error.status > 400) {
                        this.forgotPasswordRequestError.emit(error);
                        this.errorEmailSend = true;
                      }
                  });
                this.userNotFound = false;
              } else {
                this.forgotPasswordRequestError.emit({
                  message: 'A registered user was not found with that email',
                  status: 404
                });
                this.userNotFound = true;
              }
            },
            (error) => {
              this.userNotFound = true;
              this.errorEmailSend = true;
              this.forgotPasswordRequestError.emit(error);
            });
      });

    } else {
      this.validatedForm = true;
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
