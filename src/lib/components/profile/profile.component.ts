import { Component, Inject, PLATFORM_ID, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: "cap-profile",
  template: `

<div class="box">
    <div>
        <div class="form-content" *ngIf="user">
            <form [formGroup]="profileUserForm" (ngSubmit)="editProfile()">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <small class="form-text">
                                First name
                            </small>
                            <input type="text" class="form-control" placeholder="First name *" formControlName="name" [ngClass]="{
                          'invalidField':(!profileUserForm.get('name').valid) || (validatedForm && !profileUserForm.get('name').valid)}" />
                            <small *ngIf="!profileUserForm.get('name').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                                Required field
                            </small>
                        </div>
                        <div class="form-group">
                            <small class="form-text">
                                Last name
                            </small>
                            <input type="text" class="form-control" placeholder="Last name *" formControlName="family_name" [ngClass]="{
                          'invalidField':(!profileUserForm.get('family_name').valid) || (validatedForm && !profileUserForm.get('family_name').valid)}" />
                            <small *ngIf="!profileUserForm.get('family_name').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                            Required field
                            </small>
                        </div>
                        <div class="form-group">
                            <small class="form-text">
                                Nickname
                            </small>
                            <input type="text" class="form-control" placeholder="Nickname *" formControlName="nickname" [ngClass]="{
                          'invalidField':(!profileUserForm.get('nickname').valid) || (validatedForm && !profileUserForm.get('nickname').valid)}" />
                            <small *ngIf="!profileUserForm.get('nickname').valid && validatedForm" [ngStyle]="{'color':'#dc3545'}" class="form-text">
                                Required field
                            </small>
                        </div>
                        <div *ngIf="userUpdated" class="form-control-feeback mb-2 text-success text-center">
                            User updated successfully
                        </div>
                        <div *ngIf="errorUpdate" class="form-control-feeback mb-2 text-danger text-center">
                            Error updating information, try again later
                        </div>
                        <button type="submit" class="btnSubmit">
                                Edit Profile
                        </button>
                    </div>
                </div>
                <div class="row mt-3 mb-3">
                    <div class="col">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"> Email : {{user.email}}</li>
                            <li class="list-group-item"> First name: {{user.name}}</li>
                            <li class="list-group-item"> Last name: {{user.family_name}}</li>
                            <li class="list-group-item"> Nickname: {{user.nickname}} </li>
                            <li class="list-group-item"> Verified Email: {{user.email_verified ? 'Si' : 'No'}}</li>
                            <li class="list-group-item"> Creation Date: {{user.created_at | date:'medium'}}</li>
                            <li class="list-group-item"> Last SignIn: {{user.last_login | date:'medium'}}</li>
                        </ul>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col">
                    <button (click)="changePassword(user.email)" type="submit" class="btnSubmit">
                        Change Password
                    </button>
                    <label *ngIf="passwordUpdated" class="col text-center col-form-label">
                        An e-mail was sent to your email address that you provided, there you can change your password.
                    </label>
                    <label *ngIf="passwordUpdatedError" class="col text-danger text-center col-form-label">
                        An error occurred with the server when checking your email, try again later
                    </label>
                </div>
            </div>
        </div>
        <div *ngIf="verifiedUser">
            <div class="form-content">
                <div class="form-group d-flex justify-content-center row">
                    <label *ngIf="!emailSend" class="col text-center col-form-label">
                        Please verify your Account
                    </label>
                    <label *ngIf="emailSend" class="col text-center col-form-label">
                        An e-mail was sent to your email address that you provided, there you can verify your email.
                    </label>
                    <label *ngIf="errorEmailSend" class="col text-danger text-center col-form-label">
                        An error occurred with the server when checking your email, try again later
                    </label>
                    <div class="col">
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

`],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthProfileComponent implements OnInit {

  profileUserForm: FormGroup;
  userUpdated: boolean;
  user: any;
  errorUpdate: boolean;
  verifiedUser: boolean;
  emailSend: boolean;
  errorEmailSend: boolean;
  validatedForm: boolean;
  userId: string;
  passwordUpdated: boolean;
  passwordUpdatedError: boolean;

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
  }

  ngOnInit() {
    this.getProfile();
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
      this.authenticationService.getAuth0Token().subscribe((token: string) => {
        this.authenticationService.updateProfile(this.profileUserForm.value, this.userId, token).subscribe((userUpdated: any) => {
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

  changePassword(email: string) {
    this.authenticationService.changePassword(email).subscribe((response: any) => {}, (res) => {
      if (res.status === 200) {
        this.passwordUpdated = true;
      } else if (res.status >= 400) {
        this.passwordUpdatedError = true;
      }
    });
  }
}
