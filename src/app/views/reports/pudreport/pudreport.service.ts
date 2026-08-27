import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PUDreportService {

  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('rootUrl');
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }

  getPUDtickets(status: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&status=' + status +
    '&pud_type=' + '' + '&pickup_status=' + '' + '&drop_status=' + '';
    return this.http.get(this.nestUrl + 'pud/get_pud_tickets?' + form, {headers : this.getHeaders()});
  }
}
