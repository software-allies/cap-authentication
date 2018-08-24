import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
var SocialLoginComponent = /** @class */ (function () {
    function SocialLoginComponent(socialAuthService, authenticationService) {
        this.socialAuthService = socialAuthService;
        this.authenticationService = authenticationService;
        this.socialMedia = [
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
    }
    SocialLoginComponent.prototype.ngOnInit = function () { };
    SocialLoginComponent.prototype.socialSignIn = function (socialPlatform) {
        var _this = this;
        // console.log('socialPlatform: ', socialPlatform);
        var socialPlatformProvider;
        if (socialPlatform == "Facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
        else if (socialPlatform == "Google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            _this.authenticationService.isLoggedIn = true;
            _this.authenticationService.saveSocialMediaData(userData);
        });
    };
    SocialLoginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-login',
                    template: "\n    <div *ngIf=\"socialMedia\">\n      <div *ngFor=\"let social of socialMedia\">\n        <button ion-button color=\"{{social.color}}\" type=\"submit\" block secondary (click)=\"socialSignIn(social.name)\" icon-end>\n          {{ social.name }}    \n          <ion-icon md=\"logo-{{ social.icon }}\" name=\"logo-{{ social.icon }}\" item-right></ion-icon> \n        </button>\n      </div>\n    </div>\n    ",
                },] },
    ];
    /** @nocollapse */
    SocialLoginComponent.ctorParameters = function () { return [
        { type: AuthService, },
        { type: AuthenticationService, },
    ]; };
    return SocialLoginComponent;
}());
export { SocialLoginComponent };
//# sourceMappingURL=social-login.componet.js.map