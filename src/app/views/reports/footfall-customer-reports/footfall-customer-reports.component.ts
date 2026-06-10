import { Component } from '@angular/core';

@Component({
    selector: 'app-footfall-customer-reports',
    templateUrl: './footfall-customer-reports.component.html',
    styleUrls: ['./footfall-customer-reports.component.scss'],
    standalone: false
})

export class FootfallCustomerReportsComponent {
  reports = [{label: 'Enquiry Report ', value: 'enquiry'},{label: 'Token Report', value: 'token'}, { label: 'Feedback Report', value: 'feedback'}];
  reportType = null;
}
