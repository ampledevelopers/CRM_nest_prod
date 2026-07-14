import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TekneTicketdetailService {
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
  ticketList: any;
  constructor(private http: HttpClient) {
  }

  getData(ticket_type: any) {
    let tType;
    let sId;

    if (isNaN(ticket_type)) {
      tType = ticket_type;
      sId = 'undefined';
    } else {
      tType = 'undefined';
      sId = ticket_type;
    }
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&offset=' + 0 + '&limit=' + 2000 + '&user_id=' +
                  localStorage.getItem('userId') + '&status_id=' + sId + '&ticket_type=' + tType;
    return this.http.get(this.rootUrl + 'api/accy/get?' + form, {headers : this.reqHeader});

  }

  getStatusCount(ticket_type: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_type=' + ticket_type;
    return this.http.post(this.rootUrl + 'api/accy/get_status_count', form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/accy/get_options?' + form, {headers : this.reqHeader});
  }

  getTicketDetail(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + t_id;
    return this.http.get(this.rootUrl + 'api/accytickets/get_details?' + form, {headers : this.reqHeader});
  }

  checkTicketCount(ticket_type: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_type=' + ticket_type;
    return this.http.get(this.rootUrl + 'api/accy/get_count?' + form, {headers : this.reqHeader});
  }

  checkInvoiceId(rafId: string, invoice_id: string, rafDate: string, q_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&invoice_id=' + invoice_id + '&raf_no=' + rafId + '&raf_date=' + rafDate + '&quotation_id=' + q_id;
    return this.http.post(this.rootUrl + 'api/accy/validate_invoice', form, {headers : this.reqHeader});
  }

  issueToken(inputdata: string) {
    const reqHeader1 = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const form = 'user_id=' + localStorage.getItem('userId') + inputdata;
    return this.http.post(this.rootUrl + 'customer/token/generate_token', form, {headers : reqHeader1});
  }

  getDetail(id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/accy/get?' + form, {headers : this.reqHeader});
  }

  getAssignees(userId: any) {
    const form = '&user_id=' + userId;
    return this.http.post(this.nestUrl + 'tickets_v2/userlist', form, {headers : this.getHeaders()});
  }

  assignTicket(tId: string, assigned_user_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&assigned_user_id=' + assigned_user_id;
    return this.http.post(this.rootUrl + 'api/accytickets/assign_ticket', form, {headers : this.reqHeader});
  }

  navigateTo(id: string, branch: string, navTo: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&branch_code=' + branch +
                  '&navigate_to=' + navTo + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/accy/get?' + form, {headers : this.reqHeader});
  }


  getCustomerInfo(c_id: string, phone_no: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
                  '&site_type_id=' + localStorage.getItem('siteType') + '&c_id=' + c_id + '&phone=' + phone_no;
    return this.http.post(this.nestUrl + 'common/get_customer', form, {headers : this.getHeaders()});
  }

  /******* Diagnosis *********/

  saveServiceNotes(t_id: any, repair_hd: any, repair_dt: any, approval: any) {
    const diagnosisData: any = [];
    diagnosisData.push({
      'repair_hd': repair_hd,
      'repair_dt': repair_dt,
      'approval' : approval
    });
    const userToken: any= localStorage.getItem('userToken');
    const diagHeader: any = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True',
    'X-API-KEY': userToken });
    return this.http.post(this.rootUrl + 'api/accytickets/service_notes_save', JSON.stringify(diagnosisData), {headers : diagHeader});
  }

  getConsignment(ticket_id: any, branch_code: any, part_no: any, consignment_type: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + ticket_id + '&user_id=' + localStorage.getItem('userId') + '&branch_code=' + branch_code + '&part_no=' + part_no + '&consignment_type=' + consignment_type;
    return this.http.get(this.rootUrl + 'api/accytickets/get_consignment?' + form, {headers : this.reqHeader});
  }

  blockConsignment(ticket_id: any, asn_no: any, part_no: any, consignmentType: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + ticket_id + '&user_id=' + localStorage.getItem('userId') + '&consignment_asn_no=' + asn_no + '&consignment_type=' + consignmentType + '&part_no=' + part_no;
    return this.http.post(this.rootUrl + 'api/accytickets/block_consignment', form, {headers : this.reqHeader});
  }
   unblockConsignment(ticket_id: any, asn_no: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + ticket_id + '&user_id=' + localStorage.getItem('userId') + '&consignment_asn_no=' + asn_no ;
    return this.http.post(this.rootUrl + 'api/accytickets/unblock_consignment', form, {headers : this.reqHeader});
  }

  updatePartConsignment(t_id: string, asn_no: string, asn_type: any, flag: any, part_no: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&consignment_asn_no=' + asn_no + '&consignment_type=' + asn_type + '&from_consigned_stock=' + flag + '&part_number=' + part_no + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/accytickets/update_consignment', form, {headers : this.reqHeader});
  }

  deletePart(data: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/accytickets/delete_part', form, {headers : this.reqHeader});
  }

  checkPhysicalLocation(t_id: string, location: string, branch_code: string, family: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + branch_code + '&physical_location=' + location
                + '&ticket_id=' + t_id + '&product_family=' + family;
    return this.http.post(this.rootUrl + 'api/accytickets/check_physical_location', form, {headers : this.reqHeader});
  }

  /******* Timeline *********/

  timelineData(id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
    return this.http.post(this.rootUrl + 'api/accytickets/timeline', form, {headers : this.reqHeader});
  }

  getParts(serial_no: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no;
    return this.http.post(this.rootUrl + 'api/accytickets/parts_summary', form, {headers : this.reqHeader});
  }

  uploadPics(t_id: string, serial_no: string, docSize: string, doc: any, uploadType: string) {
    const documents = JSON.stringify(doc);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no + '&size=' + docSize + '&ticket_id=' + t_id + '&type=' + uploadType + '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/accy/upload_pic1', form, {headers : this.reqHeader});
  }

  uploadPopFile(popHeaders: { apptoken: any; cid: any; }, popUrl: string, binaryFile: any) {
    const popHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True',
                      'X-Apple-AppToken': popHeaders.apptoken, 'X-Apple-Gigafiles-Cid': popHeaders.cid});
    return this.http.post(popUrl, binaryFile, {headers : popHeader});
  }

  getComponent(ticket_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.post(this.rootUrl + 'api/accytickets/componentissue', form, {headers : this.reqHeader});
  }

  /******* Service Report *********/

  updateSvcRemarks(remarks: string, tId: string, hdId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&svc_remarks=' + encodeURIComponent(remarks) +
    '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId + '&hd_id=' + hdId;
    return this.http.post(this.rootUrl + 'api/accytickets/update_svc_remarks', form, {headers : this.reqHeader});
  }

  generateSVC(t_id: string, gsx: string, data: any) {
  const partData = JSON.stringify(data);
  const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
               gsx + '&data=' + partData;
  return this.http.post(this.rootUrl + 'api/tickets/genarate_svc', form, {headers : this.reqHeader});
  }

  generateSVCAuto(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/ticketsv3/generate_svc_auto', form, {headers : this.reqHeader});
  }

  getSVC(t_id: string | null) {
    const form = 'ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/svc_show', form, {headers : this.getHeaders()});
  }

  deleteSVC(t_id: string, svcid: string, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
    '&svc_id=' + svcid + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/ticketsv3/mark_svc_delete', form, {headers : this.reqHeader});
  }

  showSVC(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/accytickets/svc_print', form, {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  /************ Analysis ************/
  uploadAnalysis(t_id: string, analysis: string | number | boolean) {
    analysis = encodeURIComponent(analysis);
    const form =  '&ticket_id=' + t_id +
                '&user_id=' + localStorage.getItem('userId') + '&analysis=' + analysis;
    return this.http.post(this.nestUrl + 'ticketsv1/analysis', form, {headers : this.getHeaders()});
  }

  getAnalysis(t_id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/accytickets/get_analysis', form, {headers : this.reqHeader});
  }

  viewRaf(t_id: string) {
    const form =  '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'itickets/view_raf', form, {headers : this.getHeaders(), responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  viewEnquiry(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.get(this.rootUrl + 'api/accy/view_enquiry?'+ form, {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  sendRAF(id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id ;
    return this.http.post(this.rootUrl + 'api/Accytickets/send_raf_mail', form, {headers : this.reqHeader});
  }

  /************ Notifications ************/

  getNotification(ticketId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.get(this.rootUrl + 'api/ticketsv3/notifications?' + form, {headers : this.reqHeader});
  }

  getMsgNotification(ticketId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.get(this.rootUrl + 'api/message/get_notifications?' + form, {headers : this.reqHeader});
  }

  getExceptionApprovers(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId ;
    return this.http.post(this.rootUrl + 'api/accytickets/get_exception_approvers', form, { headers: this.reqHeader });
  }

  getExceptionOTP(ticketId: any, exceptionUser: any, branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&exception_user=' +  exceptionUser + '&branch_code=' + 'IUB';
    return this.http.post(this.rootUrl + 'api/accytickets/send_exception_otp', form, { headers: this.reqHeader });
  }

  updateException(ticketId: any, exceptionUser: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&exception_user=' +  exceptionUser;
    return this.http.post(this.rootUrl + 'api/accytickets/update_exception', form, { headers: this.reqHeader });
  }

  validateL1POP(ticketId: any, invoice_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&l1_invoice_id=' +  invoice_id;
    return this.http.post(this.rootUrl + 'api/accytickets/update_l1_invoice_no', form, { headers: this.reqHeader });
  }

  approveL1(ticketId: any,  hd_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/accytickets/approve_l1', form, { headers: this.reqHeader });
  }

  rejectL1(ticketId: any,  hd_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/accytickets/reject_l1', form, { headers: this.reqHeader });
  }

  sendForQc(ticketId: any, selectedOption: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&selected_option=' + selectedOption;
    return this.http.post(this.rootUrl + 'api/accytickets/send_for_qc', form, { headers: this.reqHeader });
  }

  approveQc(ticketId: string, hdId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId')
    + '&ticket_id=' + ticketId + '&hd_id=' + hdId;
    return this.http.post(this.rootUrl + 'api/accytickets/qc_approve_decline', form, {headers : this.reqHeader});
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
    return throwError(()=>
      'Something bad happened; please try again later.');
  }
}
