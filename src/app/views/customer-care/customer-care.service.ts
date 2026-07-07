import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerCareService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'X-API-KEY': localStorage.getItem('userToken') || ''
    });
  }
  constructor(private http: HttpClient) {
  }

  getWarrantyDetails(SerialNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&serial_no=' + SerialNo ;
        return this.http.post(this.rootUrl + 'api/gsxapi/get_product_details', form, {headers : this.reqHeader});
  }

  getTicketDetails(ticketId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + ticketId + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get?' + form, {headers : this.reqHeader});
  }

  getCustomerInfo(site_id: any, c_id: any, phone_no: any) {
    const form = '&user_id=' + localStorage.getItem('userId') +
                  '&site_type_id=' + site_id + '&c_id=' + c_id + '&phone=' + phone_no;
    return this.http.post(this.nestUrl + 'common/get_customer', form, {headers : this.getHeaders()});
  }

  saveEnquiry(inputData: any, products: any) {
    const productData = JSON.stringify(products);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + inputData +
    '&items=' + productData;
    return this.http.post(this.rootUrl + 'api/enquiry/create_cc_enquiry', form, {headers : this.reqHeader});
  }

  getEnquiries() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/enquiry/get_cc_enquiry_list', form, {headers : this.reqHeader});
  }

  updateEnquiry(status: any, id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&status=' + status + '&enquiry_id='
    + id;
    return this.http.post(this.rootUrl + 'api/enquiry/update_enquiry_status', form, {headers : this.reqHeader});
  }


  getAppitems(family: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&familyId=' + family ;
        return this.http.post(this.rootUrl + 'api/customercare/get_app_products', form, {headers : this.reqHeader});
  }

  getAppitemDetails(family: any, itemId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&familyId=' + family + '&itemId=' + itemId ;
        return this.http.post(this.rootUrl + 'api/customercare/get_app_item_details', form, {headers : this.reqHeader});
   }

   saveAppLink(family: any, itemId: any, firstName: any, mobileNo: any, price: any, emailId: any, deviceSlno: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&familyId=' + family + '&itemId=' + itemId + '&firstName=' + firstName + '&mobileNo=' + mobileNo + '&price=' + price +
    '&emailId=' + emailId + '&deviceSlno=' + deviceSlno ;
        return this.http.post(this.rootUrl + 'api/customercare/save_app_link', form, {headers : this.reqHeader});
   }

   sendPaymentLink(orderId: any, status: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&orderId=' + orderId + '&status=' + status ;
        return this.http.post(this.rootUrl + 'api/customercare/approve_payment_link', form, {headers : this.reqHeader});
   }

   getSavedLinks() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') ;
        return this.http.post(this.rootUrl + 'api/customercare/get_saved_links', form, {headers : this.reqHeader});
   }


}
