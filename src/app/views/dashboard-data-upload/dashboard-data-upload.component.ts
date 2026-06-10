import { DatePipe } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardDataUploadService } from './dashboard-data-upload.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-dashboard-data-upload',
    templateUrl: './dashboard-data-upload.component.html',
    styleUrls: ['./dashboard-data-upload.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class DashboardDataUploadComponent {
  @ViewChild('fileInput', {static: true}) fileInputVariable!: ElementRef;
  buttonSpin = false;
  error: any;
  formErrors: any;
  userId: any;
  dcolor = false;
  selectedFile: any;
  imageTemp: any = [];
  documentType: any = 'Select document type';
  userRole;
  typeSelected = true;

  constructor(public dataService: DashboardDataUploadService,
    private router: Router, private datePipe: DatePipe){
    this.userRole = localStorage.getItem('userRole');

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
      this.typeSelected = true;
      const date = new Date();
      let csatDocUploadDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      const docs: any = [];
      console.log(this.documentType);
      if (this.imageTemp.length !== 0 && this.documentType !== 'Select document type') {
        this.buttonSpin = true;
        docs.push({
          document_type: this.documentType,
          file_name: this.imageTemp.name + '_' + csatDocUploadDate,
          extension: this.imageTemp.type.split('/')[1],
          file: this.selectedFile,
        });
        let result: any;
        this.dataService.uploadCsatDocs(docs)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              const date = new Date();
              csatDocUploadDate = this.datePipe.transform(date, 'yyyy-MM-dd');
              this.imageTemp = [];
              this.fileInputVariable.nativeElement.value = '';
              alert(result.message !== undefined? result.message : 'File Uploaded Successfully');
              this.buttonSpin = false;
              this.documentType = '';
            } else {
              this.buttonSpin = false;
              alert(result.message !== undefined? result.message : 'File Upload Failed!');
            }
        });
      } else {
        if(this.imageTemp.length === 0) {
          this.dcolor = true;
          this.buttonSpin = false;
        } else {
           this.typeSelected = false;
           this.buttonSpin = false;
        }
      }
    }
  }
