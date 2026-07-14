import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootFallDashboardService {

  rootUrl = localStorage.getItem('reportsUrl');
  bireqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  constructor(private http: HttpClient) {
   }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
  }

  getFootFallData(fromDate: any, toDate: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate ;
    return this.http.get(this.nreportUrl + 'analytics/location_footfalls?' + form, {headers : this.getHeaders()});
  }

  getRafConversionData(fromDate: any, toDate: any, period: any, week: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&month=' + 'P'+period + '&week=' + 'W'+week;
    return this.http.get(this.nreportUrl + 'analytics/raf_conversion_rate?' + form, {headers : this.getHeaders()});
  }
}
