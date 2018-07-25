import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from './../../authentication.service';
var AuthChangePasswordComponent = /** @class */ (function () {
    function AuthChangePasswordComponent(authenticationService, formBuilder) {
        this.authenticationService = authenticationService;
        this.formBuilder = formBuilder;
        this.submit = new EventEmitter();
        this.changePage = new EventEmitter();
        this.credentials = {
            password: '',
            repassword: ''
        };
        this.credentials = {
            password: '',
            repassword: ''
        };
    }
    AuthChangePasswordComponent.prototype.ngOnInit = function () {
        this.changeform = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(3)]],
            repassword: ['', [Validators.required, Validators.minLength(3)]]
        });
    };
    AuthChangePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authenticationService
            .changePassword(this.changeform.value)
            .subscribe(function (result) {
            _this.submit.emit(result);
        });
    };
    AuthChangePasswordComponent.prototype.loginAccount = function () {
        this.changePage.emit(true);
    };
    AuthChangePasswordComponent.decorators = [
        { type: Component, args: [{
                    selector: "auth-app-change-password",
                    template: "\n<ion-grid>\n   <ion-row>\n     <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>\n        <ion-list>\n            <form [formGroup]=\"changeform\" (ngSubmit)=\"onSubmit()\">\n            <ion-item>\n                <ion-label stacked primary>Password</ion-label>\n                <ion-input [(ngModel)]=\"credentials.password\" formControlName=\"password\" type=\"text\" id=\"password\" ngDefaultControl>\n                </ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label stacked primary>Repeat Password</ion-label>\n                <ion-input [(ngModel)]=\"credentials.repassword\" formControlName=\"repassword\" type=\"text\" id=\"repassword\" ngDefaultControl>\n                </ion-input>\n            </ion-item>\n            <button ion-button type=\"submit\" block full primary [disabled]=\"!changeform.valid\">Change Password</button>\n            <button ion-button type=\"submit\" block secondary (click)=\"loginAccount()\">Login to account</button>\n            </form>\n        </ion-list>\n     </ion-col>\n   </ion-row>\n </ion-grid>\n  ",
                    styles: [""],
                    encapsulation: ViewEncapsulation.Emulated
                },] },
    ];
    /** @nocollapse */
    AuthChangePasswordComponent.ctorParameters = function () { return [
        { type: AuthenticationService, },
        { type: FormBuilder, },
    ]; };
    AuthChangePasswordComponent.propDecorators = {
        "submit": [{ type: Output },],
        "changePage": [{ type: Output },],
    };
    return AuthChangePasswordComponent;
}());
export { AuthChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map