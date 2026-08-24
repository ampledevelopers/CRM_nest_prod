import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE ='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('rootUrl');
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }

  getReservation( branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&mobile=' + '' + '&email=' + '' + '&branch_code=' + branchCode + '&user_id=' + '1911';
    return this.http.get( this.nestUrl + 'reservation/get?'+ form, {headers : this.getHeaders()});
  }

  getReservationSummary( branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + branchCode + '&user_id=' +  localStorage.getItem('userId') + '&reservation_type=' + 'CIN' ;
    return this.http.post(this.nestUrl + 'gsxapi/reservation_summary_fetch',form, {headers : this.getHeaders()});
  }

  getSameDayReservation( branchCode: any, date: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&mobile=' + '' + '&email=' + '' + '&branch_code=' + branchCode + '&user_id=' +  localStorage.getItem('userId')  + '&date=' + date;
    return this.http.get( this.nestUrl + 'reservation/get?'+ form, {headers : this.getHeaders()});
  }

  createPUD(customer_name: any, customer_primary_phone: string, customer_email: string,  customer_secondary_phone: string, address_line1: string, Address2: string, city: string,state: string,pin: string, landmark: string, datetime: string, notes: string, Visible_Damages: string, quoteQ: any, reservationId: any, assignedTo: any, branchCode: any, customerQuery: any, serialNumber: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&customer_firstname=' + customer_name + '&customer_lastname=' + '' + '&customer_primary_phone=' + customer_primary_phone+ '&customer_email=' + customer_email + '&customer_secondry_phone=' + customer_secondary_phone + '&customer_query=' + encodeURIComponent(customerQuery) + '&pud_type=' + 'Apple-PUD' +
    '&address_line1=' + address_line1 + '&address_line2=' + Address2 + '&city=' + city + '&state=' + state + '&pin=' + pin + '&country=' + 'India' + '&landmark=' + landmark  + '&pickup_scheduled_time='+ datetime + '&reservation_id=' + reservationId + '&diagnosis_charges_accepted=' + quoteQ + '&serial_no=' + serialNumber +
    '&visible_damage=' + Visible_Damages + '&notes=' + encodeURIComponent(notes) + '&user_id=' + localStorage.getItem('userId') + '&pickup_assigned_to=' + assignedTo + '&branch_code=' + branchCode + '&technician_note=' + '' + '&technician_comment=' + '';
    return this.http.post(this.nestUrl + 'reservation/create_pud_ticket' , form, {headers : this.getHeaders()});
  }

  uploadDocuments(id: string, docs: any) {
    const documents = JSON.stringify(docs);
    const form = 'ticket_id=' + id + '&user_id=' + localStorage.getItem('userId') +
                '&documents=' + documents;
    return this.http.post(this.nestUrl + 'tickets_v2/uploads', form, {headers : this.getHeaders()});
  }

  getAgents(branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + '1911' ;
    return this.http.get(this.nestUrl + 'reservation/get_pud_agents?' + form, {headers : this.getHeaders()});
  }


  makeCall(phone: any, apiKey: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&customer_number=' + phone + '&ticket_id=' + '999' + '&api_key=' + apiKey;
    return this.http.get(this.nestUrl + 'call/start?' + form, {headers : this.getHeaders()});
  }

  getNumbers() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'call/clicktocall_number?' + form, {headers : this.getHeaders()});
  }

  sendOtp(phone: any, location: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&phone=' + phone + '&location_code=' + location;
    return this.http.post(this.nestUrl + 'reservation/smsotp', form, {headers : this.getHeaders()});
  }

  customerAttened(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&reservation_id=' + reservationId + '&customer_status=' + 'concierge_attended';
    return this.http.post(this.nestUrl + 'reservation/update_customer_status', form, {headers : this.getHeaders()});
  }

  updateStatusToNoShowGSX(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&reservation_id=' + reservationId + '&modified_status=' + 'NO_SHOW';
    return this.http.post( this.nestUrl + 'gsxapi/reservation_update', form, {headers : this.getHeaders()});
  }

  updateStatusToNoShowCRM(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&reservation_id=' + reservationId + '&customer_status=' + 'COMPLETED';
    return this.http.post(this.nestUrl + 'reservation/update_customer_status', form, {headers : this.getHeaders()});
  }

  getLicMobile() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'call/location_incharge_mobile?' + form, {headers : this.getHeaders()});
  }

   updateCustPhone(reservationId: any, phone : any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&reservation_id=' + reservationId + '&customer_phone_number=' + phone;
    return this.http.post(this.nestUrl + 'reservation/update_customer_mobile', form, {headers : this.getHeaders()});
  }

  getDeliveryTicketDetails(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + ticketId + '&user_id=' + localStorage.getItem('userId');
    return this.http.get( this.nestUrl + 'reservation/delivery_reservation?'+ form, {headers : this.getHeaders()});
  }

  getDeliveryReservationDetails(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&reservation_id=' + reservationId + '&user_id=' + localStorage.getItem('userId');
    return this.http.get( this.nestUrl + 'reservation/delivery_reservation?'+ form, {headers : this.getHeaders()});
  }

  /* public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  } */

  getReservationDetails(reservationId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&reservation_id=' + reservationId + '&user_id=' + localStorage.getItem('userId') + '&ship_to=' + localStorage.getItem('shipTo');
    return this.http.post( this.nestUrl + 'gsxapi/reservation_details', form, {headers : this.getHeaders()});
  }

}
