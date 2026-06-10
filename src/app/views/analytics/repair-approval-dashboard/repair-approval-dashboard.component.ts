import { Component } from '@angular/core';
import { RepairApprovalDashboardService } from './repair-approval-dashboard.service';

@Component({
    selector: 'app-repair-approval-dashboard',
    templateUrl: './repair-approval-dashboard.component.html',
    styleUrls: ['./repair-approval-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class RepairApprovalDashboardComponent {
  fromDate: any = '';
  months: any = [];
  toDate: any = '';
  loading = false;
  l2Data: any = [];
  branchList: any = [];
  branches: any = [];
  approverData: any = [];
  l2DataTemp: any = [];
  TotalBranchwise: any = [];
  TotalApproverwise: any = [];
  selfApprovals: any = [];
  approvals: any = [];
  showTable = false;
  grandTotal: any = 0;
  locationApprovalTemp: any = [];
  approvers: any = [];
  totalSelf: any = 0;
  grandTot: any = 0;
  selfTotalPer: any = 0;
  othersTotalPer: any = 0;
  totalOthers: any = 0;

  constructor(public dataService: RepairApprovalDashboardService) {
    this.months = [
      { value: 'Select Month', name: 'Select Month' },
      { value: '1', name: 'January' },
      { value: '2', name: 'February' },
      { value: '3', name: 'March' },
      { value: '4', name: 'April' },
      { value: '5', name: 'May' },
      { value: '6', name: 'June' },
      { value: '7', name: 'July' },
      { value: '8', name: 'August' },
      { value: '9', name: 'September' },
      { value: '10', name: 'October' },
      { value: '11', name: 'November' },
      { value: '12', name: 'December' },
    ]
    // self approval branches
    this.selfApprovals = [
      { value: 'Dinesh Prasad', userId: '964', branch: ['SGM', 'SMH', 'SCD','SNB'] },
      { value: 'Neenu George', userId: '2893', branch: ['SCK', 'SWS', 'SHC', 'SCO','SLM'] },
      { value: 'Sunny Rajputs', userId: '3111', branch: ['SDG', 'SVD'] },
      { value: 'Ashwini', userId: '591', branch: ['SMA', 'SUD', 'SMK','SEB','SOM'] },
      // { value: 'Shaheena', userId: '662', branch: ['SNB', 'SEB'] },
      { value: 'Hemamalini N', userId: '1240', branch: ['STC','SPV','SBA'] },
    ]

    this.getBranches();
  }

  load() {
    this.l2DataTemp = [];
    this.TotalApproverwise = [];
    this.TotalBranchwise = [];
    this.approverData = [];
    this.l2Data = [];
    this.branches = [];
    this.locationApprovalTemp = [];
    this.grandTotal = 0;
    this.grandTot = 0;
    this.selfTotalPer = 0;
    this.othersTotalPer = 0;
    this.totalOthers = 0;
    this.totalSelf = 0;
    this.approvers = [];
    if (this.fromDate !== '' && this.toDate !== 'Select Month') {
      this.getL2Data();
    } else {
      this.showTable = false
      alert('Please Fill all Mandatory Fields');
    }
  }

  getL2Data() {
    this.loading = true;
    this.dataService.getL2Data(this.fromDate, this.toDate)
      .subscribe({
        next: (datas: any) => {
          this.l2Data = datas.data;
          if (this.l2Data.length > 0) {
            for (let i = 0; i < this.l2Data.length; i++) {
              this.branches.push(this.l2Data[i].branch_code);
              this.approverData.push({ 'user_id': this.l2Data[i].user_id, 'user_name': this.l2Data[i].user_name });
            }
            this.branches = this.branches.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            });
            const key = 'user_id';
            this.approverData = [...new Map(this.approverData.map((item: { [x: string]: any; }) =>
              [item[key], item])).values()];
            for (let i = 0; i < this.branches.length; i++) {
              let count: any = 0;
              let TotalBranchwise: any = 0;
              let approverCount: number[] = [];
              this.TotalApproverwise = [];
              let branchCount: { count: any; isSelf: boolean; }[] = [];
              let isSelf = false;

              let branchDetails = this.branchList.filter((branchCode: any) => {
                return (branchCode.branch_code === this.branches[i])
              });
              if (branchDetails != 0) {
                for (let i = 0; i < this.approverData.length; i++) {
                  let approverList = this.l2Data.filter((data: any) => {
                    return ((data.user_id === this.approverData[i].user_id && data.branch_code === branchDetails[0].branch_code))
                  });
                  if (approverList.length > 0) {
                    count = 0;
                    isSelf = false;
                    for (let i = 0; i < approverList.length; i++) {
                      for (let j = 0; j < this.selfApprovals.length; j++) {
                        if (approverList[i].user_id === this.selfApprovals[j].userId) {
                          for (let k = 0; k <= this.selfApprovals[j].branch.length; k++) {
                            if (approverList[i].branch_code === this.selfApprovals[j].branch[k]) {
                              isSelf = true;
                            }
                          }
                        }
                      }
                      count = +count + +approverList[i].count;
                      TotalBranchwise = +TotalBranchwise + +count;
                    }
                    branchCount.push({ 'count': count, 'isSelf': isSelf });
                    isSelf = false;
                  } else {
                    branchCount.push({ 'count': 0, 'isSelf': isSelf });
                    isSelf = false;
                  }
                }
                for (let i = 0; i < this.approverData.length; i++) {
                  let approverList = this.l2Data.filter((data: any) => {
                    return ((data.user_id === this.approverData[i].user_id))
                  });
                  if (approverList.length > 0) {
                    count = 0;
                    for (let i = 0; i < approverList.length; i++) {
                      count = +count + +approverList[i].count;
                    }
                    approverCount.push(count);
                    this.TotalApproverwise.push(count);
                  } else {
                    approverCount.push(0);
                  }
                }
                let data: any = [];
                let finalObj = {};
                if (this.approverData[i] !== undefined && this.selfApprovals[i] !== undefined) {
                  let approvers = this.selfApprovals.filter((data: any) => {
                    return ((data.userId === this.approverData[i].user_id))
                  });
                  for (let i = 0; i < approvers.length; i++) {
                    Object.assign(finalObj, approvers[i]);
                  }
                  this.approvers.push(finalObj);
                }
                this.grandTotal = +this.grandTotal + +TotalBranchwise;
                this.TotalBranchwise.push(TotalBranchwise);
                this.l2DataTemp.push({
                  branchName: branchDetails[0].branch_name,
                  branchCode: branchDetails[0].branch_code,
                  branchCount: branchCount,
                  approverName: this.approverData[0].user_name,
                  approverId: this.approverData[0].user_id
                });
              }
            }
            this.showTable2();
            this.showTable = true;
            this.loading = false;
          } else {
            this.showTable = false;
            this.loading = false;
            alert('Data not available')
          }
        }
      })
  }

  showTable2() {
    let SelfValue: any = 0;
    let totalValue: any = 0;
    let selfCount: any = [];
    let othersCount: any = [];
    let totalCount: any = [];
    let selfPercentage: any = []
    let othersPercentage: any = [];
    let approverName: any = [];
    let approverID: any = [];
    let apprName: any = '';
    let apprID: any = '';

    /* selfDataCount */

    for (let i = 0; i < this.approvers.length; i++) {
      let approverData = this.l2Data.filter((data: any) => {
        return (data.user_id === this.approvers[i].userId)
      });
      SelfValue = 0;
      if (approverData.length !== 0) {
        for (let j = 0; j <= this.approvers[i].branch.length; j++) {
          let value = 0;
          let selfDataCount = approverData.filter((data: any) => {
            return (data.branch_code === this.approvers[i].branch[j])
          });
          value = 0;
          for (let k = 0; k < selfDataCount.length; k++) {
            value = +value + +selfDataCount[k].count;
            SelfValue = +SelfValue + +value;
          }
        }
        selfCount.push(SelfValue);
      }
    }

    /* othersDataCount */

    for (let i = 0; i < this.approvers.length; i++) {
      let approverData = this.l2Data.filter((data: any) => {
        return (data.user_id === this.approvers[i].userId)
      });
      let value = 0;
      if (approverData.length !== 0) {
        value = 0;
        let filteredArray = approverData.filter((ar: any) => !this.approvers[i].branch.find((rm: any) => (rm === ar.branch_code)))
        for (let j = 0; j < filteredArray.length; j++) {
          value = +value + +filteredArray[j].count;
        }
        othersCount.push(value);
      }
    }

    /* totalDataCount */

    for (let i = 0; i < this.approvers.length; i++) {
      let approverData = this.l2Data.filter((data: any) => {
        return (data.user_id === this.approvers[i].userId)
      });
      if (approverData.length !== 0) {
        totalValue = 0;
        apprName = '';
        apprID = '';
        for (let k = 0; k < approverData.length; k++) {
          totalValue = +totalValue + +approverData[k].count;
          apprName = approverData[k].user_name;
          apprID = approverData[k].user_id;
        }
        totalCount.push(totalValue);
        approverName.push(apprName);
        approverID.push(apprID);
      }
    }

    for (let i = 0; i < totalCount.length; i++) {
      this.totalSelf = +this.totalSelf + +selfCount[i];
      this.totalOthers = +this.totalOthers + +othersCount[i];
      this.grandTot = +this.grandTot + +totalCount[i];
      let selfPer: any = Math.round((selfCount[i]) / (totalCount[i]) * 100);
      isNaN(selfPer) ? selfPer = '0%' : selfPer = selfPer + '%';
      selfPercentage.push(selfPer);
      let othersPer: any = Math.round((othersCount[i]) / (totalCount[i]) * 100);
      isNaN(othersPer) ? othersPer = '0%' : othersPer = othersPer + '%';
      othersPercentage.push(othersPer);
      this.selfTotalPer = Math.round((this.totalSelf) / (this.grandTot) * 100);
      isNaN(this.selfTotalPer) ? this.selfTotalPer = '0%' : this.selfTotalPer = this.selfTotalPer + '%';
      this.othersTotalPer = Math.round((this.totalOthers) / (this.grandTot) * 100);
      isNaN(this.othersTotalPer) ? this.othersTotalPer = '0%' : this.othersTotalPer = this.othersTotalPer + '%';
    }

    this.locationApprovalTemp.push({
      approverName: approverName,
      approverID: approverID,
      selfCount: selfCount,
      othersCount: othersCount,
      totalCount: totalCount,
      selfPercentage: selfPercentage,
      othersPercentage: othersPercentage,
    })
    this.showTable = true;
    this.loading = false;
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.branchList = result.branch;
        }, // success path
        error: error => error = error // error path
      });
  }

}
