import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'cap-forgot-password',
  template: `
<div class="register">
  <div class="register__form">
    <div class="form-container">
      <form [formGroup]="changeform" (ngSubmit)="forgorPassword()">
        <ng-container *ngIf="!emailSend">
          <p for="email" *ngIf="!emailSend" style="padding:0.5rem 2rem;">
            Enter your email address and we will send you a link to reset your password.
          </p>
          <div class="form__group">
            <input
              id="email"
              type="email"
              class="form__input u-border-light"
              placeholder="Email adress"
              formControlName="email"

              [ngClass]="{
                'invalidField':(!changeform.get('email').valid && changeform.get('email').touched)
                  || (validatedForm && !changeform.get('email').valid)
                }"
            >
            <label for="email" class="form__label">Email adress</label>
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
          <button *ngIf="!emailSend"  type="submit" class="btns btns--blue">Send Email</button>
        </div>
      </form>
    </div>
    <ng-container isString(titleComponent)>
      <div class="form-title-container text-break">
        <h2 class="heading-secondary--light u-text-uppercase u-center-text u-margin-top-small u-text-white">
          {{titleComponent}}
        </h2>
      </div>
    </ng-container>
  </div>
</div>
  `,
  styles: [`
p {
  font-size: 1.6rem;
}
label {
  margin-bottom: 0rem!important;
}
.invalidField {
  border-color:#dc3545!important;
}
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthForgotPasswordComponent implements OnInit {

  /**
   * Inputs & Outputs
   */
  @Input() titleComponent? = 'Forgot Password';
  @Output() userEmail = new EventEmitter();
  @Output() forgotPasswordRequest = new EventEmitter();
  @Output() forgotPasswordRequestError = new EventEmitter();

  public changeform: FormGroup;
  public emailSend: boolean = false;
  public errorEmailSend: boolean = false;
  public validatedForm: boolean = false;

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.changeform = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  forgorPassword() {
    if (this.changeform.valid) {
      this.userEmail.emit(this.changeform.get(['email']).value);
      this.authenticationService.getAuth0Token().subscribe((token: any) => {
        this.authenticationService.searchUserByEmail(this.changeform.get(['email']).value, token).subscribe((user: any) => {
          if (user.length) {
            this.authenticationService.changePassword(this.changeform.get(['email']).value).subscribe((response: any) => {
              this.forgotPasswordRequest.emit(true)
            },(error) => {
              if (error.status === 200) {
                this.emailSend = true;
                this.forgotPasswordRequest.emit(true);
                this.showMessage('#form__label__succeses', 'An e-mail was sent to your email address that you provided, there you can change your password.', false);
              } else if (error.status > 400) {
                this.forgotPasswordRequestError.emit(error);
              }
            });
          } else {
            this.showMessage('#form__label__error', 'A registered user was not found with that email');
            this.forgotPasswordRequestError.emit({message: 'A registered user was not found with that email',status: 404});
          }
        },(error) => {
          this.showMessage('#form__label__error', 'an error occurred with the server when checking your email, try again later.');
          this.forgotPasswordRequestError.emit(error);
        });
      },(error => {
        this.showMessage('#form__label__error', 'an error occurred with the server when checking your email, try again later.');
        this.forgotPasswordRequestError.emit(error);
      }));
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
