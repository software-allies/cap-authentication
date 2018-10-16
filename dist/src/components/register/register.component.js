import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from '../../services/authentication.service';
var AuthRegisterComponent = /** @class */ (function () {
    function AuthRegisterComponent(authenticationService, formBuilder) {
        this.authenticationService = authenticationService;
        this.formBuilder = formBuilder;
        this.submit = new EventEmitter();
        this.changePage = new EventEmitter();
        this.credentials = {
            username: '',
            email: '',
            password: '',
            repassword: ''
        };
    }
    AuthRegisterComponent.prototype.ngOnInit = function () {
        this.registerform = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            repassword: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.minLength(3)]]
        });
    };
    AuthRegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.credentials.password !== this.credentials.repassword) {
            console.log('passwords must be equal');
            return false;
        }
        this.authenticationService
            .register(this.credentials)
            .subscribe(function (result) {
            _this.submit.emit(result);
        });
    };
    AuthRegisterComponent.prototype.loginAccount = function () {
        this.changePage.emit(true);
    };
    AuthRegisterComponent.decorators = [
        { type: Component, args: [{
                    selector: "auth-app-register",
                    template: "\n<ion-grid>\n   <ion-row>\n     <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>\n        <ion-list>\n            <form [formGroup]=\"registerform\" (ngSubmit)=\"onSubmit()\">\n                <ion-item>\n                    <ion-label stacked primary>Username</ion-label>\n                    <ion-input [(ngModel)]=\"credentials.username\" formControlName=\"username\"\n                            type=\"text\" id=\"username\" spellcheck=\"false\" autocapitalize=\"off\" ngDefaultControl>\n                    </ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label stacked primary>Email</ion-label>\n                    <ion-input [(ngModel)]=\"credentials.email\" formControlName=\"email\"\n                            type=\"text\" id=\"email\" spellcheck=\"false\" autocapitalize=\"off\" ngDefaultControl>\n                    </ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label stacked primary>Password</ion-label>\n                    <ion-input [(ngModel)]=\"credentials.password\" formControlName=\"password\" type=\"text\" id=\"password\">\n                    </ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label stacked primary>Repeat Password</ion-label>\n                    <ion-input [(ngModel)]=\"credentials.repassword\" formControlName=\"repassword\" type=\"text\" id=\"repassword\">\n                    </ion-input>\n                </ion-item>\n                <button ion-button type=\"submit\" block full primary [disabled]=\"!registerform.valid\">Register</button>\n                <button ion-button type=\"submit\" block secondary (click)=\"loginAccount()\">Login to account</button>\n                <social-login></social-login>\n            </form>\n        </ion-list>\n     </ion-col>\n   </ion-row>\n </ion-grid>\n    ",
                    styles: [""],
                    encapsulation: ViewEncapsulation.Emulated
                },] },
    ];
    /** @nocollapse */
    AuthRegisterComponent.ctorParameters = function () { return [
        { type: AuthenticationService, },
        { type: FormBuilder, },
    ]; };
    AuthRegisterComponent.propDecorators = {
        "submit": [{ type: Output },],
        "changePage": [{ type: Output },],
    };
    return AuthRegisterComponent;
}());
export { AuthRegisterComponent };
//# sourceMappingURL=register.component.js.map