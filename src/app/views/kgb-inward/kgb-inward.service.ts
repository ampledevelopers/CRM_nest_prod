import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KgbInwardService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

  getAwaitingSparesTickets() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') ;
    return this.http.post(this.rootUrl + 'api/tickets/awaiting_spares_tickets', form, {headers : this.reqHeader});
  }

  getKgbDetails(tId: any, repair_partId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&id=' + repair_partId ;
    return this.http.post(this.rootUrl + 'api/tickets/kgb_details', form, {headers : this.reqHeader});
  }

  getAsnType(asn: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn;
        return this.http.get(this.rootUrl + 'api/ticketsv3/consignment_asn?' + form, {headers : this.reqHeader});
      }

  saveKgbDetails(kgbInput: any, kgbTicketId: any, repair_partid: any) {
      const inputdata = JSON.stringify(kgbInput);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&kgbInput=' + inputdata + '&ticket_id=' + kgbTicketId  + '&repair_partid=' + repair_partid;
      return this.http.post(this.rootUrl + 'api/tickets/kgb_details_save', form, {headers : this.reqHeader});
  }

  saveConsignment(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/ticketsv3/kgbinward_save', form, {headers : this.reqHeader});
  }

  updateGsxRepair(tId: any, repairId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&repair_id=' + repairId ;
    return this.http.post(this.rootUrl + 'api/tickets/update_gsx_repair', form, {headers : this.reqHeader});
  }

}
