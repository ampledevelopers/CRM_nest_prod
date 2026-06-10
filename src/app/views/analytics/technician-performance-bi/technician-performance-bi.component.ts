import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {ExcelService} from '../excel.service';

@Component({
  selector: 'app-daily-dashboard-bi',
  templateUrl: './technician-performance-bi.component.html',
  styleUrls: ['./technician-performance-bi.component.scss', '../../../../scss/customstyle.css']
})
export class TechnicianPerformanceBiComponent implements OnInit {
  @Input()
  url = 'https://app.powerbi.com/view?r=eyJrIjoiMTI4ODk5NWMtMDNmZC00MDhjLWEzNDctY2ZjZjYxZmNlMDYzIiwidCI6IjQ0Mjk3MjFmLTA4NjQtNGFjNC05MjQ3LWM2YjVmZmQ2ZTBlYiJ9';
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
