import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CredentialsInterface } from './../../credentials.interface';
import { AuthenticationService } from './../../authentication.service';
export declare class AuthChangePasswordComponent {
    private authenticationService;
    private formBuilder;
    submit: EventEmitter<any>;
    changePage: EventEmitter<boolean>;
    credentials: CredentialsInterface;
    changeform: FormGroup;
    constructor(authenticationService: AuthenticationService, formBuilder: FormBuilder);
    ngOnInit(): any;
    onSubmit(): void;
    loginAccount(): void;
}
