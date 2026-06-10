import { Component } from '@angular/core';
import {FormGroup,FormsModule ,FormBuilder, Validators, FormControl, ReactiveFormsModule, FormGroupName} from '@angular/forms';

import { ProfileValidationFormsService } from './profile-validation-forms.service';
import {UserService} from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [ProfileValidationFormsService],
    imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class ProfileComponent {
  simpleForm: any = FormGroup;
  submitted = false;
  formErrors: any;
  userId: any;
  siteType;
  isExGsxID = false;
  userRole = localStorage.getItem('userRole');
  constructor(private userService: UserService, private router: Router,
    private fb: FormBuilder,
    public vf: ProfileValidationFormsService
  ) {
    this.formErrors = this.vf.errorMessages;
    this.siteType = localStorage.getItem('siteType');
    this.createForm();
    this.loadUser();
  }

  createForm() {
    this.simpleForm = this.fb.group({
      user_name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(this.vf.formRules.mobileMin),
                Validators.pattern(this.vf.formRules.mobilePattern)] ],
      email: ['', [Validators.required, Validators.email] ],
      gsx_id: ['', [Validators.required]],
      gsx_api_token: ['', [Validators.required]],
      tech_id: ['', [Validators.required]],
      call_api_key: ['', []],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    // TODO: Use EventEmitter with form value
    // console.warn(this.simpleForm.value);
    this.userService.setUser(localStorage.getItem('userId'), JSON.stringify(this.simpleForm.value)).subscribe({next: (data: any) => {
           alert('SUCCESS!');
           window.location.reload();
        },
            error: (error: HttpErrorResponse) => {
                alert('Invalid Response');
                // this.isLoginError = true;
  }});
  }

   loadUser() {
        this.userId = localStorage.getItem('userId');
        this.userService.getUser(this.userId).subscribe({next: (data: any) => { // alert(data);
          //  this.simpleForm = data;
          if(data.gsx_id === '') {
            this.isExGsxID = false;
          } else {
            this.isExGsxID = true;
          }
            this.simpleForm.patchValue(data);
        },
            error: (error: HttpErrorResponse) => {
                alert('Invalid Response');
                // this.isLoginError = true;
            }});
    }

}
