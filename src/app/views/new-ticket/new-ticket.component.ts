import { Component, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatePipe } from '@angular/common';
import { NewTicketService } from './new-ticket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface Gsx {
  device: any;
  warranty: any;
}

export interface SimpleAlert {
  title: any;
  msg: any;
}

export interface GsxInputs {
  SerialNo: any;
  imeiNo: any;
  warrantyStatus: any;
  productDescription: any;
  // configDescription: any;
}

@Component({
    selector: 'app-new-ticket',
    templateUrl: './new-ticket.component.html',
    providers: [NewTicketService],
    styleUrls: ['./new-ticket.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class NewTicketComponent {
  error: any;
  datePipe = new DatePipe('en-US');
  @ViewChild('fileInput', { static: true }) fileInputVariable!: ElementRef;
  modelNumber: any = '';
  buttonSpin = false;
  isGSXError = false;
  modalOpen = false;
  invoiceUploadFail = false;
  gsxError = '';
  deviceInfo: any;
  serialNo: any = '';
  customerName: any;
  customerId = '';
  emailId: any;
  phoneNo: any;
  companies: any = [];
  companyId = '';
  ticketId: any = '';
  customerDetail: any = [];
  customerStatus: any;
  gsxData: Gsx = { device: '', warranty: '' };
  eType: any = 'Select Type';
  eTypes: any = [];
  brandType: any = [];
  brand: any = 'Select Brand';
  loggedAs = 'Select Type';
  loggedAsList: any = [];
  callType = 'Select Call';
  callTypes: any = [];
  description:any='';
  problem: any;
  amcFlag: any;
  bcolor = true;
  spinner = false;
  amcProduct = false;
  amcMSg = '';
  amcDate: any;
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  userRole: any = localStorage.getItem('userRole');
  siteId: any = localStorage.getItem('siteType');
  isCreate = false;
  isCompanyAdmin = false;
  isExCustomer = true;
  location = 'Select Location';
  locations: any;
  locationCode = '';
  physicalLocation = 'Select Physical Location';
  physicalLocations = [
    { id: '0', name: 'Select Physical Location', value: '' },
    { id: '1', name: 'Home', value: '1' },
    { id: '2', name: 'Office', value: '2' },
  ];
  warranty: any = 'Select Warranty';
  week: any = 'Select Week';
  organization: any = null;
  warrantyStatuses = [
    { id: '1', name: 'In Warranty', value: 'IN' },
    { id: '2', name: 'Out Of Warranty (No Coverage)', value: 'OW' },
    { id: '3', name: 'Not Applicable', value: 'NA' }
  ];
  weeks = [
    { id: '0', name: 'Select Week', value: '' },
    { id: '1', name: 'Week 1', value: 'W1' },
    { id: '2', name: 'Week 2', value: 'W2' },
    { id: '3', name: 'Week 3', value: 'W3' },
    { id: '4', name: 'Week 4', value: 'W4' },
    { id: '5', name: 'Week 5', value: 'W5' },
  ];
  productFamilies: any = [];
  productFamily = 'Select Product Family';
  gsxWarrantyStatuses = [
    // { id: '0', name: 'Select Warranty Status' },
    { id: '1', name: 'Apple Limited Warranty' },
    { id: '2', name: 'Out Of Warranty (No Coverage)' },
    { id: '3', name: 'Apple Production Plan(APP)' },
    { id: '4', name: 'Apple Care Plus(AC+)' },
  ];
  options: any = [];
  gsxRequiredData: GsxInputs = { SerialNo: '', imeiNo: '', warrantyStatus: 'Select Warranty Status', productDescription: '' };
  gsxInput = false;
  editCancel = 'Edit';
  addressEdited = true;
  addressEditedValue = '0';
  formErrors: any;
  userId: any;
  dcolor = false;
  selectedFile: any;
  imageTemp: any = [];
  documentType: any = '';
  underAMC: any;
  userBranch: any = localStorage.getItem('branchCode');
  indianStates: any = [];
  constructor(private modalService: NgbModal, public dataService: NewTicketService) {
    this.eTypes = [
      { id: '1', name: 'Enquiry' },
      { id: '2', name: 'Technical Assistance' },
    ];
    this.brandType = [
      { id: '1', name: 'Lenovo' },
      { id: '2', name: 'HP' },
      { id: '3', name: 'Dell' },
    ];
    /* this.productFamilies = [
    {id: '0', name: 'Select Product Family'},
    {id: '1', name: 'iPhone'},
    {id: '2', name: 'Mac'},
    ]; */
    this.indianStates = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
      "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
      "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
      "Delhi","Lakshadweep","Puducherry"];
    this.getOptions();

    if (this.userBranch !== 'OSH') {
      this.getCompanies();
    } else {
      this.companyId = '22';
      this.locationCode = 'OSH';
      this.organization = 'Apple India Pvt. Ltd.';
      this.location = '57';
    }

    if (this.siteId === '3') {
      this.deviceInfo = false;
      this.amcFlag = 0;
      this.productFamily = '15';
      this.gsxWarrantyStatuses = [
        { id: '0', name: 'Select Warranty Status' },
        { id: '1', name: 'Under Warranty' },
        { id: '2', name: 'Out Of Warranty (No Coverage)' },
      ];

      this.warrantyStatuses = [
        { id: '1', name: 'In Warranty', value: 'IN' },
        { id: '2', name: 'Out Of Warranty (No Coverage)', value: 'OW' },
      ];
    }
  }

  getOptions() {
    let result: any;
    this.dataService.getCallTypes()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.callTypes = result.repair_types;
        }, // success path
        error: error => this.error = error // error path
      });

    this.dataService.getLogTypes()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.loggedAsList = result.call_types;
        }, // success path
        error: error => this.error = error // error path
      });

    this.dataService.getOptions()
      .subscribe({
        next: (data: any) => {
          this.options = data;
          this.locations = this.options.branch;
          if (this.siteId === '2' || this.siteId === '3') {
            this.locations = this.locations.filter((data: any) => {
              return data.branch_type === 'O';
            });
          }
          this.productFamilies = this.options.family;
        },
        error: error => this.error = error // error path
      });

    if (this.userRole === '5') {
      let result1: any;
      this.dataService.getBranch()
        .subscribe({
          next: (data: any) => {
            result1 = data;
            if (result1.status === true) {
              const location = result1.branch.branch_name;
              this.locationCode = result1.branch.branch_code;
              const locationsTemp = [];
              for (let i = 0; i < this.locations.length; i++) {
                if (this.locations[i].value === location) {
                  locationsTemp.push(this.locations[i]);
                }
              }
              this.locations = locationsTemp;
            }
          },
          error: error => this.error = error // error path
        });
    }
  }

  addressEdit() {
    if (this.addressEdited === true) {
      this.addressEdited = false;
      this.addressEditedValue = '1';
      this.editCancel = 'Cancel';
    } else {
      const custdetail: any = localStorage.getItem('address');
      this.customerDetail = JSON.parse(custdetail);
      this.addressEdited = true;
      this.addressEditedValue = '0';
      this.editCancel = 'Edit';
    }
  }


  getCompanies() {
    let result;
    this.dataService.getCompanies()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.companies = result.company;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  logSelect(logid: any) {
    this.loggedAs = logid;
  }

  callSelect(callid: any) {
    this.callType = callid;
  }

  warrantySelect(warrantyValue: any) {
    this.warranty = warrantyValue;
  }

  getCustomer(event: any) {
    this.customerId = '';
    let result: any;
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.dataService.getCustomer(this.phoneNo)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.customerDetail = result.customer;
              if (!this.indianStates.includes(this.customerDetail.state)) {
                this.customerDetail.state = '';
              }
              localStorage.setItem('address', JSON.stringify(this.customerDetail));
              this.customerName = result.customer.first_name;
              this.customerId = result.customer.customer_id;
              this.emailId = result.customer.email;
              this.customerStatus = result.customer_status;
              this.isExCustomer = true;
            } else {
              this.customerStatus = 0;
              this.customerName = '';
              this.emailId = '';
              this.isExCustomer = false;
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
  }


  selectLocation() {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.location === this.locations[i].id) {
        this.locationCode = this.locations[i].branch_code;
      }
    }
  }

  getProductDetails(event: any) {
    this.buttonSpin = true;
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.getProduct();
    } else {
      this.buttonSpin = false;
    }
  }

  getProduct() {
    let result: any;
    this.spinner = true;
    this.isGSXError = false;
    this.dataService.getGsxData(this.serialNo)
      .subscribe(
        (data) => {
          result = data;
          setTimeout(() => {
            this.spinner = false;
            if (result.status === true) {
              this.gsxData = { device: result.device, warranty: result.gsx_response.device.warrantyInfo };
              this.deviceInfo = true;
              this.warranty = 'Select Warranty';
              this.week = 'Select Week';
              this.buttonSpin = false;
              this.isGSXError = false;
              this.gsxError = '';
              if (this.siteId === '2') {
                this.getAMC();
              }
            } else {
              this.buttonSpin = false;
              this.isGSXError = true;
              this.gsxError = result.message;
              this.deviceInfo = false;
            }
          }, 1000);
        });
  }

  getAMC() {
    let result: any;
    const date = new Date();
    this.amcDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.amcProduct = false;
    this.dataService.getAMC(this.serialNo)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true && result.data.length !== 0) {
            if (this.amcDate >= result.data[0].from_date && this.amcDate <= result.data[0].to_date) {
              this.amcProduct = true;
              this.amcMSg = 'This product is under AMC.';
              this.amcFlag = 1;
              this.underAMC = true;
            } else {
              this.amcMSg = 'This product is not under AMC.';
              this.amcProduct = true;
              this.amcFlag = 0;
              this.underAMC = false;
            }
          } else {
            this.amcProduct = false;
            this.amcFlag = 0;
          }
        })
  }

  submit(simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let addressCheck = true;
    this.ticketId = '';
    if (this.problem === '') {
      this.bcolor = false;
    } else {
      this.bcolor = true;
    }
    if ((this.customerDetail.address1 === '') && (this.customerDetail.address2 === '') && (this.customerDetail.city === '') &&
      (this.customerDetail.pin === '')) {
      addressCheck = false;
    }
    if (this.deviceInfo === true) {
      this.gsxRequiredData.SerialNo = this.gsxData.device.SerialNo;
      this.gsxRequiredData.imeiNo = this.gsxData.device.imei;
      this.gsxRequiredData.warrantyStatus = this.gsxData.device.warrantyStatus;
      this.gsxRequiredData.productDescription = this.gsxData.device.productDescription;
      this.brand = null;
      this.gsxInput = true;
    } else if (this.deviceInfo === false && this.siteId === '3') {
      this.serialNo = this.gsxRequiredData.SerialNo;
      this.gsxInput = true;
      this.productFamily = '0';
      this.gsxRequiredData.productDescription = this.brand;
      this.gsxRequiredData.warrantyStatus = this.warrantyStatuses.filter((data: any) => {
        return data.value === this.warranty;
      });
      this.gsxRequiredData.warrantyStatus = this.gsxRequiredData.warrantyStatus[0].name;
    }
    // else if (this.deviceInfo === false && this.siteId !== '3') {
    //   this.gsxRequiredData.SerialNo = this.serialNo;
    //   this.gsxInput = true;
    //   this.brand = null;
    // }
    else {
      this.gsxInput = false;
    }

    for (let i = 0; i < this.companies.length; i++) {
      if (this.companies[i].value === this.organization) {
        this.companyId = this.companies[i].id;
        break;
      }
    }
    if (this.siteId !== '3') {
      if ((this.organization !== null) && (this.customerName !== '') && (this.emailId !== '') && (this.location !== 'Select Location') && (this.serialNo !== '') && (this.phoneNo !== '') && (this.problem !== '') && (this.loggedAs !== 'Select Type')
        && (this.callType !== 'Select Call') && (this.warranty !== 'Select Warranty') && (this.week !== 'Select Week') && (this.physicalLocation !== 'Select Physical Location') && (this.customerDetail.state !== '') &&
        (this.productFamily !== 'Select Product Family') && (this.gsxInput === true) && (addressCheck === true)) {
        this.createTicket(simple_alert_temp)
      } else {
        this.simpleAlert = { title: 'Create New Ticket', msg: 'Fill all mandatory fields' };
        this.openModal(simple_alert_temp);
        this.buttonSpin = false;
      }
    } else if (this.siteId === '3') {
      if ((this.organization !== null) && (this.customerName !== '') && (this.emailId !== '') && (this.location !== 'Select Location') && (this.serialNo !== '') && (this.phoneNo !== '') && (this.problem !== '') && (this.loggedAs !== 'Select Type')
        && (this.callType !== 'Select Call') && (this.warranty !== 'Select Warranty') && (this.week !== 'Select Week') && (this.physicalLocation !== 'Select Physical Location') && (this.customerDetail.state !== '') &&
        (this.gsxInput === true) && (addressCheck === true) && this.gsxRequiredData.productDescription !== '' && this.modelNumber !== '' && this.gsxRequiredData.warrantyStatus !== 'Select Warranty' && this.brand !== 'Select Brand') {
        if (this.selectedFile !== undefined) {
          this.dcolor = false;
          this.createTicket(simple_alert_temp)
        } else if (this.selectedFile === undefined) {
          this.dcolor = true;
          this.buttonSpin = false;
        }
      } else {
        this.simpleAlert = { title: 'Create New Ticket', msg: 'Fill all mandatory fields' };
        this.openModal(simple_alert_temp);
        this.buttonSpin = false;
      }
    }
  }

  createTicket(simple_alert_temp: TemplateRef<any>) {
    let commonData: any;
    let result;
    commonData = '&serial_no=' + this.gsxRequiredData.SerialNo + '&imei=' + this.gsxRequiredData.imeiNo +
      '&product_description=' + this.gsxRequiredData.productDescription + '&model_number=' + this.modelNumber + '&brand=' + this.brand +
      '&warranty_status=' + this.gsxRequiredData.warrantyStatus + '&enquiry_flag=' + this.eType +
      '&problem_reported=' + encodeURIComponent(this.problem) + '&repair_type=' + this.callType + '&call_log_type=' +
      this.loggedAs + '&customer_status=' + this.customerStatus + '&customer_name=' + this.customerName +
      '&phone=' + this.phoneNo + '&email=' + this.emailId + '&address1=' + this.customerDetail.address1 +
      '&address2=' + this.customerDetail.address2 + '&city=' + this.customerDetail.city + '&pin=' + this.customerDetail.pin + '&gstn=' + this.customerDetail.gstn +
      '&week_no=' + this.week + '&warranty_type=' + this.warranty + '&company_id=' + this.companyId +
      '&product_family=' + this.productFamily + '&branch_id=' + this.location + '&address_edited=' + this.addressEditedValue + '&state=' + this.customerDetail.state +
      '&branch_code=' + this.locationCode + '&physical_location=' + this.physicalLocation + '&amc_flag=' + this.amcFlag + '&purchased_in=' + this.gsxData.device.purchaseCountry;
    this.dataService.createTicket(commonData, this.customerId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (this.siteId === '3') {
              this.ticketId = result.message.replace('New ticket has been created with ID ', '');
              this.upload(this.ticketId, simple_alert_temp);
            }
            this.resetFields();
            localStorage.removeItem('address');
            this.simpleAlert = { title: 'Create New Ticket', msg: result.message };
            this.openModal(simple_alert_temp);
          } else {
            this.simpleAlert = { title: 'Create New Ticket', msg: result.message };
            this.openModal(simple_alert_temp);
          }

        }, // success path
        error: error => this.error = error // error path
      });
    this.buttonSpin = false;
  }

  resetFields() {
    this.phoneNo = '';
    this.customerName = '';
    this.emailId = '';
    this.serialNo = '';
    this.location = '';
    this.selectedFile = undefined;
    this.modelNumber = '';
    this.brand = '';
    this.locationCode = '';
    this.physicalLocation = '';
    this.gsxData = { device: '', warranty: '' };
    this.eType = 'Select Type';
    this.loggedAs = 'Select Type';
    this.callType = 'Select Call';
    this.warranty = 'Select Warranty';
    this.week = 'Select Week';
    this.organization = null;
    this.productFamily = 'Select Product Family';
    this.gsxRequiredData = { SerialNo: '', imeiNo: '', warrantyStatus: 'Select Warranty Status', productDescription: '' };
    this.problem = '';
    this.customerDetail = [];
    this.spinner = false;
    this.amcProduct = false;
    this.deviceInfo = false;
  }

  openModal(template: any, reason?: any) {
    this.modalService.open(template, { backdrop: 'static', keyboard: false });
    if (reason === 'invoiceFail') {
      this.modalOpen = true;
    } else {
      this.modalOpen = false;
    }
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.buttonSpin = false;
  }

  //upload
  onFileUploadfun(event: { target: { files: string | any[]; }; }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        this.imageTemp = event.target.files[0];
        reader.readAsDataURL(this.imageTemp);
        reader.onload = () => {
          this.selectedFile = reader.result;
          this.dcolor = false;
        };
      }
    }
  }

  upload(ticketId: any, simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    const date = new Date();
    let docUploadDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.description = 'Invoice doc';
    const docs: any = [];
    if (this.imageTemp.length !== 0 && this.documentType !== 'Select document type') {
      docs.push({
        document_type: this.documentType,
        file_name: this.imageTemp.name + '_' + docUploadDate,
        extension: this.imageTemp.type.split('/')[1],
        file: this.selectedFile,
        description: this.description
      });
      let result: any;
      this.dataService.uploadDocuments(ticketId, docs)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              const date = new Date();
              docUploadDate = this.datePipe.transform(date, 'yyyy-MM-dd');
              this.imageTemp = [];
              this.fileInputVariable.nativeElement.value = '';
              alert(result.message);
              this.buttonSpin = false;
              this.invoiceUploadFail = false;
              this.documentType = 'Select document type';
            } else {
              this.buttonSpin = false;
              this.invoiceUploadFail = true;
              this.selectedFile = undefined;
              this.simpleAlert = { title: 'Invoice Upload', msg: 'Invoice upload failed. Try Again' };
              if (this.modalOpen === true) {
                this.openModal(simple_alert_temp, 'invoiceFail');
              }
            }
          });
    } else {
      this.dcolor = true;
      this.buttonSpin = false;
    }
  }

}
