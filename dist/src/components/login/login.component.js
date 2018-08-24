import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthServiceConfig } from 'angular5-social-login';
import { AuthenticationService } from '../../services/authentication.service';
var AuthLoginComponent = /** @class */ (function () {
    function AuthLoginComponent(authenticationService, formBuilder, 
    // private socialAuthService: AuthService,
    authServiceConfig) {
        this.authenticationService = authenticationService;
        this.formBuilder = formBuilder;
        this.authServiceConfig = authServiceConfig;
        this.submit = new EventEmitter();
        this.changePage = new EventEmitter();
        this.credentials = {
            email: '',
            password: ''
        };
    }
    AuthLoginComponent.prototype.ngOnInit = function () {
        this.loginform = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required]
        });
    };
    AuthLoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authenticationService
            .login(this.credentials)
            .subscribe(function (result) {
            _this.submit.emit(result);
        });
    };
    AuthLoginComponent.prototype.createAccount = function () {
        this.changePage.emit(true);
    };
    AuthLoginComponent.decorators = [
        { type: Component, args: [{
                    selector: "auth-app-login",
                    template: " \n<ion-grid>\n   <ion-row>\n     <ion-col col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>\n        <ion-list>\n            <form [formGroup]=\"loginform\" (ngSubmit)=\"onSubmit()\">\n            <ion-item>\n                <ion-label stacked primary>Email</ion-label>\n                <ion-input [(ngModel)]=\"credentials.email\" formControlName=\"email\"\n                        type=\"text\" id=\"email\" spellcheck=\"false\" autocapitalize=\"off\" ngDefaultControl>\n                </ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label stacked primary>Password</ion-label>\n                <ion-input [(ngModel)]=\"credentials.password\" formControlName=\"password\" type=\"text\" id=\"password\" ngDefaultControl>\n                </ion-input>\n            </ion-item>\n            <button ion-button type=\"submit\" block primary [disabled]=\"!loginform.valid\">Login</button>\n            <button ion-button type=\"submit\" block secondary (click)=\"createAccount()\">Create an account</button>\n            <social-login></social-login>\n            </form>\n        </ion-list>\n     </ion-col>\n   </ion-row>\n </ion-grid>\n        ",
                    styles: [""],
                    encapsulation: ViewEncapsulation.Emulated
                },] },
    ];
    /** @nocollapse */
    AuthLoginComponent.ctorParameters = function () { return [
        { type: AuthenticationService, },
        { type: FormBuilder, },
        { type: AuthServiceConfig, },
    ]; };
    AuthLoginComponent.propDecorators = {
        "submit": [{ type: Output },],
        "changePage": [{ type: Output },],
    };
    return AuthLoginComponent;
}());
export { AuthLoginComponent };
//# sourceMappingURL=login.component.js.map