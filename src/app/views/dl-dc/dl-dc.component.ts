import { Component, TemplateRef } from '@angular/core';
import { DlDcService } from './dl-dc.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-dl-dc',
    templateUrl: './dl-dc.component.html',
    styleUrls: ['./dl-dc.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class DlDcComponent {
  loading = true;
  error: any;
  buttonSpin = false;
  branchCode = localStorage.getItem('branchCode');
  dlBranchFlag = localStorage.getItem('drop_location_flag');
  ticketList: any = [];
  selectedTicketList: any =[];
  selectedTicketListTemp: any = [];
  showSelectedList: any = [];
  createHistory = 'History';
  data: any = [];
  kbbVideoExist = false;
  imageSrc: string = '';
  selectedFiles: any;
  nrdcNo = '';
  shippedNRDC = '';
  notfilled = false;
  carrierMethod = '';
  nrdcOTP = '';
  otp = '';
  otpSent = false;
  eWaybillRequired = false;
  oldEwayBill = '';
  eWayBillNo = '';
  isDisabled = false;
  constructor(public dataService: DlDcService, private router: Router, private userService: UserService, private modalService: NgbModal) {
    this.getTickets();
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getTickets() {
    let branchCode: any = '';
    let dlBranchCode: any = '';
    if (this.dlBranchFlag === '1') {
      dlBranchCode = this.branchCode;
      branchCode = '';
    } else {
      dlBranchCode = '';
      branchCode = this.branchCode;
    }

    let result: any;
    this.ticketList = [];
    this.dataService.getTickets(branchCode, dlBranchCode)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.loading = false;
              const ticketList = result.tickets;
              for(let i = 0; i < ticketList.length; i++) {
                this.ticketList.push({
                  ticket_no: ticketList[i].id,
                  serial_no: ticketList[i].serial_no,
                  description: ticketList[i].description,
                  dl_branch_code: ticketList[i].dl_branch_code,
                  outtime: ticketList[i].outtime,
                  selected: false,
                  value: '',
                  hsn_code:''
                })
              }
            } else {
                this.loading = false;
                alert(result.message);
            }
          });
  }

  history() {
    this.loading = true;
    if (this.createHistory === 'Create') {
      this.getTickets();
      this.createHistory = 'History';
    } else {
      this.createHistory = 'Create';
      this.getNrdc('', '', 'Y');
    }
  }

  unCheckTicket(ticket: any) {
    setTimeout(() => {
      for (let j = 0; j < this.ticketList.length; j++) {
        if (this.ticketList[j].ticket_no === ticket) {
          this.ticketList[j].isSelectPart = false;
        }
      }
    }, 1000);
  }

  ticketSelect(event: any, ticket: any, idx: any) {
    // let isTicketexist: any;
    let kbbImagesExist = false;
    if (event === true) {
      let result: any;
      this.userService.getS3FileDetails(ticket.ticket_no)
        .subscribe(
          (data) => {
            result = data;
            const s3Images = result.images_raf;
            if ((result.status === true) && (s3Images.length !== 0)) {
              if (this.dlBranchFlag === '0') {
                const hldImages = s3Images.filter((item: { type: string; }) => item.type === 'HLD');
                if (hldImages.length >= 2) {
                  kbbImagesExist = true;
                } else {
                  kbbImagesExist = false;
                }
              } else {
                const dlrImages = s3Images.filter((item: { type: string; }) => item.type === 'DLR');
                if (dlrImages.length >= 2) {
                  kbbImagesExist = true;
                } else {
                  kbbImagesExist = false;
                }
              }

              if (!kbbImagesExist) {
                alert('KBB Packing Images are not uploaded. Please upload it.');
                this.unCheckTicket(ticket.ticket_no);
                this.buttonSpin = false;
              } else {
                this.selectedTicketListTemp.push(ticket);
              }

            } else {
              if (!kbbImagesExist) {
                alert('KBB Packing Images are not uploaded. Please upload it.');
                this.unCheckTicket(ticket.ticket_no);
                this.buttonSpin = false;
              } else {
                this.selectedTicketListTemp.push(ticket);
              }
            }
        });
      /* if (this.selectedTicketList.length === 0) {
        this.selectedTicketList.push(ticket);
      } else {
        for (let i = 0; i < this.selectedTicketList.length; i++) {
          if (ticket.id === this.selectedTicketList[i].id) {
            alert('This ticket Part already added in the List');
            this.unCheckTicket(ticket);
            isTicketexist = true;
          } else {
            isTicketexist = false;
          }
        }
        if (isTicketexist === false) {
          this.selectedTicketList.push(ticket);
        }
      } */
    } else {
      for (let k = 0; k < this.selectedTicketListTemp.length; k++) {
        if (this.selectedTicketListTemp[k].ticket_no === ticket.ticket_no) {
          this.ticketList[k].isSelectPart = false;
          this.selectedTicketListTemp.splice(k, 1);
        }
      }
    }
  }

  addTicket() {
    // this.showSelectedList = true;
    if (this.selectedTicketListTemp.length !== 0) {
      for (let i = 0; i < this.selectedTicketListTemp.length; i++) {
        this.selectedTicketList.push(this.selectedTicketListTemp[i]);
        this.showSelectedList = true;
      }
    } else {
      alert('Select at-least one Part');
    }

    this.selectedTicketListTemp = [];
  }

  deleterow(idx: any) {
    this.selectedTicketList.splice(idx, 1);
  }

  goToForm() {
    localStorage.setItem('ticketList', JSON.stringify(this.selectedTicketList));
    this.router.navigate(['dl-dc/dc-form']);
  }

  getNrdc(nrdc: any, ticket: any, status: any) {
    let result: any;
      this.dataService.getKbbList(nrdc, ticket, status)
          .subscribe(
            (data) => {
                result = data;
                this.buttonSpin = false;
                if (result.status === true) {
                  this.loading = false;
                  this.data = result.kbb.hd;
                } else {
                  alert(result.message);
                  this.loading = false;
                }
      });
  }

  viewKbb(nrdc: any, view_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.nrdcNo = nrdc.id;
    this.openModal(view_alert_temp);
  }

  getFileDetails(nrdcId: any) {
    this.buttonSpin = true;
    let result: any;
    this.userService.getS3FileDetails(nrdcId)
      .subscribe(
        (data) => {
          result = data;
          if ((result.status === true) && (result.images.length !== 0)) {
            const objectKey = result.images[0].folder + '/' + result.images[0].file_id;
            this.downloadVideo(result.images[0].bucket_name, objectKey, result.images[0].file_id);
          } else {
            alert('KBB Packing Video is not available')
            this.buttonSpin = false;
          }
      });
  }

  async downloadVideo(bucket: any, objectKey: any, file_id: any) {
    const fileName = 'video.mp4'; // Specify the desired filename for the downloaded video

    try {
      const videoBlob = await this.userService.getVideoObjectFromS3(bucket, objectKey);

      // Create a temporary link to trigger the download
      const url = URL.createObjectURL(videoBlob);

      // Create a hidden anchor element to download the video
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = url;
      anchor.download = fileName; // Specify the desired filename for the downloaded video
      document.body.appendChild(anchor);
      // Trigger the download
      anchor.click();
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
      this.buttonSpin = false;
    } catch (error) {
      alert('Error downloading video:' + error);
      console.error('Error downloading video:', error);
    }
    this.buttonSpin = false;
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
      const bucketName = 'kbb-kgb-video';
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear()).padStart(2, '0');
      const folder = year+ '/' + month+ '/' +day + '/' + this.nrdcNo;
      const extension =  this.selectedFiles.type.split('/')[1];
      let fileName = '';
      if (this.dlBranchFlag === '0') {
        fileName = 'video_HL.' + extension;
      } else {
        fileName = 'video_DL.' + extension;
      }

      this.userService.uploadVideoS3Bucket(this.selectedFiles, bucketName, folder, fileName)
        .then((fileUrl) => {
          this.updateS3Data();
        })
        .catch((error) => {
          alert('Error uploading file:' + error);
          console.error('Error uploading file:', error);
        });
    } else {
      alert('Video is not selected');
    }
  }

  updateS3Data() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year+ '/' + month+ '/' +day + '/' + this.nrdcNo;
    const extension =  this.selectedFiles.type.split('/')[1];
    let fileName = '';
    if (this.dlBranchFlag === '0') {
      fileName = 'video_HL.' + extension;
    } else {
      fileName = 'video_DL.' + extension;
    }
    const commonData = '&ticket_id=' + this.nrdcNo + '&type=' + 'KBB' + '&side=' + '' + '&bucket_name=' + 'kbb-kgb-video' + '&name=' + fileName + '&folder=' + folder;

    this.userService.updateS3File(commonData)
    .subscribe({
      next: (data: any) => {
      this.buttonSpin = false;
      this.kbbVideoExist = true;
      this.shippedNRDC = this.nrdcNo;
       alert('KBB video have been uploaded successfully');
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  kbbShipped(nrdcId: any, totalAmount: any, eWaybill: any, carrier: any, otp: any, shipped_remarks: TemplateRef<any>) {
    this.buttonSpin = true;
    let result: any;
    this.nrdcNo = nrdcId;
    this.carrierMethod = carrier;
    this.nrdcOTP = otp;
    this.oldEwayBill = eWaybill;
    if (parseInt(totalAmount) >= 50000) {
      this.eWaybillRequired = true;
    } else {
      this.eWaybillRequired = false;
    }
    this.userService.getS3FileDetails(nrdcId)
      .subscribe(
        (data) => {
          result = data;
          if ((result.status === true) && (result.images.length !== 0)) {
            this.kbbVideoExist = true;
            this.shippedNRDC = nrdcId;
            this.openModal(shipped_remarks);
          } else {
            this.kbbVideoExist = false;
            this.openModal(shipped_remarks);
          }
      });
  }

  kbbShippedConfirm(remarks: any) {
    if ((this.otp !== '') && (this.otp === this.nrdcOTP)) {
      let result: any;
      this.dataService.shipmentConfirm(this.shippedNRDC, 'Shipment Confirmed', this.oldEwayBill)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            alert('Shipment completed and ticket status has been updated.');
            window.location.reload();
          }
      });
    } else if ((remarks !== '') && (this.carrierMethod === 'Carrier')) {
      if ((this.eWaybillRequired) && (this.eWayBillNo !== '')) {
        let result: any;
        this.dataService.shipmentConfirm(this.shippedNRDC, remarks, this.eWayBillNo)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              alert('Shipment completed and ticket status has been updated.');
              window.location.reload();
            }
        });
      } else if (!this.eWaybillRequired) {
        let result: any;
        this.dataService.shipmentConfirm(this.shippedNRDC, remarks, this.oldEwayBill)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              alert('Shipment completed and ticket status has been updated.');
              window.location.reload();
            }
        });
      } else {
        this.notfilled = true;
      }
    } else {
      this.notfilled = true;
    }
  }

  printNrdc() {
    this.modalService.dismissAll();
    const url = localStorage.getItem('rootUrl') + 'api/pud/print?X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + this.nrdcNo;
    const tab = window.open(url);
  }

  resendOtp() {
    if (!this.shippedNRDC) {
      alert('Invalid NRDC ID');
      return;
    }

    this.dataService.resendOtp(this.shippedNRDC).subscribe({
      next: (res: any) => {
        if (res.status === true) {
          this.otpSent = true;
          this.isDisabled = true;
          this.nrdcOTP = res.otp;
          setTimeout(() => (this.otpSent = false), 3000); // hide "OTP sent" message after 3 sec
          setTimeout(() => (this.isDisabled = false), 20000);

        } else {
          alert(res.message);
          this.isDisabled = false;
          this.otpSent = false;
        }
      },
      error: () => {
        this.buttonSpin = false;
        this.isDisabled = false;
        this.otpSent = false;
        alert('Error sending OTP');
      }
    });
  }


}
