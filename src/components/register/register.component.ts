import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CredentialsInterface } from './../../credentials.interface';

// import { AuthenticationService } from 'authmodule-angular6-module-example';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "auth-app-register",
  template: `
<ion-grid>
   <ion-row>
     <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>
        <ion-list>
            <form [formGroup]="registerform" (ngSubmit)="onSubmit()">
                <ion-item>
                    <ion-label stacked primary>Email</ion-label>
                    <ion-input [(ngModel)]="credentials.email" formControlName="email"
                            type="text" id="email" spellcheck="false" autocapitalize="off" ngDefaultControl>
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label stacked primary>Password</ion-label>
                    <ion-input [(ngModel)]="credentials.password" formControlName="password" type="text" id="password">
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label stacked primary>Repeat Password</ion-label>
                    <ion-input [(ngModel)]="credentials.repassword" formControlName="repassword" type="text" id="repassword">
                    </ion-input>
                </ion-item>
                <button ion-button type="submit" block full primary [disabled]="!registerform.valid">Register</button>
                <button ion-button type="submit" block secondary (click)="loginAccount()">Login to account</button>
                <social-login></social-login>
            </form>
        </ion-list>
     </ion-col>
   </ion-row>
 </ion-grid>
    `,
  styles: [``],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthRegisterComponent {

    @Output()
    submit: EventEmitter<any> = new EventEmitter();

    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter();

    credentials: CredentialsInterface = {
        email: '',
        password: '', 
        repassword: '' 
    };

    registerform: FormGroup;
    
    constructor(
        private authenticationService: AuthenticationService,
        public formBuilder: FormBuilder) {

    }

    ngOnInit(): any {
        this.registerform = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(3)]],
            repassword: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    onSubmit() {

        if (this.credentials.password !== this.credentials.repassword) {
          console.log('passwords must be equal');
          return false;
        }
        this.authenticationService
            .register(this.credentials)
            .subscribe((result: any) => {
                this.submit.emit(result);
            });
    }

    loginAccount() {
        this.changePage.emit(true);
    }

}
