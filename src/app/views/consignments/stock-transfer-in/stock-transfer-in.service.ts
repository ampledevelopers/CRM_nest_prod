import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockTransferInService {
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

  stockTransList(to_branch_code:any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&to_branch_code=' + to_branch_code + '&ack=' + '2';
    return this.http.get(this.nestUrl + 'stock/stock_transfer_list?' + form, {headers : this.getHeaders()});
  }

  adhesivesTransList(to_branch_code:any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&to_branch_code=' + to_branch_code + '&ack=' + '2';
    return this.http.get(this.nestUrl + 'stock/adhesive_transfer_list?' + form, {headers : this.getHeaders()});
  }

  consignmentAck(dc_no:any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&dc_no=' + dc_no;
    return this.http.post(this.nestUrl + 'stock/consignment_acknowledge', form, {headers : this.getHeaders()});
  }

  adhesivesAck(dc_no:any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&dc_no=' + dc_no;
    return this.http.post(this.nestUrl + 'stock/adhesives_acknowledge', form, {headers : this.getHeaders()});
  }

}
