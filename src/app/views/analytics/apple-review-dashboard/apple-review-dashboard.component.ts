import { Component } from '@angular/core';
import { AppleReviewDashboardService } from './apple-review-dashboard.service';

@Component({
    selector: 'app-apple-review-dashboard',
    templateUrl: './apple-review-dashboard.component.html',
    styleUrls: ['./apple-review-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})

export class AppleReviewDashboardComponent {
  dashboard = [{ label: 'CSAT Dashboard ', value: 'CSAT Dashboard' }, { label: 'Footfall Dashboard', value: 'Footfall Dashboard' }, { label: 'Repairs Dashboard', value: 'Repairs Dashboard' }];
  csatDashboard = [{ label: 'CSAT Period Dashboard ', value: 'CSAT Period Dashboard' }, { label: 'CSAT Weekly Trend Dashboard', value: 'CSAT Weekly Trend Dashboard' },
  { label: 'DSAT Findings Dashboard', value: 'DSAT Findings Dashboard' }];
  repairsDashboard = [{ label: 'Repairs Coverage Dashboard', value: 'Repairs Coverage Dashboard'}, {label: 'Quality Program Dashboard', value: 'Quality Program Dashboard'}, {label: 'Product Repairs Dashboard', value: 'Product Repairs Dashboard'}]
  dashboardType = null;
  subDashboardType = null;
  showSubDashboard = false;
  dashboardFilter: any = '';

  constructor(public dataService: AppleReviewDashboardService){}

  onChange(dashboard: any) {
    this.dashboardFilter = '';
    this.subDashboardType = null;
    this.showSubDashboard = false;
    if (dashboard === 'CSAT Dashboard') {
      this.showSubDashboard = true;
      this.dashboardFilter = this.csatDashboard;
    } else if(dashboard === 'Footfall Dashboard'){
      this.showSubDashboard = false;
    }else if(dashboard === 'Repairs Dashboard'){
      this.dashboardFilter = this.repairsDashboard;
      this.showSubDashboard = true;
    }
    else {
      this.showSubDashboard = false;
    }
  }

}

