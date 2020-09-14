import { Component, ViewEncapsulation, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Register, RegisterJWT } from '../../interfaces/authentication.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-register',
  template: `
<div class="box">
  <div>
    <form [formGroup]="createUserForm" (ngSubmit)="createUser()">
      <div class="form-group">
        <label for="email">Email address <span>*</span></label>
        <input
          type="text"
          id="email"
          email
          class="form-control"
          [ngClass]="{
            'invalidField':
              (!createUserForm.get('email').valid && createUserForm.get('email').touched)
              || (validatedForm && !createUserForm.get('email').valid || existingUser)
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
        <label for="password">Password <span>*</span> </label>
        <input
          type="password"
          id="password"
          class="form-control"
          [ngClass]="{
            'invalidField':
              (!createUserForm.get('password').valid && createUserForm.get('password').touched)
              || (validatedForm && !createUserForm.get('password').valid)
          }"
          formControlName="password"/>

          <small
            *ngIf="!createUserForm.get('password').pristine && !createUserForm.get('password').valid"
            class="form-text text-center text-muted"
          >
            Your password must contain the following: 8-20 characters long, the first character must be capital (uppercase) letter, a numbers and a lowercase letter.
          </small>
          <small *ngIf="!createUserForm.get('password').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
            Required field
          </small>
      </div>

      <div class="form-group">
        <label for="text">First Name <span>*</span></label>
        <input  type="text"
                class="form-control"
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
        <label for="text">Last Name <span>*</span></label>
        <input  type="text"
                class="form-control"
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

      <div *ngIf="profileType" class="form-group">
        <label for="text">Profile <span>*</span></label>
        <select
        formControlName="profile"
        id="inputAccountType"
        class="form-control"
        [ngClass]="{
          'invalidField':
            (!createUserForm.get('profile').valid && createUserForm.get('profile').touched)
            || (validatedForm && !createUserForm.get('profile').valid),
          'is-valid':createUserForm.get('profile').valid
        }"
        >
          <!-- <option value="" selected disabled hidden>Select a profile</option> -->
          <option *ngFor="let type of profileTypeArray" value="{{ type }}" class="form-control">
            {{ type }}
          </option>
        </select>
        <small *ngIf="!createUserForm.get('profile').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
          Required field
        </small>
      </div>

      <div class="form-group">
        <label for="text">Company</label>
        <input  type="text"
                class="form-control"
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

span {
  color: #cb2431;
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
export class AuthRegisterComponent implements OnInit {

  createUserForm: FormGroup;
  existingUser: boolean;
  socialMedia: boolean;
  validatedForm: boolean;

  @Output() userRegisterData = new EventEmitter<Register>();
  @Output() userRegisterJWT = new EventEmitter<RegisterJWT>();
  @Output() userRegisterError = new EventEmitter();

  @Input() redirectTo?: string = '/';
  @Input() profileType?: boolean = false;
  @Input() profileTypeArray?: string[] = ['Company', 'Student', 'University'];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.existingUser = false;
    this.socialMedia = false;
    this.validatedForm = false;
  }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.capitalLetter]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      company: new FormControl(''),
    });
    if (this.profileType) {
      this.createUserForm.addControl('profile', new FormControl('', Validators.required));
    }
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
            this.userRegisterData.emit({
              userData: this.createUserForm.value,
              response: user
            });
            this.authenticationService.loginUser(this.createUserForm.value).subscribe((AccessToken: any) => {
              this.userRegisterJWT.emit(AccessToken);
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
              this.router.navigate([`${this.redirectTo}`]);
            });
          }
        }, (error) => {
          this.userRegisterError.emit(error);
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
