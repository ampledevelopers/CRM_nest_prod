import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { QualityProgramDashboardService } from './quality-program-dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
    selector: 'app-quality-program-dashboard',
    templateUrl: './quality-program-dashboard.component.html',
    styleUrls: ['./quality-program-dashboard.component.scss', '../../../../../scss/customstyle.css'],
    standalone: true,
    imports: [CommonModule, BrowserModule,FormsModule, NgSelectModule]
})
export class QualityProgramDashboardComponent {
  loading = false;
  year: any = '';
  period: any = '';
  carryInLength: any;
  mailInLength: any;
  week: any = '';
  report: any = '';
  datePipe = new DatePipe('en-US');
  fromDate: any = new Date();
  toDate: any = new Date();
  branches: any = [];
  cinPurchasedIn: any = [];
  wumsPurchasedIn: any = [];
  entireData: any = [];
  carryInData: any = [];
  mailInData: any = [];
  carryInDataTemp: any = [];
  mailInDataTemp: any = [];
  cTotalIphone: any = 0;
  cTotalAirpods: any = 0;
  cTotalMac: any = 0;
  mTotalIphone: any = 0;
  mTotalAirpods: any = 0;
  mTotalMac: any = 0;
  mGrandTotal: any = 0;
  cGrandTotal: any = 0;
  appleCalenderJson: any = [];
  date: any = new Date();
  noOfWeeks: any;
  showFifthWeek = false;
  showRepairData = false;
  showData = false;
  currentTitle: any;
  previousTitle: any;
  reportType = null;
  totalIndia: any = 0;
  totalArab: any = 0;
  totalAus: any = 0;
  totalCanada: any = 0;
  totalChina: any = 0;
  totalJapan: any = 0;
  totalRepublic: any = 0;
  totalSA: any = 0;
  totalSingapore: any = 0;
  totalUK: any = 0;
  totalUS: any = 0;
  grandTotal: any = 0;

  dataTemp = [{ label: 'Country of Purchase', value: 'Country of Purchase' }, { label: 'Repair Type', value: 'Repair Type' },];

  constructor(public dataService: QualityProgramDashboardService) {
  }

  onSelectYear() {
    this.appleCalenderJson = [];
    if(this.year === '2023') {
    this.date = new Date(2022, 8, 18);
  }
  else if(this.year === '2024') {
    this.date = new Date(2023, 8, 24);
  }
  else if (this.year === '2025') {
    this.date = new Date(2024, 8, 29);
  }
  else if (this.year === '2026') {
    this.date = new Date(2025, 8, 22);  // add next year calendar first date
  }
    let firstDate = new Date(this.date);
    for (let i = 1; i <= 12; i++) {
      if (this.checkWeek(i)) {
        this.noOfWeeks = 5;
      } else {
        this.noOfWeeks = 4;
      }
      for (let j = 1; j <= this.noOfWeeks; j++) {
        this.date = firstDate.setDate(firstDate.getDate() + 7);
        let endDate: any = new Date(firstDate);
        let startDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        endDate = endDate.setDate(firstDate.getDate() + 6);
        endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
        this.appleCalenderJson.push({
          year: this.year,
          period: i,
          week: j,
          startDate: startDate,
          endDate: endDate
        })
      }
    }
  }

  onPeriodSelect() {
    let p = Number(this.period);
    if (this.checkWeek(p)) {
      this.showFifthWeek = true;
    } else {
      this.showFifthWeek = false;
    }
  }

