import { Component, SecurityContext, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OnsiteDcService } from '../onsite-dc.service';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}


@Component({
    selector: 'app-onsite-dc-form',
    templateUrl: './onsite-dc-form.component.html',
    styleUrls: ['./onsite-dc-form.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class OnsiteDcFormComponent {
  dropLocationFlag = localStorage.getItem('drop_location_flag')
  loading = true;
  buttonSpin = false;
  error: any;
  fromHtml = '';
  toHtml = '';
  dcType = 'Select DC Type';
  dcNo: any = '';
  dcDate = new Date().toLocaleString();
  eWayBillNo = '';
  personName = localStorage.getItem('userName');
  personMobile = localStorage.getItem('UserMobile');
  contactPerson = '';
  contactMobile = '';
  docketNo = '';
  shipperName = '';
  invoiceNo = '';
  partList: any = [];
  ticketId = '';
  companyDetails: any = [];
  companyGST = '';
  totalValue = '';
  remarks = '';
  dlDate = '';
  dlPersonName = '';
  dlMode = '';
  approveDeclineRemarks = '';
  approveDeclineStatus = '';
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  userRole = localStorage.getItem('userRole');
  loggedinUser = localStorage.getItem('userId');
  isApprover = true;
  notfilled = false;
  showCreateBtn = true;
  dlContactPerson: any = '';
  serialNumber: any = '';
  showDownload = false;
  showDlCreateBtn = true;
  showDlCancelBtn = true;
  showClose = false;
  branchCode = localStorage.getItem('branchCode');
  siteType = localStorage.getItem('siteType');
  dropBranchCode = '';
  dcId = '10';
  dlGstn = '';
  allValuesEntered = false;
  constructor(sanitizer: DomSanitizer, private modalService: NgbModal, public dataService: OnsiteDcService,
    private _location: Location, public router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['from']) {
        this.getKDcData();
        if ((this.userRole === '5') || (this.userRole === '19')) {
          this.isApprover = false;
        } else {
          this.isApprover = true;
        }
        this.showCreateBtn = false;
      } else {
        this.isApprover = false;
        this.showCreateBtn = true;
        const partlst: any = localStorage.getItem('partlist');
        this.partList = JSON.parse(partlst);
        if (this.dropLocationFlag !== '1' && this.siteType === '2') {
          for (let i = 0; i < this.partList.length; i++) {
            if ((this.partList[i].part_number === this.partList[i].part_used) || (this.partList[i].part_number === '')) {
              this.partList[i].part = this.partList[i].part_number;
            } else {
              this.partList[i].part = this.partList[i].part_used;
            }
          }
          this.ticketId = this.partList[0].ticket_id;
          this.getLocationaddress(this.partList[0].branch_code);
          this.getCompany()
        }
        else if (this.siteType === '1') {
          // this.getDlDcData();
          if (this.dropLocationFlag === '1') {
            const pickUp = this.partList[0].pickup_branch_code;
            const drop = this.partList[0].drop_branch_code;
            this.getLocationaddress(pickUp);
            this.getLocationaddress(drop, 'To');
            this.dropBranchCode = this.partList[0].drop_branch_code;
          } else {
            const drop = this.partList[0].pickup_branch_code;
            const pickUp = this.partList[0].drop_branch_code;
            this.getLocationaddress(pickUp);
            this.getLocationaddress(drop, 'To');
            this.dropBranchCode = this.partList[0].pickup_branch_code;
          }
          this.ticketId = this.partList[0].ticket_id;
          this.serialNumber = this.partList[0].serial_no;
          // this.assignValues(this.partList[0]);
          // this.dcNo = data.branch_code + data.id;
        }
      }
    });
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelDC() {
    localStorage.removeItem('dcNo');
    this._location.back();
  }

  dlClose() {
    this.cancelDC();
  }

  cancel() {
    this.modalService.dismissAll();
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
    if (this.siteType !== '1') {
      this._location.back();
    } else {
      this.showDownload = true;
      this.showDlCreateBtn = false;
      this.showDlCancelBtn = false;
      this.showClose = true;
      this.remarks = '';
      this.dlDate = '';
      this.dlContactPerson = '';
      this.dlPersonName = '';
    }

  }

  getLocationaddress(code: any, type?: any) {
    let result: any;
    this.dataService.getLocation(code)
      .subscribe(
        (data) => {
          result = data;
          const branch = result.branch;
          // this.dlGstn = branch.gstn_no;
          if (result.status === true) {
            if (type === undefined) {
              this.fromHtml = '<label><b>Ample Technologies Pvt. Ltd</b></label><br/><label>' + branch.address1 + '</label><br/><label>' + branch.address2 + '</label><br/><label>' + branch.city + '</label>, <label>' + branch.state + '-' + branch.pin + '</label><br/><label><b>' + 'GST No - ' + branch.gstn_no + '</label>';
              this.loading = false;
            }
            if (type === 'To') {
              this.toHtml = '<label><b>Ample Technologies Pvt. Ltd</b></label><br/><label>' + branch.address1 + '</label><br/><label>' + branch.address2 + '</label><br/><label>' + branch.city + '</label>, <label>' + branch.state + '-' + branch.pin + '</label><br/><label><b>' + 'GST No - ' + branch.gstn_no + '</label>';
              this.loading = false;
            }
            /* if (this.branchCode !== '2') {
              this.companyDetails.address1 = branch.address1;
              this.companyDetails.address2 = branch.address2;
              this.companyDetails.city = branch.city;
              this.companyDetails.state = branch.state;
              this.companyDetails.pin = branch.pin;
            } */
          }
        });
  }


  getCustomerAddress(event: any) {
    let result: any;
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.dataService.getCustomer(this.contactMobile)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.contactPerson = result.customer.user_name;
              this.companyDetails.address1 = result.customer.address1;
              this.companyDetails.address2 = result.customer.address2;
              this.companyDetails.city = result.customer.city;
              this.companyDetails.state = result.customer.state;
              this.companyDetails.pin = result.customer.pin;
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
  }

  /* ********** From Approver ************ */

  getCompany() {
    let results: any;
    this.dataService.getCompany(this.ticketId)
      .subscribe(
        (data) => {
          results = data;
          if (results.status === true) {
            this.companyDetails = results.company.company;
          }
        });
  }

  getKDcData() {
    let result: any;
    this.dataService.getDcList(localStorage.getItem('dcNo'), '', '')
      .subscribe(
        (data) => {
          result = data;
          this.buttonSpin = false;
          if (result.status === true) {
            this.partList = result.dc.dt;
            for (let i = 0; i < this.partList.length; i++) {
              this.partList[i].part = this.partList[i].part_number;
            }
            this.assignValues(result.dc.hd[0]);
          } else {
            alert(result.message);
          }
        });
  }

  assignValues(data: any) {
      this.getLocationaddress(data.branch_code);
      this.dcNo = data.branch_code + data.id;
      this.dcDate = data.date;
      this.eWayBillNo = data.eway_bill_no;
      this.companyGST = data.gstn_no;
      this.totalValue = data.total_value;
      this.remarks = data.remarks;
      this.dlDate = data.date_of_delivery;
      this.dlPersonName = data.delivery_person_name;
      this.dlMode = data.mode_of_transport;
      this.contactPerson = data.contact_person_name;
      this.contactMobile = data.contact_person_mobile;
      this.docketNo = data.docket_number;
      this.shipperName = data.shipper_name;
      this.dcType = data.dc_type;
      this.companyDetails.company_name = data.company_name;
      this.companyDetails.address1 = data.address1;
      this.companyDetails.address2 = data.address2;
      this.companyDetails.city = data.city;
      this.companyDetails.state = data.state;
      this.companyDetails.pin = data.pin;
      this.loading = false;
      if (this.userRole === '20') {
        if (data.user_id === this.loggedinUser) {
          this.isApprover = false;
        } else {
          this.isApprover = true;
        }
      }
  }


  /* ********** Create New ************ */

  deleterow(idx: any) {
    this.partList.splice(idx, 1);
    if(this.siteType !== '2') {
      this.getTotalValue();
    }
  }

  saveDC(simple_alert_temp: TemplateRef<any>) {
    if (this.dcType === 'Select DC Type') {
      alert('Select DC Type');
      this.notfilled = true;
      return;
    } else if (this.contactPerson === '') {
      alert('Enter Contact Person Name');
      this.notfilled = true;
      return;
    } else if (this.contactMobile === '') {
      alert('Enter Contact Person Mobile No');
      this.notfilled = true;
      return;
    } else if (this.totalValue === '') {
      alert('Enter the Consignment Total Value');
      this.notfilled = true;
      return;
    } else if (this.remarks === '') {
      alert('Enter Remarks');
      this.notfilled = true;
      return;
    } else if (this.dlDate === '') {
      alert('Enter Delivery Date');
      this.notfilled = true;
      return;
    } else if (this.dlPersonName === '') {
      alert('Enter Delivery Person Name');
      this.notfilled = true;
      return;
    } else if (this.dlMode === '') {
      alert('Enter Delivery Mode');
      this.notfilled = true;
      return;
    } else if (parseInt(this.totalValue) >= 50000) {
      alert('E-Way Bill Number required for this DC');
      this.notfilled = true;
      return;
    } else {
      this.notfilled = false;
    }

    if (this.notfilled === false) {
      const dc_hd = [{
        'company_name': this.companyDetails.company_name, 'address1': this.companyDetails.address1, 'address2': this.companyDetails.address2, 'city': this.companyDetails.city, 'state': this.companyDetails.state, 'pin': this.companyDetails.pin, 'gstn_no': this.companyGST, 'dc_type': this.dcType, 'date': this.dcDate,
        'contact_person_name': this.contactPerson, 'contact_person_mobile': this.contactMobile, 'eway_bill_no': this.eWayBillNo, 'docket_number': this.docketNo,
        'shipper_name': this.shipperName, 'total_value': this.totalValue, 'remarks': this.remarks, 'delivery_person_name': this.dlPersonName, 'date_of_delivery': this.dlDate,
        'mode_of_transport': this.dlMode, 'user_id': localStorage.getItem('userId'), 'invoice_no': this.invoiceNo
      }];
      const dc_dt = this.partList;
      let result: any;
      this.dataService.dcSubmit(dc_hd, dc_dt)

        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.dcNo = result.nrdc_no;
              localStorage.removeItem('partlist');
              this.simpleAlert = { title: 'DC Creation', msg: 'Form has been submitted for Approve.\n' + 'DC No:' + ' ' + result.dc_no };
              this.openModal(simple_alert_temp);
            } else {
              alert(result.message);
            }
          });
    } else {
      alert('Please check and fill all the fields.');
    }
  }

  approveDeclineDC(status: any, decline_temp: TemplateRef<any>) {
    this.approveDeclineStatus = status;
    if (parseInt(this.totalValue) >= 50000) {
      if (this.eWayBillNo === '') {
        alert('E-Way Bill number is mandatory, if Total value 50000 and above');
        return;
      } else {
        this.openModal(decline_temp);
        this.buttonSpin = true;
      }
    } else {
      this.openModal(decline_temp);
      this.buttonSpin = true;
    }
  }

  submit(simple_alert_temp: TemplateRef<any>) {
    if (this.remarks === '') {
      this.notfilled = true;
    } else {
      this.notfilled = false;
      this.modalService.dismissAll();
    }

    if (this.notfilled === false) {
      let result: any;
      this.dataService.approveDeclineDc(localStorage.getItem('dcNo'), this.approveDeclineStatus, this.eWayBillNo, this.approveDeclineRemarks)
        .subscribe(
          (data) => {
            result = data;
            this.buttonSpin = false;
            this.simpleAlert = { title: 'DC Approve/Decline', msg: result.message };
            this.openModal(simple_alert_temp);
            localStorage.removeItem('isApprover');
            localStorage.removeItem('dcNo');
          });
    }
  }

  // ************************************ DROP LOCATION ***************************************

  saveDlDC(simple_alert_temp: TemplateRef<any>) {
    /* if (this.remarks === '') {
      alert('Enter Remarks');
      this.notfilled = true;
      return;
    } else  */
    if (this.dlDate === '') {
      alert('Enter Delivery Date');
      this.notfilled = true;
      return;
    } else if (this.dlPersonName === '') {
      alert('Enter Delivery Person Name');
      this.notfilled = true;
      return;
    }else if (this.totalValue === '') {
      alert('Enter all the Values');
      this.notfilled = true;
      return;
    } else {
      this.notfilled = false;
    }

    if (this.notfilled === false) {
      const RAFlist: any = [];
      for (let i = 0; i < this.partList.length; i++) {
        RAFlist.push(
          {
            'ticket_id': this.partList[i].ticket_id, 'serial_no': this.partList[i].serial_no, 'part_number': '', 'description': '', 'value': this.partList[i].value
          }
        )
      }
      const dc_hd = [{
        'branch_code': this.branchCode, 'drop_branch_code': this.dropBranchCode, 'contact_person_name': '', 'contact_person_mobile': '', 'address1': '', 'address2': '', 'city': '', 'state': '', 'pin': '', 'entrytime': this.dcDate, 'dc_type': 'DL',
        'remarks': 'internal transfer for Service', 'delivery_person_name': this.dlPersonName, 'date_of_delivery': this.dlDate, 'user_id': localStorage.getItem('userId'), 'total_value': this.totalValue  //'gstn': this.dlGstn
      }];
      const dc_dt = RAFlist;
      let result: any;
      this.dataService.dlDcSubmit(dc_hd, dc_dt)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.dcNo = result.dc_no;
              localStorage.removeItem('partlist');
              this.simpleAlert = { title: 'DC Creation', msg: 'DC has been Created.\n' + 'DC No:' + ' ' + result.dc_no };
              this.openModal(simple_alert_temp);
            } else {
              alert(result.message);
            }
          });
    } else {
      alert('Please check and fill all the fields.');
    }
  }

  downloadDC() {
    this.dcNo = this.dcNo.replace(this.branchCode, '');
    const url = localStorage.getItem('rootUrl') + 'api/mis/pud_dc_print?X_API_KEY=' + 'Ti@vlp123' + '&id=' + this.dcNo;
    const tab = window.open(url);
  }

  approveDeclineDlDC(status: any, decline_temp: TemplateRef<any>) {
    this.approveDeclineStatus = status;
    this.openModal(decline_temp);
    this.buttonSpin = true;
  }

  getTotalValue() {
    let total = 0.00;
    this.allValuesEntered = false;
    let partsWithoutValue = this.partList.filter((item: any) => {
      return (item.value === undefined || item.value === '');
    });
    if(partsWithoutValue.length === 0) {
      this.allValuesEntered = true;
    }
    for (let i = 0; i < this.partList.length; i++) {
      if(this.partList[i].value !== undefined && this.partList[i].value !== '') {
        total = +total + +this.partList[i].value;
      }
    }
    if(this.allValuesEntered === true) {
      this.totalValue = total.toString();
    } else {
      this.totalValue = '';
    }
  }

}
