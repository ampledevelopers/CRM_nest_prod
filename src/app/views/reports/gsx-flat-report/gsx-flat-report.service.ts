import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GsxFlatReportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }
  gsxFlatData(siteType:any,fromDate: any, toDate: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&site_type_id=' + siteType + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.rootUrl + 'api/reports/gsx_flat_v1?' + form, {headers : this.reqHeader});
  }
}
