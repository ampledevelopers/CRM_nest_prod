import { DLBinAgeingService } from './dl-bin-ageing.service';
import { Component, TemplateRef } from '@angular/core';
import { ExcelService } from '../excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dl-bin-ageing',
    templateUrl: './dl-bin-ageing.component.html',
    styleUrls: ['./dl-bin-ageing.component.scss', '../bin-ageing-dashboard/bin-ageing-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class DLBinAgeingComponent {
    loading = true;
    dataSource: any[] = [];
    displayedColumns: string[] = [];
    allData: any;
    branches: any[] = [];
    statuses: any = [];
    allTotal: any;
    allAgeing: any;
    error: any;
    count: any;
  ticketsList: any;
  selectedStatus: any;
  finalData: any = [];
  isNotificationList = false;
  isTicketList = true;
  selectedTicket = '';
  notificationDetails: any = [];

    constructor(private dataService: DLBinAgeingService, private modalService: NgbModal,private excelService: ExcelService) {
      this.getBinAgeingDashboard();
    }

    getBinAgeingDashboard() {
      this.dataService.getBinAgeingDashboard()
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            this.allData = data.data;
            this.count = data.data.all;
            this.branches = data.data.branches;
            this.statuses = data.data.status;
            for (let j = 1; j <= this.statuses.length; j++) {
              let number = j;
              this.statuses[j - 1].status_name =
                'Bin' + number + '-' + this.statuses[j - 1].status_name;
            }
            this.initializeData();
          },
          error: (error: any) => {
            this.loading = false;
            this.error = error;
          }
        });
    }

    initializeData() {
      this.finalData = [];
      for (let i = 0; i < this.allData.branches.length; i++) {
          this.finalData[i] = {
              branch_id: this.allData.branches[i].branch_id,
              shipTo: this.allData.branches[i].ship_to,
              branchCode: this.allData.branches[i].branch_code,
              statuses: [],
              total: ''
          };
          let totalCount = 0;
          for (let j = 0; j < this.allData.status.length; j++) {
              const statusObject = {
                  status: this.allData.status[j].status_id,
                  count: 0,
                  status_name: this.allData.status[j].status_name
              };
              const filteredTickets = this.allData.all.filter((ticket: any) => {
                  return (
                      ticket.dl_branch_code === this.allData.branches[i].branch_code &&
                      ticket.status === this.allData.status[j].status_id
                  );
              });
              if (filteredTickets.length > 0) {
                  statusObject.count = filteredTickets.reduce(
                      (sum: number, ticket: any) => sum + parseInt(ticket.total_count, 10),
                      0
                  );

              }
              this.finalData[i].statuses.push(statusObject);
              totalCount = totalCount+statusObject.count;
          }
          this.finalData[i].total = totalCount;
      }
      console.log(this.finalData);
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.isTicketList = true;
  }

    ageingTicketList(statusId: any, branchCode: any, ticket_list_temp: TemplateRef<any>, statusName: any) {
      this.selectedStatus = statusName;
      let countType = '';
      let result: any = [];
      let countListSms: any = [];
      let countListMail: any = [];
      let countListCall: any = [];
      this.dataService.getAgeingTicketList(statusId, branchCode)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.ticketsList = result.data;
              countListSms = result.smsCount ;
              countListMail = result.mailCount ;
              countListCall = result.callCount ;
              for (let i = 0; i < this.ticketsList.length; i++) {
                for (let j = 0; j < countListSms.length; j++) {
                  if (countListSms[j].ticket === this.ticketsList[i].ticket_id) {
                    this.ticketsList[i].smsCount = countListSms[j].sms_count;
                  }
                }
                for (let k = 0; k < countListMail.length; k++) {
                  if(countListMail[k].ticket_id === this.ticketsList[i].ticket_id) {
                    this.ticketsList[i].mailCount = countListMail[k].mail_count;
                  }
                }
                for (let l = 0; l < countListCall.length; l++) {
                  if (countListCall[l].ticket_id === this.ticketsList[i].ticket_id) {
                    this.ticketsList[i].callCount = countListCall[l].call_count;
                  }
                }
              }
              this.openModal(ticket_list_temp);
            }
          }, // success path
          error: error => this.error = error // error path
    });
    }

    openModal(template: TemplateRef<any>) {
      this.modalService.open(template, { backdrop: 'static', keyboard: false });
    }

    back() {
      this.isTicketList = true;
      this.isNotificationList = false;
    }

    export() {
      this.exportAsXLSX();
    }

    exportAsXLSX(): void {
      this.excelService.exportAsExcelFile(this.ticketsList, this.selectedStatus);
    }

    getNotificationDetail(notificationType: any, ticketId: any) {
      this.selectedTicket = ticketId;
      let result: any = [];
      this.dataService.getTicketsNotificationDetails(notificationType, ticketId)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true && result.data.length > 0) {
              this.notificationDetails = result.data;
              this.isNotificationList = true ;
              this.isTicketList = false ;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
    });
    }

  }
