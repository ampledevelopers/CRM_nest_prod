import { Component } from '@angular/core';
import { TokenreportService } from './tokenreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-tokenreport',
    templateUrl: './tokenreport.component.html',
    styleUrls: ['./tokenreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class TokenreportComponent {

  reportLoading = false;
  date = new Date();
  datePipe = new DatePipe('en-US');
  // public fromDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString();
  public fromDate = '';
  toDate = '';
  // toDate = new Date().toLocaleDateString();
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  reportHeader = '';
  alert = '';
  branchId = '';
  todayDate: any;
  buttonSpin = false;
  userRole = localStorage.getItem('userRole');
  columns = ['token_no', 'branch_code','new_branch_code', 'first_name', 'last_name', 'user_id', 'phone', 'email' ,'family', 'warranty_type','brand', 'token_type', 'enquiry_flag', 'token_time', 'accepted_at', 'token_closedAt', 'user_name', 'service_type', 'CustomerWaitTime', 'CustomerAttendTime','promo_disclaimer','ticket_id', 'no_sale_reason','reason_for_closure'];
  constructor(
    public dataService: TokenreportService,
    private excelService: ExcelService
  ) {
    this.todayDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.getBranches();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.branches = result.branch;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: { id: string; }) {
    this.branchId = event.id;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Token_Report');
  }

  load(type: any) {
    const btnType = type;
    this.buttonSpin = true;
    this.ticketSearch = '';
    if ((this.userRole !== '3') && (this.userRole !== '10') && (this.userRole !== '11') && (this.userRole !== '15') && (this.userRole !== '2') && (this.branchId === '')) {
      alert('Please select Branch');
      return;
    } else if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.goToLoad(type);
    }
  }

  goToLoad(type: any) {
    this.reportLoading = true;
    this.isReport = false;
    const btnType = type;
    let result;
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
    // const hour = new Date().getHours();

    // if (hour >= 11 && hour < 20 && diff > 31) {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.reportLoading = false;
      return;
  }
    this.dataService.getTokenReport(this.fromDate, this.toDate, this.branchId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          if (result.status === true && result.data.length > 0) {
            this.data = result.data;
            this.isReport = true;
            this.isRecords = 0;
            for (let j = 0; j < this.data.length; j++) {
              let date = this.datePipe.transform(this.data[j].token_time, 'yyyy-MM-dd');
              if (this.data[j].enquiry_flag === 'I' && date === this.todayDate) {
                this.data[j].enquiry_flag = 'New';
              } else if (this.data[j].enquiry_flag === 'I' && date !== this.todayDate) {
                this.data[j].enquiry_flag = 'Abandon';
              } else if (this.data[j].enquiry_flag === 'Y') {
                this.data[j].enquiry_flag = 'Yes';
              } else if (this.data[j].enquiry_flag === 'N') {
                this.data[j].enquiry_flag = 'No';
              } else if (this.data[j].enquiry_flag === null) {
                this.data[j].enquiry_flag = 'NA';
              }
            }
            if (btnType === 'export') {
              this.exportAsXLSX();
            }
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
          this.reportHeader = result.header;
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
