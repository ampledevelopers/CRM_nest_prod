import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class RelocateEnggService {
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

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }

  chechEngg(empId: string) {
    const form = 'user_id=' + empId;
    return this.http.post(this.nestUrl + 'manage-user/profile', form, {headers : this.getHeaders()});
  }

  relocateUser(branchcode: string, branchid: string, siteId: string , roleId: string, userId: string) {
    const form = 'user_id=' + userId +
                '&site_type_id=' + siteId + '&branch_id=' + branchid + '&branch_code=' + branchcode + '&group_id=' + roleId;
    return this.http.post(this.nestUrl + 'manage-user/relocate_user', form, {headers : this.getHeaders()});
  }

}
