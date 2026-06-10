import { Component, ViewEncapsulation, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TatReportService } from './tat-report.service';

@Component({
    selector: 'app-tat-report',
    templateUrl: './tat-report.component.html',
    styleUrls: ['./tat-report.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class TatReportComponent {
  loading = true;
  buttonSpin = false;
  html: any = '' ;
  html1: any = '';
  error: any;
  branchList: any = [];
  selectedBranch = '';
  reportTypes: any = [];
  selectedReport = '';
  constructor(sanitizer: DomSanitizer, public dataService: TatReportService) {
    //this.getOptions();
    this.html = sanitizer.bypassSecurityTrustHtml(this.html);
    this.html1 = sanitizer.bypassSecurityTrustHtml(this.html1);
    this.reportTypes.push({
      id: '1',
      value: 'Ticket Date Report',
      label: 'Ticket Date Report',
    },
    {
      id: '2',
      value: 'Bin Date Report',
      label: 'Bin Date Report',
    });
    // this.html = sanitizer.sanitize(SecurityContext.HTML, this.html1);

  }

  getOptions() {
    let result: any;
    this.dataService.getOptions()
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          result = data;
          this.branchList = result.branch;
          this.branchList.push({
            id: '0',
            value: 'All Branch',
            label: 'All Branch',
          });
        },
        error: error => this.error = error // error path
  });
  }

  selectBranch(event: { id: string; }) {
    this.selectedBranch = event.id;
  }

  selectReport(event: { id: string; }) {
    this.selectedReport = event.id;
  }

  getReport(event: any) {
    if ((this.selectedBranch !== '') && (this.selectedReport !== '')) {
      if (this.selectedReport === '1') {
        this.getTicketReport();
      } else {
        this.getBinReport();
      }
    } else {
      alert('Select Filter Options');
    }
  }

  getTicketReport() {
    this.buttonSpin = true;
    let result: any;
    this.dataService.getTicketReport(this.selectedBranch)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          result = data;
          this.html = result.table1;
          this.html1 = result.table2;
        }, // success path
        error: error => this.error = error // error path
  });
  }

  getBinReport() {
    this.buttonSpin = true;
    let result: any;
    this.dataService.getBinReport(this.selectedBranch)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          result = data;
          this.html = result.table1;
          this.html1 = result.table2;
        }, // success path
        error: error => this.error = error // error path
  });
  }

}
