import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerDisSatService } from './customer-dis-sat.service';
import * as _ from 'lodash';
@Component({
  templateUrl: './customer-dis-sat.component.html',
  styleUrls: ['./customer-dis-sat.component.scss'],
  providers: [],
  standalone: false
})
export class CustomerDisSatComponent {
  buttonSpin = false;
  error: any;
  formErrors: any;
  userId: any;
  dcolor = false;
  selectedFile: any;
  imageTemp: any = [];
  @ViewChild('fileInput', {static: true}) fileInputVariable!: ElementRef;
  constructor(public dataService: CustomerDisSatService, private router: Router, private datePipe: DatePipe
  ) {
  }

  onFileUploadfun(event: { target: { files: string | any[]; }; }) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
          this.imageTemp = event.target.files[0];
          reader.readAsDataURL(this.imageTemp);
          reader.onload = () => {
            this.selectedFile = reader.result;
            this.dcolor = false;
          };
      }
    }
  }

  onSubmit() {
    this.buttonSpin = true;
    const date = new Date();
    let certificateComplitionDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    const docs: any = [];
    if (this.imageTemp.length !== 0) {
      docs.push({
        file_name: this.imageTemp.name,
        extension: this.imageTemp.type.split('/')[1],
        date: certificateComplitionDate,
        file: this.selectedFile,
      });


      let result: any;
      this.dataService.uploadDisSat(docs, certificateComplitionDate)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            // tslint:disable-next-line:no-shadowed-variable
            const date = new Date();
            certificateComplitionDate = this.datePipe.transform(date, 'yyyy-MM-dd');
            this.imageTemp = [];
            this.fileInputVariable.nativeElement.value = '';
            alert(result.message);
            this.buttonSpin = false;
          } else {
            this.buttonSpin = false;
            alert(result.message);
          }
      });

    } else {
      this.dcolor = true;
      this.buttonSpin = false;
    }
  }

}
