import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class WinDashboardService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  ticketList: any;
  constructor(private http: HttpClient) {
  }

  getData(ticket_type: any) {
    let tType;
    let sId;
    if (isNaN(ticket_type)) {
         tType = ticket_type;
         sId = 0;
       } else {
         tType = 'undefined';
         sId = ticket_type;
       }
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&offset=' + 0 + '&limit=' + 2000 + '&user_id=' +
                  localStorage.getItem('userId') + '&status_id=' + sId + '&ticket_type=' + tType;
    return this.http.get(this.rootUrl + 'api/tickets/get?' + form, {headers : this.reqHeader});
  }

  getStatusCount(ticket_type: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_type=' + ticket_type;
    return this.http.post(this.rootUrl + 'api/tickets/get_status_count', form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getCustomerInfo(c_id: string, phone_no: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  '&site_type_id=' + '3' + '&c_id=' + c_id + '&phone=' + phone_no;
    return this.http.post(this.rootUrl + 'api/tickets/get_customer', form, {headers : this.reqHeader});
  }

  getCompany(t_id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/tickets/get_company', form, {headers : this.reqHeader});
  }

  statusUpdate(data: string, remark: string | number | boolean, requiredfields: any) {
    remark = encodeURIComponent(remark);
    const inputdata = JSON.stringify(requiredfields);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + data + '&user_id=' + localStorage.getItem('userId') +
                '&remarks=' + remark + '&data=' + inputdata;
    return this.http.post(this.rootUrl + 'api/tickets/change_status', form, {headers : this.reqHeader});
  }

  getDetail(id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get?' + form, {headers : this.reqHeader});
  }

  getAssignees() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/common/userlist', form, {headers : this.reqHeader});
  }

  assignTicket(tId: string, assigned_user_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&assigned_user_id=' + assigned_user_id;
    return this.http.post(this.rootUrl + 'api/tickets/assign_ticket', form, {headers : this.reqHeader});
  }

  closeTicket(ticketId: string | null, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticketId + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/ticketsv3/close_ticket', form, {headers : this.reqHeader});
  }

  KDOptionUpdate(ticketId: string | null, kd_status: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&kd_status=' + kd_status +
    '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/update_kd_call', form, {headers : this.reqHeader});
  }

  makeCall(tId: string, phone: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&customer_number=' + phone;
    return this.http.get(this.rootUrl + 'api/call/start?' + form, {headers : this.reqHeader});
  }

  getPhoneCalls(tId: string, phone: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&customer_number=' + phone;
    return this.http.get(this.rootUrl + 'api/call/get_calls?' + form, {headers : this.reqHeader});
  }

  /******* Diagnosis *********/

  changeBinManually(t_id: string, toStatus: string, invoice_id: string, invoiceDate: string, amount: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&next_status=' + toStatus + '&user_id=' + localStorage.getItem('userId') + '&invoice_id=' + invoice_id
    + '&invoice_date=' + invoiceDate + '&amount=' + amount;
    return this.http.post(this.rootUrl + 'api/ticketsv3/ticket_status_change', form, {headers : this.reqHeader});
  }

  changeStatus(reqData: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  reqData;
    return this.http.post(this.rootUrl + 'api/tickets/change_status_manual', form, {headers : this.reqHeader});
  }

   /******* Details *********/

  updateProductName(t_id: string | null, product: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&product_name=' + product;
  return this.http.post(this.rootUrl + 'api/tickets/product_name_update', form, {headers : this.reqHeader});
  }

  updateWarrantyStatus(t_id: string | null, warranty: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&warranty_status=' + warranty;
    return this.http.post(this.rootUrl + 'api/tickets/warranty_status_update', form, {headers : this.reqHeader});
  }

  conditionDevice(t_id: string, condition: string | number | boolean) {
    condition = encodeURIComponent(condition);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&condition_of_device=' + condition;
    return this.http.post(this.rootUrl + 'api/tickets/device_condition_update', form, {headers : this.reqHeader});
  }

  /******* Timeline *********/

  timelineData(id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
    return this.http.post(this.rootUrl + 'api/tickets/timeline', form, {headers : this.reqHeader});
  }

  /******* Documents *********/

  getDocuments(id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
    return this.http.post(this.rootUrl + 'api/tickets/get_documents', form, {headers : this.reqHeader});
  }

  uploadDocuments(id: string, docs: any) {
    const documents = JSON.stringify(docs);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/tickets/uploads', form, {headers : this.reqHeader});
  }

  deleteDocument(id: string, ticket_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + id + '&ticket_id=' + ticket_id;
    return this.http.post(this.rootUrl + 'api/tickets/delete_document', form, {headers : this.reqHeader});
  }

  /******* Quotation *********/

  updateCoverageOption(tId: string, hdId: string, coverageOption: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId +
    '&hd_id=' + hdId + '&coverage_option=' + coverageOption;
    return this.http.post(this.rootUrl + 'api/ticketsv3/update_coverage_option', form, {headers : this.reqHeader});
  }

  /************ Onsite ************/
  getCompanies() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.rootUrl + 'api/tickets/get_companies', form, {headers : this.reqHeader});
  }

  getOnsiteEnggs(site_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&site_type_id=' + site_id +
                '&user_id=' + localStorage.getItem('userId') + '&group_id=' + localStorage.getItem('userRole');
    return this.http.post(this.rootUrl + 'api/tickets/get_onsite_engineer', form, {headers : this.reqHeader});
  }

  assign_call(t_id: string, a_id: string, visitDate: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
                '&assigned_user_id=' + a_id + '&visit_date=' + visitDate;
    return this.http.post(this.rootUrl + 'api/tickets/assign_call', form, {headers : this.reqHeader});
  }

  /************ Analysis ************/
  uploadAnalysis(t_id: string | null, analysis: string | number | boolean) {
    analysis = encodeURIComponent(analysis);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id +
                '&user_id=' + localStorage.getItem('userId') + '&analysis=' + analysis;
    return this.http.post(this.rootUrl + 'api/tickets/analysis', form, {headers : this.reqHeader});
  }

  getAnalysis(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/tickets/get_analysis', form, {headers : this.reqHeader});
  }

  viewRaf(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/tickets/view_raf', form, {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  psfSubmit(t_id: string | null, remarks: string | number | boolean, feedback: string) {
    remarks = encodeURIComponent(remarks);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&emp_id=' + localStorage.getItem('userId') +
                '&user_id=' + localStorage.getItem('userId') + '&remarks=' + remarks + '&feedback=' + feedback;
    return this.http.post(this.rootUrl + 'api/mis/update_cc_feedback', form, {headers : this.reqHeader});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return new Error(
      'Something bad happened; please try again later.');
  }

  /************ window part detail ************/
  addPart(tId: string,partType:any, partNo: string, description:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + 
    '&ticket_id=' + tId + '&part_type=' + partType + '&part_no=' + partNo + '&description=' + description;
    return this.http.post(this.rootUrl + 'api/ticketsv3/windows_part', form, {headers : this.reqHeader});
  }

  getWinParts(tId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') +
    '&ticket_id=' + tId;
    return this.http.get(this.rootUrl + 'api/ticketsv3/win_parts?' + form, {headers : this.reqHeader});
  }
  //  getNotifications(data: string) {
  //   return this.http.post(this.rootUrl + 'api/tickets/get_notifications', data, { headers: this.reqHeader });
  // }
}

