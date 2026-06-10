import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import {UserService} from '../../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    templateUrl: './certificate-register.component.html',
    styleUrls: ['./certificate-register.component.scss'],
    providers: [],
    standalone: false
})
export class CertificateRegisterComponent {
  buttonSpin = false;
  error: any;
  submitted = false;
  formErrors: any;
  userId: any;
  certificateList: any = [];
  certificates: any = [];
  certificatesTemp: any = [];
  certificateFlag = true;
  certificationGroups = [
    {label: 'Onboarding', value: 'Onboarding'},
    {label: 'AASP Program', value: 'AASP Program'},
    {label: 'Channel Health', value: 'Channel Health'}
  ];
  certificationGroup: any;
  certificationId: any;
  certificationName = '';
  certificateComplitionDate: any;
  dcolor = false;
  selectedFile: any;
  imageTemp: any = [];
  @ViewChild('certificateInput', {static: true}) certificateInputVariable!: ElementRef;
  constructor(private userService: UserService, private router: Router, private datePipe: DatePipe
  ) {
    this.getCertificates();
    const date = new Date();
    this.certificateComplitionDate = this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getCertificates() {
    let result: any;
    this.userService.getCertificates().subscribe({ next: (data: any) => {
      result = data;
      if (result.status === true) {
        this.certificates = result.items;
        for (let i = 0; i < this.certificates.length; i++) {
          this.certificatesTemp.push({
            certification_group: this.certificates[i].certification_group,
            label: this.certificates[i].certification_id + ' - ' + this.certificates[i].certification_name,
            value: this.certificates[i].certification_id
          });
        }
      }
    },
    error:(error: HttpErrorResponse) => {
    alert(result.message);
  }});
  }

  selectCertificateGroup(groupName: any) {
    this.certificateList = this.certificatesTemp.filter((item: { certification_group: any; }) => item.certification_group === groupName);
    this.certificateFlag = false;
  }

  onFileUploadfun(event: any) {
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

  onReset() {
    this.submitted = false;
  }

  onSubmit() {
    this.buttonSpin = true;
    // if ((this.certificationGroup !== '') ||  )
    const today = new Date().toDateString();
    const docs: any = [];
    if (this.imageTemp.length !== 0) {
      docs.push({
        file_name: this.imageTemp.name,
        extension: this.imageTemp.type.split('/')[1],
        date: today,
        file: this.selectedFile,
      });
    } else {
      this.dcolor = true;
      this.buttonSpin = false;
    }

    let result: any;
      this.userService.certificateRegister(docs, this.certificationGroup, this.certificationId, this.certificateComplitionDate)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.certificationGroup = '';
            this.certificationId = '';
            const date = new Date();
            this.certificateComplitionDate = this.datePipe.transform(date, 'yyyy-MM-dd');
            this.imageTemp = [];
            this.certificateInputVariable.nativeElement.value = '';
            alert(result.message);
            this.buttonSpin = false;
          } else {
            alert(result.message);
            this.buttonSpin = false;
          }
      });
  }

}
