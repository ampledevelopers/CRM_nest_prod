import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DlDcService {
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

  getTickets(branchCode: any, dlBranchCode: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&branch_code=' + branchCode + '&dl_branch_code=' + dlBranchCode;
    return this.http.get(this.nestUrl + 'pud/dl_dc_tickets?' + form, {headers : this.getHeaders()});
  }

  getHlDl(branchCode: any, dlBranchCode: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&branch_code=' + branchCode + '&dl_branch_code=' + dlBranchCode;
    return this.http.post(this.nestUrl + 'pud/get_hl_dl', form, {headers : this.getHeaders()});
  }

  getPUDAgent() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'reservation/get_pud_agents?' + form, {headers : this.getHeaders()});
  }

  createNrdc(hd: any, dt: any, cartonBoxes: any, toteBoxes: any): Observable<any> {
    const returnData = {
      'return_hd': hd,
      'return_dt': dt,
      'carton_box': cartonBoxes,
      'tote_box': toteBoxes,
    };
    const data = JSON.stringify(returnData);
    const form = 'data=' + data +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'pud/create', form, {headers : this.getHeaders()});
  }

  getKbbList(nrdcId: any, ticketId: any, status: any) {
    let form;
    if (nrdcId !== '') {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved='
      + status + '&id=' + nrdcId;
    } else if (ticketId !== '') {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved='
      + '' + '&ticket_id=' + ticketId;
    } else {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved='
      + status;
    }
    return this.http.get(this.nestUrl + 'pud/get_kbb?' + form, {headers : this.getHeaders()});
  }

  shipmentConfirm(nrdcId: any, remarks: any, eWaybill: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&nrdc_no=' + nrdcId + '&remarks=' + remarks + '&eway_bill_no=' + eWaybill;
    return this.http.post(this.nestUrl + 'pud/dldc_shipment_confirmation', form, {headers : this.getHeaders()});
  }
  resendOtp(nrdcId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&nrdc_no=' + nrdcId;
    return this.http.post(this.nestUrl + 'pud/resend_otp', form, {headers : this.getHeaders()});
  }
}