  load() {
    this.entireData = [];
    this.mailInDataTemp = [];
    this.carryInDataTemp = [];
    this.cTotalIphone = '';
    this.cTotalAirpods = '';
    this.cTotalMac = '';
    this.cGrandTotal = '';
    this.mTotalIphone = '';
    this.mTotalAirpods = '';
    this.mTotalMac = '';
    this.mGrandTotal = '';
    this.showData = false;
    this.showRepairData = false;
    if (this.year === '') {
      alert('Please select year');
      return;
    } else if (this.period === '') {
      alert('Please select Period');
      return;
    } else if (this.reportType === '') {
      alert('Please select the Report type');
      return;
    } else if (this.week === '') {
      alert('Please select Week');
      return;
    }
    else {
      this.loading = true;
      let p = Number(this.period);
      let w = Number(this.week);
      this.currentTitle = 'P' + this.period + 'W' + this.week;
      this.previousTitle = 'P' + (w !== 1 ? p : p === 1 ? 12 : p - 1) + 'W' + (w !== 1 ? w - 1 : this.checkWeek(p - 1) ? '5' : '4');
      let calenderData = this.appleCalenderJson.filter((date: any) => {
        return (date.period === p && date.week === w)
      });
      this.fromDate = calenderData[0].startDate;
      this.toDate = calenderData[0].endDate;
      if (this.reportType === 'Country of Purchase') {
        this.report = 1;
        this.getCOPData();
      } else if (this.reportType === 'Repair Type') {
        this.report = 2;
        this.getRepairTypeData();
      }
    }
  }

  checkWeek(p: any) { //change here Next Year
    if(this.year === '2023') {
      if (p === 1 || p === 3 || p === 4 || p === 7 || p === 10) {
        return true;
      } return false;
    } else if(this.year === '2024') {
      if (p === 1 || p === 4 || p === 7 || p === 10 ) {
        return true;
      } return false;
    } else if (this.year === '2025') {
      if (p === 1 || p === 4 || p === 7 || p === 10) {
      return true;
    } return false;
  } else if (this.year === '2026') {
      if (p === 1 || p === 4 || p === 5 || p === 7 || p === 10) {
      return true;
    } return false;
  }else return false;
  }

