import { Component } from '@angular/core';

@Component({
    selector: 'app-cc-customer-enquiry',
    templateUrl: './cc-customer-enquiry.component.html',
    styleUrls: ['./cc-customer-enquiry.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class CcCustomerEnquiryComponent {
  loading = false;
  buttonSpin = false;
  isEdit = true;
  customerQuery = '';
  proposed = '';
  enquiryUpdate: any = [];
  locationCalled: any = [];
  locationCall = 'Called From';
  callTypes: any = [];
  callType = 'Select CallType';
  cTypes: any = [];
  cType = 'Select Type';
  products: any = [];
  product = 'Select Product';
  isEnquiry = false;
  enquiryBtn;
  constructor() {
    this.assignValues();
    this.enquiryBtn = localStorage.getItem('isEnquiry');
  }

  assignValues() {
    this.locationCalled = [{id: 0, name: 'Called From'}, {id: 1, name: 'Bangalore'},
                            {id: 2, name: 'Hydrabad'}, {id: 3, name: 'Kerala'}, {id: 4, name: 'Chennai'},
                            {id: 5, name: 'Non Ample Location'}, {id: 6, name: 'Blank Call'}];
    this.callTypes = [{id: 0, name: 'Select CallType'}, {id: 1, name: 'Service'},
                          {id: 2, name: 'Retail'}, {id: 3, name: 'Reception'}, {id: 4, name: 'Blank Call'},
                          {id: 5, name: 'General'}];
    this.cTypes = [{id: 0, name: 'Select Type'}, {id: 1, name: 'Service'},
                          {id: 2, name: 'Complaint'}, {id: 3, name: 'Others'}];
    this.products = [{id: 0, name: 'Select Product'}, {id: 1, name: 'iPhone'},
                          {id: 2, name: 'Mac'}, {id: 3, name: 'Accessories'}, {id: 4, name: 'iPod'},
                          {id: 5, name: 'iPad'}];
  }

  editCustomerInfo() {
    this.isEdit = false;
  }

  saveCustomerInfo() {
    this.isEdit = true;
  }

  createEnquiry() {
    this.isEnquiry = true;
    this.enquiryBtn = 'false';
  }

  saveEnquiry() {
    console.log(this.customerQuery + this.proposed + this.locationCall + this.callType + this.cType + this.product);
  }
}
