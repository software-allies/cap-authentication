import { Component, Inject, PLATFORM_ID, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationAuth0Service } from '../../services/authentication-auth0.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: "auth-app-profile-auth0",
  template: `
  <div class="container register-form">
    <div class="form">
      <div class="header">
          <p>Profile</p>
      </div>
      <div class="form-content" *ngIf="user">
        <form [formGroup]="profileUserForm" (ngSubmit)="editProfile()">
          <div  class="row">
            <div class="col-md-6 mb-4">
              <div class="form-group" >
                <input  type="text"
                        class="form-control"
                        placeholder="First name *"
                        formControlName="name"/>
              </div>

              <div class="form-group" >
                <input  type="text"
                        class="form-control"
                        placeholder="Last name *"
                        formControlName="family_name"/>
              </div>

              <div class="form-group" >
                <input  type="text"
                        class="form-control"
                        placeholder="Nickname *"
                        formControlName="nickname"/>
              </div>


              <div *ngIf="userUpdated" class="form-control-feeback mb-2 text-success text-center">
                user updated successfully
              </div>
              <div *ngIf="errorUpdate" class="form-control-feeback mb-2 text-danger text-center">
                Error updating information, try again later
              </div>
              <button
                type="submit"
                [disabled]="!(profileUserForm.get('name').dirty || profileUserForm.get('family_name').dirty || profileUserForm.get('nickname').dirty)"
                class="btnSubmit">
                Edit Profile
              </button>
            </div>
            <div class="col-md-6">
              <div class="ml-5">
                <p> Email : {{user.email}}
                <p> First name : {{user.name}}
                <p> Last name : {{user.family_name}}
                <p> Nickname : {{user.nickname}} </p>
                <p *ngIf="user.emailVerified"> Verified Email : Yes
                <p *ngIf="!user.emailVerified"> Verified Email : No
                <p> Creation Date: {{user.created_at | date:'medium'}}
                <p> Last SignIn : {{user.last_login | date:'medium'}}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>`,
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
  userId: string;
  user: any;
  errorUpdate: boolean;

  constructor(
    private authenticationAuth0Service: AuthenticationAuth0Service,
    @Inject(PLATFORM_ID) private platformId,
    private router: Router,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).id : this.router.navigate(['/']);
    }
    this.userUpdated = false;
    this.errorUpdate = false;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authenticationAuth0Service.getToken().subscribe((token: string) => {
      this.authenticationAuth0Service.getUser(this.userId, token).subscribe((user: any) => {
        if (user) {
          this.user = user;
          this.profileUserForm = new FormGroup({
            'name': new FormControl(user.name, []),
            'family_name': new FormControl(user.family_name, []),
            'nickname': new FormControl(user.nickname, []),
          });
        }
      }, (error => this.router.navigate(['/'])));
    });
  }

  editProfile() {
    this.authenticationAuth0Service.getToken().subscribe((token: string) => {
      this.authenticationAuth0Service.editProfile(this.profileUserForm.value, this.userId, token).subscribe((userUpdated: any) => {
        if (userUpdated) {
          this.user = userUpdated;
          this.userUpdated = true;
          setTimeout(() => {
            this.userUpdated = false;
          }, 3000);
        }
      }, (error => {
        this.errorUpdate = true;
        setTimeout(() => {
          this.errorUpdate = false;
        }, 3000);
      }));
    });
  }
}
