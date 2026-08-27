import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DCallServicesService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  constructor(private http: HttpClient) { }

  getDcalltickets() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'dcall/d_call?' + form, { headers: this.getHeaders() });
  }

  getPUDAgent() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'reservation/get_pud_agents?' + form, { headers: this.getHeaders() });
  }

  dcallSetType(id: string | null, dcall_type: any, pickup_assigned_to: any, pickup_scheduled_time: any, assigned_user_id: any, assigned_user_id_time: any, gNumber: any) {
    let form: any;
    if (dcall_type === 'PickUp') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + id + '&dcall_type=' + dcall_type + '&pickup_assigned_to=' + pickup_assigned_to
        + '&pickup_scheduled_time=' + pickup_scheduled_time;
    } else if (dcall_type === 'SiteVisit') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + id + '&dcall_type=' + dcall_type + '&assigned_user_id=' + assigned_user_id
        + '&assigned_user_id_time=' + assigned_user_id_time + '&g_number=' + gNumber;
    }
    return this.http.post(this.nestUrl + 'gsxapi/set_type', form, { headers: this.getHeaders() });
  }

  getAssignees() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'tickets_v2/userlist', form, { headers: this.getHeaders() });
  }

  fetchDcall(fromDate: any, toDate:any, branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_code=' + branchCode;
    return this.http.post(this.nestUrl + 'gsxapi/d_call', form, {headers : this.getHeaders()});
  }
}
