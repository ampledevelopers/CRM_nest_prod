import { Component } from '@angular/core';
import { MenulogreportService } from './menulogreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-menulogreport',
    templateUrl: './menulogreport.component.html',
    styleUrls: ['./menulogreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class MenulogreportComponent {
  reportLoading = false;
  public fromDate = '';
  toDate = '';
  menuName = '';
  data: any = [];
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  columns = ['menu_name','branch_code','user_name','entrytime'];
  constructor(
    public dataService: MenulogreportService,
    private excelService: ExcelService
  ) {
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'menu_log_Report');
  }

  load() {
    this.ticketSearch = '';
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else if (this.menuName === '') {
      alert('Please select the Menu Name');
      return;
    } else {
      // alert(this.toDate);
      this.getMenuLogReport();
      // }
    }
  }

  getMenuLogReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    // let calltype;
    this.dataService.getMenuLogReport(this.fromDate, this.toDate, this.menuName)
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
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.ticketSearch = '';
    this.menuName = '';
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
