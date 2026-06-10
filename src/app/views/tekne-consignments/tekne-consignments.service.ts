import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class TekneConsignmentsService {
  reportsUrl = localStorage.getItem('reportsUrl');
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});


  constructor(private http: HttpClient) { }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_options', form, {headers : this.reqHeader});
  }

  saveConsignment(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/accy/add_consignment', form, {headers : this.reqHeader});
  }

  unBlockConsignment(asn_no: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.post(this.rootUrl + 'api/ticketsv3/unblock_consignment', form, {headers : this.reqHeader});
  }

  getConsignmentlist() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&branch_code=' + localStorage.getItem('branchCode');
    return this.http.get(this.rootUrl + 'api/accy/get_consignment?'+ form, {headers : this.reqHeader});
  }
}
