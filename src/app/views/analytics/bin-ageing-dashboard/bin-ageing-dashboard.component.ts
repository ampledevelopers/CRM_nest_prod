import { Component, Input, TemplateRef } from '@angular/core';
import { BinAgeingDashboardService } from './bin-ageing-dashboard.service' ;
import {ExcelService} from '../excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
    selector: 'app-bin-ageing-dashboard',
    templateUrl: './bin-ageing-dashboard.component.html',
    styleUrls: ['./bin-ageing-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class BinAgeingDashboardComponent {
  loading = true;
  error: any;
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  statusList: any = [];
  iPhoneList: any = [];
  oneBranchiPhoneList: any = [];
  macList: any = [];
  oneBranchMacList: any = [];
  ticketsList: any = [];
  notificationDetails: any = [];
  selectedStatus = '';
  isTicketList = true;
  isNotificationList = false;
  // isEmailList = false;
  selectedTicket = '';
  branch: any[] = [];
  countArray: any = [];
  headerArray: any = [];
  macHeaderArray: any = [];
  allBranches: any = [];
  allStatuses: any = [];
  macStatuses: any = [];
  finalData: any = [];
  countArrayMac: any = [];
  userRole: any;
  oneBranchAll: any = [];
  oneBranchMac: any = [];
  alliPhoneAgeingCounts: any = [];
  allMacAgeingCounts: any = [];
  allSVRAgeing: any = [];
  sitetypeId = localStorage.getItem('siteType');
  type = localStorage.getItem('product_type');
  constructor(
    public dataService: BinAgeingDashboardService, private modalService: NgbModal,
    private excelService: ExcelService)  {
      this.userRole = localStorage.getItem('userRole');
      this.getBinAgeingDashboard();
    }

    openModal(template: TemplateRef<any>) {
      this.modalService.open(template, { backdrop: 'static', keyboard: false });
    }

    cancelModel() {
      this.modalService.dismissAll();
      this.isTicketList = true;
    }

    getBinAgeingDashboard() {
      let result: any = [];
      console.log('getBinAgeingDashboard called', {
        userRole: this.userRole,
        sitetypeId: this.sitetypeId,
        type: this.type,
        userId: localStorage.getItem('userId'),
        siteType: localStorage.getItem('siteType'),
        nreportUrl: localStorage.getItem('nreportUrl'),
        reportsUrl: localStorage.getItem('reportsUrl')
      });
      this.dataService.getBinAgeingDashboard()
        .subscribe({next:
          (data: any) => {
            console.log('bin_ageing_dashboard component response', data);
            console.log('component data.all', data?.data?.all);
            console.log('component data.mac', data?.data?.mac);
            this.loading = false;
            result = data;
            this.iPhoneList = result.data.all;
            this.oneBranchiPhoneList = result.data.all;
            this.macList = result.data.mac;
            this.oneBranchMacList = result.data.mac;
            this.branch = result.data.branch;
            this.allBranches = result.data.branches || [];
            this.allBranches = this.allBranches.filter((branch: any) => {
              if (String(branch.branch_type || '') === 'D') {
                return false;
              }
              if (String(branch.drop_location_flag ?? '0') !== '0') {
                return false;
              }
              return true;
            });
            this.allStatuses = (result.data.statuses || []).filter((s: any) => s.status_name);
            this.macStatuses = (result.data.macstatuses || []).filter((s: any) => s.status_name);
            this.allSVRAgeing = this.oneBranchiPhoneList.svr_ageing || [];
            this.headerArray = [];
            this.macHeaderArray = [];
            console.log('allBranches after filter', this.allBranches.length, this.allBranches);
            for (let b = 0; b < this.allStatuses.length; b++) {
              this.headerArray.push({
                headName: 'Total',
              });
              this.headerArray.push({
                headName: 'Ageing',
              });
            }

            for (let d = 0; d < this.macStatuses.length; d++) {
              this.macHeaderArray.push({
                headName: 'Total',
              });
              this.macHeaderArray.push({
                headName: 'Ageing',
              });
            }


            if ((this.userRole !== '4')) {
                this.createAllArray();
              this.createMacArray();
              console.log('countArray rows', this.countArray.length, this.countArray);
            } else if ((this.userRole === '4')) {
              this.branchCountsAll();
              this.branchCountsMac();
            }
            }, // success path
          error: error => {
            console.error('bin_ageing_dashboard error', error);
            console.error('bin_ageing_dashboard error status', error?.status, error?.url, error?.message);
            this.error = error;
            this.loading = false;
          }
          });
    }

    branchCountsAll() {
      const ageingCounts: any[] = [];
      for (let c = 0; c < this.oneBranchiPhoneList.all_ageing.length; c++) {
        ageingCounts.push(this.oneBranchiPhoneList.all_ageing[c][0]);
      }
      this.oneBranchAll = this.oneBranchiPhoneList.allTotal.map((a: { status: any; }) => {
        const obj2 = ageingCounts.find((b) => a.status === b.status);
        if (obj2) {
          Object.assign(a, obj2);
        }
        return a;
       });
       for (let i = 0; i < this.oneBranchAll.length; i++) {
        if (!this.oneBranchAll[i].total_count) {
          this.oneBranchAll[i].total_count = '0';
        }
        if (!this.oneBranchAll[i].ageing_count) {
          this.oneBranchAll[i].ageing_count = '';
        }
       }

       for (let j = 0; j < this.allStatuses.length; j++) {
         for (let k = 0; k < this.oneBranchAll.length; k++) {
           if (this.allStatuses[j].id === this.oneBranchAll[k].status) {
             this.oneBranchAll[k].status_name = this.allStatuses[j].status_name;
           }
         }
       }
    }

    branchCountsMac() {
      const ageingCounts: any[] = [];
      for (let c = 0; c < this.oneBranchMacList.macAgeing.length; c++) {
        ageingCounts.push(this.oneBranchMacList.macAgeing[c][0]);
      }
      this.oneBranchMac = this.oneBranchMacList.macTotal.map((a: { status: any; }) => {
        const obj2 = ageingCounts.find((b) => a.status === b.status);
        if (obj2) {
          Object.assign(a, obj2);
        }
        return a;
       });

       for (let i = 0; i < this.oneBranchMac.length; i++) {
        if (!this.oneBranchMac[i].total_count) {
          this.oneBranchMac[i].total_count = '0';
        }
        if (!this.oneBranchMac[i].ageing_count) {
          this.oneBranchMac[i].ageing_count = '';
        }
       }

       for (let j = 0; j < this.macStatuses.length; j++) {
         for (let k = 0; k < this.oneBranchMac.length; k++) {
           if (this.macStatuses[j].id === this.oneBranchMac[k].status) {
             this.oneBranchMac[k].status_name = this.macStatuses[j].status_name;
           }
         }
       }
    }

    createAllArray() {
      let list: any = [];
      const branch: any = [];
      for (let i = 0; i < this.allBranches.length; i++) {
        list = [];
        for (let j = 0; j < this.allStatuses.length; j++) {
          list.push({
            count: '0',
            countColor: '#20a8d8',
            statusId: this.allStatuses[j].id,
            statusName: this.allStatuses[j].status_name,
          });
          list.push({
            count: '',
            countColor: 'red',
            statusId: this.allStatuses[j].id,
            statusName: this.allStatuses[j].status_name,
          });
        }
        branch.push({
          ship_to: this.allBranches[i].ship_to,
          branch_code: this.allBranches[i].branch_code,
          branch_id: this.allBranches[i].id,
          ageingCount: '',
          branchStatuses: list
        });
      }
      this.assignValuesAll(branch);
    }

    createMacArray() {
      let list1: any = [];
      const macbranch: any = [];
      for (let i = 0; i < this.allBranches.length; i++) {
        list1 = [];
        for (let j = 0; j < this.macStatuses.length; j++) {
          list1.push({
            count: '0',
            countColor: '#20a8d8',
            statusId: this.macStatuses[j].id,
            statusName: this.macStatuses[j].status_name,
          });
          list1.push({
            count: '',
            countColor: '#ff0000',
            statusId: this.macStatuses[j].id,
            statusName: this.macStatuses[j].status_name,
          });
        }
        macbranch.push({
          ship_to: this.allBranches[i].ship_to,
          branch_code: this.allBranches[i].branch_code,
          branch_id: this.allBranches[i].id,
          ageingCount: '',
          branchStatuses: list1
        });
      }
      this.assignValuesMac(macbranch);
    }

    assignValuesAll(branchDetails: any) {
      this.countArray = branchDetails;
      const totalCounts = this.iPhoneList.allTotal;
      const ageing = this.iPhoneList.all_ageing;
      const ageingCounts: any[] = [];
      const svrAgeingCounts: any[] = [];
      let ageingTotal = 0;
      let svrAgeingTotal = 0;
      for (let a = 0; a < ageing.length; a++) {
        ageingCounts.push(ageing[a][0]);
      }
      for (let a = 0; a < this.allSVRAgeing.length; a++) {
        svrAgeingCounts.push(this.allSVRAgeing[a][0]);
      }
      let selectedBranch: any = [];
      let statusCount: any = [];
      let ageingCount: any = [];
      let svgAgeingCount: any = [];
      for (let i = 0; i < this.countArray.length; i++) {
        selectedBranch = this.countArray[i].branchStatuses;
        statusCount = totalCounts.filter((item: { branch_id: any; }) => String(item.branch_id) === String(this.countArray[i].branch_id));
        ageingCount = ageingCounts.filter(item => String(item.branch_id) === String(this.countArray[i].branch_id));
        svgAgeingCount = svrAgeingCounts.filter(item => String(item.branch_id) === String(this.countArray[i].branch_id));
        ageingTotal = 0;
        svrAgeingTotal = 0;
        for (let k = 0; k < selectedBranch.length; k++) {
          for (let l = 0; l < statusCount.length; l++) {
            if (selectedBranch[k].statusName === statusCount[l].status_name) {
              if (k % 2 === 0) {
                selectedBranch[k].count = statusCount[l].total_count;
              }
            }
          }
          for (let j = 0; j < ageingCount.length; j++) {
            if (selectedBranch[k].statusName === ageingCount[j].status_name) {
              if (k % 2 === 1) {
                if (ageingCount[j].ageing_count !== '0') {
                  selectedBranch[k].count = ageingCount[j].ageing_count;
                  const acount = ageingCount[j].ageing_count;
                  if (j < (ageingCount.length - 1)) {
                  ageingTotal = ageingTotal + Number(acount);
                  }
                }
              }
            }
          }
          for (let j = 0; j < svgAgeingCount.length; j++) {
            if (selectedBranch[k].statusName === svgAgeingCount[j].status_name) {
              if (k % 2 === 1) {
                if (svgAgeingCount[j].svr_ageing_count !== '0') {
                  selectedBranch[k].svgcount = svgAgeingCount[j].svr_ageing_count;
                  const acount = selectedBranch[k].svgcount;
                  if (j < (svgAgeingCount.length - 1)) {
                  svrAgeingTotal = svrAgeingTotal + Number(acount);
                  }
                } else {
                  selectedBranch[k].svgcount = '0';
                }
              }
            }
          }
        }
        this.countArray[i].ageingCount = ageingTotal;
        this.countArray[i].svrAgeingCount = svrAgeingTotal;
        this.countArray[i].branchStatuses = selectedBranch;
      }
    }

    assignValuesMac(branchDetails: any) {
      this.countArrayMac = branchDetails;
      const totalMacCounts = this.macList.macTotal;
      const ageing = this.macList.macAgeing;
      const ageingMacCounts: any[] = [];
      let ageingTotal = 0;
      for (let a = 0; a < ageing.length; a++) {
        ageingMacCounts.push(ageing[a][0]);
      }
      let selectedMacBranch: any = [];
      let statusMacCount: any = [];
      let ageingMacCount: any = [];
      for (let i = 0; i < this.countArrayMac.length; i++) {
        selectedMacBranch = this.countArrayMac[i].branchStatuses;
        statusMacCount = totalMacCounts.filter((item: { branch_id: any; }) => String(item.branch_id) === String(this.countArrayMac[i].branch_id));
        ageingMacCount = ageingMacCounts.filter(item => String(item.branch_id) === String(this.countArrayMac[i].branch_id));
        ageingTotal = 0;
        for (let k = 0; k < selectedMacBranch.length; k++) {
          for (let l = 0; l < statusMacCount.length; l++) {
            if (selectedMacBranch[k].statusName === statusMacCount[l].status_name) {
              if (k % 2 === 0) {
                selectedMacBranch[k].count = statusMacCount[l].total_count;
              }
            }
          }
          for (let l = 0; l < ageingMacCount.length; l++) {
            if (selectedMacBranch[k].statusName === ageingMacCount[l].status_name) {
              if (k % 2 === 1) {
                if (ageingMacCount[l].ageing_count !== '0') {
                  selectedMacBranch[k].count = ageingMacCount[l].ageing_count;
                  const acount = ageingMacCount[l].ageing_count;
                  if (l < (ageingMacCount.length - 1)) {
                  ageingTotal = ageingTotal + Number(acount);
                  }
                }
              }
            }
          }
        }
        this.countArrayMac[i].ageingCount = ageingTotal;
        this.countArrayMac[i].branchStatuses = selectedMacBranch;
      }
    }

    ageingTicketList(family: any, type: any, statusId: any, ticket_list_temp: TemplateRef<any>, index: number, branchId: any, statusName: any) {
      this.selectedStatus = statusName;
      let countType = '';
      let result: any = [];
      let countListSms: any = [];
      let countListMail: any = [];
      let countListCall: any = [];
      if (index % 2 === 0) {
        countType = 'SC' ;
      } else {
        countType = 'AC' ;
      }
      this.dataService.getAgeingTicketList(family, type, statusId, countType, branchId)
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
          error: error => this.error = error // error path
    });
    }

}
