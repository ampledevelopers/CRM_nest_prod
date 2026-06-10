import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, TemplateRef} from '@angular/core';
import { ChangeTicketStatusService } from './change-ticket-status.service';
import { AsyncLocalStorage } from 'async_hooks';

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
    selector: 'app-change-ticket-status',
    templateUrl: './change-ticket-status.component.html',
    styleUrls: ['./change-ticket-status.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class ChangeTicketStatusComponent {
  error: any;
  loading = true;
  bcolor = false;
  remarkcolor = false;
  statuses: any = [];
  status = 'Select Status';
  ticketId = '';
  remarks = '';
  dataTemp: any = [];
  data: any = [];
  buttonSpin = false;
  csError = '';
  isDetails = false;
  enableOptions = true;
  destination_status = '';
  source_status = '';
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  confirmAlert: ConfirmAlert = {id: '', title: '', msg: ''};
  diagnosisHd: any = [];
  gDriveData: any = [];
  isEligibleInward = false;
  siteType: any;
  errorMsg = '';
  constructor(public dataService: ChangeTicketStatusService,  private modalService: NgbModal) {
    this.getOptions();
    this.siteType = localStorage.getItem('siteType');
  }

  openModal(templat: TemplateRef<any>) {
   this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getOptions() {
    let result;
    this.dataService.getStatus()
      .subscribe({
        next: (data: any) => {
            result = data;
            this.statuses = result.status;
            this.loading = false;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  getDetails(event: { keyCode: number; }) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      if (this.ticketId !== '') {
        this.bcolor = false;
        let result;
        this.dataService.getDetail(this.ticketId)
          .subscribe({
            next: (data: any) => {
                result = data;
                if (result.status === true) {
                  this.data = result.tickets[0];
                  this.diagnosisHd = result.diagnosis[0].repair_hd[0];
                  if (this.siteType === this.data.site_type_id) {
                    this.isDetails = true;
                    this.enableOptions = false;
                  } else {
                    alert(`You don't have the access for change status. Please check the ticket id.`);
                  }
                } else {
                  this.isDetails = false;
                  this.csError = result.message;
                }
            }, // success path
            error: error => this.error = error // error path
      });
      } else {
        this.bcolor = true;
      }
    }
  }

  selectStatus(status: string) {
    this.destination_status = status;
  }

  changeStatus(confirm_alert_temp: TemplateRef<any>) {
    if (this.ticketId === '') {
      this.bcolor = true;
    }

    if (this.remarks === '') {
      this.remarkcolor = true;
    } else {
      this.remarkcolor = false;
    }

    if (this.status === 'Select Status') {
      this.csError = 'Select Status';
    } else {
      this.csError = '';
    }

    if ((this.destination_status === '1500') || (this.destination_status === '3000') || (this.destination_status === '8610')) {
      if ((this.diagnosisHd.repair_stage === 'L2-Approved') || (this.diagnosisHd.repair_stage === 'L2-Approved-Additional-Part')) {
        if (this.data.site_type_id === '1') {
          if (this.diagnosisHd.repair_type === 'WUMS') {
            this.getGDriveImages(this.ticketId);
          } else {
            this.isEligibleInward = true;
          }
        } else {
          if ((this.data.status_id === '8500') || (this.data.status_id === '8550')) {
            this.isEligibleInward = true;
          } else {
            this.isEligibleInward = false;
            alert('You cannot move the ticket status.');
          }
        }
      } else {
        alert('You cannot move the ticket status without L2 Approval');
        return;
      }
    } else if (this.destination_status === '1650') {
      if ((this.data.status_id !== '3500') && (this.data.status_id !== '3600') && (this.diagnosisHd.repair_type === 'SVNR')) {
        this.isEligibleInward = true;
      } else {
        this.isEligibleInward = false;
        this.errorMsg = `You can not move this status because repair type is ` + this.diagnosisHd.repair_type;
      }
    } else if ((this.data.status_id === '3500') || (this.data.status_id === '3600') || (this.data.status_id === '5600') || (this.data.status_id === '9050')) {
      this.isEligibleInward = false;
      this.errorMsg = `Tickets with the RFPU/Closed & Complete status cannot be changed`;
    } else if ((this.destination_status === '8350') && (this.data.status_id !== '8300')) {
      this.isEligibleInward = false;
      this.errorMsg = `You cannot move the ticket status without L1 Approval`;
    } else {
      this.isEligibleInward = true;
    }

    if (this.isEligibleInward === true) {
      if ((this.bcolor === false) && (this.csError === '') && (this.remarkcolor === false)) {
        const msg = 'Are you sure want to change the status?';
        this.confirmAlert = {id: 'ChangeStatus', title: 'Change Ticket Status', msg: msg};
        this.openModal(confirm_alert_temp);
      }
    } else {
      alert(this.errorMsg);
      return;
    }

  }

  confirmChangeStatus(id: any, simple_alert_temp: any) {
    this.modalService.dismissAll();
    let result;
    this.remarks = encodeURIComponent(this.remarks);
    const reqData = '&ticket_id=' + this.ticketId + '&destination_status=' + this.destination_status + '&source_status=' +
                    this.data.status_id + '&remarks=' + this.remarks;
    this.dataService.changeStatus(reqData)
      .subscribe({
        next:(data: any) => {
            result = data;
            if (result.status === true) {
              this.ticketId = '';
              this.isDetails = false;
              this.status = 'Select Status';
              this.remarks = '';
              this.simpleAlert = {title: 'Change Ticket Status', msg: result.message};
              this.openModal(simple_alert_temp);
            }

            if (result.status === false) {
              this.isDetails = false;
              this.simpleAlert = {title: 'Change Ticket Status', msg: result.message};
              this.openModal(simple_alert_temp);
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  getGDriveImages(ticketId: string) {
    let result: any;
    const RCOImages: any = [];
    this.dataService.getDriveFiles(ticketId)
    .subscribe({
      next: (data) => {
        result = data;
        if (result.status === true) {
          this.gDriveData = result.images;
          for (let i = 0; i < this.gDriveData.length; i++) {
            if (this.gDriveData[i].type === 'RCI') {
              RCOImages.push(this.gDriveData[i]);
            }
          }
          if (RCOImages.length >= 6) {
            this.isEligibleInward = true;
          } else {
            this.isEligibleInward = false;
            this.errorMsg = 'Please Upload the Images of Part Arrived';
          }
        }
    }});
  }

}
