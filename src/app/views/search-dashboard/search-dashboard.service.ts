import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchDashboardService {
  rootUrl = localStorage.getItem('rootUrl');
  nestUrl = localStorage.getItem('nestUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
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

  getData(gnumber: string, serialno: string, ticketid: string, phone: string, email: string, customername: string) {
    const form = '&g_number=' + gnumber + '&serial_no=' + serialno + '&ticket_id=' + ticketid + '&phone_no=' + phone + '&user_id=' + localStorage.getItem('userId') + '&email=' + email + '&customer_name=' + customername;
    return this.http.post(this.nestUrl + 'dashboard/get_ticket_details_manual', form, {headers : this.getHeaders()});
  }

  viewRaf(t_id: string) {
    const form = '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'itickets/view_raf', form, {headers : this.getHeaders(), responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  showSVC(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/svc_print', form, {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart)=> {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  getAnalysis(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'ticketsv1/get_analysis', form, {headers : this.getHeaders()});
  }

}
