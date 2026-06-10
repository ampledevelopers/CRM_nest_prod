import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ConsignmentsService } from './consignments.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe, formatDate } from '@angular/common';
import * as _ from 'lodash';
//import { isNumeric } from 'rxjs';
import { ExcelService } from '../analytics/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
    selector: 'app-consignments',
    templateUrl: './consignments.component.html',
    styleUrls: ['./consignments.component.scss', '../../../scss/customstyle.css', '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ConsignmentsComponent {
  page: number = 1;
  itemsPerPage: number = 15;
  remarksError = '';
  inactiveASNNo = '';
  inactiveRemarks = '';
  loading = false;
  buttonSpin = false;
  error: any;
  conError = '';
  userRole;
  partSearch = '';
  consignments: any = [];
  consignmentsList: any = [];
  stockType = 'Ample';
  stockTypes = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Ample', value: 'Ample'},
  ];
  isApple = false;
  category = '';
  stockCategories = [
    {label: 'WUR', value: '1'},
    {label: 'SUR', value: '2'},
    {label: 'ACC', value: '3'},
  ];
  partType = 'Consignment';
  asnNo = '';
  partNo = '';
  partDescription = '';
  serialNo = '';
  imeiNo = '';
  deliveryNo = '';
  quantity = '';
  remarks = '';
  replishementTicketId = '';
  receivedDate: any;
  bsConfig: Partial<BsDatepickerConfig> ;
  bsValue: Date = new Date();
  datePipe = new DatePipe('en-US');
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  listType = 'Loaners';
  unblockASNNo = '';
  consignmentTemp: any = [];
  branch = localStorage.getItem('branchCode');
  constructor(public dataService: ConsignmentsService, private modalService: NgbModal, public excelService: ExcelService) {
    this.bsConfig = Object.assign({}, { showWeekNumbers: false }, {showOnFocus: false});
    this.userRole = localStorage.getItem('userRole');
    this.getConsignments();
  }

  openModal(templat: TemplateRef<any>) {
   this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  /* selectListType() {
    console.log(this.listType);
    if (this.listType === 'Loaners') {
      this.listType = 'Consignments';
    } else {
      this.listType = 'Loaners';
      // this.getConsignments();
    }
  } */

  getConsignments() {
    let result: any;
    this.consignments = [];
    this.dataService.getConsignmentlist()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.consignments = result.items;
            for (let i = 0; i < this.consignments.length; i++) {
              if (this.consignments[i].status === 'A') {
                this.consignments[i].status = 'Active';
              } else if (this.consignments[i].status === 'U') {
                this.consignments[i].status = 'In-Use';
              } else if (this.consignments[i].status === 'B') {
                this.consignments[i].status = 'Blocked';
              } else if (this.consignments[i].status === 'R') {
                this.consignments[i].status = 'Returned';
              } else if (this.consignments[i].status === 'I') {
                this.consignments[i].status = 'Issued';
              }
            }
            // this.consignmentsList = this.consignments;
            this.statusChange(1);
          }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  selectStock(event: { value: string; }) {
    this.stockType = event.value;
    if (this.stockType === 'Ample') {
      this.isApple = true;
      this.deliveryNo = '';
    } else {
      this.isApple = false;
    }
  }

  selectStockCategory(event: { label: string; }) {
    this.category = event.label;
  }

  selectPartType(event: { value: string; }) {
    this.partType = event.value;
  }

  saveAcknowledge(simple_alert_temp: TemplateRef<any>) {
    // this.buttonSpin = true;
    let ampleInputs = false;
    let appleInputs = false;
    if (this.stockType === '') {
      alert('Enter Stock Type');
      return;
    }

    if (this.stockType === 'Ample') {
      if (this.serialNo === '') {
        alert('Enter Serial Number');
        return;
      } else if (this.partNo === '') {
        alert('Enter Part Number');
        return;
      } else {
        ampleInputs = true;
      }
    } else if (this.stockType === 'Apple') {
      if (this.serialNo === '') {
        alert('Enter Serial Number');
        return;
      } else if (this.partNo === '') {
        alert('Enter Part Number');
        return;
      } else if (this.deliveryNo === '') {
        alert('Enter Delivery Number');
        return;
      } else if (this.receivedDate === '') {
        alert('Select Delivery Date');
        return;
      } else {
        appleInputs = true;
      }
    }

    if ((ampleInputs === true) || (appleInputs === true)) {
      let saveData;
      if (this.stockType === 'Apple') {
        this.receivedDate = this.datePipe.transform(this.bsValue, 'yyyy/MM/dd');
        saveData = '&serialized=' + '' + '&stock_type=' + this.stockType + '&delivery_no=' + this.deliveryNo + '&part_no=' + this.partNo +
        '&serial_no=' + this.serialNo + '&delivery_date=' + this.receivedDate + '&replenishment_ticket_id=' + this.replishementTicketId;
      } else {
        saveData = '&serialized=' + '' + '&stock_type=' + this.stockType + '&part_no=' + this.partNo +
        '&serial_no=' + this.serialNo + '&erp_asn=' + this.asnNo;
      }
        let result: any;
        this.buttonSpin = false;
        this.dataService.saveConsignment(saveData)
          .subscribe({
            next: (data: any) => {
                result = data;
              if (result.status === true) {
                this.getConsignments();
                this.reset();
                this.buttonSpin = false;
              } else {
                this.buttonSpin = false;
                this.simpleAlert = {title: 'Add Consignment', msg: result.message};
                this.openModal(simple_alert_temp);
              }
            },
            error: error => this.error = error
    });
    } else {
      this.buttonSpin = false;
    }
  }

  reset () {
    this.partNo = '';
    this.partDescription = '';
    this.stockType = '';
    this.category = '';
    this.serialNo = '';
    this.deliveryNo = '';
    this.bsValue = new Date();
    this.receivedDate = '';
    this.partType = '';
    this.remarks = '';
    this.asnNo = '';
  }

  searchPart(event: { target: { value: string; }; }) {
    let word: any = event.target.value.toLowerCase();
    word = word.replace(/\s/g, '');
    let searchedParts: any = [];

    if ((this.partSearch !== '') && (this.partSearch !== '<empty string>')) {
      for (let i = 0; i < this.consignments.length; i++) {
        if (!isNaN(word)) {
          searchedParts = _.filter(this.consignmentTemp, row => row.blocked_ticket_id.toLowerCase().indexOf(word) > -1);
        } else {
          searchedParts = _.filter(this.consignmentTemp, row => row.part_no.toLowerCase().indexOf(word) > -1);
        }
      }
      // searchedParts = searchedParts.sort((a: any, b: any) => a.asn_no.localeCompare(b.asn_no));
      this.consignmentsList = searchedParts.reverse();
  } else {
    this.consignmentsList = this.consignmentTemp;
  }
  }

  statusChange(event: any) {
    this.consignmentTemp = [];
    if (event === '4') {
      this.consignmentTemp = this.consignments;
    } else if (event === '2') {
      this.consignmentTemp =  this.consignments.filter((data: any) => {
        return data.status === 'Blocked';
      });
    }  else if (event === '3') {
      this.consignmentTemp =  this.consignments.filter((data: any) => {
        return data.status === 'Issued';
      });
    } else {
      this.consignmentTemp =  this.consignments.filter((data: any) => {
        return data.status === 'Active';
      });
    }
    // this.consignmentTemp = this.consignmentTemp.sort((a: any, b: any) => a.asn_no.localeCompare(b.asn_no));
    this.consignmentsList = this.consignmentTemp.reverse();
  }

  unblockASN(asnId: string, confirm_alert: TemplateRef<any>) {
    this.unblockASNNo = asnId;
    this.openModal(confirm_alert);
  }

  confirm() {
    let result: any;
    this.dataService.unBlockConsignment(this.unblockASNNo)
          .subscribe({
            next: (data: any) => {
                result = data;
              if (result.status === true) {
                this.modalService.dismissAll();
                this.getConsignments();
                this.buttonSpin = false;
              } else {
                this.modalService.dismissAll();
                this.buttonSpin = false;
                alert(result.message);
              }
            },
            error: error => this.error = error
  });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.consignments, 'Consignments');
  }
