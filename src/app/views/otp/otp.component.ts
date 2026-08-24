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
    defaultPage: any = '';
    userGroupId: any = '';
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
      this.gsxAuthError = '';

      // OTP is single-use on Nest. After it succeeds and GSX is expired, Submit
      // must only refresh the GSX token — do not call otplogin again.
      if (this.gsxApiInput) {
        this.updateGsxAndEnter(this.gsxApiKey || '');
        return;
      }

      this.userService.userOtpAuthentication(this.mobile, this.otpInput).subscribe({ next: (otpData: any) => {
            if (otpData.user.key) {
              if (otpData.user.gsx_user !== undefined && otpData.user.gsx_user !== null) {
                localStorage.setItem('isGsxUser', otpData.user.gsx_user);
                this.isGsxUser = String(otpData.user.gsx_user);
              }
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
              localStorage.setItem('defaultPage', otpData.user.default_page);
              this.defaultPage = otpData.user.default_page;
              this.userGroupId = String(otpData.user.group_id);
              // localStorage.setItem('shipTo', otpData.user.drop_location_flag);
              if (this.isGsxUser === 'true') {
                this.updateGsxAndEnter(this.gsxApiKey || '');
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

    updateGsxAndEnter(authKey: string) {
      this.userService.authenticateGSX(authKey)
      .subscribe({
        next:(data: any) => {
        this.gsxAuth = data.status;
        if (this.gsxAuth === true) {
          const groupId = this.userGroupId || localStorage.getItem('userRole');
          if ((groupId === '2') || (groupId === '18') || (groupId === '10') || (groupId === '6') || (groupId === '8') || (groupId === '20')) {
            this.mapCrmGSX();
            this.mapBlueDartTrack();
            this.mapPartConstraint();
          }
          if (groupId === '18') {
            this.dCallFetch();
            this.invoiceSummaryFetch();
          }
          this.loading = false;
          this.router.navigate([this.defaultPage || localStorage.getItem('defaultPage')]);
        } else {
          this.loading = false;
          this.gsxApiInput = true;
          if (this.gsxApiKey !== '') {
            this.gsxAuthError = 'Enter Valid GSX Authentication Token';
          }
        }
      },
      error:(error: HttpErrorResponse) => {
          this.loading = false;
          this.gsxApiInput = true;
          this.gsxAuthError = 'Enter Valid GSX Authentication Token';
          console.log(error);
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
