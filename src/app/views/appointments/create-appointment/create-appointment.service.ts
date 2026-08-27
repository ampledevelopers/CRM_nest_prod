import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('rootUrl');
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  getAvailableSlots(productCode: any, shipTo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&product_code=' + productCode + '&ship_to=' + shipTo;
    return this.http.post(this.nestUrl + 'gsxapi/fetch_available_slots', form, {headers : this.getHeaders()});
  }

  createReservation(data: any) {
    const form = 'user_id=' + localStorage.getItem('userId')  + data ;
    return this.http.post(this.nestUrl + 'gsxapi/reservation_create', form, {headers : this.getHeaders()})
  }

  getCustomer(phone: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.post(this.nestUrl + 'common/get_customer', form, {headers : this.getHeaders()});
  }

  getUserDetail() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }

  createCustomer(firstName: any, lastName : any, phone: any, email: any) {
    const form =  '&first_name=' + firstName + '&last_name=' + lastName + '&phone=' + phone  + '&email=' + email ;
    return this.http.post(this.nestUrl + 'reservation/create_customer', form, {headers : this.getHeaders()});
  }

  reservationUpdate( shipTo: any, date: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&reservation_id=' + localStorage.getItem('reservationId') + '&cancel_reason=' + 'CUSTOMER_CANCELLED' + '&modified_status=' + 'RESCHEDULED' + '&user_id=' + localStorage.getItem('userId') + '&ship_to_code=' + shipTo + '&new_reservation_date=' + date + '&ticket_id=' + localStorage.getItem('ticketId');
    return this.http.post(this.nestUrl + 'gsxapi/reservation_update', form, {headers : this.getHeaders()});
  }

  createDlvryReservation(data: any, ticketId: any) {
    const form = 'user_id=' + localStorage.getItem('userId')  + data + '&ticket_id=' + ticketId ;
    return this.http.post(this.nestUrl + 'gsxapi/reservation_create', form, {headers : this.getHeaders()})
  }
}
