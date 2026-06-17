import { Component } from '@angular/core';
import { SvrreportService } from './svrreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-svrreport',
    templateUrl: './svrreport.component.html',
    styleUrls: ['./svrreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class SvrreportComponent {

  reportLoading = false;
  date = new Date();
  public fromDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString();
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
  branchList: any = [];
  branchListTemp: any = [];
  userRole = localStorage.getItem('userRole');
  // siteType = '';
  columns = ['id','branch_code','raf_created_time','family'];
  constructor(
    public dataService: SvrreportService,
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
  branchSelect(event: any) {
    this.branchList = event;
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
    } else if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.getSvrReport(type);
    }
  }

  getSvrReport(type: any) {
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
    this.dataService.getSvrReport(this.fromDate, this.toDate, this.branchId, this.reportType, this.siteType)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          const achievedRows = result.svr_acheived ?? result.svr_achieved ?? [];
          const hasRows = (result.data?.length > 0) || (achievedRows.length > 0);

          if (result.status === true && hasRows) {
            if (this.reportType === 'TRAF') {
              this.data = result.data.filter((item: { repair_type: string; }) => item.repair_type !== 'SVNR');
            } else if (this.reportType === 'SVR') {
              this.data = this.mergeSvrReportData(result.data ?? [], achievedRows)
                .filter((item: { part_number: any; }) => this.hasPartNumber(item.part_number));
            } else {
              this.data = (result.data ?? []).map((item: any) => this.normalizeRow(item));
            }
            this.isReport = this.data.length > 0;
            this.isRecords = this.data.length > 0 ? 0 : 1;
            if (this.data.length === 0) {
              alert('No Records Found.');
            }
            this.reportName = result.name;
            if (this.isReport && btnType === 'export') {
              this.exportAsXLSX();
            }
          } else {
            this.isRecords = 1;
            this.isReport = false;
            // this.alert = "No Records Found.";
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
    this.ticketSearch = '';
    this.siteType = 'Select Site Type';
  }

  mergeSvrReportData(eligible: any[], achieved: any[]): any[] {
    const achievedMap = new Map<string, any>();
    for (const row of achieved) {
      achievedMap.set(String(row.id), this.normalizeRow(row));
    }

    const merged = new Map<string, any>();

    for (const row of eligible) {
      const id = String(row.id);
      const normalized = this.normalizeRow(row);
      const achievedRow = achievedMap.get(id);
      merged.set(id, {
        ...normalized,
        elapsed_time: achievedRow?.elapsed_time ?? this.calcElapsedTime(normalized),
        achieved_status: achievedRow ? 'Yes' : 'No',
      });
    }

    for (const [id, achievedRow] of achievedMap) {
      if (!merged.has(id)) {
        merged.set(id, {
          ...achievedRow,
          achieved_status: 'Yes',
        });
      }
    }

    return Array.from(merged.values());
  }

  normalizeRow(row: any): any {
    return {
      ...row,
      svc_time: row.svc_time ?? row.SVC_time ?? '',
    };
  }

  calcElapsedTime(item: any): string {
    const svcTime = item.svc_time ?? item.SVC_time;
    if (!item.raf_created_time || !svcTime) {
      return '';
    }
    const raf = new Date(item.raf_created_time.replace(' ', 'T')).getTime();
    const svc = new Date(String(svcTime).replace(' ', 'T')).getTime();
    if (isNaN(raf) || isNaN(svc)) {
      return '';
    }
    return String(Math.round((svc - raf) / 60000));
  }

  displayValue(value: any): string {
    if (value == null || value === 'null' || value === '<null>') {
      return '';
    }
    return String(value);
  }

  getSvcTime(item: any): string {
    return this.displayValue(item.svc_time ?? item.SVC_time);
  }

  getAchievedStatus(item: any): string {
    if (item.achieved_status != null && item.achieved_status !== '') {
      return String(item.achieved_status);
    }
    if (this.reportType === 'SARAF' || this.reportName === 'SARAF') {
      return 'Yes';
    }
    return 'No';
  }

  hasPartNumber(value: any): boolean {
    return value != null && value !== '' && value !== 'null' && value !== '<null>';
  }
}
