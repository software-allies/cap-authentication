// import { SocialMediaService } from '../../services/social-media.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from  '@angular/fire/database';
import firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { SocialMediaInterface } from './../../interfaces/socialMedia.interface';

@Component({
    selector: 'social-login',
    template: 
    `
    <button ion-button color="blue" type="submit" block secondary (click)="signInWithFacebook()" icon-end>
       Login with Facebook  
    </button>
    <button ion-button color="danger" type="submit" block secondary (click)="signInWithGoogle()" icon-end>
       Login with Google  
    </button>
    `,
    
})

export class SocialLoginComponent implements OnInit {

  credentials : SocialMediaInterface = {
    username:'',
    email: '',
  }
  displayName:string; 

  constructor(private authenticationService : AuthenticationService,
              private angularFireauth: AngularFireAuth,
              private facebook: Facebook,
              private platform: Platform,
              private angularFireDatabase:AngularFireDatabase,
              ){}

  ngOnInit() {}

  signInWithFacebook(){
    if (this.platform.is('cordova')) {
      this.nativeFacebookLogin();
    } else {
      this.webFacobookLogin();
    }
  }

  signInWithGoogle(){
    if (this.platform.is('cordova')) {
      this.webGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

//Authentication
  authCordova(){
    this.angularFireauth.authState.subscribe(user=>{
      if(user){
        this.credentials={
          username:user.displayName,
          email: user.email,
        }
        this.authenticationService.addRegisterSocialMedia(this.credentials);
      }
    })
  }

  authBrowser(){
    this.angularFireauth.authState.subscribe(user =>{
      if(user){
        this.credentials = {
        email:user.email,
        username:user.displayName,
      }
      const db = this.angularFireDatabase.database.ref('Browser');
      db.push(this.credentials);
      }
    })
  }

  //Browser
  webGoogleLogin() {
    this.angularFireauth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( res => console.log(res)
      )
      this.authBrowser();
  }

  webFacobookLogin(){
    this.angularFireauth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => console.log(res));
    this.authBrowser();
  }

  //Native
  nativeFacebookLogin(){
    this.facebook.login(['email', 'public_profile']).then(res=>{
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    firebase.auth().signInWithCredential(facebookCredential);    
    })
    this.authCordova();
  }

  nativeGoogleLogin(){}

}