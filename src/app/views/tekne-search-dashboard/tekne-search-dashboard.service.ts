import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TekneSearchDashboardService {

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

  getData(invoicenumber: string, serialno: string, ticketid: string, phone: string, email: string, customername: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&invoice_number=' + invoicenumber + '&serial_no=' + serialno +
    '&ticket_id=' + ticketid + '&phone_no=' + phone + '&user_id=' + localStorage.getItem('userId') + '&email=' + email +
    '&customer_name=' + customername;
    return this.http.post(this.rootUrl + 'api/accytickets/get_ticket_details_manual', form, {headers : this.reqHeader});
  }

  viewRaf(t_id: string) {
    const form = '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'itickets/view_raf', form, {headers : this.getHeaders(), responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  showSVC(t_id: string) {
    const form = 'ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'tickets_v2/svc_print', form, {headers : this.getHeaders(), responseType: 'blob'}).pipe(map((res: BlobPart)=> {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  getAnalysis(t_id: string) {
    const form = 'ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'tickets_v2/get_analysis', form, {headers : this.getHeaders()});
  }

}
