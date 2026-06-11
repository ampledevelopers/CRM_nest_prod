import { Component, TemplateRef } from '@angular/core';
import { TicketDetailsEditService } from './ticket-details-edit.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface Userinfo {
  first_name: any;
  last_name: any;
  email: any;
  phone: any;
  address1: any;
  address2: any;
  city: any;
  state: any;
  pin: any;
  gstn: any;
}

export interface Deviceinfo {
  serialNo: any;
  imeiNo: any;
  productName: any;
  productFamily: any;
  repairType: any;
  serviceType: any;
  condition: any;
  customerQuery: any;
  technicianComment: any;
  svcRemarks: any;
}

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-ticket-details-edit',
    templateUrl: './ticket-details-edit.component.html',
    styleUrls: ['./ticket-details-edit.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class TicketDetailsEditComponent {
  error: any;
  buttonSpin = false;
  bcolor = false;
  ticketId = '';
  data: any;
  isData = false;
  options: any;
  gstnEditable: any = false;
  userInfo: Userinfo = { first_name: '', last_name: '', email: '', phone: '', address1: '', address2: '', city: '', state: '', pin: '', gstn: ''};
  deviceInfo: Deviceinfo = {
    serialNo: '', imeiNo: '', productName: '', productFamily: 'Select Product Family', repairType: '',
    serviceType: '', condition: '', customerQuery: '', technicianComment: '', svcRemarks: ''
  };
  customerInfo: any;
  selectedFamily = '';
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  userRole = localStorage.getItem('userRole');
  loggedInUser = localStorage.getItem('userId');
  readOption = false;
  GSXRepairTypes = [
    { label: 'Select Repair Type', value: '' },
    { label: 'Carry-In', value: 'CIN' },
    { label: 'Mail-In', value: 'WUMS' },
    { label: 'Service Non-Repair Case', value: 'SVNR' },
    { label: 'Carry-In Return Before Replace', value: 'CRBR' }];
  gsxRepairType = '';
  diagnosisHd: any = [];
  managerView = true;
  c3Manager = true;
  lic = true;
  warrantyStatuses: any = [
    { value: '', label: 'Select Warranty Status' },
    { value: 'Apple Limited Warranty', label: 'Apple Limited Warranty' },
    { value: 'Out Of Warranty (No Coverage)', label: 'Out Of Warranty (No Coverage)' },
    { value: 'AppleCare Protection Plan', label: 'AppleCare Protection Plan' },
    { value: 'AppleCare Protection Plus', label: 'AppleCare Protection Plan Plus' },
  ];
  warrantyStatus = '';
  dateTimeEdit = true;
  unitDate = '';
  unitTime = '';
  cusomterQueryEdit = false;
  techCommentEdit = false;
  gNumber = '';
  paymentDateTime: any = null;
  svcId = '';
  editLastName = false;
  isTekne = false;

  constructor(public dataService: TicketDetailsEditService, private modalService: NgbModal) {
    this.getOptions();
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.buttonSpin = false;
  }

  getOptions() {
    let result: any;
    this.dataService.getOptions()
      .subscribe({
        next: (data) => {
          result = data;
          this.options = result;
        },
        error: error => this.error = error // error path
      });
  }

  getData(event: { keyCode: number; target: { value: string; }; }, simple_alert_temp: TemplateRef<any>) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.ticketId = event.target.value;
      this.getTicketDetails(simple_alert_temp);
    }
  }

  getTicketDetails(simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let result: any;
    if (this.ticketId !== '') {
      this.dataService.getDetail(this.ticketId)
        .subscribe({
          next: (data) => {
            result = data;
            if (result.status === true) {
              if ((this.userRole === '3') || (this.userRole === '8')) {
                this.managerView = false;
              }
              if ((this.userRole === '18') || (this.userRole === '2') || (this.userRole === '6')) {
                this.lic = false;
              }
              if ((this.userRole === '3') || (this.userRole === '10') || (this.userRole === '8')) {
                this.c3Manager = false;
              }
              this.data = result.tickets[0];
              if(this.data.repair_model_type == 1) {
                this.isTekne =true;
              } else {
                this.isTekne = false;
              }
              this.diagnosisHd = result.diagnosis[0].repair_hd[0];
              this.paymentDateTime = this.diagnosisHd.payment_date;
              this.svcId =
                this.gNumber = this.data.g_number;
                if(this.data.status_id <= 800) {
                  this.gstnEditable = true;
                } else {
                  this.gstnEditable = false;
                }
              this.getCustomerInfo(this.data.customer_id);
              this.getSVC(this.data.id);
              this.unitDate = this.diagnosisHd.unit_received_date.replace(/-/g, '/');
              this.unitTime = this.diagnosisHd.unit_received_time;
              const date1 = new Date(this.unitDate);
              const date2 = new Date();
              const Difference_In_Time = date2.getTime() - date1.getTime();
              const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
              const Difference_Out_Time = date2.getTime() - date1.getTime();
              const Difference_Out_Days = Difference_Out_Time / (1000 * 3600 * 24);
              if ((Difference_In_Days > 14)) {
                if (this.userRole === '6' || this.userRole === '3' || this.loggedInUser === '50120') {
                  if (this.paymentDateTime !== null) {
                    this.dateTimeEdit = true;
                    // this.dateTimeEdit = false;
                  } else {
                    // this.dateTimeEdit = true;
                    this.dateTimeEdit = false;
                  }
                } else {
                   this.dateTimeEdit = false;
                }
              } else if (Difference_Out_Days < 0) {
                this.dateTimeEdit = false;
              } else {
                  // this.dateTimeEdit = true;
                  this.dateTimeEdit = false;
              }
              if ((this.data.customer_query === '') || (this.userRole === '3')) {
                this.cusomterQueryEdit = true;
              }
              if ((this.data.technician_comment === '') || (this.userRole === '3')) {
                this.techCommentEdit = true;
              }

              this.deviceInfo = {
                serialNo: this.data.serial_no, imeiNo: this.data.imei_no, productName: this.data.product_description,
                productFamily: this.data.product_family, repairType: this.data.repair_type, serviceType: this.data.service_type,
                condition: this.data.condition_of_device, customerQuery: this.data.customer_query, technicianComment: this.data.technician_comment, svcRemarks: this.diagnosisHd.svc_remarks
              };
              this.gsxRepairType = this.diagnosisHd.repair_type;
              if ((this.data.product_family === null) || (this.data.product_family === '')) {
                this.deviceInfo.productFamily = 'Select Product Family';
              }
              if ((this.data.repair_type === null) || (this.data.repair_type === '')) {
                this.deviceInfo.repairType = 'Select Repair Type';
              }
              if ((this.data.service_type === null) || (this.data.service_type === '')) {
                this.deviceInfo.serviceType = 'Select Service Type';
              }

              if (this.options?.family) {
                for (let i = 0; i < this.options.family.length; i++) {
                  if (this.data.product_family === this.options.family[i].value) {
                    this.selectedFamily = this.options.family[i].id;
                    break;
                  }
                }
              }

              for (let l = 0; l < this.warrantyStatuses.length; l++) {
                if (this.data.warranty_status === this.warrantyStatuses[l].label) {
                  this.warrantyStatus = this.warrantyStatuses[l].label;
                  break;
                }
              }
              this.isData = true;
              this.buttonSpin = false;
            } else {
              this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
              this.openModal(simple_alert_temp);
              this.isData = false;
              this.buttonSpin = false;
            }
          },
          error: () => {
            this.buttonSpin = false;
            this.isData = false;
          }
        });
    } else {
      this.bcolor = true;
    }
  }

  getCustomerInfo(id: string) {
    let result: any;
    this.dataService.getCustomerInfo(this.data.site_type_id, id, this.data.customer_phone_no)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.customerInfo = result.customer;
            this.userInfo = this.customerInfo;
            if((this.customerInfo.last_name === '' || this.customerInfo.last_name === undefined) && this.userRole === '2') {
                this.editLastName = true;
            } else {
              this.editLastName = false;
            }
          }
        });
  }

  selectFamily(event: any) {
    if (!this.options?.family) {
      return;
    }
    for (let i = 0; i < this.options.family.length; i++) {
      if (event === this.options.family[i].value) {
        this.selectedFamily = this.options.family[i].id;
        break;
      }
    }
  }

  selectServiceType(event: any) {
    for (let i = 0; i < this.options.service_type.length; i++) {
      if (event === this.options.service_type[i].value) {
        this.selectServiceType = this.options.service_type[i].id;
        break;
      }
    }
  }

  updateUser(simple_alert_temp: TemplateRef<any>) {
    let result: any;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(this.userInfo.first_name) || specialChars.test(this.userInfo.last_name)) {
      alert('Special characters are not alllowed in Name field');
      return;
    }
    else if (!(this.userInfo.email.includes('@') && this.userInfo.email.includes('.'))) {
      alert('Please enter valid Email id');
      return;
    }
    else {
      this.dataService.updateUserInfo(this.userInfo, this.data.customer_id, this.data.id,)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
              this.openModal(simple_alert_temp);
              this.isData = false;
              this.ticketId = '';
            } else {
              this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          });
    }
  }

  updateDeviceInfo(simple_alert_temp: TemplateRef<any>) {
    let result: any;
    if ((this.warrantyStatus === '') && (this.userRole !== '18')) {
      alert('Please Select the Warranty Status');
    } else if (this.deviceInfo.customerQuery === '') {
      alert('Please Enter the Customer Query');
    } else if (this.deviceInfo.technicianComment === '') {
      alert('Please Enter the Technician Comment');
    } else {
      let unitDate = this.unitDate.toString();
      unitDate = unitDate.replace('/', '-');
      unitDate = unitDate.replace('/', '-');

      this.dataService.updateDeviceInfo(this.deviceInfo, this.data.id, this.selectedFamily,
        this.deviceInfo.condition, this.warrantyStatus, unitDate, this.unitTime, this.diagnosisHd.id,
        this.deviceInfo.customerQuery, this.deviceInfo.technicianComment, this.paymentDateTime)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
              this.openModal(simple_alert_temp);
              this.isData = false;
              this.ticketId = '';
            } else {
              this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          });
    }
  }

  updateRepairInfo(simple_alert_temp: TemplateRef<any>) {
    let result: any;
    const specialChars = /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(this.gNumber)) {
      alert('G-Number cannot contain Special Characters');
      return;
    }
    this.dataService.updateRepairInfo(this.data.id, this.diagnosisHd.id, this.gNumber)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
            this.openModal(simple_alert_temp);
            this.isData = false;
            this.ticketId = '';
          } else {
            this.simpleAlert = { title: 'Ticket Details Edit', msg: result.message };
            this.openModal(simple_alert_temp);
          }
        }
      });
  }

  getSVC(ticketId: string) {
    let svcHd: any;
    let result: any;
    this.dataService.getSVC(ticketId)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            svcHd = result.svc_hd;
            for (let i = 0; i < svcHd.length; i++) {
              if (svcHd[i].status === 'Active') {
                this.svcId = svcHd[i].id;
                break;
              } else {
                this.svcId = '';
              }
            }
          } else {
            this.svcId = '';
          }
        });
  }

  updateSvcRemarks(simple_alert_temp: TemplateRef<any>) {
    let result: any;
    this.dataService.updateSvcRemarks(this.data.id, this.svcId, this.deviceInfo.svcRemarks)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.simpleAlert = { title: 'SVC Remarks Update', msg: result.message };
            this.openModal(simple_alert_temp);
            this.isData = false;
            this.ticketId = '';
          } else {
            this.simpleAlert = { title: 'SVC Remarks Update', msg: result.message };
            this.openModal(simple_alert_temp);
          }
        });
  }

}
