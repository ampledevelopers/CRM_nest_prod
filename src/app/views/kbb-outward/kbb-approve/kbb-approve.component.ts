import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { KbbOutwardService } from '../kbb-outward.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../shared/user.service';
import { ExcelService } from '../../reports/excel.service';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface SimpleAlert {
  title: any;
  msg: any;
}
@Component({
  selector: 'app-kbb-approve',
  templateUrl: './kbb-approve.component.html',
  styleUrls: ['./kbb-approve.component.scss', '../../../../scss/customstyle.css'],
  standalone: false
})
export class KbbApproveComponent implements OnInit {
  isReadOnlyMode: boolean = true;
  loading = true;
  error = '';
  buttonSpin = false;
  bcolor = false;
  status = '';
  ticketSearch = '';
  nrdcSearch = '';
  awbSearch = '';
  showList = false;
  kbbList: any = [];
  ticketKbb: any = [];
  data: any = [];
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  userRole = localStorage.getItem('userRole');
  isApprover: any;
  isView = true;
  viewNrdcNo = '';
  notfilled = false;
  KBBShipperApprover = false;
  shippedNRDC = '';
  shippedNRDCRemarks = '';
  p: number[] = [];
  bulkReturnId = '';
  toteSearch: any = '';
  tagSearch: any = '';
  labelPrint = true;
  isSingleItem = false;
  imageSrc: string = '';
  selectedFiles: any;
  showShippedButton = false;
  userBranch = localStorage.getItem('branchCode');
  branchType = localStorage.getItem('branchType');
  constructor(public dataService: KbbOutwardService, private modalService: NgbModal, private router: Router, private userService: UserService, private excelService: ExcelService) {
    if ((this.userRole === '2') || (this.userRole === '18') || (this.userRole === '10')) {
      this.KBBShipperApprover = true;
    }
  }

  ngOnInit() {
    if ((this.userRole === '2') || (this.userRole === '3') || (this.userRole === '10') || (this.userRole === '6') || (this.userRole === '8') || (this.userRole === '18')) {
      this.isApprover = true;
      this.getKbbList('', '', 'N');
      this.isView = false;
      this.status = '2';
    } else {
      this.isApprover = false;
      this.isView = true;
      this.getKbbList('', '', 'Y');
      this.status = '1';
    }
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  getKbbList(nrdc: any, ticket: any, status: any) {
    let result: any;
    const ewayList: any = [];
    this.dataService.getKbbList(nrdc, ticket, status)
      .subscribe(
        (data) => {
          result = data;
          this.buttonSpin = false;
          if (result.status === true) {
            this.loading = false;
            this.data = result.kbb.hd;
            if (ticket !== '') {
              if (this.userRole === '15') {
                for (let i = 0; i < this.data.length; i++) {
                  if (this.data[i].total_value >= '50000.00') {
                    ewayList.push(this.data[i]);
                  }
                }
                if (ewayList.length !== 0) {
                  this.data = ewayList;
                  this.ticketKbb = this.data;
                  this.showList = true;
                } else {
                  this.showList = false;
                }
              } else {
                this.ticketKbb = this.data;
                this.showList = true;
              }
            } else {
              if (this.userRole === '15') {
                for (let i = 0; i < this.data.length; i++) {
                  if (this.data[i].total_value >= 50000.00) {
                    ewayList.push(this.data[i]);
                  }
                }
                if (ewayList.length !== 0) {
                  this.data = ewayList;
                  this.kbbList = this.data;
                  this.showList = true;
                } else {
                  this.showList = false;
                }
              } else {
                this.kbbList = this.data;
                this.showList = true;
              }
            }
          } else {
            alert(result.message);
            this.loading = false;
            this.showList = false;
          }
        });
  }

  filterByToteAndTag() {
    let filtered = [...this.kbbList];

    if (this.toteSearch || this.tagSearch) {
      filtered = filtered.filter(item => {
        const toteDetails = item.tote_box_details || [];

        return toteDetails.some((tote: any) =>
          (this.toteSearch && tote.toteId.toLowerCase().includes(this.toteSearch.toLowerCase())) ||
          (this.tagSearch && tote.tagId.toLowerCase().includes(this.tagSearch.toLowerCase()))
        );
      });
    }

    this.data = filtered;
  }

  searchNrdc(event: any) {
    let nrdcData: any;
    this.awbSearch = '';
    this.ticketSearch = '';
    if (event.keyCode === 8) {
      this.nrdcSearch = '';
      this.data = this.kbbList;
    }
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      for (let i = 0; i < this.kbbList.length; i++) {
        nrdcData = _.filter(this.kbbList, row => row.id.toLowerCase().indexOf(this.nrdcSearch) > -1);
      }
      this.data = nrdcData;
    }
  }