  getCOPData() {
    this.loading = true;
    this.totalIndia = '';
    this.totalUS = '';
    this.totalAus = '';
    this.totalJapan = '';
    this.totalUK = '';
    this.totalSingapore = '';
    this.totalCanada = '';
    this.totalChina = '';
    this.totalSA = '';
    this.totalRepublic = '';
    this.totalArab = '';
    this.grandTotal = '';
    this.dataService.getQPData(this.fromDate, this.toDate, this.report)
      .subscribe({
        next: (data: any) => {
          if (data.status === true) {
            let reportData = data.data;
            for (let i = 0; i < reportData.length; i++) {
              this.branches.push(reportData[i].branch_name)
            }

            this.branches = this.branches.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            })
            let dataIndia = reportData.filter((data: any) => {
              return data.purchased_in === 'India'
            });
            let dataUS = reportData.filter((data: any) => {
              return data.purchased_in === 'United States'
            });
            let dataAus = reportData.filter((data: any) => {
              return data.purchased_in === 'Australia'
            });
            let dataJapan = reportData.filter((data: any) => {
              return data.purchased_in === 'Japan'
            });
            let dataUK = reportData.filter((data: any) => {
              return data.purchased_in === 'United Kingdom'
            });
            let dataSingp = reportData.filter((data: any) => {
              return data.purchased_in === 'Singapore'
            });
            let dataCanada = reportData.filter((data: any) => {
              return data.purchased_in === 'Canada'
            });
            let dataChina = reportData.filter((data: any) => {
              return data.purchased_in === 'China mainland'
            });
            let dataSA = reportData.filter((data: any) => {
              return data.purchased_in === 'Saudi Arabia'
            });
            let dataRepublic = reportData.filter((data: any) => {
              return data.purchased_in === 'Czech Republic'
            });
            let dataArabE = reportData.filter((data: any) => {
              return data.purchased_in === 'United Arab Emirates'
            });
            for (let i = 0; i < this.branches.length; i++) {
              let branchName = this.branches[i].replace('iCare ', '');
              let dataIndiaTemp = dataIndia.filter((data: any) => {
                return data.branch_name === this.branches[i]
              });
              let dataUSTemp = dataUS.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataAusTemp = dataAus.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataJapanTemp = dataJapan.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataUKTemp = dataUK.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataSingpTemp = dataSingp.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataCanadaTemp = dataCanada.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataChinaTemp = dataChina.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataSATemp = dataSA.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataRepublicTemp = dataRepublic.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              let dataArabETemp = dataArabE.filter((branchCode: any) => {
                return branchCode.branch_name === this.branches[i]
              });
              this.entireData.push({
                branch: branchName,
                dataIndiaTemp: dataIndiaTemp[0] === undefined ? 0 : dataIndiaTemp[0].count,
                dataUSTemp: dataUSTemp[0] === undefined ? 0 : dataUSTemp[0].count,
                dataAusTemp: dataAusTemp[0] === undefined ? 0 : dataAusTemp[0].count,
                dataJapanTemp: dataJapanTemp[0] === undefined ? 0 : dataJapanTemp[0].count,
                dataUKTemp: dataUKTemp[0] === undefined ? 0 : dataUKTemp[0].count,
                dataSingpTemp: dataSingpTemp[0] === undefined ? 0 : dataSingpTemp[0].count,
                dataCanadaTemp: dataCanadaTemp[0] === undefined ? 0 : dataCanadaTemp[0].count,
                dataChinaTemp: dataChinaTemp[0] === undefined ? 0 : dataChinaTemp[0].count,
                dataSATemp: dataSATemp[0] === undefined ? 0 : dataSATemp[0].count,
                dataRepublicTemp: dataRepublicTemp[0] === undefined ? 0 : dataRepublicTemp[0].count,
                dataArabETemp: dataArabETemp[0] === undefined ? 0 : dataArabETemp[0].count,
              })
              this.totalIndia = +this.totalIndia + +this.entireData[i].dataIndiaTemp;
              this.totalUS = +this.totalUS + +this.entireData[i].dataUSTemp;
              this.totalAus = +this.totalAus + +this.entireData[i].dataAusTemp;
              this.totalJapan = +this.totalJapan + +this.entireData[i].dataJapanTemp;
              this.totalUK = +this.totalUK + +this.entireData[i].dataUKTemp;
              this.totalSingapore = +this.totalSingapore + +this.entireData[i].dataSingpTemp;
              this.totalCanada = +this.totalCanada + +this.entireData[i].dataCanadaTemp;
              this.totalChina = +this.totalChina + +this.entireData[i].dataChinaTemp;
              this.totalSA = +this.totalSA + +this.entireData[i].dataSATemp;
              this.totalRepublic = +this.totalRepublic + +this.entireData[i].dataRepublicTemp;
              this.totalArab = +this.totalArab + +this.entireData[i].dataArabETemp;
              this.grandTotal = +this.totalIndia + +this.totalUS + +this.totalAus + +this.totalJapan + +this.totalUK + +this.totalSingapore + +this.totalCanada
                + +this.totalChina + +this.totalSA + +this.totalRepublic + +this.totalArab;
            }
            this.loading = false;
            this.showData = true;
          } else {
            alert('Data Not Available');
          }
        }
      })
  }

  getRepairTypeData() {
    this.loading = true;
    this.dataService.getQPData(this.fromDate, this.toDate, this.report)
      .subscribe({
        next: (data: any) => {
          if (data.status === true) {
            let reportData = data.data;
            for (let i = 0; i < reportData.length; i++) {
              if (reportData[i].repair_type === 'CIN') {
                this.carryInData.push(reportData[i]);
                for (let i = 0; i < this.carryInData.length; i++) {
                  this.cinPurchasedIn.push(this.carryInData[i].purchased_in)
                }
                this.cinPurchasedIn = this.cinPurchasedIn.filter(function (elem: any, index: any, self: any) {
                  return index === self.indexOf(elem);
                })
                this.carryInLength = this.cinPurchasedIn.length + 1;
              } else if (reportData[i].repair_type === 'WUMS') {
                this.mailInData.push(reportData[i]);
                for (let i = 0; i < this.mailInData.length; i++) {
                  this.wumsPurchasedIn.push(this.mailInData[i].purchased_in)
                }
                this.wumsPurchasedIn = this.wumsPurchasedIn.filter(function (elem: any, index: any, self: any) {
                  return index === self.indexOf(elem);
                })
                this.mailInLength = this.wumsPurchasedIn.length + 1;
              }
            }
            if (this.carryInData.length != 0) {
              let iphoneData = this.carryInData.filter((data: any) => {
                return data.family === 'iPhone'
              });
              let airpodsData = this.carryInData.filter((data: any) => {
                return data.family === 'AirPods'
              });
              let macData = this.carryInData.filter((data: any) => {
                return data.family === 'Mac'
              });
              for (let i = 0; i < this.cinPurchasedIn.length; i++) {
                let purchasedIn = this.cinPurchasedIn[i];
                let iphoneDataTemp = iphoneData.filter((data: any) => {
                  return data.purchased_in === this.cinPurchasedIn[i]
                });
                let airpodsDataTemp = airpodsData.filter((data: any) => {
                  return data.purchased_in === this.cinPurchasedIn[i]
                });
                let macDataTemp = macData.filter((data: any) => {
                  return data.purchased_in === this.cinPurchasedIn[i]
                });
                this.carryInDataTemp.push({
                  purchasedIn: purchasedIn,
                  iphoneDataTemp: iphoneDataTemp[0] === undefined ? 0 : iphoneDataTemp[0].count,
                  airpodsDataTemp: airpodsDataTemp[0] === undefined ? 0 : airpodsDataTemp[0].count,
                  macDataTemp: macDataTemp[0] === undefined ? 0 : macDataTemp[0].count,
                })
                this.cTotalIphone = +this.cTotalIphone + +this.carryInDataTemp[i].iphoneDataTemp;
                this.cTotalAirpods = +this.cTotalAirpods + +this.carryInDataTemp[i].airpodsDataTemp;
                this.cTotalMac = +this.cTotalMac + +this.carryInDataTemp[i].macDataTemp;
                this.cGrandTotal = +this.cTotalIphone + +this.cTotalAirpods + +this.cTotalMac;
              }
            }
            if (this.mailInData.length !== 0) {
              let iphoneData = this.mailInData.filter((data: any) => {
                return data.family === 'iPhone'
              });
              let airpodsData = this.mailInData.filter((data: any) => {
                return data.family === 'AirPods'
              });
              let macData = this.mailInData.filter((data: any) => {
                return data.family === 'Mac'
              });
              for (let i = 0; i < this.wumsPurchasedIn.length; i++) {
                let purchasedIn = this.wumsPurchasedIn[i];
                let iphoneDataTemp = iphoneData.filter((data: any) => {
                  return data.purchased_in === this.wumsPurchasedIn[i]
                });
                let airpodsDataTemp = airpodsData.filter((data: any) => {
                  return data.purchased_in === this.wumsPurchasedIn[i]
                });
                let macDataTemp = macData.filter((data: any) => {
                  return data.purchased_in === this.wumsPurchasedIn[i]
                });
                this.mailInDataTemp.push({
                  purchasedIn: purchasedIn,
                  iphoneDataTemp: iphoneDataTemp[0] === undefined ? 0 : iphoneDataTemp[0].count,
                  airpodsDataTemp: airpodsDataTemp[0] === undefined ? 0 : airpodsDataTemp[0].count,
                  macDataTemp: macDataTemp[0] === undefined ? 0 : macDataTemp[0].count,
                })
                this.mTotalIphone = +this.cTotalIphone + +this.mailInDataTemp[i].iphoneDataTemp;
                this.mTotalAirpods = +this.cTotalAirpods + +this.mailInDataTemp[i].airpodsDataTemp;
                this.mTotalMac = +this.cTotalMac + +this.mailInDataTemp[i].macDataTemp;
                this.mGrandTotal = +this.mTotalIphone + +this.mTotalAirpods + +this.mTotalMac;
              }
            }
            this.loading = false;
            this.showRepairData = true;
          } else {
            alert('Data Not Available');
            this.loading = true;
            this.showRepairData = false;
          }
        }
      })
  }
}
