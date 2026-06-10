import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, TemplateRef } from '@angular/core';
import { SvrNonsvrAgeingDashboardService } from './svr-nonsvr-ageing-dashboard.service';
import { ExcelService } from '../excel.service';

export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
    selector: 'app-svr-nonsvr-ageing-dashboard',
    templateUrl: './svr-nonsvr-ageing-dashboard.component.html',
    styleUrls: ['./svr-nonsvr-ageing-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class SvrNonsvrAgeingDashboardComponent {
  loading = true;
  error: any;
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  statusList: any = [];
  iPhoneList: any = [];
  oneBranchiPhoneList: any = [];
  macList: any = [];
  oneBranchMacList: any = [];
  ticketsList: any = [];
  selectedStatus = '';
  isTicketList = true;
  selectedTicket = '';
  branch = '';
  countArray: any = [];
  headerArray: any = [];
  allBranches: any = [];
  allStatuses: any = [];
  finalData: any = [];
  countArrayMac: any = [];
  userRole: any;
  oneBranchAll: any = [];
  oneBranchMac: any = [];
  alliPhoneAgeingCounts: any = [];
  allMacAgeingCounts: any = [];
  allSVRAgeing: any = [];
  // location= localStorage.getItem('userId');

  constructor(
    public dataService: SvrNonsvrAgeingDashboardService, private modalService: NgbModal,
    private excelService: ExcelService) {
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
    this.dataService.getSvrNonsvrAgeingDashboard()
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          result = data;
          this.iPhoneList = result.data.all;
          this.oneBranchiPhoneList = result.data.all;
          this.macList = result.data.mac;
          this.oneBranchMacList = result.data.mac;
          this.branch = result.data.branch;
          this.allBranches = result.data.branches;
          this.allStatuses = result.data.statuses;
          this.allSVRAgeing = this.oneBranchiPhoneList.svr_ageing;
          // this.alliPhoneAgeingCounts = this.iPhoneList.allTotalAgeing;
          // this.allMacAgeingCounts = this.macList.macTotalAgeing;
          for (let b = 0; b < this.allStatuses.length; b++) {
            this.headerArray.push({
              headName: 'Total',
            });
            this.headerArray.push({
              headName: 'Ageing',
            });
          }

          if ((this.userRole !== '4')) {
            this.createAllArray();
            // this.createMacArray();
          } else if ((this.userRole === '4')) {
            this.branchCountsAll();
            // this.branchCountsMac();
          }
        }, // success path
        error: error => this.error = error // error path
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

  // branchCountsMac() {
  //   const ageingCounts = [];
  //   for (let c = 0; c < this.oneBranchMacList.macAgeing.length; c++) {
  //     ageingCounts.push(this.oneBranchMacList.macAgeing[c][0]);
  //   }
  //   this.oneBranchMac = this.oneBranchMacList.macTotal.map((a) => {
  //     const obj2 = ageingCounts.find((b) => a.status === b.status);
  //     if (obj2) {
  //       Object.assign(a, obj2);
  //     }
  //     return a;
  //    });

  //    for (let i = 0; i < this.oneBranchMac.length; i++) {
  //     if (!this.oneBranchMac[i].total_count) {
  //       this.oneBranchMac[i].total_count = '0';
  //     }
  //     if (!this.oneBranchMac[i].ageing_count) {
  //       this.oneBranchMac[i].ageing_count = '';
  //     }
  //    }

  //    for (let j = 0; j < this.allStatuses.length; j++) {
  //      for (let k = 0; k < this.oneBranchMac.length; k++) {
  //        if (this.allStatuses[j].id === this.oneBranchMac[k].status) {
  //          this.oneBranchMac[k].status_name = this.allStatuses[j].status_name;
  //        }
  //      }
  //    }
  // }

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
          countColor: '#8A2BE2',
          statusId: this.allStatuses[j].id,
          statusName: this.allStatuses[j].status_name,
        });
        /* list.push({
          count: '',
          countColor: '#8A2BE2',
          statusId: this.allStatuses[j].id,
          statusName: this.allStatuses[j].status_name,
        }); */
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

  // createMacArray() {
  //   let list1: any = [];
  //   const macbranch: any = [];
  //   for (let i = 0; i < this.allBranches.length; i++) {
  //     list1 = [];
  //     for (let j = 0; j < this.allStatuses.length; j++) {
  //       list1.push({
  //         count: '0',
  //         countColor: '#20a8d8',
  //         statusId: this.allStatuses[j].id,
  //         statusName: this.allStatuses[j].status_name,
  //       });
  //       list1.push({
  //         count: '',
  //         countColor: '#ff0000',
  //         statusId: this.allStatuses[j].id,
  //         statusName: this.allStatuses[j].status_name,
  //       });
  //     }
  //     macbranch.push({
  //       ship_to: this.allBranches[i].ship_to,
  //       branch_code: this.allBranches[i].branch_code,
  //       branch_id: this.allBranches[i].id,
  //       ageingCount: '',
  //       branchStatuses: list1
  //     });
  //   }
  //   this.assignValuesMac(macbranch);
  // }

  assignValuesAll(branchDetails: any) {
    this.countArray = branchDetails;
    const totalCounts = this.iPhoneList.allTotal;
    const ageing = this.iPhoneList.all_ageing;
    const ageingCounts = [];
    const svrAgeingCounts = [];
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
      statusCount = totalCounts.filter((item: { branch_id: any; }) => item.branch_id === this.countArray[i].branch_id);
      ageingCount = ageingCounts.filter(item => item.branch_id === this.countArray[i].branch_id);
      svgAgeingCount = svrAgeingCounts.filter(item => item.branch_id === this.countArray[i].branch_id);
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
                ageingTotal = ageingTotal + Number(acount);
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
                svrAgeingTotal = svrAgeingTotal + Number(acount);
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

  // assignValuesMac(branchDetails) {
  //   this.countArrayMac = branchDetails;
  //   const totalMacCounts = this.macList.macTotal;
  //   const ageing = this.macList.macAgeing;
  //   const ageingMacCounts = [];
  //   let ageingTotal = 0;
  //   for (let a = 0; a < ageing.length; a++) {
  //     ageingMacCounts.push(ageing[a][0]);
  //   }
  //   let selectedMacBranch: any = [];
  //   let statusMacCount: any = [];
  //   let ageingMacCount: any = [];
  //   for (let i = 0; i < this.countArrayMac.length; i++) {
  //     selectedMacBranch = this.countArrayMac[i].branchStatuses;
  //     statusMacCount = totalMacCounts.filter(item => item.branch_id === this.countArrayMac[i].branch_id);
  //     ageingMacCount = ageingMacCounts.filter(item => item.branch_id === this.countArrayMac[i].branch_id);
  //     ageingTotal = 0;
  //     for (let k = 0; k < selectedMacBranch.length; k++) {
  //       for (let l = 0; l < statusMacCount.length; l++) {
  //         if (selectedMacBranch[k].statusName === statusMacCount[l].status_name) {
  //           if (k % 2 === 0) {
  //             selectedMacBranch[k].count = statusMacCount[l].total_count;
  //           }
  //         }
  //       }
  //       for (let l = 0; l < ageingMacCount.length; l++) {
  //         if (selectedMacBranch[k].statusName === ageingMacCount[l].status_name) {
  //           if (k % 2 === 1) {
  //             if (ageingMacCount[l].ageing_count !== '0') {
  //               selectedMacBranch[k].count = ageingMacCount[l].ageing_count;
  //               const acount = ageingMacCount[l].ageing_count;
  //               ageingTotal = ageingTotal + Number(acount);
  //             }
  //           }
  //         }
  //       }
  //     }
  //     this.countArrayMac[i].ageingCount = ageingTotal;
  //     this.countArrayMac[i].branchStatuses = selectedMacBranch;
  //   }
  // }

  svrAgeingTicketList(family: any, statusId: any, ticket_list_temp: TemplateRef<any>, branchId: any) {
    for (let i = 0; i < this.allStatuses.length; i++) {
      if (this.allStatuses[i].id === statusId) {
        this.selectedStatus = this.allStatuses[i].status_name;
      }
    };
    let result: any = [];
    this.dataService.getSvrAgeingTicketList(family, statusId, branchId)
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

  back() {
    this.isTicketList = true;
  }

  export() {
    this.exportAsXLSX();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.ticketsList, this.selectedStatus);
  }
}

