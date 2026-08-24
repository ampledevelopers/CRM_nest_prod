import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CcEnquiryUpdateService {
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

  getlist() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&offset=' + 0 + '&limit=' + 1000 + '&user_id=' +
                  localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get?' + form, {headers : this.getHeaders()});
  }
}
