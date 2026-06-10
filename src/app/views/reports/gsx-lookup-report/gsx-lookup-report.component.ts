import { Component } from '@angular/core';
import { GsxLookupReportService } from './gsx-lookup-report.service';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-gsx-lookup-report',
    templateUrl: './gsx-lookup-report.component.html',
    styleUrls: ['./gsx-lookup-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class GsxLookupReportComponent {
  reportLoading = false;
  loading = true;
  public fromDate = '';
  toDate = '';
  data: any = [];
  // branches: any = [];
  // branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  reportName = '';
  // branchId = '';
  columns = ['date','serial_no','gsx_id','user_id','shipto','soldto','status'];
  constructor(
    public dataService: GsxLookupReportService,
    private excelService: ExcelService
  ) {
    this.loading = false;
    // this.getBranches();
  }

 /*   getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe(
        (data) => {
            result = data;
            if (result.status === true) {
              this.loading = false;
              this.branches = result.branch;
            }
        }, // success path
        error => this.error = error // error path
      );
  }

  branchSelect(event) {
     this.branchId = event.id;
    } */

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'GSX_Product_Lookup_Report');
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
      this.getGsxLookupReport();
    }
  }


  getGsxLookupReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    // let calltype;
    this.dataService.getGsxLookupReport(this.fromDate, this.toDate)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          if (result.status === true && result.data.length > 0) {
            this.data = result.data;
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
    // this.branchId = '';
    this.ticketSearch = '';
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