pageGroup = 1;

// Get the paginated data for the current page
get paginatedConsignments() {
  const start = (this.page - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.consignmentsList.slice(start, end);
}

// Generate only 10 page numbers per group
get pageNumbers() {
  const totalPages = Math.ceil(this.consignmentsList.length / this.itemsPerPage);
  const startPage = (this.pageGroup - 1) * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

// Change to a specific page
changePage(pageNum: number) {
  this.page = pageNum;
  this.pageGroup = Math.ceil(this.page / 10);
}

// Move to the next group of 10 pages
nextPageGroup() {
  const totalPages = Math.ceil(this.consignmentsList.length / this.itemsPerPage);
  if (this.pageGroup * 10 < totalPages) {
    this.pageGroup++;
    this.page = (this.pageGroup - 1) * 10 + 1;
  }
}

// Move to the previous group of 10 pages
prevPageGroup() {
  if (this.pageGroup > 1) {
    this.pageGroup--;
    this.page = (this.pageGroup - 1) * 10 + 1;
  }
}



    makeInactive(asnId: any, confirm_alert: TemplateRef<any>) {
      this.inactiveASNNo = asnId;
      this.openModal(confirm_alert);
    }

    confirm1() {
      let result: any;
      if (this.inactiveRemarks === '') {
        this.remarksError = 'Enter the remarks';
      } else {
        this.dataService.inactiveConsignment(this.inactiveASNNo, this.inactiveRemarks)
        .subscribe({
          next: (data: any) => {
              result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.getConsignments();
              this.buttonSpin = false;
            } else {
              this.modalService.dismissAll();
              this.buttonSpin = false;
              alert(result.message);
            }
          },
          error: error => this.error = error
      });
      }
    }
}
