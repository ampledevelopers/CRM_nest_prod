import { Component } from '@angular/core';
import { AgeingticketsreportService } from './ageingticketsreport.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {ExcelService} from '../excel.service';

@Component({
    selector: 'app-ageingticketsreport',
    templateUrl: './ageingticketsreport.component.html',
    styleUrls: ['./ageingticketsreport.component.scss'],
    standalone: false
})
export class AgeingticketsreportComponent {
  loading = true;
  data: any = [];
  branches: any = [];
  ageingData: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  columns = ['ticket_id','branch_code','new_branch_code','status_name','family','RAF_created_date','ageing_since','ageing_days'];
  constructor(
    public dataService: AgeingticketsreportService,
    private excelService: ExcelService
  ) {
    this.getAgeingTicketsReport();
   }

  getAgeingTicketsReport() {
  let result;
  // let ageingData;
  this.dataService.getAgeingTicketsReport(this.branchId)
    .subscribe({
      next: (data: any) => {
          result = data;
          if (result.status === true && result.data.length > 0)  {
            this.data = result.data;
            for (let a = 0; a < this.data.length; a++) {
              if (this.data[a].length > 0) {
              for (let b = 0 ; b < this.data[a].length; b++) {
              this.ageingData.push({
                ticket_id : this.data[a][b].ticket_id,
                branch_code : this.data[a][b].branch_code,
                new_branch_code : this.data[a][b].new_branch_code,
                status_name : this.data[a][b].status_name,
                family : this.data[a][b].family,
                RAF_created_date : this.data[a][b].RAF_created_date,
                ageing_since : this.data[a][b].ageing_since,
                ageing_days : this.data[a][b].ageing_days,
              });
            }
          }
            }
              this.isReport = true;
              this.isRecords = 0;
              this.loading = false ;
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
  this.isReport = false;
  this.branchId = '';
  this.ticketSearch = '';
 }

 export() {
  this.exportAsXLSX();
}

exportAsXLSX(): void {
  // this.ticketSearch = '';
  this.excelService.exportAsExcelFile(this.ageingData, 'ageing_list_for_sms');
}

}
