# CAP AUTHENTICATION [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

**CAP AUTHENTICATION** is a module for **Angular**

* Log In
* Profile
* Registration
* Change Password

you can use one of the most popular google platforms on the market **Auth0**

## **Previous requirements**
**CAP AUTHENTICATION** use bootstrap's classes, You can use a CAP product ([cap-angular-schematic-bootstrap](https://www.npmjs.com/package/cap-angular-schematic-bootstrap)) to configure and install bootstrap to your project the installation is as follows.

```
ng add cap-angular-schematic-bootstrap@latest 4.0.0 true
```

![Alt text](https://raw.githubusercontent.com/software-allies/cap-angular-schematic-auth-auth0/development/assets/images/cap-angular-schematic-bootstrap.png "cap-angular-schematic-bootstrap")

you also have to install the dependency [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt) to obtain user token information.
```
npm i --save @auth0/angular-jwt
```
---

## Installation
```
npm i cap-authentication
```
---

## Implementation into a module

To use this module go to the app module and into the section's import and put the Authentication Module.
```
import { AuthenticationModule } from 'cap-authentication'
```
---
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
---
*  **Authentication Register**
```
<cap-register></cap-register>
```
---
*  **Authentication Profile**
```
<cap-profile></cap-profile>
```
---
*  **Authentication Forgot Password**
```
<cap-change-password></cap-change-password>
```
---
**Note**: An object is stored in the localStorage to know the status of the User.
