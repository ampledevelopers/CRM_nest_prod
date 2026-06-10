import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateService } from './user-create.service';
import * as _ from 'lodash';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SmartTablesModule } from '../smart-tables/smart-tables.module';

import { TableModule } from '@coreui/angular-pro';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss', '../../../scss/customstyle.css'],
 
  standalone:false
})
export class UserCreateComponent {
  error: any;
  empId = '';
  userName = '';
  mobile = '';
  email = '';
  password = '';
  groupSearch = '';
  locationSearch = '';
  nameSearch = '';
  bcolor = false;
  loading = true;
  buttonSpin = false;
  rlError = '';
  isProfile = false;
  profile: any = [];
  enableOptions = true;
  serviceTypeList: any = [];
  branchList: any = [];
  userRoleListTemp: any = [];
  userRoleList: any = [];
  serviceType = 'Select Service Type';
  branch = 'Select Branch';
  userRole = 'Select User Role';
  status = 'Select Status';
  exLocation = '';
  newServiceType = '';
  newBranchID = '';
  newBranchCode = '';
  newUserRole = '';
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  data: any = [];
  userType: any = 'F';
  isManager = true;
  loginUserRole = localStorage.getItem('userRole');
  siteType = localStorage.getItem('siteType');
  branchType = localStorage.getItem('branchType');
  attendanceStatus = 'Absent';
  selectedEmpId = '';
  LICNewStatus = '';
  scolor = false;
  dtData: any = []; //, 'status'
  columns = ['emp_id', 'user_name', 'branch_code', 'mobile', 'email', 'site_type_id','status',
    {
      key: 'action',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ];
  userRoleType = '';
  constructor(private config: NgbModalConfig, public dataService: UserCreateService, private modalService: NgbModal) {
    this.getOptions();
    if ((this.loginUserRole === '3') || (this.loginUserRole === '8') || (this.loginUserRole === '17') || (this.loginUserRole === '16')) {
      this.isManager = true;
      this.getUsers();
    } else {
      this.isManager = false;
    }

    if (this.loginUserRole === '2') {
      this.getAllLIC();
    }


  }
  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  getUsers() {
    let result: any = [];
    this.dataService.getUsers()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.loading = false;
          this.data = result.users;
          this.dtData = [...this.data];
          if (this.siteType === '2') {
            this.data = _.filter(this.data, row => row.site_type_id.indexOf('2') > -1);
            this.dtData=this.data;
          }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  getAllLIC() {
    let result: any = [];
    this.dataService.getLICUsers()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.loading = false;
          this.data = result.users;
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].status === '1') {
              this.data[i].attendanceStatus = 'Absent';
              this.data[i].scolor = false;
            } else {
              this.data[i].attendanceStatus = 'Present';
              this.data[i].scolor = true;
            }
          }
          this.dtData = this.data;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  getOptions() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.branchList = result.branch;
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
        break;
      }
    }
  }

  selectServiceType(event: string) {
    this.newUserRole = '';
    this.newServiceType = event;
    if (event === '1') {
      this.branchList = _.filter(this.branchList, row => (row.branch_type.indexOf('I') && row.branch_type.indexOf('A') && row.branch_type.indexOf('D')) > -1);
    } else if (event === '2') {
      this.branchList = _.filter(this.branchList, row => row.branch_type.indexOf('O') > -1);
    }

    if (this.newServiceType === '2') {
      let list1:any =  this.userRoleListTemp.filter((x: any) => x.site_type_id === '2');
      let list2: any =  this.userRoleListTemp.filter((x: any) => x.site_type_id === '3');
      this.userRoleList = list1.concat(list2);
    } else {
      this.userRoleList =  this.userRoleListTemp.filter((file: { site_type_id: string; }) => file.site_type_id === '1');
    }
  }

  selectUserRole(event: string) {
    this.newUserRole = event;
  }

  checkUser(event: { keyCode: number; }) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      if (this.empId !== '') {
        this.bcolor = false;
        let result;
        this.dataService.checkUser(this.empId)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.userName = result.profile.user_name;
                this.mobile = result.profile.mobile;
                this.email = result.profile.email;
                this.serviceType = result.profile.site_tye_id;
                this.newServiceType = result.profile.site_tye_id;
                this.branch = result.profile.branch_id;
                this.userRole = result.profile.group_id;
                this.status = result.profile.status;
                this.userType = result.profile.technician_type;
                this.isProfile = true;
                if (this.loginUserRole === '18') {
                  if (this.userRole === '26') {
                    this.userRoleType = 'C';
                  } else {
                    this.userRoleType = 'T';
                  }
                }
              } else {
                this.isProfile = false;
                this.rlError = result.message;
              }
            }, // success path
            error: error => this.error = error // error path
      });
      } else {
        this.bcolor = true;
      }
    }
  }

  loadUser(item: string) {
     this.empId = item;
      if (this.empId !== '') {
        this.bcolor = false;
        let result;
        this.dataService.checkUser(this.empId)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.userName = result.profile.user_name;
                this.mobile = result.profile.mobile;
                this.email = result.profile.email;
                this.serviceType = result.profile.site_tye_id;
                this.branch = result.profile.branch_id;
                this.userRole = result.profile.group_id;
                this.status = result.profile.status;
                this.isProfile = true;
                if (this.loginUserRole === '18') {
                  if (this.userRole === '26') {
                    this.userRoleType = 'C';
                  } else {
                    this.userRoleType = 'T';
                  }
                }
              } else {
                this.isProfile = false;
                this.rlError = result.message;
              }
            }, // success path
            error: error => this.error = error // error path
      });
      } else {
        this.bcolor = true;
      }
  }

  createUser() {
    let result: any;
    if (this.empId === '') {
      alert('Employee ID is required');
      return;
    }
    if (this.userName === '') {
      alert('User Name  is required');
      return;
    }
    if (this.mobile === '') {
      alert('Mobile is required');
      return;
    }
    if (this.serviceType === 'Select Service Type') {
      alert('Site type is required');
      return;
    }
    if (this.branch === 'Select Branch') {
      alert('Branch is required');
      return;
    }
    if (this.userRole === 'Select User Role') {
      alert('User Role required');
      return;
    }
    if (this.mobile === '') {
      alert('Mobile is required');
      return;
    }
    if (this.email === '') {
      alert('Email is required');
      return;
    }
    if (this.status === 'Select Status') {
      alert('Status is required');
      return;
    }

    this.dataService.createUser(this.empId, this.userName, this.mobile,
      this.serviceType, this.branch, this.userRole, this.status, this.email, this.userType)
      .subscribe({
        next: (data) => {
          result = data;
          if (result.status === true) {
            alert('User has been created');
            this.clear();
            return;
          } else {
            alert('User creation failed ' + result.message);
            return;
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  updateUser() {
    let result: any;
    if (this.empId === '') {
      alert('Employee ID is required');
      return;
    }
    if (this.userName === '') {
      alert('User Name  is required');
      return;
    }
    if (this.mobile === '') {
      alert('Mobile is required');
      return;
    }
    if (this.serviceType === 'Select Service Type') {
      alert('Site type is required');
      return;
    }
    if (this.branch === 'Select Branch') {
      alert('Branch is required');
      return;
    }
    if (this.userRole === 'Select User Role') {
      alert('User Role required');
      return;
    }
    if (this.mobile === '') {
      alert('Mobile is required');
      return;
    }
    if (this.email === '') {
      alert('Email is required');
      return;
    }
    if (this.status === 'Select Status') {
      alert('Status is required');
      return;
    }

    if (this.loginUserRole === '18') {
      if (this.userRoleType === 'C') {
        this.userRole = '26';
      } else {
        this.userRole = '4';
      }
    }

    this.dataService.updateUser(this.empId, this.userName, this.mobile,
      this.serviceType, this.branch, this.userRole, this.status, this.email, this.userType)
      .subscribe({
        next: (data) => {
          result = data;
          if (result.status === true) {
            alert('User details has been updated');
            this.clear();
            return;
          } else {
            alert('User creation failed ' + result.message);
            return;
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  clear() {
    this.empId = '';
    this.serviceType = 'Select Service Type';
    this.branch = 'Select Branch';
    this.userRole = 'Select User Role';
    this.status = 'Select Status';
    this.userName = '';
    this.email = '';
    this.mobile = '';
    this.isProfile = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  updateLICPresents(empId: string, status: string, confirm_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.selectedEmpId = empId;
    if (status === 'Absent') {
      this.LICNewStatus = 'A';
    } else {
      this.LICNewStatus = 'P';
    }
    this.openModal(confirm_alert_temp);
  }

  confirmLICStatus() {
    let result: any = [];
    this.dataService.updateLICAttentance(this.selectedEmpId, this.LICNewStatus)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (this.LICNewStatus === 'A') {
              this.modalService.dismissAll();
              alert('LIC Status has been Updated. The New LIC is ' + result.supervisor_user_name);
            } else {
              this.modalService.dismissAll();
              alert(result.message);
            }
            this.getAllLIC();
          } else {
            this.modalService.dismissAll();
            alert(result.message);
          }
        }, // success path
        error: error => this.error = error // error path
  });
  }

searchGroupid(id: any){
  if  (id !== '') {
    this.dtData = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].group_id === id) {
        this.dtData.push(this.data[i]);
      }

    }
  }
  else{
    this.dtData=this.data;
  }
  }
}

