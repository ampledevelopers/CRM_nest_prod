import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissingDeviceService {

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

  saveMissingDevice(data: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.nestUrl + 'ticketsv1/apple_trace', form, {headers : this.getHeaders()});
  }

}
