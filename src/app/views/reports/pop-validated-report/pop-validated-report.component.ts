import { Component } from '@angular/core';
import { PopValidatedReportService } from './pop-validated-report.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-popvalidatedreport',
  templateUrl: './pop-validated-report.component.html',
  styleUrls: ['./pop-validated-report.component.scss', '../../../../scss/customstyle.css'],
  standalone: false
})
export class PopValidatedReportComponent {
  loading = false;
  public fromDate = '';
  toDate = '';
  data: any = [];
  branches: any = [];
  error: any;
  isReport = false;
  isRecords = 0;
  reportHeader = '';
  alert = '';
  branchId = '';
  userRole = localStorage.getItem('userRole');
  columns = ['ticket_id', 'branch_code', 'ticket_date','serial_no', 'part_number', 'description', 'kgb_serial_no', 'kbb_serial_no', 'coverage_option', 'consignment_asn_no', 'zz_invoice_no', 'zz_invoice_date', 'zz_pop_validated'];

  constructor(
    public dataService: PopValidatedReportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.branches = result.branch;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'POP_Validated_Report');
  }

  load(type: any) {
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.goToLoad(type);
    }
  }

  goToLoad(type: any) {
    this.loading = true;
    this.isReport = false;
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

    this.dataService.getPopValidatedReport(this.fromDate, this.toDate, this.branchId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
          }
          if (result.status === true && result.data.length > 0) {
            this.data = result.data;
            this.isReport = true;
            this.isRecords = 0;
            if (btnType === 'export') {
              this.exportAsXLSX();
            }
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
          this.reportHeader = result.header;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.branchId = '';
  }
}