  searchTicket(event: any) {
    this.nrdcSearch = '';
    this.awbSearch = '';
    if (event.keyCode === 8) {
      this.ticketSearch = '';
      this.data = [];
      if (this.status === '1') {
        this.getKbbList('', '', 'Y');
      } else {
        this.getKbbList('', '', 'N');
      }
    }
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.getKbbList('', this.ticketSearch, '');
    }
  }

  searchAwb(event: any) {
    this.nrdcSearch = '';
    this.ticketSearch = '';
    let awbData: any;
    if (event.keyCode === 8) {
      this.awbSearch = '';
      this.data = this.kbbList;
    }
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      for (let i = 0; i < this.kbbList.length; i++) {
        awbData = _.filter(this.kbbList, row => row.awb_no.toLowerCase().indexOf(this.awbSearch) > -1);
      }
      this.data = awbData;
    }
  }

  statusChange(event: any) {
    this.data = [];
    if (event === '1') {
      this.getKbbList('', '', 'Y');
      this.isView = true;
    } else {
      this.getKbbList('', '', 'N');
      this.isView = false;
    }
  }

  goToForm(nrdcNo: any) {
    localStorage.setItem('nrdcNo', nrdcNo);
    // localStorage.setItem('isApprover', '1');
    // this.router.navigate(['kbb-outward/kbbform']);
    this.router.navigate(['kbb-outward/kbbform'], { queryParams: { from: 'approver' } });
  }

  viewKbb(sPart: any, view_alert_temp: TemplateRef<any>) {
    if (sPart.return_to == 'rc') {
      this.labelPrint = false
    } else {
      this.labelPrint = true;
    }
    if (sPart.total_items === '1') {
      this.isSingleItem = true;
    } else {
      this.isSingleItem = false;
    }
    this.viewNrdcNo = sPart.id;
    this.bulkReturnId = sPart.bulk_return_id;
    this.openModal(view_alert_temp);
  }

  printNrdc() {
    this.modalService.dismissAll();
    this.dataService.viewKbb(this.viewNrdcNo).subscribe({
      next: (data: Blob) => {
        const tab = window.open();
        if (tab) {
          tab.location.href = URL.createObjectURL(data);
        }
      },
      error: (error: any) => this.error = error
    });
  }

  kbbShipped(nrdcId: any, shippedRemarks: TemplateRef<any>) {
    this.shippedNRDC = nrdcId;
    this.openModal(shippedRemarks);
  }

  kbbShippedConfirm(remarks: any) {
    if (remarks !== '') {
      let result: any;
      this.dataService.shipmentConfirm(this.shippedNRDC, remarks)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              alert('Shipment completed and and Tickets are successfully moved to Pending Receipt at RC');
            }
          });
    } else {
      this.notfilled = true;
    }
  }

  printReturnLabels() {
    const request$ = this.isSingleItem
      ? this.dataService.labelSinglePrint(this.viewNrdcNo, this.bulkReturnId)
      : this.dataService.labelPrint(this.viewNrdcNo, this.bulkReturnId);

    request$.subscribe({
      next: async (data: Blob) => {
        const headText = await data.slice(0, 32).text();
        if (headText.trim().startsWith('{')) {
          try {
            const json = JSON.parse(await data.text());
            alert(json.message || 'GSX Error, Please try again');
          } catch {
            alert('GSX Error, Please try again');
          }
          return;
        }

        const bytes = new Uint8Array(await data.slice(0, 5).arrayBuffer());
        const isZip = bytes[0] === 0x50 && bytes[1] === 0x4B;
        const fileId = this.bulkReturnId || this.viewNrdcNo;
        if (isZip) {
          saveAs(data, `bulk-return-labels-${fileId}.zip`);
          return;
        }
        const fileUrl = URL.createObjectURL(data);
        const tab: any = window.open();
        if (tab) {
          tab.location.href = fileUrl;
        } else {
          saveAs(data, `return-label-${fileId}.pdf`);
        }
      },
      error: (error: any) => this.error = error
    });
  }

  printPackingList() {
    this.dataService.packListPrint(this.viewNrdcNo, this.bulkReturnId)
      .subscribe({
        next: async (data: Blob) => {
          const head = await data.slice(0, 32).text();
          if (head.trim().startsWith('{')) {
            try {
              const json = JSON.parse(await data.text());
              alert(json.message || 'GSX Error, Please try again');
            } catch {
              alert('GSX Error, Please try again');
            }
            return;
          }
          const fileUrl = URL.createObjectURL(data);
          const tab: any = window.open();
          if (tab) {
            tab.location.href = fileUrl;
          } else {
            saveAs(data, `packing-list-${this.bulkReturnId || this.viewNrdcNo}.pdf`);
          }
        },
        error: (error: any) => this.error = error
      });
  }

  getFileDetails(ticketId: any) {
    this.buttonSpin = true;
    let result: any;
    this.userService.getS3FileDetails(ticketId)
      .subscribe(
        (data) => {
          result = data;
          if ((result.status === true) && (result.images.length !== 0)) {
            const videoFile = result.images.filter((item: { file_id: any; }) => item.file_id.includes('video'));
            const objectKey = videoFile[0].folder + '/' + videoFile[0].file_id;
            this.downloadVideo(videoFile[0].bucket_name, objectKey, ticketId);
          } else {
            alert('KBB Packing Video/Image is not available')
            this.buttonSpin = false;
          }
        });
  }

