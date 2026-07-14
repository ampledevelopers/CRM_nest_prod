import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GSXReimbursementService {
  rootUrl = localStorage.getItem('rootUrl');
  reportsUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  constructor(private http: HttpClient) { }
  
  uploadGsxReimb(docs: any, date: any) {
    const documents = JSON.stringify(docs);
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
    const form = '&user_id=' + localStorage.getItem('userId') + '&completion_date=' + date + '&documents=' + documents;
    return this.http.post(this.nreportUrl + 'reports/labour_reimbursement', form, {headers : this.getHeaders()});
  }
  

}
