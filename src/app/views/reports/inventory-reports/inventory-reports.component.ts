import { Component } from '@angular/core';

@Component({
    selector: 'app-inventory-reports',
    templateUrl: './inventory-reports.component.html',
    styleUrls: ['./inventory-reports.component.scss'],
    standalone: false
})
export class InventoryReportsComponent {
inventory = false;
consignment = false;
reportType = null;
reports = [{label: 'Inventory Report', value: 'inventory'},{label: 'Consignment Stock Status Report', value: 'consignments'}]

constructor() {

}
onReportSelect() {
  if(this.reportType == 'inventory')
  {
    this.inventory = true;
    this.consignment = false;
  }
  else
  {
    this.inventory = false;
    this.consignment = true;
  }
}
}
