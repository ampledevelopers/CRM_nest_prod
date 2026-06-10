import { Component } from '@angular/core';
import { AccessoryenquiryreportService } from './accessoryenquiryreport.service';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-accessoryenquiryreport',
    templateUrl: './accessoryenquiryreport.component.html',
    styleUrls: ['./accessoryenquiryreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class AccessoryenquiryreportComponent {
  loading = false;
  public fromDate = '';
  toDate = '';
  menuName = '';
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  reportHeader = '';
  alert = '';
  branchId = '';
  buttonSpin = false;
  userRole = localStorage.getItem('userRole');
  branchList: any = [];
  branchListTemp: any = [];
  columns = ['ticket_id', 'location', 'sales_executive','date_of_delivery', 'product_mapped_to_delivery', 'waaranty_status', 'customer_briefed_about_acc','list_acc_briefed_cus','remarks','call_back_details','contact_on'];
  constructor(
    public dataService: AccessoryenquiryreportService,
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
          // console.log(result);
          this.branches = result.branch;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: any) {
    this.branchList = event;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Accessory_Enquiry_Report');
  }

  load(type: any) {
    const btnType = type;
    this.buttonSpin = true;
    this.ticketSearch = '';
    // if ((this.userRole !== '3') && (this.userRole !== '10') && (this.userRole !== '11') && (this.userRole !== '15') && (this.branchId === '')) {
    // if (this.branchId === '') {
    //   alert('Please select Branch');
    //   return;
    // } else
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
    this.dataService.getAccessoryEnquiryReport(this.fromDate, this.toDate, this.branchId)
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
  }
}
