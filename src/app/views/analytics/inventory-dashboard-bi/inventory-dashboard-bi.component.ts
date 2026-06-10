import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory-dashboard-bi',
  templateUrl: './inventory-dashboard-bi.component.html',
  styleUrls: ['./inventory-dashboard-bi.component.scss', '../../../../scss/customstyle.css']
})
export class InventoryDashboardBiComponent implements OnInit {
  url = 'https://app.powerbi.com/view?r=eyJrIjoiZDVlYTg1YzEtNzlkZS00ZmQzLTllOTQtOGZjZTZmY2YzOTIwIiwidCI6IjQ0Mjk3MjFmLTA4NjQtNGFjNC05MjQ3LWM2YjVmZmQ2ZTBlYiJ9';
  urlSafe!: SafeResourceUrl;
  constructor(
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
