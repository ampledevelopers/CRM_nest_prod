import { Component, SecurityContext, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '../../reports/excel.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../shared/user.service';
import { DlDcService } from '../dl-dc.service';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-dc-form',
    templateUrl: './dc-form.component.html',
    styleUrls: ['./dc-form.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class DcFormComponent {
  loading = false;
  error: any;
  buttonSpin = false;
  fromAddress: any = [];
  toAddressList: any = [];
  toAddress: any = [];
  toAddressId = 'Select the Address';
  fromHtml = '';
  nrdcNo: any = '';
  outwardDate = new Date().toLocaleString();
  eWayBillNo = '';
  personName = localStorage.getItem('userName');
  personMobile = localStorage.getItem('UserMobile');
  ticketList: any = [];
  // ticketInput: any = [{ticket_id: '', serial_no: '', part_description: '', value: '', hsn_code: ''}];
  totalValue = '0.00';
  totalBoxes = 1;
  totalItems = '';
  totalWg = '';
  length = '';
  width = '';
  height = '';
  mode = '1';
  boxName = 'Carton Box';
  boxType = [{type: '1', cartonBoxNo: '', toteId: '', tagId: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: ''}];
  cartonBoxes: any;
  toteBoxes: any;
  boxNo = '';
  sign = '';
  awbNo = '';
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  userRole = localStorage.getItem('userRole');
  userBranch = localStorage.getItem('branchCode');
  branchType = localStorage.getItem('branchType');
  dlBranchFlag = localStorage.getItem('drop_location_flag');
  toBranchCode = '';
  notfilled = false;
  imageSrc: string = '';
  selectedFiles: any;
  noEwayBillHtml: any = '';
  kbbVideoExist = false;
  carrierMode = 'Select the Carrier';
  transCarrier = '';
  deliveryAgents:any = [];
  deliveryAgent = 'Select the Person';
  constructor(private dataService: DlDcService, public sanitizer: DomSanitizer, private modalService: NgbModal,
    private _location: Location, public router: Router, private activatedRoute: ActivatedRoute,  private excelService: ExcelService, private userService: UserService) {
      this.getHlDl();
      this.noEwayBillHtml = sanitizer.sanitize(SecurityContext.HTML, this.noEwayBillHtml);
      this.noEwayBillHtml = this.noEwayBillHtml + '<span>' + 'Enter ' + '<b>' + 'NOEWAYBILL' + '</b>' + ' for below 50000.' + '</span>';
      const partlst: any = localStorage.getItem('ticketList');
      this.ticketList = JSON.parse(partlst);
      this.getTotalValue();
      this.totalItems = this.ticketList.length;
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelAndBack() {
    localStorage.removeItem('nrdcNo');
    this.modalService.dismissAll();
    localStorage.removeItem('ticketList');
    this.buttonSpin = false;
    this._location.back();
  }

  cancel() {
    this.modalService.dismissAll();
    this.buttonSpin = false;
  }

  getHlDl() {
    let branchCode: any = '';
    let dlBranchCode: any = '';
    if (this.dlBranchFlag === '1') {
      dlBranchCode = this.userBranch;
      branchCode = '';
    } else {
      dlBranchCode = '';
      branchCode = this.userBranch;
    }
    let result: any;
    this.dataService.getHlDl(branchCode, dlBranchCode)
    .subscribe(
          (data: any) => {
        result = data;
        if (result.status === true) {
          if (this.dlBranchFlag === '1') {
            const rc = result.parent_location;
            const dc = result.drop_location;
            this.toBranchCode = rc.branch_code;
            this.fromAddress = '<label><b>' + dc.branch_name + '</b></label><br/><label>' + dc.address1 + '</label><br/><label>' + dc.address2 + '</label><br/><label>' + dc.city + '</label>, <label>' + dc.state + '-' + dc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + dc.gstn_no + '</label><br><label>';
            this.toAddress = '<label><b>' + rc.branch_name + '</b></label><br/><label>' + rc.address1 + '</label><br/><label>' + rc.address2 + '</label><br/><label>' + rc.city + '</label>, <label>' + rc.state + '-' + rc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + rc.gstn_no + '</label><br><label>';
          } else {
            const rc = result.parent_location;
            this.fromAddress = '<label><b>' + rc.branch_name + '</b></label><br/><label>' + rc.address1 + '</label><br/><label>' + rc.address2 + '</label><br/><label>' + rc.city + '</label>, <label>' + rc.state + '-' + rc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + rc.gstn_no + '</label><br><label>';
            this.toAddressList = result.drop_location;
          }
        }
    });
  }

  changeToAddress(event: any) {
    for (let i = 0; i < this.toAddressList.length; i++) {
      if (this.toAddressList[i].id === event) {
        const rc = this.toAddressList[i];
        this.toBranchCode = rc.branch_code;
        this.toAddress = '<label><b>' + rc.branch_name + '</b></label><br/><label>' + rc.address1 + '</label><br/><label>' + rc.address2 + '</label><br/><label>' + rc.city + '</label>, <label>' + rc.state + '-' + rc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + rc.gstn_no + '</label><br><label>';

        for(let j = 0; j < this.ticketList.length; j++) {
          if (this.toBranchCode !== this.ticketList[j].dl_branch_code) {
            alert(`Ticket id ` + this.ticketList[j].ticket_no + ` not belongs to the selected To address location`);
            return;
          }
        }
      }
    }
  }

  getTotalValue() {
    this.buttonSpin = false;
    let total = 0.00;
    for (let i = 0; i < this.ticketList.length; i++) {
      total = +total + +this.ticketList[i].value;
    }
    this.totalValue = total.toString();
  }

  deleterow(idx: any) {
    this.ticketList.splice(idx, 1);
    this.totalItems = this.ticketList.length;
    this.getTotalValue();
  }

  modeonChange(event: any) {
    this.mode = event;
  }


exportPartList():void {
  if (this.ticketList.length !== 0) {
    this.excelService.exportAsExcelFile(this.ticketList, 'Ticket List');
  } else {
    alert('No ticket available for export');
  }
}

  boxonChange(event: any, boxNo: any) {
    this.boxType[boxNo] = {type: event, cartonBoxNo: '', toteId: '', tagId: ''};
  }

  changeCarrier(event: any) {
    if (event === 'Runner') {
      this.getDeliveryPersons();
      this.deliveryAgent = 'Select the Agent';
      this.transCarrier = 'Runner';
      this.awbNo = '0';
    } else {
      this.awbNo = '';
      this.transCarrier = 'Carrier';
    }
  }

  getDeliveryPersons() {
    let results: any = [];
    this.dataService.getPUDAgent()
      .subscribe({
        next: (data: any) => {
          results = data;
          this.deliveryAgents = results;
        }
      });
  }

  saveKBB(simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let notFilled = false;
    let total1 = 0;
    this.toteBoxes = [];
    this.cartonBoxes = [];
    if (this.personMobile !== '') {
      this.notfilled = true;
    }

    if (this.ticketList.length > 0) {
      for (let j = 0; j < this.ticketList.length; j++) {
        if ((this.ticketList[j].value === '') || (this.ticketList[j].hsn_code === '')) {
          notFilled = true;
          break;
        } else {
            total1 = +total1 + parseFloat(this.ticketList[j].value);
        }

        if ((this.dlBranchFlag === '0') && (this.toBranchCode !== this.ticketList[j].dl_branch_code)) {
          alert(`Ticket id ` + this.ticketList[j].ticket_no + ` not belongs to the selected To address location`);
          this.buttonSpin = false;
          return;
        }
      }

      const totalTemp = total1.toFixed(2);
      if (totalTemp !== this.totalValue) {
        this.totalValue = totalTemp;
      }
    }

    for (let i = 0; i < this.totalBoxes; i++) {
      if (this.boxType[i].type === '1') {
        this.cartonBoxes.push(this.boxType[i]);
        if (this.boxType[i].cartonBoxNo === '') {
          notFilled = true;
        }
      } else {
        this.toteBoxes.push(this.boxType[i]);
        if ((this.boxType[i].toteId === '') || (this.boxType[i].tagId === '')) {
          notFilled = true;
        }
      }
    }

    if ((this.totalBoxes <= 0) || (this.totalWg === '') || (this.awbNo === '') || (this.length === '') || (this.width === '')
    || (this.height === '') || (this.eWayBillNo === '') || (this.carrierMode === 'Select the Carrier')) {
      notFilled = true;
    }

    if (this.deliveryAgent === 'Select the Agent') {
      notFilled = true;
    }

    if (notFilled === true) {
      alert('Fill all mandatory fileds');
      this.buttonSpin = false;
      return;
    } else {
      if (parseInt(this.totalValue) >= 50000) {
        if ((this.eWayBillNo === '') || (this.eWayBillNo === 'NOEWAYBILL')) {
          alert('Enter a valid E-way bill number for above ₹50000');
          this.buttonSpin = false;
          return;
        } else {
         this.createNRDC(simple_alert_temp);
        }
      } else {
        this.createNRDC(simple_alert_temp);
      }

    }
  }

  createNRDC(simple_alert_temp: TemplateRef<any>) {
    let mode = 'Apex';
    if (this.mode === '1') {
      mode = 'Apex';
    } else if (this.mode === '2') {
      mode = 'Surface';
    }

    for (let i = 0; i < this.ticketList.length; i++) {
      delete this.ticketList[i].isSelectPart;
      delete this.ticketList[i].selected;
    }

    const return_hd = [
      {'return_to': this.toBranchCode, 'return_from': this.userBranch, 'date': this.outwardDate, 'user_name': this.personName,
    'mobile': this.personMobile, 'eway_bill_no': this.eWayBillNo, 'total_boxes': this.totalBoxes, 'total_items': this.totalItems,
    'total_weight': this.totalWg, 'total_value': this.totalValue, 'mode': mode, 'awb_no': this.awbNo,
    'carton_box_no': this.cartonBoxes.length, 'tote_box_no': this.toteBoxes.length, 'user_id': localStorage.getItem('userId'),
    'length': this.length, 'width': this.width, 'weight': this.totalWg, 'height': this.height, 'transportation_carrier': this.transCarrier, 'tracking_no': this.awbNo,
    'delivery_agent_id': this.deliveryAgent}
    ];

    const return_dt = this.ticketList;
    return_dt.forEach((item: any) => {
      delete item.outtime;
      delete item.dl_branch_code;
    });

    let result: any;
    this.dataService.createNrdc(return_hd, return_dt, this.cartonBoxes, this.toteBoxes)
        .subscribe(
          (data) => {
              result = data;
              if (result.status === true) {
                this.nrdcNo = result.nrdc_no;
                localStorage.setItem('nrdcNo', this.nrdcNo);
                this.simpleAlert = {title: 'KBB Outward', msg: 'NRDC has been created successfully.\n' + 'NRDC No:' + ' ' + this.nrdcNo};
                this.openModal(simple_alert_temp);
                /* if (this.userBranch === 'SMT') {
                  this.onVideoUpload(simple_alert_temp);
                  this.updateS3Data(simple_alert_temp);
                } else {
                  this.simpleAlert = {title: 'KBB Outward', msg: 'Form has been submitted for Approve.\n' + 'NRDC No:' + ' ' + this.nrdcNo +  '-' + 'Bulk Return ID: ' + this.bulkReturnId};
                  this.openModal(simple_alert_temp);
                } */
              } else {
                alert(result.message);
              }
    });
}

}
