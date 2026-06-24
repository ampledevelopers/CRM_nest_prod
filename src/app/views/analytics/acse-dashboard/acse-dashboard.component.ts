import { Component } from '@angular/core';
import { AcseDashboardService } from './acse-dashboard.service';
import { ExcelService } from '../excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-acse-dashboard',
    templateUrl: './acse-dashboard.component.html',
    styleUrls: ['./acse-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class AcseDashboardComponent {
  loading = false;
  dataLoading = true;
  error: any;
  date = '';
  preday = new Date().toISOString().split('T')[0];
  prevday = new Date();
  macDatas: any;
  iphoneDatas: any;
  ticketsList: any = [];
  colors: any = [];
  macAcseDatas: any = [];
  iphoneAcseDatas: any = [];
  grandTotals: any;
  isTicketList = true;
  userRole: any;
  weekNo: any;
  constructor(
    public dataService: AcseDashboardService, private modalService: NgbModal,
    private excelService: ExcelService
  ) {
    this.userRole = localStorage.getItem('userRole');
  }

  openModal(template: any) {
    this.modalService.open(template, { backdrop: 'static', keyboard: false });
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.isTicketList = true;
  }

  load() {
    if (this.date !== '') {
      this.dataLoading = true;
      this.loading = true;
      this.getAcseData();
    } else {
      alert('Please select the Date');
      return;
    }
  }

  getAcseData() {
    let result: any;
    let points: any;
    let pprPoints: any;
    let cclrPoints: any;
    let reptatPoints: any;
    let sdrPoints: any;
    let ntfPoints: any;
    let surPoints: any;
    this.macAcseDatas = [];
    this.iphoneAcseDatas = [];
    this.dataService.getAcseData(this.date)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.macDatas = result.mac;
            this.iphoneDatas = result.iphone;
            for (let i = 0; i < this.macDatas.length; i++) {
              const rate = this.macDatas[i].mac_eligible_repair / this.macDatas[i].mac_reptat_repair;
              const ppr_rate = this.macDatas[i].mac_repair_PPR / this.macDatas[i].mac_PPR_eligible_repair;
              const cclr_rate = (this.macDatas[i].mac_repeated_serials / this.macDatas[i].mac_looped_repairs) * 100;
              if (rate <= 5) {
                points = 50;
              } else if (rate >= 5.01 && rate <= 5.50) {
                points = 40;
              } else if (rate >= 5.51 && rate <= 6.0) {
                points = 30;
              } else if (rate >= 6.01 && rate <= 6.5) {
                points = 20;
              } else if (rate >= 6.51 && rate <= 7.0) {
                points = 10;
              } else if (rate > 7) {
                points = 0;
              }
              if (ppr_rate <= 1.1) {
                pprPoints = 25;
              } else if (ppr_rate >= 1.11 && ppr_rate <= 1.2) {
                pprPoints = 20;
              } else if (ppr_rate >= 1.21 && ppr_rate <= 1.3) {
                pprPoints = 15;
              } else if (ppr_rate >= 1.31 && ppr_rate <= 1.4) {
                pprPoints = 10;
              } else if (ppr_rate >= 1.41 && ppr_rate <= 1.5) {
                pprPoints = 5;
              } else if (ppr_rate >= 1.51) {
                pprPoints = 0;
              }
              if (cclr_rate <= 2) {
                cclrPoints = 25;
              } else if (cclr_rate >= 2.01 && cclr_rate <= 3) {
                cclrPoints = 20;
              } else if (cclr_rate >= 3.01 && cclr_rate <= 4.0) {
                cclrPoints = 15;
              } else if (cclr_rate >= 4.01 && cclr_rate <= 5.0) {
                cclrPoints = 10;
              } else if (cclr_rate >= 5.01 && cclr_rate <= 6.0) {
                cclrPoints = 5;
              } else if (cclr_rate > 6) {
                cclrPoints = 0;
              }
              this.macAcseDatas.push({
                branch_id: this.macDatas[i].branch_id,
                shipTo: this.macDatas[i].ship_to,
                branchCode: this.macDatas[i].branch_code,
                branchName: this.macDatas[i].branch_name,
                mac_reptat_repair: this.macDatas[i].mac_reptat_repair,
                mac_eligible_repair: this.macDatas[i].mac_eligible_repair,
                REPTAT_Rate: rate,
                REPTAT_points: points,
                mac_repair_PPR: this.macDatas[i].mac_repair_PPR,
                mac_PPR_eligible_repair: this.macDatas[i].mac_PPR_eligible_repair,
                PPR_rating: ppr_rate,
                PPR_points: pprPoints,
                mac_repeated_serials: this.macDatas[i].mac_repeated_serials,
                mac_looped_repairs: this.macDatas[i].mac_looped_repairs,
                cclr_rating: cclr_rate,
                cclr_points: cclrPoints
              });
            }
            for (let j = 0; j < this.iphoneDatas.length; j++) {
              const reptatRate = this.iphoneDatas[j].iphone_eligible_repairs / this.iphoneDatas[j].iphone_reptat_repair;
              const ntf_rate = (this.iphoneDatas[j].iphone_no_trouble / this.iphoneDatas[j].iphone_NTF) * 100;
              const sdr_rate = (this.iphoneDatas[j].iphone_SDR / this.iphoneDatas[j].iphone_sdr_events) * 100;
              const sur_rate = (this.iphoneDatas[j].iphone_SUR_Opp / this.iphoneDatas[j].iphone_SUR_repairs) * 100;
              if (reptatRate <= 1) {
                reptatPoints = 40;
              } else if (reptatRate >= 1.01 && reptatRate <= 1.25) {
                reptatPoints = 30;
              } else if (reptatRate >= 1.26 && reptatRate <= 1.5) {
                reptatPoints = 20;
              } else if (reptatRate >= 1.51 && reptatRate <= 1.75) {
                reptatPoints = 10;
              } else if (reptatRate >= 1.76 && reptatRate <= 2.0) {
                reptatPoints = 5;
              } else if (reptatRate > 2) {
                reptatPoints = 0;
              }
              if (ntf_rate <= 8) {
                ntfPoints = 25;
              } else if (ntf_rate >= 8.01 && ntf_rate <= 10) {
                ntfPoints = 20;
              } else if (ntf_rate >= 10.01 && ntf_rate <= 12) {
                ntfPoints = 15;
              } else if (ntf_rate >= 12.01 && ntf_rate <= 13) {
                ntfPoints = 10;
              } else if (ntf_rate >= 13.01 && ntf_rate <= 14) {
                ntfPoints = 5;
              } else if (ntf_rate > 14) {
                ntfPoints = 0;
              }
              if (sdr_rate >= 90) {
                sdrPoints = 10;
              } else if (sdr_rate >= 89.99 && sdr_rate <= 85) {
                sdrPoints = 8;
              } else if (sdr_rate >= 84.99 && sdr_rate <= 80) {
                sdrPoints = 6;
              } else if (sdr_rate >= 79.99 && sdr_rate <= 75) {
                sdrPoints = 4;
              } else if (sdr_rate >= 74.99 && sdr_rate <= 70) {
                sdrPoints = 2;
              } else if (sdr_rate <= 69.99) {
                sdrPoints = 0;
              }
              if (sur_rate >= 80) {
                surPoints = 25;
              } else if (sur_rate >= 79.99 && sur_rate <= 75) {
                surPoints = 20;
              } else if (sur_rate >= 74.99 && sur_rate <= 70) {
                surPoints = 15;
              } else if (sur_rate >= 69.99 && sur_rate <= 65) {
                surPoints = 10;
              } else if (sur_rate >= 64.99 && sur_rate <= 60) {
                surPoints = 5;
              } else if (sur_rate <= 59.99) {
                surPoints = 0;
              }
              this.iphoneAcseDatas.push({
                branch_id: this.iphoneDatas[j].branch_id,
                shipTo: this.iphoneDatas[j].ship_to,
                branchCode: this.iphoneDatas[j].branch_code,
                branchName: this.macDatas[j].branch_name,
                iphone_reptat_repair: this.iphoneDatas[j].iphone_reptat_repair,
                iphone_eligible_repairs: this.iphoneDatas[j].iphone_eligible_repairs,
                reptat_rate: reptatRate,
                reptat_points: reptatPoints,
                iphone_sdr_events: this.iphoneDatas[j].iphone_sdr_events,
                iphone_SDR: this.iphoneDatas[j].iphone_SDR,
                iphone_SDR_rate: sdr_rate,
                iphone_SDR_points: sdrPoints,
                iphone_NTF: this.iphoneDatas[j].iphone_NTF,
                iphone_no_trouble: this.iphoneDatas[j].iphone_no_trouble,
                iphone_ntf_rate: ntf_rate,
                iphone_ntf_points: ntfPoints,
                iphone_SUR_repairs: this.iphoneDatas[j].iphone_SUR_repairs,
                iphone_SUR_Opp: this.iphoneDatas[j].iphone_SUR_Opp,
                iphone_SUR_Opp_rate: sur_rate,
                iphone_SUR_Opp_points: surPoints
              });
            }
            this.loading = false;
            this.dataLoading = false;
          }
        });
  }

  clear() {
    this.date = '';
    this.dataLoading = true;
  }

  export() {
    this.exportAsXLSX();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.ticketsList, this.date);
  }

  back() {
    this.isTicketList = true;
  }

  displayMetric(value: any): string | number {
    if (value === null || value === undefined) {
      return '';
    }
    const num = Number(value);
    if (!Number.isNaN(num) && num === 0) {
      return '';
    }
    return value;
  }
}
