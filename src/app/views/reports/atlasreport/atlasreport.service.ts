import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtlasreportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
}

  getCertificates(){
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_certificates', form, {headers : this.reqHeader});
}

getAtlasCertificateReport(techId: string, certificateId: string, branchId: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
'&techId=' + techId + '&certificateId=' + certificateId + '&branchId=' + branchId;
    return this.http.post(this.rootUrl + 'api/reports/atlas_certification_report', form, {headers : this.reqHeader});
  }

}
