import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-svr-dashboard',
  templateUrl: './svr-dashboard-bi.component.html',
  styleUrls: ['./svr-dashboard-bi.component.scss', '../../../../scss/customstyle.css']
})
export class SvrDashboardBiComponent implements OnInit{
  url = 'https://app.powerbi.com/view?r=eyJrIjoiZTNkNzY4MTAtYzU1ZS00Y2E3LTlmMTUtNmM3ZTMzZTQwOTRmIiwidCI6IjQ0Mjk3MjFmLTA4NjQtNGFjNC05MjQ3LWM2YjVmZmQ2ZTBlYiJ9';
  urlSafe!: SafeResourceUrl;
  constructor(
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
