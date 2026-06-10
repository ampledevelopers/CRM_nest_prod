import { Component } from '@angular/core';
import { QuarterlyreportService } from './quarterlyreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-quarterlyreport',
    templateUrl: './quarterlyreport.component.html',
    styleUrls: ['./quarterlyreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class QuarterlyreportComponent {
  reportLoading = false;
  public error: any;
  quarter = '';
  year = '';
  data: any = [];
  branches: any = [];
  years: any = [];
  branch = 'Select Branch Name';
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  buttonSpin = false;
  flag = 0;
  reportHeader = '';
  branch_data: any = [];
  columns = ['date','day','token','raf','war','oow','rafPcent','delivery','deliveryPcent','npt','awt','advTot','billTot'];
  constructor(
    public dataService: QuarterlyreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    this.getYears();
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

  getYears() {
    let result;
    this.dataService.getYears()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.years = result.year;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: string) {
    this.branchId = event;
  }

  yearSelect(event: string) {
    this.year = event;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'quarterly_report');
  }

  load(type: any) {
    const btnType = type;
    this.buttonSpin = true;
    this.ticketSearch = '';
    if (this.quarter === '') {
      alert('Please select the From Date');
      return;
    } else if (this.year === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.reportLoading = true;
      this.isReport = false;
      let result;
      // let calltype;
      this.dataService.getQuarterlyReport(this.quarter, this.year, this.branchId)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.reportLoading = false;
            }
            if (result.status === true && result.data.length > 0) {
              this.buttonSpin = false;
              this.data = result.data;
              this.isReport = true;
              this.isRecords = 0;
              this.reportHeader = result.header;
              this.branch_data = result.branch;
              this.flag = result.flag;
              if (btnType === 'export') {
                this.exportAsXLSX();
              }
            } else {
              this.buttonSpin = false;
              this.isRecords = 1;
              this.isReport = false;
              this.alert = 'No Records Found';
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
  }

  clear() {
    this.year = '';
    this.quarter = '';
    this.isReport = false;
    this.branchId = '';
    this.ticketSearch = '';
  }
}
