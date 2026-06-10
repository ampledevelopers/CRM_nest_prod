import { Component } from '@angular/core';
import { CsatPeriodReportService } from './csat-period-report.service';

@Component({
    selector: 'app-csat-period-report',
    templateUrl: './csat-period-report.component.html',
    styleUrls: ['./csat-period-report.component.scss', '../../../../../scss/customstyle.css'],
    standalone: false
})

export class CsatPeriodReportComponent {
  financialYear: any = '';
  pervFinancialYear: any = '';
  month: any = 'Select Month';
  prevMonth: any = 'Select Month';
  week: any = '';
  prevWeek: any = '';
  months: any = [];
  prevMonths: any = [];
  csatDataLoad = false;
  disSatCount: any;
  neutralCount: any;
  satisfiedCount: any;
  totalCount: any;
  monthData: any = [];
  weekAllData: any = [];
  carryInData: any = [];
  mailInData: any = [];
  prevMonthData: any = [];
  prevWeekData: any = [];
  prevCarryInData: any = [];
  prevMailInData: any = [];
  loading = false;

  constructor(public dataService: CsatPeriodReportService) {
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
    if (this.financialYear !== '' && this.month !== 'Select Month' && this.week !== ''
      && this.pervFinancialYear !== '' && this.prevMonth !== 'Select Month' && this.prevWeek !== '') {
      this.loading = true;
      let result: any = [];
      let monthData: any = [];
      let weekData: any = [];
      let carryInData: any = [];
      let mailInData: any = [];
      let prevMonthData: any = [];
      let prevWeekData: any = [];
      let prevCarryInData: any = [];
      let prevMailInData: any = [];
      this.dataService.getCsatData(this.financialYear, this.month, this.week, this.pervFinancialYear,
        this.prevMonth, this.prevWeek)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status = true) {
              this.loading = false;
              this.csatDataLoad = true;
              monthData = result.data.month_count;
              weekData = result.data.week_count;
              carryInData = result.data.carry_in;
              mailInData = result.data.mail_in;

              prevMonthData = result.prev_data.month_count;
              prevWeekData = result.prev_data.week_count;
              prevCarryInData = result.prev_data.carry_in;
              prevMailInData = result.prev_data.mail_in;

              this.assigningData(monthData, 'monthData');
              this.assigningData(weekData, 'weekData');
              this.assigningData(carryInData, 'carryInData');
              this.assigningData(mailInData, 'mailInData');

              this.assigningData(prevMonthData, 'prevMonthData');
              this.assigningData(prevWeekData, 'prevWeekData');
              this.assigningData(prevCarryInData, 'prevCarryInData');
              this.assigningData(prevMailInData, 'prevMailInData');

            } else {
              this.loading = false;
              alert('No data available');
            }
          }
        })
    } else {
      this.loading = false;
      alert('Select all mandatory fields')
    }
  }

  assigningData(assignData: any, type: any) {
    this.disSatCount = '';
    this.neutralCount = '';
    this.satisfiedCount = '';
    this.totalCount = '';

    for (let i = 0; i < assignData.length; i++) {
      if (assignData[i].satisfaction_scale === 'Satisfied') {
        this.satisfiedCount = assignData[i].count;
      } else if (assignData[i].satisfaction_scale === 'Dissatisfied') {
        this.disSatCount = assignData[i].count;
      } else if (assignData[i].satisfaction_scale === 'Neutral') {
        this.neutralCount = assignData[i].count;
      }
    }
    this.totalCount = +(this.satisfiedCount) + +(this.disSatCount) + +(this.neutralCount);
    let satisfiedPercentage: any = Math.round((this.satisfiedCount) / (this.totalCount) * 100);
    isNaN(satisfiedPercentage) ? satisfiedPercentage = '' : satisfiedPercentage = satisfiedPercentage + '%';
    let dissSatPercentage: any = Math.round((this.disSatCount) / (this.totalCount) * 100);
    isNaN(dissSatPercentage) ? dissSatPercentage = '' : dissSatPercentage = dissSatPercentage + '%';
    let neutralPercentage: any = Math.round((this.neutralCount) / (this.totalCount) * 100);
    isNaN(neutralPercentage) ? neutralPercentage = '' : neutralPercentage = neutralPercentage + '%';

    let array: any = [];
    array.push({
      satisfiedPercentage: satisfiedPercentage,
      dissSatPercentage: dissSatPercentage,
      neutralPercentage: neutralPercentage,
      satisfiedCount: this.satisfiedCount,
      disSatCount: this.disSatCount,
      neutralCount: this.neutralCount,
      totalCount: this.totalCount
    });

    if (type === 'monthData') {
      this.monthData = array[0];
    } else if (type === 'weekData') {
      this.weekAllData = array[0];
    } else if (type === 'carryInData') {
      this.carryInData = array[0];
    } else if (type === 'mailInData') {
      this.mailInData = array[0];
    } else if (type === 'prevMonthData') {
      this.prevMonthData = array[0];
    } else if (type === 'prevWeekData') {
      this.prevWeekData = array[0];
    } else if (type === 'prevCarryInData') {
      this.prevCarryInData = array[0];
    } else if (type === 'prevMailInData') {
      this.prevMailInData = array[0];
    }
  }
}


