import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataUploadService {
    rootUrl = localStorage.getItem('rootUrl');
    reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });

    constructor(private http: HttpClient) { }
    
    uploadCsatDocs(docs: any) {
      const documents = JSON.stringify(docs);
      const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +  '&documents=' + documents;
      return this.http.post(this.rootUrl + 'api/analytics/csat', form, {headers : reqHeader});
    }
}
