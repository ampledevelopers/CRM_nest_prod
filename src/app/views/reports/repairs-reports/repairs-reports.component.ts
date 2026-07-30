import { Component } from '@angular/core';

@Component({
    selector: 'app-repairs-reports',
    templateUrl: './repairs-reports.component.html',
    styleUrls: ['./repairs-reports.component.scss'],
    standalone: false
})
export class RepairsReportsComponent {
  userRole = localStorage.getItem('userRole');
  reports: any= [];
  reportType = null;
  constructor() {
    if(this.userRole === '9' || this.userRole === '16' || this.userRole === '17') {
      this.reports = [{label: 'Status Report', value: 'status'}];
    } else {
      this.reports = [{label: 'Repair Report ', value: 'repair'},{label: 'Status Report', value: 'status'}, { label: 'SVR Report', value: 'svr'}, {label:	'Accessory Enquiry Report', value: 'accessory'}, {label: 'POP Validated Report', value: 'popvalidated'}];
    }
  }
}
