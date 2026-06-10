import { Component, TemplateRef, OnInit } from '@angular/core';
import { SearchDashboardService } from './search-dashboard.service';
/* import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'; */
//import * as _ from 'lodash';
import { Router } from '@angular/router';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { ModalService, ModalModule } from '@coreui/angular-pro';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-search-dashboard',
    templateUrl: './search-dashboard.component.html',
    styleUrls: ['./search-dashboard.component.scss', '../../../scss/customstyle.css'],
    providers: [NgbModalConfig, NgbModal],
    standalone: false
})

export class SearchDashboardComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  error: any;
  userRole: any= '';
  branchCode: any = '';
  ticketId: any = '';
  gNumber: any = '';
  serialNumber: any = '';
  phoneNumber: any = '';
  email: any = '';
  customerName: any = '';
  buttonSpin = false;
  //modalRef!: BsModalRef;
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  ticketSearch: any = '';
  data: any = [];
  isTickets: any = false;
  analysisList: any = [];
  isAnalysis: any = '';
  isTechLic: any = false;
  openBtn = true;
  siteType: any;
  dlType = localStorage.getItem('dlType');
  constructor(config: NgbModalConfig, private modalService: NgbModal, public dataService: SearchDashboardService, private router: Router) {
    this.dtTrigger.next({});

    config.backdrop = 'static';
    config.keyboard = false;
    this.userRole = localStorage.getItem('userRole');
    this.branchCode = localStorage.getItem('branchCode');
    if ((this.userRole === '4') || (this.userRole === '18')) {
      this.isTechLic = true;
    } else {
      this.isTechLic = false;
    }

  }

  openModal(templat: TemplateRef<any>) {
      /* this.modalRef =  */
      this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  search(simple_alert_temp: TemplateRef<any>) {
    this.isTickets = false;
    this.buttonSpin = true;
    let result;
    if ((this.customerName.length >= 3) || (this.customerName.length === 0)) {
      this.dataService.getData(this.gNumber, this.serialNumber, this.ticketId, this.phoneNumber, this.email, this.customerName)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              this.data = result.tickets;
              this.isTickets = true;
            } else {
              this.buttonSpin = false;
              this.simpleAlert = {title: 'Search Ticket', msg: result.message};
              this.openModal(simple_alert_temp);
            }
        }, // success path
        error: error => this.error = error // error path
    });
    } else {
      this.simpleAlert = {title: 'Search Ticket', msg: 'Customer name should enter atleast 3 characters'};
      this.openModal(simple_alert_temp);
      this.buttonSpin = false;
    }
  }

  searchTicket(event: { keyCode: number; }, simple_alert_temp: TemplateRef<any>) {
   /*  if (this.isTickets) {
      this.ngOnDestroy();
    } */
    if ((event.keyCode === 13)) {
      if ((this.customerName.length >= 3) || (this.customerName.length === 0)) {
      this.isTickets = false;
      this.buttonSpin = true;
      let result;
      this.dataService.getData(this.gNumber, this.serialNumber, this.ticketId, this.phoneNumber, this.email, this.customerName)
        .subscribe({
          next: (data: any) => {
              result = data;
              // this.dtTrigger.next({});
              if (result.status === true) {
                this.buttonSpin = false;
                this.data = result.tickets;
                this.isTickets = true;
                this.openBtn = true;
              } else {
                this.buttonSpin = false;
                this.simpleAlert = {title: 'Search Ticket', msg: result.message};
                this.openModal(simple_alert_temp);
              }
          }, // success path
          error: error => this.error = error // error path
      });
      } else {
        this.simpleAlert = {title: 'Search Ticket', msg: 'Customer name should enter atleast 3 characters'};
        this.openModal(simple_alert_temp);
        this.buttonSpin = false;
      }
    }
  }

  selectTicket(ticketId: any, branchCode: any, siteType?: any, dlBranchCode?: any) {
    if (this.isTechLic === true) {
      if (this.branchCode === branchCode || (this.branchCode === dlBranchCode && this.dlType === 'Imagine')) {
        this.openBtn = true;
        this.openTicket(ticketId, siteType);
      } else {
        this.openBtn = false;
      }
    } else {
      this.openTicket(ticketId, siteType);
    }
  }

  openTicket(ticketId: string, siteType?: any) {
    if (localStorage.getItem('id') === ticketId) {
      alert(`This ticket is currently active on another page`);
    } else {
      localStorage.setItem('id', ticketId);
    if(siteType === '3') {
      this.router.navigate(['win-dashboard/ticket']);
    } else {
      this.router.navigate(['dashboard/ticket']);
    }
      // this.router.navigateByUrl('/dashboard/ticket');
    }
  }

  selectRaf(ticketId: any) {
    this.buttonSpin = true;
    for (let ticket of this.data) {
      if ((ticket.id === ticketId) && (ticket.enquiry_flag === 'N')) {
        const tab: any = window.open();
        this.dataService.viewRaf(ticketId)
          .subscribe(
            (data: Blob | MediaSource) => {
              this.buttonSpin = false;
              const fileUrl = URL.createObjectURL(data);
              tab.location.href = fileUrl;
            });
      } else {
        alert('RAF not created for this ticket');
        this.buttonSpin = false;
      }
    }


  }

  selectAnalysis(ticketId: any, analysis_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let result: any;
    this.dataService.getAnalysis(ticketId)
      .subscribe(
        (data) => {
          result = data;
          this.dtTrigger.next({});
          if (result.status === true) {
            this.analysisList = result.analysis;
            this.isAnalysis = '';
            this.openModal(analysis_temp);
          } else {
            this.isAnalysis = result.message;
            this.openModal(analysis_temp);
          }
          this.buttonSpin = false;

    });
  }

  selectSVC(ticketId: any) {
    const tab: any = window.open();
    this.dataService.showSVC(ticketId)
    .subscribe(
      (      data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
      });
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      lengthMenu : [5, 10, 25],
      processing: true
    };
  }
}

