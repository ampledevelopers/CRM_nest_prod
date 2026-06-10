import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResetpasswordRoutingModule } from '../../authentication/resetpassword/resetpassword-routing.module';
import { result } from 'lodash';
import {CommonModule} from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ProfileComponent } from '../../authentication/profile/profile.component';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-accept-customer',
    templateUrl: './accept-customer.component.html',
    styleUrls: ['./accept-customer.component.scss', '../../../.././scss/customstyle.css'],
    imports: [CommonModule,DataTablesModule,ProfileComponent,FormsModule]
})
export class AcceptCustomerComponent {
  loading = true;
  branchCode = localStorage.getItem('branchCode');
  userRole = localStorage.getItem('userRole');
  userName = localStorage.getItem('userName');
  userPhone = localStorage.getItem('UserMobile');
  reservationsData: any;
  error: any;
  datePipe = new DatePipe('en-US');
  customerPhone = '';
  otpSent = false;
  customerOTP = '';
  enteredOTP = '';
  orpErrorMsg = '';
  dtOptions: DataTables.Settings = {};
  reservationDataLoading = false;
  startAccepting: any;
  endAccepting: any;
  currentTime: any;
  laterTime: any;
  LICphone: any;
  acceptanceLoading = false;
  custName: any;
  custPhone: any;
  id: any;
  ticketId: any = '';
  serviceType: any = ''
  showDlvryReservation = false;
  showDlvryReschedule = false;
  deliveryMessage: any = '';
  notDeliveryMessage: any = '';
  tryAgainMessage: any = '';
  nameDelivery = '';
  phoneDelivery = '';
  appointmentId = '';
  otpLoading = false;
  veryfying = false;

  constructor(private dataService: AppointmentsService, private modalService: NgbModal, private userService: UserService, private router: Router) {
    if (this.userRole === '26') {
      this.getSameDayAppointments();
      this.getLicMobile();
    }
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      ordering: false
    };
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  cancel() {
    this.acceptanceLoading = false;
    this.serviceType = '';
    this.ticketId = '';
    this.notDeliveryMessage = '';
    this.tryAgainMessage = '';
    this.deliveryMessage = '';
    this.modalService.dismissAll();
  }

  getSameDayAppointments() {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    /*  let today: any = new Date();
    today.setDate(today.getDate() + 1);
    today = this.datePipe.transform(today, 'yyyy-MM-dd'); */
    this.dataService.getSameDayReservation(this.branchCode, today)
      .subscribe({
        next: (data: any) => {
          let result = data;
          this.currentTime = new Date();
          if (result.status === true) {
            this.reservationsData = result.reservation;
            let nonAcceptedList = this.reservationsData.filter((status: any) => {
              //|| status.current_status === 'RESCHEDULED'
              return (status.current_status === 'RESERVED' ) && status.customer_status === ''
            });
            nonAcceptedList = nonAcceptedList.sort(function (a: any, b: any) { return ((a.current_status !== 'RESCHEDULED' ? (a.reservation_date > (b.current_status !== 'RESCHEDULED' ? b.reservation_date : b.rescheduled_date)) : (a.rescheduled_date > (b.current_status !== 'RESCHEDULED' ? b.reservation_date : b.rescheduled_date)))) });
            let acceptedList = this.reservationsData.filter((status: any) => {
              return (status.current_status !== 'CANCELLED' && status.customer_status !== '')
            });
            acceptedList = acceptedList.sort(function (a: any, b: any) { return ((a.current_status !== 'RESCHEDULED' ? (a.reservation_date > (b.current_status !== 'RESCHEDULED' ? b.reservation_date : b.rescheduled_date)) : (a.rescheduled_date > (b.current_status !== 'RESCHEDULED' ? b.reservation_date : b.rescheduled_date)))) });
            let cancelledList = this.reservationsData.filter((status: any) => {
              return (status.current_status === 'CANCELLED')
            });
            cancelledList = cancelledList.sort(function (a: any, b: any) { return ((a.current_status !== 'RESCHEDULED' ? (a.reservation_date > (b.current_status !== 'RESCHEDULED' ? b.reservation_date : b.rescheduled_date)) : (a.rescheduled_date > (b.current_status !== 'RESCHEDULED' ? b.reservation_date : b.rescheduled_date)))) });
            let finalList = nonAcceptedList.concat(acceptedList);
            this.reservationsData = finalList.concat(cancelledList);
            let tempSet = new Set();
            this.reservationsData = this.reservationsData.filter((item: any) => {const isUnique = !tempSet.has(item.reservation_id);
              if (isUnique) {
                tempSet.add(item.reservation_id);
              }
              return isUnique;
            });

            for (let i = 0; i < nonAcceptedList.length; i++) {
              /* if (nonAcceptedList[i].current_status === 'RESCHEDULED') {
                this.startAccepting = new Date(nonAcceptedList[i].rescheduled_date);
                this.endAccepting = new Date(nonAcceptedList[i].rescheduled_date);
                this.endAccepting.setMinutes(this.endAccepting.getMinutes() + 20);
                if (this.currentTime > this.endAccepting) {
                  this.updateToNoShow(nonAcceptedList[i].rescheduled_to);
                }
              } else */
              if (nonAcceptedList[i].current_status === 'RESERVED') {
                // this.startAccepting = new Date(nonAcceptedList[i].reservation_date);
                this.endAccepting = new Date(nonAcceptedList[i].reservation_date);
                this.endAccepting.setMinutes(this.endAccepting.getMinutes() + 20);
                if (this.currentTime > this.endAccepting) {
                  this.updateToNoShow(nonAcceptedList[i].reservation_id);
                }
              }
            }
            this.loading = false;
          } else {
            // alert(result.message);
            this.loading = false;
          }

        }, // success path
        error: error => this.error = error // error path
      });
  }

