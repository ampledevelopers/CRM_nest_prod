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
    const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.rootUrl + 'api/tickets/get_companies', form, {headers : this.reqHeader});
  }

  getCompany(t_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/tickets/get_company', form, {headers : this.reqHeader});
  }

  getDcTickets(comp_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&company_id=' + comp_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/mis/dc_tickets?' + form, {headers : this.reqHeader});
  }

  getPudDcTickets() {
    const form = 'X_API_KEY=' + 'Ti@vlp123' + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/mis/get_pud_dc?' + form, {headers : this.reqHeader});
  }

  getLocation(code: any) {
    let form: any;
    if (code === '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    } else {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + code + '&user_id=' + localStorage.getItem('userId');
    }
    return this.http.post(this.rootUrl + 'api/returns/get_branch', form, {headers : this.reqHeader});
  }

  getCustomer(phone: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.post(this.rootUrl + 'api/tickets/get_customer_by_phone', form, {headers : this.reqHeader});
  }

  dcSubmit(hd: any, dt: any): Observable<any> {
    const returnData = {
      'dc_hd': hd,
      'dc_dt': dt,
    };
    const data = JSON.stringify(returnData);
    const usetkn: any = localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True','X-API-KEY': usetkn });
    return this.http.post(this.rootUrl + 'api/mis/create', data, {headers : diagHeader});
  }

  dlDcSubmit(hd: any, dt: any) {
    const returnData = {
      'dc_hd': hd,
      'dc_dt': dt,
    };
    const data = JSON.stringify(returnData);
    const usetkn: any = localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True','X-API-KEY': usetkn });
    return this.http.post(this.rootUrl + 'api/mis/create_pud_dc', data, {headers : diagHeader});
  }

  downloadDC(dcId: any) {
    const form = 'X_API_KEY=' + 'Ti@vlp123'  + '&id=' + dcId;
    return this.http.get(this.rootUrl + 'api/mis/pud_dc_print?' + form, {headers : this.reqHeader});
  }

  getDcList(dcId: any, ticketId: any, status: any) {
    let form;
    if (dcId !== '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&approved='
      + status + '&id=' + dcId;
    } else if (ticketId !== '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&approved='
      + '' + '&ticket_id=' + ticketId;
    } else {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&approved='
      + status;
    }
    return this.http.get(this.rootUrl + 'api/mis/get_dc?' + form, {headers : this.reqHeader});
  }

  approveDeclineDc(id: any, status: any, ewaybill: any, remarks: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&dc_id=' + id + '&status=' + status + '&eway_bill=' + ewaybill + '&additional_note=' + remarks;
    return this.http.post(this.rootUrl + 'api/mis/approve', form, {headers : this.reqHeader});
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
    return this.http.post(this.rootUrl + 'api/ticketsv3/nrdc_shipment_confirmation', form, {headers : this.reqHeader});

  }

  getPUDtickets(dlFlag: any) {
    let status = '';
    if(dlFlag === '1'){
      status = 'Assigned - Outward';
    } else {
      status = 'Assigned - Return';
    }
    const form = 'X_API_KEY=' + 'Ti@vlp123' + '&user_id=' + localStorage.getItem('userId') + '&status=' + status +
    '&pud_type=' + 'DL' + '&pickup_status=' + '' + '&drop_status=' + '';
    return this.http.get(this.rootUrl + 'api/pud/get_pud_tickets?' + form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }
}
