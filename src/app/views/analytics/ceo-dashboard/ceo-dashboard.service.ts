import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CEODashboardService {

  rootUrl = 'https://api.icareservice.co.in/';
  reportsUrl = 'https://reports.icareservice.co.in/'
  encodedApiKey = encodeURIComponent('UI@PWD#');
  reportUrl = localStorage.getItem('reportsUrl');
  bireqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
  mailHeader = new HttpHeaders({ 'Content-Type': 'application/pdf'});
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
  constructor(private http: HttpClient) {
   }

  //  getAccyRevenue(year: any, quarter: any) {
  //   const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&quarter=' + quarter + '&year=' + year;
  //   return this.http.get('http://bi.ample.co.in/ci/index.php/IcareDashboard/get_revenue?' + form, {headers : this.bireqHeader});
  // }
  // 'http://bi.ample.co.in/ci/index.php/IcareDashboard/get_accy_revenue?'

  getRevenue(year: any, quarter: any, reportType: any) {
    const form = 'X_API_KEY=' + this.encodedApiKey + '&quarter=' + quarter + '&year=' + year + '&report_type=' + reportType;
    return this.http.get(this.rootUrl + 'api/analytics/get_revenue?'+ form, {headers : this.reqHeader});
  }
  getAccyRevenue(year: any, quarter: any, reportType: any) {
    const form = 'X_API_KEY=' + this.encodedApiKey + '&quarter=' + quarter + '&year=' + year + '&report_type=' + reportType;
    return this.http.get(this.rootUrl + 'api/analytics/get_accy_revenue?'+ form, {headers : this.reqHeader});
  }

  getRafCount(year: any, quarter: any, siteType: any, reportType: any) {
    const form =  'quarter=' + quarter + '&year=' + year + '&X_API_KEY='  + this.encodedApiKey + '&site_type_id=' + '1'  + '&report_type=' + reportType;
    return this.http.get('https://reports.icareservice.co.in/' + 'api/analytics/get_raf_count?'+ form, {headers : this.reqHeader});
  }

  getCSAT(year: any, quarter: any, reportType: any) {
    const form = 'X_API_KEY=' + this.encodedApiKey + '&quarter=' + quarter + '&year=' + year + '&report_type=' + reportType;
    return this.http.get(this.rootUrl + 'api/analytics/csat_data_ceo_dashboard?'+ form, {headers : this.reqHeader});
  }

  getCustometEngmnt(year: any, quarter: any, reportType: any) {
    const form = 'X_API_KEY=' + this.encodedApiKey + '&quarter=' + quarter + '&year=' + year + '&report_type=' + reportType;
    return this.http.get(this.rootUrl + 'api/analytics/customer_engagement?'+ form, {headers : this.reqHeader});
  }

  getAcPlusData(year: any, quarter: any, reportType: any) {
    const form = 'X_API_KEY=' + this.encodedApiKey + '&quarter=' + quarter + '&year=' + year + '&report_type=' + reportType;
    return this.http.get('https://reports.icareservice.co.in/' + 'api/analytics/ac_plus_data?'+ form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
  }

  getTargetValues(year: any, quarter: any, reportType: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&quarter=' + quarter + '&year=' + year + '&report_type=' + reportType;
    return this.http.get(this.nestUrl +'uploads/target?' + form, {headers : this.reqHeader});
  } 

  saveTargetValues(hd: any, dt: any) {
    const returnData = {
      'hd': hd,
      'dt': dt,
    };
    const data = JSON.stringify(returnData);
    const usetkn: any = localStorage.getItem('userToken');
    const diagHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True','X-API-KEY': usetkn });
    // const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl +'uploads/target_save', data, {headers : diagHeader});
  }

  /* sendImageData(imageData: string): Observable<any> {
    console.log('getimage');
    const formData = new FormData();
    formData.append('graph_image', imageData);
    formData.append('X_API_KEY', 'UI@PWD#');

    const options = {
      headers: {
        'Accept': 'application/json', // Specify the response type you expect from the server
        'Content-Type': 'application/x-www-form-urlencoded',
        'No-Auth': 'True'
      }
    };

    return this.http.post<any>(this.rootUrl + 'api/test/save_image_from_url', formData, options);
  }
 */
  sendImageData(imageData: string) {
    const form = 'X_API_KEY=' + this.encodedApiKey + '&graph_image=' + imageData;
    return this.http.post(this.rootUrl +'api/test/save_image_from_url' , form, {headers : this.reqHeader});
  }

  uploadPDF(docs: any, filename: any) {
    let document = JSON.stringify(docs);
    const form = 'X_API_KEY=' + this.encodedApiKey  + '&user_id=' + localStorage.getItem('userId')  +
                '&documents=' + document;
    return this.http.post(this.rootUrl + 'api/test/send_image', form, {headers : this.reqHeader});
  }

  uploadPDF1(docs: Blob, fileName: any) {
    const form = new FormData();
    form.append('pdf', docs, 'my-pdf.pdf');
    form.append('X_API_KEY', this.encodedApiKey);
    form.append('user_id', '1911');
    return this.http.post(this.rootUrl + 'api/test/send_image', form, { headers: this.reqHeader });
  }


  /* uploadPDF(docs: string): Observable<any> {
    console.log('getimage');
    const formData = new FormData();
    formData.append('graph_image', docs);
    formData.append('X_API_KEY', 'UI@PWD#');
    return this.http.post<any>(this.rootUrl + 'api/test/send_image', formData, {headers : this.reqHeader});
  } */
}
