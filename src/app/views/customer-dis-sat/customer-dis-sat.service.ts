import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerDisSatService {
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

  uploadDisSat(docs: any, date: any) {
    const documents = JSON.stringify(docs);
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
    const form = 'user_id=' + localStorage.getItem('userId') + '&completion_date=' + date + '&documents=' + documents;
    return this.http.post(this.nestUrl + 'uploads/ticket_customer_rating', form, {headers : reqHeader});
  }

}
