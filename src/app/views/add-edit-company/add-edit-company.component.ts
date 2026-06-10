import { Component, OnInit } from '@angular/core';
import { AddEditCompanyService } from './add-edit-company.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-add-edit-company',
    templateUrl: './add-edit-company.component.html',
    styleUrls: ['./add-edit-company.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class AddEditCompanyComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  loading = false;
  buttonSpin = false;
  nameSearch = '';
  error = '';
  data: any = [];
  orgName = '';
  address1 = '';
  address2 = '';
  city = '';
  state = '';
  pin = '';
  isCompany = false;
  status = 'Select Status';
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  constructor(private modalService: NgbModal, public dataService: AddEditCompanyService) { }

  ngOnInit() {

    this.dtTrigger.next({})
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    }

    let result: any;
    this.dataService.getCompanies()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.data = result.company;
          } else {
            alert(result.message);
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  createOrg() {
    let result: any;
    this.dataService.createOrg(this.orgName, this.address1, this.address2, this.city, this.state, this.pin)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            alert(result.message);
            this.clear();
          } else {
            alert(result.message);
          }
          this.loading = false;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  updateOrg() {

  }

  loadOrg() {

  }

  clear() {
    this.orgName = '';
    this.address1 = '';
    this.address2 = '';
    this.city = '';
    this.state = '';
    this.pin = '';
    this.isCompany = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }
  OnInit() {

  }

}
