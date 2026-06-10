import { Component, TemplateRef } from '@angular/core';
import { CustomerCareService } from './customer-care.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface SimpleAlert {
  title: any;
  msg: any;
}

export interface ConfirmAlert {
  id: any;
  title: any;
  msg: any;
}

@Component({
    selector: 'app-customer-care',
    templateUrl: './customer-care.component.html',
    styleUrls: ['./customer-care.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class CustomerCareComponent {
  p: number[] = [];
  public error: any;
  loading = true;
  buttonSpin = false;
  ticketSearch: any = '';
  isEnquiry = false;
  data: any = [];
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  confirmAlert: ConfirmAlert = {id: '', title: '', msg: ''};
  callStatuses = [
    {label: 'Call Initiated', value: 'C'},
    {label: 'Awaiting Customer Update', value: 'U'},
    {label: 'Call Ended', value: 'E'}
  ];
  callStatus = '';
  selectedStatus = '';
  selectedcall = '';
  callTypes = [
    {label: 'Service', value: 'S'},
    {label: 'Retail', value: 'R'}
  ];
  subTypes = [
    {label: 'Esculation', value: 'E'},
    {label: 'Service Status Update', value: 'U'},
    {label: 'Sales', value: 'S'},
    {label: 'Enquiry', value: 'Q'}
  ];
  constructor(public dataService: CustomerCareService, private modalService: NgbModal, ) {
    console.log( "cc");
    this.getEnquiries();
  }

  openModal(templat: any) {
   this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.getEnquiries();
  }

  getEnquiries() {
    let result;
    this.dataService.getEnquiries()
     .subscribe(
      (data: any) => {
        result = data;
          if (result.status === true) {
            this.isEnquiry = true;
            this.data = result.enquiry;
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].enquiry_category === 'S') {
                this.data[i].enquiry_category = 'Service';
              } else {
                this.data[i].enquiry_category = 'Retail';
              }

              for (let j = 0; j < this.subTypes.length; j++) {
                if (this.data[i].enquiry_type === this.subTypes[j].value) {
                  this.data[i].enquiry_type = this.subTypes[j].label;
                }
              }

              for (let k = 0; k < this.callStatuses.length; k++) {
                if (this.data[i].status === this.callStatuses[k].value) {
                  this.data[i].status = this.callStatuses[k].label;
                }
              }
            }
            this.loading = false;
          }
          }
     );
  }

  selectCallStatus(event: any, eId: any, confirmAlert: TemplateRef<any>) {
    this.selectedStatus = event;
    for (let i = 0; i < this.callStatuses.length; i++) {
      if (this.selectedStatus === this.callStatuses[i].label) {
        this.selectedcall = this.callStatuses[i].value;
      }
    }
    this.confirmAlert = {id: eId, title: 'Update Enquiry', msg: 'Are you sure want to update its Status?'};
    this.openModal(confirmAlert);
  }

  confirmUpdate(eId: any, simpleAlert: TemplateRef<any>) {
    let result;
    this.dataService.updateEnquiry(this.selectedcall, eId)
     .subscribe(
      (data: any) => {
        result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.simpleAlert = {title: 'Update Enquiry', msg: 'Updated Successfully'};
            this.openModal(simpleAlert);
          } else {
            this.modalService.dismissAll();
            this.simpleAlert = {title: 'Update Enquiry', msg: result.message};
            this.openModal(simpleAlert);
          }
        }
     );
  }

}
