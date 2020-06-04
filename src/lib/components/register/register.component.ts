import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: "cap-register",
  template: `

<div class="box">
  <div>
    <form [formGroup]="createUserForm" (ngSubmit)="createUser()">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="text"
          id="email"
          email
          class="form-control"
          [ngClass]="{
            'invalidField':(!createUserForm.get('email').valid && createUserForm.get('email').touched) || (validatedForm && !createUserForm.get('email').valid || existingUser)
          }"
          formControlName="email"
          aria-describedby="emailHelp"/>
        <small
          id="emailHelp"
          class="form-text text-muted"
          *ngIf="!(!createUserForm.get('email').pristine && !createUserForm.get('email').valid)"
        >
          We'll never share your email with anyone else.
        </small>
        <small
          id="emailHelp"
          class="form-text text-muted"
          *ngIf="(!createUserForm.get('email').pristine && !createUserForm.get('email').valid)"
        >
          Please enter a valid email address.
        </small>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          [ngClass]="{
            'invalidField':(!createUserForm.get('password').valid && createUserForm.get('password').touched) || (validatedForm && !createUserForm.get('password').valid)
          }"
          formControlName="password"/>

          <small *ngIf="!createUserForm.get('password').pristine && !createUserForm.get('password').valid" class="form-text text-center text-muted">
            Your password must contain the following: 8-20 characters long, the first character must be capital (uppercase) letter, a numbers and a lowercase letter.
          </small>
          <small *ngIf="!createUserForm.get('password').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
            Required field
          </small>
      </div>

      <div class="form-group">
        <label for="text">First Name</label>
        <input  type="text"
                class="form-control"
                placeholder="First Name * "
                [ngClass]="{
                  'invalidField':
                    (!createUserForm.get('firstName').valid && createUserForm.get('firstName').touched)
                    || (validatedForm && !createUserForm.get('firstName').valid),
                  'is-valid':createUserForm.get('firstName').valid
                }"
                formControlName="firstName"/>
        <small *ngIf="!createUserForm.get('firstName').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
          Required field
        </small>
      </div>

      <div class="form-group">
        <label for="text">Last Name</label>
        <input  type="text"
                class="form-control"
                placeholder="Last Name *"
                [ngClass]="{
                  'invalidField':
                    (!createUserForm.get('lastName').valid
                    && createUserForm.get('lastName').touched)
                    || (validatedForm && !createUserForm.get('lastName').valid),
                  'is-valid':createUserForm.get('lastName').valid
                }"
                formControlName="lastName"/>
        <small *ngIf="!createUserForm.get('lastName').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
          Required field
        </small>
      </div>

      <div class="form-group">
        <label for="text">Company</label>
        <input  type="text"
                class="form-control"
                placeholder="Company"
                formControlName="company"/>
      </div>

      <div *ngIf="existingUser"  class="form-control-feeback text-danger text-center">
        An Account with this username already exists.
      </div>

      <button type="submit" class="btn btn-primary btn-block">Sign Up</button>

      <!--
      <button (click)="signUpSocialMedia(true)" type="button" class="btnFacebook ">Facebook</button>
      <button (click)="signUpSocialMedia(false)" type="button" class="btnGoogle ">Google</button>

      <div *ngIf="socialMedia"  class="form-control-feeback text-danger text-center">
        At the moment authentication with Social networks is under development, try by Email
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

.invalidField {
  border-color:#dc3545;
}

/*.btnFacebook {
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 33%;
  cursor: pointer;
  background: #0000FF;
  color: #fff;
}

.btnGoogle {
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 33%;
  cursor: pointer;
  background: #FF0000;
  color: #fff;
}*/

  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthRegisterComponent {

  createUserForm: FormGroup;
  existingUser: boolean;
  socialMedia: boolean;
  validatedForm: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.existingUser = false;
    this.createUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.capitalLetter]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      company: new FormControl(''),
    });
    this.socialMedia = false;
    this.validatedForm = false;
  }

  capitalLetter(control: FormControl): { [s: string]: boolean } {
    const letterAscii = control.value.charCodeAt(0);
    if (control.value && letterAscii > 64 && letterAscii < 91) {
      return null;
    }
    return {
      capitalLetter: true
    };
  }

  createUser() {
    if (this.createUserForm.valid) {
      this.authenticationService.getAuth0Token().subscribe((token: any) => {
        this.authenticationService.createUser(this.createUserForm.value, token).subscribe((user: any) => {
          if (user) {
            this.authenticationService.loginUser(this.createUserForm.value).subscribe((AccessToken: any) => {
              this.authenticationService.createUserDB(this.createUserForm.value, token, user.user_id, user.user_metadata.CAP_UUID);
              this.authenticationService.saveCurrentUser({
                user: user.name,
                email: user.email,
                refresh_token: AccessToken.refresh_token,
                token: AccessToken.access_token,
                token_id: AccessToken.id_token,
                id: user.user_id,
                cap_uuid: user.user_metadata.CAP_UUID
              });
              this.router.navigate(['/']);
            });
          }
        }, (error) => {
          if (error.status === 409) {
            this.existingUser = true;
          }
        });
      });
    } else {
      this.validatedForm = true;
    }
  }

  signUpSocialMedia(socialMedia?: boolean) {
    this.socialMedia = true;
    setTimeout(() => {
      this.socialMedia = false;
    }, 3000);
  }
}
