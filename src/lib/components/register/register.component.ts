import { Component, ViewEncapsulation, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Register, RegisterJWT } from '../../interfaces/authentication.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-register',
  template: `
<div class="register">
  <div class="register__form">
    <div class="form-container">
      <form [formGroup]="createUserForm" (ngSubmit)="createUser()" class="form">
        <div class="form__group">
          <input
            id="email"
            type="email"
            class="form__input u-border-light"
            placeholder="Email adress *"
            formControlName="email"
            [ngClass]="{
              'invalidField':
                (!createUserForm.get('email').valid && createUserForm.get('email').touched)
                || (validatedForm && !createUserForm.get('email').valid || existingUser)
            }"
          >
          <label for="email" class="form__label">Email adress *</label>
        </div>
        <div class="form__group">
          <input
            id="password"
            type="password"
            class="form__input u-border-light"
            placeholder="Password *"
            formControlName="password"
            [ngClass]="{
              'invalidField':
                (!createUserForm.get('password').valid && createUserForm.get('password').touched)
                || (validatedForm && !createUserForm.get('password').valid)
            }"
          >
          <label for="password" class="form__label">Password *</label>
        </div>
        <ng-container *ngIf="this.confirmPasswordInput">
          <div class="form__group">
            <input
              id="confirmPassword"
              type="password"
              class="form__input u-border-light"
              placeholder="Confirm password *"
              formControlName="confirmPassword"
              [ngClass]="{
                'invalidField':
                  (!createUserForm.get('confirmPassword').valid && createUserForm.get('confirmPassword').touched)
                  || (validatedForm && !createUserForm.get('confirmPassword').valid)
              }"
            >
            <label for="confirmPassword" class="form__label">Confirm password *</label>
          </div>
        </ng-container>
        <ng-container *ngIf="this.firstNameInput">
          <div class="form__group">
            <input
              id="first-name"
              type="text"
              class="form__input u-border-light"
              placeholder="First name *"
              formControlName="firstName"
              [ngClass]="{
                'invalidField':
                  (!createUserForm.get('lastName').valid && createUserForm.get('lastName').touched)
                  || (validatedForm && !createUserForm.get('lastName').valid)
              }"
            >
            <label for="first-name" class="form__label">First name</label>
          </div>
        </ng-container>
        <ng-container *ngIf="lastNameInput">
          <div class="form__group">
            <input
              id="last-name"
              type="text"
              class="form__input u-border-light"
              placeholder="Last name *"
              formControlName="lastName"
              [ngClass]="{
                'invalidField':
                  (!createUserForm.get('lastName').valid && createUserForm.get('lastName').touched)
                  || (validatedForm && !createUserForm.get('lastName').valid)
              }"
            >
            <label for="last-name" class="form__label">Last name</label>
          </div>
        </ng-container>
        <ng-container *ngIf="this.profileInput">
          <div class="form__group">
            <select
              id="profile"
              class="form__input u-border-light"
              placeholder="Profile"
              formControlName="profile"
              [ngClass]="{
                'invalidField':
                  (!createUserForm.get('profile').valid && createUserForm.get('profile').touched)
                  || (validatedForm && !createUserForm.get('profile').valid)
              }"
              >
              <option value="{{null}}">-- Select --</option>
              <option *ngFor="let type of profileArrayValues" value="{{ type.value }}">
                {{ type.field }}
              </option>
            </select>
            <label for="profile" class="form__label__spacing">&nbsp;</label>
          </div>
        </ng-container>
        <ng-container *ngIf="this.companyInput">
          <div class="form__group">
            <input
              id="company"
              type="text"
              class="form__input u-border-light"
              placeholder="Company"
              formControlName="company"
              [ngClass]="{
                'invalidField':
                  (!createUserForm.get('company').valid && createUserForm.get('company').touched)
                  || (validatedForm && !createUserForm.get('company').valid)
              }"
            >
            <label for="company" class="form__label">Company</label>
          </div>
        </ng-container>

        <div style="padding:0rem 2rem;width: 100%;">
          <label id="form__label__error" class="form__label__error">
          </label>
        </div>
        <div style="padding:0rem 2rem;width: 100%;">
          <label id="form__label__succeses" class="form__label__succeses">
          </label>
        </div>

        <div class="button-container">
          <button type="submit" class="btns btns--blue">Create</button>
        </div>
      </form>
    </div>
    <div class="form-title-container text-break">
      <h2 class="heading-secondary--light u-text-uppercase u-center-text u-margin-top-small u-text-white">
        {{titleComponent}}
      </h2>
    </div>
  </div>
</div>
  `,
  styles: [`
.register {
  display: flex;
  align-items: center;
  justify-content: center;
}

label { margin-bottom: 0rem!important; }
.invalidField { border-color:#dc3545!important; }
span { color: #cb2431; }
`],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthRegisterComponent implements OnInit {

  public createUserForm: FormGroup;
  public existingUser: boolean = false;
  public socialMedia: boolean = false;
  public validatedForm: boolean = false;

  /**
   * Inputs & Outputs
   */
  @Input() confirmPasswordInput? = true;
  @Input() firstNameInput? = true;
  @Input() lastNameInput? = true;
  @Input() profileInput? = false;
  @Input() companyInput? = true;
  @Input() titleComponent? = 'Create your Account';
  @Input() redirectAfterTo?: string = '/';
  @Input() profileArrayValues?: Array<{field: string, value: string, id?: number}> = [
    { field: 'Company', value: 'Company', id: 1 },
    { field: 'Student', value: 'Student', id: 2 },
    { field: 'University', value: 'University', id: 3 }
  ];

  @Output() userRegisterData = new EventEmitter<Register>();
  @Output() userRegisterJWT = new EventEmitter<RegisterJWT>();
  @Output() userRegisterError = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.capitalLetter]),
    });
    if (this.confirmPasswordInput) this.createUserForm.addControl('confirmPassword', new FormControl('', Validators.required));
    if (this.firstNameInput) this.createUserForm.addControl('firstName', new FormControl('', Validators.required));
    if (this.lastNameInput) this.createUserForm.addControl('lastName', new FormControl('', Validators.required));
    if (this.profileInput) this.createUserForm.addControl('profile', new FormControl(''));
    if (this.companyInput) this.createUserForm.addControl('company', new FormControl(''));
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
              this.authenticationService.saveSessionInCookies({
                user: user.name,
                email: user.email,
                email_verified: user.email_verified,
                refresh_token: AccessToken.refresh_token,
                token: AccessToken.access_token,
                token_id: AccessToken.id_token,
                id: user.user_id,
                cap_uuid: user.user_metadata.CAP_UUID
              });
              this.router.navigate([`${this.redirectAfterTo}`]);
            });
          }
        }, (error) => {
          this.userRegisterError.emit(error);
          if (error.status === 409) {
            this.showMessage('#form__label__error', 'An account already exists with this email', );
          }
        });
      });
    } else this.validatedForm = true;
  }

  showMessage(element: string, textMessage: string, disappear: boolean = true) {
    const messageError = document.querySelector(element) as HTMLElement;
    messageError.style.padding = '1rem 2rem';
    messageError.innerHTML = textMessage;
    messageError.style.visibility = 'visible';
    messageError.style.opacity = '1';
    if (disappear) {
      setTimeout(()=>{
        messageError.style.visibility = 'hidden';
        messageError.style.opacity = '0';
        messageError.style.padding = '.5rem 2rem';
      }, 3000);
    }
  }
}
