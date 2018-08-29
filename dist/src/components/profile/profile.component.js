import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from '../../services/authentication.service';
var AuthEditComponent = /** @class */ (function () {
    function AuthEditComponent(authenticationService, formBuilder) {
        this.authenticationService = authenticationService;
        this.formBuilder = formBuilder;
        this.submit = new EventEmitter();
        this.changePage = new EventEmitter();
        this.credentials = {
            username: '',
            password: '' //este credencial es obligatoria
        };
        this.credentials = {
            username: '',
            password: ''
        };
    }
    AuthEditComponent.prototype.ngOnInit = function () {
        this.editForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
        });
    };
    AuthEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authenticationService
            .editProfile(this.credentials)
            .subscribe(function (result) {
            _this.submit.emit(result);
        });
    };
    AuthEditComponent.decorators = [
        { type: Component, args: [{
                    selector: "auth-app-edit-profile",
                    template: "\n    <ion-grid>\n        <ion-row>\n        <ion-col  col-12 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1>\n            <ion-list>\n                <form [formGroup]=\"editForm\" (ngSubmit)=\"onSubmit()\">\n                    <ion-item>\n                        <ion-label stacked primary>Username</ion-label>\n                        <ion-input [(ngModel)]=\"credentials.username\" formControlName=\"username\"\n                                type=\"text\" id=\"username\" spellcheck=\"false\" autocapitalize=\"off\" ngDefaultControl>\n                        </ion-input>\n                    </ion-item>\n                    \n                    <button ion-button type=\"submit\" block full primary [disabled]=\"!editForm.valid\">Edit</button>\n                </form>\n            </ion-list>\n        </ion-col>\n        </ion-row>\n    </ion-grid> ",
                    styles: [""],
                    encapsulation: ViewEncapsulation.Emulated
                },] },
    ];
    /** @nocollapse */
    AuthEditComponent.ctorParameters = function () { return [
        { type: AuthenticationService, },
        { type: FormBuilder, },
    ]; };
    AuthEditComponent.propDecorators = {
        "submit": [{ type: Output },],
        "changePage": [{ type: Output },],
    };
    return AuthEditComponent;
}());
export { AuthEditComponent };
//# sourceMappingURL=profile.component.js.map