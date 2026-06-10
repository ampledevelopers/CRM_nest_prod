import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdhesiveMasterService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) {}

  getAdhesiveList() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/adhesives/get_adhesives_list?' + form, {headers : this.reqHeader});
  }

  unBlockAdhesive(asn_no: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no;
    return this.http.post(this.rootUrl + 'api/adhesives/unblock_adhesives', form, {headers : this.reqHeader});
  }

  inactiveAdhesives(asn_no: string, remarks: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&asn_no=' + asn_no + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/adhesives/inactive_adhesives', form, {headers : this.reqHeader});
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
      const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +  '&documents=' + documents;
      return this.http.post(this.rootUrl + 'api/adhesives/adhesives_import', form, {headers : reqHeader});
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

