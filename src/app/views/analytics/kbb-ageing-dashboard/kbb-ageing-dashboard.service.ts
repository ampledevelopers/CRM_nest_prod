import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KbbAgeingDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_options', form, {headers : this.getHeaders()});
  }

  getKbbAgeingData(date: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&today=' + date ;
      return this.http.post(this.rootUrl + 'api/charts/get_kbb_ageing', form, {headers : this.reqHeader});
  }

  getKbbPendingList(type: string,days: string,date: string,statusId: string,branchId: string){
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&today=' + date +
    '&days=' + days + '&type=' + type  + '&status_id=' + statusId + '&branch_id=' + branchId ;
      return this.http.post(this.rootUrl + 'api/charts/get_kbb_pending_list', form, {headers : this.reqHeader});

  }
}
