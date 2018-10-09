## CAP AUTHENTICATION

This module implements ionic complements but maybe in future releases, we could implement bootstrap.

CAP AUTHENTICATION it's a module that provides: 
* registration
* login
* profile
* change password

This module implements ionic complements but maybe in future releases, we could implement bootstrap.

## Installation Authentication module
Installation

```
npm i cap-authorization
```
---

## Configuration

Add the module into the app module or into the module that you want to implement this module after that write your credentials. 

```
import { AuthenticationModule } from 'cap-authorization'
```
---


into the import section
```
AuthenticationModule.forRoot({
      apiUrl: 'your-apiUrl',
      loginEndpoint: 'your-user',
    }),
```
---


## Login Component
The login component implement AngularFire2 for login with social media (Facebook and Google +). Into the module of Authentication write your credentials of Facebook and Google +.

### Create a new proyect Fireabse and configuration 

go to [Firebase Console] an create a new proyect. 

Once created, we take the credentials of our project in order to use the Firebase services. We find them in our project that we just created in Firebase, in the main panel we search for 'Firebase add firebase to app web' and we copy the credentials that are marked immediately.

Open the `app.module.ts` file, under `src/app` and Import AngularFireModule 
```
import { AngularFireModule } from '@angular/fire';
...

@NgModule({
...
	imports: [
		AngularFireModule.initializeApp({
		  apiKey: "xxxxxxxxxx",
		  authDomain: "your-domain-name.firebaseapp.com",
		  databaseURL: "https://your-domain-name.firebaseio.com",
		  projectId:"your-proyect-name"
		  storageBucket: "your-domain-name.appspot.com",
		  messagingSenderId: '<your-messaging-sender-id>')}
 	]
...
})
```

Then install the required packages in your project directory
```
$ npm install angularfire2 firebase promise-polyfill --save
$ npm install rxjs@6 rxjs-compat@6 promise-polyfill --save
```
This should add angularfire2, promise-polyfill and firebase entry in your project's package.json

### Configuring Firebase/Facebook

Go to [Facebook Developers] and create a new App.
If you are not yet registered, you can register with your Facebook account.
Once the App is created, get the `AppID` and `AppSecret` from the dashboard and come back to Firebase Console. 	

Within the Firebase project click on the Authentication section on the left hand side of the menu., we can see the ways to authenticate, We will use Facebook and Google.
we proceed to enable authentication by facebook and will ask us for the `AppID` and `AppSecret`, which we got when we created an App on Facebook for Delopers.
Also copy the "OAuth redirect URI" from the Firebase. We have to go back and add it to the facebook application. 

In Facebook Dashboard you should see `Facebook Login`, and click on the button to go to settings and there you should see "Valid OAuth redirect URIs" input field.
Enter the URI copied from Firebase Console and click on Save Changes, This will ensure Facebook and Firebase are able to talk to each other.

**To use our module in our application on mobile phone.**

Make sure you have added the platform to your project. If not, add the platform by executing the following command within your project:

```
$ ionic platform add android
```
now we need to have access to Native Mobile API's, which are provided by Cordova Plugins.
We can access these cordova plugins, using Ionic Native, which are nothing but wrappers for cordova plugins.

For the following we need again the `AppID` of our App of Facebook, next go to command prompt in your project directory and execute the following command by replacing the APP_ID with your App Id and APP_NAME with your App Name.

$ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"

we must make sure that the Plugin with the correct ID was added in your `config.xml`, it will look like this.

```
<plugin name="cordova-plugin-facebook4" spec="~1.7.4">
        <variable name="APP_ID" value="3579892456387654" />
        <variable name="APP_NAME" value="your-proyect-name" />
</plugin>

```
This will install the cordova plugin for facebook and you should also see a sub-folder named cordova-plugin-facebook4 under your plugins folder.
You can see the configuration and installation of Facebook plugin [here]

Add the native dependencies by executing the following command:
```
npm install --save @ionic-native/facebook
```

You'll also need to add the "Facebook" object in the provider section in app.module.ts.
```
import { Facebook } from '@ionic-native/facebook';...

@NgModule({
...
	providers: [
		Facebook
	]
...
})
```

### auth-app-login
The tag or selector auth-app-login provides an interface with two inputs and four buttons. 

Example
```
<h1>Login</h1>
<auth-app-login></auth-app-login>
```
![previews](readme-images/login.png)


### auth-app-login
The target or selector auth-app-change-password provides an interface with two inputs and two buttons.

Example
```
<h1>Change password</h1>
<auth-app-change-password></auth-app-change-password>
```
![previews](readme-images/change-password.png)


### auth-app-register
The target or selector auth-app-register provides an interface with two inputs and two buttons.

Example
```
<h1>Register</h1>
 <auth-app-register></auth-app-register>
```
![previews](readme-images/register.png)

## Services

If you want yo get the information of the user login with Facebook or Google you could use the getUserData method. This method is inside of the Authentication service and returns an object with the data of the social media.


## Implementation into a module

For use this module go to app module and into the sections of import put the authentintication module.

``` import { CapAuthentication } from 'cap-authorization'; 
        ...
    imports: [
        AuthenticationModule.forRoot({
            apiUrl: 'http://localhost:3000', // API Url
            loginEndpoint: 'users'  // [users or admin] endPoint in Loopback (for http://localhost:3000/users/login)
            
        })
    ]
    ...
```
---


## import the authentication services to use in a component:

``` 
import { AuthenticationService } from './services/authentication.service';
...
constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.isAuthenticated());
} 
```
---


## Exposed Methods

This method returns a Boolean value with the value isLoggedIn

```isAuthenticated()```

Receive a credentials interface

```login(values: CredentialsInterface)``` 

If is a login success set the token and isLoggedIn in localstorage and variable isLoggedIn as true.

``` (email: string and password: string) ```

Remove token and isLoggedIn from localStorage and the variable isLoggedIn set to false.

``` logout(): void ```

---


## Component Selectors
Each component refers to selectors.

auth-app-login

```
    @Output()
    submit: EventEmitter<any> = new EventEmitter();

    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter();
```

auth-app-register

``` 
    @Output()
    submit: EventEmitter<any> = new EventEmitter();
    
    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter(); 
```

auth-app-change-password

```
    @Output()
    submit: EventEmitter<any> = new EventEmitter();

    @Output()
    changePage: EventEmitter<boolean> = new EventEmitter();
```
---


More information [HERE](https://www.npmjs.com/package/authmodule-angular6-module-example)
[Facebook Developers]: https://developers.facebook.com/apps/
[Firebase Console]: https://console.firebase.google.com/u/0/
[here]: https://ionicframework.com/docs/native/facebook/	