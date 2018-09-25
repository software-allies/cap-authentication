import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from 'ionic-angular';
import { ConfigService } from './services/config.service';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from "@angular/common";

import { AuthRegisterComponent } from './components/register/register.component';
import { AuthLoginComponent } from './components/login/login.component';
import { AuthEditComponent } from './components/profile/profile.component';
import { AuthChangePasswordComponent } from './components/change-password/change-password.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { SocialLoginComponent } from '../src/components/socialLogin/social-login.componet';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from './environments/environment' 
import { IConfig } from './interfaces/config.interface';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthChangePasswordComponent,
    AuthEditComponent,
    SocialLoginComponent
  ],
  imports: [
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthChangePasswordComponent,
    AuthEditComponent,
  ],
  providers: [
    AuthenticationService,
    FCM,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthenticationModule {

  static forRoot(config: IConfig): ModuleWithProviders {
    
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

