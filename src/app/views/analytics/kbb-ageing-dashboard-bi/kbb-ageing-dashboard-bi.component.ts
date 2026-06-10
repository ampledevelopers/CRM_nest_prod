import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-kbb-ageing-dashboard',
  templateUrl: './kbb-ageing-dashboard-bi.component.html',
  styleUrls: ['./kbb-ageing-dashboard-bi.component.scss', '../../../../scss/customstyle.css']
})
export class KbbAgeingDashboardBiComponent implements OnInit {
  url = 'https://app.powerbi.com/view?r=eyJrIjoiMDFkYWNhNWUtYmJmZC00MGJiLTlhNTgtMDg0NDAyOGM2NTMyIiwidCI6IjQ0Mjk3MjFmLTA4NjQtNGFjNC05MjQ3LWM2YjVmZmQ2ZTBlYiJ9';
  urlSafe!: SafeResourceUrl;
  constructor(
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}
