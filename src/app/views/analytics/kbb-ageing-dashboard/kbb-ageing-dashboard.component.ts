import { Component, TemplateRef } from '@angular/core';
import { KbbAgeingDashboardService } from './kbb-ageing-dashboard.service';
import { ExcelService } from '../excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-kbb-ageing-dashboard',
    templateUrl: './kbb-ageing-dashboard.component.html',
    styleUrls: ['./kbb-ageing-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class KbbAgeingDashboardComponent {
  loading = true;
  error: any;
  date = '';
  preday = new Date().toISOString().split('T')[0];
  prevday = new Date();
  branchDatas: any;
  ticketsList: any = [];
  colors: any = [];
  eligibleDatas: any = [];
  grandTotals: any;
  isTicketList = true;
  userRole: any;
  constructor(
    public dataService: KbbAgeingDashboardService, private modalService: NgbModal,
    private excelService: ExcelService) {
    this.userRole = localStorage.getItem('userRole');
    this.prevday = new Date(this.prevday.setDate(this.prevday.getDate()));
    this.preday = this.prevday.toISOString().split('T')[0];
    this.getKbbAgeingData();
  }

  openModal(template: any) {
    this.modalService.open(template, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.isTicketList = true;
  }


  load() {
    if (this.date !== '') {
      this.preday = this.date;
      this.getKbbAgeingData();
    }
  }

  getKbbAgeingData() {
    let result: any;
    this.eligibleDatas = [];
    this.dataService.getKbbAgeingData(this.preday)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.branchDatas = result.data;
            this.grandTotals = result.totals;
            for (let i = 0; i < this.branchDatas.length; i++) {
              this.eligibleDatas.push({
                branch_id: this.branchDatas[i].branch_id,
                branchCode: this.branchDatas[i].branch_code,
                rfpu_20Days: this.branchDatas[i].rfpu_20Days,
                dd_1week: this.branchDatas[i].dd_1week,
                dd_2week: this.branchDatas[i].dd_2week,
                dd_20days: this.branchDatas[i].dd_20days,
                total: this.branchDatas[i].total
              });
            }

          }
        });
  }

  kbbPendingList(type: any, days: any, statusId: any, ticket_list_temp: TemplateRef<any>, branchId: any) {
    let result: any = [];
    this.dataService.getKbbPendingList(type, days, this.preday, statusId, branchId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.ticketsList = result.data;
            this.openModal(ticket_list_temp);
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }
  clear() {
    this.date = '';
  }

  export() {
    this.exportAsXLSX();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.ticketsList, this.date);
  }

  back() {
    this.isTicketList = true;
  }
}
