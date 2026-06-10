import { Component } from '@angular/core';

@Component({
    selector: 'app-cc-enquiry-update',
    templateUrl: './cc-enquiry-update.component.html',
    styleUrls: ['./cc-enquiry-update.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class CcEnquiryUpdateComponent {
  loading = false;
  buttonSpin = false;
  constructor() {

  }

  customerUpdate() {
    localStorage.setItem('isEnquiry', 'false');
  }

  newEnquiry() {
    localStorage.setItem('isEnquiry', 'true');
  }

}
