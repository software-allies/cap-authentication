# CAP AUTHENTICATION [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

**CAP AUTHENTICATION** is a module for **Angular**

* Log In
* Profile
* Registration
* Change Password

you can use one of the most popular authentication service platforms on the market **Auth0**.

---

## **Previous requirements**
**CAP AUTHENTICATION** use bootstrap's classes, You can use a CAP product [cap-angular-schematic-bootstrap](https://www.npmjs.com/package/cap-angular-schematic-bootstrap) to configure and install bootstrap to your project the installation is as follows.

```
ng add cap-angular-schematic-bootstrap@latest 4.0.0 true
```

![Alt text](https://raw.githubusercontent.com/software-allies/cap-angular-schematic-auth-auth0/development/assets/images/cap-angular-schematic-bootstrap.png "cap-angular-schematic-bootstrap")

Other external dependencies that are required for the module to function are the following:
* [UUID](https://www.npmjs.com/package/uuid)
* [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)

```
npm i --save uuid @auth0/angular-jwt
```
---

## Installation
```
npm i cap-authentication
```
---

## Implementation

To use this module, go to `app.module.ts`, in the import section and import it `AuthenticationModule` with your proper credentials.

```
import { AuthenticationModule } from 'cap-authentication'
```

into the import section
```
@NgModule({
  imports: [
    AuthenticationModule.forRoot({
      domain: '<your-domain>',
      clientId: '<your clientId>',
      clientSecret: '<your clientSecret>',
      endPoint: 'https://your-api-domain.com/api/<users>' // can be empty
    })
  ],
})
export class AppModule { }
```
---

## Usage

OutPuts are integrated in each of the packaged components for the transfer of information between the packaged component and the component that is rendering it. It will be shown immediately how you can implement them in your components. For questions or recommendations you can write to this email lenin_emmanuel@softwareallies.com

*  **Authentication LogIn**
```
<cap-login
  (userLoginData)="userLoginData($event)"
  (userLoginError)="userLoginError($event)">
</cap-login> 
```
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userLoginData(userData: any) {
    // console.log(userData);
  }
  userLoginError(UserError: any) {
    // console.log(serError);
  }
  
}
```
*  **Authentication Register**
```
<cap-register
  (userRegisterData)="userRegisterData($event)"
  (userRegisterError)="userRegisterError($event)"
  (userRegisterJWT)="userRegisterJWT($event)">
</cap-register> 
```
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userRegisterData(UserData: any) {
    // console.log(UserData);
  }
  userRegisterError(UserError: any) {
    // console.log(UserError);
  }
  userRegisterJWT(JWT: any) {
    console.log(JWT);
  }
  
}
```
*  **Authentication Profile**
```
<cap-profile
  (userProfileData)="userProfileData($event)"
  (userProfileError)="userProfileError($event)"
  (userProfileUpdate)="userProfileUpdate($event)"
  (userProfileUpdateError)="userProfileUpdateError($event)"
  (userProfileDataBase)="userProfileDataBase($event)"
  (userProfileDataBaseUpdate)="userProfileDataBaseUpdate($event)"
  (userProfileDataBaseUpdateError)="userProfileDataBaseUpdateError($event)"
  (userProfileDataBaseError)="userProfileDataBaseError($event)">
</cap-profile> 
```
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfileData(userProfile: any) {
    // console.log(userProfile);
  }
  userProfileError(profileError) {
    // console.log(profileError);
  }
  userProfileUpdate(profileUpdated) {
    // console.log(profileUpdated);
  }
  userProfileDataBase(profileDB) {
    // console.log(profileDB);
  }
  userProfileDataBaseUpdate(profileDBUpdated) {
    // console.log(profileDBUpdated);
  }
  userProfileDataBaseUpdateError(profileDBUpdatedError) {
    // console.log(profileDBUpdatedError);
  }
  userProfileDataBaseError(profileDBError) {
    // console.log(profileDBError);
  }
  userProfileUpdateError(prodileUpdatedError) {
    // console.log(prodileUpdatedError);
  }
  
}
```
*  **Authentication Forgot Password**
```
<cap-change-password
  (userEmail)="userEmail($event)"
  (forgotPasswordRequest)="forgotPasswordRequest($event)"
  (forgotPasswordRequestError)="forgotPasswordRequestError($event)">
</cap-change-password>
```
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  userEmail(email: any) {
    // console.log(email);
  }
  forgotPasswordRequest(request: any) {
    // console.log(request);
  }
  forgotPasswordRequestError(requestError: any) {
    // console.log(requestError);
  }
  
}
```
*  **Authentication SignOut**
```
import { AuthenticationService } from 'cap-authentication';

export class Component{
  constructor (public authenticationService: AuthenticationService) { }
  
  logoutFunction() {
   this.authenticationService.signOut() // Return to home page 
  }
}
```
---

## Styles

In order to edit and create classes that affect the components above, a class will have to be overwritten globally! all kinds and styles will have to go in the `src/styles.scss` file. with Pseudo-classes we will be able to modify the styles of the components, the component structure will be illustrated immediately to be able to access with scss each one of the nodes.

You can see an example of how to edit this module with your design [styles.scss](https://github.com/software-allies/cap-authentication/blob/development/styles.scss).

```
<div class="box">
    <div>
        <form>
        
            <!-- Register -->
            <!-- Login -->
            <!-- Forgot -->
            <div class="form-group">
                <label></label>
                <input class="form-control">
                <small class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label></label>
                <input class="form-control">
                <div class="form-control-feeback text-danger text-center">ErrorMessage</div>
            </div>
             <div class="form-group form-check">
                <small class="form-text text-right">
                    <a routerLink="#"> goTo </a>
                </small>
            </div>
            <button type="submit" class="btn btn-primary btn-block"></button>
            <!-- Register -->
            <!-- Login -->
            <!-- Forgot -->
            
            <!-- Profile -->
            <!-- Profile -->
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <small class="form-text"></small>
                        <input class="form-control"/>
                        <small class="form-text"></small>
                    </div>
                    <div class="form-control-feeback mb-2 text-success text-center">
                    </div>
                    <button class="btn btn-info btn-block btnSubmit"></button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{}}</li>
                    </ul>
                </div>
            </div>
            <!-- Profile -->
            <!-- Profile -->
            
        </form>
    </div>
</div>
```
