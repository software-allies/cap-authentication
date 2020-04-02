# CAP AUTHENTICATION [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

**CAP AUTHENTICATION** is a module for **Angular**

* Log In
* Profile
* Registration
* Change Password

you can use one of the two largest authentication services on the market **Auth0** or **Firebase**

## **Previous requirements**
**CAP AUTHENTICATION** use bootstrap's classes. To be able to display the component in the right way, bootstrap should have been installed in the project. In case you don't have bootstrap installed, you can run the following command or read their [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/download/):
```
npm install bootstrap
```
One's that you installed bootstrap you have to configure the `angular.json` and write into `styles`
```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.scss"
]
```

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
      clientSecret: '<your clientSecret>'
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
