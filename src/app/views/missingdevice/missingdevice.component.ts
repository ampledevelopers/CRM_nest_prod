import { Component } from '@angular/core';
import { MissingDeviceService } from './missingdevice.service' ;

@Component({
    selector: 'app-missingdevice',
    templateUrl: './missingdevice.component.html',
    styleUrls: ['./missingdevice.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class MissingDeviceComponent {
  error: any;
  loading = true;
  buttonSpin = false;
  userRole = localStorage.getItem('userRole');
  serialNo = '';
  customerName = '';
  companyName = '';
  phoneNo = '';
  emailId = '';
  statusList: any = [
    {label: 'Select Lost Status', value: 'Select Lost Status'},
    {label: 'Missing', value: 'missing'},
    {label: 'Found', value: 'found'},
    {label: 'Cancelled', value: 'cancelled'},
    {label: 'Closed', value: 'closed'},
  ];
  lostStatus = 'Select Lost Status';
  constructor(
    public dataService: MissingDeviceService) {
  }


  cancelModel() {
    this.buttonSpin = false;
  }


   cancel() {
    this.serialNo = '';
    this.customerName = '';
    this.companyName = '';
    this.phoneNo = '';
    this.emailId = '';
    this.lostStatus = 'Select Lost Status';
  }

  save() {
    if ((this.serialNo !== '') || (this.customerName !== '') || (this.phoneNo !== '') || (this.emailId !== '') || (this.lostStatus !== 'Select Lost Status')) {
      const form = '&serial_no=' + this.serialNo + '&customer_name=' + this.customerName + '&company=' + this.companyName + '&phone=' + this.phoneNo + '&email=' +
      this.emailId + '&lost_status=' + this.lostStatus;
      this.dataService.saveMissingDevice(form)
      .subscribe({
        next: (data: any) => {
            const result: any = data;
              if (result.status === true) {
                this.cancel();
              } else {
                alert(result.message);
            }
        }, // success path
        error: error => this.error = error // error path
    });
    } else {
      alert('Enter all mandatory fields');
    }
  }
}
