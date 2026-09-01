import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnsiteDcService } from '../onsite-dc.service';

@Component({
    selector: 'app-view-dc',
    templateUrl: './view-dc.component.html',
    styleUrls: ['./view-dc.component.scss'],
    standalone: false
})
export class ViewDcComponent {
  branchCode = localStorage.getItem('branchCode');
  dcTickets: any = [];
  branches: any;
  results: any;
  selectedBranch: any;
  branchesList: any = [];
  branchListTemp: any;
  branch: any;
  dropLocationFlag = localStorage.getItem('drop_location_flag');
  childBranch: any;
  constructor(private modalService: NgbModal, private router: Router, public dataService: OnsiteDcService){
    this.getPudDcTickets();
    setTimeout(() => {
      this.getOptions();
    }, 1000);
  }
  getPudDcTickets(){
    this.dataService.getPudDcTickets()
         .subscribe(
           (data: any) => {
            this.results = data.dc.hd;
            this.dcTickets = data.dc.hd;
           });
  }

  downloadDC(dcNo: any) {
    const url = localStorage.getItem('nestUrl') + 'mis/pud_dc_print?X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + dcNo + '&user_id=' + localStorage.getItem('userId');
    const tab = window.open(url);
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
            if(this.dropLocationFlag === '0') {
              this.branchesList = this.branchListTemp.filter((data: any) => {
                return data.drop_location_flag === '1' && data.parent_location_id === this.branch[0].id;
              });
            } else {
              this.branchesList = this.branchListTemp.filter((data: any) => {
                return data.drop_location_flag === '0' && data.id === this.branch[0].parent_location_id;
              });
            }
            this.branchesList = this.branchesList.concat(this.branch);
            this.selectedBranch = this.branch[0].branch_code;
            this.locationSelected(this.selectedBranch);
        }, // success path
        error: error => error // error path
  });
  }

  locationSelected(event: any) {
    this.dcTickets = this.results.filter((data: any) => {
      return (data.branch_code === event);
    });
  }

}
