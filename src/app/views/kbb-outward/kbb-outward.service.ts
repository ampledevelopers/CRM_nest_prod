import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class KbbOutwardService {
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
  constructor(private http: HttpClient) {
  }

  getDetail(id: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get?' + form, {headers : this.reqHeader});
  }

  checkPartSerialNo(tId: string) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.nestUrl + 'kbb_outward/check_display_repair', form, { headers: this.getHeaders() });
  }

  checkPartDetails(tId: any, hdId?: any) {
    let form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    if (hdId) {
      form += '&hd_id=' + hdId;
    }
    return this.http.post(this.nestUrl + 'kbb_outward/get_diagnosis', form, { headers: this.getHeaders() });
  }

  /* getGsxDetail(repairId) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&repair_id=' + repairId  +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_details', form, {headers : this.reqHeader});
  } */

  getReturnDetailList(fromDate: any, toDate: any, pageNo: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
      '&from_date=' + fromDate + '&to_date=' + toDate + '&page_no=' + pageNo;
    return this.http.post(this.nestUrl + 'gsxapi/returns_lookup', form, { headers: this.getHeaders() });
  }

  getReturnDetail(repairId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&repairId=' + repairId;
    return this.http.post(this.nestUrl + 'gsxapi/returns_lookup', form, { headers: this.getHeaders() });
  }

  getRcDc(type: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&type=' + type  +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'kbb_outward/get_rc_dc', form, {headers : this.getHeaders()});
  }

  getDocuments(id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id;
    return this.http.post(this.rootUrl + 'api/tickets/get_documents', form, {headers : this.reqHeader});
  }

  getLocation(code: any) {
    let form: any;
    if (code === '') {
      form = 'user_id=' + localStorage.getItem('userId');
    } else {
      form = 'branch_code=' + code + '&user_id=' + localStorage.getItem('userId');
    }
    return this.http.post(this.nestUrl + 'kbb_outward/get_branch', form, { headers: this.getHeaders() });
  }

  kbbSubmit(hd: any, dt: any, cartonBoxes: any, toteBoxes: any): Observable<any> {
    const token = localStorage.getItem('userToken');
  
    return this.http.post(
      this.nestUrl + 'kbb_outward/create',
      {
        return_hd: Array.isArray(hd) ? hd : [hd],
        return_dt: dt,
        carton_box: cartonBoxes,
        tote_box: toteBoxes,
        user_id: localStorage.getItem('userId'),
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'No-Auth': 'True',
          'x-api-key': token || '',
        }),
      },
    );
  }
  getKbbList(nrdcId: any, ticketId: any, status: any) {
    let form;
    if (nrdcId !== '') {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved=' + status + '&id=' + nrdcId;
    } else if (ticketId !== '') {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved=&ticket_id=' + ticketId;
    } else {
      form = 'user_id=' + localStorage.getItem('userId') + '&approved=' + status;
    }
    return this.http.get(this.nestUrl + 'kbb_outward/get_kbb?' + form, { headers: this.getHeaders() });
  }

  approveDeclineKbb(id: any, status: any, ewaybill: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
      '&return_id=' + id + '&status=' + status + '&eway_bill=' + ewaybill;
    return this.http.post(this.nestUrl + 'kbb_outward/approve', form, { headers: this.getHeaders() });
  }

  eWayBillUpdate(id: any, ewaybill: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
      '&return_id=' + id + '&eway_bill=' + ewaybill;
    return this.http.post(this.nestUrl + 'kbb_outward/update_eway_bill', form, { headers: this.getHeaders() });
  }

  viewKbb(nrdcId: any, approved?: string) {
    let form = 'id=' + nrdcId;
    if (approved !== undefined && approved !== '') {
      form += '&approved=' + approved;
    }
    return this.http.get(this.nestUrl + 'kbb_outward/print?' + form, {
      headers: this.getHeaders(),
      responseType: 'blob',
    });
  }

  getDriveFiles(ticket_id: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.nestUrl + 'ticket_edit/gdrive_image?' + form, {headers : this.getHeaders()});
  }

  shipmentConfirm(nrdcId: any, remarks: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&nrdc_no=' + nrdcId + '&remarks=' + encodeURIComponent(remarks);
    return this.http.post(this.nestUrl + 'kbb_outward/nrdc_shipment_confirmation', form, { headers: this.getHeaders() });
  }

  bulkReturnCreate(nrdcId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + nrdcId + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/returns_manage', form, {headers : this.reqHeader});
  }

  bulkReturnCreateV2(bulkReturnJSON: any) {
    const jsonHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
      'x-api-key': localStorage.getItem('userToken') || ''
    });
    return this.http.post(this.nestUrl + 'gsxapi/returns_manage_v2', bulkReturnJSON[0], { headers: jsonHeader });
  }

  labelPrint(nrdcId: any, bulkReturnId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&bulk_return_id=' + bulkReturnId + '&doc_type=' + 'bulkReturnLabel'
      + '&nrdc_no=' + nrdcId;
    return this.http.post(this.nestUrl + 'gsxapi/document_download', form,
      { headers: this.getHeaders(), responseType: 'blob' }).pipe(map((res: BlobPart) => {
        return new Blob([res], { type: 'application/zip' });
      }));
  }

  labelSinglePrint(nrdcId: any, bulkReturnId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&bulk_return_id=' + bulkReturnId + '&doc_type=' + 'bulkReturnLabel'
      + '&nrdc_no=' + nrdcId;
    return this.http.post(this.nestUrl + 'gsxapi/document_download', form,
      { headers: this.getHeaders(), responseType: 'blob' }).pipe(map((res: BlobPart) => {
        return new Blob([res], { type: 'application/pdf' });
      }));
  }

  bulkReturnConfirm(nrdcId: any,) {
    const form = '&id=' + nrdcId +'&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'gsxapi/returns_confirmshipment', form, {headers : this.getHeaders()});
  }

  packListPrint(nrdcId: any, bulkReturnId: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&bulk_return_id=' + bulkReturnId + '&doc_type=' + 'returnsPackingList'
      + '&nrdc_no=' + nrdcId;
    return this.http.post(this.nestUrl + 'gsxapi/document_download', form,
      { headers: this.getHeaders(), responseType: 'blob' }).pipe(map((res: BlobPart) => {
        return new Blob([res], { type: 'application/pdf' });
      }));
  }

  validationUpdate(data: any) {
    const form = 'user_id=' + localStorage.getItem('userId') +
      '&data=' + encodeURIComponent(JSON.stringify(data));
    return this.http.post(this.nestUrl + 'kbb_outward/validation_update', form, { headers: this.getHeaders() });
  }

  fetchPartDetails(partNos: string[]) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&part_nos=' + JSON.stringify(partNos);
    return this.http.post(this.nestUrl + 'kbb_outward/get_HSN', form, { headers: this.getHeaders() });
  }

  checkBatteryByRepairIds(payload: { repair_ids: string[]; mode: string; type: string }) {
    const form =
      'user_id=' + localStorage.getItem('userId') +
      '&repair_ids=' + JSON.stringify(payload.repair_ids) +
      '&mode=' + payload.mode +
      '&type=' + payload.type;
    return this.http.post(this.nestUrl + 'kbb_outward/check_battery_compitia', form, { headers: this.getHeaders() });
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
