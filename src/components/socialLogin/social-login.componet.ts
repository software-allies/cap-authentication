// import { SocialMediaService } from '../../services/social-media.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { AuthService, FacebookLoginProvider, GoogleLoginProvider, AuthServiceConfig } from 'angular5-social-login';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'social-login',
    template: 
    `
    <div *ngIf="socialMedia">
      <div *ngFor="let social of socialMedia">
        <button ion-button color="{{social.color}}" type="submit" block secondary (click)="socialSignIn(social.name)" icon-end>
          {{ social.name }}    
          <ion-icon md="logo-{{ social.icon }}" name="logo-{{ social.icon }}" item-right></ion-icon> 
        </button>
      </div>
    </div>
    `,
    // 
    
})

export class SocialLoginComponent implements OnInit {
  socialMedia:any[] = [
    {
      name: 'Facebook',
      color: 'blue',
      icon: 'facebook'
    },
    {
      name: 'Google',
      color: 'danger',
      icon: 'googleplus'
    }
  ];
  constructor( private socialAuthService: AuthService, private authenticationService:AuthenticationService ) { }

  ngOnInit() { }

  socialSignIn(socialPlatform : string) {
      // console.log('socialPlatform: ', socialPlatform);
      let socialPlatformProvider:any;
      if(socialPlatform == "Facebook"){
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }else if(socialPlatform == "Google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
      
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          this.authenticationService.isLoggedIn = true;
          this.authenticationService.saveSocialMediaData(userData);
          // console.log(socialPlatform+" sign in data : " , userData);
          // Now sign-in with userData  
        }
      )
  }
}