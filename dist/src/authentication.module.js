import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from 'ionic-angular';
import { ConfigService } from './config.service';
import { AuthenticationService } from './authentication.service';
import { CommonModule } from "@angular/common";
import { AuthRegisterComponent } from './components/register/register.component';
import { AuthLoginComponent } from './components/login/login.component';
import { AuthChangePasswordComponent } from './components/change-password/change-password.component';
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule.forRoot = function (config) {
        return {
            ngModule: AuthenticationModule,
            providers: [
                {
                    provide: ConfigService,
                    useValue: config
                }
            ]
        };
    };
    AuthenticationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AuthLoginComponent,
                        AuthRegisterComponent,
                        AuthChangePasswordComponent,
                    ],
                    imports: [
                        IonicModule,
                        HttpClientModule,
                        ReactiveFormsModule,
                        CommonModule,
                    ],
                    exports: [
                        HttpClientModule,
                        ReactiveFormsModule,
                        CommonModule,
                        AuthLoginComponent,
                        AuthRegisterComponent,
                        AuthChangePasswordComponent,
                    ],
                    providers: [
                        AuthenticationService
                    ],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ]
                },] },
    ];
    return AuthenticationModule;
}());
export { AuthenticationModule };
//# sourceMappingURL=authentication.module.js.map