import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateAgeingTimeService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getSitetypeBranches(siteType: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') +
    '&siteType=' + siteType ;
    return this.http.post(this.rootUrl + 'api/reports/get_sitetype_branches', form, {headers : this.reqHeader});
}

getStatuses(siteType: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') +
    '&siteType=' + siteType ;
    return this.http.post(this.rootUrl + 'api/reports/get_status', form, {headers : this.reqHeader});
}

getSitetypes() {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  ;
    return this.http.post(this.rootUrl + 'api/reports/get_site_types', form, {headers : this.reqHeader});
}

getProductFamily() {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  ;
    return this.http.post(this.rootUrl + 'api/reports/get_site_types', form, {headers : this.reqHeader});
}

addAgeingTime(sitetypeId: string, branchId: string, statusId: string, familyId: string, ageingTime: string, remarks: string, recordstatus: string, statusName: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
  '&sitetypeId=' + sitetypeId + '&branchId=' + branchId + '&statusId=' + statusId + '&familyId=' + familyId + '&ageingTime=' + ageingTime + '&remarks=' + remarks + '&recordstatus=' + recordstatus + '&statusName=' + statusName ;
      return this.http.post(this.rootUrl + 'api/tickets/add_update_ageing_time', form, {headers : this.reqHeader});
    }

getAgeingTimeData() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') ;
      return this.http.post(this.rootUrl + 'api/tickets/get_ageing_time_details', form, {headers : this.reqHeader});
    }

}
