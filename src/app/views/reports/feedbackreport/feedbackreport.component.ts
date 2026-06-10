import { Component } from '@angular/core';
import { FeedbackreportService } from './feedbackreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-feedbackreport',
    templateUrl: './feedbackreport.component.html',
    styleUrls: ['./feedbackreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class FeedbackreportComponent {
  reportLoading = false;
  loading = true;
  public fromDate = '';
  toDate = '';
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  reportName = '';
  branchId = '';
  branchList: any = [];
  branchListTemp: any = [];
  userRole = localStorage.getItem('userRole');
  columns = ['ticket_id','branch_code','g_number','sr_date','smileyfeedback','cc_feedback','apple_csat_rating','customer_name','customer_phone_no','customer_email_id','product_description','warranty_status','coverage_status_description','family','repair_type','user_name','comment'];
  constructor(
    public dataService: FeedbackreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.branches = result.branch;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: { id: string; }) {
    this.branchList = event;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Feedback_Report');
  }

  load() {
    this.ticketSearch = '';
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      // alert(this.toDate);
      this.getFeedbackReport();
    }
  }


  getFeedbackReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    this.data = [];
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.reportLoading = false;
      return;
  }
    this.dataService.getFeedbackReport(this.fromDate, this.toDate, this.branchId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          if (result.status === true && result.data.length > 0) {
            // this.data = result.data;
            for (let i = 0; i < result.data.length; i++) {
              this.data.push({
                ticket_id: result.data[i].ticket_id,
                branch_code: result.data[i].branch_code,
                g_number: result.data[i].g_number,
                sr_date: result.data[i].sr_date,
                smileyfeedback: result.data[i].smileyfeedback,
                cc_feedback: result.data[i].cc_feedback,
                apple_csat_rating: result.data[i].apple_csat_rating,
                customer_name: result.data[i].customer_name,
                customer_phone_no: result.data[i].customer_phone_no,
                customer_email_id: result.data[i].customer_email_id,
                product_description: result.data[i].product_description,
                warranty_status: result.data[i].warranty_status,
                coverage_status_description: result.data[i].coverage_status_description,
                family: result.data[i].family,
                repair_type: result.data[i].repair_type,
                user_name: result.data[i].user_name,
                comment: result.data[i].comment
              })
            }
            this.reportName = result.header;
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.branchId = '';
    this.ticketSearch = '';
  }


}
