import { DatePipe } from '@angular/common';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { SimpleAlert } from '../../consignments/consignments.component';
import { AdhesiveMasterService } from '../adhesive-master.service';

@Component({
    selector: 'app-add-adhesive',
    templateUrl: './add-adhesive.component.html',
    styleUrls: ['./add-adhesive.component.scss', '../../../../scss/customstyle.css', '../../consignments/addconsignment/addconsignment.component.scss'],
    standalone: false
})
export class AddAdhesiveComponent {

  loading = false;
  userRole: any;
  partSearch = '';
  adhesives: any = [];
  adhesivesList: any = [];
  error: any;
  buttonSpin = false;
  poNo = '';
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
  imeiNo = '';
  quantity = '';
  remarks = '';
dtOptions: any;
  receivedDate: any;
  dlDate: Date = new Date();
  datePipe = new DatePipe('en-US');
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  inactiveASNNo = '';
  inactiveRemarks = '';
  remarksError = '';
  imageTemp: any = [];
  dcolor = false;
  selectedFile: any;
  userId = localStorage.getItem('userId');
  @ViewChild('fileInput', {static: true}) fileInputVariable!: ElementRef;
  branch = localStorage.getItem('branchCode');
  productModel = '';

  constructor(public dataService: AdhesiveMasterService, private modalService: NgbModal) {
    this.userRole = localStorage.getItem('userRole');
    this.getAdhesives();
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getAdhesives() {
    let result: any;
    this.adhesives = [];
    this.dataService.getAdhesiveList()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.adhesives = result.items;
            for (let i = 0; i < this.adhesives.length; i++) {
              if (this.adhesives[i].status === 'A') {
                this.adhesives[i].status = 'Active';
              } else if (this.adhesives[i].status === 'U') {
                this.adhesives[i].status = 'In-Use';
              } else if (this.adhesives[i].status === 'B') {
                this.adhesives[i].status = 'Blocked';
              } else if (this.adhesives[i].status === 'R') {
                this.adhesives[i].status = 'Returned';
              } else if (this.adhesives[i].status === 'I') {
                this.adhesives[i].status = 'Issued';
              }
            }
            this.adhesivesList = this.adhesives;
          }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  selectStock(event: any) {
    this.stockType = event.value;
    if (this.stockType === 'Ample') {
      this.isApple = true;
    } else {
      this.isApple = false;
    }
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
     if (this.partNo === '') {
        alert('Enter Part Number');
        return;
      } else if (this.partDescription === '') {
        alert('Enter Part Description');
        return;
      } else if (this.productModel === '') {
        alert('Enter Product Model');
        return;
      } else if (this.asnNo === '') {
        alert('Enter ERP ASN');
        return;
      } else {
        ampleInputs = true;
      }
    } else if (this.stockType === 'Apple') {
       if (this.partNo === '') {
        alert('Enter Part Number');
        return;
      } else if (this.partDescription === '') {
        alert('Enter Part Description');
        return;
      } else if (this.receivedDate === '') {
        alert('Select Delivery Date');
        return;
      } else if (this.asnNo === '') {
        alert('Enter ERP ASN');
        return;
      } else {
        appleInputs = true;
      }
    }

    if ((ampleInputs === true) || (appleInputs === true)) {
      let saveData;
      if (this.stockType === 'Apple') {
        this.receivedDate = this.datePipe.transform(this.dlDate, 'yyyy/MM/dd');
        saveData = '&stock_type=' + this.stockType + '&part_no=' + this.partNo + '&delivery_date=' + this.receivedDate + '&description=' + this.partDescription + '&product_model=' + this.productModel + '&serial_number=' + '';
      } else {
        saveData = '&stock_type=' + this.stockType + '&part_no=' + this.partNo +
       '&erp_asn=' + this.asnNo + '&description=' + this.partDescription + '&product_model=' + this.productModel + '&serial_number=' + '';
      }
        let result: any;
        this.dataService.addAdhesive(saveData)
          .subscribe({
            next: (data: any) => {
                result = data;
              if (result.status === true) {
                this.getAdhesives();
                this.reset();
              } else {
                this.simpleAlert = {title: 'Add Adhesive', msg: result.message};
                this.openModal(simple_alert_temp);
              }
            },
            error: (error: any) => this.error = error
    });
    } else {
    }
  }

  reset () {
    this.partNo = '';
    this.partDescription = '';
    this.stockType = '';
    this.category = '';
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
      for (let i = 0; i < this.adhesives.length; i++) {
        if (isNaN(word)) {
          searchedParts = _.filter(this.adhesives, row => row.blocked_ticket_id.toLowerCase().indexOf(word) > -1);
        } else {
          searchedParts = _.filter(this.adhesives, row => row.part_no.toLowerCase().indexOf(word) > -1);
        }
      }
      this.adhesives = searchedParts;
  } else {
    this.adhesives = this.adhesivesList;
  }
  }

  makeInactive(asnId: any, confirm_alert: TemplateRef<any>) {
    this.inactiveASNNo = asnId;
    this.openModal(confirm_alert);
  }

  confirm() {
    let result: any;
    if (this.inactiveRemarks === '') {
      this.remarksError = 'Enter the remarks';
    } else {
      this.dataService.inactiveAdhesives(this.inactiveASNNo, this.inactiveRemarks)
      .subscribe({
        next: (data: any) => {
            result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.getAdhesives();
          } else {
            this.modalService.dismissAll();
            alert(result.message);
          }
        },
        error: (error: any) => this.error = error
    });
    }
  }

  onFileUploadfun(event: any) {
    const today = new Date().toDateString();
    const docs: any = [];
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      this.imageTemp = event.target.files[0];
      reader.readAsDataURL(this.imageTemp);
      reader.onload = () => {
        this.selectedFile = reader.result;
        this.dcolor = false;
      };

      docs.push({
        file_name: this.imageTemp.name,
        extension: this.imageTemp.type.split('/')[1],
        date: today,
        file: this.selectedFile,
      });
      JSON.stringify(docs);
      console.log(docs);
    }

  }

  bulkUpload() {
    const today = new Date().toDateString();
    const docs: any = [];
    if (this.imageTemp.length !== 0) {
      docs.push({
        file_name: this.imageTemp.name,
        extension: this.imageTemp.type.split('/')[1],
        date: today,
        file: this.selectedFile,
      });
    } else {
      this.dcolor = true;
      return;
    }

    let result: any;
      this.dataService.bulkUpload(docs)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            alert(result.message);
            this.imageTemp = [];
            this.fileInputVariable.nativeElement.value = '';
            this.selectedFile = '';
            this.dcolor = false;
          } else {
            alert(result.message);
          }
      });
  }

  cancel() {
    this.selectedFile = '';
    this.dcolor = false;
  }

}
