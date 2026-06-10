import { Component, OnDestroy } from '@angular/core';
import { UpdateAgeingTimeService } from './update-ageing-time.service' ;

@Component({
    selector: 'app-update-ageing-time',
    templateUrl: './update-ageing-time.component.html',
    styleUrls: ['./update-ageing-time.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class UpdateAgeingTimeComponent {
  public fromDate = '';
  toDate = '';
  data: any = [];
  branches: any = [];
  statuses: any = [];
  statusId = '';
  // families: any = [];
  familyId = '';
  site_types: any = [];
  ageingData: any = [];
  branch = 'Select Branch Name';
  status = '';
  siteType = 'Select Site Type';
  error: any;
  remarks = '';
  ageingTime = '';
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  sitetypeId = localStorage.getItem('siteType');
  buttonSpin = false;
  recordstatus = 'A' ;
  buttonName = 'Add' ;
  history = '' ;
  text = '' ;
  constructor(
    public dataService: UpdateAgeingTimeService
  ) {
    // this.getBranches();
    this.getSitetypes();
    // this.getProductFamily();
    this.getAgeingTimeData() ;
   }

   getSitetypeBranches(id: string | null) {
    let result;
    this.dataService.getSitetypeBranches(id)
      .subscribe({
        next: (data: any) => {
            result = data;
              this.branches = result.branch;
        }, // success path
        error: error => this.error = error // error path
   });
  }

  /* getStatuses(id) {
    let result;
    this.dataService.getStatuses(id)
      .subscribe(
        (data) => {
            result = data;
              this.statuses = result.status;
        }, // success path
        error => this.error = error // error path
      );
  } */


  getSitetypes() {
    let result;
    this.dataService.getSitetypes()
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.site_types = result.site_types;
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  // getProductFamily() {
  //   let result;
  //   this.dataService.getProductFamily()
  //     .subscribe(
  //       (data) => {
  //           result = data;
  //           if (result.status === true) {
  //             this.families = result.families;
  //           }
  //       }, // success path
  //       error => this.error = error // error path
  //     );
  // }

  getAgeingTimeData() {
    let result;
    this.dataService.getAgeingTimeData()
      .subscribe({
        next:(data: any) => {
            result = data;
           if (result.status === true && result.ageingTimeData.length > 0) {
              this.isReport = true;
              this.ageingData = result.ageingTimeData;
            } else {
                  this.isReport = false;
                  this.alert = 'No Records Found';
                 }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  edit(id: any) {
    for (let i = 0; i < this.ageingData.length; i++) {
      if (id === this.ageingData[i].id) {
      this.siteType = this.ageingData[i].sitetype_id;
      this.getSitetypeBranches(this.siteType);
      this.branch = this.ageingData[i].branch_id;
      // this.getStatuses(this.siteType);
      this.status = this.ageingData[i].status_id;
      this.ageingTime = this.ageingData[i].ageing_time ;
      this.history = this.ageingData[i].remarks;
      this.familyId = this.ageingData[i].family_id ;
      this.buttonName = 'Update';
      }
    }

  }

  sitetypeSelect(siteId: string | null) {
     this.sitetypeId = siteId;
     if (this.sitetypeId !== 'Select Site Type') {
      // this.getStatuses(this.sitetypeId);
      this.getSitetypeBranches(this.sitetypeId);
      } else {
       this.statuses = [];
      }
    }

    branchSelect(event: string) {
      this.branchId = event;
     }

    // familySelect(event) {
    //   this.familyId = event.id;
    //  }

     statusSelect(status: string) {
      this.statusId = status;
    }

    cancel() {
      this.branch = 'Select Branch Name';
      this.status = '';
      this.siteType = 'Select Site Type';
      this.ageingTime = '' ;
      this.remarks = '';
      this.familyId = '';
      this.buttonName = 'Add' ;
    }

    onChange($event: { target: { options: { [x: string]: { text: string; }; selectedIndex: any; }; }; }) {
       this.text = $event.target.options[$event.target.options.selectedIndex].text;
      }

    save() {
      alert("hi");
   this.buttonSpin = true;
    this.ticketSearch = '';
   if (this.siteType === '') {
      alert('Please select the Site Type');
      this.buttonSpin = false;
      return;
    } else if (this.branch === 'Select Branch Name') {
      alert('Please select the Branch');
      this.buttonSpin = false;
      return;
    } else if (this.status === 'Select Status Name') {
      alert('Please select the Status');
      this.buttonSpin = false;
      return;
    } else if (this.familyId === '') {
      alert('Please select the Product Family');
      this.buttonSpin = false;
      return;
    } else if (this.ageingTime === '') {
      alert('Please select the Ageing Time');
      this.buttonSpin = false;
      return;
    } else if (this.remarks === '') {
      alert('Please enter the Remarks');
      this.buttonSpin = false;
      return;
    } else if (this.recordstatus === '') {
      alert('Please select the Status');
      this.buttonSpin = false;
      return;
    } else {
      let result: any;
      this.dataService.addAgeingTime(this.siteType, this.branch, this.status, this.familyId, this.ageingTime, this.remarks, this.recordstatus, this.text)
        .subscribe({
          next: (data: any) => {
              result = data;
              if (result.status === 'add' )  {
                this.buttonSpin = false;
                alert(result.message) ;
                this.cancel();
                this.getAgeingTimeData();
                } else if (result.status === 'update' ) {
                  this.buttonSpin = false;
                  alert(result.message) ;
                  this.cancel();
                  this.getAgeingTimeData();
                } else {
                  this.buttonSpin = false;
                  this.isRecords = 1;
                  this.isReport = false;
                  alert('Record Saving Failed');
                  this.cancel();
                }
          }, // success path
          error: error => this.error = error // error path
    });
      }
    }

    OnDestroy(){

    }

}

