import { Component } from '@angular/core';
import { S3fileUploadService } from './s3file-upload.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-s3file-upload',
    templateUrl: './s3file-upload.component.html',
    styleUrls: ['./s3file-upload.component.scss', '../../../scss/customstyle.css'],
    standalone: true,
    imports: [
      FormsModule,CommonModule
    ],
      providers: [S3fileUploadService, UserService]

})
export class S3fileUploadComponent {
  buttonSpin = false;
  dcolor = false;
  awbNo : any = '';
  imageSrc: string = '';
  selectedFiles: any;
  error: any;

  constructor(private dataService: S3fileUploadService, public httpClient: HttpClient, private userService: UserService){
  }

  onImagePicked(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
      this.selectedFiles = file;
    }
  }

  onVideoUpload() {
    this.buttonSpin = true;
    if (this.selectedFiles) {
      if(this.awbNo !== ''){
      const bucketName = 'kbb-kgb-video';
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear()).padStart(2, '0');
      const folder = year+ '/' + month+ '/' +day + '/' + this.awbNo;

      this.userService.uploadVideoS3Bucket(this.selectedFiles, bucketName, folder)
        .then((fileUrl) => {
          this.updateS3Data(this.awbNo);
        })
        .catch((error) => {
          alert('Error uploading file:' + error);
          console.error('Error uploading file:', error);
        });
      }else{
        alert('AWB No required');
      }
    } else {
      alert('Video is not selected');
    }
  }

  updateS3Data(awbNo:any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year+ '/' + month+ '/' +day + '/' + awbNo;
    const extension =  this.selectedFiles.type.split('/')[1];
    const filename = 'video.'+extension;
    const commonData = '&ticket_id=' + awbNo + '&type=' + 'KBB' + '&side=' + '' + '&bucket_name=' + 'kbb-kgb-video' + '&name=' + filename + '&folder=' + folder;

    this.userService.updateS3File(commonData)
    .subscribe({
      next: (data: any) => {
      this.buttonSpin = false;
       alert('KBB video have been uploaded successfully');
       this.selectedFiles = '';
       this.awbNo = '';
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }
}
