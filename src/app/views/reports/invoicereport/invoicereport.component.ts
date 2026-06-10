import { Component } from '@angular/core';
import { InvoicereportService } from './invoicereport.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-invoicereport',
  templateUrl: './invoicereport.component.html',
  styleUrls: ['./invoicereport.component.scss', '../../../../scss/customstyle.css'],
  standalone: false
})
export class InvoicereportComponent {
  reportLoading = false;
  fromDate = '';
  toDate = '';
  data: any[] = [];
  branches: any[] = [];
  branchId: any = '';
  isReport = false;
  isRecords = 0;
  alert = '';
  error: any;
  p = 1;

  constructor(
    public dataService: InvoicereportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
  }

  getBranches() {
    this.dataService.getBranches().subscribe({
      next: (res: any) => {
        this.branches = res?.branch || [];
      },
      error: (error: any) => this.error = error
    });
  }

  load() {
    if (!this.fromDate) {
      alert('Please select the From Date');
      return;
    }
    if (!this.toDate) {
      alert('Please select the To Date');
      return;
    }
    this.getInvoiceReport();
  }

  getInvoiceReport() {
    this.reportLoading = true;
    this.isReport = false;
    this.isRecords = 0;
    this.dataService.getInvoiceReport(this.fromDate, this.toDate, this.branchId).subscribe({
      next: (res: any) => {
        this.reportLoading = false;
        const rows = res?.data || [];
        if (res?.status === true && rows.length > 0) {
          this.data = rows.map((row: any) => this.normalizeRow(row));
          this.p = 1;
          this.isReport = true;
          this.alert = '';
        } else {
          this.data = [];
          this.isRecords = 1;
          this.alert = 'No Records Found';
        }
      },
      error: (error: any) => {
        this.reportLoading = false;
        this.error = error;
        this.isRecords = 1;
        this.alert = 'No Records Found';
      }
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Invoice_Report');
  }

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.branchId = '';
    this.data = [];
    this.isReport = false;
    this.isRecords = 0;
    this.alert = '';
  }

  private normalizeRow(row: any): any {
    return {
      ...row,
      gsx_invoice: this.normalizeArray(row?.gsx_invoice),
      payment: this.normalizeArray(row?.payment),
      more_info: this.normalizeArray(row?.more_info)
    };
  }

  private normalizeArray(value: any): any[] {
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }
}
