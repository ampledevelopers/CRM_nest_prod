import { Component } from '@angular/core';
import { ConsignmentstockstatusreportService } from './consignmentstockstatusreport.service';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-consignmentstockstatusreport',
    templateUrl: './consignmentstockstatusreport.component.html',
    styleUrls: ['./consignmentstockstatusreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class ConsignmentstockstatusreportComponent {
  reportLoading = false;
  loading = true;
  public fromDate = '';
  toDate = '';
  stockType = '';
  stockStatus = '';
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  partNo = '';
  branchList: any = [];
  branchListTemp: any = [];
  columns = ['branch_code','new_branch_code','part_no','serial_no','stock_type','asn_no','erp_asn','status','acknowledge_date','blocked_ticket_id','blocked_time','issued_ticket_id','issued_date','replenishment_ticket_id'];
  constructor(
    public dataService: ConsignmentstockstatusreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    this.loading = false;
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

  branchSelect(event: { id: string; }) {
    this.branchList = event;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'consignment_stock_status_report');
  }

  load() {
    this.ticketSearch = '';
   /*  if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {} */
      this.getConsignmentStockStatusReport();
  }

  getConsignmentStockStatusReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    this.dataService.getConsignmentStockStatusReport(this.branchId, this.stockType, this.stockStatus, this.partNo)
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
    this.stockType = '';
    this.stockStatus = '';
  }
}
