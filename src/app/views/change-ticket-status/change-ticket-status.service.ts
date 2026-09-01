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
  nestUrl = localStorage.getItem('nestUrl');
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

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_options?' + form, {headers : this.getHeaders()});
  }
  
  getStatus() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticket_edit/get_status_by_role', form, {headers : this.getHeaders()});
  }

  getDetail(id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get?' + form, {headers : this.getHeaders()});
  }

  changeStatus(reqData: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  reqData;
    return this.http.post(this.nestUrl + 'ticket_edit/change_status_manual', form, {headers : this.getHeaders()});
  }

  getDriveFiles(ticket_id: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.nestUrl + 'ticket_edit/gdrive_image?' + form, {headers : this.getHeaders()});
  }
}
