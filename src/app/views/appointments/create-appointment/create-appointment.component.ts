import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CreateAppointmentService } from './create-appointment.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface dayAndDate {
  day: any;
  date: any;
}

@Component({
    selector: 'app-create-appointment',
    templateUrl: './create-appointment.component.html',
    styleUrls: ['./create-appointment.component.scss', '../../../.././scss/customstyle.css'],
    imports: [FormsModule, CommonModule]

})

export class CreateAppointmentComponent {

  date: any;
  isExCustomer = false;
  emailId: any;
  // phoneNo = localStorage.getItem('mobile');
  phoneNo: any = ''
  problem: any = '';
  bcolor = true;
  buttonLoading = false;
  productFamilies: any = [];
  productFamily = 'Select Product Family';
  availSlots: any;
  availSlotForDay: any = [];
  datePipe = new DatePipe('en-US');
  onlyDate: any = [];
  customerFirstName: any;
  customerLastName: any;
  fullDate: any;
  shipTo: any;
  correlationId!: string;
  branchCode = localStorage.getItem('branchCode');
  productCode: any;
  currentDate = new Date();
  buttonSpin = false;
  showTimeSlot = false;
  editCancel: any = 'Edit';
  detailsEdited: any = true;
  isUpdate: any = false;
  noSlot = true;
  isDeliveryReschedule = false;
  isDeliveryReserve = false;
  constructor(private _location: Location, private dataService: CreateAppointmentService, private router: ActivatedRoute) {
    this.productFamilies = [{ name: 'iPod', value: 'IPOD' }, { name: 'iPad', value: 'IPAD' }, { name: 'iPhone', value: 'IPHONE' }, { name: 'Apple Watch', value: 'WATCH' }, { name: 'Apple TV', value: 'APPLETV' }, { name: 'Mac', value: 'MAC' }, { name: 'Beats', value: 'BEATS' },  { name: 'Homepod', value: 'HOMEPOD' }, { name: 'Airpods', value: 'AIRPODS' }, { name: 'Others', value: 'IPHONE' }]
    this.getUserDetail();
    this.router.queryParams.subscribe(params => { // alert(params['user_id']);
            // Defaults to 0 if no query param provided.
            this.phoneNo = params['mobile'];
            if(params['type'] === 'DelvryRESCHEDULE') {
              this.isDeliveryReschedule = true;
            } else if(params['type'] === 'DelvryRESERVE') {
              this.isDeliveryReserve = true;
            }
            this.getCustomer();
            // this.page = +params['serviceId'] || 0;
        });
  }

  getCustomer() {
    let result: any;
    if (this.phoneNo.length === 12) {
      this.phoneNo = this.phoneNo.substring(2);
    }
    this.dataService.getCustomer(this.phoneNo)
      .subscribe({
        next:
          (data) => {
            result = data;
            if (result.status === true) {
              this.customerFirstName = result.customer.first_name;
              this.customerLastName = result.customer.last_name;
              this.emailId = result.customer.email;
              this.isExCustomer = true;
            } else {
              this.customerFirstName = '';
              this.customerLastName = '';
              this.emailId = '';
              this.isExCustomer = false;
            }
          }, // success path
        error: error => error = error // error path
      });
  }

  getUserDetail() {
    let result: any;
    this.dataService.getUserDetail()
      .subscribe({
        next:
          (data) => {
            result = data;
            if (result.status === true) {
              this.shipTo = result.branch.filter((branchCode: any) => {
                return branchCode.branch_code === this.branchCode
              });
              this.shipTo = this.shipTo[0].ship_to;
            }
          }, // success path
        error: error => error = error // error path
      });
  }

  getAvailableSlots() {
    this.dataService.getAvailableSlots(this.productCode, this.shipTo).subscribe({
      next:
        (data: any) => {
          const result = data;
          this.buttonSpin = false;
          this.showTimeSlot = true;
          this.availSlots = result.gsx_response.slots;
          this.correlationId = result.gsx_response.correlationId;
          this.date = this.currentDate.getDate();
         /*  this.date = new Date();
          this.date.setDate(this.date.getDate()+ 1);
          this.date = this.date.getDate(); */
          for (let i = 0; i < this.availSlots.length; i++) {
            this.onlyDate.push(this.datePipe.transform(this.availSlots[i].start, 'dd'));
            if (this.date == this.onlyDate[i]) {
              let currentDate = new Date();
              let selectedTimeDate = new Date(this.availSlots[i].start);
              currentDate.setMinutes(currentDate.getMinutes() + 3);
              if(currentDate < selectedTimeDate) {
              this.availSlotForDay.push(this.datePipe.transform(this.availSlots[i].start, 'h:mm a'));
              }
            }
          }
        }, // success path
      error: error => error = error // error path
    });
  }

  onSelectProduct(event: any) {
    this.productCode = event.target.value;
    this.buttonSpin = true;
    this.showTimeSlot = false;
    this.onlyDate = [];
    this.availSlotForDay = [];
    this.getAvailableSlots();
  }

