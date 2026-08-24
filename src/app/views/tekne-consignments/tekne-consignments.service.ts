import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class TekneConsignmentsService {
  reportsUrl = localStorage.getItem('reportsUrl');
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

  constructor(private http: HttpClient) { }

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_options', form, {headers : this.getHeaders()});
  }

  saveConsignment(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.nestUrl + 'accy/add_consignment', form, {headers : this.getHeaders()});
  }

  unBlockConsignment(asn_no: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.post(this.nestUrl + 'consignment/unblock_consignment', form, {headers : this.getHeaders()});
  }

  getConsignmentlist() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&branch_code=' + localStorage.getItem('branchCode');
    return this.http.get(this.nestUrl + 'accy/get_consignment?'+ form, {headers : this.getHeaders()});
  }
}
