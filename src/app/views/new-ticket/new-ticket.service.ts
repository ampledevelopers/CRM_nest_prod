import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewTicketService {
  rootUrl = localStorage.getItem('rootUrl');
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

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getAMC(sNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&serial_no=' + sNo + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/ticketsv3/amc_data?' + form, {headers : this.reqHeader});
  }

  getBranch() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_user_branch', form, {headers : this.reqHeader});
  }

  getCompany() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'tickets_v2/get_company', form, {headers : this.getHeaders()});
  }

  getCompanies() {
    // const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.nreportUrl + 'common/get_companies', '', {headers : this.getHeaders()});
  }

  getCustomer(phone: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.post(this.rootUrl + 'api/tickets/get_customer_by_phone', form, {headers : this.reqHeader});
  }

  getCallTypes() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.rootUrl + 'api/tickets/get_onsite_repair_types', form, {headers : this.reqHeader});
  }

  getLogTypes() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.rootUrl + 'api/tickets/get_call_log_types', form, {headers : this.reqHeader});
  }

  getGsxData(sNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&serial_no=' + sNo + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/get_product_details', form, {headers : this.reqHeader});
  }

  createTicket(data: any, customer_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data + '&customer_id=' +
    customer_id;
    return this.http.post(this.rootUrl + 'api/tickets/create_call', form, {headers : this.reqHeader});
  }

  uploadDocuments(id: string, docs: any) {
    const documents = JSON.stringify(docs);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/tickets/uploads', form, {headers : this.reqHeader});
  }
}
