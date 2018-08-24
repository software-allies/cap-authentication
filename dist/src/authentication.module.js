import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from 'ionic-angular';
import { ConfigService } from './services/config.service';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from "@angular/common";
import { AuthRegisterComponent } from './components/register/register.component';
import { AuthLoginComponent } from './components/login/login.component';
import { AuthChangePasswordComponent } from './components/change-password/change-password.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { SocialLoginComponent } from '../src/components/socialLogin/social-login.componet';
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule.forRoot = function (config) {
        function getAuthServiceConfigs() {
            var config_ = new AuthServiceConfig([
                {
                    id: FacebookLoginProvider.PROVIDER_ID,
                    provider: new FacebookLoginProvider(config.facebookId)
                },
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(config.googleId)
                },
            ]);
            return config_;
        }
        return {
            ngModule: AuthenticationModule,
            providers: [
                {
                    provide: ConfigService,
                    useValue: config,
                },
                {
                    provide: AuthServiceConfig,
                    useFactory: getAuthServiceConfigs,
                },
            ]
        };
    };
    AuthenticationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AuthLoginComponent,
                        AuthRegisterComponent,
                        AuthChangePasswordComponent,
                        SocialLoginComponent
                    ],
                    imports: [
                        IonicModule,
                        HttpClientModule,
                        ReactiveFormsModule,
                        CommonModule,
                        SocialLoginModule
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