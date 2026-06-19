import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GsxFlatReportService {
  rootUrl = localStorage.getItem('reportsUrl');
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
  gsxFlatData(siteType:any,fromDate: any, toDate: any) {
    const form = '&site_type_id=' + siteType + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.nreportUrl + 'reports/gsx_flat_v1?' + form, {headers : this.getHeaders()});
  }
}
