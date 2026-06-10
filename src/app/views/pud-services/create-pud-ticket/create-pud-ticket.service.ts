import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePudTicketService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) { }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
  }

  createPUD(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + data;
    return this.http.post(this.rootUrl + 'api/pud/create_pud_ticket' , form, {headers : this.reqHeader});
  }
  getCustomer(phone: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.post(this.rootUrl + 'api/tickets/get_customer_by_phone', form, {headers : this.reqHeader});
  }

  createCustomer(firstName: any, lastName : any, phone: any, email: any, address1: any, address2: any, city: any, state: any, pin: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&first_name=' + firstName + '&last_name=' + lastName + '&phone=' + phone  + '&email=' + email  + '&address1=' + address1 + '&address2=' + address2 + '&city=' + city + '&state=' + state + '&pin=' + pin;
    return this.http.post(this.rootUrl  + 'api/reservation/create_customer', form, {headers : this.reqHeader});
  }

  generateQuote(data: any){
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl  + 'api/ticketsv3/generate_quotation_generic', form, {headers : this.reqHeader});
  }

  sendQuotePayment(ticketId: any, quoteId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&quotation_id=' + quoteId + '&quotation_pud=' + 1;
    return this.http.post(this.rootUrl  + 'api/ticketsv3/send_quotation_and_paynow_link', form, {headers : this.reqHeader});
  }
}
