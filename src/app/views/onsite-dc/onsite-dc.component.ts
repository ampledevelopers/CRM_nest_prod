import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnsiteDcService } from './onsite-dc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-onsite-dc',
    templateUrl: './onsite-dc.component.html',
    styleUrls: ['./onsite-dc.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class OnsiteDcComponent {
  loading = false;
  buttonSpin = false;
  companies: any = [];
  companyId = '';
  error: any;
  organization = null;
  partList: any = [];
  selectedPartsTemp: any = [];
  selectedPartsList: any = [];
  siteType = localStorage.getItem('siteType');
  bcolor = false;
  ticketId = '';
  gNumber = '';
  data: any = [];
  gsxId = '';
  showSelectedList = false;
  gsxParts = [];
  // partList: any = [];
  results: any =[];
  status = '';
  branchCode = localStorage.getItem('branchCode');
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  fromDate = '';
  toDate = '';
  pageNo = 1;
  gDriveData: any = [];
  isEligibleRC = false;
  dropLocationFlag = localStorage.getItem('drop_location_flag');
  branchListTemp: any;
  branch: any;
  childBranches: any = [];
  pudTickets: any;
  childBranch = '';

  constructor(private modalService: NgbModal, private router: Router, public dataService: OnsiteDcService) {
    if(this.siteType === '2'){
      this.loading = true;
      this.getCompanies();
    } else{
      this.loading = true;
      this.getPUDtickets();
      setTimeout(() => {
        this.getOptions();
      }, 1000);
    }


  }
  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  getCompanies() {
    let result;
    this.dataService.getCompanies()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.companies = result.company;
            this.loading = false;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getTicketDetails() {
    this.buttonSpin = true;
    let result: any;
    if (this.organization !== null) {
      for (let i = 0; i < this.companies.length; i++) {
        if (this.companies[i].value === this.organization) {
          this.companyId = this.companies[i].id;
          break;
        }
      }
    } else {
      alert('Select Organization Name');
      this.buttonSpin = false;
    }

    if (this.companyId !== '') {
      this.dataService.getDcTickets(this.companyId)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.partList = result.tickets;
              for (let i = 0; i < this.partList.length; i++) {
                this.partList[i].isSelectPart = false;
              }
              this.buttonSpin = false;
            } else {
              alert('No tickets available for create DC');
              this.buttonSpin = false;
            }
          });
    }
  }

  getOptions() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
            result = data;
            this.branchListTemp = result.branch;
            this.branch =  this.branchListTemp.filter((data: any) => {
              return data.branch_code === this.branchCode;
            });
            this.childBranches = this.branchListTemp.filter((data: any) => {
              return data.drop_location_flag === '1' && data.parent_location_id === this.branch[0].id;
            });
            if(this.childBranches.length > 0) {
              this.childBranch = this.childBranches[0].branch_code;
              this.childLocationSelected(this.childBranch);
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  ticketSelect(event: any, sTicket: any) {
    if (event === true) {
      if(this.selectedPartsList.length > 0) {
        const isSameBranch =  this.selectedPartsList.find((x: { drop_branch_code: any; }) => x.drop_branch_code == sTicket.drop_branch_code);
        if(isSameBranch === undefined) {
          alert ('You cannot select the ticket of diffrent Branch');
          sTicket.isSelectPart = false;
        } else {
          this.selectedPartsList.push(sTicket);
        }
      } else if(this.selectedPartsList.length === 0) {
        this.selectedPartsList.push(sTicket);
      }
    } else {
      for (let k = 0; k < this.selectedPartsList.length; k++) {
        if ((this.selectedPartsList[k].id === sTicket.id)) {
          this.selectedPartsList.splice(k, 1);
          break;
        }
      }
      for (let i = 0; i < this.partList.length; i++) {
        if ((this.partList[i].id === sTicket.id)) {
          this.partList[i].isSelectPart = false;
          break;
        }
      }
    }
  }

  getGDriveImages(ticketId: any) {
    let result: any;
    const RCOImages: any = [];
    this.dataService.getDriveFiles(ticketId)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.gDriveData = result.images;
            for (let i = 0; i < this.gDriveData.length; i++) {
              if (this.gDriveData[i].type === 'RCO') {
                RCOImages.push(this.gDriveData[i]);
              }
            }
            if (RCOImages.length >= 6) {
              this.isEligibleRC = true;
            } else {
              this.isEligibleRC = false;
            }
          }
        });
  }

  /* addPart() {
    // this.showSelectedList = true;
    if (this.selectedPartListTemp.length !== 0) {
      for (let i = 0; i < this.selectedPartListTemp.length; i++) {
        this.selectedPartList.push(this.selectedPartListTemp[i]);
        this.showSelectedList = true;
      }
    } else {
      alert('Select at-least one Part');
    }
    this.ticketId = '';
  } */

  deleterow(idx: any) {
    // this.selectedPartList.splice(idx, 1);
  }

  goToForm() {

    localStorage.setItem('partlist', JSON.stringify(this.selectedPartsList));
    this.router.navigate(['dc/dc-form']);
  }

  getPUDtickets() {
    this.results = [];
    this.dataService.getPUDtickets(this.dropLocationFlag)
      .subscribe(
        (data) => {
          this.loading = false;
          this.results = data;
          this.pudTickets = this.results;
        });
  }

  childLocationSelected(event: any) {
    this.pudTickets = this.results.filter((data: any) => {
      return data.pickup_branch_code === event;
    });
  }
}
