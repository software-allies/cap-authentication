import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-login',
  template: `
<div class="box">
  <div>
    <form [formGroup]="loginUserForm" (ngSubmit)="loginUser()">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="text"
          id="email"
          email
          class="form-control"
          [ngClass]="
            {'invalidField':(!loginUserForm.get('email').valid && loginUserForm.get('email').touched)
            || (validatedForm && !loginUserForm.get('email').valid)}"
          formControlName="email"
          aria-describedby="emailHelp"/>
        <small *ngIf="!loginUserForm.get('email').valid && validatedForm"[ngStyle]="{'color':'#dc3545'}" class="form-text">
            Required field
        </small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          [ngClass]="
            {'invalidField':(!loginUserForm.get('password').valid && loginUserForm.get('password').touched)
            || (validatedForm && !loginUserForm.get('password').valid)}"
          formControlName="password"/>
        <small *ngIf="!loginUserForm.get('password').valid && validatedForm"[ngStyle]="{'color':'#dc3545'}" class="form-text">
          Required field
        </small>
          <div class="form-group form-check">
            <small class="form-text text-right">
              <a routerLink="/auth/forgot-password"> Forgot password? </a>
            </small>
          </div>

          <div *ngIf="userNotValid"  class="form-control-feeback text-danger text-center">
            invalid email or password
          </div>

          <!--
          <div *ngIf="socialMedia"  class="form-control-feeback text-danger text-center">
            At the moment authentication with Social networks is under development, try by Email
          </div>
          -->
      </div>

      <button type="submit" class="btn btn-primary btn-block">Login</button>

      <!--
      <div class="form-group">
        <button (click)="signInSocialMedia(true)" type="button" class="btnFacebook ">Facebook</button>
      </div>

      <div class="form-group">
        <button (click)="signInSocialMedia(false)" type="button" class="btnGoogle ">Google</button>
      </div>
      -->
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
export class AuthLoginComponent implements OnInit {

  loginUserForm: FormGroup;
  userNotValid: boolean;
  socialMedia: boolean;
  validatedForm: boolean;

  @Output() userLoginData = new EventEmitter();
  @Output() userLoginError = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginUserForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.userNotValid = false;
    this.socialMedia = false;
    this.validatedForm = false;
  }

  ngOnInit() { }

  loginUser() {
    if (this.loginUserForm.valid) {
      this.authenticationService.loginUser(this.loginUserForm.value).subscribe((token: any) => {
        this.authenticationService.getUserInfo(token.access_token).subscribe((userinfo: any) => {
          this.authenticationService.getUser(userinfo.sub, token.access_token).subscribe((user: any) => {
            this.userLoginData.emit(userinfo);
            this.authenticationService.saveCurrentUser({
              user: userinfo.name,
              email: userinfo.email,
              refresh_token: token.refresh_token,
              token: token.access_token,
              token_id: token.id_token,
              id: userinfo.sub,
              cap_uuid: user.user_metadata.CAP_UUID
            });
            this.router.navigate(['/']);
          });
        });
      }, (error) => {
        this.userNotValid = true;
        this.userLoginError.emit(error);
      });
    } else {
      this.validatedForm = true;
    }
  }

  signInSocialMedia(socialMedia?: boolean) {
    this.socialMedia = true;
    setTimeout(() => {
      this.socialMedia = false;
    }, 3000);
  }
}

