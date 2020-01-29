import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { IConfig } from './interfaces/config.interface';
import { AuthenticationAuth0Service } from './services/authentication-auth0.service';
import { CommonModule } from "@angular/common";

import { AuthRegisterAuth0Component } from './components/register/register-auth0.component';
import { AuthProfileAuth0Component } from './components/profile/profile-auth0.component';
import { AuthLoginAuth0Component } from './components/login/login-auth0.component';
import { logOutAuth0Component } from './components/log-out/log-out-Auth0.component';
import { AuthChangePasswordComponent } from './components/change-password/change-password-auth0.component';

@NgModule({
  declarations: [
    AuthChangePasswordComponent,
    AuthRegisterAuth0Component,
    AuthProfileAuth0Component,
    AuthLoginAuth0Component,
    logOutAuth0Component
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    AuthChangePasswordComponent,
    AuthRegisterAuth0Component,
    AuthProfileAuth0Component,
    AuthLoginAuth0Component,
    logOutAuth0Component
  ],
  providers: [
    AuthenticationAuth0Service,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AuthenticationAuth0Module {
  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: AuthenticationAuth0Module,
      providers: [
        {
          provide: ConfigService,
          useValue: config,
        },
      ]
    };
  }
}

