import { Component, TemplateRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DCallServicesService } from './d-call-services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-d-call-services',
    templateUrl: './d-call-services.component.html',
    styleUrls: ['./d-call-services.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})

export class DCallServicesComponent {
  usersData: any = [];
  selectedTicketId = '';
  errorMessage: any = '';
  showerror = false;
  errorMsg = false;
  prevRow: any;
  loadingData = false;
  selectedData: any = [];
  userAllData: any = [];
  setServiceType = 'Select Service Type';
  setServiceTypeList: any = [];
  pickup_assigned_to: any = [];
  pickupAssigned: any = 'Select pickup person';
  tech_assigned_to: any = [];
  techAssigned: any = 'Select technician person';
  datetime: any = '';
  datePipe = new DatePipe('en-US');
  checked = false;
  buttonLoading = false;
  fromDate: any;
  userRole = localStorage.getItem('userRole');
  branchCode = localStorage.getItem('branchCode');
  disableConfirm = false;

  columns = [
    'ticketId', 'branch', 'name', 'phone', 'serial_no', 'g_number', 'product_category', 'status',
    {
      key: 'show',
      label: 'Action',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ]

  constructor(private dataService: DCallServicesService, private modalService: NgbModal, public httpClient: HttpClient) {
    this.getDcalltickets('start');
    this.getPUDAgent();
    this.getAssignees();

    this.setServiceTypeList = [
      { id: 'SiteVisit', value: 'SiteVisit' },
      { id: 'PickUp', value: 'PickUp' }]

  }

  getDcalltickets(type: any): void {
    let result: any = [];
    let userDataTemp: any = [];
    let usersDataList: any = [];
    this.dataService.getDcalltickets()
      .subscribe(
        (data) => {
          result = data;
          userDataTemp = result.data;
          this.userAllData = userDataTemp;
          for (let i = 0; i < userDataTemp.length; i++) {
            usersDataList.push({
              ticketId: userDataTemp[i].id,
              branch: userDataTemp[i].branch_code,
              name: userDataTemp[i].customer_name,
              phone: userDataTemp[i].customer_phone_no,
              serial_no: userDataTemp[i].serial_no,
              g_number: userDataTemp[i].g_number,
              product_category: userDataTemp[i].product_category,
              status: userDataTemp[i].status_name,
            })
          }
          this.usersData = [...usersDataList];
          if (type === 'refresh') {
            this.selectedData = this.userAllData.filter((data: any) => {
              return data.id === this.selectedTicketId;
            });
            this.selectedData = this.selectedData[0];
          }
        })
  }

  ticketselect(id: string) {
    localStorage.setItem('id', id);
  }

  getItem(item: any) {
    return Object.keys(item);
  }

  details_visible = Object.create({});

  toggleDetails(id: any, item: any) {
    this.selectedTicketId = item.ticketId;
    if ((this.prevRow != undefined) && (this.prevRow != id)) {
      this.details_visible[this.prevRow] = !this.details_visible[this.prevRow];
      this.prevRow = id;
      this.details_visible[id] = !this.details_visible[id];
    } else if (this.prevRow == id) {
      this.details_visible[id] = !this.details_visible[id];
      this.prevRow = undefined;
    } else {
      this.details_visible[id] = !this.details_visible[id];
      this.prevRow = id;
    }
    if (this.details_visible[id]) {
      this.selectedData = this.userAllData.filter((data: any) => {
        return data.id === item.ticketId;
      });
      this.selectedData = this.selectedData[0];
    }
  }

  pudConfirmModel(pud_confirmation_temp: TemplateRef<any>, ticket_id: any) {
    this.openModal(pud_confirmation_temp)
    this.selectedData = this.userAllData.filter((data: any) => {
      return data.id === ticket_id;
    });
    this.selectedData = this.selectedData[0];
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  cancel() {
    this.techAssigned = 'Select technician person';
    this.pickupAssigned = 'Select pickup person';
    this.setServiceType = 'Select Service Type';
    this.errorMessage = '';
    this.errorMsg = false;
    this.buttonLoading = false;
    this.modalService.dismissAll();
    this.disableConfirm = false;
    //  location.reload();
  }

  getPUDAgent() {
    let results: any = [];
    this.dataService.getPUDAgent()
      .subscribe({
        next: (data: any) => {
          results = data;
          this.pickup_assigned_to = results;
        }
      });
  }

  getAssignees() {
    let results: any = [];
    this.dataService.getAssignees()
      .subscribe({
        next: (data: any) => {
          results = data;
          this.tech_assigned_to = results.user;
        }
      });
  }

  siteTypeCheck() {
    this.buttonLoading = true;
    this.datetime = this.datePipe.transform(this.datetime, 'yyyy-MM-dd hh:mm:ss');
    let techAssignedDate: any;
    let PickupAssignedDate: any;
    let gNumber: any;
    if (this.setServiceType) {
      if (this.setServiceType === 'SiteVisit') {
        techAssignedDate = this.datetime;
        gNumber = this.selectedData.g_number;
      } else if (this.setServiceType === 'PickUp') {
        PickupAssignedDate = this.datetime;
      }
      let result: any = [];
      this.dataService.dcallSetType(this.selectedTicketId, this.setServiceType, this.pickupAssigned, PickupAssignedDate, this.techAssigned, techAssignedDate, gNumber)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonLoading = false;
              this.checked = true;
              this.cancel();
              this.getDcalltickets('refresh');
            } else {
              this.buttonLoading = false;
            }
          })
    }
  }

   /************ fetchDcall **************/

   fetchDcallModel(fetch_dcall_temp: TemplateRef<any>) {
    this.disableConfirm = false
    this.openModal(fetch_dcall_temp);
  }

  fetchDcall() {
    this.buttonLoading = true;
    this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy/MM/dd');
    let toDate: any = new Date();
    toDate = this.datePipe.transform(toDate, 'yyyy/MM/dd');
    if (this.fromDate !== null) {
      this.dataService.fetchDcall(this.fromDate, toDate, this.branchCode).subscribe({
        next: (data: any) => {
          if (data.status === true) {
            this.errorMessage = '**D-Call fetch has been completed.\nPlease check in Dcall Dashboard for D call details.';
            this.errorMsg = true;
            this.buttonLoading = false;
            this.disableConfirm = true;
          } else {
            this.errorMessage = data.message;
            this.errorMsg = true;
            this.buttonLoading = false;
          }
        },
        error: (error: HttpErrorResponse) => {
        }
      });
    } else {
      alert('Select From Date');
    }
  }

  dateChange() {
    this.disableConfirm = false;
    this.errorMessage ='';
    this.showerror = false;
    this.disableConfirm = false;
  }

}
