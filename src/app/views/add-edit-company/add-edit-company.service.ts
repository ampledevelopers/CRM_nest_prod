import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddEditCompanyService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nreportUrl = localStorage.getItem('nreportUrl');
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
    // const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.nreportUrl + 'common/get_companies', {headers : this.getHeaders()});
  }

  createOrg(name: any, add1: any, add2: any, city: any, state: any, pin: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&company_name=' + name + '&address1=' + add1 + '&address2=' + add2 + '&city=' + city + '&state=' + state + '&pin=' + pin;
    return this.http.post(this.rootUrl + 'api/common/create_company', form, {headers : this.reqHeader});
  }

}
