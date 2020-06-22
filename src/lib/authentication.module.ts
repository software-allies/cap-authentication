import { GuardService } from './services/guard.service';
import { StateService } from './services/state.service';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { IConfig } from './interfaces/config.interface';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthRegisterComponent } from './components/register/register.component';
import { AuthProfileComponent } from './components/profile/profile.component';
import { AuthLoginComponent } from './components/login/login.component';
import { AuthChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AuthChangePasswordComponent,
    AuthRegisterComponent,
    AuthProfileComponent,
    AuthLoginComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AuthChangePasswordComponent,
    AuthRegisterComponent,
    AuthProfileComponent,
    AuthLoginComponent
  ],
  providers: [
    AuthenticationService,
    StateService,
    GuardService
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
          useValue: config
        },
      ]
    };
  }
}

