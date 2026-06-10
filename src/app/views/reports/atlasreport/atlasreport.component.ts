import { Component } from '@angular/core';
import { AtlasreportService } from './atlasreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-atlasreport',
    templateUrl: './atlasreport.component.html',
    styleUrls: ['./atlasreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class AtlasreportComponent {
  reportLoading = false;
  loading = true;
  public techId = '';
  // fromDate = '';
  // toDate = '';
  data: any = [];
  branches: any = [];
  certificates: any = [];
  branch = 'Select Branch Name';
  certificate = 'Select Certificate Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  branchList: any = [];
  branchListTemp: any = [];
  certificateId = '';
  certificateList: any = [];
  certificateTemp: any = [];
  columns = ['certification_id','certification_name','certification_group','branch_code','new_branch_code','user_name','group_name','completion_date'];
  constructor(
    public dataService: AtlasreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    this.getCertificates();
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

  branchSelect(event: any) {
    this.branchList = event;
  }

  getCertificates() {
    let result;
    this.dataService.getCertificates()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.certificates = result.certificates;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  certificateSelect(event: any) {
    this.certificateList = event;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Atlas_Certification_Report');
  }

  load() {
    this.ticketSearch = '';
    //  if (this.fromDate === '') {
    //     alert('Please select the From Date');
    //     return;
    //   } else if (this.toDate === '') {
    //     alert('Please select the To Date');
    //     return;
    //   } else {
    // alert(this.toDate);
    this.getAtlasCertificateReport();
    // }
  }

  getAtlasCertificateReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    // let calltype;
    this.dataService.getAtlasCertificateReport(this.techId, this.certificateId, this.branchId)
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
        }, // success path
        error: error => this.error = error // error path
      });
  }
  clear() {
    // this.fromDate = '';
    // this.toDate = '';
    this.isReport = false;
    this.branchId = '';
    this.ticketSearch = '';
    this.certificateId = '';
    this.techId = '';
  }
 tableDataCellProps(item: any, column: string): any {
  return {
    color: 'custom-white', // Custom class
    align: 'center',
    active: true
  };
}


tableDataCellClasses(item: any, columnName: string): string[] {
  // Add classes based on cell content
  if (columnName === 'status') {
    if (item[columnName] === 'Pending') {
      return ['text-warning'];
    } else if (item[columnName] === 'Completed') {
      return ['text-success'];
    } else {
      return ['text-danger'];
    }
  }
  return [];
}

}