downloadZippedImages(ticketId: any) {
  this.buttonSpin = true;

  this.userService.getS3FileDetails(ticketId).subscribe({
    next: async (data: any) => {
      if (data?.status && data.images?.length > 0) {
        const zip = new JSZip();

        // Map all downloadImage promises
        const downloadPromises = data.images.map(async (img: any) => {
          const objectKey = img.folder + '/' + img.file_id;
          const fileName = img.file_id;

          try {
            // Reuse your existing downloadImage logic to get the blob
            const imageBlob = await this.userService.getVideoObjectFromS3(img.bucket_name, objectKey);

            // Add to ZIP
            zip.file(fileName, imageBlob);
          } catch (err) {
            console.error(`Failed to fetch image ${fileName}`, err);
          }
        });

        // Wait for all images to be fetched
        await Promise.all(downloadPromises);

        // Generate and save ZIP
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, `ticket_${ticketId}_images.zip`);
          this.buttonSpin = false;
        });

      } else {
        alert('No KBB Packing Images available');
        this.buttonSpin = false;
      }
    },
    error: (error) => {
      console.error('Error getting image data:', error);
      this.buttonSpin = false;
    }
  });
}

  getImageDetails(ticketId: any) {
    this.buttonSpin = true;
    let result: any;

    this.userService.getS3FileDetails(ticketId).subscribe(
      (data) => {
        result = data;
        if ((result.status === true) && (result.images.length !== 0)) {
          const imagesToDownload = result.images;
          imagesToDownload.forEach((img: { folder: string; file_id: string; bucket_name: any; side: any }, index: number) => {
            const objectKey = img.folder + '/' + img.file_id;
            // const filename = `image_${index + 1}.jpeg`;
            // let name = img.file_id;
            const filename = img.file_id;
            this.downloadImage(img.bucket_name, objectKey, filename);
          });
        } else {
          alert('KBB Packing Image is not available');
          this.buttonSpin = false;
        }
      },
      (error) => {
        console.error('Error fetching image details:', error);
        this.buttonSpin = false;
      }
    );
  }

  async downloadImage(bucket: any, objectKey: any, fileName: string) {
    try {
      const imageBlob = await this.userService.getVideoObjectFromS3(bucket, objectKey);
      const url = URL.createObjectURL(imageBlob);
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = url;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(anchor);
    } catch (error) {
      alert('Error downloading image: ' + error);
      console.error('Error downloading image:', error);
    } finally {
      this.buttonSpin = false;
    }
  }

  async downloadVideo(bucket: any, objectKey: any, ticketId: any) {
    let fileName = ticketId + 'video.mp4'; // Specify the desired filename for the downloaded video

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
    if (event.target.files && event.target.files.length) {
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
      let bucketName = 'kbb-kgb-video';
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear()).padStart(2, '0');
      const folder = year + '/' + month + '/' + day + '/' + this.shippedNRDC;
      const extension = this.selectedFiles.type.split('/')[1];
      // const timeStamp = Date.now();

      const hours = today.getHours();
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const seconds = String(today.getSeconds()).padStart(2, '0');

      const timeStamp = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
      // const filename = 'delivery_'+timeStamp+'.'+extension;
      const filename = 'delivery_' + this.shippedNRDC + '_' + timeStamp + '.' + extension;
      this.userService.uploadVideoS3Bucket(this.selectedFiles, bucketName, folder, filename)
        .then((fileUrl) => {
          this.updateS3Data(filename);
        })
        .catch((error) => {
          alert('Error uploading file:' + error);
          console.error('Error uploading file:', error);
        });
    } else {
      alert('Image is not selected');
    }
  }

  updateS3Data(filename: any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year + '/' + month + '/' + day + '/' + this.shippedNRDC;
    const extension = this.selectedFiles.type.split('/')[1];
    let commonData = '&ticket_id=' + this.shippedNRDC + '&type=' + 'KBB' + '&side=' + 'Delivery' + '&bucket_name=' + 'kbb-kgb-video' + '&name=' + filename + '&folder=' + folder;
    this.userService.updateS3File(commonData)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          this.showShippedButton = true;
          alert('KBB video/image have been uploaded successfully');
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  exportExcel() {
    let result: any;
    this.dataService.getKbbList(this.viewNrdcNo, '', '')
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            let dataToDownload = result.kbb.dt;
            this.excelService.exportAsExcelFile(dataToDownload, this.viewNrdcNo + '_' + 'KBB Part List');
          }
          else {
            alert('No part details are not available');
          }
        });
  }
}
