import { ExcelService } from '../excel.service';
import { RepairsReportTekneService } from './repairs-report-tekne.service';
import { Component } from '@angular/core';
import { IconSubset } from '../../../icons/icon-subset';

@Component({
    selector: 'app-repairs-report-tekne',
    templateUrl: './repairs-report-tekne.component.html',
    styleUrls: ['./repairs-report-tekne.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class RepairsReportTekneComponent {
  reportLoading = false;
  loading = true;
  public fromDate = '';
  toDate = '';
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  t1Type: any;
  branchList: any = [];
  branchListTemp: any = [];
  columns: any = [];
  componentIssues: any;

  constructor(
    public dataService: RepairsReportTekneService,
    private excelService: ExcelService
  ) {
    this.getBranches();
    this.getComponent();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.branches = result.branch;
          }
        },
        error: (error: any) => this.error = error
      });
  }

  getComponent() {
    let result;
    this.dataService.getComponent()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.componentIssues = result.components;
          }
        },
        error: (error: any) => this.error = error
      });
  }

  branchSelect(event: any) {
    this.branchList = [...new Set(event)];
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Repairs_Report_Tekne');
  }

  load() {
    this.ticketSearch = '';
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      this.getTekneRepairReport();
    }
  }

  getTekneRepairReport() {
  this.reportLoading = true;
  this.isReport = false;
  this.data = []; // clear old data

  this.dataService.getTekneRepairReport(this.fromDate, this.toDate, this.branchId)
    .subscribe({
      next: (result: any) => {
        this.reportLoading = false;

        if (result.status === true && result.data.length > 0) {
          this.columns = Object.keys(result.data[0]);

          const mappedData = result.data.map((item: any) => {
            const newItem = { ...item };
            newItem.Consignment_Used = newItem.Consignment_Used == 1 ? 'Yes' : 'No';

            const component = this.componentIssues.find(
              (comp: any) => comp.component_id === newItem.component_code
            );
            const issue = this.componentIssues.find(
              (iss: any) => iss.issue_id === newItem.issue_code && iss.component_id === newItem.component_code
            );

            newItem.component_code = component ? component.component_code : 'Unknown';
            newItem.issue_code = issue ? issue.issue_code : 'Unknown';
            return newItem;
          });

          // Remove duplicates
          const uniqueData = mappedData.filter(
            (value: any, index: number, self: any[]) =>
              index ===
              self.findIndex(
                (t: any) =>
                  t.component_code === value.component_code &&
                  t.issue_code === value.issue_code &&
                  t.Consignment_Used === value.Consignment_Used
              )
          );

          this.data = uniqueData;
          this.isReport = true;
          this.isRecords = 0;
        } else {
          this.isReport = false;
          this.isRecords = 1;
          this.alert = 'No Records Found';
        }
      },
      error: (error: any) => {
        this.error = error;
        this.reportLoading = false;
        this.isReport = false;
        this.isRecords = 1;
        this.alert = 'Something went wrong';
      }
    });
}

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.branchId = '';
    this.ticketSearch = '';
  }

  // Add this method to provide cell properties for styling
  tableDataCellProps(item: any, columnName: string): { active?: boolean; color?: string; align?: string } {
    // Example logic — customize based on your data
    const props: { active?: boolean; color?: string; align?: string } = {};

    // Example: highlight rows with some condition
    if (columnName === 'Consignment_Used' && item[columnName] === 'Yes') {
      props.active = true;
      props.color = 'green';
    } else {
      props.color = 'black';
    }

    // Example alignment by column
    if (['component_code', 'issue_code'].includes(columnName)) {
      props.align = 'center';
    } else {
      props.align = 'left';
    }

    return props;
  }

  // Add this method to return CSS classes for the cell
  tableDataCellClasses(item: any, columnName: string): string | object {
    const classes: any = {};

    // Example: Add class if Consignment_Used is Yes
    if (columnName === 'Consignment_Used' && item[columnName] === 'Yes') {
      classes['highlight-cell'] = true;
    }

    // Example: add classes by column
    if (columnName === 'component_code') {
      classes['text-bold'] = true;
    }

    return classes;
  }
}


