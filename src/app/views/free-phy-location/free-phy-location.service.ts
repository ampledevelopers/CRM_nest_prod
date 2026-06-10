import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreePhyLocationService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

 /*  getPhyLocation() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_physical_locations', form, {headers : this.reqHeader});
  } */

  getPhyLocation() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_physical_location_detail', form, {headers : this.reqHeader});
  }

  updatePhyLocation(item: { ticket_id: string; branch_code: string; product_family: string; device_location_id: string; }) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId')
    + '&ticket_id=' + item.ticket_id + '&branch_code=' + item.branch_code + '&product_family=' + item.product_family +
    '&device_location_id=' + item.device_location_id	;
    return this.http.post(this.rootUrl + 'api/tickets/free_physical_location', form, {headers : this.reqHeader});
  }

}
