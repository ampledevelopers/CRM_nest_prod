import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OnsiteDcService {
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

  getCompanies() {
    // const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.nreportUrl + 'common/get_companies', '', {headers : this.getHeaders()});
  }

  getCompany(t_id: any) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'tickets_v2/get_company', form, {headers : this.getHeaders()});
  }

  getDcTickets(comp_id: any) {
    const form = 'company_id=' + comp_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'mis/dc_tickets?' + form, {headers : this.getHeaders()});
  }

  getPudDcTickets() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'mis/get_pud_dc?' + form, {headers : this.getHeaders()});
  }

  getLocation(code: any) {
    let form: any;
    if (code === '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    } else {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + code + '&user_id=' + localStorage.getItem('userId');
    }
    return this.http.post(this.nestUrl + 'kbb_outward/get_branch', form, {headers : this.getHeaders()});
  }

  getCustomer(phone: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.post(this.nestUrl + 'common/get_customer_by_phone', form, {headers : this.getHeaders()});
  }

  dcSubmit(hd: any, dt: any): Observable<any> {
    const returnData = {
      'dc_hd': hd,
      'dc_dt': dt,
    };
    const data = JSON.stringify(returnData);
    const usetkn: any = localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True', 'x-api-key': usetkn });
    return this.http.post(this.nestUrl + 'mis/create', data, {headers : diagHeader});
  }

  dlDcSubmit(hd: any, dt: any) {
    const returnData = {
      'dc_hd': hd,
      'dc_dt': dt,
    };
    const data = JSON.stringify(returnData);
    const usetkn: any = localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True', 'x-api-key': usetkn });
    return this.http.post(this.nestUrl + 'mis/create_pud_dc', data, {headers : diagHeader});
  }

  downloadDC(dcId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&id=' + dcId;
    return this.http.get(this.nestUrl + 'mis/pud_dc_print?' + form, {headers : this.getHeaders()});
  }

  getDcList(dcId: any, ticketId: any, status: any) {
    let form;
    if (dcId !== '') {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved='
      + status + '&id=' + dcId;
    } else if (ticketId !== '') {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved='
      + '' + '&ticket_id=' + ticketId;
    } else {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved='
      + status;
    }
    return this.http.get(this.nestUrl + 'mis/get_dc?' + form, {headers : this.getHeaders()});
  }

  approveDeclineDc(id: any, status: any, ewaybill: any, remarks: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&dc_id=' + id + '&status=' + status + '&eway_bill=' + ewaybill + '&additional_note=' + remarks;
    return this.http.post(this.nestUrl + 'mis/approve', form, {headers : this.getHeaders()});
  }

  /* viewDc(dcId) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + dcId;
    return this.http.get(this.rootUrl + 'api/dc/print?' + form, {headers : this.reqHeader});
  } */

  getDriveFiles(ticket_id: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.nestUrl + 'ticket_edit/gdrive_image?' + form, {headers : this.getHeaders()});
  }

  shipmentConfirm(nrdcId: any, remarks: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&nrdc_no=' + nrdcId + '&remarks=' + remarks;
    return this.http.post(this.nestUrl + 'kbb_outward/nrdc_shipment_confirmation', form, {headers : this.getHeaders()});

  }

  getPUDtickets(dlFlag: any) {
    let status = '';
    if(dlFlag === '1'){
      status = 'Assigned - Outward';
    } else {
      status = 'Assigned - Return';
    }
    const form = 'user_id=' + localStorage.getItem('userId') + '&status=' + status +
    '&pud_type=' + 'DL' + '&pickup_status=' + '' + '&drop_status=' + '';
    return this.http.get(this.nestUrl + 'pud/get_pud_tickets?' + form, {headers : this.getHeaders()});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }
}
