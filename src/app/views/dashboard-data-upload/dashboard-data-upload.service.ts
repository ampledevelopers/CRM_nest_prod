import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataUploadService {
    rootUrl = localStorage.getItem('rootUrl');
    reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    nestUrl = localStorage.getItem('nestUrl');
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('userToken');
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'No-Auth': 'True',
        'x-api-key': token || ''
      });
    }
    constructor(private http: HttpClient) { }
    
    uploadCsatDocs(docs: any) {
      const documents = JSON.stringify(docs);
      const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
      const form = 'user_id=' + localStorage.getItem('userId') +  '&documents=' + documents;
      return this.http.post(this.nestUrl + 'uploads/csat', form, {headers : reqHeader});
    }
}
