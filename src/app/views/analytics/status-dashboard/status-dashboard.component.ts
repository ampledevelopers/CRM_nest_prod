import { Component, TemplateRef } from '@angular/core';
import { StatusDashboardService } from './status-dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
    selector: 'app-status-dashboard',
    templateUrl: './status-dashboard.component.html',
    styleUrls: ['./status-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class StatusDashboardComponent {
  loading = true;
  error: any;
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  statusList: any = [];
  iPhoneList: any = [];
  macList: any = [];
  dlIphoneList: any = [];
  dlMacList: any = [];
  othersList: any = [];
  dlOthersList: any = [];
  accessoriesList: any = [];
  ticketsList: any = [];
  selectedStatus = '';
  analysisList: any = [];
  isTicketList = true;
  selectedTicket = '';
  branchCode = 'All Branches';
  branch = 'All Branches';
  dlBranchPresent = false;
  nondlBranchPresent = false;
  branches: any = [];
  dlBranch: any = [];
  userRole: any;
  statusDataList: any = [];
  constructor(
    public dataService: StatusDashboardService, private modalService: NgbModal) {
    this.userRole = localStorage.getItem('userRole');
    this.getStausDashboard();
    this.getBranches();
  }

  openModal(template: any) {
    this.modalService.open(template, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.isTicketList = true;
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.branches = result.branch;
          for (let i = 0; i < this.branches.length; i++) {
            let list = this.branches.filter((data: any) => {
              return (data.parent_location_id !== '0')
            });
            this.dlBranch = list;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: string) {
    this.branchCode = event;
    const foundObject = this.dlBranch.find((obj: { branch_code: any; }) => obj.branch_code === this.branchCode);
    if (foundObject) {
      this.dlBranchPresent = true;
      this.nondlBranchPresent = false;
    } else {
      this.nondlBranchPresent = true;
      this.dlBranchPresent = false;
    }
  }

  getStausDashboard() {
    let result: any = [];
    this.dataService.getStatusDashboard(this.branchCode)
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          result = data;
          this.statusList = result.data.status;
          this.iPhoneList = result.data.iphone;
          this.macList = result.data.mac;
          this.dlIphoneList = result.data.dl_iphone;
          this.dlMacList = result.data.dl_mac;
          this.othersList = result.data.others;
          this.dlOthersList = result.data.dl_others;
          this.statusDataList = [];
          for (let i = 0; i < this.statusList.length; i++) {
            if (this.branchCode === 'All Branches') {
              if (this.statusList[i].id === this.iPhoneList[i].status) {
                this.statusDataList.push({
                  id: this.statusList[i].id,
                  status: this.statusList[i].status_name,
                  iPhoneCount: +this.iPhoneList[i].iphone_count + +this.dlIphoneList[i].iphone_count

                });
              } else {
                this.statusDataList.push({
                  id: this.statusList[i].id,
                  status: this.statusList[i].status_name,
                  iPhoneCount: +this.iPhoneList[i].iphone_count + +this.dlIphoneList[i].iphone_count
                });
              }
              if (this.statusList[i].id === this.macList[i].status || this.statusList[i].id === this.dlMacList[i].status) {
                this.statusDataList[i].macCount = +this.macList[i].mac_count + +this.dlMacList[i].mac_count;
              } else {
                this.statusDataList[i].macCount = +this.macList[i].mac_count + +this.dlMacList[i].mac_count;
              }
              if (this.statusList[i].id === this.othersList[i].status || this.statusList[i].id === this.dlOthersList[i].status) {
                this.statusDataList[i].othersCount = +this.othersList[i].others_count + +this.dlOthersList[i].others_count;
              } else {
                this.statusDataList[i].othersCount = +this.othersList[i].others_count + +this.dlOthersList[i].others_count;
              }
            } else if (this.branchCode !== 'All Branches') {
              if (this.dlBranchPresent === true) {
                if (this.statusList[i].id === this.iPhoneList[i].status) {
                  this.statusDataList.push({
                    id: this.statusList[i].id,
                    status: this.statusList[i].status_name,
                    iPhoneCount: this.dlIphoneList[i].iphone_count
                  });
                } else {
                  this.statusDataList.push({
                    id: this.statusList[i].id,
                    status: this.statusList[i].status_name,
                    iPhoneCount: this.dlIphoneList[i].iphone_count
                  });
                }

                if (this.statusList[i].id === this.dlMacList[i].status) {
                  this.statusDataList[i].macCount = this.dlMacList[i].mac_count;
                } else {
                  this.statusDataList[i].macCount = this.dlMacList[i].mac_count;
                }

                if (this.statusList[i].id === this.dlOthersList[i].status) {
                  this.statusDataList[i].othersCount = this.dlOthersList[i].others_count;
                } else {
                  this.statusDataList[i].othersCount = this.dlOthersList[i].others_count;
                }
              } else if (this.nondlBranchPresent === true) {
                if (this.statusList[i].id === this.iPhoneList[i].status) {
                  this.statusDataList.push({
                    id: this.statusList[i].id,
                    status: this.statusList[i].status_name,
                    iPhoneCount: this.iPhoneList[i].iphone_count

                  });
                } else {
                  this.statusDataList.push({
                    id: this.statusList[i].id,
                    status: this.statusList[i].status_name,
                    iPhoneCount: this.iPhoneList[i].iphone_count
                  });
                }

                if (this.statusList[i].id === this.macList[i].status) {
                  this.statusDataList[i].macCount = this.macList[i].mac_count;
                } else {
                  this.statusDataList[i].macCount = this.macList[i].mac_count;
                }

                if (this.statusList[i].id === this.othersList[i].status) {
                  this.statusDataList[i].othersCount = this.othersList[i].others_count;
                } else {
                  this.statusDataList[i].othersCount = this.othersList[i].others_count;
                }
              }
            }
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  ticketList(family: any, status: any, ticket_list_temp: TemplateRef<any>) {
    this.selectedStatus = status.status;
    let result: any = [];
    this.dataService.getTicketList(family, status.id, this.branchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (this.branchCode === 'All Branches') {
              this.ticketsList = result.data.nondl_tickets.concat(result.data.dl_tickets);
            } else if (this.branchCode !== 'All Branches') {
              if (this.dlBranchPresent === true) {
                this.ticketsList = result.data.dl_tickets;
              } else if (this.nondlBranchPresent === true) {
                this.ticketsList = result.data.nondl_tickets;
              }
            }
            this.openModal(ticket_list_temp);
          } else {
            alert('Data not Available');
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getAnalysis(ticket: { branch_code: any; id: any; }) {
    this.selectedTicket = ticket.branch_code + ticket.id;
    let result: any;
    this.isTicketList = false;
    this.dataService.timelineData(ticket.id)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.analysisList = result.timeline;
          } else {
            this.analysisList = [];
          }
        });
  }

  load() {
    this.getStausDashboard();
  }

  back() {
    this.isTicketList = true;
  }
}