  onSelectTime(selectedtime: any) {
    this.noSlot = false;
      for (let i = 0; i < this.availSlots.length; i++) {
        if ((this.datePipe.transform(this.availSlots[i].start, 'dd') == this.date) && (this.datePipe.transform(this.availSlots[i].start, 'h:mm a') == selectedtime)) {
          let currentDate = new Date();
          let selectedTimeDate = new Date(this.availSlots[i].start);
          currentDate.setMinutes(currentDate.getMinutes() + 3);
          if(currentDate < selectedTimeDate) {
            this.fullDate = this.availSlots[i].start;
          }
          else {
            this.productFamily = 'Select Product Family';
            this.showTimeSlot = false;
            this.availSlotForDay = [];
            alert('Invalid Time Slot');
          }
      }
    }
  }

  submit() {
    if (this.problem === '') {
      this.bcolor = false;
    } else {
      this.bcolor = true;
    }
    if ((this.phoneNo !== '') && (this.customerFirstName !== '') && (this.customerLastName !== '') && (this.emailId !== '') && (this.problem !== '') && (this.productFamily !== 'Select Product Family')) {
      this.buttonLoading = true;
      let commonData: any;
      let result: any;
      if (this.isExCustomer === false || this.isUpdate === true) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const num = /[0-9]/;
        if (!(this.emailId.includes('@') && this.emailId.includes('.'))) {
          alert('Please enter valid Email id');
          this.buttonLoading = false;
          return;
        } else if(specialChars.test(this.customerFirstName) || specialChars.test(this.customerLastName)) {
            this.buttonLoading = false;
            alert('Special characters are not alllowed in Name field');
            return;
        } else if(num.test(this.customerFirstName) || num.test(this.customerLastName)) {
          this.buttonLoading = false;
            alert('Numbers are not alllowed in Name field');
            return;
        } else if (this.problem.toLowerCase().includes('delivery')) {
          alert(" Problem field is invalid!");
          return;
        }
        else {
          this.dataService.createCustomer(this.customerFirstName, this.customerLastName, this.phoneNo, this.emailId)
            .subscribe({
              next:
                (data) => {
                  result = data;
                  if (result.status === true) {
                  }
                }, // success path
              error: error => error = error // error path
            });
        }
      }
      commonData = '&product_code=' + this.productCode + '&reservation_type=' + 'CIN' + '&reservation_date=' + this.fullDate +
        '&first_name=' + this.customerFirstName + '&last_name=' + this.customerLastName + '&ship_to=' + this.shipTo + '&serial_no=' + '' +
        '&phone=' + this.phoneNo + '&email_id=' + this.emailId + '&correlation_id=' + this.correlationId + '&issue_reported=' + encodeURIComponent(this.problem) + '&language_code=' + 'en-US';
      this.dataService.createReservation(commonData)
        .subscribe({
          next:
            (data: any) => {
              result = data;
              if (result.status === true) {
                alert("Thank you! Your appointment has been confirmed.\nReservation Id - " + result.gsx_response.reservationId);
                this.buttonLoading = false;
                this.cancel();
              } else {
                if(result.response) {
                  alert(result.response.errors[0].message);
                } else {
                  alert(result.gsx_response.errors[0].message);
                }
                this.buttonLoading = false;
              }
            }, // success path
          error: (error: any) => error // error path
        });
    }
    else {
      alert('Fill all mandatory fields');
    }
  }

  cancel() {
    this.customerFirstName = '';
    this.customerLastName = '';
    this.phoneNo = '';
    this.emailId = '';
    this.problem = '';
    localStorage.removeItem('reservationId');
    localStorage.removeItem('ticketId');
    this.productFamily = 'Select Product Family';
    this._location.back();
    this.noSlot = true;
  }

  customerEdit() {
    if (this.editCancel === 'Edit') {
      this.detailsEdited = false;
      this.editCancel = 'Cancel';
      this.isUpdate = true;
    } else {
      this.detailsEdited = true;
      this.editCancel = 'Edit';
      this.isUpdate = false;
    }
  }

  deliveryProcess() {
    if(this.isDeliveryReschedule === true) {
      this.Reschedule();
    } else {
      this.deliveryReservation(localStorage.getItem('ticketId'))
    }
  }

  Reschedule() {
    this.dataService.reservationUpdate(this.shipTo,this.fullDate ).subscribe({
      next: (data: any) => {
        let result = data;
        if(result.status === true) {
          alert('Reschedule Successfull');
          this.cancel();
        } else {
          alert(result.gsx_response.errors[0].message);
        }
      },
      error: (error: HttpErrorResponse) => {
      }
    });
  }

  deliveryReservation(id: any) {
    let result;
    let Data = '&product_code=' + this.productCode + '&reservation_type=' + 'CIN' + '&reservation_date=' + this.fullDate +
        '&first_name=' + this.customerFirstName + '&last_name=' + this.customerLastName + '&ship_to=' + this.shipTo + '&serial_no=' + '' +
        '&phone=' + this.phoneNo + '&email_id=' + this.emailId + '&correlation_id=' + this.correlationId + '&issue_reported=' + 'Reservation for Delivery' + '&language_code=' + 'en-US';
      this.dataService.createDlvryReservation(Data, id)
        .subscribe({
          next:
            (data: any) => {
              result = data;
              if (result.status === true) {
                alert("Thank you! Your appointment has been confirmed.\nReservation Id - " + result.gsx_response.reservationId);
                this.buttonLoading = false;
                this.cancel();
              } else {
                alert(result.gsx_response.errors[0].message);
                this.buttonLoading = false;
              }
            }, // success path
          error: (error: any) => error // error path
        });
  }
}
