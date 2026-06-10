import { Component, TemplateRef } from '@angular/core';
import { AcseFormService } from './acse-form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-acse-form',
    templateUrl: './acse-form.component.html',
    styleUrls: ['./acse-form.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class AcseFormComponent {
  error: any;
  loading = true;
  buttonSpin = false;
  branches: any = [];
  acseData: any = [];
  branch = 'Select Branch';
  family = '';
  branchId = '';
  // weekNo = '';
  userRole = localStorage.getItem('userRole');
  buttonName = 'Save';
  macReptatRepair = '';
  macEligibleRepair = '';
  macRepairPpr = '';
  macPprEligibleRepair = '';
  macRepeatedSerials = '';
  macLoopedRepairs = '';
  iphoneReptatRepair = '';
  iphoneEligibleRepairs = '';
  iphoneSdrEvents = '';
  iphoneSdr = '';
  iphoneNtf = '';
  iphoneNoTrouble = '';
  iphoneSurRepairs = '';
  iphoneSurOpp = '';

  constructor(
    public dataService: AcseFormService,
    private modalService: NgbModal) {
    this.getBranches();
  }

  openModal(template: any) {

    this.modalService.open(template, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.buttonSpin = false;
    this.modalService.dismissAll();
  }


  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.branches = result.branch;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: string) {
    this.branchId = event;
  }

  selectProductFamily(event: string) {
    this.family = event;
  }

  cancel() {
    this.branch = 'Select Branch';
    this.family = '';
    this.buttonName = 'Save';
    this.macReptatRepair = '';
    this.macEligibleRepair = '';
    this.macRepairPpr = '';
    this.macPprEligibleRepair = '';
    this.macRepeatedSerials = '';
    this.macLoopedRepairs = '';
    this.iphoneReptatRepair = '';
    this.iphoneEligibleRepairs = '';
    this.iphoneSdrEvents = '';
    this.iphoneSdr = '';
    this.iphoneNtf = '';
    this.iphoneNoTrouble = '';
    this.iphoneSurRepairs = '';
    this.iphoneSurOpp = '';
  }

  save(family: string, acseScore_temp: TemplateRef<any>) {
    if (this.userRole === '11' && this.branch === 'Select Branch') {
      alert('Please select the Branch');
      this.buttonSpin = false;
      return;
    } else {
      if (family === 'mac') {
        this.MacACSEDetails(acseScore_temp);
      }
      if (family === 'iphone') {
        this.iPhoneACSEDetails(acseScore_temp);
      }
    }
  }

  MacACSEDetails(acseScore: TemplateRef<any>) {
    this.buttonSpin = true;
    let result;
    this.dataService.addMacACSEdetails(this.branch, this.family, this.macReptatRepair, this.macEligibleRepair, this.macRepairPpr, this.macPprEligibleRepair, this.macRepeatedSerials, this.macLoopedRepairs)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === 'add') {
            this.buttonSpin = false;
            alert(result.message);
            this.cancel();
          } else {
            this.acseData = result.data
            this.openModal(acseScore);
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  iPhoneACSEDetails(acseScore: TemplateRef<any>) {
    this.buttonSpin = true;
    let result;
    this.dataService.addiPhoneACSEdetails(this.branch, this.family, this.iphoneReptatRepair, this.iphoneEligibleRepairs, this.iphoneSdrEvents, this.iphoneSdr, this.iphoneNtf, this.iphoneNoTrouble, this.iphoneSurRepairs, this.iphoneSurOpp)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === 'add') {
            this.buttonSpin = false;
            alert(result.message);
            this.cancel();
          } else {
            this.acseData = result.data
            this.openModal(acseScore);
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  confirmAcseScore() {
    this.buttonSpin = true;
    let result;
    if (this.family == 'iphone') {
      this.dataService.updateiPhoneACSEdetails(this.branch, this.family, this.iphoneReptatRepair, this.iphoneEligibleRepairs, this.iphoneSdrEvents, this.iphoneSdr, this.iphoneNtf, this.iphoneNoTrouble, this.iphoneSurRepairs, this.iphoneSurOpp)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === 'update') {
              this.buttonSpin = false;
              alert(result.message);
              this.cancel();
              this.cancelModel();
            } else {
              this.buttonSpin = false;
              alert('Record Update Failed');
              this.cancel();
              this.cancelModel();
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
    if (this.family == 'mac') {
      this.dataService.updateMacACSEdetails(this.branch, this.family, this.macReptatRepair, this.macEligibleRepair, this.macRepairPpr, this.macPprEligibleRepair, this.macRepeatedSerials, this.macLoopedRepairs)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === 'update') {
              this.buttonSpin = false;
              alert(result.message);
              this.cancel();
              this.cancelModel();
            } else {
              this.buttonSpin = false;
              alert('Record Update Failed');
              this.cancel();
              this.cancelModel();
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
  }
}
