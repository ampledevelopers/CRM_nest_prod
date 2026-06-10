import { Component } from '@angular/core';

@Component({
    selector: 'app-bad-home-page',
    templateUrl: './bad-home-page.component.html',
    styleUrls: ['./bad-home-page.component.scss'],
    standalone: false
})
export class BADHomePageComponent {
  userRole = localStorage.getItem('userRole');
  reports: any= [];
  reportType = null;
  siteType = localStorage.getItem('siteType');
  constructor() {
    if(this.siteType === '2') {
      this.reports = [{label: 'iPhone Dashboard', value: 'iPhone'},{label: 'MAC Dashboard', value: 'MAC'}];
    } else {
      this.reports = [{label: 'iPhone Dashboard', value: 'iPhone'},{label: 'MAC Dashboard', value: 'MAC'}, {label: 'DL Dashboard', value: 'DL'}];
    }
  }
  onSelect(value: any) {
    localStorage.setItem('product_type', value);
  }
}
