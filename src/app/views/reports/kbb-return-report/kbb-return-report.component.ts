import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';
import { KbbReturnReportService } from './kbb-return-report.service';

@Component({
    selector: 'app-kbb-return-report',
    templateUrl: './kbb-return-report.component.html',
    styleUrls: ['./kbb-return-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})

export class KbbReturnReportComponent {
  loading = false;
  selectedBranch: any = 'Select Branch';
  selectedStatus: any = '';
  branchList: any = [];
  data: any;
  columns: any;
  kbbData: any = [];
  showTable = false;
  userRole = localStorage.getItem('userRole');

  constructor(private dataService: KbbReturnReportService, private excelService: ExcelService) {
    this.getOptions();
    this.columns = []
  }

  getOptions() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
            result = data;
            this.branchList = result.branch;
        }, // success path
        error: (error: any) => error = error // error path
  });
  }
  load() {
    if(this.selectedBranch === 'Select Branch') {
      alert('Please Select the Branch');
      return;
    } else {
      this.kbbData = [];
      this.getKBBreport();
    }
  }

    exportAsXLSX(): void {
      this.excelService.exportAsExcelFile(this.kbbData, 'KBB_Return_Report');
   }

   clear() {
    this.selectedBranch = 'Select Branch';
    this.selectedStatus = '';
    }

    getKBBreport() {
      this.loading = true;
      let result: any;
      if(this.selectedStatus === 'PENDING') {
        this.columns = ['purchase_order_no','repair_type','part_no','part_description', 'kgb_date', 'kgb_serial_no', 'kgb_airway_bill_no', 'kgb_tote_id', 'g_number', 'rfpu_date', 'mark_complete_date', 'return_order_no', 'return_created_date', 'kbb_serial_no', 'awb_no', 'tote_box_details', 'branch_code', 'repair_statuscode', 'repair_status_description', 'return_device_sr_no', 'return_statuscode', 'return_statuscode_description', 'return_type', 'shipto', 'product_description', 'repair_device_sr_no'];
      } else {
        this.columns = ['purchase_order_no','repair_type','part_no','part_description', 'kgb_date', 'kgb_serial_no', 'kgb_airway_bill_no', 'kgb_tote_id', 'g_number', 'rfpu_date', 'mark_complete_date', 'return_order_no', 'return_created_date', 'kbb_serial_no', 'awb_no', 'tote_box_details', 'branch_code', 'repair_statuscode', 'repair_status_description', 'return_device_sr_no', 'return_statuscode', 'return_statuscode_description', 'return_type', 'shipto', 'product_description', 'repair_device_sr_no', 'bulk_return_id', 'nrdc_id'];
      }
      this.dataService.getKBBreport(this.selectedBranch, this.selectedStatus)
      .subscribe({
        next: (data: any) => {
            result = data;
            this.kbbData = result;
            this.loading = false;
            this.showTable = true;
        }, // success path
        error: (error: any) => error = error // error path
      });
    }
}
