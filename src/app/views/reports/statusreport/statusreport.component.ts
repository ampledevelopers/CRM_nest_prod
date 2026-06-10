import { Component } from '@angular/core';
import { StatusreportService } from './statusreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-statusreport',
    templateUrl: './statusreport.component.html',
    styleUrls: ['./statusreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class StatusreportComponent {
  date = new Date();
  public fromDate = '';
  toDate = '';
  reportType = '';
  data: any = [];
  branches: any = [];
  statuses: any = [];
  site_types: any = [];
  siteType = 'Select Site Type';
  branch = 'Select Branch Name';
  error: any;
  isReport = false;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isRecords = 0;
  reportName = '';
  reportHeader = '';
  alert = '';
  branchId: any = [];
  statusId = '';
  statusList: any = [];
  statusListTemp: any = [];
  sitetypeId = '';
  buttonSpin = false;
  branchList: any = [];
  branchListTemp: any = [];
  userRole = localStorage.getItem('userRole');
  loading = false;
  columns = ['id', 'branch_code', 'new_branch_code','repair_category', 'customer_name', 'customer_phone_no', 'serial_no', 'product_description', 'Ticket_repairType', 'status_name', 'warranty_status', 'type', 'family', 'closed_at', 'created_date', 'user_name', 'assigned_time', 'service_type', 'consignment_stock_flag', 'entrytime', 'enquiry_flag', 'device_physical_location'];
  constructor(
    public dataService: StatusreportService,
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
          this.branches = result.branch;
        }, // success path≥
        error: error => this.error = error // error path
      });
  }

  getStatuses(id: string) {
    let result;
    this.dataService.getStatuses(id)
      .subscribe({
        next: (data: any) => {
          result = data;
          this.statuses = result.status;
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
    if (this.sitetypeId !== 'Select Site Type') {
      this.getStatuses(this.sitetypeId);
    } else {
      this.statuses = [];
    }
  }


  statusSelect(status: any) {
    this.statusList = status;
  }

  exportAsXLSX(): void {
    this.ticketSearch = '';
    this.excelService.exportAsExcelFile(this.data, this.reportType);
  }

  load(type: any) {
    this.ticketSearch = '';
    if ((this.userRole !== '3') && (this.userRole !== '10') && (this.userRole !== '11') && (this.userRole !== '15') && (this.branchId === '')) {
      alert('Please select Branch');
      return;
    } else if (this.siteType === 'Select Site Type') {
      alert('Please select Site Type');
      return;
    } else if (this.reportType === '') {
      alert('Please select Report Type');
      return;
    } else if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      for (let i = 0; i < this.branchId.length; i++) {
        let dlBranch = this.branches.filter((data: any) => {
          return (data.id === this.branchId[i])
        });
        if (dlBranch[0] !== undefined && dlBranch[0].parent_location_id !== '0') {
          this.branchList.push(dlBranch[0].parent_location_id);
        }
      }
      this.branchListTemp = this.branchId.concat(this.branchList);
      this.branchListTemp = this.branchListTemp.filter(function (elem: any, index: any, self: any) {
        return index === self.indexOf(elem);
      })
      this.goToLoad(type);
    }
  }

  goToLoad(type: any) {
    this.loading = true;
    const btnType = type;
    this.buttonSpin = true;
    let result;
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

    if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.loading = false;
      this.buttonSpin = false;
      return;
    }
    this.dataService.getStatusReport(this.fromDate, this.toDate, this.branchListTemp, this.statusId, this.reportType, this.siteType)
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
            this.reportName = result.name;
            if (this.reportName === 'Force Closed') {
              this.columns = ['id', 'branch_code', 'repair_category', 'customer_name', 'customer_phone_no', 'serial_no', 'product_description', 'Ticket_repairType', 'status_name', 'warranty_status', 'type', 'family', 'closed_at', 'created_date', 'user_name', 'assigned_time', 'service_type', 'consignment_stock_flag', 'entrytime', 'enquiry_flag', 'force_closed_by', 'device_physical_location'];
            }
            if (btnType === 'export') {
              this.exportAsXLSX();
            }
            this.branchList = [];
            this.branchListTemp = [];
          } else {
            this.isRecords = 1;
            this.isReport = false;
            alert('Data not Aavailable');
          }
          this.reportHeader = result.header;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  clear() {
    this.fromDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toLocaleDateString();
    this.toDate = new Date().toLocaleDateString();
    this.isReport = false;
    this.branchId = '';
    this.statusId = '';
    this.branchId = [];
    this.branchList = [];
    this.branchListTemp = [];
    this.ticketSearch = '';
    this.siteType = 'Select Site Type';
  }

}


