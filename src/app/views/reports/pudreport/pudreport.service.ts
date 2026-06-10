import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PUDreportService {

  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('rootUrl');

  getPUDtickets(status: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&status=' + status +
    '&pud_type=' + '' + '&pickup_status=' + '' + '&drop_status=' + '';
    return this.http.get(this.rootUrl + 'api/pud/get_pud_tickets?' + form, {headers : this.reqHeader});
  }
}
