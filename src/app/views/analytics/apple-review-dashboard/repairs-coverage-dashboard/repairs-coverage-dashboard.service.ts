import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairsCoverageDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }
  getRepairWarranty(fromDate:any, toDate:any, repairType: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&from_date=' + fromDate + '&to_date=' + toDate + '&repair_type=' + repairType;
    return this.http.get(this.rootUrl + 'api/analytics/repair_warranty?'+ form, {headers : this.reqHeader});
  }
}
