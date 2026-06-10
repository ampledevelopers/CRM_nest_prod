import { Component, TemplateRef } from '@angular/core';
import { CustomerCareService } from '../customer-care.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface CustomerInfo {
  first_name: any;
  last_name: any;
  phone: any;
  phone2: any;
  email: any;
  address1: any;
  address2: any;
  city: any;
  pin: any;
}

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-create-enquiry',
    templateUrl: './create-enquiry.component.html',
    styleUrls: ['./create-enquiry.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class CreateEnquiryComponent {
  error: any;
  loading = false;
  buttonSpin = false;
  conError = '';
  ticketId = '';
  data: any = [];
  callTypes: any = [];
  callType = '';
  flagType = true;
  subTypes: any = [];
  subType = '';
  selectedType = '';
  customerInfo: CustomerInfo = {first_name: '', last_name: '', phone: '', phone2: '',
                                email: '', address1: '', address2: '', city: '', pin: ''};
  sPartDetails: any = [];
  partId = '';
  partNo = '';
  serialNo = '';
  price = '';
  showEnquiry = false;
  showSales = false;
  customerQuery = '';
  agentUpdate = '';
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  constructor(private dataService: CustomerCareService, private modalService: NgbModal) {
    this.callTypes = [
      {label: 'Service', value: 'S'},
      {label: 'Retail', value: 'R'}
    ];
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  selectCallType(event: any) {
    console.log(event.value);
    if (event.value !== '0') {
      this.flagType = false;
      this.callType = event.value;
      if (event.value === 'S') {
        this.subTypes = [
          {label: 'Esculation', value: 'E'},
          {label: 'Service Status Update', value: 'U'},
          {label: 'Sales', value: 'S'},
          {label: 'Enquiry', value: 'Q'}
        ];
      } else {
        this.subTypes = [
          {label: 'Sales', value: 'S'},
          {label: 'Enquiry', value: 'Q'}
        ];
      }
    } else {
      this.conError = 'Select the Options';
      this.showEnquiry = false;
      this.showSales = false;
    }
  }

  selectType(event: any) {
    this.selectedType = event.value;
  }

  goNext() {
    if (this.selectedType !== '') {
      this.conError = '';
      this.subType = this.selectedType;
      if ((this.subType === 'S')) {
        this.showEnquiry = false;
        this.showSales = true;
      } else {
        this.showEnquiry = true;
        this.showSales = false;
        this.getdata(this.ticketId);
      }
    } else {
      this.conError = 'Select the Options';
      this.showEnquiry = false;
      this.showSales = false;
    }
  }

  getdata(event: any) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      let result: any;
      this.dataService.getTicketDetails(this.ticketId)
          .subscribe(
            (data) => {
                result = data;
                if (result.status === true) {
                  this.data = result.tickets[0];
                  if (this.data.site_type_id === '2') {
                    this.getCustomerInfo(this.data.company_id);
                  } else if (this.data.site_type_id === '1') {
                    this.getCustomerInfo(this.data.customer_id);
                  }
                }
            });
    }
  }

  getCustomerInfo(id: any) {
    let result: any;
    this.dataService.getCustomerInfo(this.data.site_type_id, id, this.data.customer_phone_no)
            .subscribe(
              (data) => {
                result = data;
                if (result.status === true) {
                  this.customerInfo = result.customer;
                }
    });
  }


  addServicePart() {
    if ((this.partId !== '') && (this.partNo !== '') && (this.serialNo !== '') && (this.price !== '')) {
      this.sPartDetails.push({
        partId: this.partId,
        partNo: this.partNo,
        serialNo: this.serialNo,
        price: this.price
    });
      this.partId = '';
      this.partNo = '';
      this.serialNo = '';
      this.price = '';
    }
  }

  deleterow(idx: any) {
    this.sPartDetails.splice(idx, 1);
  }

  saveEnquiry(simple_alert_temp: TemplateRef<any>) {
    let customer = false;
    let product = false;
    let ticket = false;
    let isEnquiry = false;
    if ((this.subType === 'E') || (this.subType === 'U')) {
      if (this.ticketId === '') {
        alert('Enter Ticket Id');
        ticket = false;
        return;
      } else {
        ticket = true;
      }
    }

    if (this.customerInfo.first_name === '') {
      alert('Enter First Name');
    } else if ((this.customerInfo.phone === '') && (this.customerInfo.phone.length !== 10)) {
      alert('Enter Primary Mobile Number');
    } else if (this.customerInfo.email === '') {
      alert('Enter Email Id');
    } else {
      customer = true;
    }

    if ((this.subType === 'S')) {
      if ((this.partId !== '') && (this.partNo !== '') && (this.serialNo !== '') && (this.price !== '')) {
        this.sPartDetails.push({
          part_id: this.partId,
          part_no: this.partNo,
          serial_no: this.serialNo,
          price: this.price
        });
        this.partId = '';
        this.partNo = '';
        this.serialNo = '';
        this.price = '';
        if (this.sPartDetails.length !== '0') {
          product = true;
        } else {
          product = false;
        }
      } else {
        product = false;
        if (customer === true) {
          if (this.sPartDetails.length === 0) {
            alert('Enter Product Details');
          } else if ((this.partId !== '') && (this.partNo !== '') && (this.serialNo !== '') && (this.price !== '')) {
            alert('Enter Product Details');
          }
        }
      }
    } else {
      if (customer === true) {
        if (this.customerQuery === '') {
          alert('Enter Customer Query');
        } else if (this.agentUpdate === '') {
          alert('Enter Agent Update');
        } else {
          isEnquiry = true;
        }
      }
    }

    if ((this.subType === 'S')) {
      if ((customer === true) && (product === true)) {
        this.saveEnquiryData(simple_alert_temp);
      }
    } else if ((customer === true) && (isEnquiry === true)) {
      this.saveEnquiryData(simple_alert_temp);
    }
  }

  saveEnquiryData(simple_alert_temp: TemplateRef<any>) {
    // this.buttonSpin = true;
        const saveData = '&enquiry_category=' + this.callType + '&enquiry_type=' + this.subType + '&ticket_id=' +
        this.ticketId + '&first_name=' + this.customerInfo.first_name + '&last_name=' + this.customerInfo.last_name +
        '&mobile1=' + this.customerInfo.phone + '&mobile2=' + this.customerInfo.phone2 + '&address1=' + this.customerInfo.address1 +
        '&address2=' + this.customerInfo.address2 + '&city=' + this.customerInfo.city + '&pincode=' + this.customerInfo.pin +
        '&customer_query=' + this.customerQuery + '&agent_update=' + this.agentUpdate;
        let result: any;
        this.dataService.saveEnquiry(saveData, this.sPartDetails)
          .subscribe({
            next: (data: any) => {
                result = data;
              if (result.status === true) {
                this.reset();
                this.buttonSpin = true;
                this.showEnquiry = false;
                this.showSales = false;
              } else {
                this.buttonSpin = false;
                this.simpleAlert = {title: 'Create Enquiry', msg: result.message};
                this.openModal(simple_alert_temp);
              }
            }, // success path
            error: error => this.error = error // error path
  });
  }

  reset() {
    this.buttonSpin = false;
    this.customerInfo = {first_name: '', last_name: '', phone: '', phone2: '',
    email: '', address1: '', address2: '', city: '', pin: ''};
    this.partId = '';
    this.partNo = '';
    this.serialNo = '';
    this.price = '';
  }
}
