import { Component } from '@angular/core';
import { PaymentsreportService } from './paymentsreport.service';

import { ExcelService } from '../excel.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-paymentsreport',
    templateUrl: './paymentsreport.component.html',
    styleUrls: ['./paymentsreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class PaymentsreportComponent {
  reportLoading = false;
  public fromDate = '';
  toDate = '';
  data: any = [];
  paymentData: any = [];
  quotes: any = [];
  nonEbs: any = [];
  parts: any = [];
  statusList: any = [];
  QParts: any = [];
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
  branchCodes: any = [];
  userRole = localStorage.getItem('userRole');
  filters: any = [{ label: 'All Records', value: 'all' },
  { label: 'EBS Records', value: 'ebs' },
  { label: 'Non-EBS Records', value: 'nonebs' }];
  filter = 'all';
  constructor(
    public dataService: PaymentsreportService,
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
        }, // success path
        error: error => this.error = error // error path
      });
  }

  load() {
    this.branchCodes = [];
    for (let i = 0; i < this.branches.length; i++) {
      for (const branch of this.branchId) {
        if (this.branches[i].id === branch) {
          this.branchCodes.push(this.branches[i].branch_code);
        }
      }
    }

    this.ticketSearch = '';
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.data = [];
      this.nonEbs = [];
      this.getQuotepaymentReport();
    }
  }

  getQuotepaymentReport() {
  this.reportLoading = true;
  this.isReport = false;
  this.buttonSpin = true;
  let result;
  let tempParts: any = [];
  const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.reportLoading = false;
      this.buttonSpin = false;

      return;
    }

  this.dataService.getQuotepaymentReport(this.fromDate, this.toDate, this.branchId, this.branchCodes)
    .subscribe({
      next: (data: any) => {
        result = data;
        this.quotes = result.data.quotes;
        this.nonEbs = result.data.non_ebs;
        const worldlineList = result.data.worldline;
        this.statusList = Object.entries(result.data.status);

        if (result.status === true) {
          this.reportLoading = false;
        }

        if (result.status === true && this.quotes.length > 0) {
          this.buttonSpin = false;
          this.parts = result.data.parts;

          for (let i = 0; i < this.quotes.length; i++) {
            const qId = this.quotes[i].quotation_id;
            const exparts = this.parts[qId];
            if (this.parts[qId]) {
              if (exparts.length > 0) {
                for (let j = 0; j < exparts.length; j++) {
                  tempParts.push(exparts[j]);
                }
              }
              const len = 5 - this.parts[qId].length;
              for (let k = 0; k < len; k++) {
                tempParts.push({
                  description: '',
                  part_no: '',
                  quotation_id: qId
                });
              }
              this.data.push({
                quote: this.quotes[i],
                parts: tempParts
              });
              tempParts = [];
            }
          }

          for (let i = 0; i < this.data.length; i++) {
            let nonEbs = false;

            // Non-EBS match
            for (let j = 0; j < this.nonEbs.length; j++) {
              if (this.nonEbs[j].quotation_id === this.data[i].quote.quotation_id) {
                this.data[i].quote.amtPaid = this.nonEbs[j].amount;
                this.data[i].quote.PaymentDate = this.nonEbs[j].date;
                this.data[i].quote.pay_id = this.nonEbs[j].invoice_number;
                this.data[i].quote.payment_status = 'Success';
                this.data[i].nonEbs = true;
                nonEbs = true;
              }
            }

            // If not non-EBS, fall back to worldline and default date
            if (!nonEbs) {
              this.data[i].nonEbs = false;

              //  Set correct PaymentDate using merged backend logic
              this.data[i].quote.PaymentDate = this.data[i].quote.payment_date;

              for (let l = 0; l < worldlineList.length; l++) {
                if (
                  worldlineList[l].payment_status === 'Success' &&
                  worldlineList[l].quotation_id === this.data[i].quote.quotation_id
                ) {
                  this.data[i].quote.amtPaid = worldlineList[l].quote_amount;
                  break;
                }
              }
            }

            // Match and map status
            for (let k = 0; k < this.statusList.length; k++) {
              if (this.data[i].quote.quotation_id === this.statusList[k][0]) {
                this.data[i].quote.Status = this.statusList[k][1];
              }
            }
          }

          this.isReport = true;
          this.isRecords = 0;
          this.paymentData = this.data;
        } else {
          this.isRecords = 1;
          this.isReport = false;
          this.alert = 'No Records Found';
        }

        this.reportHeader = result.header;
      },
      error: error => {
        this.error = error;
        this.reportLoading = false;
        this.buttonSpin = false;
      }
    });
}


  exportAsXLSX(): void {
    const exportData: any = [];
    for (let i = 0; i < this.data.length; i++) {
      if(this.data[i].quote.Status === 'A'){
        this.data[i].quote.Status = 'Active';
      } else if(this.data[i].quote.Status === 'D'){
        this.data[i].quote.Status = 'Deleted';
      } else if(this.data[i].quote.Status === 'E'){
        this.data[i].quote.Status = 'Expired';
      }

      exportData.push({
        Quote_Id: this.data[i].quote.quotation_id,
        Branch_code: this.data[i].quote.branch_code,
        CustomerName: this.data[i].quote.customer_name,
        TicketId: this.data[i].quote.ticket_id,
        Family: this.data[i].quote.family,
        Product: this.data[i].quote.product_name,
        PartNo1: this.data[i].parts[0].part_no,
        Description1: this.data[i].parts[0].description,
        PartNo2: this.data[i].parts[1].part_no,
        Description2: this.data[i].parts[1].description,
        PartNo3: this.data[i].parts[2].part_no,
        Description3: this.data[i].parts[2].description,
        PartNo4: this.data[i].parts[3].part_no,
        Description4: this.data[i].parts[3].description,
        PartNo5: this.data[i].parts[4].part_no,
        Description5: this.data[i].parts[4].description,
        MailId: this.data[i].quote.email_id,
        CreateDate: this.data[i].quote.entrytime,
        QuoteAmount: this.data[i].quote.quote_amount,
        QuoteStatus: this.data[i].quote.Status,
        PaymentDate: this.data[i].quote.PaymentDate,
        PayId: this.data[i].quote.pay_id,
        TransctionId: this.data[i].quote.transaction_id,
        PaymentStatus: this.data[i].quote.payment_status,
        TicketStatus: this.data[i].quote.status_name,
        AmountPaid: this.data[i].quote.amtPaid,
        PaymentDeclinedReason: this.data[i].quote.payment_declined_reason,
      });
    }
    this.excelService.exportAsExcelFile(exportData, 'Payment_Report');
  }

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.branchId = '';
    this.ticketSearch = '';
  }

  filterSearch(filter: string) {
    const dataTemp: any = [];
    if (filter === 'ebs') {
      for (let i = 0; i < this.data.length; i++) {
        if ((this.data[i].nonEbs === false) && (this.data[i].quote.payment_status === 'Success')) {
          dataTemp.push(this.data[i]);
        }
      }
      this.paymentData = dataTemp;
    } else if (filter === 'nonebs') {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].nonEbs === true) {
          dataTemp.push(this.data[i]);
        }
      }
      this.paymentData = dataTemp;
    } else {
      this.paymentData = this.data;
    }
  }
}
