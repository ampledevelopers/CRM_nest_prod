import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { CodeEditorsModule } from '../editors/code-editors/code-editors.module';
// import { exists } from 'fs';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss', '../../../scss/customstyle.css'],
    standalone: true,
    imports: [
      CommonModule,FormsModule,]
})
export class AnalyticsComponent implements OnInit {

  public companies: any = [];
  error: any;
  organization: any = 'Select Organization Name';
  compId: any;
  fromDate: any;
  toDate: any;
  isChart = false ;
  isCallType = false;
  compName: any;
  public xAxisLables = '';
  data: any;
  callType: any = [];
  series: any = [];
  xAxis: any = [];

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: any = [];
  barChartLabels1: any = [];
  barChartLabels4: any = [];
  seriesArr: any = [];
  dataArr: any = [];
  // barChartLabels4 = '';
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any = [];
  barChartData1: any = [];
  barChartData4: any = [];
  dataRes: any = [];

  constructor(
    public dataService: AnalyticsService
  ) {
    this.getCompanies();
  }

  ngOnInit() {
  }

  getCompanies() {
    let result;
    this.dataService.getCompanies()
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.companies = result.company;
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  companySelect(orgId: any) {
     this.compId = orgId;
    }

  load() {
    this.isChart = false;
    this.barChartLabels4 = [];
    this.barChartData4 = [];
    if (this.compId === '') {
      alert('Please select the organization');
      return;
    } else if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.isChart = true;
    for (let i = 0; i <= this.companies.length; i++) {
      if (this.companies[i].id === this.compId) {
        this.compName = this.companies[i].company_name;
        break;
      }
    }
      this.getCalltypeAnalytics();
       }
  }

  getCalltypeAnalytics() {
    // this.barChartLabels4 = '';
    let result;
    // let calltype;
    this.dataService.getCalltypeAnalytics(this.compId, this.fromDate, this.toDate)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true)  {
              this.callType = result.data;
              this.xAxis = result.xlabels;
              this.series = result.labels ;
              const months: any= { 'JANUARY' : 1, 'FEBRUARY' : 2, 'MARCH' : 3, 'APRIL' : 4, 'MAY' : 5, 'JUNE' : 6, 'JULY' : 7,
              'AUGUST' : 8, 'SEPTEMBER' : 9, 'OCTOBER' : 10, 'NOVEMBER' : 11, 'DECEMBER' : 12 } ;
              this.xAxis.sort((a: any, b: any) => months[a.month.toUpperCase()] - months[b.month.toUpperCase()]);

              let p1 = 0;
               for (let j = 0; j <= this.series.length - 1; j++) {
                const mergedseries = Object.values(this.series[j]);
              for (let i = 0; i <= this.xAxis.length - 1; i++) {
              const mergedarray = Object.values(this.xAxis[i]);
              for (let k = 0; k <= this.callType.length - 1; k++) {
                if (mergedseries == this.callType[k].CallType && mergedarray == this.callType[k].month) {
                  const mergedata = this.callType[k].count;
                  this.dataArr = this.dataArr.concat(mergedata);
                }
                }
              }
                const val = +p1 + (this.xAxis.length);
                  this.dataRes = this.dataArr.slice(p1, val);
                this.barChartData4.push({
                 data: this.dataRes,
                 label: mergedseries
                });
                p1 = +p1 + (this.xAxis.length);
              }

              for (let i = 0; i <= this.xAxis.length - 1; i++) {
              const mergedarray = Object.values(this.xAxis[i]);
              this.barChartLabels4 = this.barChartLabels4.concat(mergedarray);
              }
              // console.log(this.barChartData4);
              if ( this.barChartLabels4.lenght !== 0) {
                this.isCallType = true ;
              }
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  clear() {
    this.organization = 'Select Organization Name';
    this.fromDate = '';
    this.toDate = '';
    this.isChart = false;
    }
  // loadChart() {
  // // barChart Target
  // this.barChartType = 'bar';
  // this.barChartLegend = true;

  // // public barChartLabels: string[] = ['Ample Pending', 'Apple Pending', 'Closed', 'Customer Pending'];
  // this.barChartLabels = ['Jan-19', 'Feb-19', 'Mar-19', 'Apr-19', 'May-19'];
  // this.barChartData = [
  //   {data: [26, 19, 24, 25, 3], label: 'Warranty Closed'},
  //   {data: [0, 0, 3, 1, 3], label: 'Warranty Open'},
  //   ];

  //   this.barChartLabels1 = ['Jan-19', 'Feb-19', 'Mar-19'];
  // this.barChartData1 = [
  //   {data: [6, 3, 2], label: 'Hardware'},
  //   {data: [3, 2, 1], label: 'Software'},
  //   ];
  // }
}
