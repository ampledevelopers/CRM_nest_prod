import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KgbInwardService {
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

  getAwaitingSparesTickets() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'shipment/awaiting_spares_tickets', form, { headers: this.getHeaders() });
  }

  getKgbDetails(tId: any, repair_partId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
      '&ticket_id=' + tId + '&id=' + repair_partId;
    return this.http.post(this.nestUrl + 'shipment/kgb_details', form, { headers: this.getHeaders() });
  }

  getAsnType(asn: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn;
    return this.http.get(this.nestUrl + 'shipment/consignment_asn?' + form, { headers: this.getHeaders() });
  }

  // saveKgbDetails(kgbInput: any, kgbTicketId: any, repair_partid: any) {
  //   const inputdata = JSON.stringify(kgbInput);
  //   const form = 'user_id=' + localStorage.getItem('userId') +
  //     '&kgbInput=' + inputdata + '&ticket_id=' + kgbTicketId + '&repair_partid=' + repair_partid;
  //   return this.http.post(this.nestUrl + 'shipment/kgb_details_save', form, { headers: this.getHeaders() });
  // }

  saveKgbDetails(kgbInput: any, kgbTicketId: any, repair_partid: any) {
    return this.http.post( this.nestUrl + 'shipment/kgb_details_save',
      { user_id: localStorage.getItem('userId'), kgbInput: kgbInput, ticket_id: kgbTicketId, repair_partid: repair_partid, }, { headers: this.getHeaders() } );
  }

  saveConsignment(data: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.nestUrl + 'shipment/kgbinward_save', form, { headers: this.getHeaders() });
  }

  updateGsxRepair(tId: any, repairId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&ticket_id=' + tId + '&repair_id=' + repairId;
    return this.http.post(this.rootUrl + 'api/tickets/update_gsx_repair', form, { headers: this.reqHeader });
  }

}
