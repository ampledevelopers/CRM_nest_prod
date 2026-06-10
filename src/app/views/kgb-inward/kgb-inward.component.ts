import { Component, TemplateRef } from '@angular/core';
import { KgbInwardService } from './kgb-inward.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatePipe, formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface KgbInputs {
  kbb_slno: any;
  kgb_slno: any;
  deliveryNo: any;
  deliveryDate: any;
  erpAsn: any;
  kgb_airway: any;
  tote_id: any;
}

@Component({
    selector: 'app-kgb-inward',
    templateUrl: './kgb-inward.component.html',
    styleUrls: ['./kgb-inward.component.scss', '../../../scss/customstyle.css', '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
    standalone: false
})
export class KgbInwardComponent {
  public error: any;
  loading = true;
  buttonSpin = false;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  reportHeader = '';
  alert = '';
  data: any = [];
  kgb_details: any = '';
  kgbSave: any = '';
  datePipe = new DatePipe('en-US');
  kgbInput: KgbInputs = {
    kbb_slno: '',
    kgb_slno: '',
    deliveryNo: '',
    deliveryDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    erpAsn: '',
    kgb_airway: '',
    tote_id: ''
  };
  repair_partid = '';
  asnType = '';
  ticketId = '';
  notfilled = false;
  partDescription = '';
  constructor(
    public dataService: KgbInwardService, private modalService: NgbModal) {
    this.getAwaitingSparesTickets();
  }

  getAwaitingSparesTickets() {
    let result;
    this.dataService.getAwaitingSparesTickets()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && result.data.length !== 0) {
            this.buttonSpin = false;
            this.data = result.data;
            /* for (let i = 0; i < result.data.length; i++) {
              if ((result.data[i].kgb_status === 'n') || (result.data[i].kgb_status === 'N') || (result.data[i].kgb_status === null)) {
                this.data.push(result.data[i]);
              }
            } */
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getAsnType(asn: any) {
    let result;
    this.dataService.getAsnType(asn)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.asnType = result.items[0].stock_type;
            this.kgbInput.erpAsn = result.items[0].erp_asn;
          } else {
            alert(result.message);
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getKgbDetails(asn: any, ticket_id: any, repair_partId: any, description: any, kgb_details_temp: TemplateRef<any>) {
    this.getAsnType(asn);
    this.buttonSpin = true;
    this.ticketId = ticket_id;
    this.repair_partid = repair_partId;
    this.partDescription = description,
      this.kgbInput.kbb_slno = '';
    this.kgbInput.kgb_slno = '';
    this.openModal(kgb_details_temp);
  }

  updateKgbRepair(ticket_id: any, repair_part_id: any) {
    this.buttonSpin = true;
    let result;
    this.dataService.updateGsxRepair(ticket_id, repair_part_id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getAwaitingSparesTickets();
          } else {
            alert(result.message);
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.kgbInput = {
      kbb_slno: '',
      kgb_slno: '',
      deliveryNo: '',
      deliveryDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      erpAsn: '',
      kgb_airway: '',
      tote_id: '',
    };
    this.partDescription = '';
  }

  saveKgbDetails(kgbInput: any) {
    const re = /\//gi;
    kgbInput.deliveryDate = kgbInput.deliveryDate.replace(re, '-');

    let saveData;
    if (this.asnType === 'Apple') {
      if ((kgbInput.kgb_slno !== '') && (kgbInput.kbb_slno !== '') && (kgbInput.deliveryNo !== '') && (kgbInput.deliveryDate !== '') && (kgbInput.kgb_airway !== '') && (kgbInput.tote_id !== '')) {
        saveData = '&ticket_id=' + this.ticketId + '&serialized=' + '' + '&stock_type=' + this.asnType + '&delivery_no=' + kgbInput.deliveryNo + '&part_no=' + this.repair_partid +
          '&kgb_serial_no=' + kgbInput.kgb_slno + '&kbb_serial_no=' + kgbInput.kbb_slno + '&delivery_date=' + kgbInput.deliveryDate + '&awb_no=' + kgbInput.kgb_airway + '&description=' + this.partDescription + '&tote_id=' +
          this.kgbInput.tote_id;
      } else {
        this.notfilled = true;
      }
    } else { // Ample
      if ((kgbInput.kgb_slno !== '') && (kgbInput.kbb_slno !== '') && (kgbInput.deliveryDate !== '') && (kgbInput.kgb_airway !== '') && (kgbInput.tote_id !== '')) {
        saveData = '&ticket_id=' + this.ticketId + '&serialized=' + '' + '&stock_type=' + this.asnType + '&part_no=' + this.repair_partid +
          '&kgb_serial_no=' + kgbInput.kgb_slno + '&kbb_serial_no=' + kgbInput.kbb_slno + '&erp_asn=' + kgbInput.erpAsn + '&awb_no=' + kgbInput.kgb_airway + '&description=' + this.partDescription + '&tote_id=' +
          this.kgbInput.tote_id + '&delivery_date=' + kgbInput.deliveryDate;
      } else {
        this.notfilled = true;
      }
    }
    let result;
    this.buttonSpin = true;
    this.dataService.saveConsignment(saveData)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.getAwaitingSparesTickets();
          } else {
            alert(result.message);
          }
          this.buttonSpin = false;
        }, // success path
        error: (error: any) => {
          this.error = error;
          this.buttonSpin = false;
        }
      });
  }

}
