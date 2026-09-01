import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnsiteDcService } from '../onsite-dc.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
    selector: 'app-onsite-dc-approve',
    templateUrl: './onsite-dc-approve.component.html',
    styleUrls: ['./onsite-dc-approve.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class OnsiteDcApproveComponent implements OnInit {
  loading = true;
  buttonSpin = false;
  bcolor = false;
  status = '';
  ticketSearch = '';
  dcSearch = '';
  showList = false;
  dcList: any = [];
  ticketKbb: any = [];
  data: any = [];
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  userRole = localStorage.getItem('userRole');
  isApprover: any;
  isView = true;
  viewdcNo = '';
  notfilled = false;
  constructor(public dataService: OnsiteDcService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    if ((this.userRole === '6') || (this.userRole === '8')) {
      this.isApprover = true;
      this.getKbbList('', '', 'N');
      this.isView = false;
      this.status = '2';
    } else {
      this.isApprover = false;
      this.isView = true;
      this.getKbbList('', '', 'A');
      this.status = '1';
    }
  }

  openModal(templat: any) {
 this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getKbbList(dc: any, ticket: any, status: any) {
    let result: any;
    const ewayList: any = [];
      this.dataService.getDcList(dc, ticket, status)
          .subscribe(
            (data) => {
                result = data;
                this.buttonSpin = false;
                if (result.status === true) {
                  this.loading = false;
                  this.data = result.dc.hd;
                  if (ticket !== '') {
                    if (this.userRole === '15') {
                      for (let i = 0; i < this.data.length; i++) {
                        if (parseInt(this.data[i].total_value) >= 50000) {
                          ewayList.push(this.data[i]);
                        }
                      }
                      if (ewayList.length !== 0) {
                        this.data = ewayList;
                        this.ticketKbb = this.data;
                        this.showList = true;
                      } else {
                        this.showList = false;
                      }
                    } else {
                      this.ticketKbb = this.data;
                      this.showList = true;
                    }
                  } else {
                    if (this.userRole === '15') {
                      for (let i = 0; i < this.data.length; i++) {
                        if (parseInt(this.data[i].total_value) >= 50000) {
                          ewayList.push(this.data[i]);
                        }
                      }
                      if (ewayList.length !== 0) {
                        this.data = ewayList;
                        this.dcList = this.data;
                        this.showList = true;
                      } else {
                        this.showList = false;
                      }
                    } else {
                      this.dcList = this.data;
                      this.showList = true;
                    }
                  }
                } else {
                  alert(result.message);
                  this.loading = false;
                  this.showList = false;
                }
      });
  }

  searchNrdc(event: any) {
    let nrdcData: any;
    this.ticketSearch = '';
    if (event.keyCode === 8) {
      this.dcSearch = '';
      this.data = this.dcList;
    }
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      for (let i = 0; i < this.dcList.length; i++) {
        nrdcData = _.filter(this.dcList, row => row.id.toLowerCase().indexOf(this.dcSearch) > -1);
      }
      this.data = nrdcData;
    }
  }

  searchTicket(event: any) {
    this.dcSearch = '';
    if (event.keyCode === 8) {
      this.ticketSearch = '';
      this.data = [];
      if (this.status === '1') {
        this.getKbbList('', '', 'A');
      } else {
        this.getKbbList('', '', 'N');
      }
    }
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.getKbbList('', this.ticketSearch, '');
    }
  }

  statusChange(event: any) {
    this.data = [];
    if (event === '1') {
      this.getKbbList('', '', 'A');
      this.isView = true;
    } else {
      this.getKbbList('', '', 'N');
      this.isView = false;
    }
  }

  goToForm(dcNo: any) {
    localStorage.setItem('dcNo', dcNo);
    this.router.navigate(['dc/dc-form'], { queryParams: {from: 'approver'}});
  }

  viewKbb(dcNo: any, view_alert_temp: TemplateRef<any>) {
    this.viewdcNo = dcNo;
    this.openModal(view_alert_temp);
  }

  printNrdc() {
    this.modalService.dismissAll();
    const url = localStorage.getItem('nestUrl') + 'mis/print?X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + this.viewdcNo + '&user_id=' + localStorage.getItem('userId');
    const tab = window.open(url);
  }
  dcSortDirection: 'asc' | 'desc' = 'asc';

sortByDCNo() {
  this.data.sort((a: any, b : any) => {
    const valA = parseInt(a.id);
    const valB = parseInt(b.id);
    return this.dcSortDirection === 'asc' ? valA - valB : valB - valA;
  });
  this.dcSortDirection = this.dcSortDirection === 'asc' ? 'desc' : 'asc';
}

}
