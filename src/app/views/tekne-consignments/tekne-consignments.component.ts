import { TekneConsignmentsService } from './tekne-consignments.service';
import { Component, TemplateRef, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-tekne-consignments',
    templateUrl: './tekne-consignments.component.html',
    styleUrls: ['./tekne-consignments.component.scss', './../../../scss/customstyle.css', './../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TekneConsignmentsComponent {
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
    {label: 'Service', value: 'Service'},
    {label: 'Store', value: 'Store'},
  ];
  wsItemNo = '';
  partNo = '';
  partDescription = '';
  serialNo = '';
  wsStoNo = '';
  remarks = '';
  stoDate: Date = new Date();
  datePipe = new DatePipe('en-US');
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  imageTemp: any = [];
  dcolor = false;
  selectedFile: any;
  @ViewChild('fileInput', {static: true}) fileInputVariable!: ElementRef;
  branch = localStorage.getItem('branchCode');

  constructor(public dataService: TekneConsignmentsService, private modalService: NgbModal) {
    this.userRole = localStorage.getItem('userRole');
    this.getConsignments();
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getConsignments() {
    let result: any;
    this.consignments = [];
    this.dataService.getConsignmentlist()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.consignments = result.data;
            for (let i = 0; i < this.consignments.length; i++) {
              if (this.consignments[i].status === 'A') {
                this.consignments[i].status = 'Active';
              }
            }
            this.consignmentsList = this.consignments;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
  });
  }

  reset () {
    this.partNo = '';
    this.partDescription = '';
    this.stockType = '';
    this.serialNo = '';
    this.wsStoNo = '';
    this.stoDate = new Date();
    this.remarks = '';
    this.wsItemNo = '';
  }

  searchPart(event: any) {
    let word: any = event.target.value.toLowerCase();
    word = word.replace(/\s/g, '');
    let searchedParts: any = [];
    if ((this.partSearch !== '') && (this.partSearch !== '<empty string>')) {
      for (let i = 0; i < this.consignments.length; i++) {
        if (isNaN(word)) {
          searchedParts = _.filter(this.consignments, row => row.blocked_ticket_id.toLowerCase().indexOf(word) > -1);
        } else {
          searchedParts = _.filter(this.consignments, row => row.part_no.toLowerCase().indexOf(word) > -1);
        }
      }
      this.consignments = searchedParts;
  } else {
    this.consignments = this.consignmentsList;
  }
  }


  // confirm() {
  //   let result: any;
  //   if (this.inactiveRemarks === '') {
  //     this.remarksError = 'Enter the remarks';
  //   } else {
  //     this.dataService.inactiveConsignment(this.inactiveASNNo, this.inactiveRemarks)
  //     .subscribe({
  //       next: (data: any) => {
  //           result = data;
  //         if (result.status === true) {
  //           this.modalService.dismissAll();
  //           this.getConsignments();
  //           this.buttonSpin = false;
  //         } else {
  //           this.modalService.dismissAll();
  //           this.buttonSpin = false;
  //           alert(result.message);
  //         }
  //       },
  //       error: error => this.error = error
  //   });
  //   }
  // }

  // onFileUploadfun(event: any) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files[0]) {
  //     this.imageTemp = event.target.files[0];
  //     reader.readAsDataURL(this.imageTemp);
  //     reader.onload = () => {
  //       this.selectedFile = reader.result;
  //       this.dcolor = false;
  //     };
  //   }
  // }

  saveAcknowledge(simple_alert_temp: TemplateRef<any>) {
    // this.buttonSpin = true;
    let ampleInputs = false;
    let appleInputs = false;

    if (this.stockType === '') {
      alert('Enter Stock Type');
      return;
    }

      if (this.serialNo === '') {
        alert('Enter Serial Number');
        return;
      } else if (this.partNo === '') {
        alert('Enter Part Number');
        return;
      } else if (this.wsItemNo === '') {
        alert('Enter WS Item ASN');
        return;
      } else if (this.partDescription === '') {
        alert('Enter Part Description');
        return;
      }
      else if (this.wsStoNo === '') {
        alert('Enter STO Number');
        return;
      } else if (!this.stoDate) {
        alert('Select STO Date');
        return;
      }
        let saveData;
        saveData = '&serialized=' + 1 + '&stock_type=' + this.stockType + '&part_no=' + this.partNo + '&branch_code=' + this.branch +
        '&serial_no=' + this.serialNo + '&ws_item_no=' + this.wsItemNo + '&description=' + this.partDescription + '&ws_sto_no=' + this.wsStoNo + '&ws_sto_date=' + this.stoDate;
        let result: any;
        this.buttonSpin = false;
        this.dataService.saveConsignment(saveData)
          .subscribe({
            next: (data: any) => {
                result = data;
              if (result.status === true) {
                alert(result.message);
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
  }

  onFileUploadfun(event: any) {
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


  // bulkUpload() {
  //   this.buttonSpin = true;
  //   const today = new Date().toDateString();
  //   const docs: any = [];
  //   if (this.imageTemp.length !== 0) {
  //     docs.push({
  //       file_name: this.imageTemp.name,
  //       extension: this.imageTemp.type.split('/')[1],
  //       date: today,
  //       file: this.selectedFile,
  //     });
  //   } else {
  //     this.dcolor = true;
  //     this.buttonSpin = false;
  //     return;
  //   }

  //   let result: any;
  //     this.dataService.bulkUpload(docs)
  //     .subscribe(
  //       (data) => {
  //         result = data;
  //         if (result.status === true) {
  //           alert(result.message);
  //           this.buttonSpin = false;
  //           this.imageTemp = [];
  //           this.fileInputVariable.nativeElement.value = '';
  //           this.selectedFile = '';
  //           this.dcolor = false;
  //         } else {
  //           alert(result.message);
  //           this.buttonSpin = false;
  //         }
  //     });
  // }

  cancel() {
    this.selectedFile = '';
    this.dcolor = false;
  }


}
