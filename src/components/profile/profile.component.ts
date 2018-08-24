import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CredentialsInterface } from './../../interfaces/credentials.interface';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: "auth-app-edit-profile",
    template: `
    <ion-grid>
        <ion-row>
        <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>
            <ion-list>
                <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
                    <ion-item>
                        <ion-label stacked primary>Username</ion-label>
                        <ion-input [(ngModel)]="credentials.username" formControlName="username"
                                type="text" id="username" spellcheck="false" autocapitalize="off" ngDefaultControl>
                        </ion-input>
                    </ion-item>
                    
                    <button ion-button type="submit" block full primary [disabled]="!editForm.valid">Edit</button>
                </form>
            </ion-list>
        </ion-col>
        </ion-row>
    </ion-grid> `,
    
    styles: [``],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthEditComponent {

    @Output()
    submit: EventEmitter<any> = new EventEmitter();

    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter();

    credentials: CredentialsInterface = {
        username:'',
        password: ''    //este no lo ocupamos pero si no lo ponemos nos marcara error
    };

    editForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        public formBuilder: FormBuilder) {

    }

    ngOnInit(): any {
        this.editForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            //email: ['', [Validators.required, Validators.minLength(0)]]
        });
    }

    onSubmit() {
        this.authenticationService
            .editProfile(this.credentials)
            .subscribe((result: any) => {
                this.submit.emit(result);
            });
    }
}