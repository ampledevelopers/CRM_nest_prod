import { Component } from '@angular/core';
import { InventoryDashboardService } from './inventory-dashboard.service';

@Component({
    selector: 'app-inventory-dashboard',
    templateUrl: './inventory-dashboard.component.html',
    styleUrls: ['./inventory-dashboard.component.scss'],
    standalone: false
})
export class InventoryDashboardComponent {
  loading = true;
  preday = new Date().toISOString().split('T')[0];
  prevday = new Date();
  userRole: any;
  branchList: any = [];
  inventoryHeaders: any = [];
  inventoryData: any = [];
  branchDataList: any = [];
  partList: any = [];
  inventoryDataValue: any = [];
  branchInventoryData: any = [];
  finalInventoryData: any = [];
  avgTemp = 0;
  constructor(
    public dataService: InventoryDashboardService) {
    this.userRole = localStorage.getItem('userRole');
    this.prevday = new Date(this.prevday.setDate(this.prevday.getDate() - 1));
    this.preday = this.prevday.toISOString().split('T')[0];
    this.getInventoryData();
  }

  getInventoryData() {
    let result: any;
    this.dataService.getInventoryData(this.preday)
      .subscribe(
        (data) => {
          result = data;
          this.branchDataList = result.data;
          let branchData: any = [];
          this.partList = result.parts;
          let weekData: any;
          if (result.status === true) {
            this.loading = false;
            for (let i = 0; i < this.branchDataList.length; i++) {
              this.branchList.push({
                branchCode: this.branchDataList[i].branch_code
              });
              const branchCode = this.branchDataList[i].branch_code;
              const responseData = this.branchDataList[i];

              branchData = [responseData[0], responseData[1], responseData[2], responseData[3]];
              for (let j = 0; j < branchData.length; j++) {
                this.inventoryHeaders.push({
                  head: branchData[j][0].week_no,
                });
                const weekNo = branchData[j][0].week_no;
                weekData = branchData[j][0].week;
                this.inventoryDataValue = [];
                for (let k = 0; k < this.partList.length; k++) {
                  let isPartNoAvail = false;
                  for (let l = 0; l < weekData.length; l++) {
                    if (weekData[l].part_number === this.partList[k].part_number) {
                      isPartNoAvail = true;
                      this.inventoryDataValue.push({
                        partNumber: weekData[l].part_number,
                        count: weekData[l].week_count,
                        branch: branchCode,
                        week: weekNo
                      });
                      break;
                    }
                  }
                  if (isPartNoAvail === false) {
                    this.inventoryDataValue.push({
                      partNumber: this.partList[k].part_number,
                      count: '0',
                      branch: branchCode,
                      week: weekNo
                    });
                  }
                }
                this.branchInventoryData.push(this.inventoryDataValue);
              }
            }

            for (let m = 0; m < this.partList.length; m++) {
              const rowData = [];
              for (let n = 0; n < this.branchInventoryData.length; n++) {
                const branchInventoryDataTemp = this.branchInventoryData[n];
                for (let o = 0; o < branchInventoryDataTemp.length; o++) {
                  if (this.partList[m].part_number === branchInventoryDataTemp[o].partNumber) {
                    if ((o % 4) === 0) {
                      this.avgTemp = this.avgTemp / 3;
                      this.avgTemp = Math.round(this.avgTemp);
                      this.avgTemp = 0;
                    } else {
                      this.avgTemp = +this.avgTemp + Number(branchInventoryDataTemp[o].count);
                    }
                    rowData.push({
                      count: branchInventoryDataTemp[o].count,
                      branch: branchInventoryDataTemp[o].branch,
                      week: branchInventoryDataTemp[o].week
                    });
                    break;
                  }
                }
              }
              this.finalInventoryData.push({
                part: this.partList[m].part_number,
                countArray: rowData
              });
            }
          }
        });
  }
}
