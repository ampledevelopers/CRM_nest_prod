import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DLBinAgeingService {

  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getBinAgeingDashboard() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&site_type=' + localStorage.getItem('siteType');
    return this.http.post(this.rootUrl + 'api/charts/dl_bin_ageing_dashboard', form, {headers : this.reqHeader});
  }

  // getAgeingTicketList(family: string, type: string, statusId: string, countType: string, branchId: string) {
  //   const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
  //   '&family=' + family + '&type=' + type  + '&status_id=' + statusId + '&count_type=' + countType + '&branch_id=' + branchId ;
  //   return this.http.post(this.rootUrl + 'api/charts/ageing_ticket_list', form, {headers : this.reqHeader});
  // }

  getAgeingTicketList(statusId: string, branchCode: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&status_id=' + statusId + '&branch_code=' + branchCode ;
    return this.http.post(this.rootUrl + 'api/charts/dl_ageing_ticket_details', form, {headers : this.reqHeader});
  }

  getTicketsNotificationDetails(notificationType: string, ticketId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&notificationType=' + notificationType + '&ticketId=' + ticketId ;
    return this.http.post(this.rootUrl + 'api/charts/tickets_notification_details', form, {headers : this.reqHeader});
  }

}
