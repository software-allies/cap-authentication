import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { CredentialsInterface } from './../../interfaces/credentials.interface';

import { AuthenticationService } from '../../services/authentication.service';
import { Platform } from 'ionic-angular';


@Component({
  selector: "auth-app-register",
  template: `
<ion-grid>
   <ion-row>
     <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>
        <ion-list>
            <form [formGroup]="registerform" (ngSubmit)="onSubmit()">
                <ion-item>
                    <ion-label stacked primary>Username</ion-label>
                    <ion-input [(ngModel)]="credentials.username" formControlName="username"
                            type="text" id="username" spellcheck="false" autocapitalize="off" ngDefaultControl>
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label stacked primary>Email</ion-label>
                    <ion-input [(ngModel)]="credentials.email" formControlName="email"
                            type="text" id="email" spellcheck="false" autocapitalize="off" ngDefaultControl>
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Rol</ion-label>
                    <ion-select [(ngModel)]="credentials.rol" formControlName="rol" id="rol"> 
                    <ion-option *ngFor=" let roles of rol" value="{{roles}}">{{roles}}</ion-option>
                    </ion-select>
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
                <button ion-button type="submit" block full primary (click)="registerAccount()"[disabled]="!registerform.valid">Register</button>
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
        username:'',
        email: '',
        password: '', 
        repassword: '',
        rol:''
    };

    rol: Array<string> = ['Guest','Administrator','Other'];
    registerform: FormGroup;
    
    constructor(
        private authenticationService: AuthenticationService,
        public formBuilder: FormBuilder,
        private platform: Platform, ) { 
        }

    ngOnInit(): any {
        this.registerform = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            repassword: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.minLength(3)]],
            rol: ['',[Validators.required]]
        });
    }
  
    onSubmit() {}

    registerAccount(){
        if (this.credentials.password !== this.credentials.repassword){
            alert('passwords must be equal');
            return false;
        }
        if (this.platform.is('cordova')){
            this.authenticationService
            .RegisterMobile(this.credentials)
        }else{
            this.authenticationService
            .RegisterBrowser(this.credentials)
        }
        
        this.authenticationService
            .register(this.credentials)
            .subscribe((result: any) => {
                this.submit.emit(result);
            });
        this.registerform.reset()
    }

    loginAccount() {
        this.changePage.emit(true);
    }

}
