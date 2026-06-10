import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootFallDashboardService {

  rootUrl = localStorage.getItem('reportsUrl');
  bireqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) {
   }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
  }

  getFootFallData(fromDate: any, toDate: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate ;
    return this.http.get(this.rootUrl + 'api/analytics/location_footfalls?' + form, {headers : this.reqHeader});
  }

  getRafConversionData(fromDate: any, toDate: any, period: any, week: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&month=' + 'P'+period + '&week=' + 'W'+week;
    return this.http.get(this.rootUrl + 'api/analytics/raf_conversion_rate?' + form, {headers : this.reqHeader});
  }
}
