import { Component } from '@angular/core';
import { EligibleTicketsDashboardService } from './eligible-tickets-dashboard.service';

@Component({
    selector: 'app-eligible-tickets-dashboard',
    templateUrl: './eligible-tickets-dashboard.component.html',
    styleUrls: ['./eligible-tickets-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class EligibleTicketsDashboardComponent {
  loading = true;
  date = '';
  preday = new Date().toISOString().split('T')[0];
  prevday = new Date();
  cityList: any;
  branchDatas: any;
  eligibleDatas: any = [];
  grandTotals: any;
  userRole: any;
  constructor(
    public dataService: EligibleTicketsDashboardService) {
    this.userRole = localStorage.getItem('userRole');
    this.prevday = new Date(this.prevday.setDate(this.prevday.getDate() - 1));
    this.preday = this.prevday.toISOString().split('T')[0];
    this.get2hrsPromiseData();
  }

  load() {
    if (this.date !== '') {
      this.preday = this.date;
      this.get2hrsPromiseData();
    }
  }

  get2hrsPromiseData() {
    let result: any;
    this.eligibleDatas = [];
    this.dataService.get2hrsPromiseData(this.preday)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.branchDatas = result.data;
            this.cityList = result.cities;
            this.grandTotals = result.grandTotal;
            for (let i = 0; i < this.cityList.length; i++) {
              this.eligibleDatas.push({
                cityName: this.cityList[i],
                branchData: this.branchDatas[i],
                rowspancount: +this.branchDatas[i].data.length + 2
              });
            }
          }
        });
  }

  clear() {
    this.date = '';
  }
}
