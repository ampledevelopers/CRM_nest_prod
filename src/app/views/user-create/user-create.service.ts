import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {
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

  getUsers() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_users', form, {headers : this.getHeaders()});
  }

  checkUser(empId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + empId;
    return this.http.post(this.rootUrl + 'api/common/profile', form, {headers : this.reqHeader});
  }

  createUser(empId: string, userName: string, mobile: string,
    serviceType: string, branch: string, userRole: string, status: string, email: string, techType: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&emp_id=' + empId + '&user_id=' + localStorage.getItem('userId') +
                '&site_type_id=' + serviceType + '&branch_id=' + branch + '&mobile=' + mobile + '&group_id=' + userRole + '&status='
                + status + '&email=' + email + '&user_name=' + userName + '&technician_type=' + techType;
    return this.http.post(this.rootUrl + 'api/common/create_user', form, {headers : this.reqHeader});
  }

  updateUser(empId: string, userName: string, mobile: string,
    serviceType: string, branch: string, userRole: string, status: string, email: string, techType: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&emp_id=' + empId + '&user_id=' + localStorage.getItem('userId') +
                '&site_type_id=' + serviceType + '&branch_id=' + branch + '&mobile=' + mobile + '&group_id=' + userRole + '&status='
                + status + '&email=' + email + '&user_name=' + userName + '&technician_type=' + techType;
    return this.http.post(this.rootUrl + 'api/common/edit_user', form, {headers : this.reqHeader});
  }

  getLICUsers() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/common/get_all_users', form, {headers : this.reqHeader});
  }

  updateLICAttentance(userId: string, status: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + userId + '&mark_attendance=' + status;
    return this.http.post(this.rootUrl + 'api/ticketsv3/mark_attendance', form, {headers : this.reqHeader});
  }
}
