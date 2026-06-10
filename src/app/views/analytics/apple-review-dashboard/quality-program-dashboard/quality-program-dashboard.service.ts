import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QualityProgramDashboardService{
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient){}

  getQPData(fromDate:any, toDate:any, report: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&from_date=' + fromDate + '&to_date=' + toDate  + '&report=' + report;
    return this.http.get(this.rootUrl + 'api/analytics/quality_program?'+ form, {headers : this.reqHeader});
  }

}