  openProfile(profile_temp: TemplateRef<any>) {
    this.modalService.open(profile_temp, { backdrop: 'static', keyboard: false });
  }

  getLicMobile() {
    let result: any;
    this.dataService.getLicMobile()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.LICphone = result.mobile;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  makeCall(call_alert: TemplateRef<any>) {
    let result: any = [];
    this.dataService.getNumbers().subscribe({
      next: (data: any) => {
        result = data;
        if (result.status === true) {
          let licNo = result.data[0].service_desk_mobile_no;
          let apiKey = result.data[0].api_key;
          this.dataService.makeCall(licNo, apiKey)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.openModal(call_alert);
              } else {
                alert(result.message);
                this.cancel();
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
        } else {
          alert(result.message);
          this.cancel();
        }
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  getReservationSummary() {
    this.reservationDataLoading = true;
    let result: any;
    this.dataService.getReservationSummary(this.branchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reservationDataLoading = false;
            this.getSameDayAppointments();
          } else {
            this.reservationDataLoading = false;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  sendOTP() {
    this.otpLoading = true;
    let result: any;
    this.dataService.sendOtp(this.customerPhone, this.branchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.otpSent = true;
            this.otpLoading = false;
            this.customerOTP = result.otp;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  verifyOTP() {
    if (this.customerOTP === this.enteredOTP) {
      this.modalService.dismissAll();
      this.router.navigate(['create-appointment'], { queryParams: { mobile: this.customerPhone } });
    } else {
      this.orpErrorMsg = 'Please enter the Correct OTP';
    }
  }

  customerArrived(confirm_temp: TemplateRef<any>, id: any, name: any, date: any, phone: any) {
    this.currentTime = new Date();
    let result: any;
    this.acceptanceLoading = true;
    let r;
    this.id = id;
    this.startAccepting = new Date(date);
    this.endAccepting = new Date(date);
    // let appointDate = this.datePipe.transform();
    this.startAccepting.setMinutes(this.startAccepting.getMinutes() - 10);
    this.endAccepting.setMinutes(this.endAccepting.getMinutes() + 20);
    if (this.currentTime >= this.startAccepting && this.currentTime <= this.endAccepting) {
      this.custName = name;
      this.custPhone = phone;
      this.dataService.getDeliveryReservationDetails(id).subscribe({
        next: (data: any) => {
          if (data.status === true) {
            this.deliveryMessage = 'This Reservation is only for Delivery';
            this.openModal(confirm_temp);
          } else {
            this.deliveryMessage = '';
            this.openModal(confirm_temp);
          }
        },
          error: (error: any) => this.error = error // error path
        });
    }
    else {
      date = new Date(date);
      alert('Appointment Time Alert!\n\n\n' + 'Reservation Time' + ' - ' + date.toLocaleString() + '\nAttempted Time' + ' - ' + this.currentTime.toLocaleString());
      this.acceptanceLoading = false;
    }
  }

  confirm() {
    if (this.custPhone !== '' && this.custPhone.length === 10) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~A-Za-z ]/;
      if (!(specialChars.test(this.custPhone))) {
        this.dataService.updateCustPhone(this.id, this.custPhone).subscribe({
          next: (data: any) => {
            if (data.status === true) {
              this.acceptCustomer();
            }
          },
          error: (error: any) => this.error = error // error path
        });
      } else {
        alert('Entered Phone Number is Invalid');
      }
    } else {
      alert('Entered Phone Number is Invalid');
    }
  }

  acceptCustomer() {
    let result;
    // r = confirm('Please Confirm, is this customer Arrived (' + name + ')');
    // r = confirm('Please Confirm the Name and Phone Number\nName: ' +name +'\nPhone: ' + phone);
    this.dataService.customerAttened(this.id).subscribe({
      next: (data: any) => {
        result = data;
        if (result.status === true) {
          this.acceptanceLoading = false;
          this.cancel();
          this.getSameDayAppointments()
        }
      }, // success path
      error: error => this.error = error // error path
    });
  }

  updateToNoShow(id: any) {
    let result;
    this.dataService.updateStatusToNoShowGSX(id).subscribe({
      next: (data: any) => {
        result = data;
        if (result.status === true) {
          this.dataService.updateStatusToNoShowCRM(id).subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.getSameDayAppointments();
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
        }
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  signOut() {
    let r;
    r = confirm('Are you sure, want to Logout ?');
    if (r === true) {
      this.userService.logoutGSX().subscribe({
        next: (data: any) => {
          // console.log(data);
        },
        error: (error: HttpErrorResponse) => {
          // console.log(HttpErrorResponse);
        }
      });
      const rooturl: any = localStorage.getItem('rootUrl');
      localStorage.clear();
      localStorage.setItem('rootUrl', rooturl);
      this.router.navigate(['login']);
    }
  }

  verifyTicketId(ticketId: any) {
    let time = new Date();
    let reserveTime;
    this.notDeliveryMessage = '';
    this.tryAgainMessage = '';
    localStorage.setItem('ticketId', ticketId);
    let result;
    this.veryfying = true;
    this.dataService.getDeliveryTicketDetails(ticketId).subscribe({
      next: (data: any) => {
        result = data;
        if(result.status === true) {
          this.customerPhone = result.reservation.customer_phone_number;
          //|| result.reservation.current_status === 'RESCHEDULED'
          if((result.reservation.current_status === 'RESERVED' ) && (result.reservation.customer_status === '')) {
            reserveTime = new Date(result.reservation.reservation_date);
            if(time < reserveTime) {
              this.showDlvryReschedule = true;
              this.showDlvryReservation = false;
              localStorage.setItem('reservationId',result.reservation.reservation_id);
            } else {
              this.showDlvryReschedule = false;
              this.showDlvryReservation = true;
            }
            this.nameDelivery = result.reservation.customer_firstname + ' ' + result.reservation.customer_lastlame  ;
            this.phoneDelivery = result.reservation.customer_phone_number;
          } else {
            this.showDlvryReschedule = false;
            this.showDlvryReservation = true;
            this.nameDelivery = result.reservation.customer_firstname + ' ' + result.reservation.customer_lastlame  ;
            this.phoneDelivery = result.reservation.customer_phone_number;
          }
          // this.getReservationDetails(result.reservation.reservation_id);
          this.veryfying = false;
        } else {
          this.notDeliveryMessage = 'You have picked a wrong reservation or device is not ready for delivery.';
          this.tryAgainMessage = 'Try with the Reservation ID to find the Ticket!'
          this.veryfying = false;
        }
    }, // success path
    error: (error: any) => this.error = error // error path
  });
  }

  getReservationDetails() {
    this.veryfying = true;
      const specialChars1 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if ((specialChars1.test(this.appointmentId)) || this.appointmentId.length !== 14) {
        this.appointmentId = '';
      } else {
      let result;
      this.dataService.getReservationDetails(this.appointmentId).subscribe({
      next: (data: any) => {
        result = data;
        if(result) {
          if(result.status === true) {
            this.verifyTicketId(localStorage.getItem('ticketId'));
          }
          else {
          this.veryfying = false;
          }
        } else {
          this.veryfying = false;
        }
      }, // success path
      error: (error: any) => this.veryfying = false // error path

    });
  }
  }

  rescheduleDelivery() {
    this.cancel();
    this.router.navigate(['create-appointment'], { queryParams: { mobile: this.customerPhone , type: 'DelvryRESCHEDULE'} });

  }

  reservationDelivery() {
    this.cancel();
    this.router.navigate(['create-appointment'], { queryParams: { mobile: this.customerPhone, type: 'DelvryRESERVE' } });
  }

  dlvryCancel() {
    localStorage.removeItem('ticketId');
    localStorage.removeItem('reseravtionId');
    this.nameDelivery = '';
    this.phoneDelivery = '';
    this.otpSent = false;
    this.customerPhone = '';
    this.cancel();
  }
}
