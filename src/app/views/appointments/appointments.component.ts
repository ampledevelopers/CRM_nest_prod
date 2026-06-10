import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeElementType } from 'angularx-qrcode';
import { DatePipe } from '@angular/common';
import { QRCodeErrorCorrectionLevel } from "qrcode"

@Component({
    selector: 'app-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.scss', '../../.././scss/customstyle.css', '../consignments/consignments.component.scss'],
    standalone: false
})
export class AppointmentsComponent implements OnInit {

  branchCode = localStorage.getItem('branchCode');
  reservationsData: any;
  error: any;
  customer_name = '';
  customer_primary_phone: any;
  customer_secondary_phone = '';
  customer_email = '';
  address_line1 = '';
  Address2 = '';
  city = '';
  state = '';
  pin = '';
  landmark = '';
  datetime: any;
  notes = '';
  Visible_Damages = '';
  quoteQ = '';
  first_name: any;
  last_name: any;
  currentReservationId: any;
  datePipe = new DatePipe('en-US');
  serialNumber = '';
  assignTo = "Select Technician";
  ErrorMessage = '';
  currentCustomer: any;
  public elementType!: QRCodeElementType;
  public errorCorrectionLevel!: QRCodeErrorCorrectionLevel;
  showQrcode = false;
  public stringQrCode!: string;
  public qrCodeSrc!: SafeUrl;
  public allowEmptyString!: boolean;
  public initial_state = {
    elementType: 'canvas' as QRCodeElementType,
    errorCorrectionLevel: 'M' as QRCodeErrorCorrectionLevel,
    margin: 4,
    scale: 1,
    version: undefined,
    title: 'A custom title attribute',
    width: 300,
  };
  public data_model = {
    ...this.initial_state,
  };
  valuesToQrcode: any = [];
  qrdata: any;
  documents: any;
  selectedFile: any;
  ticketId: any;
  loading = true;
  employees: any = [];
  buttonLoading = false;
  userRole = localStorage.getItem('userRole');
  dtOptions: any;
  reservationDataLoading = false;
  appointType: any = 'all';
  constructor(private dataService: AppointmentsService, private modalService: NgbModal, private router: Router) {
    this.appointType = 'all';
    this.loadAppointments();
    this.getAgents();
    this.qrdata = "QrCode";
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      ordering: false
    };
  }

  loadAppointments() {
    this.loading = true;
    this.reservationsData = [];
    if(this.appointType === 'all') {
      this.getAppointments();
    } else if(this.appointType === 'today') {
      this.getSameDayAppointments();
    }
  }

  getAppointments() {
    this.dataService.getReservation(this.branchCode)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if (result.status === true) {
            this.reservationsData = result.reservation;
            this.reservationsData = this.reservationsData.filter((status: any) => {
              return status.current_status === 'RESERVED' || status.current_status === 'RESCHEDULED'
          });
          this.reservationsData  = this.reservationsData .sort(function(a: any, b: any) { return ((a.current_status !== 'RESCHEDULED'? (a.reservation_date < (b.current_status !== 'RESCHEDULED'?  b.reservation_date : b.rescheduled_date)) : (a.rescheduled_date < (b.current_status !== 'RESCHEDULED'?  b.reservation_date : b.rescheduled_date)))) });
            this.loading = false;
          } else {
            alert(result.message);
            this.reservationsData = [];
            this.loading = false;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getSameDayAppointments() {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dataService.getSameDayReservation(this.branchCode, today)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if (result.status === true) {
            this.reservationsData = result.reservation;
            
            this.reservationsData = this.reservationsData.filter((status: any) => {
              return status.current_status === 'RESERVED' || status.current_status === 'RESCHEDULED'
          });
          this.reservationsData  = this.reservationsData .sort(function(a: any, b: any) { return ((a.current_status !== 'RESCHEDULED'? (a.reservation_date < (b.current_status !== 'RESCHEDULED'?  b.reservation_date : b.rescheduled_date)) : (a.rescheduled_date < (b.current_status !== 'RESCHEDULED'?  b.reservation_date : b.rescheduled_date)))) });
            this.loading = false;
          } else {
            alert(result.message);
            this.loading = false;
            this.reservationsData = [];
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  showModel(PUD_Confirmation: TemplateRef<any>, id: any) {
    this.currentCustomer = [];
    this.currentCustomer = this.reservationsData.filter((data: any) => {
      return data.id === id;
    });
    this.currentCustomer = this.currentCustomer[0];
    if (this.currentCustomer.customer_phone_number.length > 10) {
      this.currentCustomer.customer_phone_number = this.currentCustomer.customer_phone_number.slice(2, 12);
    }
    if (this.currentCustomer.current_status !== 'RESCHEDULED') {
      this.currentReservationId = this.currentCustomer.reservation_id;
    } else {
      this.currentReservationId = this.currentCustomer.rescheduled_to;
    }
    this.customer_name = this.currentCustomer.customer_firstname + ' ' + this.currentCustomer.customer_lastlame;
    this.customer_primary_phone = this.currentCustomer.customer_phone_number
    this.customer_email = this.currentCustomer.customer_email_id;
    this.notes = this.currentCustomer.product_issue_reported;
    this.openModal(PUD_Confirmation);
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });

  }

  submitPUD() {
    this.ErrorMessage = '';
    if ((this.assignTo != 'Select Technician') && (this.customer_name != '') && (this.customer_email != '') && (this.address_line1 != '') && (this.Address2 != '') && (this.city != '') && (this.state != '') && (this.pin != '') && (this.landmark != '') && ((this.datetime != null) && (this.datetime != '')) &&
      (this.Visible_Damages != '') && (this.quoteQ != '') && (this.customer_primary_phone.length === 10) && (this.pin.length == 6)) {
      let result: any = [];
      this.datetime = this.datePipe.transform(this.datetime, 'yyyy-MM-dd H:mm:ss');
      this.buttonLoading = true;
      this.dataService.createPUD(this.customer_name, this.customer_primary_phone, this.customer_email, this.customer_secondary_phone,
        this.address_line1, this.Address2, this.city, this.state, this.pin, this.landmark, this.datetime, this.currentCustomer.product_issue_reported, this.Visible_Damages, this.quoteQ, this.currentReservationId, this.assignTo, this.currentCustomer.branch_code, this.currentCustomer.product_issue_reported, this.serialNumber)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.ticketId = result.ticket_id;
              this.valuesToQrcode.push({
                Name: this.customer_name,
                phone_no: this.customer_primary_phone,
                email_id: this.customer_email,
                serial_no: this.serialNumber,
                product_description: this.notes,
                branch_code: this.currentCustomer.branch_code,
                ticketId: this.ticketId,
                address: this.address_line1 + ',' + this.Address2 + ',' + this.city  + ',' + this.state  + ',' + this.pin
              });
              this.qrdata = JSON.stringify(this.valuesToQrcode);
              this.buttonLoading = false;
              this.showQrcode = true;
            }
          }, // success path
          error: error => this.error = error // error path
        });

    }
    else { this.ErrorMessage = 'Fill all mandatory fields'; }
  }

  cancel() {
    this.modalService.dismissAll();
    this.customer_name = '';
    this.customer_primary_phone = '';
    this.customer_secondary_phone = '';
    this.customer_email = '';
    this.address_line1 = '';
    this.Address2 = '';
    this.city = '';
    this.state = '';
    this.pin = '';
    this.landmark = '';
    this.datetime = '';
    this.notes = '';
    this.Visible_Damages = '';
    this.quoteQ = '';
    this.showQrcode = false ;
  }

  getAgents() {
    this.dataService.getAgents(this.branchCode).subscribe({
      next: (data: any) => {
        let result = data;
        this.employees = result;

      }, error: error => this.error = error
    });
  }

  openTicket(ticketId: string) {
    localStorage.setItem('id', ticketId);
    this.router.navigate(['dashboard/ticket']);
  }

  saveAsImage(parent: any) {
    let parentElement = null;
    parentElement = parent.qrcElement.nativeElement
        .querySelector('canvas')
        .toDataURL('image/png');

    if (parentElement) {
      const today = new Date().toDateString();
      const qrdocs: any[] = [];
      this.selectedFile = parentElement;
      qrdocs.push({
        document_type: 'PickupQRCode',
        file_name: 'pickupqrcode.png',
        extension: '.png',
        date: today,
        file: this.selectedFile,
        description: 'PickupQRCode'
      });
      this.dataService.uploadDocuments(this.ticketId, qrdocs)
        .subscribe({
          next: (data: any) => {
            if(data.status === true)
            {
              this.modalService.dismissAll();
              alert("PUD ticket has been created Successfully");
              this.getAppointments();
              this.cancel();
            } else {
              this.modalService.dismissAll();
              alert('PUD ticket created, QRcode upload failed');
              this.cancel();
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
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
            this.loadAppointments();
            alert(result.message);
          } else {
            this.reservationDataLoading = false;
            alert(result.message);
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }



}



