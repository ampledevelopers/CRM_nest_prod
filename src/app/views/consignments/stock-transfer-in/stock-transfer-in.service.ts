import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockTransferInService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  stockTransList(to_branch_code:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&to_branch_code=' + to_branch_code + '&ack=' + '2';
    return this.http.get(this.rootUrl + 'api/stock/stock_transfer_list?' + form, {headers : this.reqHeader});
  }

  adhesivesTransList(to_branch_code:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&to_branch_code=' + to_branch_code + '&ack=' + '2';
    return this.http.get(this.rootUrl + 'api/adhesives/stock_transfer_list?' + form, {headers : this.reqHeader});
  }

  consignmentAck(dc_no:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&dc_no=' + dc_no;
    return this.http.post(this.rootUrl + 'api/stock/consignment_acknowledge', form, {headers : this.reqHeader});
  }

  adhesivesAck(dc_no:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&dc_no=' + dc_no;
    return this.http.post(this.rootUrl + 'api/adhesives/adhesives_acknowledge', form, {headers : this.reqHeader});
  }

}
