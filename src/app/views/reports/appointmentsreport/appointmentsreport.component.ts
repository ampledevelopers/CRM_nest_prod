import { Component } from '@angular/core';
import { AppointmentsreportService } from './appointmentsreport.service';
import { ExcelService } from '../excel.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
// import { DataPipePipe } from './data-pipe.pipe';
import usersData from '../../smart-tables/_data';

@Component({
    selector: 'app-appointmentsreport',
    templateUrl: './appointmentsreport.component.html',
    styleUrls: ['./appointmentsreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})

export class AppointmentsreportComponent {

  reportLoading = false;
  reservationsData: any = [];
  reservationsTemp: any;
  loading = false;
  isReport = false;
  isRecords = 0;
  alert: any;
  error: any;
  productFamilies: any = [];
  appointsRange: any = 'All';
  appointStatus: any = '';
  productFamily: any = '';
  datePipe = new DatePipe('en-US');
  filters: any = [{ label: 'All Records', value: 'all' },
  { label: 'Apple Appointments', value: 'Apple' },
  { label: 'Ample Appointments', value: 'Ample' }];
  filter = 'all';
  finalData: any =[];
  appointsType = '';
  fromDate: any = '';
  toDate: any = '';
  userRole = localStorage.getItem('userRole');
  columns = ['reservation_id','rescheduled_to','customer_firstname','customer_lastlame','customer_phone_no','current_status','reservation_date','rescheduled_date','branch_code','new_branch_code','product_code','product_serial_number','product_issue_reported'];
  constructor(private dataService: AppointmentsreportService, private excelService: ExcelService) {
    this.productFamilies = [{ name: 'any', value: '' }, { name: 'iPod', value: 'IPOD' }, { name: 'iPad', value: 'IPAD' }, { name: 'iPhone', value: 'IPHONE' }, { name: 'Watch', value: 'WATCH' }, { name: 'Apple TV', value: 'APPLETV' }, { name: 'Mac', value: 'MAC' }, { name: 'Beats', value: 'BEATS' }]
  }

  load() {
      this.getAppointments();
  }
  typeChange() {
    if(this.appointsRange === 'Today') {
      this.fromDate = '';
      this.toDate = '';
    }
  }

  getAppointments() {
    this.reportLoading = true;
    this.isReport = false;
    this.reservationsData = [];
    this.finalData = [];
    this.filter = 'all';
    let date: any = '';
    if(this.appointsRange === 'Today') {
      const dateTemp = new Date();
      const year = dateTemp.getFullYear();
      const month = String(dateTemp.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
      const day = String(dateTemp.getDate()).padStart(2, '0');
      date = `${year}-${month}-${day}`;
    }
    if(this.appointsRange !== 'Today') {
      if(this.fromDate == ''  || this.toDate == '') {
        alert("Please select the Date Range");
        this.reportLoading = false;
        return;
      }
    }
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);
    const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
      alert('Date range cannot exceed 31 days.');
      this.clear();
      this.reportLoading = false;
      return;
  }
    this.dataService.getReservationReport(date, this.productFamily, this.appointStatus, this.appointsType, this.fromDate, this.toDate)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if (result.status === true) {
            this.reservationsTemp = result.reservation;
            for(let i=0; i < this.reservationsTemp.length; i++) {
                this.reservationsData.push({
                  reservation_id: (this.reservationsTemp[i].reservation_id === null ? '' : this.reservationsTemp[i].reservation_id ),
                  rescheduled_to: (this.reservationsTemp[i].rescheduled_to === null ? '' : this.reservationsTemp[i].rescheduled_to ),
                  customer_firstname: (this.reservationsTemp[i].customer_firstname === null ? '' : this.reservationsTemp[i].customer_firstname ),
                  customer_lastlame: (this.reservationsTemp[i].customer_lastlame === null ? '' : this.reservationsTemp[i].customer_lastlame ),
                  customer_phone_no: (this.reservationsTemp[i].customer_phone_number === null ? '' : this.reservationsTemp[i].customer_phone_number ),
                  current_status: (this.reservationsTemp[i].current_status === null ? '' : this.reservationsTemp[i].current_status ),
                  reservation_date: (this.reservationsTemp[i].reservation_date === null ? '' : this.reservationsTemp[i].reservation_date ),
                  rescheduled_date: (this.reservationsTemp[i].rescheduled_date === null ? '' : this.reservationsTemp[i].rescheduled_date ),
                  branch_code: (this.reservationsTemp[i].branch_code === null ? '' : this.reservationsTemp[i].branch_code ),
                  new_branch_code: (this.reservationsTemp[i].new_branch_code === null ? '' : this.reservationsTemp[i].new_branch_code ),
                  product_code: (this.reservationsTemp[i].product_code === null ? '' : this.reservationsTemp[i].product_code ),
                  product_serial_number: (this.reservationsTemp[i].product_serial_number === null ? '' : this.reservationsTemp[i].product_serial_number ),
                  product_issue_reported: (this.reservationsTemp[i].product_issue_reported === null ? '' : this.reservationsTemp[i].product_issue_reported ),
                  case_id: (this.reservationsTemp[i].case_id === null ? '' : this.reservationsTemp[i].case_id )
                });
            }
            this.finalData = this.reservationsData;
            // const filterPipe = new DataPipePipe();
            // const fiteredArr = filterPipe.transform(this.reservationsData, this.productFamily, this.appointStatus, this.appointsRange);
            // this.reservationsData  = fiteredArr.sort(function(a: any, b: any) { return ((a.current_status !== 'RESCHEDULED'? (a.reservation_date < (b.current_status !== 'RESCHEDULED'?  b.reservation_date : b.rescheduled_date)) : (a.rescheduled_date < (b.current_status !== 'RESCHEDULED'?  b.reservation_date : b.rescheduled_date)))) });
            this.reportLoading = false;
            this.loading = false;
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  clear() {
    this.appointsRange = 'All'
    this.appointStatus = '';
    this.productFamily = '';
    this.isReport = false;
    this.fromDate = '';
    this.toDate = '';
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.reservationsData, 'Appointments_Report');
  }

  // filterSearch(filter: string) {
  //   const dataTemp: any = [];
  //   if (filter === 'Apple') {
  //     this.reservationsData = _.filter(this.finalData, row => row.case_id !== '');
  //   }
  //   else if (filter === 'Ample') {
  //     this.reservationsData = _.filter(this.finalData, row => row.case_id === '');
  //   }
  //   else {
  //     this.reservationsData = this.finalData;
  //   }
  // }
 tableDataCellProps(item: any, column: string): any {
  return {
    color: 'custom-white', // Custom class
    align: 'center',
    active: true
  };
}


tableDataCellClasses(item: any, columnName: string): string[] {
  // Add classes based on cell content
  if (columnName === 'status') {
    if (item[columnName] === 'Pending') {
      return ['text-warning'];
    } else if (item[columnName] === 'Completed') {
      return ['text-success'];
    } else {
      return ['text-danger'];
    }
  }
  return [];
}

}
