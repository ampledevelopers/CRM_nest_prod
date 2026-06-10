import { ExcelService } from '../excel.service';
import { EnquiryReportTekneService } from './enquiry-report-tekne.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-enquiry-report-tekne',
    templateUrl: './enquiry-report-tekne.component.html',
    styleUrls: ['./enquiry-report-tekne.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class EnquiryReportTekneComponent {
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
  t1Type: any;
  branchList: any = [];
  branchListTemp: any = [];
  dlBranchList: any = [];
  columns = [
    'id', 'branch_code', 'new_branch_code', 'serial_no', 'entrytime', 'product_description',
    'invoice_id', 'invoice_date', 'new_branch_code', 'customer_name', 'customer_phone_no',
    'customer_email_id', 'customer_query', 'enquiry_flag', 'technician_comment',
    'warranty_status', 'token_accepted_date', 'ledge_no'
  ];

  constructor(
    public dataService: EnquiryReportTekneService,
    private excelService: ExcelService
  ) {
    this.getBranches();
  }

  getBranches() {
    this.dataService.getBranches().subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.loading = false;
          this.branches = data.branch;
        }
      },
      error: (error: any) => this.error = error
    });
  }

  getTableDataCellProps(item: any, columnName: string): { active?: boolean; color?: string; align?: string } {
    // Example: customize color or alignment by column or value
    if (columnName === 'warranty_status') {
      return {
        active: true,
        color: item[columnName] === 'Expired' ? 'danger' : 'success',
        align: 'center'
      };
    }
    return {
      active: true,
      color: 'lightblue',
      align: 'left'
    };
  }

  getTableDataCellClasses(item: any, columnName: string): string {
    // Example: return classes based on data
    if (columnName === 'enquiry_flag') {
      return item[columnName] === 'N' ? 'text-danger font-weight-bold' : 'text-success';
    }
    return '';
  }

  branchSelect(event: any) {
    this.branchList = event;
    this.dlBranchList = [];

    for (let i = 0; i < this.branchList.length; i++) {
      this.branchListTemp = this.branches.filter((item: any) => item.id === this.branchList[i]);
      if (this.branchListTemp[0].parent_location_id !== '0') {
        this.branchList.push(this.branchListTemp[0].parent_location_id);
        this.dlBranchList.push({
          id: this.branchListTemp[0].id,
          branch_code: this.branchListTemp[0].branch_code,
          parent_location_code: this.branchListTemp[0].parent_location_code,
        });
      }
    }

    this.branchList = [...new Set(this.branchList)];
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Enquiry_Report_Tekne');
  }

  load() {
    this.ticketSearch = '';
    if (!this.fromDate) {
      alert('Please select the From Date');
      return;
    }
    if (!this.toDate) {
      alert('Please select the To Date');
      return;
    }
    this.getEnquiryReport();
  }

  getEnquiryReport() {
    this.reportLoading = true;
    this.isReport = false;

    this.dataService.getEnquiryReport(this.fromDate, this.toDate, this.branchId)
      .subscribe({
        next: (data: any) => {
          if (data.status === true) {
            let dataTemp = data.data;
            let finalData: any = [];

            if (this.dlBranchList.length !== 0) {
              for (let i = 0; i < this.dlBranchList.length; i++) {
                let dlRafs = dataTemp.filter((item: any) =>
                  item.branch_code === this.dlBranchList[i].parent_location_code &&
                  item.dl_branch_code === this.dlBranchList[i].branch_code &&
                  item.enquiry_flag === 'N'
                );

                dataTemp = dataTemp.filter((item: any) =>
                  item.branch_code !== this.dlBranchList[i].parent_location_code
                );

                finalData = dataTemp.concat(dlRafs);
              }
            } else {
              finalData = dataTemp;
            }

            finalData = finalData.filter((elem: any, index: number, self: any) =>
              index === self.findIndex((t: { id: any }) => t.id === elem.id)
            );

            this.data = finalData;
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.alert = 'No Records Found';
          }

          this.reportLoading = false;
        },
        error: (error: any) => this.error = error
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

