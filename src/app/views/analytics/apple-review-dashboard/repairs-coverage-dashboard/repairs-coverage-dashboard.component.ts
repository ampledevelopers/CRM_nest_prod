import { Component } from '@angular/core';
import { RepairsCoverageDashboardService } from './repairs-coverage-dashboard.service';
import * as _ from 'lodash';
import {
  NgbDatepickerConfig,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-repairs-coverage-dashboard',
    templateUrl: './repairs-coverage-dashboard.component.html',
    styleUrls: ['./repairs-coverage-dashboard.component.scss', '../../../../../scss/customstyle.css'],
    standalone: false
})
export class RepairsCoverageDashboardComponent {
  repairType: any = '';
  year: any = '';
  period: any = '';
  week: any = '';
  datePipe = new DatePipe('en-US');
  fromDate: any = new Date();
  toDate: any = new Date();
  reportData: any = [];
  coverageDataTemp: any = [];
  branches: any = [];
  entireData: any = [];
  appleCalenderJson: any = [];
  date: any = new Date();
  noOfWeeks: any;
  showFifthWeek = false;
  showData = false;
  currentTitle: any;
  previousTitle: any;
  totalWarranty: any = 0;
  totalApp: any = 0;
  totalQuality: any = 0;
  totalRepeatService: any = 0;
  totalOow: any = 0;
  totalCustSat: any = 0;
  totalVariableWar: any = 0;
  grandTotal: any = 0;
  loading = false;
  reportType = null;
  dataTemp = [{ label: 'Mail-In Repair', value: 'Mail-In Repair Report' }, { label: 'Carry-In Repair', value: 'Carry-In Repair Report' },];

  constructor(public dataService: RepairsCoverageDashboardService, private config: NgbDatepickerConfig, private calendar: NgbCalendar) {
  }

  onSelectYear() {
    this.appleCalenderJson = [];
    if(this.year === '2023') {
    this.date = new Date(2022, 8, 18);
  }
  else if(this.year === '2024') {
    this.date = new Date(2023, 8, 24);
  }
  else if (this.year === '2025') {
    this.date = new Date(2024, 8, 29);
  }
  else if (this.year === '2026') {
    this.date = new Date(2025, 8, 22);  // add next year calendar first date
  }
    let firstDate = new Date(this.date);
    for (let i = 1; i <= 12; i++) {
      if (this.checkWeek(i)) {
        this.noOfWeeks = 5;
      } else {
        this.noOfWeeks = 4;
      }
      for (let j = 1; j <= this.noOfWeeks; j++) {
        this.date = firstDate.setDate(firstDate.getDate() + 7);
        let endDate: any = new Date(firstDate);
        let startDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        endDate = endDate.setDate(firstDate.getDate() + 6);
        endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
        this.appleCalenderJson.push({
          year: this.year,
          period: i,
          week: j,
          startDate: startDate,
          endDate: endDate
        })
      }
    }
  }

  onPeriodSelect() {
    let p = Number(this.period);
    if (this.checkWeek(p)) {
      this.showFifthWeek = true;
    } else {
      this.showFifthWeek = false;
    }
  }

  load() {
    this.entireData = [];
    this.reportData = [];
    this.totalWarranty = 0;
    this.totalApp = 0;
    this.totalQuality = 0;
    this.totalRepeatService = 0;
    this.totalOow = 0;
    this.totalCustSat = 0;
    this.totalVariableWar = 0;
    this.grandTotal = 0;
    this.showData = false;
    if (this.year === '') {
      alert('Please select Year');
      return;
    } else if (this.period === '') {
      alert('Please select Period');
      return;
    } else if (this.reportType === '') {
      alert('Please select the Report type');
      return;
    } else if (this.week === '') {
      alert('Please select Week');
      return;
    }
    else {
      this.loading = true;
      let p = Number(this.period);
      let w = Number(this.week);
      this.currentTitle = 'P' + this.period + 'W' + this.week;
      this.previousTitle = 'P' + (w !== 1 ? p : p === 1 ? 12 : p - 1) + 'W' + (w !== 1 ? w - 1 : this.checkWeek(p - 1) ? '5' : '4');
      let calenderData = this.appleCalenderJson.filter((date: any) => {
        return (date.period === p && date.week === w)
      });
      this.fromDate = calenderData[0].startDate;
      this.toDate = calenderData[0].endDate;
      if (this.reportType === 'Mail-In Repair Report') {
        this.repairType = 'WUMS';
        this.getRepairWarranty();
      } else if (this.reportType === 'Carry-In Repair Report') {
        this.repairType = 'CIN';
        this.getRepairWarranty();
      }
    }
  }

