import { Component } from '@angular/core';

@Component({
    selector: 'app-compliance-reports',
    templateUrl: './compliance-reports.component.html',
    styleUrls: ['./compliance-reports.component.scss'],
    standalone: false
})
export class ComplianceReportsComponent {
  reports: any = [];
  reportType = null;
  userRole = localStorage.getItem('userRole');

  constructor() {
    if(this.userRole === '2' || this.userRole === '3') {
      this.reports = [{label: 'Repair-Deviation Report ', value: 'repairdeviationfraudreport'},{label: 'Ageing Ticket for SMS Report', value: 'ageingTicketForSMS'}, { label: 'GSX Product Lookup Report', value: 'GSXproductLookup'}, {label:	'Atlas certification', value: 'atlas'}, {label: 'Menu Log Report ', value: 'menuLog'}];
    } else {
      this.reports = [{label: 'Ageing Ticket for SMS Report', value: 'ageingTicketForSMS'}, { label: 'GSX Product Lookup Report', value: 'GSXproductLookup'}, {label:	'Atlas certification', value: 'atlas'}, {label: 'Menu Log Report ', value: 'menuLog'}];
    }
  }
}
