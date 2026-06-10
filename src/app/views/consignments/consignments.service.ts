import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentsService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) {
  }

  getConsignmentlist() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/ticketsv3/get_consignment_list?' + form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_options', form, {headers : this.reqHeader});
  }

  saveConsignment(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/gsxapi/consignment_delivery_acknowledge', form, {headers : this.reqHeader});
  }

  unBlockConsignment(asn_no: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.post(this.rootUrl + 'api/ticketsv3/unblock_consignment', form, {headers : this.reqHeader});
  }

  inactiveConsignment(asn_no: string, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/ticketsv3/inactive_consignment', form, {headers : this.reqHeader});
  }

  bulkUpload(docs: any) {
    const documents = JSON.stringify(docs);
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/ticketsv3/inventory_import', form, {headers : this.reqHeader});
  }
}
