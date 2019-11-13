import { Component, ViewEncapsulation, Inject, PLATFORM_ID  } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: "auth-app-login",
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
                      This user already exists, try other alternate data
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
export class AuthLoginComponent {

  loginUserForm: FormGroup;
  userNotValid: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId,
    private router: Router
  ) {
    this.loginUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
    this.userNotValid = false;
  }

  ngOnInit() { }

  loginUser() {
    this.authenticationService.authWithEmail(this.loginUserForm.value)
    .then((response) => {
      response.user.getIdTokenResult().then((res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('User', JSON.stringify({
            uid: response.user.uid,
            user: response.user.email.split('@', 1)[0],
            email: response.user.email,
            refresh_token: response.user.refreshToken,
            token: res.token
          }));
          this.router.navigate(['/']);
        }
      });
    }).catch(error => this.userNotValid = true);   }

  signInSocialMedia(socialMedia: boolean) {
    if (socialMedia) {
      this.authenticationService.authWithFacebook().then((response) => {
        response.user.getIdTokenResult().then((res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('User', JSON.stringify({
              user: response.user.email.split('@', 1)[0],
              email: response.user.email,
              refresh_token: response.user.refreshToken,
              token: res.token
            }));
          }
        }).then(() => {
          this.authenticationService.currentUser.subscribe((user) => {
          })
          // this.router.navigate(['/']);
        });
      }).catch(error => this.userNotValid = true);


    } else {
      this.authenticationService.authWithGoogle().then((response) =>  {
        response.user.getIdTokenResult().then((res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('User', JSON.stringify({
              user: response.user.email.split('@', 1)[0],
              email: response.user.email,
              refresh_token: response.user.refreshToken,
              token: res.token
            }));
          }
        }).then(() => {
          this.router.navigate(['/']);
        });
      }).catch(error => this.userNotValid = true);
    }
  }
}

