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
---
## Firebase Authentication Module

We will also need **@angular/fire** to use the Firebase services, for this we must have previously created a project on this platform and enabled authentication methods such as **Email/passord**, **Facebook** and **Google**.
```
npm install firebase @angular/fire --save
```
We position ourselves in the **app.module.ts** of our project and configure **AngularFireModule** with the credentials we obtain from the Firebase platform. It will look as follows.


```
import { AngularFireModule } from '@angular/fire';

@NgModule({
  imports: [
    AngularFireModule.initializeApp({
      apiKey: '<your-apiKey>'
      authDomain: '<your-authDomain>'
      databaseURL: '<your-databaseURL>'
      projectId: '<your-projectId>'
      storageBucket: '<your-storageBucket>'
      messagingSenderId: '<your-messagingSenderId>'
      appId: '<your-appId>'
      measurementId: '<your-measurementId>'
    }),
  ],
})
export class AppModule { }
```

### Installation
```
npm i cap-authorization
```
---

### **Implementation into a module**

To use this module go-to the app module and into the sections' import and put the Authentication Module.
```
import { AuthenticationModule } from 'cap-authorization'
```
---
into the import section
```
@NgModule({
  imports: [
    AuthenticationModule,
  ],
})
export class AppModule { }
```
---

### **HTML tags**

* #### **Authentication LogIn**
```
<cap-log-in-firebase></cap-log-in-firebase>
```
---
* #### **Authentication Register**
```
<cap-register-firebase></cap-register-firebase>
```
---
* #### **Authentication Profile**
```
<cap-profile-firebase></cap-profile-firebase>
```
---
* #### **Authentication Forgot Password**
```
<cap-change-password-firebase></cap-change-password-firebase>
```
---
* #### **Authentication Log Out**
```
<cap-log-out-firebase></cap-log-out-firebase>
```
---


## Auth0 Authentication Module
In order to use this module we will not need any external dependency just import the module in our `app.module.ts`. Previously we must have configured our auth0 service and have the credentials that we will indicate next.


### Installation
```
npm i cap-authorization
```
---

### **Implementation into a module**

To use this module go-to the app module and into the sections' import and put the Authentication Module.
```
import { AuthenticationModule } from 'cap-authorization'
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

