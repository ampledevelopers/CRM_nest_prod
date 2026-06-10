import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DsatFindingsDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }
  getDsatData(year:any, month:any, week:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&year=' + year + '&month=' + month + '&week=' + week;
    return this.http.get(this.rootUrl + 'api/analytics/dsat_data?'+ form, {headers : this.reqHeader});
  }
}
