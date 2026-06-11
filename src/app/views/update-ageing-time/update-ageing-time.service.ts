import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateAgeingTimeService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
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

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getSitetypeBranches(siteType: string | null) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&siteType=' + siteType ;
    return this.http.post(this.nestUrl + 'ticket_edit/get_sitetype_branches', form, {headers : this.getHeaders()});
}

getStatuses(siteType: string) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&siteType=' + siteType ;
    return this.http.post(this.nestUrl + 'ticket_edit/get_status', form, {headers : this.getHeaders()});
}

// getSitetypes() {
//   const form = 'user_id=' + localStorage.getItem('userId');
//     return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
// }

// getProductFamily() {
//   const form = '';
//     return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
// }
// getSitetypes() {
//   const form = '' ;
//     return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
// }

getSitetypes() {
  const form = '';
    return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
}

getProductFamily() {
  const form = '' ;
    return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
}

addAgeingTime(sitetypeId: string, branchId: string, statusId: string, familyId: string, ageingTime: string, remarks: string, recordstatus: string, statusName: string) {
    const form = 'user_id=' + localStorage.getItem('userId') +
  '&sitetypeId=' + sitetypeId + '&branchId=' + branchId + '&statusId=' + statusId + '&familyId=' + familyId + '&ageingTime=' + ageingTime + '&remarks=' + remarks + '&recordstatus=' + recordstatus + '&statusName=' + statusName ;
      return this.http.post(this.nestUrl + 'ticket_edit/add_update_ageing_time', form, {headers : this.getHeaders()});
    }

getAgeingTimeData() {
    const form = 'user_id=' + localStorage.getItem('userId') ;
      return this.http.post(this.nestUrl + 'ticket_edit/get_ageing_time_details', form, {headers : this.getHeaders()});
    }

}
