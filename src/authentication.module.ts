
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from 'ionic-angular';
import { ConfigService } from './config.service';
import { AuthenticationService } from './authentication.service';
import { CommonModule } from "@angular/common";

import { AuthRegisterComponent } from './components/register/register.component';
import { AuthLoginComponent } from './components/login/login.component';
import { AuthChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
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

