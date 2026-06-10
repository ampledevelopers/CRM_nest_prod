import { FormsModule } from '@angular/forms';
import { CEODashboardService } from './../ceo-dashboard.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-target-entry',
    templateUrl: './target-entry.component.html',
    styleUrls: ['./target-entry.component.scss', './../ceo-dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule,FormsModule]
})
export class TargetEntryComponent {

  reportType: any = '';
  year: any = '';
  quarter: any = '';
  branches: any = [];
  loading = false;
  siteTypeId = localStorage.getItem('siteType');
  branchTemp: any = [];
  submitType = 'Save';
  targets: any = [];
  showTable = false;
  branchVal: any = [];
  isUpdate: any;
  branchCode: any = [];
  subTitle: any = '';
  title: any;

  constructor(public dataService: CEODashboardService) {
    this.getBranches();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.branchTemp = result.branch;
          }
        }, // success path
        error: error => error // error path
      });
  }

  filterChange() {
    this.showTable = false;
  }

  load() {
    if (this.year === '') {
      alert('Please select the Year');
      return;
    } else if (this.quarter === '') {
      alert('Please select Quarter');
      return;
    } else if (this.reportType === '') {
      alert('Please select the Report type');
      return;
    } else {
      this.loading = true;
      this.showTable = false;
      this.targets = [];
      this.branchVal = [];
      this.branchCode = [];
      let result: any;
    this.title = this.reportType +  ' ' + (this.quarter === '1' ? 'AMJ' : this.quarter === '2' ? 'JAS' : this.quarter === '3' ? 'OND' : 'JFM') + '-' + ' ' + 'FY'+ ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
      if (this.reportType === 'Customer Engagement') {
        this.subTitle = 'Permitted Wait Time(in mins)';
      } else if (this.reportType === 'CSAT') {
        this.subTitle = 'Target(in %)';
      } else {
        this.subTitle = 'Target(in lacs)';
      }
      this.dataService.getTargetValues(this.year, this.quarter, this.reportType)
        .subscribe({
          next: (data: any) => {
            result = data.items;

            if (result.length === 0 ? this.submitType = 'Save' : this.submitType = 'Update')
              if (result.length === 0 ? this.isUpdate = '0' : this.isUpdate = '1')
                for (let i = 0; i < this.branchTemp.length; i++) {
                  this.branchVal.push(this.branchTemp[i].label.replace('iCare ', ''));
                  this.branchCode.push(this.branchTemp[i].branch_code);
                }
            for (let i = 0; i < this.branchVal.length; i++) {
              let targetTemp: any;
              targetTemp = result.find((x: any) => x.branch_code === this.branchTemp[i].branch_code);
              if (targetTemp !== undefined) {
                targetTemp = targetTemp.value;
              } else {
                targetTemp = '';
              }
              this.targets.push({
                branch: this.branchVal[i],
                target: targetTemp,
                branchCode: this.branchCode[i]
              })
              this.loading = false;
              this.showTable = true;
            }
          }, // success path
          error: (error: any) => error // error path
        });
    }
  }

  submit() {
    let valueEntered = this.targets.find((x: any) => x.target !== '' && x.target !== '0');
    if (valueEntered !== undefined || this.isUpdate === '1') {
      let dtValues: any = [];
      let hdValues: any = [];
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
      for (let i = 0; i < this.targets.length; i++) {
        if (specialChars.test(this.targets[i].target) || (isNaN(this.targets[i].target))) {
          alert('invalid value entered, Please check.');
          return;
        }
        dtValues.push({
          branch_code: this.targets[i].branchCode,
          value: this.targets[i].target
        })
      }
      hdValues = {
        report_type: this.reportType,
        quarter: this.quarter,
        year: this.year,
        update: this.isUpdate
      }

      this.dataService.saveTargetValues(hdValues, dtValues)
        .subscribe({
          next: (data: any) => {
            if (data.status === true) {
              alert(this.subTitle + ' ' + 'Values' + ' ' + this.submitType + 'd Successfully');
              this.showTable = false;
              this.reportType = '';
              this.year = '';
              this.quarter = '';
            }
          }, // success path
          error: (error: any) => error // error path
        });
    } else {
      alert('No Changes Done');
      this.showTable = false;
      this.reportType = '';
      this.year = '';
      this.quarter = '';
    }
  }
}
