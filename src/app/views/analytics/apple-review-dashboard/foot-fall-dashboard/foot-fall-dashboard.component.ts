import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FootFallDashboardService } from './foot-fall-dashboard.service';
import {
  NgbDatepickerConfig,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { cibOpenCollective } from '@coreui/icons';

@Component({
    selector: 'app-foot-fall-dashboard',
    templateUrl: './foot-fall-dashboard.component.html',
    styleUrls: ['./foot-fall-dashboard.component.scss', '../../../../../scss/customstyle.css'],
    standalone: false
})

export class FootFallDashboardComponent {

  branchesTemp: any = [];
  branches: any = [];
  entireData: any = [];
  totLastWeekData: any = 0;
  loading = false;
  showFootfallTable = false;
  showRafTable = false;
  datePipe = new DatePipe('en-US');
  fromDate: any = new Date();
  toDate: any = new Date();
  period: any = '';
  monthStart: any;
  monthEnd: any;
  year: any = '';
  minDay: any;
  maxDay: any;
  reportType: any = '';
  week: any = '';
  appleCalenderJson: any = [];
  date: any = new Date();
  noOfWeeks: any;
  showFifthWeek = false;
  currentTitle: any;
  previousTitle: any;
  days: any = [];
  totalPresentData: any = 0;
  day1Total: any = 0;
  day2Total: any = 0;
  day3Total: any = 0;
  day4Total: any = 0;
  day5Total: any = 0;
  day6Total: any = 0;
  day7Total: any = 0;
  totalFootfall: any = 0;
  totalServiceToken: any = 0;
  totalDeliveryToken: any = 0;
  totalRafData: any = 0;
  totalConversionRate: any = 0;
  showNoData = false;

  constructor(public dataService: FootFallDashboardService, private config: NgbDatepickerConfig, private calendar: NgbCalendar) {
    this.getBranches();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.branchesTemp = result.branch;
          }
          for (let i = 0; i < this.branchesTemp.length; i++) {
            this.branches.push({
              branchName: this.branchesTemp[i].label.replace('iCare ', ''),
              branchCode: this.branchesTemp[i].branch_code
            });
          }
          // this.branches = this.branches.sort(function (a: any, b: any) { return a.branchName > b.branchName });
          this.branches = this.branches.sort(function (a: any, b: any) {
            if (a.branchName > b.branchName) {
                return 1;
            } else if (a.branchName < b.branchName) {
                return -1;
            } else {
                return 0;
            }
        });
        }, // success path
        error: error => error // error path
      });
  }

  onSelectYear() {// change here next year
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
    this.showFootfallTable = false;
    this.showRafTable = false;
    this.showNoData = false;
    this.totalPresentData = 0;
    this.day1Total = 0;
    this.day2Total = 0;
    this.day3Total = 0;
    this.day4Total = 0;
    this.day5Total = 0;
    this.day6Total = 0;
    this.day7Total = 0;
    this.totalFootfall = 0;
    this.totalServiceToken = 0;
    this.totalDeliveryToken = 0;
    this.totalRafData = 0;
    this.totalConversionRate = 0;
    this.totLastWeekData = 0;
    this.days = [];
    if (this.year === '') {
      alert('Please select the Year');
      return;
    } else if (this.period === '') {
      alert('Please select Period');
      return;
    } else if (this.reportType === '') {
      alert('Please select the Report type');
      return;
    } else {
      this.loading = true;
      let p = Number(this.period);
      let w = Number(this.week);
      this.currentTitle = 'P' + this.period + 'W' + this.week;
      this.previousTitle = 'P' + (w !== 1 ? p : p === 1 ? 12 : p - 1) + 'W' + (w !== 1 ? w - 1 : this.checkWeek(p - 1) ? '5' : '4');
let calenderData = this.appleCalenderJson.filter((date: any) => {
  return date.period === p && date.week === w && date.year === this.year;
      });
      this.fromDate = calenderData[0].startDate;
      this.toDate = calenderData[0].endDate;
      console.log('calenderData:', calenderData);
console.log('fromDate:', this.fromDate, 'toDate:', this.toDate);
      if (this.reportType === 'footFall') {
        this.footFallReport();
      } else {
        this.rafConversionReport();
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

  footFallReport() {
    let result;
    this.dataService.getFootFallData(this.fromDate, this.toDate)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (result.last_week.length !== 0 && result.week_token_total.length !== 0 && result.week_token.length !== 0) {
              for (let i = 0; i < this.branches.length; i++) {
                let previousData = result.last_week.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branches[i].branchCode
                });
                let presentData = result.week_token_total.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branches[i].branchCode
                });
                let days: any = []
                for (let i = 0; i < result.week_token.length; i++) {
                  days.push(result.week_token[i].date);
                }
                days = days.filter(function (elem: any, index: any, self: string | any[]) {
                  return index === self.indexOf(elem);
                })
                // this.days = days.sort(function (a: any, b: any) { return a > b });
                this.days = days.sort((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));

                // if (previousData[0] !== undefined && presentData[0] !== undefined) {
                  let preData = '0';
                  let currentData = '0';
                  if(previousData[0]) {
                    preData = previousData[0].footfall;
                  }
                  if (presentData[0]){
                    currentData = presentData[0].footfall;
                  }
                  this.entireData.push({
                    branch: this.branches[i].branchName,
                    lastWeekData: preData,
                    presentData: currentData,
                    day1: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[0]),
                    day2: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[1]),
                    day3: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[2]),
                    day4: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[3]),
                    day5: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[4]),
                    day6: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[5]),
                    day7: this.filterFunction(result.week_token, this.branches[i].branchCode, this.days[6])
                  })
                  this.totLastWeekData = +this.totLastWeekData + +preData;
                  this.totalPresentData = +this.totalPresentData + +currentData;
                  this.day1Total = +this.day1Total + +this.entireData[i].day1;
                  this.day2Total = +this.day2Total + +this.entireData[i].day2;
                  this.day3Total = +this.day3Total + +this.entireData[i].day3;
                  this.day4Total = +this.day4Total + +this.entireData[i].day4;
                  this.day5Total = +this.day5Total + +this.entireData[i].day5;
                  this.day6Total = +this.day6Total + +this.entireData[i].day6;
                  this.day7Total = +this.day7Total + +this.entireData[i].day7;
               /*  } else {
                  this.entireData.push({
                    branch: this.branches[i].branchName,
                    lastWeekData: '0',
                    presentData: '0',
                  })
                } */
              }
              this.loading = false;
              this.showFootfallTable = true;
            }
            else {
              this.loading = false;
              this.showNoData = true;
            }
          }
        }, // success path
        error: error => error // error path
      });

  }

  filterFunction(filterArray: any, branch: any, date: any) {
    let array: any = filterArray.filter((data: any) => {
      return (data.branch_code === branch && data.date === date)
    })
    if (array[0] !== undefined) {
      return array[0].footfall;
    } return 0;
  }

  rafConversionReport() {
    let result;
    this.dataService.getRafConversionData(this.fromDate, this.toDate, this.period, this.week)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (result.footfall.length !== 0 && result.service_token.length !== 0 && result.delivery_token.length !== 0 && result.raf.length !== 0) {
              for (let i = 0; i < this.branches.length; i++) {
                let footfallData = result.footfall.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branches[i].branchCode
                });
                let serviceTokenData = result.service_token.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branches[i].branchCode
                });
                let deliveryTokenData = result.delivery_token.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branches[i].branchCode
                });
                let rafData = result.raf.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branches[i].branchCode
                });
                this.entireData.push({
                  branch: this.branches[i].branchName,
                  footfallData: (footfallData[0] === undefined ? 0 : footfallData[0].footfall),
                  serviceTokenData: (serviceTokenData[0] === undefined ? 0 : serviceTokenData[0].footfall),
                  deliveryTokenData: (deliveryTokenData[0] === undefined ? 0 : deliveryTokenData[0].footfall),
                  rafData: (rafData[0] === undefined ? 0 : rafData[0].raf),
                  conversionRate: (!isNaN((Math.round(((rafData[0] === undefined ? 0 : rafData[0].raf) / (serviceTokenData[0] === undefined ? 0 : serviceTokenData[0].footfall)) * 100))) ? (Math.round(((rafData[0] === undefined ? 0 : rafData[0].raf) / (serviceTokenData[0] === undefined ? 0 : serviceTokenData[0].footfall)) * 100)) : 0)
                })
                this.totalFootfall = +this.totalFootfall + +this.entireData[i].footfallData;
                this.totalServiceToken = +this.totalServiceToken + +this.entireData[i].serviceTokenData;
                this.totalDeliveryToken = +this.totalDeliveryToken + +this.entireData[i].deliveryTokenData;
                this.totalRafData = +this.totalRafData + +this.entireData[i].rafData;
              }
              this.totalConversionRate = Math.round((+this.totalRafData / +this.totalServiceToken) * 100);
              this.loading = false;
              this.showRafTable = true;
            }
            else {
              this.loading = false;
              this.showNoData = true;
            }
          }
        }, // success path
        error: (error: any) => error // error path
      });
  }
}
