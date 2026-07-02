import { Component, TemplateRef } from '@angular/core';
import { RelocateEnggService } from './relocate-engg.service';
import * as _ from 'lodash';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface SimpleAlert {
  title: any;
  msg: any;
}

export interface ConfirmAlert {
  id: any;
  title: any;
  msg: any;
}

@Component({
    selector: 'app-relocate-engg',
    templateUrl: './relocate-engg.component.html',
    styleUrls: ['./relocate-engg.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class RelocateEnggComponent {
  error: any;
  empId = '';
  bcolor = false;
  loading = true;
  buttonSpin = false;
  rlError = '';
  isProfile = false;
  profile: any = [];
  enableOptions = true;
  serviceTypeList: any = [];
  branchListTemp: any = [];
  branchList: any = [];
  userRoleListTemp: any = [];
  userRoleList: any = [];
  serviceType = 'Select Service Type';
  branch = 'Select Branch';
  userRole = 'Select User Role';
  exLocation = '';
  //modalRef!: BsModalRef;
  newServiceType = '';
  newBranchID = '';
  newBranchCode = '';
  newUserRole = '';
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  confirmAlert: ConfirmAlert = {id: '', title: '', msg: ''};
  loggedinUserID: any = '';
  loggedinUserRole: any = '';
  newBranchType = '';
  newShipTo = '';
  dropLocationFlag = '';
  constructor(private config: NgbModalConfig, public dataService: RelocateEnggService,  private modalService: NgbModal,
    public userService: UserService, private router: Router) {
    this.loggedinUserID = localStorage.getItem('userId');
    this.loggedinUserRole = localStorage.getItem('userRole');
    this.getOptions();
  }

  openModal(templat: TemplateRef<any>) {
   this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }


  getOptions() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
            result = data;
            this.branchListTemp = result.branch;
            this.serviceTypeList = result.sitetype;
            this.userRoleListTemp = result.role;
            this.loading = false;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  selectLocation(branchId: any) {
    for (let i = 0; i < this.branchList.length; i++) {
      if (branchId === this.branchList[i].id) {
        this.newBranchCode = this.branchList[i].branch_code;
        this.newBranchID = this.branchList[i].id;
        this.newBranchType = this.branchList[i].branch_type;
        this.newShipTo = this.branchList[i].ship_to;
        this.dropLocationFlag = this.branchList[i].drop_location_flag;
        break;
      }
    }
  }

  selectServiceType (event: string) {
    this.newUserRole = '';
    this.newServiceType = event;
    if (event === '1') {
      this.branchList = _.filter(this.branchListTemp, row => (row.branch_type.indexOf('I') && row.branch_type.indexOf('A') && row.branch_type.indexOf('D')) > -1);
      this.userRoleList = _.filter(this.userRoleListTemp, row => row.site_type_id.indexOf(event) > -1);
    } else {
      this.branchList = _.filter(this.branchListTemp, row => row.branch_type.indexOf('O') > -1);
      this.userRoleList = _.filter(this.userRoleListTemp, row => row.site_type_id.indexOf(event) > -1);
    }
  }

  selectUserRole (event: string) {
    this.newUserRole = event;
  }

  callCheckEnggAPI() {
    let result;
    this.dataService.chechEngg(this.empId)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.profile = result.profile;
              this.isProfile = true;
              this.enableOptions = false;
              this.rlError = '';
              for (let i = 0; i < this.branchList.length; i++) {
                if (this.profile.branch_code === this.branchList[i].branch_code) {
                  this.profile.branch_code = this.branchList[i].label;
                }
              }
              this.userRoleList = this.userRoleListTemp.filter((item: { site_type_id: any; }) => item.site_type_id === this.profile.site_type_id);
            } else {
              this.isProfile = false;
              this.rlError = result.message;
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  chechEngg(event: { keyCode: number; }) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      if (this.empId !== '') {
        this.bcolor = false;
        if ((this.loggedinUserRole === '3') || (this.loggedinUserRole === '8') || (this.loggedinUserRole === '2') || (this.loggedinUserRole === '6')) {
          this.callCheckEnggAPI();
        } else {
          if (this.empId === this.loggedinUserID) {
            this.callCheckEnggAPI();
          } else {
            this.isProfile = false;
            this.rlError = "You cannot Re-locate other's Location";
          }
        }
      } else {
        this.bcolor = true;
      }
    }
  }

  relocate(confirm_alert_temp: TemplateRef<any>) {
    let userRole = true;
    if (this.empId === '') {
      this.bcolor = true;
    }
    if (this.newBranchCode === '' && this.newBranchID === '' && this.newServiceType === '' && this.newUserRole === '') {
      this.rlError = 'Select atleast any one';
    } else {
      this.rlError = '';
    }

    if ((this.newServiceType !== '') && (this.profile.site_tye_id !== this.newServiceType)) {
      for (let i = 0; i < this.userRoleList.length; i++) {
        if (this.newUserRole === this.userRoleList[i].id) {
          userRole = true;
          this.rlError = '';
          break;
          } else {
            userRole = false;
            userRole = false;
            this.rlError = 'Select the Respective User Role';
        }
      }
    } else {
     userRole = true;
    }
    if ((this.bcolor === false) && (this.rlError === '') && (userRole === true)) {
      const selectedBranch = this.branchList.find((b: { id: any }) => b.id === this.branch || b.id === this.newBranchID);
      const selectedRole = this.userRoleList.find((r: { id: any }) => r.id === this.newUserRole || r.id === this.userRole);
      const branchName = selectedBranch?.label || this.branch;
      const roleName = selectedRole?.label || this.userRole;
      const msg = `Are you sure you want to relocate Emp ID: ${this.empId} to Branch: ${branchName} with Role: ${roleName}?`;
      this.confirmAlert = {id: 'relocate', title: 'Re-Locate Engineer', msg: msg};
      this.openModal(confirm_alert_temp);
    }
  }

  confirmreLocation(id: any, simple_alert_temp: TemplateRef<any>) {
    this.modalService.dismissAll();
    let result;
    this.dataService.relocateUser(this.newBranchCode, this.newBranchID, this.newServiceType, this.newUserRole, this.empId)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              if ((this.empId === this.loggedinUserID) && (this.loggedinUserRole !== '3')) {
                // this.signOut();
                localStorage.setItem('branchCode', this.newBranchCode);
                localStorage.setItem('branchType', this.newBranchType);
                localStorage.setItem('shipTo', this.newShipTo);
                localStorage.setItem('drop_location_flag', this.dropLocationFlag);
                this.simpleAlert = {title: 'Re-Locate Engineer', msg: result.message};
                this.openModal(simple_alert_temp);
              } else {
                this.signOut();
              }
              this.empId = '';
              this.isProfile = false;
              this.serviceType = 'Select Service Type';
              this.branch = 'Select Branch';
              this.userRole = 'Select User Role';
            }

            if (result.status === false) {
              this.isProfile = false;
              this.simpleAlert = {title: 'Re-Locate Engineer', msg: result.message};
              this.openModal(simple_alert_temp);
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  signOut() {
    this.userService.logoutGSX().subscribe({ next: (data: any) => {
     },
     error: (error: HttpErrorResponse) => {
         // console.log(HttpErrorResponse);
     }});
     const rooturl: any = localStorage.getItem('rootUrl');
     localStorage.clear();
     localStorage.setItem('rootUrl', rooturl);
     this.router.navigate(['login']);
  }

}
