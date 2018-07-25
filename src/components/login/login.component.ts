import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CredentialsInterface } from './../../credentials.interface';


// import { AuthenticationService } from 'authmodule-angular6-module-example';
import { AuthenticationService } from './../../authentication.service';

@Component({
    selector: "auth-app-login",
    template: `
        <ion-list>
            <form [formGroup]="loginform" (ngSubmit)="onSubmit()">

            <ion-item>
                <ion-label stacked primary>Email</ion-label>
                <ion-input [(ngModel)]="credentials.email" formControlName="email"
                        type="text" id="email" spellcheck="false" autocapitalize="off" ngDefaultControl>
                </ion-input>
            </ion-item>
            <ion-item>
                <ion-label stacked primary>Password</ion-label>
                <ion-input [(ngModel)]="credentials.password" formControlName="password" type="text" id="password" ngDefaultControl>
                </ion-input>
            </ion-item>

            <button ion-button type="submit" block primary [disabled]="!loginform.valid">Login</button>
            <button ion-button type="submit" block secondary (click)="createAccount()">Create an account</button>

            </form>
        </ion-list>
        `,
    styles: [``],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthLoginComponent {

    @Output()
    submit: EventEmitter<any> = new EventEmitter();

    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter();

    credentials: CredentialsInterface = { 
        email: '', 
        password: '' 
    };

    loginform: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        public formBuilder: FormBuilder) {
    }

    ngOnInit(): any {
        this.loginform = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required]
        });
    }

    onSubmit() {
        this.authenticationService
            .login(this.credentials)
            .subscribe((result: any) => {
                this.submit.emit(result);
            });
    }

    createAccount() {
        this.changePage.emit(true);
    }

}

