import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {ExcelService} from '../excel.service';

@Component({
  selector: 'app-daily-dashboard-bi',
  templateUrl: './daily-dashboard-bi.component.html',
  styleUrls: ['./daily-dashboard-bi.component.scss', '../../../../scss/customstyle.css']
})
export class DailyDashboardBiComponent implements OnInit {
  @Input()
  url = 'https://app.powerbi.com/view?r=eyJrIjoiNmMwNjJiMDQtNDYwMy00Zjg4LWFjZGMtMjBjNTgyNTAwOGI2IiwidCI6IjQ0Mjk3MjFmLTA4NjQtNGFjNC05MjQ3LWM2YjVmZmQ2ZTBlYiJ9&pageName=ReportSection';
  urlSafe!: SafeResourceUrl;
  constructor(
    private excelService: ExcelService,
    public sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}
