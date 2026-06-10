import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';
import { QuoteConversionReportService } from './quote-conversion-report.service';

@Component({
    selector: 'app-quote-conversion-report',
    templateUrl: './quote-conversion-report.component.html',
    styleUrls: ['./quote-conversion-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})

export class QuoteConversionReportComponent {
  periodDataTemp: any = [];
  dateDataTemp: any = [];
  loading = false;
  branchBasis = false;
  productBasis = false;
  reportSelected = false;
  lostQoute = false;
  paidCount: any = [];
  totalCount: any = [];
  branchPaidCount: any = '';
  branchTotalCount: any = [];
  productPaidCount: any = [];
  productTotalCount: any = [];
  branchDataTemp: any = [];
  productDataTemp: any = [];
  lostQoutes: any = [];
  totalQoutes: any = [];
  conversionLostTemp: any = [];
  lostCountDetail: any = [];
  fromDate: any = '';
  toDate: any = '';
  branches: any = [];
  quoteBranches: any = [];
  lostCountBranch: any = [];
  lostCountTemp: any = [];
  ticketID: any;
  ticketIDTemp: any = [];
  productTemp: any = [];
  reportType = null;
  userRole = localStorage.getItem('userRole');
  reportTemp = [{ label: 'Branch', value: 'Branch' }, { label: 'Product', value: 'Product' }, { label: 'Lost Quotes', value: 'Lost Quotes' }]

  constructor(private dataService: QuoteConversionReportService, private excelService: ExcelService) {
  }
  onChangeReport(reportType: any) {
    this.reportSelected = true;
    this.productBasis = false;
    this.branchBasis = false;
    this.lostQoute = false;
    this.fromDate = '';
    this.toDate = '';
    this.loading = false;
  }

  load() {
    this.branchDataTemp = [];
    this.productDataTemp = [];
    this.conversionLostTemp = [];
    this.lostCountTemp = [];
    this.branches = [];
    if (this.fromDate !== '' && this.toDate !== '' && this.reportType !== 'Lost Quotes') {
      this.getPaymentData();
    } else if (this.fromDate !== '' && this.toDate !== '' && this.reportType === 'Lost Quotes') {
      this.getPaymentData();
      this.lostCountDetails();
    }
    else {
      alert('Please select From Date and To Date');
    }
  }

  getPaymentData() {
    this.loading = true;
    let result: any = [];
    this.branches = [];
    this.quoteBranches = [];
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.loading = false;
      return;
  }
    this.dataService.getPaymentData(this.fromDate, this.toDate)
      .subscribe({
        next: (datas: any) => {
          if (datas.status === true) {
            result = datas.data;
            this.branchPaidCount = result.paid_count;
            this.branchTotalCount = result.total_count;
            this.productPaidCount = result.product_wise_paid_count;
            this.productTotalCount = result.product_wise_total_count;
            this.lostQoutes = result.lost_qoute;
            if (this.branchPaidCount.length !== 0 && this.branchTotalCount.length !== 0 && this.productPaidCount.length !== 0 && this.productTotalCount.length !== 0) {
              for (let i = 0; i < this.branchTotalCount.length; i++) {
                this.branches.push(this.branchTotalCount[i].branch_code);
              }
              this.branches = this.branches.filter(function (elem: any, index: any, self: any) {
                return index === self.indexOf(elem);
              })
              for (let i = 0; i < this.branches.length; i++) {
                let branch = this.branches[i];
                let branchPaidCount = this.branchPaidCount.filter((data: any) => {
                  return data.branch_code === this.branches[i]
                });
                branchPaidCount = branchPaidCount[0] === undefined ? 0 : branchPaidCount[0].count;
                let branchTotalCount = this.branchTotalCount.filter((data: any) => {
                  return data.branch_code === this.branches[i];
                });
                branchTotalCount = branchTotalCount[0] === undefined ? 0 : branchTotalCount[0].count;
                let conversionData: any = Math.round((branchPaidCount) / (branchTotalCount) * 100);
                isNaN(conversionData) ? conversionData = '' : conversionData = conversionData + '%';
                this.branchDataTemp.push({
                  branch: branch,
                  branchPaidCount: branchPaidCount,
                  branchTotalCount: branchTotalCount,
                  conversionData: conversionData
                }
                )
              }
              for (let i = 0; i < this.productTotalCount.length; i++) {
                this.productTemp.push(this.productTotalCount[i].product_name)
              }
              this.productTemp = this.productTemp.filter(function (elem: any, index: any, self: any) {
                return index === self.indexOf(elem);
              })
              for (let i = 0; i < this.productTemp.length; i++) {
                let productTemp = this.productTemp[i];
                let productPaidCount = this.productPaidCount.filter((data: any) => {
                  return data.product_name === this.productTemp[i]
                });
                productPaidCount = productPaidCount[0] === undefined ? 0 : productPaidCount[0].count;
                let productTotalCount = this.productTotalCount.filter((data: any) => {
                  return data.product_name === this.productTemp[i]
                });
                productTotalCount = productTotalCount[0] === undefined ? 0 : productTotalCount[0].count;
                let conversionData: any = Math.round((productPaidCount) / (productTotalCount) * 100);
                isNaN(conversionData) ? conversionData = '' : conversionData = conversionData + '%';
                this.productDataTemp.push({
                  productTemp: productTemp,
                  productPaidCount: productPaidCount,
                  productTotalCount: productTotalCount,
                  conversionData: conversionData
                }
                )
              }

            } if (this.lostQoutes.length !== 0 && this.branchTotalCount.length !== 0) {
              for (let i = 0; i < this.branchTotalCount.length; i++) {
                this.quoteBranches.push(this.branchTotalCount[i].branch_code);
              }
              this.quoteBranches = this.quoteBranches.filter(function (elem: any, index: any, self: any) {
                return index === self.indexOf(elem);
              })
              for (let i = 0; i < this.quoteBranches.length; i++) {
                let branch = this.quoteBranches[i];
                let lostQoute = this.lostQoutes.filter((data: any) => {
                  return data.branch_code === this.quoteBranches[i]
                });
                lostQoute = lostQoute[0] === undefined ? 0 : lostQoute[0].count;

                let lostValue = this.lostQoutes.filter((data: any) => {
                  return data.branch_code === this.quoteBranches[i]
                });
                lostValue = lostValue[0] === undefined ? 0 : lostValue[0].lost_value;
                let totalQoute = this.branchTotalCount.filter((data: any) => {
                  return data.branch_code === this.quoteBranches[i];
                });
                totalQoute = totalQoute[0] === undefined ? 0 : totalQoute[0].count;
                let conversionData: any = Math.round((lostQoute) / (totalQoute) * 100);
                isNaN(conversionData) ? conversionData = '' : conversionData = conversionData + '%';
                this.conversionLostTemp.push({
                  branch: branch,
                  lostQoute: lostQoute,
                  totalQoute: totalQoute,
                  lostValue: lostValue,
                  conversionData: conversionData
                }
                )
              }

              if (this.reportType === 'Branch') {
                this.branchBasis = true;
                this.productBasis = false;
              } else if (this.reportType === 'Product') {
                this.productBasis = true;
                this.branchBasis = false;
              } else if (this.reportType === 'Lost Quotes') {
                this.lostQoute = true;
              }
              this.loading = false;
            } else {
              this.loading = false;
              this.branchBasis = false;
              this.productBasis = false;
              alert('Data not available');
            }
          } else {
            this.loading = false;
            this.branchBasis = false;
            this.productBasis = false;
            alert('Data not available');
          }
        }, // success path
      });
  }

  lostCountDetails() {
    this.loading = true;
    this.lostCountBranch = [];
    this.dataService.lostCountDetails(this.fromDate, this.toDate)
      .subscribe({
        next: (datas: any) => {
          if (datas.status === true) {
            this.lostCountDetail = datas.data.lost_qoute;
            if (this.lostCountDetail.length !== 0) {
              for (let i = 0; i < this.lostCountDetail.length; i++) {
                this.lostCountBranch.push(this.lostCountDetail[i].branch_code);
              }
              this.lostCountBranch = this.lostCountBranch.filter(function (elem: any, index: any, self: any) {
                return index === self.indexOf(elem);
              })
              for (let i = 0; i < this.lostCountBranch.length; i++) {
                let branch = this.lostCountBranch[i];
                let ticketId = this.lostCountDetail.filter((data: any) => {
                  return data.branch_code === this.lostCountBranch[i]
                });
                this.ticketIDTemp = [];
                for (let j = 0; j < ticketId.length; j++) {
                  this.ticketIDTemp.push(ticketId[j] === undefined ? 0 : ticketId[j].ticket_id);
                }
                this.ticketIDTemp = this.ticketIDTemp.toString();
                this.lostCountTemp.push({
                  branch: branch,
                  ticketId: this.ticketIDTemp,
                })
              }
              this.loading = false;
              this.lostQoute = true;
            } else {
              this.loading = false;
              this.branchBasis = false;
              this.productBasis = false;
              this.lostQoute = false;
              alert('Data not available');
            }
          } else {
            this.loading = false;
            this.branchBasis = false;
            this.productBasis = false;
            this.lostQoute = false;
            alert('Data not available');
          }
        }
      })
  }

  exportAsXLSX(): void {
    if (this.reportType === 'Branch') {
      this.excelService.exportAsExcelFile(this.branchDataTemp, 'Branch_Based_Conversion_Report');
    } else if (this.reportType === 'Product') {
      this.excelService.exportAsExcelFile(this.productDataTemp, 'Product_Based_Conversion_Report');
    } else if (this.reportType === 'Lost Quotes') {
      this.excelService.exportAsExcelFile(this.lostCountTemp, 'Lost_Quote_Report');
    }
  }

  clear() {
    this.reportType = null;
    this.fromDate = '';
    this.toDate = '';
    this.branchDataTemp = [];
    this.productDataTemp = [];
    this.conversionLostTemp = [];
    this.lostCountTemp = [];
    this.branchBasis = false;
    this.productBasis = false;
    this.reportSelected = false;
    this.lostQoute = false;
  }
}
