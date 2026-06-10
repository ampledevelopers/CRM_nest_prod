import { Component } from '@angular/core';
import { DayreportService } from './dayreport.service';

@Component({
    selector: 'app-dayreport',
    templateUrl: './dayreport.component.html',
    styleUrls: ['./dayreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class DayreportComponent {

  error: any;
  toDate = '';
  isChart = false;
  isCallType = false;
  public xAxisLables = '';
  data = '';
  callType: any = [];
  series: any = [];
  xAxis: any = [];

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels4: any = [];
  seriesArr: any = [];
  dataArr: any = [];
  // barChartLabels4 = '';
  barChartType = 'bar';
  barChartLegend = true;
  barChartData4: any = [];
  dataRes: any = [];

  constructor(
    public dataService: DayreportService
  ) {
    this.getDayreport();
  }
  getDayreport() {
    let result;
    this.dataService.getDayreport()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (result.data.lenght > 0) {
              this.isChart = true;
              this.callType = result.data;
              this.xAxis = result.xlabels;
              this.series = result.labels;

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
              if (this.barChartLabels4.lenght !== 0) {
                this.isCallType = true;
              }
            }
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

}
