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
    AuthenticationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthenticationModule {

  static forRoot(config: ConfigService): ModuleWithProviders {
    
    function getAuthServiceConfigs() {
      let config_ = new AuthServiceConfig(
        [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(config.facebookId)
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(config.googleId)
          },
        ]
      )
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
  }
}

