import { Component } from '@angular/core';
import { CustomerCareService } from '../customer-care.service';

@Component({
    selector: 'app-check-warranty',
    templateUrl: './check-warranty.component.html',
    styleUrls: ['./check-warranty.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class CheckWarrantyComponent {
  public SerialNo = '';
  error: any;
  data: any = [];
  constructor(
    public dataService: CustomerCareService,
  ) { }

  load() {
   if (this.SerialNo === '') {
      alert('Please enter the Serial Number');
      return;
    } else {
      // alert(this.toDate);
      this.getWarrantyDetails();
      }
    }

    getWarrantyDetails() {
      let result;
      // let calltype;
      /* this.dataService.getWarrantyDetails(this.SerialNo)
        .subscribe(
          (data) => {
              result = data;
              if (result.status === true && result.data.length > 0)  {
                this.data = result.data;
                }
        }, // success path
        error => this.error = error // error path
      ); */

     /*  this.dataService.getWarrantyDetails(this.SerialNo)
        .subscribe(
          (data): void => {
              result = data;
              if (result.status === true && result.data.length > 0)  {
                this.data = result.data;
                }
        }, // success path
        error => this.error = error // error path
      ); */
}

clear() {
  this.SerialNo = '';
}
}