  checkWeek(p: any) { //change here Next Year
    if(this.year === '2023') {
      if (p === 1 || p === 3 || p === 4 || p === 7 || p === 10) {
        return true;
      } return false;
    } else if(this.year === '2024') {
      if (p === 1 || p === 4 || p === 7 || p === 10 ) {
        return true;
      } return false;
    } else if (this.year === '2025') {
      if (p === 1 || p === 4 || p === 7 || p === 10) {
      return true;
    } return false;
  } else if (this.year === '2026') {
      if (p === 1 || p === 4 || p === 5 || p === 7 || p === 10) {
      return true;
    } return false;
  }else return false;
  }

  getRepairWarranty() {
    this.loading = true;
    this.dataService.getRepairWarranty(this.fromDate, this.toDate, this.repairType)
      .subscribe({
        next: (data: any) => {
          if (data.status === true) {
            this.reportData = data.data;
            for (let i = 0; i < this.reportData.length; i++) {
              this.branches.push(this.reportData[i].branch_name)
            }

            this.branches = this.branches.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            })
            let warrantyData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'Apple Limited Warranty'
            });
            let appData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'AppleCare Protection Plan'
            });
            let qualityPrgData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'Quality Program'
            });
            let repeatServiceData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'Repeat Service'
            });
            let oowData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'Out Of Warranty (No Coverage)'
            });
            let custSatData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'Customer Satisfaction (CS) Code'
            });
            let variableWarData = this.reportData.filter((data: any) => {
              return data.coverage_status_description === 'Variable Warranty'
            });

            for (let i = 0; i < this.branches.length; i++) {
              let branchName = this.branches[i].replace('iCare ', '');
              let warrantyDataTemp = warrantyData.filter((data: any) => {
                return data.branch_name === this.branches[i]
              });
              let appDataTemp = appData.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let qualityPrgDataTemp = qualityPrgData.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let repeatServiceDataTemp = repeatServiceData.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let oowDataTemp = oowData.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let custSatDataTemp = custSatData.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let variableWarTemp = variableWarData.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              this.entireData.push({
                branch: branchName,
                warrantyDataTemp: warrantyDataTemp[0] === undefined ? 0 : warrantyDataTemp[0].count,
                appDataTemp: appDataTemp[0] === undefined ? 0 : appDataTemp[0].count,
                qualityPrgDataTemp: qualityPrgDataTemp[0] === undefined ? 0 : qualityPrgDataTemp[0].count,
                repeatServiceDataTemp: repeatServiceDataTemp[0] === undefined ? 0 : repeatServiceDataTemp[0].count,
                oowDataTemp: oowDataTemp[0] === undefined ? 0 : oowDataTemp[0].count,
                custSatDataTemp: custSatDataTemp[0] === undefined ? 0 : custSatDataTemp[0].count,
                variableWarTemp: variableWarTemp[0] === undefined ? 0 : variableWarTemp[0].count,
              })
              this.totalWarranty = +this.totalWarranty + +this.entireData[i].warrantyDataTemp;
              this.totalApp = +this.totalApp + +this.entireData[i].appDataTemp;
              this.totalQuality = +this.totalQuality + +this.entireData[i].qualityPrgDataTemp;
              this.totalRepeatService = +this.totalRepeatService + +this.entireData[i].repeatServiceDataTemp;
              this.totalOow = +this.totalOow + +this.entireData[i].oowDataTemp;
              this.totalCustSat = +this.totalCustSat + +this.entireData[i].custSatDataTemp;
              this.totalVariableWar = +this.totalVariableWar + +this.entireData[i].variableWarTemp;
              this.grandTotal = +this.totalWarranty + +this.totalApp + +this.totalQuality + +this.totalRepeatService + +this.totalOow + +this.totalCustSat + +this.totalVariableWar;
            }
            this.loading = false;
            this.showData = true;
          } else {
            alert('Data not Available');
          }
        }
      })
  }
}

