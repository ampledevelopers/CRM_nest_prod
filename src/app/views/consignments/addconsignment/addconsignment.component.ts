import { Component, TemplateRef, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ConsignmentsService } from '../consignments.service';
import { DatePipe, formatDate } from '@angular/common';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
  selector: 'app-consignments',
  templateUrl: './addconsignment.component.html',
  styleUrls: ['./addconsignment.component.scss', '../../../../scss/customstyle.css', '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class AddconsignmentComponent {
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
    { label: 'Apple', value: 'Apple' },
    { label: 'Ample', value: 'Ample' },
  ];
  acknowledgedTypes = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
  ];
  acknowledgedType = '0';
  isApple = false;
  category = '';
  stockCategories = [
    { label: 'WUR', value: '1' },
    { label: 'SUR', value: '2' },
    { label: 'ACC', value: '3' },
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
  serialized = '0';
  replishementTicketId = '';
  receivedDate: any;
  dlDate: Date = new Date();
  datePipe = new DatePipe('en-US');
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  // inactiveASNNo = '';
  // inactiveRemarks = '';
  // remarksError = '';
  imageTemp: any = [];
  dcolor = false;
  selectedFile: any;
  @ViewChild('fileInput', { static: true }) fileInputVariable!: ElementRef;
  branch = localStorage.getItem('branchCode');

  constructor(public dataService: ConsignmentsService, private modalService: NgbModal) {
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
              }
            }
            this.consignmentsList = this.consignments;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  selectStock(event: any) {
    this.stockType = event.value;
    if (this.stockType === 'Ample') {
      this.isApple = true;
      this.deliveryNo = '';
    } else {
      this.isApple = false;
    }
  }

  selectStockCategory(event: any) {
    this.category = event.label;
  }

  selectPartType(event: any) {
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
      }  else if (this.partDescription === '') {
        alert('Enter Part Description');
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
      } else if (this.partDescription === '') {
        alert('Enter Part Description');
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
        this.receivedDate = this.datePipe.transform(this.dlDate, 'yyyy/MM/dd');
        saveData = '&serialized=' + this.serialized + '&stock_type=' + this.stockType + '&delivery_no=' + this.deliveryNo + '&part_no=' + this.partNo +
          '&serial_no=' + this.serialNo + '&delivery_date=' + this.receivedDate + '&replenishment_ticket_id=' + this.replishementTicketId + '&description=' + this.partDescription +
          '&gsx_acknowledged=' + this.acknowledgedType;
      } else {
        saveData = '&serialized=' + '' + '&stock_type=' + this.stockType + '&part_no=' + this.partNo +
          '&serial_no=' + this.serialNo  + this.asnNo + '&description=' + this.partDescription;
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
              this.simpleAlert = { title: 'Add Consignment', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          },
          error: error => this.error = error
        });
    } else {
      this.buttonSpin = false;
    }
  }

  reset() {
    this.partNo = '';
    this.partDescription = '';
    this.stockType = '';
    this.category = '';
    this.serialNo = '';
    this.deliveryNo = '';
    this.dlDate = new Date();
    this.receivedDate = '';
    this.partType = '';
    this.remarks = '';
    this.asnNo = '';
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

  // makeInactive(asnId: any, confirm_alert: TemplateRef<any>) {
  //   this.inactiveASNNo = asnId;
  //   this.openModal(confirm_alert);
  // }

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
  @ViewChild('confirmLocationModal') confirmLocationModal!: TemplateRef<any>;
  @ViewChild('finalConfirmModal') finalConfirmModal!: TemplateRef<any>;


  confirmLocation() {
    this.modalService.open(this.confirmLocationModal, { centered: true });
  }


  openSecondModal() {
    this.modalService.open(this.finalConfirmModal, { centered: true });
  }

  bulkUpload() {
    this.buttonSpin = true;
    const today = new Date().toDateString();
    const docs: any = [];

    if (this.imageTemp && this.imageTemp.length !== 0) {
      docs.push({
        file_name: this.imageTemp.name,
        extension: this.imageTemp.type.split('/')[1],
        date: today,
        file: this.selectedFile,
      });
    } else {
      this.dcolor = true;
      this.buttonSpin = false;
      return;
    }

    this.dataService.bulkUpload(docs)
      .subscribe({
        next: (result: any) => {
          if (result.status === true) {
            alert("Upload Successful");
            this.buttonSpin = false;
            this.imageTemp = [];
            this.fileInputVariable.nativeElement.value = '';
            this.selectedFile = '';
            this.dcolor = false;
          } else {
            alert(result.message);
            this.buttonSpin = false;
          }
        },
        error: (err) => {
          alert("Something went wrong: " + err.message);
          this.buttonSpin = false;
        }
      });
  }



  cancel() {
    this.selectedFile = '';
    this.dcolor = false;
  }


}
