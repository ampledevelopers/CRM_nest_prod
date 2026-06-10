import { Component } from '@angular/core';
import { RepairsreportService } from './repairsreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {ExcelService} from '../excel.service';

@Component({
    selector: 'app-repairsreport',
    templateUrl: './repairsreport.component.html',
    styleUrls: ['./repairsreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})

export class RepairsreportComponent  {
  date = new Date();
  public fromDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString();
  toDate = new Date().toLocaleDateString();
  reportType = '';
  data: any = [];
  branches: any = [];
  statuses: any = [];
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
  statusId = '';
  sitetypeId = '';
  userRole = localStorage.getItem('userRole');
  loading = false;

  // siteType = '';
  columns: any = [];
  constructor(
    public dataService: RepairsreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    // this.getStatuses();
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

  getStatuses(id: string) {
    let result;
    this.dataService.getStatuses(id)
    // this.dataService.getStatuses()
      .subscribe({
        next: (data: any) => {
            result = data;
            // console.log(result);
              this.statuses = result.status;
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
     if (this.sitetypeId !== 'Select Site Type') {
     this.getStatuses(this.sitetypeId);
     } else {
      this.statuses = [];
     }
    }
  branchSelect(event: string) {
     this.branchId = event;
    }
    statusSelect(status: any) {
      this.statusId = status;
    }

  exportAsXLSX(): void {
    this.ticketSearch = '';
    this.excelService.exportAsExcelFile(this.data, this.reportType);
  }

  load(type: any) {
    this.ticketSearch = '' ;
    if (this.reportType === '') {
      alert('Please select Report Type');
      return;
    } else if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.getRepairsReport(type);
    }
  }

 getRepairsReport(type: any) {
  this.isReport = false;
  this.loading = true;
  const btnType = type;
  let result;
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);
  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.loading = false;
      return;
  }
  // let calltype;
  this.dataService.getRepairsReport(this.fromDate, this.toDate, this.branchId, this.statusId, this.reportType, this.siteType)
    .subscribe({
      next: (data: any) => {
          result = data;
          if (result.status === true && result.data.length > 0)  {
            this.data = result.data;
              this.isReport = true;
              this.loading = false;
              this.isRecords = 0;
              this.reportName = result.name;
              if(this.reportName === 'CIN' || this.reportName === 'WUMS') {
                this.columns = ['id','branch_code','new_branch_code','repair_category','customer_name','customer_phone_no','serial_no','product_description','Ticket_repairType','status_name','warranty_status','type','family','closed_at','created_date','user_name','assigned_time','service_type','service_type','entrytime'];
              }else if(this.reportName === 'AOC') {
                this.columns = ['id','branch_code','new_branch_code','repair_category','customer_name','customer_phone_no','serial_no','product_description','Ticket_repairType','status_name','warranty_status','type','family','closed_at','created_date','user_name','assigned_time', 'service_type', 'service_type', 'entrytime', 'AC+_details'];
              } else if(this.reportName === 'RA') {
                this.columns = ['id', 'branch_code', 'new_branch_code', 'remarks', 'user_name', 'Status_From', 'Status_To', 'entrytime'];
              } else if(this.reportName === 'GSXR') {
                this.columns = ['customer_name','customer_phone_no','customer_email_id','serial_no','branch_code','new_branch_code','ticket_id','repair_status','ship_to','repair_category','repair_created_date','dispatch_id','part_number','part_description','coverage_status_description','coverage_option','rts_requote_status','rts_requote_status2','reference_number','return_code','product_name','country_of_purchase','product_family','compTIA_code_component_issue_code','ready_for_pickup_date',
                'mark_complete_date','closed_and_complete_date','gsx_rfpu_date','gsx_mark_complete_date','technician_name','AC+_details'];
              } else if(this.reportName === 'MGSXR') {
                this.columns = ['customer_name','customer_phone_no','customer_email_id','serial_no','branch_code','new_branch_code','ticket_id','repair_status','ship_to','repair_category','repair_created_date','dispatch_id','part_number','part_description','coverage_status_description','coverage_option','rts_requote_status','rts_requote_status2','reference_number','return_code','product_name','country_of_purchase','product_family','compTIA_code_component_issue_code','ready_for_pickup_date',
                'mark_complete_date','closed_and_complete_date','gsx_rfpu_date','gsx_mark_complete_date','technician_name'];
              } else if(this.reportName === 'KGB update') {
                this.columns = ['branch_code','new_branch_code','ticket_id','device_id','part_number','description','kgb_serial_no','kgb_part_no','kbb_serial_no','g_number','repair_created_date'];
              }
              if (btnType === 'export') {
                this.exportAsXLSX();
              }
              } else {
                this.isRecords = 1;
                this.isReport = false;
                this.loading = false;
                alert('No Records Found.');
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
  this.statusId = '';
  this.ticketSearch = '';
  this.siteType = 'Select Site Type';
  }

}


