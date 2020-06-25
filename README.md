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

## HTML tags

*  **Authentication LogIn**
```
<cap-login></cap-login>
```
*  **Authentication Register**
```
<cap-register></cap-register>
```
*  **Authentication Profile**
```
<cap-profile></cap-profile>
```
*  **Authentication Forgot Password**
```
<cap-change-password></cap-change-password>
```

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

**Note**: An object is stored in the localStorage to know the status of the User.
