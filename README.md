## CAP AUTHENTICATION


```
npm i cap-authorization
```

**Configuration**
Add the module into your principal module, after that write your credentials.

Example:
```
AuthenticationModule.forRoot({
    apiUrl: 'your-api-url',
    loginEndpoint: 'your-end-point'
})
```



## Login Component
The login component implement [angular5-social-login](https://github.com/sabyasachibiswal/angular5-social-login) for login with social media (Facebook and Google +).
Into the module of Authentication write your credentials of Facebook and Google +.

### Facebook credentials
For use the facebook login you have to create an account in [Facebook for developers](https://developers.facebook.com/apps/) and add a new application.

![add project](readme-images/add-project.png)
Write your credentials (name of project and email).

After that, go to the new application and product's section and add the login with Facebook.
![add facebook login](readme-images/facebook-login.png)

