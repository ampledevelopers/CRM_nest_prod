import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, TemplateRef } from '@angular/core';
import { FreePhyLocationService } from './free-phy-location.service';
import { iif, Subject } from 'rxjs';
import { ExcelService } from '../reports/excel.service';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-free-phy-location',
    templateUrl: './free-phy-location.component.html',
    styleUrls: ['./free-phy-location.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})

export class FreePhyLocationComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  error: any;
  loading = true;
  userRole;
  buttonSpin = false;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  alert = '';
  data: any = [];
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  locationSearch: any = '';
  dataTemp: any = [];
  p: number[] = [];

  constructor(public dataService: FreePhyLocationService, private modalService: NgbModal, private excelService: ExcelService) {
    this.userRole = localStorage.getItem('userRole');
    this.getPhylocationTickets();
    this.dtTrigger.next({});
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Physical_Locations');
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.locationSearch = '';
    this.getPhylocationTickets();
    this.modalService.dismissAll();
  }

  getPhylocationTickets() {
    let result;
    this.data = [];
    this.dataService.getPhyLocation()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && result.phy_location.length !== 0) {
            this.loading = false;
            for(let i=0; i < result.phy_location.length; i++) {
              this.data.push(
                {
                  ticket_id: result.phy_location[i].ticket_id,
                  branch_code: result.phy_location[i].branch_code,
                  product_family: result.phy_location[i].product_family,
                  device_location_id: result.phy_location[i].device_location_id,
                  family: result.phy_location[i].family,
                  device_serial_number : result.phy_location[i].serial_no,
                  date_and_time : result.phy_location[i].entrytime,
                  status : result.phy_location[i].status
                }
              )
            }
            this.dataTemp = this.data;
          } else {
            this.alert = 'No Records Found';
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  checkLocation(event: { keyCode: number; }) {
    this.dataTemp = this.data;
    if(event.keyCode === 8) {
      this.locationSearch = '';
      this.dataTemp = this.data;
    }
    if(this.locationSearch !== '') {
      if ((event.keyCode === 13) || (event.keyCode === 9)) {
        this.dataTemp = this.data.filter((id: any) => {
          return id.device_location_id === this.locationSearch
        });
      }
    } else {
      this.dataTemp = this.data;
    }
  }

  updatePhyLocation(item: { ticket_id: string; branch_code: string; product_family: string; device_location_id: string; }, simple_alert_temp: TemplateRef<any>) {
    if (confirm('Are you sure you want to free this Physical Location' + ' ' + '(' + item.device_location_id + ')' + ' ' + '?')) {
      this.buttonSpin = true;
      let result;
      this.dataService.updatePhyLocation(item)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.simpleAlert = { title: 'Physical Location Free', msg: result.message };
              this.openModal(simple_alert_temp);
            } else {
              alert(result.message);
            }
            this.loading = false;
          }, // success path
          error: error => this.error = error // error path
        });
    }
  }
}
