import { Component, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: "cap-register-auth0",
  template: `
  <div class="container register-form">
    <div class="form">
      <div class="header">
          <p>Create your account</p>
      </div>
      <div class="form-content">
        <form [formGroup]="createUserForm" (ngSubmit)="createUser()">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group" >
                    <input  type="text"
                            class="form-control"
                            placeholder="Email address *"
                            [ngClass]="{'is-invalid':!createUserForm.get('email').valid && createUserForm.get('email').touched}"
                            formControlName="email"/>
                </div>
                <div class="form-group">
                    <input  type="password"
                            class="form-control"
                            placeholder="Password *"
                            [ngClass]="{'is-invalid':!createUserForm.get('password').valid && createUserForm.get('password').touched}"
                            formControlName="password"/>
                    <small *ngIf="!createUserForm.get('password').valid && createUserForm.get('password').touched" class="form-text text-center text-muted">
                      Your password must be 8-20 characters long, contain letters and numbers and the first letter has to be uppercase.
                    </small>
                </div>
                <div class="form-group">
                  <input  type="text"
                          class="form-control"
                          placeholder="First Name * "
                          [ngClass]="{'is-invalid':!createUserForm.get('firstName').valid && createUserForm.get('firstName').touched}"
                          formControlName="firstName"/>
                </div>

            </div>


            <div class="col-md-6">

                <div class="form-group">
                    <input  type="text"
                            class="form-control"
                            placeholder="Last Name *"
                            [ngClass]="{'is-invalid':!createUserForm.get('lastName').valid && createUserForm.get('lastName').touched}"
                            formControlName="lastName"/>
                </div>

                <div class="form-group">
                    <input  type="text"
                            class="form-control"
                            placeholder="Company *"
                            [ngClass]="{'is-invalid':!createUserForm.get('company').valid && createUserForm.get('company').touched}"
                            formControlName="company"/>
                </div>

                <div class="form-group">
                  <button type="submit"
                          class="btnSubmit"
                          [disabled]="!createUserForm.valid">Email</button>
                  <button (click)="signUpSocialMedia(true)" type="button" class="btnFacebook ">Facebook</button>
                  <button (click)="signUpSocialMedia(false)" type="button" class="btnGoogle ">Google</button>
                </div>
            </div>

            <div *ngIf="existingUser"  class="form-control-feeback text-danger text-center">
              This user already exists, try other alternate data
            </div>
            <div *ngIf="socialMedia"  class="form-control-feeback text-danger text-center">
              At the moment authentication with Social networks is under development, try by Email
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
  width: 33%;
  cursor: pointer;
  background: black;
  color: #fff;
}
.btnFacebook
{
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 33%;
  cursor: pointer;
  background: #0000FF;
  color: #fff;
}
.btnGoogle
{
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 33%;
  cursor: pointer;
  background: #FF0000;
  color: #fff;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthRegisterAuth0Component {

  createUserForm: FormGroup;
  existingUser: boolean;
  socialMedia: boolean;

  constructor(
    private authenticationAuth0Service: AuthenticationAuth0Service,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.createUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), this.capitalLetter]),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'company': new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.socialMedia = false;
  }


  capitalLetter(control: FormControl): { [s: string]: boolean } {
    const letter = control.value.charAt(0);
    if (control.value && !(letter === control.value.charAt(0).toUpperCase())) {
      return {
        capitalLetter: true
      };
    }
    return null;
  }

  createUser() {
    this.authenticationAuth0Service.getToken().subscribe((token: string) => {
      this.authenticationAuth0Service.createUser(this.createUserForm.value, token).subscribe((user: any) => {
        if (user) {
          this.authenticationAuth0Service.loginUser(this.createUserForm.value).subscribe((AccessToken: any) => {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('User', JSON.stringify({
                user: user.name,
                email: user.email,
                refresh_token: AccessToken.refresh_token,
                token: AccessToken.access_token,
                token_id: AccessToken.id_token,
                id: user.user_id
              }));
            }
          });
        }
      }, (error) => {
        if (error.status === 409) {
          this.existingUser = true;
        }
      });
    });
  }

  signUpSocialMedia(socialMedia: boolean) {
    this.socialMedia = true;
    setTimeout(() => {
      this.socialMedia = false;
    }, 3000);
  }
}
