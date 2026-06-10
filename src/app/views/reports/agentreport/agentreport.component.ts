import { Component } from '@angular/core';
import { AgentreportService } from './agentreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-agentreport',
    templateUrl: './agentreport.component.html',
    styleUrls: ['./agentreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class AgentreportComponent {
  reportLoading = false;
  loading = false;
  public year = '';
  month = '';
  data: any = [];
  productivity: any = [];
  enquires: any = [];
  repairs: any = [];
  months: any = [];
  d = new Date();
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  years: any = [];
  alert = '';
  reportType = '';
  reportName = '';
  reportHeader = '';
  pnL: any = [];
  columns = ['user_name','branch_name','devices','time'];
  constructor(
    public dataService: AgentreportService,
    private excelService: ExcelService
  ) {
    this.getYears();
    this.months = [{ name: 'Jan', val: 1 }, { name: 'Feb', val: 2 }, { name: 'Mar', val: 3 }, { name: 'Apr', val: 4 }
      , { name: 'May', val: 5 }, { name: 'Jun', val: 6 }, { name: 'Jul', val: 7 }, { name: 'Aug', val: 8 },
    { name: 'Sep', val: 9 }, { name: 'Oct', val: 10 }, { name: 'Nov', val: 11 }, { name: 'Dec', val: 12 }];
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Enquiry_Report');
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

  yearSelect(event: string) {
    this.year = event;
  }

  load() {
    this.ticketSearch = '';
    if (this.reportType === '') {
      alert('Please select Report Type');
      return;
    } else if (this.year === '') {
      alert('Please select the Year');
      return;
    } else if (this.month === '') {
      alert('Please select the Month');
      return;
    } else {
      // alert(this.toDate);
      this.getAgentReport();
    }
  }

  getAgentReport() {
    this.reportLoading = true;
    let result: any = [];
    this.dataService.getAgentReport(this.year, this.month, this.reportType)
      .subscribe({
        next: (data: any) => {
          this.reportLoading = false;
          this.loading = false;
          result = data;
          if (this.reportType === 'MAR') {
            this.enquires = result.reportData.enquires;
            this.repairs = result.reportData.repairs;
          }
          if (this.reportType === 'MPR') {
            this.productivity = result.reportData;
          }
          this.reportHeader = result.reportHeader;
          this.reportName = result.reportName;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  clear() {
    this.year = '';
    this.month = '';
    this.isReport = false;
    this.ticketSearch = '';
  }
}
