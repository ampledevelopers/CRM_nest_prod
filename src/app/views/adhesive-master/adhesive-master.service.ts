import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdhesiveMasterService {
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

  getAdhesiveList() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'consignment/get_adhesives_list?' + form, {headers : this.getHeaders()});
  }

  unBlockAdhesive(asn_no: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.post(this.nestUrl + 'consignment/unblock_adhesives', form, {headers : this.getHeaders()});
  }

  inactiveAdhesives(asn_no: string, remarks: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no + '&remarks=' + remarks;
    return this.http.post(this.nestUrl + 'consignment/inactive_adhesives', form, {headers : this.getHeaders()});
  }

  /* bulkUpload(docs: any) {
    const documents = JSON.stringify(docs);
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&documents=' + documents;
    return this.http.post(this.rootUrl + 'api/adhesives/adhesives_import', form, {headers : reqHeader});
  } */

  bulkUpload(docs: any){
    const documents = JSON.stringify(docs);
      const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
      const form = 'user_id=' + localStorage.getItem('userId') +  '&documents=' + documents;
      return this.http.post(this.nestUrl + 'consignment/adhesives_import', form, {headers : this.getHeaders()});
    }

  /* saveAdhesive(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/gsxapi/adhesive_delivery_acknowledge', form, {headers : this.reqHeader});
  } */

  addAdhesive(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + data;
    return this.http.post(this.rootUrl + 'api/adhesives/adhesives_add', form, {headers : this.reqHeader});
  }
}

