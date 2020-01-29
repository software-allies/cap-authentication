import { Component, Inject, PLATFORM_ID, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: "cap-profile-auth0",
  template: `
  <div class="container register-form">
    <div class="form">
      <div class="header">
          <p>Profile</p>
      </div>
      <div class="form-content" *ngIf="user">
        <form [formGroup]="profileUserForm" (ngSubmit)="editProfile()">
          <div class="row">
            <div class="col-md-6 mb-4">

              <div class="form-group">
                <small class="form-text">
                    First name
                </small>
                <input  type="text" class="form-control" placeholder="First name *" formControlName="name"
                        [ngClass]="{
                          'invalidField':(!profileUserForm.get('name').valid) || (validatedForm && !profileUserForm.get('name').valid)
                        }"
                />
                <small *ngIf="!profileUserForm.get('name').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                  Required field
                </small>
              </div>
              <div class="form-group">
                <small class="form-text">
                    Last name
                </small>
                <input  type="text" class="form-control" placeholder="Last name *" formControlName="family_name"
                        [ngClass]="{
                          'invalidField':(!profileUserForm.get('family_name').valid) || (validatedForm && !profileUserForm.get('family_name').valid)
                        }"
                />
                <small *ngIf="!profileUserForm.get('family_name').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                  Required field
                </small>
              </div>
              <div class="form-group">
                <small class="form-text">
                    Nickname
                </small>
                <input  type="text" class="form-control" placeholder="Nickname *" formControlName="nickname"
                        [ngClass]="{
                          'invalidField':(!profileUserForm.get('nickname').valid) || (validatedForm && !profileUserForm.get('nickname').valid)
                        }"
                />
                <small *ngIf="!profileUserForm.get('nickname').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                  Required field
                </small>
              </div>

              <div *ngIf="userUpdated" class="form-control-feeback mb-2 text-success text-center">
                  user updated successfully
              </div>
              <div *ngIf="errorUpdate" class="form-control-feeback mb-2 text-danger text-center">
                  Error updating information, try again later
              </div>
              <button type="submit"
                      class="btnSubmit">
                      Edit Profile
              </button>
            </div>
            <div class="col-md-6">
              <div class="ml-5">
                <p> Email : {{user.email}}</p>
                <p> First name: {{user.name}}</p>
                <p> Last name: {{user.family_name}}</p>
                <p> Nickname: {{user.nickname}} </p>
                <p *ngIf="user.email_verified"> Verified Email: Yes</p>
                <p *ngIf="!user.email_verified"> Verified Email: No</p>
                <p> Creation Date: {{user.created_at | date:'medium'}}</p>
                <p> Last SignIn: {{user.last_login | date:'medium'}}</p>

              </div>
            </div>
          </div>
        </form>
      </div>
      <div *ngIf="verifiedUser">
        <div class="form-content">
          <div class="form-group d-flex justify-content-center row">
            <label *ngIf="!emailSend" class="col-12  text-center col-form-label">
              Please verify your Account
            </label>
            <label *ngIf="emailSend" class="col-12  text-center col-form-label">
              An e-mail was sent to your email address that you provided, there you can verify your email.
            </label>
            <label *ngIf="errorEmailSend" class="col-12 text-danger text-center col-form-label">
                an error occurred with the server when checking your email, try again later
            </label>
            <div class="col-4">
                <button *ngIf="!emailSend" type="submit" (click)="emailToVerifySent()" class="btnSubmit">Send verification email</button>
                <button *ngIf="emailSend" type="button" (click)="goToHome()" class="btnSubmit">Go to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `,
  styles: [`
  .header
{
  text-align: center;
  height: 50px;
  background: black;
  color: #fff;
  font-weight: bold;
  line-height: 50px;
}
.form-content
{
  min-height: 150px;
  padding: 5%;
  border: 1px solid #ced4da;
  margin-bottom: 2%;
}
.form-control{
  border-radius:1.5rem;
}
.btnSubmit
{
  border:none;
  border-radius:1.5rem;
  padding: 1%;
  width: 100%;
  cursor: pointer;
  background: black;
  color: #fff;
}
`],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthProfileAuth0Component implements OnInit {

  profileUserForm: FormGroup;
  userUpdated: boolean;
  user: any;
  errorUpdate: boolean;
  verifiedUser: boolean;
  emailSend: boolean;
  errorEmailSend: boolean;
  validatedForm: boolean;
  userId: string;

  constructor(
    private authenticationAuth0Service: AuthenticationAuth0Service,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : this.router.navigate(['/']);
    }
    this.userUpdated = false;
    this.errorUpdate = false;
    this.verifiedUser = false;
    this.emailSend = false;
    this.errorEmailSend = false;
    this.validatedForm = false;
    this.user = null;
  }

  ngOnInit() {
    this.getProfile();
  }

  emailToVerifySent() {
    this.authenticationAuth0Service.getAuth0Token().subscribe((token: string) => {
      this.authenticationAuth0Service.verifyEmail(this.userId, token).subscribe((status: any) => {
        if (status) {
          this.emailSend = true;
        }
      }, (error => this.errorEmailSend = true));
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  getProfile() {
    this.authenticationAuth0Service.getAuth0Token().subscribe((token: string) => {
      this.authenticationAuth0Service.getUser(this.userId, token).subscribe((user: any) => {
        if (user && user.email_verified) {
          this.user = user;
          this.profileUserForm = new FormGroup({
            'name': new FormControl(user.name, [Validators.required]),
            'family_name': new FormControl(user.family_name, [Validators.required]),
            'nickname': new FormControl(user.nickname, [Validators.required]),
          });
        } else if (!user.email_verified) {
          this.verifiedUser = true;
        }
      }, (error => this.router.navigate(['/'])));
    });
  }

  editProfile() {
    if (this.profileUserForm.valid) {
      this.authenticationAuth0Service.getAuth0Token().subscribe((token: string) => {
        this.authenticationAuth0Service.updateProfile(this.profileUserForm.value, this.userId, token).subscribe((userUpdated: any) => {
          if (userUpdated) {
            this.user = userUpdated;
            this.userUpdated = true;
            setTimeout(() => {
              this.userUpdated = false;
            }, 3000);
          }
        }, ((error: any) => {
          console.error(error);
          this.errorUpdate = true;
          setTimeout(() => {
            this.errorUpdate = false;
          }, 3000);
        }));
      });
    } else {
      this.validatedForm = true;
    }
  }

}
