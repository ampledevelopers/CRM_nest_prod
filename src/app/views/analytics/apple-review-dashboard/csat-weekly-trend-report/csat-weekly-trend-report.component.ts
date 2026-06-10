import { Component } from '@angular/core';
import { CsatWeeklyTrendReportService } from './csat-weekly-trend-report.service';

@Component({
    selector: 'app-csat-weekly-trend-report',
    templateUrl: './csat-weekly-trend-report.component.html',
    styleUrls: ['./csat-weekly-trend-report.component.scss', '../../../../../scss/customstyle.css'],
    standalone: false
})

export class CsatWeeklyTrendReportComponent {
  year: any = '';
  month: any = '';
  week: any = '';
  financialYear: any = '';
  pervFinancialYear: any = '';
  finMonth: any = 'Select Month';
  prevMonth: any = 'Select Month';
  finWeek: any = '';
  prevWeek: any = '';
  months: any = [];
  prevMonths: any = [];
  csatDataLoad = false;
  disSatCount: any;
  neutralCount: any;
  satisfiedCount: any;
  totalCount: any;
  disatNeuCount: any;
  currentResult: any = [];
  prevResult: any = [];
  noCurrentData: any = '';
  noPrevData: any = '';
  monthData: any = [];
  weekData: any = [];
  prevMonthData: any = [];
  prevWeekData: any = [];
  prevMonthSatPer: any;
  currMonthSatPer: any;
  prevWeekSatPer: any;
  currWeekSatPer: any;
  currWeekSatCount: any;
  currWeekDisNeuCount: any;
  currWeektotSam: any;
  loading = false;
  branchName: any;
  branchCode: any = [];
  array: any[] = [];
  branchTemp: any = [];
  count: any;

  constructor(public dataService: CsatWeeklyTrendReportService) {
    this.months = [
      { value: 'Select Month', name: 'Select Month' },
      { value: 'P01', name: 'P01' },
      { value: 'P02', name: 'P02' },
      { value: 'P03', name: 'P03' },
      { value: 'P04', name: 'P04' },
      { value: 'P05', name: 'P05' },
      { value: 'P06', name: 'P06' },
      { value: 'P07', name: 'P07' },
      { value: 'P08', name: 'P08' },
      { value: 'P09', name: 'P09' },
      { value: 'P10', name: 'P10' },
      { value: 'P11', name: 'P11' },
      { value: 'P12', name: 'P12' },
    ]
    this.prevMonths = [
      { value: 'Select Month', name: 'Select Month' },
      { value: 'P01', name: 'P01' },
      { value: 'P02', name: 'P02' },
      { value: 'P03', name: 'P03' },
      { value: 'P04', name: 'P04' },
      { value: 'P05', name: 'P05' },
      { value: 'P06', name: 'P06' },
      { value: 'P07', name: 'P07' },
      { value: 'P08', name: 'P08' },
      { value: 'P09', name: 'P09' },
      { value: 'P10', name: 'P10' },
      { value: 'P11', name: 'P11' },
      { value: 'P12', name: 'P12' },
    ]
  }

  load() {
    this.noCurrentData = '';
    this.noPrevData = '';
    this.currentResult = [];
    this.prevResult = [];
    this.array = [];
    this.branchCode = [];
    this.branchTemp = [];
    this.monthData = [];
    this.weekData = [];
    this.prevMonthData = [];
    this.prevWeekData = [];
    this.count = 0;
    if (this.financialYear !== '' && this.finMonth !== 'Select Month' && this.finWeek !== ''
      && this.pervFinancialYear !== '' && this.prevMonth !== 'Select Month' && this.prevWeek !== '') {
      this.getData(this.financialYear, this.finMonth, this.finWeek, 'currentYear');
      this.getData(this.pervFinancialYear, this.prevMonth, this.prevWeek, 'prevYear')
    } else {
      alert('Select all mandatory fields')
    }
  }

