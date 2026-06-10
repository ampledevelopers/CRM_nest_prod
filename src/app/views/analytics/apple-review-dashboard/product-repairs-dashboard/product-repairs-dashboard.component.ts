import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductRepairsDashboardService } from './product-repairs-dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-product-repairs-dashboard',
    templateUrl: './product-repairs-dashboard.component.html',
    styleUrls: ['./product-repairs-dashboard.component.scss', '../../../../../scss/customstyle.css'],
    standalone: true,
    imports: [CommonModule, BrowserModule,FormsModule, NgSelectModule]

})
export class ProductRepairsDashboardComponent {
  loading = false;
  showData = false;
  year: any = '';
  period: any = '';
  week: any = '';
  datePipe = new DatePipe('en-US');
  fromDate: any = new Date();
  toDate: any = new Date();
  entireData: any = [];
  appleCalenderJson: any = [];
  noOfWeeks: any;
  showFifthWeek = false;
  date: any = new Date();
  currentTitle: any;
  previousTitle: any;
  branches: any = [];
  totalairPods: any = 0;
  totaliPad: any = 0;
  totaliPhone: any = 0;
  totalmac: any = 0;
  totalwatch: any = 0;
  totalbeats: any = 0;
  totalappleTV: any = 0;
  totalpencil: any = 0;
  totaliPod: any = 0;
  totalothers: any = 0;
  grandTotal: any = 0;

  constructor(public dataService: ProductRepairsDashboardService) {
  }

  onSelectYear() {
    this.appleCalenderJson = [];
    if (this.year === '2023') {
      this.date = new Date(2022, 8, 18); //change here Next Year
    }
    else if (this.year === '2024') {
      this.date = new Date(2023, 8, 24);
    }
    else if (this.year === '2025') {
      this.date = new Date(2024, 8, 21);
    }
    else if (this.year === '2026') {
      this.date = new Date(2025, 8, 22);
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

  checkWeek(p: any) { //change here Next Year
    if (this.year === '2023') {
      if (p === 1 || p === 3 || p === 4 || p === 7 || p === 10) {
        return true;
      } return false;
    } else if (this.year === '2024') {
      if (p === 1 || p === 4 || p === 7 || p === 10) {
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
     } else return false;
  }

  load() {
    this.entireData = [];
    this.totalairPods = 0;
    this.totaliPad = 0;
    this.totaliPhone = 0;
    this.totalmac = 0;
    this.totalwatch = 0;
    this.totalbeats = 0;
    this.totalappleTV = 0;
    this.totalpencil = 0;
    this.totaliPod = 0;
    this.totalothers = 0;
    this.grandTotal = 0;
    this.showData = false;
    if (this.period === '') {
      alert('Please select Period');
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

      this.dataService.getProductRepairs(this.fromDate, this.toDate)
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
              let dataAirPods = reportData.filter((data: any) => {
                return data.family === 'AirPods'
              });
              let dataiPad = reportData.filter((data: any) => {
                return data.family === 'iPad'
              });
              let dataiPhone = reportData.filter((data: any) => {
                return data.family === 'iPhone'
              });
              let dataMac = reportData.filter((data: any) => {
                return data.family === 'Mac'
              });
              let dataOthers = reportData.filter((data: any) => {
                return data.family === 'Others'
              });
              let dataWatch = reportData.filter((data: any) => {
                return data.family === 'Watch'
              });
              let dataBeats = reportData.filter((data: any) => {
                return data.family === 'Beats'
              });
              let dataAppleTV = reportData.filter((data: any) => {
                return data.family === 'Apple TV'
              });
              let dataPencil = reportData.filter((data: any) => {
                return data.family === 'Pencil'
              });
              let dataiPod = reportData.filter((data: any) => {
                return data.family === 'iPod'
              });
              for (let i = 0; i < this.branches.length; i++) {
                let branchName = this.branches[i].replace('iCare ', '');
                let airPodsTemp = dataAirPods.filter((data: any) => {
                  return data.branch_name === this.branches[i]
                });
                let iPadTemp = dataiPad.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let iPhoneTemp = dataiPhone.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let macTemp = dataMac.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let othersTemp = dataOthers.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let watchTemp = dataWatch.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let beatsTemp = dataBeats.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let appleTVTemp = dataAppleTV.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let pencilTemp = dataPencil.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                let iPodTemp = dataiPod.filter((branchCode: any) => {
                  return branchCode.branch_name === this.branches[i]
                });
                this.entireData.push({
                  branch: branchName,
                  airPodsTemp: airPodsTemp[0] === undefined ? 0 : airPodsTemp[0].count,
                  iPadTemp: iPadTemp[0] === undefined ? 0 : iPadTemp[0].count,
                  iPhoneTemp: iPhoneTemp[0] === undefined ? 0 : iPhoneTemp[0].count,
                  macTemp: macTemp[0] === undefined ? 0 : macTemp[0].count,
                  othersTemp: othersTemp[0] === undefined ? 0 : othersTemp[0].count,
                  watchTemp: watchTemp[0] === undefined ? 0 : watchTemp[0].count,
                  beatsTemp: beatsTemp[0] === undefined ? 0 : beatsTemp[0].count,
                  appleTVTemp: appleTVTemp[0] === undefined ? 0 : appleTVTemp[0].count,
                  pencilTemp: pencilTemp[0] === undefined ? 0 : pencilTemp[0].count,
                  iPodTemp: iPodTemp[0] === undefined ? 0 : iPodTemp[0].count,
                })
                this.totalairPods = +this.totalairPods + +this.entireData[i].airPodsTemp;
                this.totaliPad = +this.totaliPad + +this.entireData[i].iPadTemp;
                this.totaliPhone = +this.totaliPhone + +this.entireData[i].iPhoneTemp;
                this.totalmac = +this.totalmac + +this.entireData[i].macTemp;
                this.totalwatch = +this.totalwatch + +this.entireData[i].watchTemp;
                this.totalbeats = +this.totalbeats + +this.entireData[i].beatsTemp;
                this.totalappleTV = +this.totalappleTV + +this.entireData[i].appleTVTemp;
                this.totalpencil = +this.totalpencil + +this.entireData[i].pencilTemp;
                this.totaliPod = +this.totaliPod + +this.entireData[i].iPodTemp;
                this.totalothers = +this.totalothers + +this.entireData[i].othersTemp;
                this.grandTotal = +this.totalairPods + +this.totaliPad + +this.totaliPhone + +this.totalmac + +this.totalwatch + +this.totalbeats + +this.totalappleTV
                  + +this.totalpencil + +this.totaliPod + +this.totalothers;
              }
              this.showData = true;
              this.loading = false;
            }else{
              alert('Data Not Available');
            }
          }
        })
    }
  }

}
