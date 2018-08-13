import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1776062755846628")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
	      provider: new GoogleLoginProvider("136230663300-64tm5v1laad62q52aec3t6n05913p4c6.apps.googleusercontent.com")
        },
      ]
  )
  return config;
}

@NgModule({
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
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthenticationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthenticationModule {

    static forRoot(config: ConfigService): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [
                {
                    provide: ConfigService, 
                    useValue: config 
                }
            ]
        };
    }

}

