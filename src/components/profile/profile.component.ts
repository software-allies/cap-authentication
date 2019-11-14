import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: "auth-app-profile",
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
                        placeholder="Full name *"
                        formControlName="displayName"/>
              </div>

              <div class="form-group" >
                <input  type="text"
                        class="form-control"
                        placeholder="Phone number *"
                        formControlName="phoneNumber"/>
              </div>
              <div *ngIf="userUpdated" class="form-control-feeback mb-2 text-success text-center">
                user updated successfully
              </div>
              <button
                type="submit"
                [disabled]="!(profileUserForm.get('displayName').dirty)"
                class="btnSubmit">
                Edit Profile
              </button>
            </div>
            <div class="col-md-6">
              <div class="ml-5">
                <p> Email : {{user.email}}
                <p> Authentication Method: {{user.providerData[0].providerId}} </p>
                <p> UID User: {{user.providerData[0].uid}} </p>
                <p *ngIf="user.emailVerified"> Verified Email : Yes
                <p *ngIf="!user.emailVerified"> Verified Email : No
                <p> Creation Date: {{user.metadata.creationTime | date:'medium'}}
                <p> Last SignIn : {{user.metadata.lastSignInTime | date:'medium'}}
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
export class AuthEditComponent {

  profileUserForm: FormGroup;
  userUpdated: boolean;

  private user: any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.userUpdated = false;
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authenticationService.currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
        this.profileUserForm = new FormGroup({
          'displayName': new FormControl(user.displayName, []),
          'phoneNumber': new FormControl(user.phoneNumber, [])
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  editProfile() {
    this.authenticationService.currentUser.subscribe((user) => {
      if ( user ) {
        this.authenticationService.updateProfile(this.profileUserForm.get('displayName').value).then((response) => {
          this.userUpdated = true;
          setTimeout(() => {
            this.userUpdated = false;
       }, 3000);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
