import {Component} from '@angular/core';
import {UserService} from '../.././shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';



@Component({
    selector: 'app-dashboard',
    templateUrl: 'otp.component.html',
    styleUrls: ['../../../scss/customstyle.css'],
    imports: [CommonModule, FormsModule]
})
export class OtpComponent {
    mobile: any= '';
    otpInput: any= '';
    userName: any;
    password: any;
    isGsxUser = localStorage.getItem('isGsxUser');
    gsxAuth: any;
    gsxApiInput: any;
    gsxAuthError :any= '';
    gsxApiKey: any= '';
    loading = false;
    datePipe = new DatePipe('en-US');
    constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
      this.route
        .queryParams
        .subscribe(params => { // alert(params['user_id']);
            // Defaults to 0 if no query param provided.
            this.mobile = params['mobile'];
            // this.page = +params['serviceId'] || 0;
        });
    }

    OnSubmit(otp: any) {
      this.loading = true;
        this.userService.userOtpAuthentication(this.mobile, this.otpInput).subscribe({ next: (otpData: any) => {
            if (otpData.user.key) {
              localStorage.setItem('isGsxUser', otpData.user.gsx_user);
              localStorage.setItem('userToken', otpData.user.key);
              localStorage.setItem('userId', otpData.user.user_id);
              localStorage.setItem('userRole', otpData.user.group_id);
              localStorage.setItem('userGroup', otpData.user.user_group);
              localStorage.setItem('userName', otpData.user.user_name);
              localStorage.setItem('UserMobile', otpData.user.mobile);
              localStorage.setItem('siteType', otpData.user.site_type_id);
              localStorage.setItem('mutipleAccess', otpData.user.mutiple_site_access);
              localStorage.setItem('callApi', otpData.user.call_api_key);
              localStorage.setItem('branchCode', otpData.user.branch_code);
              localStorage.setItem('l2Approval', otpData.user.level2_approver);
              localStorage.setItem('drop_location_flag', otpData.user.drop_location_flag);
              // localStorage.setItem('shipTo', otpData.user.drop_location_flag);
              let authKey: any;
              if (this.isGsxUser === 'true') {
                if (this.gsxApiKey === '') {
                  authKey = '';
                } else {
                  authKey = this.gsxApiKey;
                }
                this.userService.authenticateGSX(authKey)
                .subscribe({
                  next:(data: any) => {
                  this.gsxAuth = data.status;
                  if (this.gsxAuth === true) {
                    if ((otpData.user.group_id === '2') || (otpData.user.group_id === '18') || (otpData.user.group_id === '10') || (otpData.user.group_id === '6') || (otpData.user.group_id === '8') || (otpData.user.group_id === '20')) {
                      this.mapCrmGSX();
                      this.mapBlueDartTrack();
                      this.mapPartConstraint();
                    }
                    if (otpData.user.group_id === '18') {
                      this.dCallFetch();
                      this.invoiceSummaryFetch();
                    }
                    this.loading = false;
                    this.router.navigate([otpData.user.default_page]);
                  } else {
                    this.loading = false;
                    this.gsxApiInput = true;
                    if (this.gsxApiKey !== '') {
                      this.gsxAuthError = 'Enter Valid GSX Authentication Token';
                    }
                  }
                },
                error:(error: HttpErrorResponse) => {
                    console.log(HttpErrorResponse);
                }});
              } else {
                this.loading = false;
                this.router.navigate([otpData.user.default_page]);
              }
            } else {
                this.loading = false;
                alert('Invalid OTP');
                // this.router.navigate(['otp'], { queryParams: { mobile: mobile} });
            }
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
            alert('Invalid OTP');
    }});
    }

    dCallFetch() {
      let date = new Date();
      let toDate = date.toLocaleDateString();
      let fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 1);
      this.userService.dCallFetch(fromDate.toLocaleDateString(), toDate).subscribe({next: (data: any) => {
        // console.log(data);
      },
      error: (error: HttpErrorResponse) => {
          console.log(HttpErrorResponse);
    }});
    }

    invoiceSummaryFetch() {
      this.userService.invoiceSummaryFetch().subscribe({next: (data: any) => {
        // console.log(data);
      },
      error: (error: HttpErrorResponse) => {
          console.log(HttpErrorResponse);
    }});
    }

    mapCrmGSX() {
      const ticketId = '';
      this.userService.mapCrmGsx(ticketId).subscribe({next: (data: any) => {
        // console.log(data);
      },
      error: (error: HttpErrorResponse) => {
          console.log(HttpErrorResponse);
    }});
    }

    mapPartConstraint() {
      const ticketId = '';
      this.userService.mapPartConstraint(ticketId).subscribe({next: (data: any) => {
        // console.log(data);
      },
      error: (error: HttpErrorResponse) => {
          console.log(HttpErrorResponse);
    }});
    }

    mapBlueDartTrack() {
      const ticketId = '';
      this.userService.mapBlueDartTrack(ticketId).subscribe({next: (data: any) => {
        // console.log(data);
      },
      error: (error: HttpErrorResponse) => {
          console.log(HttpErrorResponse);
    }});
    }

}
