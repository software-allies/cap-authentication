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
import { SocialLoginModule } from 'angular5-social-login';
import { SocialLoginComponent } from '../src/components/socialLogin/social-login.componet';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IConfig } from './interfaces/config.interface';
import { FCM } from '@ionic-native/fcm';
import { Facebook } from '@ionic-native/facebook';

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
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    Facebook,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})  
export class AuthenticationModule {

  static forRoot(config: IConfig): ModuleWithProviders {
    
    return { 
      ngModule: AuthenticationModule, 
      providers: [
        {
          provide: ConfigService,
          useValue: config,
        },
      ]
    };
  }
}

