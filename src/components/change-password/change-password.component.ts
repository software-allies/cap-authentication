import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CredentialsInterface } from './../../credentials.interface';

// import { AuthenticationService } from 'authmodule-angular6-module-example';
import { AuthenticationService } from '../../services/authentication.service';

@Component({ 
  selector: "auth-app-change-password",
  template: `
<ion-grid>
   <ion-row>
     <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>
        <ion-list>
            <form [formGroup]="changeform" (ngSubmit)="onSubmit()">
            <ion-item>
                <ion-label stacked primary>Password</ion-label>
                <ion-input [(ngModel)]="credentials.password" formControlName="password" type="text" id="password" ngDefaultControl>
                </ion-input>
            </ion-item>
            <ion-item>
                <ion-label stacked primary>Repeat Password</ion-label>
                <ion-input [(ngModel)]="credentials.repassword" formControlName="repassword" type="text" id="repassword" ngDefaultControl>
                </ion-input>
            </ion-item>
            <button ion-button type="submit" block full primary [disabled]="!changeform.valid">Change Password</button>
            <button ion-button type="submit" block secondary (click)="loginAccount()">Login to account</button>
            </form>
        </ion-list>
     </ion-col>
   </ion-row>
 </ion-grid>
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthChangePasswordComponent {

    @Output()
    submit: EventEmitter<any> = new EventEmitter();

    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter();

    credentials: CredentialsInterface = {
            password: '',
            repassword: ''
        };
    
    changeform: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder){
        this.credentials = {
            password: '',
            repassword: ''
        };
    }

    ngOnInit(): any {
        this.changeform = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(3)]],
            repassword: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    onSubmit() {
        this.authenticationService
            .changePassword(this.changeform.value)
            .subscribe((result: any) => {
                this.submit.emit(result);
            });
    }

    loginAccount() {
        this.changePage.emit(true);
    }

}
