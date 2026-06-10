import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {TechnicianDashboardService} from './technician-dashboard.service';
@Component({
    selector: 'app-technician-dashboard',
    templateUrl: './technician-dashboard.component.html',
    styleUrls: ['./technician-dashboard.component.scss', '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
        '../../../../scss/vendors/ng-select/ng-select.scss', '../../../../scss/customstyle.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TechnicianDashboardComponent {
  loading = false;
  myDateValue!: Date;
  bsValue: Date = new Date();
  bsRangeValue: any = [];
  modelDate: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig> ;
  date: Date = new Date();
  name = 'World';
  html: any;
  fromDate: any;
  toDate: any;
  branchId: any;
  techId: any;
  data: any = [];
  bin: any = [];
  emp: any = [];
  iphone_mt: any = [];
  iphone_lb: any = [];
  iphone_cb: any = [];
  iphone_lt: any = [];
  mac_mt: any = [];
  mac_lb: any = [];
  mac_cb: any = [];
  mac_lt: any = [];
  watch_mt: any = [];
  watch_lb: any = [];
  watch_cb: any = [];
  watch_lt: any = [];
  ipad_mt: any = [];
  ipad_lb: any = [];
  ipad_cb: any = [];
  ipad_lt: any = [];
  my_basket_repairs: any = [];
  prod_mt: any = [];
  prod_la: any = [];
  prod_ca: any = [];
  prod_lb: any = [];
  prod_cb: any = [];
  prod_lt: any = [];
  dashboard_data: any = [];
  alert: any;
  error: any ;
  branches: any = [];
  dashboardName = 'TechDashboard';
  branch = 'Select Branch Name';
  location_emp = 'Select Team member in Location';
  location_users: any = [];
  userRole: any;

  constructor(sanitizer: DomSanitizer,
    public dataService: TechnicianDashboardService) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
    this.bsConfig = Object.assign({}, { showWeekNumbers: true }, {showOnFocus: false});
    this.getBranches();
    this.getTechnicianDashboard();
    this.onPopover();
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole === '2') {
      this.getTeamleadLocusers();
    }
  }

  onPopover() {
    let result;
    this.dataService.getLegends(this.dashboardName)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              const legends = result.legends;
              for (let i = 0; i < legends.length; i++) {
                this.html = this.html + '<span>' + legends[i].keyword + '&nbsp;' + '-' + '&nbsp;' + legends[i].legend + '</span><br/>';
              }
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  // onPopover() {
  //   this.html = `<p>MT - My Total </p>
  //   <p>LA - Location Average</p>
  //   <p>CA - Company Average</p>
  //   <p>LB - Location Best</p>
  //   <p>CB - Company Best</p>
  //   <p>LT - Location Total</p>
  //   <p>YD - Yet To Diagnose</p>
  //   <p>UD - Under Diagnosis</p>
  //   <p>AC - Awaiting Customer</p>
  //   <p>SO - Spares Ordered</p>
  //   <p>PA - Parts Awaiting</p>
  //   <p>PR - Parts Received</p>
  //   <p>RC - Repair Complete</p>
  //   <p>SR - Service report Generated</p>
  //   `;
  // }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };

    container.setViewMode('month');
   }

   getCalendar() {

   }

   getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.branches = result.branch;
            }
        }, // success path
        error: error => this.error = error // error path
   });
  }

  getLocationusers(id: any) {
    let result;
    this.dataService.getLocationusers(id)
      .subscribe({
        next: (data: any) => {
            result = data;
              this.location_users = result.locationusers;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  getTeamleadLocusers() {
    let result;
    this.dataService.getTeamleadLocusers()
      .subscribe({
        next: (data: any) => {
            result = data;
              this.location_users = result.status;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  branchSelect(selected_branchId: any) {
    this.branchId = selected_branchId;
    if (this.branchId !== 'Select Branch Name') {
      this.getLocationusers(this.branchId);
    } else {
      this.location_users = [];
    }
   }

   location_empSelect(event: any) {
    this.techId = event;
   }

   load() {

     if (this.branchId !== '' && this.techId === '') {
      alert('Please select the Location User');
     return;
    } else if (this.fromDate === '') {
     alert('Please select the From Date');
     return;
   } else if (this.toDate === '') {
     alert('Please select the To Date');
     return;
   } else {
     this.getTechnicianDashboard();
   }
   }

   getTechnicianDashboard() {
    let result;
    this.dataService.getTechnicianDashboard(this.fromDate, this.toDate, this.branchId, this.techId)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true )  {
              this.dashboard_data = result.data;
              this.bin = this.dashboard_data.bin_data;
              this.emp = this.dashboard_data.emp_data;
              this.iphone_mt = this.dashboard_data.iphone_mt;
              this.iphone_lb = this.dashboard_data.iphone_lb;
              this.iphone_cb = this.dashboard_data.iphone_cb;
              this.iphone_lt = this.dashboard_data.iphone_lt;
              this.mac_mt = this.dashboard_data.mac_mt;
              this.mac_lb = this.dashboard_data.mac_lb;
              this.mac_cb = this.dashboard_data.mac_cb;
              this.mac_lt = this.dashboard_data.mac_lt;
              this.watch_mt = this.dashboard_data.watch_mt;
              this.watch_lb = this.dashboard_data.watch_lb;
              this.watch_cb = this.dashboard_data.watch_cb;
              this.watch_lt = this.dashboard_data.watch_lt;
              this.ipad_mt = this.dashboard_data.ipad_mt;
              this.ipad_lb = this.dashboard_data.ipad_lb;
              this.ipad_cb = this.dashboard_data.ipad_cb;
              this.ipad_lt = this.dashboard_data.ipad_lt;
              this.my_basket_repairs = this.dashboard_data.my_active_repairs;
              this.prod_mt = this.dashboard_data.prod_mt;
              this.prod_la = this.dashboard_data.prod_la;
              this.prod_ca = this.dashboard_data.prod_ca;
              this.prod_lb = this.dashboard_data.prod_lb;
              this.prod_cb = this.dashboard_data.prod_cb;
              this.prod_lt = this.dashboard_data.prod_lt;
              } else {
                this.alert = 'No Records Found';
              }
}, // success path
error: error => this.error = error // error path
   });
   }
   clear() {
    this.fromDate = '';
    this.toDate = '';
    this.branchId = '';
    this.techId = '';
    this.branch = 'Select Branch Name';
    this.location_emp = 'Select Team member in Location';
    }

}
