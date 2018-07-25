import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CredentialsInterface } from './../../credentials.interface';
import { AuthenticationService } from './../../authentication.service';
export declare class AuthRegisterComponent {
    private authenticationService;
    formBuilder: FormBuilder;
    submit: EventEmitter<any>;
    changePage: EventEmitter<boolean>;
    credentials: CredentialsInterface;
    registerform: FormGroup;
    constructor(authenticationService: AuthenticationService, formBuilder: FormBuilder);
    ngOnInit(): any;
    onSubmit(): false | undefined;
    loginAccount(): void;
}
