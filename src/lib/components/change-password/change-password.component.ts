import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "cap-change-password",
  template: `
<div class="box">
  <div>
    <form [formGroup]="resetPassword" (ngSubmit)="changePassword()">

      <div class="form-group">
        <label for="passowrd">Password <span>*</span></label>
        <input
          type="password"
          id="password"
          class="form-control"
          [ngClass]="
            {'invalidField':(!resetPassword.get('password').valid && resetPassword.get('password').touched)
            || (validatedForm && !resetPassword.get('password').valid)}"
          [ngClass]="{
            'invalidField':
              (!resetPassword.get('password').valid && resetPassword.get('password').touched)
              || (validatedForm && !resetPassword.get('password').valid),
            'is-valid':resetPassword.get('password').valid
          }"
          formControlName="password"
          aria-describedby="emailHelp"
        />
        <password-strength-meter [password]="resetPassword.get('password').value"></password-strength-meter>
        <small
          *ngIf="!resetPassword.get('password').pristine && !resetPassword.get('password').valid"
          class="form-text text-center text-muted"
        >
          Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
        </small>
        <small *ngIf="!resetPassword.get('password').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
          Required field
        </small>
      </div>

      <div class="form-group">
        <label for="password">Confirm Password <span>*</span></label>
        <input
          type="password"
          id="password"
          class="form-control"
          [ngClass]="
            {'invalidField':(!resetPassword.get('confirmPassword').valid && resetPassword.get('confirmPassword').touched)
            || (validatedForm && !resetPassword.get('confirmPassword').valid)}"
          formControlName="confirmPassword"
        />
        <small *ngIf="!resetPassword.get('password').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
          Required field
        </small>
      </div>
      <div *ngIf="confirmationPassword"  class="form-control-feeback text-danger text-center">
        Passwords don't match.
      </div>

      <button type="submit" class="btn btn-primary btn-block">Reset Password</button>
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
  button {
    outline: none;
  }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthChangePasswordComponent implements OnInit {

  resetPassword: FormGroup;
  validatedForm: boolean;
  confirmationPassword: boolean;

  @Output() resetPassowrd = new EventEmitter<string>();

  constructor() {
    this.validatedForm = false;
    this.confirmationPassword = false;
  }

  ngOnInit() {
    this.resetPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  passwordConfirming(): boolean {
    if (this.resetPassword.get('password').value === this.resetPassword.get('confirmPassword').value) {
      this.confirmationPassword = false;
      return true;
    } else {
      this.confirmationPassword = true;
      return false;
    }
  }

  changePassword() {
    if (this.resetPassword.valid && this.passwordConfirming()) {
      this.resetPassowrd.emit(this.resetPassword.get('password').value)
    } else {
      this.validatedForm = true;
    }
  }
}
