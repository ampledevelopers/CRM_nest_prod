import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ExcelService } from '../analytics/excel.service';
import { AdhesiveMasterService } from './adhesive-master.service';

@Component({
    selector: 'app-adhesive-master',
    templateUrl: './adhesive-master.component.html',
    styleUrls: ['./adhesive-master.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class AdhesiveMasterComponent {

  loading = false;
  adhesives: any = [];
  adhesivesList: any = [];
  unblockAdhesiveNo: any;
  inactiveAdhesiveNo: any;
  partSearch = '';
  adhesiveTemp: any = [];
  userRole: any;
  branch = localStorage.getItem('branchCode');
  userId = localStorage.getItem('userId');
  noData = false;
  enableGnum = false;
  adhesiveInactiveRemark = '';
  notfilled = false;

  constructor(private dataService: AdhesiveMasterService, private modalService: NgbModal, public excelService: ExcelService) {
    this.userRole = localStorage.getItem('userRole');
    this.getAdhesives();
  }

  searchPart(event: { target: { value: string; }; }) {
    let word: any = event.target.value.toLowerCase();
    word = word.replace(/\s/g, '');
    let searchedParts: any = [];

    if ((this.partSearch !== '') && (this.partSearch !== '<empty string>')) {
      for (let i = 0; i < this.adhesives.length; i++) {
        if (!isNaN(word)) {
          searchedParts = _.filter(this.adhesiveTemp, row => row.asn_no.toLowerCase().indexOf(word) > -1);
        } else {
          searchedParts = _.filter(this.adhesiveTemp, row => row.part_no.toLowerCase().indexOf(word) > -1);
        }
      }
      this.adhesivesList = searchedParts;
    } else {
      this.adhesivesList = this.adhesiveTemp;
    }
  }

  statusChange(event: any) {
    this.enableGnum = false;
    this.adhesiveTemp = [];
    if (event === '4') {
      this.adhesiveTemp = this.adhesives;
      this.enableGnum = true;
    } else if (event === '2') {
      this.adhesiveTemp = this.adhesives.filter((data: any) => {
        return data.status === 'Blocked';
      });
    } else if (event === '3') {
      this.adhesiveTemp = this.adhesives.filter((data: any) => {
        return data.status === 'Issued';
      });
      this.enableGnum = true;
    } else {
      this.adhesiveTemp = this.adhesives.filter((data: any) => {
        return data.status === 'Active';
      });
    }
    this.adhesivesList = this.adhesiveTemp;
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  getAdhesives() {
    this.loading = true;
    this.noData = false;
    let result;
    this.dataService.getAdhesiveList()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.adhesives = result.items;
            for (let i = 0; i < this.adhesives.length; i++) {
              if (this.adhesives[i].status === 'A') {
                this.adhesives[i].status = 'Active';
              } else if (this.adhesives[i].status === 'U') {
                this.adhesives[i].status = 'In-Use';
              } else if (this.adhesives[i].status === 'B') {
                this.adhesives[i].status = 'Blocked';
              } else if (this.adhesives[i].status === 'R') {
                this.adhesives[i].status = 'Returned';
              } else if (this.adhesives[i].status === 'I') {
                this.adhesives[i].status = 'Issued';
              }
            }
            this.loading = false;
            this.statusChange('1');
          } else {
            this.loading = false;
            this.noData = true;
          }
        }, // success path
        error: (error: any) => error = error // error path
      });
  }

  unblockAdhesive(asnId: string, confirm_alert: TemplateRef<any>) {
    this.unblockAdhesiveNo = asnId;
    this.openModal(confirm_alert);
  }

  inactiveAdhesive(asnId: string, confirm_alert: TemplateRef<any>) {
    this.inactiveAdhesiveNo = asnId;
    this.openModal(confirm_alert);
  }

  confirm() {
    let result: any;
    this.dataService.unBlockAdhesive(this.unblockAdhesiveNo)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.getAdhesives();
          } else {
            this.modalService.dismissAll();
            alert(result.message);
          }
        },
        error: (error: any) => error = error
      });
  }

  confirmInactive() {
    if(this.adhesiveInactiveRemark === '' ) {
      this.notfilled = true;
      return;
    }
    let result: any;
    this.dataService.inactiveAdhesives(this.inactiveAdhesiveNo, this.adhesiveInactiveRemark)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this. cancelModel();
            this.getAdhesives();
          } else {
            this.cancelModel();
            alert(result.message);
          }
        },
        error: (error: any) => error = error
      });
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.adhesiveInactiveRemark = '';
    this.notfilled = false;
  }

  exportAsXLSX(): void {
    let exportData: any = [];
    for (let i = 0; i < this.adhesivesList.length; i++) {
      exportData.push({
        asn_no: this.adhesivesList[i].asn_no,
        erp_asn: this.adhesivesList[i].erp_asn,
        stock_type: this.adhesivesList[i].stock_type,
        part_no: this.adhesivesList[i].part_no,
        description: this.adhesivesList[i].description,
        product_model: this.adhesivesList[i].product_model,
        blocked_ticket_id: this.adhesivesList[i].blocked_ticket_id,
        issued_ticket_id: this.adhesivesList[i].issued_ticket_id,
        g_number: this.adhesivesList[i].g_number,
        issued_date: this.adhesivesList[i].issued_date,
        status: this.adhesivesList[i].status,
        coverage_status_description: this.adhesivesList[i].coverage_status_description
      })
    }
    this.excelService.exportAsExcelFile(exportData, 'Adhesives');
  }

}