  getData(year: any, month: any, week: any, set: any) {
    this.loading = true;
    this.dataService.CsatWeeklyData(year, month, week)
      .subscribe({
        next: (data: any) => {
          if (set === 'currentYear') {
            this.count = +this.count + +1;
            this.currentResult = data;
            this.monthData = this.currentResult.data.month_count;
            this.weekData = this.currentResult.data.week_count;
            for (let i = 0; i < this.monthData.length; i++) {
              this.branchTemp.push(this.monthData[i].branch_code)
            }
            this.branchCode = this.branchTemp.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            })
            if (this.monthData.length === 0 || this.weekData.length === 0) {
              this.noCurrentData = '1';
            } else {
              this.noCurrentData = '0';
            }
          } else if (set === 'prevYear') {
            this.count = +this.count + +1;
            this.prevResult = data;
            this.prevMonthData = this.prevResult.data.month_count;
            this.prevWeekData = this.prevResult.data.week_count;
            if (this.prevMonthData.length === 0 || this.prevWeekData.length === 0) {
              this.noPrevData = '1';
            } else {
              this.noPrevData = '0';
            }
          }
          if (this.count === 2) {
            if (this.noCurrentData === '0' && this.noPrevData === '0') {
              this.assigningData(this.monthData, 'monthData');
              this.assigningData(this.weekData, 'weekAllData');
              this.assigningData(this.prevMonthData, 'prevMonthData');
              this.assigningData(this.prevWeekData, 'prevWeekData');
              this.loading = false;
              this.csatDataLoad = true;
            } else {
              this.loading = false;
              this.csatDataLoad = false;
              alert('Data not available');
            }
          }
        }
      })
  }

  assigningData(assignData: any, type: any) {
    this.disSatCount = '';
    this.neutralCount = '';
    this.satisfiedCount = '';
    this.totalCount = '';
    this.branchName = '';
    if (assignData.length !== 0) {
      for (let i = 0; i < this.branchCode.length; i++) {
        let brachData = assignData.filter((data: any) => {
          return data.branch_code === this.branchCode[i];
        });
        if (brachData[0] !== undefined && brachData.length !== 0) {
          for (let i = 0; i < brachData.length; i++) {
            this.branchName = brachData[i].branch_name.replace('iCare ', '');
            if (brachData[i].satisfaction_scale === 'Satisfied') {
              this.satisfiedCount = brachData[i].count;
            }
            else if (brachData[i].satisfaction_scale === 'Dissatisfied') {
              this.disSatCount = brachData[i].count;
            } else if (brachData[i].satisfaction_scale === 'Neutral') {
              this.neutralCount = brachData[i].count;
            }
          }
          this.totalCount = +(this.satisfiedCount) + +(this.disSatCount) + +(this.neutralCount);
          this.disatNeuCount = +(this.disSatCount) + +(this.neutralCount);
          let satisfiedPercentage: any = Math.round((this.satisfiedCount) / (this.totalCount) * 100);
          isNaN(satisfiedPercentage) ? satisfiedPercentage = '' : satisfiedPercentage = satisfiedPercentage + '%';
          if (type === 'monthData') {
            this.array.push({
              branch: this.branchName,
            })
            this.array[i].currMonthSatPer = satisfiedPercentage;
          } else if (type === 'weekAllData') {
            this.array[i].currWeekSatPer = satisfiedPercentage;
            this.array[i].currWeekSatCount = this.satisfiedCount;
            this.array[i].currWeekDisNeuCount = this.disatNeuCount;
            this.array[i].currWeektotSam = this.totalCount;
          } else if (type === 'prevMonthData') {
            this.array[i].prevMonthSatPer = satisfiedPercentage;
          } else if (type === 'prevWeekData') {
            this.array[i].prevWeekSatPer = satisfiedPercentage;
          }
        } else if (brachData.length === 0) {
        }
      }
    }
  }

}



