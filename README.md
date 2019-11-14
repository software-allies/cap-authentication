# CAP AUTHENTICATION [![Generic badge](https://img.shields.io/badge/CAP-Active-<COLOR>.svg)](https://shields.io/)

**CAP AUTHENTICATION** is a module for **Angular**, with this module you can authenticate users **Firebase**.

* registration
* login
* profile
* change password

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

## Installation Authentication module
```
npm i cap-authorization
```
---

## **Implementation into a module**

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

## **HTML tags**

* ### **Authentication LogIn**
```
<auth-app-login></auth-app-login>
```
---
* ### **Authentication Register**
```
<auth-app-register></auth-app-register>
```
---
* ### **Authentication Profile**
```
<auth-app-profile></auth-app-profile>
```
---
* ### **Authentication Forgot Password**
```
<auth-app-change-password></auth-app-change-password>
```
---
* ### **Authentication Log Out**
```
<auth-app-log-out></auth-app-log-out>
```
---


[Facebook Developers]: https://developers.facebook.com/apps/
[Firebase Console]: https://console.firebase.google.com/u/0/
[here]: https://ionicframework.com/docs/native/facebook/	
