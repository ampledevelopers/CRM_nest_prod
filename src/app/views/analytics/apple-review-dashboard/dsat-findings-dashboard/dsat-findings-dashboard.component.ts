import { Component } from '@angular/core';
import { DsatFindingsDashboardService } from './dsat-findings-dashboard.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-dsat-findings-dashboard',
    templateUrl: './dsat-findings-dashboard.component.html',
    styleUrls: ['./dsat-findings-dashboard.component.scss', '../../../../../scss/customstyle.css'],
    standalone: false
})
export class DsatFindingsDashboardComponent {
  year: any = '';
  month: any = 'Select Month';
  week: any = '';
  rca: any = '';
  months: any = [];
  dsatDataLoad = false;
  loading = false;
  dsatDataTemp: any = [];
  dsatDataList: any = [];

  constructor(public dataService: DsatFindingsDashboardService) {
    this.months = [
      { value: 'Select Month', name: 'Select Month' },
      { value: 'P01', name: 'P01' },
      { value: 'P02', name: 'P02' },
      { value: 'P03', name: 'P03' },
      { value: 'P04', name: 'P04' },
      { value: 'P05', name: 'P05' },
      { value: 'P06', name: 'P06' },
      { value: 'P07', name: 'P07' },
      { value: 'P08', name: 'P08' },
      { value: 'P09', name: 'P09' },
      { value: 'P10', name: 'P10' },
      { value: 'P11', name: 'P11' },
      { value: 'P12', name: 'P12' },
    ]
  }

  load() {
    this.loading = true;
    if (this.year !== '' && this.month !== 'Select Month' && this.week !== '') {
      this.dataService.getDsatData(this.year, this.month, this.week)
        .subscribe({
          next: (data: any) => {
            if (data.status === true) {
              this.dsatDataList = data.items;
              this.dsatDataTemp = this.dsatDataList;
              this.dsatDataLoad = true;
              this.loading = false;
            } else {
              this.loading = false;
              this.dsatDataLoad = false;
              alert('Data not available');
            }
          }
        })
    } else {
      this.loading = false;
      alert('Select all mandatory fields')
    }
  }

  searchRCA(event: any) {
    let searchedDatas: any = [];

    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      for (let i = 0; i < this.dsatDataList.length; i++) {
        searchedDatas = _.filter(this.dsatDataList, row => row.rca.toLowerCase().indexOf(this.rca.toLowerCase()) > -1);
      }
      this.dsatDataTemp = searchedDatas;
    } else {
      this.dsatDataTemp = this.dsatDataList;

    }
  }

}
