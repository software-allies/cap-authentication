import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';
import { Router } from '@angular/router';

@Component({
  selector: "cap-log-in-auth0",
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
                          [ngClass]="{'invalidField':(!loginUserForm.get('email').valid && loginUserForm.get('email').touched) || (validatedForm && !loginUserForm.get('email').valid)}"
                          formControlName="email"/>
              </div>
              <div class="form-group">
                  <input  type="password"
                          class="form-control"
                          placeholder="Password *"
                          [ngClass]="{'invalidField':(!loginUserForm.get('password').valid && loginUserForm.get('password').touched) || (validatedForm && !loginUserForm.get('password').valid)}"
                          formControlName="password"/>
                  <small *ngIf="!loginUserForm.get('password').valid && loginUserForm.get('password').touched" class="form-text text-center text-muted">
                    Your password must be 8-20 characters long, contain letters and numbers and the first letter has to be uppercase.
                  </small>

                <div *ngIf="userNotValid"  class="form-control-feeback text-danger text-center">
                  invalid email or password
                </div>
                <div *ngIf="socialMedia"  class="form-control-feeback text-danger text-center">
                  At the moment authentication with Social networks is under development, try by Email
                </div>
            </div>
          </div>
            <div class="col-md-6">
              <div class="form-group">
                <button type="submit"class="btnSubmit">Login</button>
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
  button {
    outline: none;
  }
  .invalidField{
    border-color:#dc3545;
  }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthLoginAuth0Component implements OnInit {

  loginUserForm: FormGroup;
  userNotValid: boolean;
  socialMedia: boolean;
  validatedForm: boolean;

  constructor(
    private authenticationAuth0Service: AuthenticationAuth0Service,
    private router: Router
  ) {
    this.loginUserForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
    this.userNotValid = false;
    this.socialMedia = false;
    this.validatedForm = false;
  }

  ngOnInit() { }

  loginUser() {
    if (this.loginUserForm.valid) {
      this.authenticationAuth0Service.loginUser(this.loginUserForm.value).subscribe((token: any) => {
        this.authenticationAuth0Service.getAuth0UserInfo(token.access_token).subscribe((user: any) => {
          this.authenticationAuth0Service.saveCurrentUSer({
            user: user.name,
            email: user.email,
            refresh_token: token.refresh_token,
            token: token.access_token,
            token_id: token.id_token,
            id: user.sub
          });
          this.router.navigate(['/']);
        });
      }, (error) => {
        console.log(error);
        this.userNotValid = true;
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

