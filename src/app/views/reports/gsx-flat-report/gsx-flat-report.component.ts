import { Component } from '@angular/core';
import { GsxFlatReportService } from './gsx-flat-report.service';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-gsx-flat-report',
    templateUrl: './gsx-flat-report.component.html',
    styleUrls: ['./gsx-flat-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class GsxFlatReportComponent {
  loading = false;
  siteTypes: any = [];
  fromDate: any = '';
  toDate: any = '';
  gsxFlatdata: any = [];
  gsxRepairDatas: any = [];
  ticketId: any = [];
  finalDataTemp: any = [];
  siteType: any = '';
  modulePartNoSerialNo: any = [];
  partNo_Description: any = [];
  notificationEmailTemp: any = [];
  notificationSMSTemp: any = [];
  repairPerformedDetails: any = [];
  notificationCtcTemp: any = [];
  actual_fee_charge_to_cust: any = [];
  smsNotice: any = [];
  emailNotice: any = [];
  ctcNotice: any = [];
  repairPerformedTemp: any = [];
  gsxFlatdataTemp: any = [];
  gsxRepairDataTemp: any = [];
  statusData: any = [];
  ticketBinMovementstatus: any = [];
  ticketBinMovementTemp: any = [];
  error: any;

  constructor(
    public dataService: GsxFlatReportService, private excelService: ExcelService
  ) {
    // this.months = [{ name: 'Select Month', val: 'Select Month' }, { name: 'Jan', val: 1 }, { name: 'Feb', val: 2 }, { name: 'Mar', val: 3 }, { name: 'Apr', val: 4 }
    //   , { name: 'May', val: 5 }, { name: 'Jun', val: 6 }, { name: 'Jul', val: 7 }, { name: 'Aug', val: 8 },
    // { name: 'Sep', val: 9 }, { name: 'Oct', val: 10 }, { name: 'Nov', val: 11 }, { name: 'Dec', val: 12 }];
  }

  gsxFlatData() {
    let result;
    this.loading = true;
    this.finalDataTemp = [];
    this.gsxFlatdataTemp = [];
    this.gsxRepairDataTemp = [];
    this.gsxFlatdata = [];
    this.gsxRepairDatas = [];
    this.ticketBinMovementTemp = [];
    this.actual_fee_charge_to_cust = [];
    this.notificationEmailTemp = [];
    this.notificationSMSTemp = [];
    this.notificationCtcTemp = [];
    this.repairPerformedDetails = [];
    this.repairPerformedTemp = [];
    this.ticketId = [];
    if (this.siteType === '') {
      alert('Please select Site Type');
      return;
    } else if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);
      const diffInDays = (to.getTime() - from.getTime()) / (1000 * 3600 * 24);

      if (diffInDays > 15) {
        alert('Please select a date range of 15 days or less.');
        this.clear();
        return;
      }
      this.dataService.gsxFlatData(this.siteType, this.fromDate, this.toDate)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true && result.gsxFlatdata.length > 0) {
              this.gsxFlatdata = result.gsxFlatdata;
              this.gsxRepairDatas = result.gsxRepairData;
              this.ticketBinMovementTemp = result.ticketBinMovement;
              this.repairPerformedDetails = result.invoice_details;
              this.actual_fee_charge_to_cust = result.actual_fee_charge_to_cust;
              this.notificationEmailTemp = result.notification_email;
              this.notificationSMSTemp = result.notification_sms;
              this.notificationCtcTemp = result.notification_ctc;
              for (let i = 0; i < this.gsxFlatdata.length; i++) {
                this.ticketId.push(this.gsxFlatdata[i].id);
              }
              this.ticketId = this.ticketId.filter(function (elem: any, index: any, self: any) {
                return index === self.indexOf(elem);
              });
              for (let i = 0; i < this.ticketId.length; i++) {
                this.gsxFlatdataTemp = this.gsxFlatdata.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                let repairPerformedTemp = this.repairPerformedDetails.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                this.gsxRepairDataTemp = this.gsxRepairDatas.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                let binDataTemp = this.ticketBinMovementTemp.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                let emailDataTemp = this.notificationEmailTemp.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                let smsDataTemp = this.notificationSMSTemp.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                let ctcDataTemp = this.notificationCtcTemp.filter((data: any) => {
                  return data.id === this.ticketId[i]
                });
                this.modulePartNoSerialNo = [];
                this.partNo_Description = [];
                this.smsNotice = [];
                this.emailNotice = [];
                this.ctcNotice = [];
                this.repairPerformedTemp = [];
                this.ticketBinMovementstatus = [];

                for (let j = 0; j < this.gsxRepairDataTemp.length; j++) {
                  if (this.gsxRepairDataTemp !== undefined) {
                    this.partNo_Description.push((this.gsxRepairDataTemp[j].part_number === '' ? '' : this.gsxRepairDataTemp[j].part_number + ' & ') + (this.gsxRepairDataTemp[j].description === '' ? '' : this.gsxRepairDataTemp[j].description));
                    this.modulePartNoSerialNo.push((this.gsxRepairDataTemp[j].part_number === '' ? '' : 'KBB Part No: ' + this.gsxRepairDataTemp[j].part_number + ' & ') + (this.gsxRepairDataTemp[j].kbb_serial_no === '' ? '' : 'KBB Serial No: ' + this.gsxRepairDataTemp[j].kbb_serial_no + ' & ') + (this.gsxRepairDataTemp[j].kgb_part_no === '' ? '' : 'KGB Part No: ' + this.gsxRepairDataTemp[j].kgb_part_no + ' & ')
                      + (this.gsxRepairDataTemp[j].kgb_serial_no === '' ? '' : 'KGB Serial No: ' + this.gsxRepairDataTemp[j].kgb_serial_no));
                  }
                }
                for (let k = 0; k < binDataTemp.length; k++) {
                  if (binDataTemp !== undefined) {
                    this.ticketBinMovementstatus.push((binDataTemp[k].status === '' ? '' : binDataTemp[k].status + ' & ') + (binDataTemp[k].entrytime === '' ? '' : binDataTemp[k].entrytime));
                  }
                }
                for (let k = 0; k < emailDataTemp.length; k++) {
                  if (emailDataTemp !== undefined && emailDataTemp[k].email !== null) {
                    this.emailNotice.push((emailDataTemp[k].email === '' ? '' : emailDataTemp[k].email + ' & ') + (emailDataTemp[k].emailentrytime === '' ? '' : emailDataTemp[k].emailentrytime));
                  }
                }
                for (let k = 0; k < smsDataTemp.length; k++) {
                  if (smsDataTemp !== undefined && smsDataTemp[k].sms !== null) {
                    this.smsNotice.push((smsDataTemp[k].sms === '' ? '' : smsDataTemp[k].sms + ' & ') + (smsDataTemp[k].smsentrytime === '' ? '' : smsDataTemp[k].smsentrytime));
                  }
                }
                for (let k = 0; k < ctcDataTemp.length; k++) {
                  if (ctcDataTemp !== undefined && ctcDataTemp[k].ctc !== null) {
                    this.ctcNotice.push((ctcDataTemp[k].ctc === '' ? '' : ctcDataTemp[k].ctc + ' & ') + (ctcDataTemp[k].ctcentrytime === '' ? '' : ctcDataTemp[k].ctcentrytime));
                  }
                }
                for (let k = 0; k < repairPerformedTemp.length; k++) {
                  if (repairPerformedTemp !== undefined && repairPerformedTemp[k].user_name !== null) {
                    this.repairPerformedTemp.push((repairPerformedTemp[k].user_name === '' ? '' : repairPerformedTemp[k].user_name + ' & ') + (repairPerformedTemp[k].invoice_id === '' ? '' : repairPerformedTemp[k].invoice_id + ' & ') + (repairPerformedTemp[k].invoice_created_date === '' ? '' : repairPerformedTemp[k].invoice_created_date));
                  }
                }
                let repairPaymentValue = '0.00';
                let paymentDateValue = '';
                if (this.gsxFlatdataTemp[0].repair_payment !== undefined && this.gsxFlatdataTemp[0].repair_payment !== '0.00') {
                  repairPaymentValue = this.gsxFlatdataTemp[0].repair_payment;
                  if (this.gsxFlatdataTemp[0].customerPaymentDate !== undefined && this.gsxFlatdataTemp[0].customerPaymentDate !== '') {
                    paymentDateValue = this.gsxFlatdataTemp[0].customerPaymentDate;
                  }
                } else {
                  repairPaymentValue = '0.00';
                  paymentDateValue = '';
                }

                if (this.gsxFlatdataTemp !== undefined) {
                  this.modulePartNoSerialNo = this.modulePartNoSerialNo.toString();
                  this.partNo_Description = this.partNo_Description.toString();
                  this.smsNotice = this.smsNotice.toString();
                  this.emailNotice = this.emailNotice.toString();
                  this.ctcNotice = this.ctcNotice.toString();
                  this.repairPerformedTemp = this.repairPerformedTemp.toString();
                  this.ticketBinMovementstatus = this.ticketBinMovementstatus.toString();
                  this.finalDataTemp.push({
                    shipTo: this.gsxFlatdataTemp[0].ship_to,
                    soldTo: this.gsxFlatdataTemp[0].sold_to,
                    location_of_repair: this.gsxFlatdataTemp[0].branch_name + ',' + this.gsxFlatdataTemp[0].city,
                    customer_name: this.gsxFlatdataTemp[0].customer_name === undefined ? '' : this.gsxFlatdataTemp[0].customer_name,
                    customer_phone_no: this.gsxFlatdataTemp[0].customer_phone_no === undefined ? '' : this.gsxFlatdataTemp[0].customer_phone_no,
                    customer_email: this.gsxFlatdataTemp[0].email === undefined ? '' : this.gsxFlatdataTemp[0].email,
                    customer_address: (this.gsxFlatdataTemp[0].address1 === undefined ? ' ' : this.gsxFlatdataTemp[0].address1 + ' ') + (this.gsxFlatdataTemp[0].address2 === undefined ? ' ' : this.gsxFlatdataTemp[0].address2),
                    customer_city: this.gsxFlatdataTemp[0].custCity === undefined ? ' ' : this.gsxFlatdataTemp[0].custCity,
                    customer_state: this.gsxFlatdataTemp[0].state === undefined ? '' : this.gsxFlatdataTemp[0].state,
                    pincode: this.gsxFlatdataTemp[0].pin === undefined ? '' : this.gsxFlatdataTemp[0].pin,
                    enquiry: this.gsxFlatdataTemp[0].enquiry_flag === undefined ? '' : this.gsxFlatdataTemp[0].enquiry_flag,
                    raf: this.gsxFlatdataTemp[0].new_branch_code + this.gsxFlatdataTemp[0].id,
                    branch: this.gsxFlatdataTemp[0].branch_code,
                    date_unit_was_received: this.gsxFlatdataTemp[0].entrytime,
                    purchased_in: this.gsxFlatdataTemp[0].purchased_in,
                    customer_reported: this.gsxFlatdataTemp[0].customer_query,
                    customer_incoming_component_code: this.gsxFlatdataTemp[0].cust_component_code,
                    customer_incoming_issue_code: this.gsxFlatdataTemp[0].cust_issue_code,
                    component_code: this.gsxFlatdataTemp[0].component_code,
                    component_code_description: this.gsxFlatdataTemp[0].component_description_string,
                    issue_code: this.gsxFlatdataTemp[0].issue_code,
                    issue_code_description: this.gsxFlatdataTemp[0].issue_description_string,
                    component_code_1: this.gsxFlatdataTemp[0].customer_component_description_string,
                    issue_code_1: this.gsxFlatdataTemp[0].customer_issue_description_string,
                    component_code_2: this.gsxFlatdataTemp[0].customer_component_description_string1,
                    issue_code_2: this.gsxFlatdataTemp[0].customer_issue_description_string1,
                    technician_comment: this.gsxFlatdataTemp[0].technician_comment,
                    status_of_repair_services: this.gsxFlatdataTemp[0].gsx_status_description,
                    repair_type: this.gsxFlatdataTemp[0].repair_type,
                    g_number: this.gsxFlatdataTemp[0].g_number,
                    device_coverage: this.gsxFlatdataTemp[0].warranty_status,
                    repair_created_date: this.gsxFlatdataTemp[0].repair_created_date,
                    purchase_order_number: this.gsxFlatdataTemp[0].po_number,
                    service_provided: this.gsxFlatdataTemp[0].coverage_status_description,
                    partNo_Description: this.partNo_Description,
                    details_of_repair_performed: this.gsxFlatdataTemp[0].technician_note,
                    svc_remarks: this.gsxFlatdataTemp[0].svc_remarks,
                    product: this.gsxFlatdataTemp[0].product_description,
                    product_serialNo: this.gsxFlatdataTemp[0].serial_no,
                    modulePartNo_serialNo: this.modulePartNoSerialNo,
                    online_estimation_paid: repairPaymentValue,
                    online_estimation_paid_date: paymentDateValue,
                    non_ebs_payment: this.gsxFlatdataTemp[0].erp_amount === undefined ? '0.00' : this.gsxFlatdataTemp[0].erp_amount,
                    non_ebs_payment_date: this.gsxFlatdataTemp[0].date,
                    actual_fee_charge_to_cust: this.gsxFlatdataTemp[0].repair_payment,
                    apple_invoice: this.repairPerformedTemp,
                    ticketBinMovementstatus_Date: this.ticketBinMovementstatus,
                    mark_complete_date: this.gsxFlatdataTemp[0].mark_complete_date,
                    smsNotification: this.smsNotice === undefined ? '' : this.smsNotice,
                    emailNotification: this.emailNotice === undefined ? '' : this.emailNotice,
                    ctcNotification: this.ctcNotice === undefined ? '' : this.ctcNotice,
                  });
                }
              }
              this.excelService.exportAsExcelFile(this.finalDataTemp, 'GSX-Flat_Report');
              this.loading = false;
            } else {
              this.loading = false;
              alert('Data not available');
            }
          }
        })
    }
  }

  clear() {
    this.siteType = '';
    this.fromDate = '';
    this.toDate = '';
    this.loading = false;
    this.finalDataTemp = [];
    this.gsxFlatdataTemp = [];
    this.gsxRepairDataTemp = [];
    this.gsxFlatdata = [];
    this.gsxRepairDatas = [];
    this.ticketBinMovementTemp = [];
    this.notificationEmailTemp = [];
    this.notificationSMSTemp = [];
    this.repairPerformedDetails = [];
    this.repairPerformedTemp = [];
    this.actual_fee_charge_to_cust = [];
    this.notificationCtcTemp = [];
    this.ticketId = [];
  }
}
