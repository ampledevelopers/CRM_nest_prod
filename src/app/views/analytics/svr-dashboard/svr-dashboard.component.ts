import { Component } from '@angular/core';
import { SvrDashboardService } from './svr-dashboard.service';

@Component({
    selector: 'app-svr-dashboard',
    templateUrl: './svr-dashboard.component.html',
    styleUrls: ['./svr-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class SvrDashboardComponent {
  loading = true;
  date = '';
  preday = new Date().toISOString().split('T')[0];
  prevday = new Date();
  cityList: any;
  branchDatas: any;
  colors: any = [];
  eligibleDatas: any = [];
  grandTotals: any;
  userRole: any;
  constructor(
    public dataService: SvrDashboardService) {
    this.userRole = localStorage.getItem('userRole');
    this.prevday = new Date(this.prevday.setDate(this.prevday.getDate() - 1));
    this.preday = this.prevday.toISOString().split('T')[0];
    this.getSvr2hrsData();
  }

  load() {
    if (this.date !== '') {
      this.preday = this.date;
      this.getSvr2hrsData();
    }
  }


  getSvr2hrsData() {
    let result: any;
    this.eligibleDatas = [];
    this.dataService.getSvr2hrsData(this.preday)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.branchDatas = result.data;
            this.cityList = result.cities;
            this.grandTotals = result.grandTotal;
            this.colors = ['bang', 'chennai', 'kerala', 'others'];
            for (let i = 0; i < this.cityList.length; i++) {
              this.eligibleDatas.push({
                cityName: this.cityList[i],
                branchData: this.branchDatas[i].branchWise,
                cityData: this.branchDatas[i].cityTotal,
                colors: this.colors[i],
                rowspancount: +this.branchDatas[i].branchWise.length + 2
              });
            }

          }
        });
  }

  clear() {
    this.date = '';
  }

}
