import { Component } from '@angular/core';
import { DayReportService } from './day-report.service';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-day-report',
    templateUrl: './day-report.component.html',
    styleUrls: ['./day-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class DayReportComponent {
  productFamily: any = 'Select Product Family';
  fromDate: any;
  toDate: any;
  errorMessage: any = '';
  showNoData = true;
  showTable = false;
  loading = false;
  productFamilies: any = [];
  branchList: any = [];
  dlBranchList: any = [];
  dlDataTemp: any = [];
  branchAll: any = [];
  nonDlDataTemp: any = [];
  nonDlData: any = [];
  DlData: any = [];
  exportDataTemp: any = [];
  totalToken: any = 0;
  serviceToken: any = 0
  enquiryTokenIw: any = 0;
  enquiryTokenOow: any = 0;
  deliveryToken: any = 0;
  unattendedToken: any = 0;
  t1Collected: any = 0;
  inWarrantyRaf: any = 0;
  outOfWarrRAF: any = 0;
  totalRAF: any = 0;
  inWarrantyPer: any = '';
  outofWarrantyPer: any = '';
  totalRafPer: any = '';
  avgWaitingService: any = 0;
  avgHandlingServiceData: any = 0;
  avgWaitingDeliveryData: any = 0;
  avgHandlingDeliveryData: any = 0;

  extotalToken: any = 0;
  exserviceToken: any = 0
  exenquiryTokenIw: any = 0;
  exenquiryTokenOow: any = 0;
  exdeliveryToken: any = 0;
  exunattendedToken: any = 0;
  exT1Collected: any = 0;
  exinWarrantyRaf: any = 0;
  exoutOfWarrRAF: any = 0;
  extotalRAF: any = 0;
  exinWarrantyPer: any = '';
  exoutofWarrantyPer: any = '';
  extotalRafPer: any = '';
  exavgWaitingService: any = 0;
  exavgHandlingServiceData: any = 0;
  exavgWaitingDeliveryData: any = 0;
  exavgHandlingDeliveryData: any = 0;
  totalFootfall: any = [];

  constructor(
    public dataService: DayReportService, private excelService: ExcelService
  ) {
    this.getBranches();
    this.getOptions();
  }

  getBranches() {
    let result;
    this.dataService.getOptions()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.productFamilies = result.family;
        }, // success path
        error: error => error = error // error path
      });
  }

  getOptions() {
    let result;
    this.loading = true;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          let branchAll = result.branch;
          let branches = [];
          for (let i = 0; i < branchAll.length; i++) {
            let list = branchAll.filter((data: any) => {
              return (data.branch_code !== 'FIC' && data.branch_code !== 'SAM' && data.branch_code !== 'SMT' && data.branch_code !== 'IUB' && data.branch_code !== 'DNB' && data.branch_code !== 'SCS')
            });
            branches = list;
          }
          for (let i = 0; i < branches.length; i++) {
            let branch = branches.filter((data: any) => {
              return (data.dl_type === 'I' || data.dl_type === 'A' || data.dl_type === 'D' || data.dl_type === 'Imagine')
            });
            this.branchAll = branch;
          }
          for (let i = 0; i < this.branchAll.length; i++) {
            let branch = this.branchAll.filter((data: any) => {
              return (data.dl_type === 'I' || data.dl_type === 'A')
            });
            this.branchList = branch;
            let dlBranch = this.branchAll.filter((data: any) => {
              return (data.dl_type === 'D' || data.dl_type === 'Imagine')
            });
            this.dlBranchList = dlBranch;
          }
          this.dayReport();
        }, // success path
        error: error => error = error // error path
      });
  }

  dayReport() {
    let result;
    this.dataService.dayReport()
      .subscribe({
        next: (datas: any) => {
          result = datas.data;
          this.calculateData(result);

          this.nonDlDataTemp = this.nonDlData;
          this.dlDataTemp = this.DlData;
          this.totalToken = this.extotalToken;
          this.serviceToken = this.exserviceToken;
          this.enquiryTokenIw = this.exenquiryTokenIw;
          this.enquiryTokenOow = this.exenquiryTokenOow;
          this.deliveryToken = this.exdeliveryToken;
          this.unattendedToken = this.exunattendedToken;
          this.t1Collected = this.exT1Collected;
          this.inWarrantyRaf = this.exinWarrantyRaf;
          this.outOfWarrRAF = this.exoutOfWarrRAF;
          this.totalRAF = this.extotalRAF;

          this.totalRafPer = this.extotalRafPer;
          this.inWarrantyPer = this.exinWarrantyPer;
          this.outofWarrantyPer = this.exoutofWarrantyPer;
          this.avgWaitingService = this.exavgWaitingService;
          this.avgHandlingServiceData = this.exavgHandlingServiceData;
          this.avgWaitingDeliveryData = this.exavgWaitingDeliveryData;
          this.avgHandlingDeliveryData = this.exavgHandlingDeliveryData;

          this.showNoData = false;
          this.showTable = true;
          this.loading = false;
        }, // success path
        error: error => error = error // error path
      });
  }

  calculateData(data: any) {
    this.DlData = [];
    this.nonDlData = [];
    this.extotalToken = 0;
    this.exserviceToken = 0;
    this.exenquiryTokenIw = 0;
    this.exenquiryTokenOow = 0;
    this.exdeliveryToken = 0;
    this.exunattendedToken = 0;
    this.exT1Collected = 0;
    this.exinWarrantyRaf = 0;
    this.exoutOfWarrRAF = 0;
    this.extotalRAF = 0;
    this.exinWarrantyPer = 0;
    this.exoutofWarrantyPer = 0;
    this.extotalRafPer = 0;
    this.exavgWaitingService = 0;
    this.exavgHandlingServiceData = 0;
    this.exavgWaitingDeliveryData = 0;
    this.exavgHandlingDeliveryData = 0;
    let result = data;
    for (let i = 0; i < this.branchList.length; i++) {
      let totalToken = result.total_token.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      totalToken = totalToken[0] === undefined ? 0 : totalToken[0].count;
      let serviceToken = result.service_token.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      serviceToken = serviceToken[0] === undefined ? 0 : serviceToken[0].count;
      let enquiryTokenIw = result.enquiry_token_iw.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      enquiryTokenIw = enquiryTokenIw[0] === undefined ? 0 : enquiryTokenIw[0].count;
      let enquiryTokenOow = result.enquiry_token_oow.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      enquiryTokenOow = enquiryTokenOow[0] === undefined ? 0 : enquiryTokenOow[0].count;
      let deliveryToken = result.delivery_token.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      deliveryToken = deliveryToken[0] === undefined ? 0 : deliveryToken[0].count;
      let unattendedToken = result.unattended_token.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      unattendedToken = unattendedToken[0] === undefined ? 0 : unattendedToken[0].count;
      let t1Collected = result.t1_collected.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      t1Collected = t1Collected[0] === undefined ? 0 : t1Collected[0].count;
      let inWarrantyRaf = result.in_warranty_raf.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      inWarrantyRaf = inWarrantyRaf[0] === undefined ? 0 : inWarrantyRaf[0].count;
      let outOfWarrRAF = result.out_of_warranty_raf.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      outOfWarrRAF = outOfWarrRAF[0] === undefined ? 0 : outOfWarrRAF[0].count;
      let totalRAF = result.total_raf.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      totalRAF = totalRAF[0] === undefined ? 0 : totalRAF[0].count;
      let AvgTime_Service_enquiry = result.AvgTime_Service_enquiry.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      let Avg_time_delivery = result.Avg_time_delivery.filter((data: any) => {
        return (data.branch_code === this.branchList[i].branch_code)
      });
      let avgWaitingService = 0;
      let avgHandlingService = 0;
      let avgWaitingServiceData = 0;
      let avgHandlingServiceData = 0;

      let avgWaitingDelivery = 0;
      let avgHandlingDelivery = 0;
      let avgWaitingDeliveryData = 0;
      let avgHandlingDeliveryData = 0;

      for (let k = 0; k < AvgTime_Service_enquiry.length; k++) {
        avgWaitingService = + avgWaitingService + +AvgTime_Service_enquiry[k].avg_waiting_time;
        avgWaitingServiceData = Math.round(avgWaitingService / AvgTime_Service_enquiry.length);
        avgHandlingService = +avgHandlingService + +AvgTime_Service_enquiry[k].avg_handling_time;
        avgHandlingServiceData = Math.round(avgHandlingService / AvgTime_Service_enquiry.length);
      }
      for (let k = 0; k < Avg_time_delivery.length; k++) {
        avgWaitingDelivery = +avgWaitingDelivery + +Avg_time_delivery[k].avg_waiting_time;
        avgWaitingDeliveryData = Math.round(avgWaitingDelivery / Avg_time_delivery.length);
        avgHandlingDelivery = +avgHandlingDelivery + +Avg_time_delivery[k].avg_handling_time;
        avgHandlingDeliveryData = Math.round(avgHandlingDelivery / Avg_time_delivery.length);
      }
      let inWarrantyPer: any = Math.round((inWarrantyRaf) / (totalRAF) * 100);
      isNaN(inWarrantyPer) ? inWarrantyPer = 0 : inWarrantyPer = inWarrantyPer + '%';

      let outofWarrantyPer: any = Math.round((outOfWarrRAF) / (totalRAF) * 100);
      isNaN(outofWarrantyPer) ? outofWarrantyPer = 0 : outofWarrantyPer = outofWarrantyPer + '%';

      let totalRafPer: any = Math.round((totalRAF) / (totalToken) * 100);
      isNaN(totalRafPer) ? totalRafPer = 0 : totalRafPer = totalRafPer + '%';

      this.extotalToken = +this.extotalToken + +totalToken;
      this.exserviceToken = +this.exserviceToken + +serviceToken;
      this.exenquiryTokenIw = +this.exenquiryTokenIw + +enquiryTokenIw;
      this.exenquiryTokenOow = +this.exenquiryTokenOow + +enquiryTokenOow;
      this.exdeliveryToken = +this.exdeliveryToken + +deliveryToken;
      this.exunattendedToken = +this.exunattendedToken + +unattendedToken;
      this.exT1Collected = +this.exT1Collected + +t1Collected;
      this.exinWarrantyRaf = +this.exinWarrantyRaf + +inWarrantyRaf;
      this.exoutOfWarrRAF = +this.exoutOfWarrRAF + +outOfWarrRAF;
      this.extotalRAF = +this.extotalRAF + +totalRAF;
      this.exinWarrantyPer = Math.round((this.exinWarrantyRaf) / (this.extotalRAF) * 100);
      isNaN(this.exinWarrantyPer) ? this.exinWarrantyPer = 0 : this.exinWarrantyPer = this.exinWarrantyPer + '%';

      this.exoutofWarrantyPer = Math.round((this.exoutOfWarrRAF) / (this.extotalRAF) * 100);
      isNaN(this.exoutofWarrantyPer) ? this.exoutofWarrantyPer = 0 : this.exoutofWarrantyPer = this.exoutofWarrantyPer + '%';

      this.extotalRafPer = Math.round((this.extotalRAF) / (this.extotalToken) * 100);
      isNaN(this.extotalRafPer) ? this.extotalRafPer = 0 : this.extotalRafPer = this.extotalRafPer + '%';
      this.exavgWaitingService = +this.exavgWaitingService + +avgWaitingService;
      this.exavgHandlingServiceData = +this.exavgHandlingServiceData + +avgHandlingServiceData;
      this.exavgWaitingDeliveryData = +this.exavgWaitingDeliveryData + +avgWaitingDeliveryData;
      this.exavgHandlingDeliveryData = +this.exavgHandlingDeliveryData + +avgHandlingDeliveryData;

      this.nonDlData.push({
        location: this.branchList[i].branch_name,
        branchType: this.branchList[i].dl_type,
        totalToken: totalToken,
        serviceToken: serviceToken,
        enquiryTokenIw: enquiryTokenIw,
        enquiryTokenOow: enquiryTokenOow,
        deliveryToken: deliveryToken,
        unattendedToken: unattendedToken,
        t1Collected: t1Collected,
        inWarrantyRaf: inWarrantyRaf,
        outOfWarrRAF: outOfWarrRAF,
        totalRAF: totalRAF,
        inWarrantyPer: inWarrantyPer === 'Infinity%' ? 0 : inWarrantyPer,
        outofWarrantyPer: outofWarrantyPer === 'Infinity%' ? 0 : outofWarrantyPer,
        totalRafPer: totalRafPer === 'Infinity%' ? 0 : totalRafPer,
        avgWaitingService: avgWaitingServiceData,
        avgHandlingServiceData: avgHandlingServiceData,
        avgWaitingDeliveryData: avgWaitingDeliveryData,
        avgHandlingDeliveryData: avgHandlingDeliveryData,
      });
    }

    for (let i = 0; i < this.dlBranchList.length; i++) {
      let totalToken = result.total_token.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      totalToken = totalToken[0] === undefined ? 0 : totalToken[0].count;
      let serviceToken = result.service_token.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      serviceToken = serviceToken[0] === undefined ? 0 : serviceToken[0].count;
      let enquiryTokenIw = result.enquiry_token_iw.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      enquiryTokenIw = enquiryTokenIw[0] === undefined ? 0 : enquiryTokenIw[0].count;
      let enquiryTokenOow = result.enquiry_token_oow.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      enquiryTokenOow = enquiryTokenOow[0] === undefined ? 0 : enquiryTokenOow[0].count;
      let deliveryToken = result.delivery_token.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      deliveryToken = deliveryToken[0] === undefined ? 0 : deliveryToken[0].count;
      let unattendedToken = result.unattended_token.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      unattendedToken = unattendedToken[0] === undefined ? 0 : unattendedToken[0].count;
      let t1Collected = result.t1_collected.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      t1Collected = t1Collected[0] === undefined ? 0 : t1Collected[0].count;
      let inWarrantyRaf = result.dl_in_warranty_raf.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      inWarrantyRaf = inWarrantyRaf[0] === undefined ? 0 : inWarrantyRaf[0].count;
      let outOfWarrRAF = result.dl_out_of_warranty_raf.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      outOfWarrRAF = outOfWarrRAF[0] === undefined ? 0 : outOfWarrRAF[0].count;
      let totalRAF = result.dl_total_raf.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      totalRAF = totalRAF[0] === undefined ? 0 : totalRAF[0].count;
      let AvgTime_Service_enquiry = result.AvgTime_Service_enquiry.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      let Avg_time_delivery = result.Avg_time_delivery.filter((data: any) => {
        return (data.branch_code === this.dlBranchList[i].branch_code)
      });
      let avgWaitingService = 0;
      let avgHandlingService = 0;
      let avgWaitingServiceData = 0;
      let avgHandlingServiceData = 0;

      let avgWaitingDelivery = 0;
      let avgHandlingDelivery = 0;
      let avgWaitingDeliveryData = 0;
      let avgHandlingDeliveryData = 0;

      for (let k = 0; k < AvgTime_Service_enquiry.length; k++) {
        avgWaitingService = + avgWaitingService + +AvgTime_Service_enquiry[k].avg_waiting_time;
        avgWaitingServiceData = Math.round(avgWaitingService / AvgTime_Service_enquiry.length);
        avgHandlingService = +avgHandlingService + +AvgTime_Service_enquiry[k].avg_handling_time;
        avgHandlingServiceData = Math.round(avgHandlingService / AvgTime_Service_enquiry.length);
      }
      for (let k = 0; k < Avg_time_delivery.length; k++) {
        avgWaitingDelivery = +avgWaitingDelivery + +Avg_time_delivery[k].avg_waiting_time;
        avgWaitingDeliveryData = Math.round(avgWaitingDelivery / Avg_time_delivery.length);
        avgHandlingDelivery = +avgHandlingDelivery + +Avg_time_delivery[k].avg_handling_time;
        avgHandlingDeliveryData = Math.round(avgHandlingDelivery / Avg_time_delivery.length);
      }
      let inWarrantyPer: any = Math.round((inWarrantyRaf) / (totalRAF) * 100);
      isNaN(inWarrantyPer) ? inWarrantyPer = 0 : inWarrantyPer = inWarrantyPer + '%';

      let outofWarrantyPer: any = Math.round((outOfWarrRAF) / (totalRAF) * 100);
      isNaN(outofWarrantyPer) ? outofWarrantyPer = 0 : outofWarrantyPer = outofWarrantyPer + '%';

      let totalRafPer: any = Math.round((totalRAF) / (totalToken) * 100);
      isNaN(totalRafPer) ? totalRafPer = 0 : totalRafPer = totalRafPer + '%';

      this.extotalToken = +this.extotalToken + +totalToken;
      this.exserviceToken = +this.exserviceToken + +serviceToken;
      this.exenquiryTokenIw = +this.exenquiryTokenIw + +enquiryTokenIw;
      this.exenquiryTokenOow = +this.exenquiryTokenOow + +enquiryTokenOow;
      this.exdeliveryToken = +this.exdeliveryToken + +deliveryToken;
      this.exunattendedToken = +this.exunattendedToken + +unattendedToken;
      this.exT1Collected = +this.exT1Collected + +t1Collected;
      this.exinWarrantyRaf = +this.exinWarrantyRaf + +inWarrantyRaf;
      this.exoutOfWarrRAF = +this.exoutOfWarrRAF + +outOfWarrRAF;
      this.extotalRAF = +this.extotalRAF + +totalRAF;
      this.exinWarrantyPer = Math.round((this.exinWarrantyRaf) / (this.extotalRAF) * 100);
      isNaN(this.exinWarrantyPer) ? this.exinWarrantyPer = 0 : this.exinWarrantyPer = this.exinWarrantyPer + '%';

      this.exoutofWarrantyPer = Math.round((this.exoutOfWarrRAF) / (this.extotalRAF) * 100);
      isNaN(this.exoutofWarrantyPer) ? this.exoutofWarrantyPer = 0 : this.exoutofWarrantyPer = this.exoutofWarrantyPer + '%';

      this.extotalRafPer = Math.round((this.extotalRAF) / (this.extotalToken) * 100);
      isNaN(this.extotalRafPer) ? this.extotalRafPer = 0 : this.extotalRafPer = this.extotalRafPer + '%';
      this.exavgWaitingService = +this.exavgWaitingService + +avgWaitingService;
      this.exavgHandlingServiceData = +this.exavgHandlingServiceData + +avgHandlingServiceData;
      this.exavgWaitingDeliveryData = +this.exavgWaitingDeliveryData + +avgWaitingDeliveryData;
      this.exavgHandlingDeliveryData = +this.exavgHandlingDeliveryData + +avgHandlingDeliveryData;

      this.DlData.push({
        location: this.dlBranchList[i].branch_name,
        branchType: this.dlBranchList[i].dl_type,
        totalToken: totalToken,
        serviceToken: serviceToken,
        enquiryTokenIw: enquiryTokenIw,
        enquiryTokenOow: enquiryTokenOow,
        deliveryToken: deliveryToken,
        unattendedToken: unattendedToken,
        t1Collected: t1Collected,
        inWarrantyRaf: inWarrantyRaf,
        outOfWarrRAF: outOfWarrRAF,
        totalRAF: totalRAF,
        inWarrantyPer: inWarrantyPer === 'Infinity%' ? 0 : inWarrantyPer,
        outofWarrantyPer: outofWarrantyPer === 'Infinity%' ? 0 : outofWarrantyPer,
        totalRafPer: totalRafPer === 'Infinity%' ? 0 : totalRafPer,
        avgWaitingService: avgWaitingServiceData,
        avgHandlingServiceData: avgHandlingServiceData,
        avgWaitingDeliveryData: avgWaitingDeliveryData,
        avgHandlingDeliveryData: avgHandlingDeliveryData,
      });
    }
  }

  exportAsXLSX() {
    this.errorMessage = '';
    this.exportDataTemp = [];
    if (this.productFamily === 'Select Product Family' || this.fromDate === '' || this.toDate === '') {
      this.errorMessage = 'Please Fill all Mandatory Fields';
      return;
    } else {
      this.exportDayReport();
      this.showTable = false;
      this.showNoData = false;
    }
  }

  exportDayReport() {
    let result;
    this.loading = true;
    this.dataService.exportDayReport(this.fromDate, this.toDate, this.productFamily)
      .subscribe({
        next: (datas: any) => {
          result = datas.data;
          this.calculateData(result);

          this.exportDataTemp = this.nonDlData.concat(this.DlData);
          this.exportDataTemp.push({
            location: 'Total Footfall',
            totalToken: this.extotalToken,
            serviceToken: this.exserviceToken,
            enquiryTokenIw: this.exenquiryTokenIw,
            enquiryTokenOow: this.exenquiryTokenOow,
            deliveryToken: this.exdeliveryToken,
            unattendedToken: this.exunattendedToken,
            t1Collected: this.exT1Collected,
            inWarrantyRaf: this.exinWarrantyRaf,
            outOfWarrRAF: this.exoutOfWarrRAF,
            totalRAF: this.extotalRAF,
            inWarrantyPer: this.exinWarrantyPer,
            outofWarrantyPer: this.exoutofWarrantyPer,
            totalRafPer: this.extotalRafPer,
            avgWaitingService: this.exavgWaitingService,
            avgHandlingServiceData: this.exavgHandlingServiceData,
            avgWaitingDeliveryData: this.exavgWaitingDeliveryData,
            avgHandlingDeliveryData: this.exavgHandlingDeliveryData,
          });
          if (this.exportDataTemp) {
            this.excelService.exportAsExcelFile(this.exportDataTemp, 'Day Report Dashboard');
          }
          this.loading = false;
        }
      })
  }

  clear() {
    this.productFamily = 'Select Product Family';
    this.fromDate = '';
    this.toDate = '';
    this.exportDataTemp = [];
  }
}
