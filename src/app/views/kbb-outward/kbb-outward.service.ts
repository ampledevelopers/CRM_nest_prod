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
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/check_display_repair', form, {headers : this.reqHeader});
  }

  checkPartDetails(tId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&ticket_id=' + tId;
    return this.http.post(this.rootUrl + 'api/ticketsv3/get_diagnosis', form, {headers : this.reqHeader});

  }

  /* getGsxDetail(repairId) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&repair_id=' + repairId  +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/repair_details', form, {headers : this.reqHeader});
  } */

  getReturnDetailList(fromDate: any, toDate: any, pageNo: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&from_date=' + fromDate + '&to_date=' + toDate + '&page_no=' + pageNo;
    return this.http.post(this.rootUrl + 'api/gsxapi/returns_lookup', form, {headers : this.reqHeader});
  }

  getReturnDetail(repairId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&repairId=' + repairId;
    return this.http.post(this.rootUrl + 'api/gsxapi/returns_lookup', form, {headers : this.reqHeader});
  }

  getRcDc(type: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&type=' + type  +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/returns/get_rc_dc', form, {headers : this.reqHeader});
  }

  getDocuments(id: string | null) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id;
    return this.http.post(this.rootUrl + 'api/tickets/get_documents', form, {headers : this.reqHeader});
  }

  getLocation(code: any) {
    let form: any;
    if (code === '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    } else {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + code + '&user_id=' + localStorage.getItem('userId');
    }
    return this.http.post(this.rootUrl + 'api/returns/get_branch', form, {headers : this.reqHeader});
  }

  kbbSubmit(hd: any, dt: any, cartonBoxes: any, toteBoxes: any): Observable<any> {
    const returnData = {
      'return_hd': hd,
      'return_dt': dt,
      'carton_box': cartonBoxes,
      'tote_box': toteBoxes,
    };
    const data = JSON.stringify(returnData);
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&data=' + data +
    '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/returns/create', form, {headers : this.reqHeader});
  }

  getKbbList(nrdcId: any, ticketId: any, status: any) {
    let form;
    if (nrdcId !== '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&approved='
      + status + '&id=' + nrdcId;
    } else if (ticketId !== '') {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&approved='
      + '' + '&ticket_id=' + ticketId;
    } else {
      form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&approved='
      + status;
    }
    return this.http.get(this.rootUrl + 'api/returns/get_kbb?' + form, {headers : this.reqHeader});
  }

  approveDeclineKbb(id: any, status: any, ewaybill: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&return_id=' + id + '&status=' + status + '&eway_bill=' + ewaybill;
    return this.http.post(this.rootUrl + 'api/returns/approve', form, {headers : this.reqHeader});
  }

  eWayBillUpdate(id: any, ewaybill: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&return_id=' + id + '&eway_bill=' + ewaybill;
    return this.http.post(this.rootUrl + 'api/returns/update_eway_bill', form, {headers : this.reqHeader});
  }

  viewKbb(nrdcId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + nrdcId;
    return this.http.get(this.rootUrl + 'api/returns/print?' + form, {headers : this.reqHeader});
  }

  getDriveFiles(ticket_id: any) {
    const form = 'user_id=' + localStorage.getItem('userId') + '&ticket_id=' + ticket_id;
    return this.http.get(this.nestUrl + 'ticket_edit/gdrive_image?' + form, {headers : this.getHeaders()});
  }

  shipmentConfirm(nrdcId: any, remarks: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&nrdc_no=' + nrdcId + '&remarks=' + remarks;
    return this.http.post(this.rootUrl + 'api/ticketsv3/nrdc_shipment_confirmation', form, {headers : this.reqHeader});
  }

  bulkReturnCreate(nrdcId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + nrdcId + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/returns_manage', form, {headers : this.reqHeader});
  }

  bulkReturnCreateV2(bulkReturnJSON: any) {
    const userToken: any= localStorage.getItem('userToken');
    const diagHeader: any = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True',
    'X-API-KEY': userToken });
    return this.http.post(this.rootUrl + 'api/gsxapi/returns_manage_v2', JSON.stringify(bulkReturnJSON[0]), {headers : diagHeader});
  }

  labelPrint(nrdcId: any, bulkReturnId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&bulk_return_id=' + bulkReturnId + '&doc_type=' + 'bulkReturnLabel'
    + '&nrdc_no=' + nrdcId;
    return this.http.post(this.rootUrl + 'api/gsxapi/document_download', form,
    {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
    return new Blob([res], { type: 'application/zip', });
    }));
  }

  labelSinglePrint(nrdcId: any, bulkReturnId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&bulk_return_id=' + bulkReturnId + '&doc_type=' + 'bulkReturnLabel'
    + '&nrdc_no=' + nrdcId;
    return this.http.post(this.rootUrl + 'api/gsxapi/document_download', form,
    {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
    return new Blob([res], { type: 'application/pdf', });
    }));
  }

  bulkReturnConfirm(nrdcId: any,) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + nrdcId +'&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/gsxapi/returns_confirmshipment', form, {headers : this.reqHeader});
  }

  packListPrint(nrdcId: any, bulkReturnId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&bulk_return_id=' + bulkReturnId + '&doc_type=' + 'returnsPackingList'
    + '&nrdc_no=' + nrdcId;
    return this.http.post(this.rootUrl + 'api/gsxapi/document_download', form,
    {headers : this.reqHeader, responseType: 'blob'}).pipe(map((res: BlobPart) => {
    return new Blob([res], { type: 'application/pdf', });
    }));
  }

  validationUpdate(data: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&data=' + JSON.stringify(data);
    return this.http.post(this.rootUrl + 'api/returns/validation_update', form, {headers : this.reqHeader});
  }

 fetchPartDetails(partNos: string[]) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken') +'&user_id=' + localStorage.getItem('userId') +'&part_nos=' + JSON.stringify(partNos);
  return this.http.post(this.rootUrl + 'api/ticketsv3/get_HSN', form, { headers: this.reqHeader});
}

checkBatteryByRepairIds(payload: { repair_ids: string[]; mode: string ;type:string}) {

  const form =
    'X_API_KEY=' + localStorage.getItem('userToken') +
    '&user_id=' + localStorage.getItem('userId') +
    '&repair_ids=' + JSON.stringify(payload.repair_ids) +
    '&mode=' + payload.mode +
    '&type=' + payload.type;

  return this.http.post(this.rootUrl + 'api/returns/check_battery_compitia',form,{ headers: this.reqHeader });
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
