import { Component } from '@angular/core';
import { InventoryreportService } from './inventoryreport.service';

import { ExcelService } from '../excel.service';

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'week',
    standalone: false
})
export class WeekPipe implements PipeTransform {
  transform(value: Date): number {
    return moment(value).week();
  }
}

@Component({
    selector: 'app-inventoryreport',
    templateUrl: './inventoryreport.component.html',
    styleUrls: ['./inventoryreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class InventoryreportComponent {
  reportLoading = false;
  loading = true;
  public fromDate = '';
  toDate = '';
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
  branchList: any = [];
  branchListTemp: any = [];
  ticketIdTemp:any = [];
  dataTemp:any= [];
  userRole = localStorage.getItem('userRole');
  columns = ['ticket_id','branch_code','new_branch_code','warranty_status','part_number','description','qty','consignment_type','consignment_asn_no','repair_type','g_number','week_no','repair_created_date','user_name'];
  constructor(
    public dataService: InventoryreportService,
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

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.dataTemp, 'Inventory_Report');
  }

  load() {
    this.ticketSearch = '';
    this.dataTemp = [];
    this.ticketIdTemp = [];
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.getInventoryReport();
    }
  }

  getInventoryReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
          this.clear();
          this.reportLoading = false;
          return;
    }
    this.dataService.getInventoryReport(this.fromDate, this.toDate, this.branchId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          if (result.status === true && result.data.length > 0) {
            this.data = result.data;
            for (let i = 0; i < this.data.length; i++) {
              this.ticketIdTemp.push(this.data[i].ticket_id);
            }
            this.ticketIdTemp = this.ticketIdTemp.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            });
            let inventoryData = '';
            for (let i = 0; i < this.ticketIdTemp.length; i++) {
              inventoryData = this.data.filter((data: any) => {
                return data.ticket_id === this.ticketIdTemp[i];
              });
              this.dataTemp.push(inventoryData[0])
            }
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.dataTemp = [];
            this.ticketIdTemp = [];
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
    this.branchId = '';
    this.ticketSearch = '';
    this.dataTemp= [];
    this.ticketIdTemp = [];
  }

}

