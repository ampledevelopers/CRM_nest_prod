import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';
import { AdhesiveConsumptionReportService } from './adhesive-consumption-report.service';

@Component({
    selector: 'app-adhesive-consumption-report',
    templateUrl: './adhesive-consumption-report.component.html',
    styleUrls: ['./adhesive-consumption-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class AdhesiveConsumptionReportComponent {

  loading = false;
  branches: any = [];
  error: any = '';
  fromDate: any = '';
  toDate: any = '';
  reportLoading = false;
  isReport = false;
  branchId: any = 'Select Branch';
  data: any = [];
  isRecords: any = 0;
  stockType: any = '';
  alert: any = '';
  status: any = '';
  userRole = localStorage.getItem('userRole');
  columns: any = ['asn_no', 'erp_asn', 'stock_type', 'part_no', 'description', 'product_model', 'blocked_ticket_id', 'issued_ticket_id', 'g_number', 'blocked_time', 'issued_date', 'status', 'warranty_status'];

  constructor(public dataService: AdhesiveConsumptionReportService, private excelService: ExcelService) {
    this.getBranches();
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

  load() {
    if (this.fromDate === '' && this.status !== 'A') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '' && this.status !== 'A') {
      alert('Please select the To Date');
      return;
    } else if (this.stockType === '') {
      alert('Please select Stock Type');
      return;
    } else if (this.branchId === 'Select Branch') {
      alert('Please select the Branch');
      return;
    } else if (this.status === '') {
      alert('Please select the Status');
      return;
    } else {
      // alert(this.toDate);
      this.getAdhesiveConsumption();
    }
  }

  getAdhesiveConsumption() {
    this.alert = '';
    this.reportLoading = true;
    this.isReport = false;
    let result;
    // let calltype;
    if(this.status === 'A') {
      this.fromDate = '';
      this.toDate = '';
      this.columns = ['asn_no', 'erp_asn', 'stock_type','branch_code','new_branch_code' ,'part_no', 'description', 'product_model', 'blocked_ticket_id', 'issued_ticket_id', 'blocked_time', 'issued_date', 'status'];
    }
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);
  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.reportLoading = false;
      return;
  }
    this.dataService.getAdhesiveConsumptionReport(this.fromDate, this.toDate, this.branchId, this.stockType, this.status)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          if (result.status === true && result.data.length > 0) {
            this.data = result.data;
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].status === 'I') {
                this.data[i].status = 'Issued';
              } else if (this.data[i].status === 'B') {
                this.data[i].status = 'Blocked';
              } else if (this.data[i].status === 'A') {
                this.data[i].status = 'Active';
              }
            }
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Data Available';
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.branchId = '';
    this.stockType = '';
  }

  exportAsXLSX(): void {
    let adhesivesList: any = [];
    if(this.status !== 'A') {
      for (let i = 0; i < this.data.length; i++) {
        adhesivesList.push({
          asn_no: this.data[i].asn_no,
          erp_asn: this.data[i].erp_asn,
          stock_type: this.data[i].stock_type,
          branch_code: this.data[i].branch_code,
          part_no: this.data[i].part_no,
          description: this.data[i].description,
          product_model: this.data[i].product_model,
          blocked_ticket_id: this.data[i].blocked_ticket_id,
          issued_ticket_id: this.data[i].issued_ticket_id,
          g_number: this.data[i].g_number,
          blocked_date: this.data[i].blocked_time,
          issued_date: this.data[i].issued_date,
          status: this.data[i].status,
          warranty_status: this.data[i].warranty_status
        })
      }
    }

    if(this.status === 'A') {
      for (let i = 0; i < this.data.length; i++) {
        adhesivesList.push({
          asn_no: this.data[i].asn_no,
          erp_asn: this.data[i].erp_asn,
          stock_type: this.data[i].stock_type,
          branch_code: this.data[i].branch_code,
          part_no: this.data[i].part_no,
          description: this.data[i].description,
          product_model: this.data[i].product_model,
          blocked_ticket_id: this.data[i].blocked_ticket_id,
          issued_ticket_id: this.data[i].issued_ticket_id,
          // g_number: this.data[i].g_number,q1
          blocked_date: this.data[i].blocked_time,
          issued_date: this.data[i].issued_date,
          status: this.data[i].status,
          // warranty_status: this.data[i].warranty_status
        })
      }
    }

    this.excelService.exportAsExcelFile(adhesivesList, 'Adhesive_Consumption_Report');
  }

}
