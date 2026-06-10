import { Component } from '@angular/core';
import { TokenDashboardService} from './token-dashboard.service';

// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import {ExcelService} from '../excel.service';

@Component({
    selector: 'app-token-dashboard',
    templateUrl: './token-dashboard.component.html',
    styleUrls: ['./token-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class TokenDashboardComponent {
  loading = true;
  tokenData: any = [];
  fromDate = '';
  toDate = '';
  data: any = [];
  token_time_service: any = [];
  token_time_delivery: any = [];
  total_tokens: any = [];
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  showTable = false;
  isRecords = 0;
  reportHeader = '';
  alert = '';
  userRole: any;
  states: any = [];
  branches: any = [];
  constructor(public dataService: TokenDashboardService) {
    this.fromDate = new Date().toISOString().split('T')[0];
    this.toDate = new Date().toISOString().split('T')[0];
    this.userRole = localStorage.getItem('userRole');
    this.getTokenDashboard();
  }

  getTokenDashboard() {
    let result;
    let stateTemp: any = [];
    this.dataService.getTokenDashboard()
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.showTable = true;
            this.tokenData = result.data;
            this.total_tokens = result.total_token;
            for (let i = 0; i < this.tokenData.length; i++) {
              stateTemp.push(this.tokenData[i].state);
            }
            this.states = [...new Set(stateTemp)]
          }
          this.getTokenData();
        });
  }

  load() {
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.getTokenData();
    }
  }


  getTokenData() {
    let result;
    this.dataService.getTokenData(this.fromDate, this.toDate)
      .subscribe({ next:
        (data: any) => {
          result = data;
          if (result.status === true && (result.data.service_times.length > 0 || result.data.delivery_times.lenght > 0)) {
            this.token_time_service = result.data.service_times;
            this.token_time_delivery = result.data.delivery_times;
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
          this.reportHeader = result.header;
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
  });
  }
  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.ticketSearch = '';
  }

 filterBraches(state: any) {
  return this.tokenData
    .filter((branch: any) => branch.state === state)
    .sort((a: any, b: any) => a.drop_location_flag - b.drop_location_flag);
}

}
