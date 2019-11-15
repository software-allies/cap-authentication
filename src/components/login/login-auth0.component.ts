import { Component, ViewEncapsulation, Inject, PLATFORM_ID, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: "auth-app-login-auth0",
  template: `
  <div class="container register-form">
    <div class="form">
      <div class="header">
          <p>Sign in</p>
      </div>
      <div class="form-content">
        <form [formGroup]="loginUserForm" (ngSubmit)="loginUser()">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group" >
                    <input  type="text"
                            class="form-control"
                            placeholder="Email address *"
                            [ngClass]="{'is-invalid':!loginUserForm.get('email').valid && loginUserForm.get('email').touched}"
                            formControlName="email"/>
                </div>
                <div class="form-group">
                    <input  type="password"
                            class="form-control"
                            placeholder="Password *"
                            [ngClass]="{'is-invalid':!loginUserForm.get('password').valid && loginUserForm.get('password').touched}"
                            formControlName="password"/>
                    <small *ngIf="!loginUserForm.get('password').valid && loginUserForm.get('password').touched" class="form-text text-center text-muted">
                      Your password must be 8-20 characters long, contain letters and numbers and the first letter has to be uppercase.
                    </small>

                  <div *ngIf="userNotValid"  class="form-control-feeback text-danger text-center">
                    invalid email or password
                  </div>
              </div>
            </div>
              <div class="col-md-6">
                <div class="form-group">
                  <button type="submit"
                          class="btnSubmit"
                          [disabled]="!loginUserForm.valid">Email</button>
                </div>
                <div class="form-group">
                  <button (click)="signInSocialMedia(true)" type="button" class="btnFacebook ">Facebook</button>
                </div>

                <div class="form-group">
                <button (click)="signInSocialMedia(false)" type="button" class="btnGoogle ">Google</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  `,
  styles: [`
.header
{
  text-align: center;
  height: 80px;
  background: black;
  color: #fff;
  font-weight: bold;
  line-height: 80px;
}
.form-content
{
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
.btnFacebook
{
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 100%;
  cursor: pointer;
  background: #0000FF;
  color: #fff;
}
.btnGoogle
{
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 100%;
  cursor: pointer;
  background: #FF0000;
  color: #fff;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthLoginAuth0Component implements OnInit {

  loginUserForm: FormGroup;
  userNotValid: boolean;

  constructor(
    private authenticationAuth0Service: AuthenticationAuth0Service,
    @Inject(PLATFORM_ID) private platformId,
    private router: Router
  ) {
    this.userNotValid = false;
  }

  ngOnInit() {
    this.loginUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  loginUser() {
    this.authenticationAuth0Service.loginUser(this.loginUserForm.value).subscribe((token: any) => {
      this.authenticationAuth0Service.getUserInfo(token.access_token).subscribe((user: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('User', JSON.stringify({
            user: user.name,
            email: user.email,
            refresh_token: token.refresh_token,
            token: token.access_token,
            token_id: token.id_token,
            id: user.sub
          }));
        }
        this.router.navigate(['/']);
      });
    }, (error => {
      if (error.status === 403) {
        this.userNotValid = true;
      }
    }));
  }

  signInSocialMedia(socialMedia: boolean) { }
}

