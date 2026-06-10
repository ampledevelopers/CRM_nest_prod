import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deviceinfo, Userinfo } from './tekne-ticket-details-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TekneTicketDetailsEditService {

  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) {
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/accy/get_options?' + form, {headers : this.reqHeader});
  }

  getDetail(id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get?' + form, {headers : this.reqHeader});
  }

  getCustomerInfo(site_id: string, c_id: string, phone_no: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  '&site_type_id=' + site_id + '&c_id=' + c_id + '&phone=' + phone_no;
    return this.http.post(this.rootUrl + 'api/tickets/get_customer', form, {headers : this.reqHeader});
  }

  updateUserInfo(data: Userinfo, customerId: string, ticketId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  '&first_name=' + data.first_name + '&last_name=' + data.last_name + '&phone=' + data.phone +
                  '&email=' +  data.email + '&address1=' + data.address1 + '&address2=' + data.address2 +
                  '&city=' + data.city + '&state=' + data.state + '&pin=' + data.pin + '&gstn=' + data.gstn + '&customer_id=' + customerId
                  + '&ticket_id=' + ticketId;
    return this.http.post(this.rootUrl + 'api/tickets/customer_update', form, {headers : this.reqHeader});
  }

  updateDeviceInfo(data: Deviceinfo, ticketId: string, selectedFamily: string, device_condition: string | number | boolean, warrantyStatus: string, unitDate: string, unitTime: string, hdId: string,
    customerQuery: string, techComment: string, paymentDate: string) {
    device_condition = encodeURIComponent(device_condition);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  '&serial_no=' + data.serialNo + '&imei_no=' + data.imeiNo + '&product_description=' + data.productName +
                  '&product_family=' +  selectedFamily + '&condition_of_device=' + device_condition
                  + '&ticket_id=' + ticketId + '&warranty_status=' + warrantyStatus + '&unit_received_date=' + unitDate
                  + '&unit_received_time=' + unitTime + '&hd_id=' + hdId + '&customer_query=' + customerQuery + '&technician_comment=' + techComment
                  + '&payment_date=' + paymentDate;
    return this.http.post(this.rootUrl + 'api/tickets/ticket_update', form, {headers : this.reqHeader});
  }

  updateRepairInfo(ticketId: string, hd_id: string, gNumber: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  '&ticket_id=' + ticketId + '&hd_id=' + hd_id + '&g_number=' + gNumber + '&direct=' + '1';
    return this.http.post(this.rootUrl + 'api/gsxapi/update_g_number', form, {headers : this.reqHeader});
  }

  getSVC(t_id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/svc_show', form, {headers : this.reqHeader});
  }

  updateSvcRemarks(ticketId: string, svcId: string, svcRemarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
                  '&ticket_id=' + ticketId + '&hd_id=' + svcId + '&svc_remarks=' + svcRemarks;
    return this.http.post(this.rootUrl + 'api/tickets/svc_remarks_update', form, {headers : this.reqHeader});
  }

}

