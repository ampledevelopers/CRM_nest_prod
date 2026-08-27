import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreePhyLocationService {

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

 /*  getPhyLocation() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticketsv1/get_physical_locations', form, {headers : this.getHeaders()});
  } */

  getPhyLocation() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticket_edit/get_physical_location_detail', form, {headers : this.getHeaders()});
  }

  updatePhyLocation(item: { ticket_id: string; branch_code: string; product_family: string; device_location_id: string; }) {
    const form = 'user_id=' + localStorage.getItem('userId')
    + '&ticket_id=' + item.ticket_id + '&branch_code=' + item.branch_code + '&product_family=' + item.product_family +
    '&device_location_id=' + item.device_location_id	;
    return this.http.post(this.nestUrl + 'ticket_edit/free_physical_location', form, {headers : this.getHeaders()});
  }

}
