import { Component } from '@angular/core';
import { GsxReimbursementReportService } from './gsx-reimbursement-report.service';
import { ExcelService } from '../excel.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-gsx-reimbursement-report',
    templateUrl: './gsx-reimbursement-report.component.html',
    styleUrls: ['./gsx-reimbursement-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class GsxReimbursementReportComponent {
  periodDataTemp: any = [];
  dateDataTemp: any = [];
  labourDataTemp: any = [];
  loading = false;
  fromDate = '';
  toDate = '';
  year: any = '';
  labourYear: any = '';
  period: any = '';
  month: any = 'Select Month';
  labourMonth: any = 'Select Month';
  userRole = localStorage.getItem('userRole');
  branches: any = [];
  branch = 'Select Branch Name';
  branchId = '';
  months: any = [];
  labourMonths: any = [];
  error: any;
  periodType = null;
  reportType = null;
  showRepairReport = false;
  showLabourReport = false;
  showPeriodData = false;
  showDateData = false;
  showPartLabourcolumn = false;
  showPartLabourReport = false;
  datePipe = new DatePipe('en-US');
  reportTemp = [{ label: 'Labour Report', value: 'Labour Report' }, { label: 'Repair Report', value: 'Repair Report' } ,{ label: 'Part Wise Labour Report', value: 'Part Wise Labour Report' }];
  dataTemp = [{ label: 'Paid', value: 'paid' }, { label: 'Not-Paid', value: 'pending' }];
  periodColumns = [
    'id', 'SoldTo', 'ShipTo', 'repairCreated', 'repairNotification', 'orderType', 'productClass',
    'serialNumber', 'imeiNumber', 'MEID', 'Part', 'Description', 'warrantyCoverage', 'Amount',
    'Currency', 'dispatchID', 'serviceExcellence', 'BillAndBillPO', 'CustPO', 'repairType', 'invoiceNumber', 'invoiceDate', 'period', 'date','closed_and_complete_date'
  ]
  dateColumns = [
    'branch_code', 'ticket_id', 'customer_name', 'customer_phone_no', 'customer_email_id', 'product_description', 'warranty_status', 'purchased_in', 'coverage_status_description', 'gsx_status_description', 'device_id', 'reference_number', 'repair_type', 'g_number', 'repair_created_date',
    'mark_complete_date','closed_and_complete_date', 'family', 'part_number', 'description',
  ]
  labourColumns = [
    'branch_code','new_branch_code', 'ticket_id', 'customer_name', 'product_description', 'warranty_status', 'purchased_in', 'coverage_status_description','repair_type', 'g_number', 'labour_part_number','labour_tier' ,'labour_amount','repair_created_date',
    'mark_complete_date','closed_and_complete_date'
  ]
  constructor(
    public dataService: GsxReimbursementReportService, private excelService: ExcelService) {
    this.months = [
      { value: 'Select Month', name: 'Select Month' },
      { value: 'P01', name: 'P01' },
      { value: 'P02', name: 'P02' },
      { value: 'P03', name: 'P03' },
      { value: 'P04', name: 'P04' },
      { value: 'P05', name: 'P05' },
      { value: 'P06', name: 'P06' },
      { value: 'P07', name: 'P07' },
      { value: 'P08', name: 'P08' },
      { value: 'P09', name: 'P09' },
      { value: 'P10', name: 'P10' },
      { value: 'P11', name: 'P11' },
      { value: 'P12', name: 'P12' },
    ]
    this.labourMonths = [
      { value: 'Select Month', name: 'Select Month' },
      { value: 'P01', name: 'P01' },
      { value: 'P02', name: 'P02' },
      { value: 'P03', name: 'P03' },
      { value: 'P04', name: 'P04' },
      { value: 'P05', name: 'P05' },
      { value: 'P06', name: 'P06' },
      { value: 'P07', name: 'P07' },
      { value: 'P08', name: 'P08' },
      { value: 'P09', name: 'P09' },
      { value: 'P10', name: 'P10' },
      { value: 'P11', name: 'P11' },
      { value: 'P12', name: 'P12' },
    ]
     this.getBranches();
  }

  onChangeReport(reportType: any) {
    this.periodType = null;
    if (this.reportType === 'Repair Report') {
      this.showRepairReport = true;
      this.showPartLabourReport = false;
      this.showLabourReport = false;
      this.showPeriodData = false;
      this.showDateData = false;
    } else if (this.reportType === 'Labour Report') {
      this.showLabourReport = true;
      this.showRepairReport = false;
      this.showPartLabourReport = false;
      this.showPeriodData = false;
      this.showDateData = false;
      this.year = '';
      this.month = 'Select Month';
    } else if( this.reportType === 'Part Wise Labour Report'){
      this.showLabourReport = false;
      this.showRepairReport = false;
      this.showPartLabourReport = true;
      this.showPeriodData = false;
      this.showDateData = false;
    }

  }

  onChange(periodType: any) {
    this.showLabourReport = false;
    this.showPeriodData = false;
    this.showDateData = false;
    this.showPartLabourReport = false;
    this.fromDate = '';
    this.toDate = '';
    this.year = '';
    this.month = 'Select Month';
  }

  load() {
    if (this.periodType === 'paid' || this.reportType === 'Labour Report') {
      this.getGsxPaidReimburse();
    } else if (this.periodType === 'pending') {
      this.getGsxPendingReimburse();
    } else if(this.reportType === 'Part Wise Labour Report'){
      this.getLabourReport();
    }
  }

  getGsxPaidReimburse() {
    this.loading = true;
    let results: any = [];
    let userDataTemplate: any = [];
    let dispatchIdTemp: any = [];
    let usersDataList: any = [];
    this.period = this.year + this.month;
    if (this.year !== '' && this.month !== 'Select Month') {
      this.dataService.getGsxPaidReimburse(this.period)
        .subscribe({
          next: (data: any) => {
            results = data;
            if (results.status === true) {
              userDataTemplate = results.items;
              for (let i = 0; i < userDataTemplate.length; i++) {
                dispatchIdTemp.push(userDataTemplate[i].dispatchID);
              }
              dispatchIdTemp = dispatchIdTemp.filter(function (elem: any, index: any, self: any) {
                  return index === self.indexOf(elem);
                })
              for (let i = 0; i < dispatchIdTemp.length; i++) {
                  let userDataTemp = userDataTemplate.filter((dispatchId: any) => {
                  return dispatchId.dispatchID === dispatchIdTemp[i]
                });
              if(userDataTemp[0].invoiceDate !== '' && userDataTemp[0].Amount !== ''){
                usersDataList.push({
                  id: userDataTemp[0].id,
                  SoldTo: userDataTemp[0].SoldTo,
                  ShipTo: userDataTemp[0].ShipTo,
                  repairCreated: userDataTemp[0].repairCreated,
                  repairNotification: userDataTemp[0].repairNotification,
                  orderType: userDataTemp[0].orderType,
                  productClass: userDataTemp[0].productClass,
                  serialNumber: userDataTemp[0].serialNumber,
                  imeiNumber: userDataTemp[0].imeiNumber,
                  MEID: userDataTemp[0].MEID,
                  Part: userDataTemp[0].Part,
                  Description: userDataTemp[0].Description,
                  warrantyCoverage: userDataTemp[0].warrantyCoverage,
                  Amount: userDataTemp[0].Amount,
                  Currency: userDataTemp[0].Currency,
                  dispatchID: userDataTemp[0].dispatchID,
                  serviceExcellence: userDataTemp[0].serviceExcellence,
                  BillAndBillPO: userDataTemp[0].BillandBillPO,
                  CustPO: userDataTemp[0].CustPO,
                  repairType: userDataTemp[0].repairType,
                  invoiceNumber: userDataTemp[0].invoiceNumber,
                  invoiceDate: userDataTemp[0].invoiceDate,
                  period: userDataTemp[0].period,
                  date: userDataTemp[0].date,
                  closed_and_complete_date: this.datePipe.transform(userDataTemp[0].closed_and_complete_date, 'yyyy-MM-dd')
                })
              }
              }
              this.periodDataTemp = [...usersDataList];
              this.showPeriodData = true;
              this.showDateData = false;
              this.loading = false;
            } else {
              alert('Data not available.')
              this.showPeriodData = false;
              this.loading = false;
            }
          }
        })
    } else {
      alert('Please select the year and month');
      this.loading = false;
    }
  }

  getGsxPendingReimburse() {
    this.loading = true;
    let results: any = [];
    let userDataTemp: any = [];
    let usersDataList: any = [];
    if (this.fromDate === '' && this.toDate === '') {
      alert('Please select From Date and To Date');
      return;
    } else {
      this.dataService.getGsxPendingReimburse(this.fromDate, this.toDate)
        .subscribe({
          next: (data: any) => {
            results = data;
            if (results.status === true) {
              userDataTemp = results.items;
              for (let i = 0; i < userDataTemp.length; i++) {
                if(userDataTemp[i].l_invoice_date === '' && userDataTemp[i].l_amount === 0){
                usersDataList.push({
                  branch_code: userDataTemp[i].branch_code,
                  ticket_id: userDataTemp[i].ticket_id,
                  customer_name: userDataTemp[i].customer_name,
                  customer_phone_no: userDataTemp[i].customer_phone_no,
                  customer_email_id: userDataTemp[i].customer_email_id,
                  product_description: userDataTemp[i].product_description,
                  warranty_status: userDataTemp[i].warranty_status,
                  purchased_in: userDataTemp[i].purchased_in,
                  coverage_status_description: userDataTemp[i].coverage_status_description,
                  gsx_status_description: userDataTemp[i].gsx_status_description,
                  device_id: userDataTemp[i].device_id,
                  reference_number: userDataTemp[i].reference_number,
                  repair_type: userDataTemp[i].repair_type,
                  g_number: userDataTemp[i].g_number,
                  repair_created_date: userDataTemp[i].repair_created_date.slice(0, 10),
                  mark_complete_date: this.datePipe.transform(userDataTemp[i].mark_complete_date, 'yyyy-MM-dd'),
                  closed_and_complete_date: this.datePipe.transform(userDataTemp[i].closed_and_complete_date, 'yyyy-MM-dd'),
                  family: userDataTemp[i].family,
                  part_number: userDataTemp[i].part_number,
                  description: userDataTemp[i].description,
                })
              }
              }
              this.dateDataTemp = [...usersDataList];
              this.showDateData = true;
              this.showPeriodData = false;
              this.loading = false;
            } else {
              alert('Data not available.')
              this.showDateData = false;
              this.loading = false;
            }
          }
        })
    }
  }
getLabourReport() {
  this.loading = true;
  let usersDataList: any[] = [];

  if (this.fromDate === '' || this.toDate === '') {
    alert('Please select From Date and To Date');
    this.loading = false;
    return;
  }
 const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
          this.clear();
          this.loading = false;
          return;
    }
  this.dataService.getLabourReport(this.fromDate, this.toDate, this.branchId)
    .subscribe({
      next: (results: any) => {
        if (results.status === true) {
          this.showPartLabourcolumn = true;
          for (const row of results.data) {
            usersDataList.push({
              branch_code: row.branch_code,
              new_branch_code: row.new_branch_code,
              ticket_id: row.ticket_id,
              customer_name: row.customer_name,
              product_description: row.product_description,
              warranty_status: row.warranty_status,
              purchased_in: row.purchased_in,
              coverage_status_description: row.coverage_status_description,
              repair_type: row.repair_type,
              g_number: row.g_number,
              repair_created_date: row.repair_created_date?.slice(0, 10),
              mark_complete_date: this.formatDate(row.mark_complete_date),
              closed_and_complete_date: this.formatDate(row.closed_at),
              labour_part_number: row.labour_part_number,
              labour_tier: row.labour_tier,
              labour_amount: Number(row.l_amount) || 0
            });
          }
          this.labourDataTemp = [...usersDataList];
          this.showPartLabourReport = true;
          this.showPeriodData = false;
          this.showDateData = false;
        } else {
          alert('Data not available');
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('API error');
      }
    });
}
formatDate(date: any): string {
  if (!date || date === '0000-00-00 00:00:00') {
    return '';
  }
  return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
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
  clear() {
    this.periodType = null;
    this.fromDate = '';
    this.year = '';
    this.month = '';
    this.showPeriodData = false;
    this.showDateData = false;
  }

  exportAsXLSX(): void {
    if (this.periodType === 'paid' || this.reportType === 'Labour Report') {
      this.excelService.exportAsExcelFile(this.periodDataTemp, 'GSX-Reimbursement_Report');
    } else if (this.periodType === 'pending') {
      this.excelService.exportAsExcelFile(this.dateDataTemp, 'GSX-Reimbursement_Report');
    }
     else if (this.reportType === 'Part Wise Labour Report') {
      this.excelService.exportAsExcelFile(this.labourDataTemp, 'GSX-Reimbursement_Report');
    }
  }

}
