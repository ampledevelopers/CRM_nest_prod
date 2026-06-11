import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartAddEditService {
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

  getPart(partid: string) {
    const form =  '&user_id=' + localStorage.getItem('userId') +
    '&part_no=' + partid;
    return this.http.post(this.nestUrl + 'common/get_part_price_details', form, {headers : this.reqHeader});
  }

  getCityList() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/common/get_city', form, {headers : this.reqHeader});
  }

  addPart(reqdata: string) {
    const form =  '&user_id=' + localStorage.getItem('userId') +
    reqdata;
    return this.http.post(this.nestUrl + 'common/save_part_price_details', form, {headers : this.getHeaders()});
  }

  updatePart(reqData: string) {
    const form =  '&user_id=' + localStorage.getItem('userId') +
    reqData;
    return this.http.post(this.nestUrl + 'ticket_edit/update_part_price_details', form, {headers : this.getHeaders()});
  }

  addKbbPart(partNo: string, desc: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&part_no=' + partNo + '&description=' + desc;
    return this.http.post(this.nestUrl + 'common/save_whole_unit_part', form, {headers : this.getHeaders()});
  }
}
