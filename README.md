# CAP AUTHENTICATION [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

**CAP AUTHENTICATION** is a module for **Angular**

* registration
* login
* profile
* change password

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

## Auth0 Authentication Module
In order to use this module we will not need any external dependency just import the module in our `app.module.ts`. Previously we must have configured our auth0 service and have the credentials that we will indicate next.

---

### **Implementation into a module**

To use this module go-to the app module and into the sections' import and put the Authentication Module.
```
import { AuthenticationAuth0Module } from 'cap-authorization'
```
---
into the import section
```
@NgModule({
  imports: [
    AuthenticationAuth0Module.forRoot({
      domain: '<your-domain>',
      clientId: '<your clientId>',
      clientSecret: '<your clientSecret>'
    })
  ],
})
export class AppModule { }
```
---

### **HTML tags**

* #### **Authentication LogIn**
```
<cap-log-in-auth0></cap-log-in-auth0>
```
---
* #### **Authentication Register**
```
<cap-register-auth0></cap-register-auth0>
```
---
* #### **Authentication Profile**
```
<cap-profile-auth0></cap-profile-auth0>
```
---
* #### **Authentication Forgot Password**
```
<cap-change-password-auth0></cap-change-password-auth0>
```
---
* #### **Authentication Log Out**
```
<cap-log-out-auth0></cap-log-out-auth0>
```
---
**Note**: An object is stored in the localStorage to know the status of the User.
