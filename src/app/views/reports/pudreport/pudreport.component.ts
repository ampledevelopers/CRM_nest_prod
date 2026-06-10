import { Component } from '@angular/core';
import { ExcelService } from '../excel.service';
import { DataPipePipe } from './data-pipe.pipe';
import { PUDreportService } from './pudreport.service';

@Component({
    selector: 'app-pudreport',
    templateUrl: './pudreport.component.html',
    styleUrls: ['./pudreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class PUDreportComponent {
  reportLoading = false;
  data: any;
  loading = false;
  fromDate = '';
  toDate = '';
  isReport = false;
  isRecords = 0;
  alert: any;
  error: any;
  pudType: any = 'any';
  pudTypes: any;
  status: any = 'any';
  statusArray: any;
  pudArray: any = [];
  reportName: any;
  userRole = localStorage.getItem('userRole');
  columns = ['ticket_id','customer_firstname','customer_primary_phone','customer_email','pud_type','status','pickup_status','drop_status','city','state','serial_no','pickup_user_name','date'];
  constructor(private dataService: PUDreportService, private excelService: ExcelService) {
    this.pudTypes = [{ name: 'D-Call', value: 'D-Call' }, { name: 'DL', value: 'DL' }, { name: 'Apple-PUD', value: 'Apple-PUD' }, { name: 'Ample-PUD', value: 'Ample-PUD' }];
    this.statusArray = [{name: 'Open', value: 'Open'}, { name: 'Assigned - Outward', value: 'Assigned - Outward'}, { name: 'Transit - Outward', value: 'Transit - Outward'}, { name: 'At HO', value: 'At HO'}, { name: 'Assigned - Return', value: 'Assigned - Return'}, { name: 'Transit - Return', value: 'Transit - Return'}, { name: 'Returned', value: 'Returned'}, {name: 'Closed', value: 'Closed'}]
  }

  load() {
   if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else if(this.toDate < this.fromDate) {
      alert('To Date Cannot be less than From Date');
      return;
    } else {
      this.getPUDtickets();
      }
    }

    getPUDtickets() {
    this.reportLoading = true;
    this.isReport = false;
    this.reportName = this.pudType;
    this.pudArray = [];
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
          this.clear();
          this.reportLoading = false;
          return;
    }
    let statusToApi = '';
    if(this.status === 'Closed') {
      statusToApi = 'Closed';
    }
    this.dataService.getPUDtickets(statusToApi)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if(result.length > 0) {
            for(let i=0; i<result.length; i++) {
              this.pudArray.push({
                ticket_id: result[i].ticket_id,
                customer_firstname: result[i].customer_firstname,
                customer_primary_phone: result[i].customer_primary_phone,
                customer_email: result[i].customer_email,
                pud_type: result[i].pud_type,
                pickup_status: result[i].pickup_status,
                drop_status: result[i].drop_status,
                city: result[i].city,
                state: result[i].state,
                serial_no: result[i].serial_no,
                pickup_user_name: result[i].pickup_user_name,
                date: result[i].date,
                status: result[i].status,
              })
            }
            const filterPipe = new DataPipePipe();
            const fiteredArr = filterPipe.transform(this.pudArray,this.fromDate, this.toDate, this.pudType, this.status);
            this.reportLoading = false;
            this.data = fiteredArr;
            this.loading = false;
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
        }, // success path
        error: (error:any) => this.error = error // error path
      });
  }

  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.pudType = 'any';
    this.status = 'any';
    this.isReport = false;
    }

    exportAsXLSX(): void {
      this.excelService.exportAsExcelFile(this.data, 'PUD_Report');
   }


}
