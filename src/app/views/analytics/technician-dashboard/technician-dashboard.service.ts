import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnicianDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
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

  getTechnicianDashboard(fromDate: string, toDate: string, branchId: string, techId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
  '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&techId=' + techId;
      return this.http.post(this.rootUrl + 'api/charts/technician_dashboard', form, {headers : this.reqHeader});
    }

    getLegends(dashboardName: string) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId')
      + '&dashboardName=' + dashboardName;
      return this.http.post(this.rootUrl + 'api/charts/keywords_legends', form, {headers : this.reqHeader});
    }

    getLocationusers(branchId: string) {
      const form = '&user_id=' + localStorage.getItem('userId') +
      '&branchId=' + branchId ;
      return this.http.post(this.nreportUrl + 'reports/get_location_users', form, {headers : this.getHeaders()});
  }

  getTeamleadLocusers() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'tickets_v2/userlist', form, {headers : this.getHeaders()});
  }

}
