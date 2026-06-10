import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageBoardService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getOptions() {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/common/get_user_details', form, {headers : reqHeader});
  }

  submitMessageBoard(data: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') +  '&user_id=' + localStorage.getItem('userId') + data;
     const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
     return this.http.post(this.rootUrl + 'api/common/message_board', form , {headers : reqHeader});
  }

}
