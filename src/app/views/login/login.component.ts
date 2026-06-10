import { Component, OnInit } from '@angular/core';
import { UserService } from '../.././shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html',
    styleUrls: ['../../../scss/customstyle.css'],
    imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {

    localStorage.setItem('rootUrl', 'https://api.icareservice.co.in/');
    localStorage.setItem('reportsUrl', 'https://reports.icareservice.co.in/');

    //  localStorage.setItem('rootUrl', 'https://api4uat.icareservice.co.in/');
    //  localStorage.setItem('reportsUrl', 'https://api4uat.icareservice.co.in/');

    // localStorage.setItem('rootUrl', 'https://api4uat.icareservice.co.in/');
    // localStorage.setItem('reportsUrl', 'https://api4.icareservice.co.in/');

  }

  formErrors: any = {
    'userName': '',
    'password': ''
  };

  validationMessages: any = {
    'userName': {
      'required': 'User Name is required.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'User Name must be greater than 2 characters.',
      'maxlength': 'Password must be less than 20 characters.',
    },
  };

  // get f() {return this.simpleForm.controls;}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
      /* password: ['', [Validators.required, Validators.minLength(this.vf.formRules.passwordMin),
      Validators.pattern(this.vf.formRules.passwordPattern)]] */
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.loginForm);
    });
  }

  logValidationErrors(group: FormGroup = this.loginForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl: any = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  OnSubmit(userName: string, password: string) {
    this.loading = true;
    this.userService.userAuthentication(userName, password).subscribe({
      next: (data: any) => {
          if (data.status === true) {
            this.loading = false;
            if(data.user.group_id == '28') {
              alert('Access denied. You do not have permission to log in.');
              return;
            }
          if (data.user.double_auth_enabled === 'Y') {
            localStorage.setItem('userToken', data.user.key);
            localStorage.setItem('userId', data.user.user_id);
            localStorage.setItem('isGsxUser', data.user.gsx_user);
            localStorage.setItem('shipTo', data.user.shipto);
            localStorage.setItem('branchType', data.user.branch_type);
            localStorage.setItem('dlType', data.user.dl_type);
            localStorage.setItem('netSuiteEnabled', data.user.netsuite_enabled);
            // localStorage.setItem('aws_region', data.user.aws_region);
            // localStorage.setItem('aws_key', data.user.aws_key);
            // localStorage.setItem('aws_secret_key', data.user.aws_secret_key);
            this.router.navigate(['otp'], { queryParams: { mobile: userName } });
          } else {
            this.router.navigate(['otp'], { queryParams: { mobile: userName } });
            localStorage.setItem('isGsxUser', data.user.gsx_user);
            localStorage.setItem('userToken', data.user.key);
            localStorage.setItem('userId', data.user.user_id);
            localStorage.setItem('userRole', data.user.group_id);
            localStorage.setItem('userGroup', data.user.user_group);
            localStorage.setItem('userName', data.user.user_name);
            localStorage.setItem('UserMobile', data.user.mobile);
            localStorage.setItem('siteType', data.user.site_type_id);
            localStorage.setItem('mutipleAccess', data.user.mutiple_site_access);
            localStorage.setItem('callApi', data.user.call_api_key);
            localStorage.setItem('branchCode', data.user.branch_code);
            localStorage.setItem('l2Approval', data.user.level2_approver);
            localStorage.setItem('drop_location_flag', data.user.drop_location_flag);
            localStorage.setItem('shipTo', data.user.shipto);
            localStorage.setItem('branchType', data.user.branch_type);
            localStorage.setItem('dlType', data.user.dl_type);
            localStorage.setItem('netSuiteEnabled', data.user.netsuite_enabled);
            // localStorage.setItem('aws_region', data.user.aws_region);
            // localStorage.setItem('aws_key', data.user.aws_key);
            // localStorage.setItem('aws_secret_key', data.user.aws_secret_key);
            if (data.user.reset_password == 'Y') {
              this.router.navigate(['reset-password']);
              return;
            }
            this.router.navigate([data.user.default_page]);
          }
        } else {
          alert(data.message);
          this.loading = false;
          // this.router.navigate(['login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Invalid Credentails');
        // this.isLoginError = true;
      }
    });
  }
}

