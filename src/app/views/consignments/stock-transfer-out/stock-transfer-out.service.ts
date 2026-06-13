import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockTransferOutService {
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

  getConsignment(asn_no: string, fromBranchCode:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&status=' + 'A' + '&stock_type=' + 'Ample' + '&branch_code=' + fromBranchCode + '&asn_no=' + asn_no;
    return this.http.get(this.rootUrl + 'api/stock/consignment?' + form, {headers : this.reqHeader});
  }

  getAdhesives(asn_no: string, fromBranchCode:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.get(this.rootUrl + 'api/adhesives/adhesives_asn?' + form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
  }

  consignConfirm(fromBranchCode:any,to_branch_code:any,asnNo:any,serial_no:any, part_no:any,description:any) {
    const consignTransData: any = [];
    let form: any = [];
    consignTransData.push({
      'hd': {'user_id':localStorage.getItem('userId'), 'from_branch_code':fromBranchCode, 'to_branch_code':to_branch_code},
      'dt': [{'serial_no': serial_no,
      'part_no': part_no,
      'description': description,
      'asn_no': asnNo}]
    });
    form = JSON.stringify(consignTransData);
    const userToken: any=localStorage.getItem('userToken');
    const user_id: any = localStorage.getItem('userId');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True', 'X-API-KEY':userToken});
    return this.http.post(this.nestUrl + 'stock/consignment_transfer', form, {headers : this.getHeaders()});
  }

  adhesiveConfirm(fromBranchCode:any,to_branch_code:any,confirmAdData:any) {
    const consignTransData: any = [];
    let form: any = [];
    consignTransData.push({
      'hd': {'user_id':localStorage.getItem('userId'), 'from_branch_code':fromBranchCode, 'to_branch_code':to_branch_code},
      'dt': confirmAdData
    });
    form = JSON.stringify(consignTransData);
    const userToken: any=localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True', 'X-API-KEY':userToken});
    return this.http.post(this.rootUrl + 'api/adhesives/adhesives_transfer', form, {headers : diagHeader});
  }

  stockTransList(fromBranchCode:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&from_branch_code=' + fromBranchCode + '&ack=' + '2';
    return this.http.get(this.nestUrl + 'stock/stock_transfer_list?' + form, {headers : this.getHeaders()});
  }

  adhesivesTransList(fromBranchCode:any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&from_branch_code=' + fromBranchCode + '&ack=' + '2';
    return this.http.get(this.nestUrl + 'stock/stock_transfer_list?' + form, {headers : this.getHeaders()});
  }

}
