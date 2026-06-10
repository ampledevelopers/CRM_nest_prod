import { Component } from '@angular/core';
import { OnsitereportService } from './onsitereport.service';

import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-onsitereport',
    templateUrl: './onsitereport.component.html',
    styleUrls: ['./onsitereport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class OnsitereportComponent {
  reportLoading = false;
  public fromDate = '';
  toDate = '';
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  companies: any = [];
  company = 'Select Company Name';
  companyId = '';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  reportHeader = '';
  alert = '';
  branchId = '';
  columns = ['id','branch_code','serial_no','logger_name','entrytime','customer_name','repair_type','assigned_user_name','assigned_time','repair_status','product_description','warranty_status','quotation_new_flag','rfpu_date', 'mark_complete_date'];
  constructor(
    public dataService: OnsitereportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    this.getCompanies();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          // console.log(result);
          this.branches = result.branch;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getCompanies() {
    let result;
    this.dataService.getCompanies()
      .subscribe({
        next: (data: any) => {
          result = data;
          // console.log(result);
          this.companies = result.company;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: { id: string; }) {
    this.branchId = event.id;
  }

  companySelect(event: any) {
    this.companyId = event;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Onsite_Report');
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
      this.getOnsiteReport();
    }
  }

  getOnsiteReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    // let calltype;   // , this.companyId
    this.dataService.getOnsiteReport(this.fromDate, this.toDate, this.branchId, this.companyId)
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
