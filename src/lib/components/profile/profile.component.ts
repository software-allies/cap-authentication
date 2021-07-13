import { Component, Inject, PLATFORM_ID, ViewEncapsulation, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cap-profile',
  template: `
<div class="register">
  <div class="register__form">
    <div class="form-container">

      <div *ngIf="!editView">
        <ng-container *ngIf="authUser || authUserDB">
          <p><span>Email:</span> {{(authUserDB && authUserDB.Email) ? authUserDB.Email : authUser.email}}</p>
          <p><span>First name:</span> {{(authUserDB && authUserDB.FirstName) ? authUserDB.FirstName : authUser.name}}</p>
          <p><span>Last name:</span> {{(authUserDB && authUserDB.LastName) ? authUserDB.LastName: authUser.family_name}}</p>
          <p><span>Nickname:</span> {{authUser.nickname}}</p>
          <p *ngIf="authUserDB"><span>Company:</span> {{ authUserDB.Company }}</p>
          <p><span>Verified Email:</span> {{authUser.email_verified ? 'Yes' : 'No'}}</p>
          <p><span>Creation Date:</span> {{authUser.created_at | date:'medium'}}</p>
          <p><span>Last SignIn:</span> {{authUser.last_login | date:'medium'}}</p>
          <div class="button-container">
            <button (click)="editView = !editView" type="submit" class="btns btns--blue">Edit Profile</button>
          </div>
        </ng-container>
      </div>

      <ng-container  *ngIf="(authUserDB || authUser) && editView">
        <form [formGroup]="profileUserForm" (ngSubmit)="editProfile()" class="form">
          <div class="form__group">
            <input
              id="first-name"
              type="text"
              class="form__input u-border-light"
              placeholder="First name"
              formControlName="firstname"
              [ngClass]="{
                'invalidField':(!profileUserForm.get('firstname').valid) || (validatedForm && !profileUserForm.get('firstname').valid)
              }"
            >
            <label for="first-name" class="form__label">First name</label>
          </div>
          <div class="form__group">
            <input
              id="last-name"
              type="text"
              class="form__input u-border-light"
              placeholder="Last name*"
              formControlName="lastname"
              [ngClass]="{
                'invalidField':(!profileUserForm.get('lastname').valid) || (validatedForm && !profileUserForm.get('lastname').valid)
              }"
            >
            <label for="last-name" class="form__label">Last name</label>
          </div>
          <div class="form__group">
            <input
              id="nickname"
              type="text"
              class="form__input u-border-light"
              placeholder="Nickname"
              formControlName="nickname"
              [ngClass]="{
                'invalidField':(!profileUserForm.get('nickname').valid) || (validatedForm && !profileUserForm.get('nickname').valid)
              }"
            >
            <label for="nickname" class="form__label">Nickname</label>
          </div>
          <div class="form__group" *ngIf="authUserDB">
            <input
              id="company"
              type="text"
              class="form__input u-border-light"
              placeholder="Company"
              formControlName="company"
            >
            <label for="company" class="form__label">Company</label>
          </div>
          <div class="button-container">
            <button type="submit" class="btns btns--blue mr-5">Save</button>
          </div>
          <div class="button-container">
            <button type="submit" class="btns btns--blue mr-5" (click)="changeView(true)">cancel</button>
          </div>
        </form>

      </ng-container>
    </div>
    <div class="form-title-container text-break">
      <h2 class="heading-secondary--light u-text-uppercase u-center-text u-margin-top-small u-text-white">
        {{titleComponent}}
      </h2>
    </div>
  </div>
</div>
`,
  styles: [`
p {
  font-size: 1.8rem;
}
span {
  font-weight:600;
}
.invalidField {
  border-color:#dc3545!important;
}
`],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthProfileComponent implements OnInit {
  /**
   * Inputs & Outputs
   */
  @Input() unverifiedUserRedirectTo? = '/'
  @Input() userDataErrorRedirect? = '/'
  @Input() titleComponent? = 'Profile';

  @Output() userProfileData = new EventEmitter();
  @Output() userProfileError = new EventEmitter();
  @Output() userProfileUpdate = new EventEmitter();
  @Output() userProfileUpdateError = new EventEmitter();

  @Output() userProfileDataBase = new EventEmitter();
  @Output() userProfileDataBaseError = new EventEmitter();
  @Output() userProfileDataBaseUpdate = new EventEmitter();
  @Output() userProfileDataBaseUpdateError = new EventEmitter();

  public profileUserForm: FormGroup;
  public userId: string;
  public authUser: any = null;
  public authUserDB: any = null;
  public userVerified: boolean = null;

  public passwordUpdatedError = false;
  public passwordUpdated = false;
  public errorEmailSend = false;
  public validatedForm = false;
  public emailSend = false;
  public editView = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userId = this.authenticationService.getItemFromCookies('id') ? this.authenticationService.getItemFromCookies('id') : this.router.navigate(['/']);
  }

  async ngOnInit() {
    this.getProfile();
  }

  changeView(resetForm: boolean = false) {
    this.editView = false
    if (resetForm) {
      if (this.authUserDB) {
        this.profileUserForm = new FormGroup({
          firstname: new FormControl(this.authUserDB.FirstName, [Validators.required]),
          lastname: new FormControl(this.authUserDB.LastName, [Validators.required]),
          company: new FormControl(this.authUserDB.Company, []),
          nickname: new FormControl(this.authUser.nickname, [Validators.required]),
        });
      } else if (this.authUser) {
        this.profileUserForm = new FormGroup({
          firstname: new FormControl(this.authUser.name, [Validators.required]),
          lastname: new FormControl(this.authUser.family_name, [Validators.required]),
          nickname: new FormControl(this.authUser.nickname, [Validators.required]),
        });
      }
    }
  }

  getProfile() {
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.getUser(this.userId, token).subscribe(async (user: any) => {
        this.userProfileData.emit(user);
        if (user && user.email_verified) {
          this.authUser = user;
          this.authUserDB = await this.getUser({where: {ExternalId:this.userId}});
          if (this.authUserDB) {
            this.userProfileDataBase.emit(this.authUserDB);
            this.profileUserForm = new FormGroup({
              firstname: new FormControl(this.authUserDB.FirstName, [Validators.required]),
              lastname: new FormControl(this.authUserDB.LastName, [Validators.required]),
              company: new FormControl(this.authUserDB.Company, []),
              nickname: new FormControl(this.authUser.nickname, [Validators.required]),
            });
          } else if (user) {
            this.profileUserForm = new FormGroup({
              firstname: new FormControl(this.authUser.name, [Validators.required]),
              lastname: new FormControl(this.authUser.family_name, [Validators.required]),
              nickname: new FormControl(this.authUser.nickname, [Validators.required]),
            });
          }
        } else this.router.navigate([this.unverifiedUserRedirectTo]);
      }, ((error: any) => {
        this.userProfileError.emit(error);
        this.router.navigate([this.userDataErrorRedirect]);
      }));
    }, (error: any) => {
      this.userProfileError.emit(error);
      this.router.navigate([this.userDataErrorRedirect]);
    });
  }

  async editProfile() {
    if (this.profileUserForm.valid) {
      console.log(this.profileUserForm.value);
      await this.authenticationService.getAuth0Token().subscribe((token: string) => {
        this.authenticationService.updateProfile(this.profileUserForm.value, this.userId, token).subscribe((userUpdated: any) => {
          this.userProfileUpdate.emit(userUpdated);
          this.authUser = userUpdated;
          this.changeView(true);
        }, ((error: any) => this.userProfileUpdateError.emit(error)));
      }, (error: any) => this.userProfileUpdateError.emit(error));

      if (this.authenticationService.ApiToConsult()) {
        await this.authenticationService.updateProfileFromAPI(this.authUserDB.SACAP__UUID__c,
          {
            FirstName: this.profileUserForm.controls['firstname'].value,
            LastName: this.profileUserForm.controls['lastname'].value,
            Company: this.profileUserForm.controls['company'].value
          }).toPromise().then(() => {
            this.authUserDB.Company = this.profileUserForm.controls['company'].value;
            this.authUserDB.FirstName = this.profileUserForm.controls['firstname'].value;
            this.authUserDB.LastName = this.profileUserForm.controls['lastname'].value;
            this.userProfileDataBaseUpdate.emit(this.authUserDB);
            this.editView = false;
          }).catch((error) => {
            this.userProfileDataBaseUpdateError.emit(error);
        });
      }
    } else this.validatedForm = true;
    // await this.changeView(true);
  }

  getUser(filter: object){
    return this.authenticationService.getUserFromEndPoint(filter).toPromise().then((account:any) => account[0]).catch(() => null);
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
  emailToVerifySent() {
    this.authenticationService.getAuth0Token().subscribe((token: string) => {
      this.authenticationService.verifyEmail(this.userId, token).subscribe((status: any) => {
        if (status) {
          this.emailSend = true;
        }
      }, (error => this.errorEmailSend = true));
    });
  }
}
