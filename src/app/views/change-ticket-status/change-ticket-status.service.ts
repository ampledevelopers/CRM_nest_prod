import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeTicketStatusService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) {
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getStatus() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_status_by_role', form, {headers : this.reqHeader});
  }

  getDetail(id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get?' + form, {headers : this.reqHeader});
  }

  changeStatus(reqData: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  reqData;
    return this.http.post(this.rootUrl + 'api/tickets/change_status_manual', form, {headers : this.reqHeader});
  }

  getDriveFiles(ticket_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.rootUrl + 'api/tickets/gdrive_image?' + form, {headers : this.reqHeader});
  }
}
