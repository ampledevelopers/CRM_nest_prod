import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PudServicesService {

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
  constructor(private http: HttpClient) {}

     getPUDtickets() {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&status=' + '' +
      '&pud_type=' + '';
      return this.http.get(this.rootUrl + 'api/pud/get_pud_tickets?' + form, {headers : this.reqHeader});
    }

    getBranch(branchCode: string) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&branch_code=' + branchCode;
      return this.http.post(this.nestUrl + 'kbb_outward/get_branch', form, {headers : this.getHeaders()});
    }

    getProduct(serial_no: string, ticketId: string) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&serial_no=' + serial_no + '&ticket_id=' + ticketId;
      return this.http.post(this.nestUrl + 'gsxapi/get_product_details', form, {headers : this.getHeaders()});
    }

    getAmpleAcknowledge(serial_no: string, ticketId: string,remarks:any,visibleDamage:any, diagnosisCharges:any, pudType:any, pudTicketId:any) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&serial_no=' + serial_no + '&ticket_id=' +  ticketId + '&remarks=' + remarks + '&visible_damage=' + visibleDamage + '&diagnosis_charges_accepted=' + diagnosisCharges + '&pud_type=' + pudType + '&pud_ticket_id=' + pudTicketId;
      return this.http.post(this.rootUrl + 'api/pud/acknowledge_pickup_device', form, {headers : this.reqHeader});
    }

    getAcknowledge(serial_no: string, ticketId: string, pudTicketId:string,remarks:any, branch_code:any,pudType: any,pack_received_with_damage:any,awbNo:any) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&serial_no=' + serial_no + '&ticket_id=' +  ticketId + '&pud_ticket_id=' + pudTicketId + '&remarks=' + remarks + '&branch_code=' + branch_code + '&pud_type=' + pudType + '&pack_received_with_damage=' + pack_received_with_damage + '&pickup_awb=' + awbNo;
      return this.http.post(this.rootUrl + 'api/pud/acknowledge_pickup_device', form, {headers : this.reqHeader});
    }

    acknowledgeAtDrop(serial_no: string, ticketId: string, pudTicketId:string,remarks:any, branch_code:any,pudType: any,pack_received_with_damage:any,awbNo:any) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&serial_no=' + serial_no + '&ticket_id=' +  ticketId + '&pud_ticket_id=' + pudTicketId + '&remarks=' + remarks + '&branch_code=' + branch_code + '&pud_type=' + pudType + '&pack_received_with_damage=' + pack_received_with_damage + '&drop_awb=' + awbNo;
      return this.http.post(this.rootUrl + 'api/pud/acknowledge_drop_device_test', form, {headers : this.reqHeader});
    }

    getDetail(id: string | null) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
      return this.http.get(this.nestUrl + 'common/get?' + form, {headers : this.getHeaders()});
    }

    getOTP(serial_no: string, ticketId: string, pudTicketId: string, pickupOTP: any, pudUserId: any,pudType: any) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&serial_no=' + serial_no + '&ticket_id=' + ticketId + '&pud_ticket_id=' + pudTicketId + '&pickup_otp=' + pickupOTP + '&pud_user_id=' + pudUserId + '&pud_type=' + pudType;
      return this.http.post(this.rootUrl + 'api/pud/validate_otp_pickup', form, {headers : this.reqHeader});
    }

    getDropOTP(serial_no: string, pudTicketId: string, dropOTP: any, ticketId:any,pudType: any ) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&serial_no=' + serial_no + '&pud_ticket_id=' + pudTicketId + '&drop_otp=' + dropOTP + '&ticket_id=' + ticketId + '&pud_type=' + pudType;
      return this.http.post(this.rootUrl + 'api/pud/validate_otp_drop', form, {headers : this.reqHeader});
    }

    getQuotation(id: string | null) {
      const form = '&ticket_id=' + id;
      return this.http.post(this.nestUrl + 'tickets_v2/get_quotations', form, {headers : this.getHeaders()});
    }

    getDriveFiles(ticket_id: string) {
      const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
      return this.http.get(this.nestUrl + 'ticket_edit/gdrive_image?' + form, {headers : this.getHeaders()});
    }

    checkQuoteStatuses(tId: string, qId: string, transId: string) {
      const form = 'ticket_id=' + tId + '&user_id=' + localStorage.getItem('userId') +
      '&transaction_id=' + transId + '&quotation_id=' + qId;
      return this.http.post(this.nestUrl + 'tickets_v2/get_paynow_status', form, {headers : this.getHeaders()});
    }

    registerAmplePickup(id: string, pudType: any, dropBranchCode: any, pickupAssigned: any, firstCustomer_name:any,lastCustomer_name:any, customer_primary_phone:any
      , customer_secondry_phone:any, customer_email:any, address_line1:any, address_line2:any, city:any, state:any, pin:any, landmark:any, serial_no:any, pickup_scheduled_time:any, customer_query:any, exceptionCase:any) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
       '&pud_ticket_id=' + id + '&pud_type=' + pudType + '&branch_code=' + dropBranchCode + '&pickup_assigned_to=' + pickupAssigned + '&assigned_user_id=' + pickupAssigned +
       '&customer_firstname=' + firstCustomer_name + '&customer_lastname=' +  lastCustomer_name + '&customer_primary_phone=' + customer_primary_phone + '&customer_secondry_phone=' + customer_secondry_phone + '&customer_email=' + customer_email
        + '&address_line1=' + address_line1 + '&address_line2=' + address_line2 + '&city=' + city + '&state=' + state + '&pin=' + pin + '&landmark=' + landmark + '&serial_no=' + serial_no + '&pickup_scheduled_time=' + pickup_scheduled_time
         + '&customer_query=' + customer_query + '&technician_comment=' + '' + '&technician_note=' + '' + '&dl_branch_code=' + '' + '&condition_of_device=' + '' + '&exception_case=' + exceptionCase;
      return this.http.post(this.rootUrl + 'api/pud/register_pickup', form, {headers : this.reqHeader});
    }

    registerPickup(id: string, pudType: any, branch_code: any, dropBranchCode: any, pickupAssigned: any, customer_name:any, customer_primary_phone:any
      , customer_secondry_phone:any, customer_email:any, address_line1:any, address_line2:any, city:any, state:any, pin:any, landmark:any, serial_no:any, pickup_scheduled_time:any, customer_query:any, visible_damage:any, diagnosis_charges_accepted:any) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
       '&pud_ticket_id=' + id + '&drop_branch_code=' + dropBranchCode + '&pud_type=' + pudType + '&branch_code=' + branch_code + '&pickup_assigned_to=' + pickupAssigned + '&assigned_user_id=' + pickupAssigned +
       '&customer_name=' + customer_name + '&customer_primary_phone=' + customer_primary_phone + '&customer_secondry_phone=' + customer_secondry_phone + '&customer_email=' + customer_email
        + '&address_line1=' + address_line1 + '&address_line2=' + address_line2 + '&city=' + city + '&state=' + state + '&pin=' + pin + '&landmark=' + landmark + '&serial_no=' + serial_no + '&pickup_scheduled_time=' + pickup_scheduled_time
         + '&customer_query=' + customer_query + '&visible_damage=' + visible_damage + '&diagnosis_charges_accepted=' + diagnosis_charges_accepted;
      return this.http.post(this.rootUrl + 'api/pud/register_pickup', form, {headers : this.reqHeader});
    }

    requestDrop(id: string, pudType: any, branch_code: any, dropBranchCode: any, drop_assigned: any,) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
       '&pud_ticket_id=' + id + '&drop_branch_code=' + dropBranchCode + '&pud_type=' + pudType + '&branch_code=' + branch_code + '&drop_assigned_to=' + drop_assigned;
      return this.http.post(this.rootUrl + 'api/pud/register_drop', form, {headers : this.reqHeader});
    }

    getPUDAgent() {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
      return this.http.get(this.nestUrl + 'reservation/get_pud_agents?' + form, {headers : this.getHeaders()});
    }

    getDocuments(id: string | null) {
      const form = '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
      return this.http.post(this.nestUrl + 'tickets_v2/get_documents', form, {headers : this.getHeaders()});
    }

    getPUDImages(ticket_id: string) {
      const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
      return this.http.get(this.nestUrl + 's3/s3_data?' + form, {headers : this.getHeaders()});
    }

    makeCall(tId: string, phone: string) {
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
      '&ticket_id=' + tId + '&customer_number=' + phone;
      return this.http.get(this.nestUrl + 'call/start?' + form, {headers : this.getHeaders()});
    }

    sendRAF(id: string | null) {
      const form = 'ticket_id=' + id ;
      return this.http.post(this.nestUrl + 'itickets/send_raf_mail', form, {headers : this.getHeaders()});
    }

    updateGSXStatus(gNumber: string, repairStatus: string) {
      const form = '&user_id=' + localStorage.getItem('userId') + '&update_type=' + 'UpdateRepairStatus' + '&repair_id=' + gNumber +
      '&repair_type=' + 'OSR' + '&repair_status=' + repairStatus;
      return this.http.post(this.nestUrl + 'gsxapi/repair_update', form, {headers : this.getHeaders()});
     }
    rdoAdditionalPart(ticket_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') +'&user_id=' + localStorage.getItem('userId') +'&ticket_id=' + ticket_id  ;
    return this.http.post(this.nestUrl + 'gsxapi/rdo_additional_part', form, { headers: this.getHeaders() });
    }

  }
