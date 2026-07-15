import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { map, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { CheckList } from './ticketdetail/ticketdetail.component';
import { ApproveReject } from './ticketdetail/ticketdetail.component';
@Injectable()
export class DashboardService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
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
   /*    tType = 'undefined';
      sId = ticket_type; */
      tType = ticket_type;
      sId = 'undefined';
    } else {
     /*  tType = ticket_type;
      sId = 'undefined'; */
      tType = 'undefined';
      sId = ticket_type;
    }
    const form = 'offset=' + 0 + '&limit=' + 2000 + '&user_id=' +
                  localStorage.getItem('userId') + '&status_id=' + sId + '&ticket_type=' + tType;
    return this.http.get(this.nestUrl + 'common/get?' + form, {headers : this.getHeaders()});

  }

  getStatusCount(ticket_type: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_type=' + ticket_type;
    return this.http.post(this.rootUrl + 'api/tickets/get_status_count', form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get_options?' + form, {headers : this.getHeaders()});
  }

  getTicketDetail(t_id: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + t_id;
    return this.http.get(this.nestUrl + 'tickets_v2/get_details?' + form, {headers : this.getHeaders()});
  }

  checkTicketCount(ticket_type: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_type=' + ticket_type;
    return this.http.get(this.rootUrl + 'api/tickets/get_count?' + form, {headers : this.reqHeader});
  }

  /* checkInvoiceId(rafId: string, invoice_id: string, rafDate: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&invoice_id=' + invoice_id + '&raf_no=' + rafId + '&raf_date=' + rafDate;
    return this.http.post(this.rootUrl + 'api/tickets/validate_invoice', form, {headers : this.reqHeader});
  } */

  checkInvoiceId(rafId: string, invoice_id: string, rafDate: string, q_id: any) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&invoice_id=' + invoice_id + '&raf_no=' + rafId + '&raf_date=' + rafDate + '&quotation_id=' + q_id;
    return this.http.post(this.nestUrl + 'tickets_v2/validate_invoice', form, {headers : this.getHeaders()});
  }

  getGsxInvoice(ticketId: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.get(this.nestUrl + 'tickets_v2/get_gsx_invoice?' + form, {headers : this.getHeaders()});
  }

  /** Saves Payment Summary refund / status dropdown (backend: ticketsv4/update_payment_summary_status) */
  updatePaymentSummaryRefundStatus(ticketId: string, refundStatus: string, refundDate: string, refundUtr: string, refundValue: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&ticket_id=' + encodeURIComponent(ticketId) +
      '&refund_status=' + encodeURIComponent(refundStatus || '') +
      '&refund_date=' + encodeURIComponent(refundDate || '') +
      '&refund_utr=' + encodeURIComponent(refundUtr || '') +
      '&refund_value=' + encodeURIComponent(refundValue || '');
    return this.http.post(this.rootUrl + 'api/ticketsv4/update_payment_summary_status', form, {headers : this.reqHeader});
  }

  validateAdvance(rafId: string, invoice_id: string, rafDate: string, q_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&invoice_id=' + invoice_id + '&raf_no=' + rafId + '&raf_date=' + rafDate + '&quotation_id=' + q_id;
    return this.http.post(this.rootUrl + 'api/bill/validate_advance', form, {headers : this.reqHeader});
  }

  pudInvoiceIdCheck(rafId: string, invoice_id: string, rafDate: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&invoice_id=' + invoice_id + '&raf_no=' + rafId + '&raf_date=' + rafDate;
    return this.http.post(this.nestUrl + 'tickets_v2/validate_invoice', form, {headers : this.getHeaders()});
  }

  issueToken(inputdata: string) {
    const reqHeader1 = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const form = 'user_id=' + localStorage.getItem('userId') + inputdata;
    return this.http.post(this.rootUrl + 'customer/token/generate_token', form, {headers : reqHeader1});
  }

  reGenerateToken(tokenNo: string, branchCode: string, priorityType: string, priorityRemarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&token_no=' + tokenNo + '&branch_code=' + branchCode +
    '&priority_type=' + priorityType + '&priority_remarks=' + priorityRemarks;
    return this.http.post(this.rootUrl + 'api/ticketsv3/update_token_priority', form, {headers : this.reqHeader});
  }

  getCustomerInfo(c_id: string, phone_no: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
                  '&site_type_id=' + localStorage.getItem('siteType') + '&c_id=' + c_id + '&phone=' + phone_no;
    return this.http.post(this.nestUrl + 'common/get_customer', form, {headers : this.getHeaders()});
  }

  getCompany(t_id: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'tickets_v2/get_company', form, {headers : this.getHeaders()});
  }

  checkRules(data: string) {
    const form = data + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'tickets_v2/check_rules', form, {headers : this.getHeaders()});
  }

  statusUpdate(data: string, remark: string | number | boolean, requiredfields: any[]) {
    remark = encodeURIComponent(remark);
    const inputdata = JSON.stringify(requiredfields);
    const form = 'user_id=' + localStorage.getItem('userId') + data +
                '&remarks=' + remark + '&data=' + inputdata;
    return this.http.post(this.nestUrl + 'ticket_edit/change_status', form, {headers : this.getHeaders()});
  }

  acceptTicket(id: string) {
    const form ='&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + id;
    return this.http.post(this.nestUrl + 'tickets_v2/accept', form, {headers : this.getHeaders()});
  }

  releaseTicket(id: string, remark: string | number | boolean) {
    remark = encodeURIComponent(remark);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + id +
    '&remarks=' + remark;
    return this.http.post(this.rootUrl + 'api/tickets/release', form, {headers : this.reqHeader});
  }

  getDetail(id: string | null) {
    const form = 'ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get?' + form, {headers : this.getHeaders()});
  }

  getAssignees(userId: any) {
    const form = '&user_id=' + userId;
    return this.http.post(this.nestUrl + 'tickets_v2/userlist', form, {headers : this.getHeaders()});
  }

  assignTicket(tId: string, assigned_user_id: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + tId + '&assigned_user_id=' + assigned_user_id;
    return this.http.post(this.nestUrl + 'tickets_v2/assign_ticket', form, {headers : this.getHeaders()});
  }

  navigateTo(id: string, branch: string, navTo: string) {
    const form = 'ticket_id=' + id + '&branch_code=' + branch +
                  '&navigate_to=' + navTo + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get?' + form, {headers : this.getHeaders()});
  }

  qcRequest(ticketId: string, hdId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticketId + '&hd_id=' + hdId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/send_for_qc', form, {headers : this.reqHeader});
  }

  qcProcess(ticketId: string, hdId: string, status: string, review: string, deliveryType: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&delivery_type=' + deliveryType + '&ticket_id=' + ticketId + '&hd_id=' + hdId + '&qc_status=' + status + '&qc_declined_remarks=' + review;
    return this.http.post(this.rootUrl + 'api/ticketsv3/qc_approve_decline', form, {headers : this.reqHeader});
  }

  closeTicket(ticketId: string, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticketId + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/ticketsv3/close_ticket', form, {headers : this.reqHeader});
  }

  repairEligibility(serialNo: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&serial_no=' + serialNo;
    return this.http.post(this.nestUrl + 'gsxapi/repair_eligibility', form, {headers : this.getHeaders()});
  }

  repairEligibilityFull(tId: string, hdId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId +
    '&hd_id=' + hdId;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_eligibility_full', form, {headers : this.reqHeader});
  }

  KDOptionUpdate(ticketId: string, kd_status: string) {
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

  deviceAwayOTP(mobile: string, email: string, tId: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&mobile=' + mobile +
    '&email=' + email + '&ticket_id=' + tId;
    return this.http.post(this.nestUrl + 'tickets_v2/device_away_otp', form, {headers : this.getHeaders()});
  }

  markDeviceAway(tId: string, otp: string, mobile: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId +
    '&device_away_status=' + 'AWAY' + '&device_away_otp=' + otp + '&mobile=' + mobile;
    return this.http.post(this.rootUrl + 'api/ticketsv3/mark_device_away', form, {headers : this.reqHeader});
  }

  deviceReturnForm(formData: CheckList, tId: string) {
    const formdetails = JSON.stringify(formData);
    const form = '&user_id=' + localStorage.getItem('userId') + '&json=' + formdetails
    + '&ticket_id=' + tId;
    return this.http.post(this.nestUrl + 'tickets_v2/device_away_return_checklist', form, {headers : this.reqHeader});
  }

  /******* Diagnosis *********/

  getGSXDiagnosis(serialNo: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&serial_no=' + serialNo +
    '&suit_id=' + '';
    return this.http.post(this.nestUrl + 'gsxapi/diagnostics_lookup', form, {headers : this.getHeaders()});
  }

  checkPartSerialNo(tId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/check_display_repair', form, {headers : this.reqHeader});
  }

  kbbImageSerialVerify(tId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/verify_kbb_display_sr_no', form, {headers : this.reqHeader});
  }

  checkKbbInputType(partNo: string, ticketId: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&part_no=' + partNo + '&ticket_id=' + ticketId;
    return this.http.get(this.nestUrl + 'tickets_v2/kbb_entry_type?' + form, {headers : this.getHeaders()});
  }

  saveDiagnosis(t_id: any, repair_hd: any, repair_dt: any, QA: any) {
    const diagnosisData: any = [];
    diagnosisData.push({
      'repair_hd': repair_hd,
      'repair_dt': repair_dt,
      'questions': QA
    });
    const userToken: any= localStorage.getItem('userToken');
    const diagHeader: any = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True',
    'X-API-KEY': userToken });
    return this.http.post(this.rootUrl + 'api/ticketsv3/diagnosis_save', JSON.stringify(diagnosisData), {headers : diagHeader});
  }

  diagnosisStatusChange(t_id: string, repairStage: string, hd_id: string, remarks: string, popReview: string, opfNo: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
    '&repair_stage=' + repairStage + '&hd_id=' + hd_id + '&l2_remarks=' + remarks + '&pop_review_hold=' + popReview + '&opf_ref_no=' + opfNo;
    return this.http.post(this.rootUrl + 'api/ticketsv3/diagnosis_stage_update_v1', form, {headers : this.reqHeader});
  }

  declinedGRepairs(t_id: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id;
    return this.http.get(this.nestUrl + 'tickets_v2/get_declined_repairs?' + form, {headers : this.getHeaders()});
  }

  checkConsumablesRequired(t_id: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id;
    return this.http.get(this.nestUrl + 'tickets_v2/check_consumable_required?' + form, {headers : this.getHeaders()});
  }

  viewImage(serial_no: string, t_id: string) {
    const form = '&serial_no=' + serial_no + '&ticket_id=' + t_id;
    return this.http.get(this.nestUrl + 'ticketsv1/get_device_image?' + form, {headers : this.getHeaders()});
  }

  deleteImage(id: string, t_id: string) {
    const form = '&id=' + id + '&user_id=' + localStorage.getItem('userId')  + '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'tickets_v2/image_delete', form, {headers : this.getHeaders()});
  }

  getConsignment(asn_no: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&asn_no=' + asn_no;
    return this.http.get(this.rootUrl + 'api/ticketsv3/consignment_asn?' + form, {headers : this.reqHeader});
  }

  consignmentBlock(t_id: string, asn_no: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&asn_no=' + asn_no + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/consignment_validate', form, {headers : this.reqHeader});
  }

  updatePartConsignment(t_id: string, asn_no: string, asn_type: any, flag: any, part_no: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&consignment_asn_no=' + asn_no + '&consignment_type=' + asn_type + '&from_consigned_stock=' + flag + '&part_number=' + part_no + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/ticketsv3/update_consignment', form, {headers : this.reqHeader});
  }

  getRepairStages() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.get(this.rootUrl + 'api/ticketsv3/repair_stage?' + form, {headers : this.reqHeader});
  }

  changeBinManually(t_id: string, toStatus: string, invoice_id: string, invoiceDate: string | null, amount: string) {
    const form = '&ticket_id=' + t_id + '&next_status=' + toStatus + '&user_id=' + localStorage.getItem('userId') + '&invoice_id=' + invoice_id
    + '&invoice_date=' + invoiceDate + '&amount=' + amount;
    return this.http.post(this.nestUrl + 'tickets_v2/ticket_status_change', form, {headers : this.getHeaders()});
  }

  changeBinOthersManually(t_id: string, toStatus: string, remarks: string) {
    const form = '&ticket_id=' + t_id + '&next_status=' + toStatus + '&user_id=' + localStorage.getItem('userId') + '&remarks=' + remarks;
    return this.http.post(this.nestUrl + 'tickets_v2/ticket_status_change_other', form, {headers : this.getHeaders()});
  }

  repairStagesUpdate(t_id: string, repairStage: string, hd_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
    '&repair_stage=' + repairStage + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/ticketsv3/repair_stage_manual_change', form, {headers : this.reqHeader});
  }

  changeBinOnly(t_id: string, toStatus: string, remarks: string) {
    const form = '&ticket_id=' + t_id + '&next_status=' + toStatus + '&user_id=' + localStorage.getItem('userId') + '&remarks=' + remarks;
    return this.http.post(this.nestUrl + 'tickets_v2/change_status_only', form, {headers : this.getHeaders()});
  }

  movetoDiagnosis(t_id: string, reason: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
    '&remarks=' + reason;
    return this.http.post(this.rootUrl + 'api/ticketsv3/rfpu_to_diagnosis', form, {headers : this.reqHeader});
  }

  consumableStockInOut(data: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'tickets_v2/consumable_transaction', form, {headers : this.getHeaders()});
  }

  addAdditionalPart(tid: any, gsxId: any, hdId: any, data: any) {
    const diagnosisData: any = [];
    diagnosisData.push({
      'ticket_id': tid,
      'repairId': gsxId,
      'hd_id': hdId,
      'repair_dt': data
    });
    const userToken: any=localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True', 'X-API-KEY':userToken });
    return this.http.post(this.nestUrl + 'tickets_v2/additional_part_add', JSON.stringify(diagnosisData), {headers : this.getHeaders()});
  }

  appendRCParts(tid: any, gsxId: any, hdId: any, data: any) {
    const diagnosisData: any = [];
    diagnosisData.push({
      'ticket_id': tid,
      'repairId': gsxId,
      'hd_id': hdId,
      'repair_dt': data
    });
    const userToken: any= localStorage.getItem('userToken');
    const diagHeader: any = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True',
    'X-API-KEY': userToken });
    return this.http.post(this.nestUrl + 'tickets_v2/rc_requote_part_add', JSON.stringify(diagnosisData), {headers : this.getHeaders()});
  }

  additionalPartsForSVC(tid: any, gsxId: any, hdId: any, data: any) {
    const diagnosisData: any = [];
    diagnosisData.push({
      'ticket_id': tid,
      'repairId': gsxId,
      'hd_id': hdId,
      'repair_dt': data
    });
    const userToken: any=localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True', 'X-API-KEY':userToken });
    return this.http.post(this.nestUrl + 'tickets_v2/part_add', JSON.stringify(diagnosisData), {headers : this.getHeaders()});
  }

  deleteAdditionalPart(tId: string, hd_id: string, partNo: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId +
    '&hd_id=' + hd_id + '&part_number=' + partNo;
    return this.http.post(this.nestUrl + 'tickets_v2/additional_part_delete', form, {headers : this.getHeaders()});
  }

  gsxRepairUpdate(formData: string, parts: any) {
    const additionalParts = JSON.stringify(parts);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + formData;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
  }

  getEscalationDetails(id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&escalation_id=' + id;
    return this.http.post(this.rootUrl + 'api/gsxapi/escalation_details', form, {headers : this.reqHeader});

  }

   /******* Details *********/

  updateProductName(t_id: string, product: string) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&product_name=' + product;
  return this.http.post(this.rootUrl + 'api/tickets/product_name_update', form, {headers : this.reqHeader});
  }

  updateWarrantyStatus(t_id: string, warranty: string) {
    const form = '&ticket_id=' + t_id + '&warranty_status=' + warranty;
    return this.http.post(this.nestUrl + 'ticketsv1/warranty_status_update', form, {headers : this.getHeaders()});
  }

  conditionDevice(t_id: string, condition: string | number | boolean) {
    condition = encodeURIComponent(condition);
    const form = '&ticket_id=' + t_id + '&condition_of_device=' + condition;
    return this.http.post(this.nestUrl + 'tickets_v2/device_condition_update', form, {headers : this.getHeaders()});
  }

  checkPhysicalLocation(t_id: string, location: string, branch_code: string, family: string) {
    const form = '&branch_code=' + branch_code + '&physical_location=' + location
                + '&ticket_id=' + t_id + '&product_family=' + family;
    return this.http.post(this.nestUrl + 'tickets_v2/check_physical_location', form, {headers : this.getHeaders()});
  }

  /******* Timeline *********/

  timelineData(id: string | null) {
    const form = '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
    return this.http.post(this.nestUrl + 'tickets_v2/timeline', form, {headers : this.getHeaders()});
  }

  /******* Documents *********/

  getDocuments(id: string | null) {
    const form = '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
    return this.http.post(this.nestUrl + 'tickets_v2/get_documents', form, {headers : this.getHeaders()});
  }

  uploadDocuments(id: string, docs: any) {
    const documents = JSON.stringify(docs);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/tickets/uploads', form, {headers : this.reqHeader});
  }

  deleteDocument(id: string, ticket_id: string) {
    const form = '&id=' + id + '&ticket_id=' + ticket_id;
    return this.http.post(this.nestUrl + 'tickets_v2/delete_document', form, {headers : this.getHeaders()});
  }

  /************ G-Drive ************/

  getDriveFiles(ticket_id: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.nestUrl + 'ticket_edit/gdrive_image?' + form, {headers : this.getHeaders()});
  }

  /******* Quotation *********/

  quotationRefUpdate(t_id: string, rafNo: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&quotation_ref_no=' + rafNo +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/quotation_ref', form, {headers : this.reqHeader});
  }

  quotationDraft(id: string, hd_id: string, serviceCharge: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&hd_id=' + hd_id + '&user_id=' + localStorage.getItem('userId') +
    '&service_charge=' + serviceCharge;
    return this.http.post(this.rootUrl + 'api/ticketsv3/quotation_draft', form, {headers : this.reqHeader});
  }

  rcQuotationDraft(id: string, hd_id: string, serviceCharge: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&hd_id=' + hd_id + '&user_id=' + localStorage.getItem('userId') +
    '&service_charge=' + serviceCharge;
    return this.http.post(this.rootUrl + 'api/ticketsv3/rc_quotation_draft', form, {headers : this.reqHeader});
  }

  getQuotation(id: string | null) {
    const form =  '&ticket_id=' + id;
    return this.http.post(this.nestUrl + 'tickets_v2/get_quotations', form, {headers : this.getHeaders()});
  }

  getPartPrice(part_number: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&part_no=' + part_number;
    return this.http.post(this.rootUrl + 'api/tickets/get_part_price', form, {headers : this.reqHeader});
  }

  generateQuotation(data: string) {
const form = '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.nestUrl + 'tickets_v2/generate_quotation', form, {headers : this.getHeaders()});
  }

  generateRCQuotation(data: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + data;
        return this.http.post(this.nestUrl + 'tickets_v2/generate_rc_quotation', form, {headers : this.getHeaders()});
  }

  updateCoverageOption(tId: string, hdId: string, coverageOption: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId +
    '&hd_id=' + hdId + '&coverage_option=' + coverageOption;
    return this.http.post(this.rootUrl + 'api/ticketsv3/update_coverage_option', form, {headers : this.reqHeader});
  }

  viewQuotation(id: string, qid: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&quotation_id=' + qid;
    return this.http.post(this.rootUrl + 'api/tickets/view_quotation', form, {headers : this.reqHeader});
  }

  approveRejectQuote(id: string, approveReject: ApproveReject, status_id: string) {
    const form = '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                  '&approval_status=' + approveReject.tag + '&quotation_id=' + approveReject.id + '&status_id=' + status_id;
    return this.http.post(this.nestUrl + 'tickets_v2/approve_quotation', form, {headers : this.getHeaders()});
  }

  quotationStatusCheck(tId: string, qId: string, transId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + tId + '&user_id=' + localStorage.getItem('userId') +
    '&transaction_id=' + transId + '&quotation_id=' + qId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/get_paynow_status', form, {headers : this.reqHeader});
  }

  resendQuotation(id: string, qid: string) {
    const form = '&ticket_id=' + id + '&quotation_id=' + qid
    + '&user_id=' + localStorage.getItem('userId') + '&type=' + 'resend';
    return this.http.post(this.nestUrl + 'tickets_v2/resend_approved_quotation', form, {headers : this.getHeaders()});
  }

  downloadQuotation(id: string, qid: string) {
    const form = '&ticket_id=' + id + '&quotation_id=' + qid
    + '&user_id=' + localStorage.getItem('userId') + '&type=' + 'download';
    return this.http.post(this.nestUrl + 'tickets_v2/resend_approved_quotation', form,
    {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
    return new Blob([res], { type: 'application/pdf', });
    }));
  }

  deleteQuotation(ticketId: string, qid: string) {
    const form = '&ticket_id=' + ticketId + '&quotation_id=' + qid
    + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'tickets_v2/update_quote_status', form, {headers : this.getHeaders()});
  }

  checkRepairQuestion(tId: string, hd_id: string) { /* questions */
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_questions_v2', form, {headers : this.reqHeader});
  }

  updateGSXReQuoteStatus(repairType: string, repair_id: string, repair_status: string, ticketId: string, quoteId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&update_type=' + 'UpdateRepairStatus' + '&repair_id=' + repair_id +
    '&repair_type=' + repairType + '&repair_status=' + repair_status + '&ticket_id=' + ticketId + '&quotation_id=' + quoteId;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
   }

   appleDeclineReturn(t_id: string, rerepair: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') + '&re-repair=' + rerepair;
    return this.http.post(this.nestUrl + 'tickets_v2/manage_apple_declined_repair', form, {headers : this.getHeaders()});
   }

   reQuoteNonEbs(t_id: string, invoiceId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') + '&invoice_id=' + invoiceId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/requote_non_ebs', form, {headers : this.reqHeader});
   }

   checkiPadHighConfig(config: string | number | boolean, desc: string | number | boolean) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&product_config=' + encodeURIComponent(config) + '&product_description=' + encodeURIComponent(desc);
    return this.http.post(this.nestUrl + 'tickets_v2/mail_in_products', form, {headers : this.getHeaders()});
   }

   csCodeURDUpdate(tId: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.nestUrl + 'tickets_v2/urd_update', form, {headers : this.getHeaders()});
   }

   updateUrdPayment(tId: any) {
    console.log("Service");
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.nestUrl + 'ticketsv1/urd_paymentdate_update', form, {headers : this.getHeaders()});
   }

  /******* GSX Repair *********/

  repairCreateAck(t_id: string, ack_id: string, ack_val: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
      '&action_ack_id=' + ack_id + '&ack_value=' + ack_val;
    return this.http.post(this.rootUrl + 'api/gsxapi/update_action_ack', form, { headers: this.reqHeader });
  }

  repairCreateDraft(t_id: string, hd_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
      '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_create_draft', form, { headers: this.reqHeader });
  }

  repairCreateAuto(t_id: string, repairStage: string, hd_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
      '&repair_stage=' + repairStage + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_create_auto', form, { headers: this.reqHeader });
  }

  repairCreateNTF(t_id: string, repairStage: string, hd_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
      '&repair_stage=' + repairStage + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_create_ntf', form, { headers: this.reqHeader });
  }

  repairCreateSCR(t_id: string, hd_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id +
      '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_create_scr', form, { headers: this.reqHeader });
  }

  checkGSXStatus() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/ticketsv3/gsx_status?' + form, {headers : this.reqHeader});
  }

  getProduct(serial_no: string, tId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no + '&ticket_id=' + tId;
    return this.http.post(this.rootUrl + 'api/gsxapi/get_product_details', form, {headers : this.reqHeader});
  }
  getRepair (r_id: string, t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&repair_id=' + r_id + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/tickets/get_repair', form, {headers : this.reqHeader});
  }

  getParts(serial_no: string) {
    const form =   '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no;
    return this.http.post(this.nestUrl + 'gsxapi/parts_summary', form, {headers : this.getHeaders()});
  }

  getPartsRetry(serial_no: string) {
    const form =   '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no;
    return this.http.post(this.nestUrl + 'gsxapi/parts_summary_refresh', form, {headers : this.getHeaders()});
  }

  getACSParts() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'tickets_v2/get_acs_parts?' + form, {headers : this.getHeaders()});
  }

  getInsuranceParts() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/ticketsv3/get_insurance_parts?' + form, {headers : this.reqHeader});
  }

  uploadPics(t_id: string, serial_no: string, docSize: string, doc: any, uploadType: string) {
    const documents = JSON.stringify(doc);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no + '&size=' + docSize + '&ticket_id=' + t_id + '&type=' + uploadType + '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/gsxapi/upload_pic2', form, {headers : this.reqHeader});
  }

  uploadAccess(serial_no: string, docSize: string, docName: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + serial_no + '&size=' + docSize + '&filename=' + docName;
    return this.http.post(this.rootUrl + 'api/gsxapi/attachment_upload_access', form, {headers : this.reqHeader});
  }

  uploadPopFile(popHeaders: { apptoken: any; cid: any; }, popUrl: string, binaryFile: any) {
    const popHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True',
                      'X-Apple-AppToken': popHeaders.apptoken, 'X-Apple-Gigafiles-Cid': popHeaders.cid});
    return this.http.post(popUrl, binaryFile, {headers : popHeader});
  }

  getComponent(serial_no: string) {
    const form =  '&user_id=' + localStorage.getItem('userId') + '&serial_no=' + serial_no;
    return this.http.post(this.nestUrl + 'gsxapi/componentissue', form, {headers : this.getHeaders()});
    /* get_component_code */
  }

  getComponentRetry(serial_no: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&serial_no=' + serial_no;
    return this.http.post(this.rootUrl + 'api/gsxapi/componentissue_refresh', form, {headers : this.reqHeader});
  }

  getRepairDetail(repairId: string, t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&repair_id=' + repairId +
    '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_details', form, {headers : this.reqHeader});
  }

  getBlueDartTracking(trackNumber: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&tracking_no=' + trackNumber +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_shipping_tracking', form, {headers : this.reqHeader});
   }

   checkCinKgbPart(t_id: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'tickets_v2/check_whole_unit_repair', form, {headers : this.getHeaders()});
   }

   updateKgbDetails(data: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
   }

   getGsxStatusCode() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/get_repair_status', form, {headers : this.reqHeader});
   }

   applyGPRDOA(data: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
   }

   updateTechnicianNotes(techNotes: string | number | boolean, repairId: string, ticketId: string, repairType: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&technician_notes=' + encodeURIComponent(techNotes) +
    '&repair_id=' + repairId + '&update_type=' + 'UpdateTechnicianNotes' + '&ticket_id=' + ticketId + '&repair_type=' + repairType;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
   }

   updateGSXStatus(repairType: string, repair_id: string, repair_status: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&update_type=' + 'UpdateRepairStatus' + '&repair_id=' + repair_id +
    '&repair_type=' + repairType + '&repair_status=' + repair_status;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
   }

   updateGSXStatusDcall(repairType: string, repair_id: string, repair_status: string, partDate: any, repairDate: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&update_type=' + 'UpdateRepairStatus' + '&repair_id=' + repair_id +
    '&repair_type=' + repairType + '&repair_status=' + repair_status + '&service_completion_date=' + repairDate + '&onsite_arrival_date=' + partDate;
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_update', form, {headers : this.reqHeader});
   }

   closeReviveRepair(ticketId: string) {
    const form =  '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.nestUrl + 'tickets_v2/close_revive_repair', form, {headers : this.getHeaders()});
   }

   inboxLetterDownload(repairId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&doc_type=' + 'inboxLetter'
    + '&repair_id=' + repairId; //G610358399
    return this.http.post(this.rootUrl + 'api/gsxapi/document_download', form, {headers : this.reqHeader});
  }

  /******* Service Report *********/

  updateSvcRemarks(remarks: string, tId: string, hdId: string) {
    const form = '&svc_remarks=' + encodeURIComponent(remarks) +
    '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId + '&hd_id=' + hdId;
    return this.http.post(this.nestUrl + 'ticketsv1/update_svc_remarks', form, {headers : this.getHeaders()});
  }

  generateSVC(t_id: string, gsx: string, data: any) {
  const partData = JSON.stringify(data);
  const form = '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
               gsx + '&data=' + partData;
  return this.http.post(this.nestUrl + 'tickets_v2/genarate_svc', form, {headers : this.getHeaders()});
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
    const form = '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
    '&svc_id=' + svcid + '&remarks=' + remarks;
    return this.http.post(this.nestUrl + 'tickets_v2/mark_svc_delete', form, {headers : this.getHeaders()});
  }

  getRepairDetails(r_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&repair_id=' + r_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_audit_details', form, {headers : this.reqHeader});
  }

  printReturnLabel(r_id: any, sqNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&repair_id=' + r_id + '&user_id=' + localStorage.getItem('userId') +
    '&sequence_number=' + sqNo + '&doc_type=' + 'CI_ON_REPAIR_RETURN_KBB';
    return this.http.post(this.rootUrl + 'api/gsxapi/document_download', form,
    {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
    return new Blob([res], { type: 'application/pdf', });
    }));
  }

  showSVC(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/svc_print', form, {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  generateOTPforDelivery(mobile: string, email: string, tId: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&mobile=' + mobile +
    '&email=' + email + '&ticket_id=' + tId;
    return this.http.post(this.nestUrl + 'tickets_v2/device_home_delivery_otp', form, {headers : this.getHeaders()});
  }

  /* validateDeliveryOTP(tID, mobile, otp) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&customer_phone_no=' + mobile +
    '&home_delivery_otp=' + otp + '&ticket_id=' + tID;
    return this.http.post(this.rootUrl + 'api/ticketsv3/check_home_delivery_otp', form, {headers : this.reqHeader});
  } */

  submitHomeDelivery(id: string, docs: any, mobile: string, otp: string) {
    const documents = JSON.stringify(docs);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    const response1 =  this.http.post(this.rootUrl + 'api/tickets/uploads', form, {headers : this.reqHeader});

    const form1 = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&mobile=' + mobile +
    '&home_delivery_otp=' + otp + '&ticket_id=' + id;
    const response2 = this.http.post(this.rootUrl + 'api/ticketsv3/check_home_delivery_otp', form1, {headers : this.reqHeader});

    return forkJoin([response1, response2]);
  }

  /************ Onsite ************/
  getCompanies() {
    // const form = 'X_API_KEY=' + localStorage.getItem('userToken');
    return this.http.post(this.nreportUrl + 'common/get_companies', '', {headers : this.getHeaders()});
  }

  getOnsiteEnggs(site_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&site_type_id=' + site_id +
                '&user_id=' + localStorage.getItem('userId') + '&group_id=' + localStorage.getItem('userRole');
    return this.http.post(this.rootUrl + 'api/tickets/get_onsite_engineer', form, {headers : this.reqHeader});
  }

  assign_call(t_id: string, a_id: string, visitDate: string | null) {
    const form = '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
                '&assigned_user_id=' + a_id + '&visit_date=' + visitDate;
    return this.http.post(this.nestUrl + 'tickets_v2/assign_call', form, {headers : this.getHeaders()});
  }

  updatePendingStatus(t_id: string, type: string, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
                '&pending_type=' + type + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/tickets/ticket_pending_type_update', form, {headers : this.reqHeader});
  }

  requestQuote(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/ticketsv3/diagnosis_completed', form, {headers : this.reqHeader});
  }

  updateQuotaion(docs: any, t_id: string, rafNo: string) {
    const documents = JSON.stringify(docs);
    /* const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    const response1 =  this.http.post(this.rootUrl + 'api/tickets/uploads', form, {headers : this.reqHeader}); */

    const form1 = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&quotation_ref_no=' + rafNo +
    '&user_id=' + localStorage.getItem('userId');
    const response2 = this.http.post(this.rootUrl + 'api/tickets/quotation_ref', form1, {headers : this.reqHeader});

    return response2;
    // return forkJoin([response1, response2]);
  }

  saveOpfRef(t_id: string, opfNo: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&opf_ref_no=' + opfNo +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/opf_ref', form, {headers : this.reqHeader});
  }

  DeliveryToCustomer(tId: string, details: { name: string; mode: string; dateTime: string; }) {
    const form = '&ticket_id=' + tId + '&delivery_person_name=' + details.name +
    '&user_id=' + localStorage.getItem('userId') + '&transport_mode=' + details.mode + '&date=' + details.dateTime;
    return this.http.post(this.nestUrl + '/tickets_v2/dc_generated', form, {headers : this.getHeaders()});
  }

  /************ Analysis ************/
  uploadAnalysis(t_id: string, analysis: string | number | boolean) {
    analysis = encodeURIComponent(analysis);
    const form =  '&ticket_id=' + t_id +
                '&user_id=' + localStorage.getItem('userId') + '&analysis=' + analysis;
    return this.http.post(this.nestUrl + 'ticketsv1/analysis', form, {headers : this.getHeaders()});
  }

  getAnalysis(t_id: string | null) {
    const form = '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'ticketsv1/get_analysis', form, {headers : this.getHeaders()});
  }

  viewRaf(t_id: string) {
    const form = '&ticket_id=' + t_id;
    return this.http.post(this.nestUrl + 'itickets/view_raf', form, {headers : this.getHeaders(), responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  viewEnquiry(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.get(this.rootUrl + 'api/tickets/view_enquiry?'+ form, {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
      return new Blob([res], { type: 'application/pdf', });
    }));
  }

  sendRAF(id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id ;
    return this.http.post(this.rootUrl + 'api/tickets/send_raf_mail', form, {headers : this.reqHeader});
  }

  psfSubmit(t_id: string, remarks: string | number | boolean, feedback: string) {
    remarks = encodeURIComponent(remarks);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&emp_id=' + localStorage.getItem('userId') +
                '&user_id=' + localStorage.getItem('userId') + '&remarks=' + remarks + '&feedback=' + feedback;
    return this.http.post(this.rootUrl + 'api/mis/update_cc_feedback', form, {headers : this.reqHeader});
  }

  /************ Payments ************/
    // Comment it for POS invoice validation
  // getPaymentDetails(rafNo: string, raf_date: string) {
    /* SCK30084 2020-02-05*/
   /*  const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&raf_no=' + rafNo + '&raf_date=' + raf_date;
    return this.http.post(this.rootUrl + 'api/tickets/get_invoice', form, {headers : this.reqHeader});
  } */

  // Uncomment it for POS invoice validation
  getPaymentDetails(rafNo: string, raf_date: string, ticket_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&raf_no=' + rafNo + '&raf_date=' + raf_date + '&ticket_id=' + ticket_id;
    return this.http.get(this.rootUrl + 'api/bill/get_invoice?' + form, {headers : this.reqHeader});
  }


  /************ Enquiry ************/
  getEnquiry(t_id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/enquiry/get_cc_enquiry', form, {headers : this.reqHeader});
  }

  /************ Messages ************/
  getMessage(t_id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/message/get_ticket_message', form, {headers : this.reqHeader});
  }

  /************ Diagnosis Approve ************/

  getDiagnosisList() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/diagnosis_approve?' + form, {headers : this.reqHeader});
  }

  diagnosisSubmit(ticket_id: string, id: string, status: string, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticket_id + '&id=' + id + '&approved=' + status + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/tickets/diagnosis_approve', form, {headers : this.reqHeader});
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

  sendSMSEmail(t_id: string, message: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&message=' + message;
    return this.http.post(this.rootUrl + 'api/message/sms_email_notification', form, {headers : this.reqHeader});
  }

  /************ Customer Dis-Sat ************/

  getCustomerDisSat(phone: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&phone=' + phone;
    return this.http.get(this.rootUrl + 'api/ticketsv3/ticket_customer_rating?' + form, {headers : this.reqHeader});
  }


  /* ********** Reservation ********* */

  createReservation(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId')  + data ;
    return this.http.post(this.rootUrl + 'api/gsxapi/reservation_create', form, {headers : this.reqHeader})
  }
/*   createDlvryReservation(data: any, ticketId: any) {
    const form = 'X_API_KEY=' + 'Ti@vlp123' + '&user_id=' + localStorage.getItem('userId')  + data + '&ticket_id=' + ticketId ;
    return this.http.post(this.rootUrl + 'api/gsxapi/reservation_create', form, {headers : this.reqHeader})
  } */

  reservationUpdate(id: any, date: any, ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&reservation_id=' + id + '&cancel_reason=' + 'CUSTOMER_CANCELLED' + '&modified_status=' + 'RESCHEDULED' + '&user_id=' + localStorage.getItem('userId')  + '&ship_to_code=' + localStorage.getItem('shipTo') + '&new_reservation_date=' + date
    + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/gsxapi/reservation_update', form, {headers : this.reqHeader});
  }

  getReservation(mobile: any, email: any, id: any) {
    email = email === null? '': email;
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&mobile=' + mobile + '&email=' + email + '&branch_code=' + '' + '&user_id=' + localStorage.getItem('userId')  + '&reservation_id=' + id;
    return this.http.get(this.rootUrl + 'api/reservation/get?'+ form, {headers : this.reqHeader});
  }

  getReservationDetails(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&reservation_id=' + reservationId + '&user_id=' + localStorage.getItem('userId');
    return this.http.post( this.rootUrl + 'api/gsxapi/reservation_details', form, {headers : this.reqHeader});
  }


  getReservationDetailsbyId(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&reservation_id=' + reservationId + '&user_id=' + localStorage.getItem('userId') + '&ship_to=' + localStorage.getItem('shipTo');
    return this.http.post( this.rootUrl + 'api/gsxapi/reservation_details', form, {headers : this.reqHeader});
  }

  /* ********** Adhesive ********* */

  blockAdhesive(ticketId: any, asnNo: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&asn_no=' + asnNo;
    return this.http.post(this.nestUrl + 'tickets_v2/block_adhesives' , form, {headers : this.getHeaders()});
  }

  unBlockAdhesive(asn_no: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.post(this.nestUrl + 'consignment/unblock_adhesives', form, {headers : this.getHeaders()});
  }

  getBlockedAdhesive(asn_no: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.get(this.nestUrl + 'tickets_v2/adhesives_asn?' + form, {headers : this.getHeaders()});
  }

  getTicketAdhesives(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.get(this.rootUrl + 'api/adhesives/adhesives_ticket?' + form, {headers : this.reqHeader});
  }

  getAdhesiveList() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'consignment/get_adhesives_list?' + form, {headers : this.getHeaders()});
  }

  issueAdhesives(ticketId: any, asnNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&asn_no=' + asnNo;
    return this.http.post(this.rootUrl + 'api/adhesives/issue_adhesives', form, {headers : this.reqHeader});
  }

  mapOnsiteRepair(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/gsxapi/map_repair_details', form, {headers : this.reqHeader});
  }

  getPopRequiredList(product: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&model=' + product;
    return this.http.get(this.rootUrl + 'api/ticketsv3/pop_mandate_parts?' + form ,{headers : this.reqHeader});
  }

  getqData() {
    let url: string="/assets/newQuestion.json";
    return this.http.get(url);
  }

  updateCaseId(ticketId: any, date: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + ticketId + '&date=' + date;
    return this.http.post(this.rootUrl + 'api/tickets/update_case_id', form ,{headers : this.reqHeader});
  }

  /* ********** PUD ********* */

  pudTicketCheck(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.get(this.rootUrl + 'api/ticketsv3/pud_ticket_check?' + form ,{headers : this.reqHeader});
  }

  createPUD(first_name: any, last_name: any, customer_primary_phone: string, customer_email: string,  customer_secondary_phone: string, address_line1: string, Address2: string, city: string,state: string,pin: string, customerQuery: string, branchCode: any, notes: any, ticket_id: any, pudType: any, serialNumber: any, dropAddress?: any, drop_request_flag: any = 0) {
    dropAddress = dropAddress === null? '': encodeURIComponent(dropAddress);
    const form = '&customer_firstname=' + first_name + '&customer_lastname=' + last_name + '&customer_primary_phone=' + customer_primary_phone+ '&customer_email=' + customer_email + '&customer_secondry_phone=' + customer_secondary_phone + '&customer_query=' + encodeURIComponent(customerQuery) + '&pud_type=' + pudType + '&drop_request_flag=' + drop_request_flag +
    '&address_line1=' + address_line1 + '&address_line2=' + Address2 + '&city=' + city + '&state=' + state + '&pin=' + pin + '&country=' + 'India' + '&landmark=' + ''  + '&notes=' + encodeURIComponent(notes) + '&user_id=' + localStorage.getItem('userId') + '&branch_code=' + branchCode + '&technician_note=' + '' + '&technician_comment=' + '' + '&ticket_id=' + ticket_id + '&serial_no=' + serialNumber + '&drop_address=' + dropAddress;
    return this.http.post(this.nestUrl + 'tickets_v2/convert_to_pud' , form, {headers : this.getHeaders()});
  }

  generateQuote(data: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.nestUrl + 'tickets_v2/generate_quotation_generic', form, { headers: this.getHeaders() });
  }

  sendQuotePayment(ticketId: any, quoteId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&quotation_id=' + quoteId + '&quotation_pud=' + 1;
    return this.http.post(this.rootUrl + 'api/ticketsv3/send_quotation_and_paynow_link', form, { headers: this.reqHeader });
  }

  updateDropAddress(pudTicketId: any, dropAddress: any, dropRequestFlag: any, drop_exception_case: any = '') {
    dropAddress = dropAddress === null ? '' : encodeURIComponent(dropAddress);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&pud_ticket_id=' + pudTicketId + '&drop_address=' + dropAddress + '&drop_request_flag=' + dropRequestFlag + '&drop_exception_case=' + drop_exception_case;
    return this.http.post(this.rootUrl + 'api/pud/update_drop_address', form, { headers: this.reqHeader });
  }

  /* ********** NetSuite ********* */

  createCase(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/suite/create_case', form ,{headers : this.reqHeader});
  }

  createPO(ticketId: any, hdId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticketId + '&hd_id=' + hdId;
    return this.http.post(this.rootUrl + 'api/suite/create_po', form, {headers : this.reqHeader});
  }

  grnInventoryAdjustment(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/suite/inventory_push', form, {headers : this.reqHeader});
  }

  createGRN(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/suite/create_grn', form ,{headers : this.reqHeader});
  }

  inventoryAdjOut(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/suite/inventory_adjustment_out', form, { headers: this.reqHeader });
  }

  pushEstimateToNetsuite(ticketId: any, hd_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/suite/create_estimate', form, { headers: this.reqHeader });
  }

  pushPOToNetsuite(ticketId: any, hd_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticketId + '&hd_id=' + hd_id;
    return this.http.post(this.rootUrl + 'api/suite/create_po', form, { headers: this.reqHeader });
  }

  openPO(po_id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&internal_id=' + po_id + '&type=' + 'purchaseorder' + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/suite/document', form,
    {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
    return new Blob([res], { type: 'application/pdf', });
    }));
  }

  gsxSmsUpdate(ticketId: string, sms_flag: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&sms_flag=' + sms_flag +
    '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/update_gsx_sms', form, {headers : this.reqHeader});
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
  getASNList(part: any, consignment : any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&branchCode=' + localStorage.getItem('branchCode') + '&part=' + part + '&consignment=' + consignment;
    return this.http.post(this.nestUrl + 'tickets_v2/getAsn', form, { headers: this.getHeaders() });
  }
  crer_flag(ticketId: string, crer: string) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&crer_flag=' + crer +
    '&ticket_id=' + ticketId;
    return this.http.post(this.nestUrl + 'tickets_v2/update_crer_flag', form, {headers : this.getHeaders()});
  }
  checklegalcase(ticketId: string, legal_case_flag: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&legal_case_flag=' + legal_case_flag +
    '&ticket_id=' + ticketId;
    return this.http.post(this.nestUrl + 'tickets_v2/checklegalcase', form, {headers : this.getHeaders()});
  }

 updateToteTracker(ticketId: string, toteId: string) {
  const form =
    'X_API_KEY=' + localStorage.getItem('userToken') +
    '&user_id=' + localStorage.getItem('userId') +
    '&ticket_id=' + ticketId +
    '&kgb_tote_id=' + toteId;

  return this.http.post(
    this.rootUrl + 'api/ticketsv3/updateToteTracker',form, { headers: this.reqHeader });
}

}
