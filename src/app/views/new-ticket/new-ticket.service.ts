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
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get_options?' + form, {headers : this.getHeaders()});
  }

  getAMC(sNo: any) {
    const form = 'serial_no=' + sNo + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'tickets_v2/amc_data?' + form, {headers : this.getHeaders()});
  }

  getBranch() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticketsv1/get_user_branch', form, {headers : this.getHeaders()});
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
    const form = 'user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.post(this.nestUrl + 'common/get_customer_by_phone', form, {headers : this.getHeaders()});
  }

  getCallTypes() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticketsv1/get_onsite_repair_types', form, {headers : this.getHeaders()});
  }

  getLogTypes() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticketsv1/get_call_log_types', form, {headers : this.getHeaders()});
  }

  getGsxData(sNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&serial_no=' + sNo + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'gsxapi/get_product_details', form, {headers : this.getHeaders()});
  }

  createTicket(data: any, customer_id: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + data + '&customer_id=' +
    customer_id;
    return this.http.post(this.nestUrl + 'mis/create_call', form, {headers : this.getHeaders()});
  }

  uploadDocuments(id: string, docs: any) {
    const documents = JSON.stringify(docs);
    const form = 'ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    return this.http.post(this.nestUrl + 'tickets_v2/uploads', form, {headers : this.getHeaders()});
  }
}
