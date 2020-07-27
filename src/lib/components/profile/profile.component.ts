import { Component, Inject, PLATFORM_ID, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-profile',
  template: `
<div class="box">
  <div>
    <div class="form-content" *ngIf="user">
      <form  *ngIf="updateUser" [formGroup]="profileUserForm" (ngSubmit)="editProfile()">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <small class="form-text">
                First name <span>*</span>
              </small>
              <input
                type="text"
                class="form-control"
                formControlName="firstname"
                [ngClass]="{
                  'invalidField':(!profileUserForm.get('firstname').valid) || (validatedForm && !profileUserForm.get('firstname').valid)}"
              />
              <small *ngIf="!profileUserForm.get('firstname').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}"class="form-text">
                  Required field
              </small>
            </div>

            <div class="form-group">
              <small class="form-text">
                Last name <span>*</span>
              </small>
              <input
                type="text"
                class="form-control"
                formControlName="lastname"
                [ngClass]="{
                  'invalidField':(!profileUserForm.get('lastname').valid) || (validatedForm && !profileUserForm.get('lastname').valid)
                }"
              />
              <small *ngIf="!profileUserForm.get('lastname').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                Required field
              </small>
            </div>

            <div class="form-group">
              <small class="form-text">
                Nickname <span>*</span>
              </small>
              <input
                type="text"
                class="form-control"
                formControlName="nickname"
                [ngClass]="{
                  'invalidField':(!profileUserForm.get('nickname').valid) || (validatedForm && !profileUserForm.get('nickname').valid)
                }"
              />
              <small *ngIf="!profileUserForm.get('nickname').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                Required field
              </small>
            </div>

            <div class="form-group" *ngIf="userDB">
              <small class="form-text">
                Company
              </small>
              <input
                type="text"
                class="form-control"
                formControlName="company"
              />
              <small *ngIf="!profileUserForm.get('company').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                Required field
              </small>
            </div>


            <div *ngIf="userUpdated" class="form-control-feeback mb-2 text-success text-center">
              User updated successfully
            </div>

            <div *ngIf="errorUpdate" class="form-control-feeback mb-2 text-danger text-center">
              Error updating information, try again later
            </div>

            <button type="submit" class="btn btn-info btn-block btnSubmit mb-3">
              Save
            </button>

            <button (click)="changeView()" class="btn btn-info btn-block btnSubmit">
              Cancel
            </button>

          </div>
        </div>

      </form>
      <div *ngIf="!updateUser" class="row mt-3 mb-3">
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> Email : {{user.email}}</li>
            <li class="list-group-item"> First name: {{user.name}}</li>
            <li class="list-group-item"> Last name: {{user.family_name}}</li>
            <li class="list-group-item"> Nickname: {{user.nickname}} </li>

            <li *ngIf="userDB" class="list-group-item"> Company: {{ userDB.Company }}</li>

            <li class="list-group-item"> Verified Email: {{user.email_verified ? 'Yes' : 'No'}}</li>
            <li class="list-group-item"> Creation Date: {{user.created_at | date:'medium'}}</li>
            <li class="list-group-item"> Last SignIn: {{user.last_login | date:'medium'}}</li>
          </ul>

          <button (click)="changeView()" type="submit" class="btn btn-success btn-block btnSubmit">
            Edit Profile
          </button>
        </div>
      </div>

      <div *ngIf="!updateUser" class="row">
        <div class="col-12">
          <button (click)="changePassword(user.email)" type="submit" class="btn btn-success btn-block btnSubmit">
            Change Password
          </button>
          <label *ngIf="passwordUpdated" class="col-12 text-center col-form-label">
            An e-mail was sent to your email address that you provided, there you can change your password.
          </label>
          <label *ngIf="passwordUpdatedError" class="col-12 text-danger text-center col-form-label">
            An error occurred with the server when checking your email, try again later
          </label>
        </div>
      </div>

    </div>
    <div *ngIf="verifiedUser">
      <div class="form-content">
          <div class="form-group d-flex justify-content-center row text-center">
            <label *ngIf="!emailSend" class="col-12 text-center col-form-label">
                Please verify your Account
            </label>
            <label *ngIf="emailSend" class="col-12 text-center col-form-label">
                An e-mail was sent to your email address that you provided, there you can verify your email.
            </label>
            <label *ngIf="errorEmailSend" class="col-12 text-danger text-center col-form-label">
                An error occurred with the server when checking your email, try again later
            </label>
            <div class="col-12 text-center">
                <button
                  *ngIf="!emailSend"
                  type="submit"
                  (click)="emailToVerifySent()"
                  class="btn btn-success btn-block btnSubmit"
                >
                  Send verification email
                </button>
                <button *ngIf="emailSend" type="button" (click)="goToHome()" class="btn btn-default btn-block btnSubmit">Go to Home</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>`,
  styles: [`

.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box>div {
  height: max-content;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
  padding: 35px;
  width: 650px;
  margin: 40px;
}

.box .list-group-item {
  background-color: transparent;
}

span {
  color: #cb2431;
}

.invalidField {
  border-color:#dc3545;
}
`],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthProfileComponent implements OnInit {

  profileUserForm: FormGroup;

  userUpdated: boolean;
  userId: string;
  user: any;
  userDB: any;

  errorUpdate: boolean;
  errorEmailSend: boolean;

  verifiedUser: boolean;
  emailSend: boolean;
  validatedForm: boolean;

  passwordUpdated: boolean;
  passwordUpdatedError: boolean;

  authenticationServiceErrorMessage = 'A problem has occurred while establishing communication with the authentication service';
  serviceErrorBackEndMessage = 'A problem has occurred while establishing communication with the BackEnd';

  updateUser: boolean;

  @Output() userProfileData = new EventEmitter();
  @Output() userProfileUpdate = new EventEmitter();
  @Output() userProfileUpdateError = new EventEmitter();
  @Output() userProfileError = new EventEmitter();

  @Output() userProfileDataBase = new EventEmitter();
  @Output() userProfileDataBaseUpdate = new EventEmitter();
  @Output() userProfileDataBaseUpdateError = new EventEmitter();
  @Output() userProfileDataBaseError = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
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
    this.passwordUpdated = false;
    this.passwordUpdatedError = false;
    this.updateUser = false;
  }

  ngOnInit() {
    this.getProfile();
  }

  changeView() {
    this.updateUser = !this.updateUser;
  }

  emailToVerifySent() {
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.verifyEmail(this.userId, token).subscribe((status: any) => {
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
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.getUser(this.userId, token).subscribe((user: any) => {
        this.userProfileData.emit(user);
        if (user && user.email_verified) {
          this.user = user;
          if (this.authenticationService.ApiToConsult()) {
            this.authenticationService.getUserFromAPI(user.user_id).subscribe((User: any) => {
              this.userProfileDataBase.emit(User);
              this.userDB = User;
              this.profileUserForm = new FormGroup({
                firstname: new FormControl(User.FirstName, [Validators.required]),
                lastname: new FormControl(User.LastName, [Validators.required]),
                company: new FormControl(User.Company, []),
                nickname: new FormControl(user.nickname, [Validators.required]),
              });
            }, (error: any) => {
              this.userProfileDataBaseError.emit(error);
              console.log('Error ' + error.status + ': ' + this.serviceErrorBackEndMessage);
              this.profileUserForm = new FormGroup({
                firstname: new FormControl(user.name, [Validators.required]),
                lastname: new FormControl(user.family_name, [Validators.required]),
                nickname: new FormControl(user.nickname, [Validators.required]),
              });
            });
          } else {
            this.profileUserForm = new FormGroup({
              firstname: new FormControl(user.name, [Validators.required]),
              lastname: new FormControl(user.family_name, [Validators.required]),
              nickname: new FormControl(user.nickname, [Validators.required]),
            });
          }
        } else if (!user.email_verified) {
          this.verifiedUser = true;
        }
      }, ((error: any) => {
        console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage);
        this.userProfileError.emit(error);
        this.router.navigate(['/']);
      }));
    }, (error: any) => {
      console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage);
      this.router.navigate(['/']);
    });
  }

  editProfile() {
    if (this.profileUserForm.valid) {
      this.authenticationService.getAuth0Token().subscribe((token: string) => {
        this.authenticationService.updateProfile(this.profileUserForm.value, this.userId, token).subscribe((userUpdated: any) => {
          if (userUpdated) {
            this.userProfileUpdate.emit(userUpdated);
            this.user = userUpdated;
            this.userUpdated = true;
            setTimeout(() => {
              this.userUpdated = false;
              this.changeView();
            }, 900);
          }
        }, ((error: any) => {
          console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage);
          this.errorUpdate = true;
          this.userProfileUpdateError.emit(error);
          setTimeout(() => {
            this.errorUpdate = false;
          }, 3000);
        }));
      }, (error: any) => console.log('Error ' + error.status + ': ' + this.authenticationServiceErrorMessage));
      if (this.authenticationService.ApiToConsult()) {
        this.authenticationService.updateProfileFromAPI(this.userDB.id, this.profileUserForm.value).subscribe((userUpdated: any) => {
          this.userProfileDataBaseUpdate.emit(userUpdated);
          this.userDB = userUpdated;
        }, (error: any) => {
          console.log('Error ' + error.status + ': ' + this.serviceErrorBackEndMessage);
          this.userProfileDataBaseUpdateError.emit(error);
        });
      }
    } else {
      this.validatedForm = true;
    }
  }

  changePassword(email: string) {
    this.authenticationService.changePassword(email).subscribe((response: any) => this.passwordUpdated = true, (res) => {
      if (res.status === 200) {
        this.passwordUpdated = true;
      } else if (res.status >= 400) {
        this.passwordUpdatedError = true;
      }
    });
  }
}
