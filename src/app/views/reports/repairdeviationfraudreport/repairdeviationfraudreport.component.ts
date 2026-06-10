import { Component } from '@angular/core';
import { RepairdeviationfraudreportService } from './repairdeviationfraudreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-repairdeviationfraudreport',
    templateUrl: './repairdeviationfraudreport.component.html',
    styleUrls: ['./repairdeviationfraudreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class RepairdeviationfraudreportComponent {
  reportLoading = false;
  date = new Date();
  public fromDate = '';
  toDate = '';
  reportType = '';
  data: any = [];
  branches: any = [];
  site_types: any = [];
  siteType = 'Select Site Type';
  branch = 'All Branches';
  error: any;
  isReport = false;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isRecords = 0;
  reportName = '';
  reportHeader = '';
  alert = '';
  branchId = '';
  sitetypeId = '';
  userRole = localStorage.getItem('userRole');
  // siteType = '';
  columns: any = [];

  constructor(
    public dataService: RepairdeviationfraudreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    this.getSitetypes();
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

  getSitetypes() {
    let result;
    this.dataService.getSitetypes()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.site_types = result.site_types;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  sitetypeSelect(siteId: string) {
    this.sitetypeId = siteId;
  }

  reportTypeSelect(report: string) {
    this.reportType = report;
  }
  branchSelect(event: string) {
    this.branchId = event;
  }

  exportAsXLSX(): void {
    this.ticketSearch = '';
    this.excelService.exportAsExcelFile(this.data, this.reportType);
  }

  load(type: any) {
    this.ticketSearch = '';
    if (this.reportType === '') {
      alert('Please select Report Type');
      return;
    }
    if(this.reportType === 'Fraud') {
      this.getRepairdeviatiobfraudReport(type);
    } else if(this.reportType !== 'Fraud') {
      if (this.fromDate === '') {
        alert('Please select the From Date');
        return;
      } else if (this.toDate === '') {
        alert('Please select the To Date');
        return;
      } else {
        this.getRepairdeviatiobfraudReport(type);
      }
    }
  }

  getRepairdeviatiobfraudReport(type: any) {
    this.reportLoading = true;
    this.isReport = false;
    const btnType = type;
    let result;
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.reportLoading = false;
      return;
  }
    // let calltype;
    if (this.reportType == 'Fraud') {
      this.columns = ['branch_code','new_branch_code','RAF_No','raf_date','customer_phone_no','family','product_description','serial_no','repair_type','raf_created_by','assigned_technician_name'];
    } else {
      this.columns = ['branch_code','new_branch_code','ticket_id','product_family','product_description','technician_name','repair_declined_at','deviation_reason','declined_level','declined_by'];
    }
    this.dataService.getRepairdeviatiobfraudReport(this.fromDate, this.toDate, this.branchId, this.reportType, this.siteType)
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
            this.reportName = result.name;
            if (btnType === 'export') {
              this.exportAsXLSX();
            }
          } else {
            this.isRecords = 1;
            this.isReport = false;
            alert("No Records Found");
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
    this.branch = 'All Branches';
    this.branchId = '';
    this.ticketSearch = '';
    this.siteType = 'Select Site Type';
  }


}
