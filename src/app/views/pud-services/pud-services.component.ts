import { Component, TemplateRef } from '@angular/core';
import { PudServicesService } from './pud-services.service';
import { UserService } from '../../shared/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeElementType } from 'angularx-qrcode';
import { QRCodeErrorCorrectionLevel } from "qrcode";
import { SafeUrl } from '@angular/platform-browser';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { round } from 'lodash';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-pud-services',
    templateUrl: './pud-services.component.html',
    providers: [PudServicesService, NgbModal, NgbModalConfig],
    styleUrls: ['./pud-services.component.scss', '../../../scss/customstyle.css'],
    standalone:false
})

export class PudServicesComponent {
  url = 'https://api.icareservice.co.in/gdrive4/google-api-php-client/examples/download.php?fileId=';
  datetime: any = '';
  datePipe = new DatePipe('en-US');
  gDriveData: any = [];
  pudImages: any = [];
  remarks: any = '';
  visibleDamage: any = '';
  diagnosisCharges: any = '';
  buttonLoading = false;
  pack_received_with_damage = false;
  pendingStatus = false;
  pendingList: any = [];
  pendingReason = 'Select Status';
  checked = false;
  drop_assigned: any = 'Select drop person';
  pickupAssigned: any = 'Select pickup person';
  drop_assigned_to: any = [];
  pickupInfo = false;
  dropInfo = false;
  qrCodeLoading = false;
  showRequestDrop = false;
  forMoreTemp = false;
  imageRaf = false;
  image = false;
  pudDoc: any = [];
  dataTemp: any = [];
  usersData: any = [];
  loadingData = false;
  selectedData: any = [];
  imageData: any;
  buttonSpin = false;
  showProduct = false;
  pudImageExist = false;
  gdriveImageExist = false;
  videoUpload = false;
  awbNo: any = '';
  nrdcNo: any = '';
  imageSrc: string = '';
  selectedFiles: any;
  error: any;
  gNumber: any = '';
  maxDate: any;
  minDate: any;
  columns = [
    'ticketId', 'name', 'phone', 'type', 'originLoc', 'HO_Loc', 'status',
    {
      key: 'show',
      label: 'Action',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ]
  // qrcode
  public elementType!: QRCodeElementType;
  public errorCorrectionLevel!: QRCodeErrorCorrectionLevel;
  showQrcode = false;
  public stringQrCode!: string;
  public qrCodeSrc!: SafeUrl;
  public allowEmptyString!: boolean;
  public initial_state = {
    elementType: 'canvas' as QRCodeElementType,
    errorCorrectionLevel: 'M' as QRCodeErrorCorrectionLevel,
    margin: 4,
    scale: 1,
    version: undefined,
    title: 'A custom title attribute',
    width: 300,
  };

  public data_model = {
    ...this.initial_state,
  };
  valuesToQrcode: any = [];
  qrdata: any;
  documents: any;
  userRole;
  fromDatee: any = new Date();
  toDate: any = new Date();


  // PUD Variables
  RCImages1: any;
  RCImages2: any;
  DLImages1: any;
  DLImages2: any;
  showImagesClicked = false;
  showImagess = false;
  editOptions = false;
  editAckRC = false;
  gDrivePickupQrDoc: any;
  gDriveDropQrDoc: any;
  s3PickupQrDoc: any;
  s3DropQrDoc: any;
  prevRow: any;
  selectedTicketId = '';
  errorMessage: any = '';
  showerror = false;
  errorMsg = false;
  userAllData: any = [];
  employees: any;
  customer_name = '';
  custAddress = '';
  AcknowledgeData: any = [];
  productDetails: any = [];
  quotations: any = [];
  serialNo: any = '';
  dropOTP: any = '';
  branchCode: any;
  pickupOTP: any = '';
  ticketId: any;
  selectedVideo: any;
  pudTicketId: any;
  dropLocationFlag = localStorage.getItem('drop_location_flag');
  dlType: any;
  selectedFile: any;
  callId: any;
  gmapTitle = '';
  paynowResult: any;
  paymentStatus = false;
  filename: any;
  exceptionCases:any = [];
  exceptionCase:any = 'Select Exception Case';
  vertices: google.maps.LatLngLiteral[] = [
    {
      lat: 50.082911,
      lng: 14.431411,
    },
    {
      lat: 50.083202,
      lng: 14.430994,
    },
    {
      lat: 50.083352,
      lng: 14.43078,
    },
    {
      lat: 50.083491,
      lng: 14.430569,
    },
    {
      lat: 50.083644,
      lng: 14.430367,
    },
  ];
  icon = {
    url: 'assets/img/marker.png',
    scaledSize: new google.maps.Size(30, 34),
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false, icon: this.icon
  };
  markerPositions: google.maps.LatLngLiteral[] = [
    {
      lat: 50.082911,
      lng: 14.431411,
    },
    {
      lat: 50.083202,
      lng: 14.430994,
    },
    {
      lat: 50.083352,
      lng: 14.43078,
    },
    {
      lat: 50.083491,
      lng: 14.430569,
    },
    {
      lat: 50.083644,
      lng: 14.430367,
    },
  ];
  center: google.maps.LatLngLiteral = this.markerPositions[round(this.markerPositions.length / 2)];
  // zoom = 17;
  mapOptions = {
    streetViewControl: false,
    disableDefaultUI: false,
    zoom: 17,
    center: this.center,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    scrollWheel: true,
    styles: [{
      featureType: "poi",
      stylers: [{ visibility: "off" }]
    }]
  }

  constructor(private dataService: PudServicesService, private modalService: NgbModal, public httpClient: HttpClient, private userService: UserService, private sanitizer: DomSanitizer) {
    this.getdata('start');
    this.qrdata = "hello its me";
    this.datetime = this.datePipe.transform(this.datetime, 'yyyy-MM-dd hh:mm:ss');
    this.userRole = localStorage.getItem('userRole');
    this.callId = localStorage.getItem('callApi');
    this.toDate = new Date();
    this.fromDatee = new Date();
    this.fromDatee.setDate(this.toDate.getDate() - 7);
    this.maxDate = moment({ year: this.toDate.getFullYear(), month: this.toDate.getMonth(), day: this.toDate.getDate() }).format('YYYY-MM-DD');
    this.minDate = moment({ year: this.fromDatee.getFullYear(), month: this.fromDatee.getMonth(), day: this.fromDatee.getDate() }).format('YYYY-MM-DD');
    this.toDate = this.datePipe.transform(this.toDate, 'dd/MM/yyyy');
    this.exceptionCases = ['Approved by Ops Manager'];
  }

  /************ Common Function **************/



  onGenerateQR(locationType?: any) {
    let dropBranch = '';
    let pickupBranch = '';
    this.valuesToQrcode = [];
    if (this.selectedData.pud_type == 'DL') {
      if (locationType == 'DLR') {
        dropBranch = this.selectedData.drop_branch_code;
        pickupBranch = this.selectedData.pickup_branch_code;
      }
      else if (locationType == 'HLD') {
        pickupBranch = this.selectedData.drop_branch_code;
        dropBranch = this.selectedData.pickup_branch_code;
      }
      this.valuesToQrcode.push({
        Name: this.selectedData.customer_name,
        ticketId: this.selectedData.ticket_id,
        serialNo: this.selectedData.serial_no,
        productDescription: this.dataTemp.product_description,
        pickupBranchCode: pickupBranch,
        dropBranchCode: dropBranch,
      });
    } else if (this.selectedData.pud_type === 'D-Call' || this.selectedData.pud_type === 'Ample-PUD') {
      if (locationType === 'DLR' || locationType === 'P_DLR') {
        dropBranch = this.selectedData.drop_branch_code;
        pickupBranch = this.custAddress;
      }
      else if (locationType === 'HLD' || locationType === 'P_HLD') {
        pickupBranch = this.selectedData.drop_branch_code;
        dropBranch = this.custAddress;
      }
      this.valuesToQrcode.push({
        Name: this.selectedData.customer_name,
        ticketId: this.selectedData.ticket_id,
        serialNo: this.selectedData.serial_no,
        productDescription: this.dataTemp.product_description,
        pickup: pickupBranch,
        drop: dropBranch,
      });
    }
    this.qrdata = JSON.stringify(this.valuesToQrcode);
  }

  saveAsImage(parent: any) {
    let filename: any;
    let type: any;
    this.buttonLoading = false;
    let parentElement = null;
    parentElement = parent.qrcElement.nativeElement
      .querySelector('canvas')
      .toDataURL('image/png');
    if (parentElement) {
      const today = new Date().toDateString();
      const qrdocs: any[] = [];

      this.selectedFile = parentElement;
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const file = new Blob([blobData], { type: "image/png" })
      if ((this.selectedData.status === 'Open' && this.s3PickupQrDoc === '' && this.gDrivePickupQrDoc === '') || (this.s3PickupQrDoc === '' && this.gDrivePickupQrDoc === '' && this.selectedData.status === 'Assigned - Outward') || (this.s3PickupQrDoc === '' && this.gDrivePickupQrDoc === '' && this.selectedData.status === 'Transit - Outward')) {
        qrdocs.push({
          document_type: 'PickupQRCode',
          file_name: 'PickupQRCode.png',
          extension: '.png',
          date: today,
          file: this.selectedFile,
          description: 'PickupQRCode'
        });
        filename = 'pickupQR_' + this.selectedData.ticket_id + '.png';
        type = 'pickupQR';
        this.uploadQrdocs(file, filename, type);
      } else
        if ((this.s3DropQrDoc === '' && this.gDriveDropQrDoc === '' && this.selectedData.status === 'At HO') || (this.s3DropQrDoc === '' && this.gDriveDropQrDoc === '' && this.selectedData.status === 'Assigned - Return') || (this.s3DropQrDoc === '' && this.gDriveDropQrDoc === '' && this.selectedData.status === 'Transit - Return')) {
          qrdocs.push({
            document_type: 'dropQRCode',
            file_name: 'dropQRCode.png',
            extension: '.png',
            date: today,
            file: this.selectedFile,
            description: 'dropQRCode'
          });
          type = 'dropQR';
          filename = 'dropQR_' + this.selectedData.ticket_id + '.png';
          this.uploadQrdocs(file, filename, type);
        }
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    const parts = Base64Image.split(";base64,")
    const imageType = parts[0].split(":")[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: imageType })
  }

  uploadQrdocs(file: any, filename: any, type: any) {
    this.buttonSpin = true;
    if (file) {
      const bucketName = 'icare-raf';
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear()).padStart(2, '0');
      const folder = year + '/' + month + '/' + day + '/' + this.selectedData.ticket_id;
      this.userService.pudImageUploadS3Bucket(file, bucketName, folder, filename)
        .then((fileUrl) => {
          this.updateS3Data(file, filename, type);
        })
        .catch((error) => {
          alert('Error uploading file:' + error);
        });
    } else {
      alert('Image is not selected');
    }
  }

  updateS3Data(file: any, filename: any, type: any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year + '/' + month + '/' + day + '/' + this.selectedData.ticket_id;
    const commonData = '&ticket_id=' + this.selectedData.ticket_id + '&type=' + type + '&side=' + '' + '&bucket_name=' + 'icare-raf' + '&name=' + filename + '&folder=' + folder;
    this.userService.updateS3File(commonData)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          alert('QR-Code have been uploaded successfully');
          this.getFileDetails(this.selectedData.ticket_id);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getFileDetails(ticketId: any) {
    this.qrCodeLoading = true;
    let result: any;
    this.s3PickupQrDoc = '';
    this.s3DropQrDoc = '';
    this.userService.getS3FileDetails(ticketId)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            if (result.images_raf.length !== 0) {
              for (let i = 0; i < result.images_raf.length; i++) {
                if ((result.images_raf[i].type === 'pickupQR')) {
                  this.s3PickupQrDoc = result.images_raf[i].folder + '/' + result.images_raf[i].file_id;
                  this.imageRaf = true;
                } else if ((result.images_raf[i].type === 'dropQR')) {
                  this.s3DropQrDoc = result.images_raf[i].folder + '/' + result.images_raf[i].file_id;
                  this.imageRaf = true;
                }
              }
            }
            if (result.images.length !== 0 && this.imageRaf === false) {
              for (let i = 0; i < result.images.length; i++) {
                if ((result.images[i].type === 'pickupQR')) {
                  this.s3PickupQrDoc = result.images[i].folder + '/' + result.images[i].file_id;
                  this.image = true;
                } else if ((result.images[i].type === 'dropQR')) {
                  this.s3DropQrDoc = result.images[i].folder + '/' + result.images[i].file_id;
                  this.image = true;
                }
              }
            }
            if ((this.selectedData.pud_type === 'DL' && this.s3PickupQrDoc === '') || (this.selectedData.pud_type === 'D-Call' && this.selectedData.status === 'Open' && this.s3PickupQrDoc === '')) {
              this.onGenerateQR('DLR');
            }
            else if (this.selectedData.pud_type == 'Ample-PUD' && this.s3PickupQrDoc === '') {
              this.onGenerateQR('P_DLR');
            }
            if ((this.s3DropQrDoc === '' &&  this.selectedData.pud_type == 'DL') || (this.selectedData.pud_type == 'D-Call' && this.s3DropQrDoc === '' && this.selectedData.status === 'At HO')) {
              this.onGenerateQR('HLD');
            }
            else if (this.s3DropQrDoc === '' && this.selectedData.status === 'At HO' && this.selectedData.pud_type == 'Ample-PUD') {
              this.onGenerateQR('P_HLD');

            }
            this.qrCodeLoading = false;
          } else {
            alert('QR-Code not yet uploaded.')
            this.qrCodeLoading = false;
          }


        });
  }

  getDocuments(ticket_id: any) {
    let result: any = [];
    this.gDrivePickupQrDoc = '';
    this.gDriveDropQrDoc = '';
    this.dataService.getDocuments(ticket_id)
      .subscribe(
        (data) => {
          result = data;
          if (result.length === 0) {
          } else if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
              if ((result[i].document_type === 'PickupQRCode')) {
                this.gDrivePickupQrDoc = result[i].file_name;
              } else if ((result[i].document_type === 'dropQRCode')) {
                this.gDriveDropQrDoc = result[i].file_name;
              }
            }
          }
        });
  }

  onChange() {
    if (this.pack_received_with_damage) {
      this.checked = true;
    } else if (!this.pack_received_with_damage) {
      this.checked = false;
    };
  }

  pendingCheck() {
    if (this.pendingStatus) {
      this.checked = true;
      this.pendingList = [
        { id: 'PWCB', value: 'Waiting for customer callback' },
        { id: 'PCDS', value: 'Customer delayed service' },
        { id: 'CCNR', value: 'Cancelled - Unable to Reach Customer' },
        { id: 'CCAR', value: 'Cancelled at Apple Request' },
        { id: 'CCCR', value: 'Cancelled at Customer Request' },
        { id: 'CRDE', value: 'Closed - Repairs Declined by Customer' },
      ]
    } else if (!this.pendingStatus) {
      this.checked = false;
    };
  }

  getdata(type: any): void {
    let results: any = [];
    let userDataTemp: any = [];
    let usersDataList: any = [];
    this.dataService.getPUDtickets()
      .subscribe(
        (data) => {
          results = data;
          userDataTemp = results;
          this.userAllData = userDataTemp;
          this.loadingData = false;
          for (let i = 0; i < userDataTemp.length; i++) {
            if (userDataTemp[i].pud_type !== 'Ample-PUD') {
              usersDataList.push({
                ticketId: userDataTemp[i].ticket_id,
                name: userDataTemp[i].customer_firstname + ' ' + userDataTemp[i].customer_lastname,
                phone: userDataTemp[i].customer_primary_phone,
                type: userDataTemp[i].pud_type,
                HO_Loc: userDataTemp[i].drop_branch_code,
                originLoc: userDataTemp[i].pickup_branch_code,
                status: userDataTemp[i].status,
                pudTicketId: userDataTemp[i].id
              })
            } else if (userDataTemp[i].pud_type === 'Ample-PUD') {
              usersDataList.push({
                ticketId: userDataTemp[i].ticket_id,
                name: userDataTemp[i].customer_firstname + ' ' + userDataTemp[i].customer_lastname,
                phone: userDataTemp[i].customer_primary_phone,
                type: userDataTemp[i].pud_type,
                HO_Loc: userDataTemp[i].drop_branch_code,
                originLoc: 'CustomerPlace',
                status: userDataTemp[i].status,
                pudTicketId: userDataTemp[i].id
              })
            }
          }
          this.usersData = [...usersDataList];
          if (type === 'refresh') {
            if (this.selectedData.pud_type === 'Ample-PUD') {
              this.selectedData = this.userAllData.filter((data: any) => {
                return data.id === this.selectedTicketId;
              });
              this.selectedData = this.selectedData[0];
              this.getDocuments(this.selectedData.ticket_id);
              this.getFileDetails(this.selectedData.ticket_id);
            } else {
              this.selectedData = this.userAllData.filter((data: any) => {
                return data.ticket_id === this.selectedTicketId;
              });
              this.selectedData = this.selectedData[0];
              this.getDocuments(this.selectedData.ticket_id);
              this.getFileDetails(this.selectedData.ticket_id);
            }
          }
        });
  }

  getBranch(branch: any) {
    let result: any;
    this.dataService.getBranch(branch)
      .subscribe({
        next: (data: any) => {
          result = data.branch;
          this.dlType = result.dl_type;
        }
      })
  }

  ticketselect(id: string) {
    localStorage.setItem('id', id);
  }

  openImage(fileId: any) {
    window.open(fileId, '_blank');
  }

  getItem(item: any) {
    return Object.keys(item);
  }
  details_visible = Object.create({});
  toggleDetails(id: any, item: any) {
    this.editOptions = item.type !== 'Ample-PUD';
    this.selectedTicketId = item.type === 'Ample-PUD' ? item.pudTicketId : item.ticketId;

    if (this.prevRow && this.prevRow !== id) {
      this.details_visible[this.prevRow] = false;
      this.details_visible[id] = true;
      this.prevRow = id;
    } else if (this.prevRow === id) {
      this.details_visible[id] = !this.details_visible[id];
      this.prevRow = this.details_visible[id] ? id : undefined;
    } else {
      this.details_visible[id] = true;
      this.prevRow = id;
    }


    if (this.details_visible[id]) {
      this.selectedData = this.userAllData.find((data: any) => {
        if (item.type === 'Ample-PUD') {
          return data.id === item.pudTicketId;
        } else {
          return data.ticket_id === item.ticketId;
        }
      });

      if (this.selectedData) {
        this.custAddress = [
          this.selectedData.address_line1,
          this.selectedData.address_line2,
          this.selectedData.city,
          this.selectedData.state,
          this.selectedData.pin
        ].filter(Boolean).join(' ');

        this.customer_name = [
          this.selectedData.customer_firstname,
          this.selectedData.customer_lastname
        ].filter(Boolean).join(' ');

        // Load additional details
        this.getDocuments(this.selectedData.ticket_id);
        this.getFileDetails(this.selectedData.ticket_id);
        this.getDetails(this.selectedData.ticket_id);
        this.getPUDAgent();
      }
    }
  }

  getDetails(ticket_id: string | null) {
    if (!ticket_id) return;

    this.dataService.getDetail(ticket_id)
      .subscribe({
        next: (data: any) => {
          if (data && data.tickets && data.tickets.length > 0) {
            this.dataTemp = data.tickets[0];
            this.branchCode = this.dataTemp.dl_branch_code;
            this.gNumber = this.dataTemp.g_number;

            if (this.branchCode) {
              this.getBranch(this.branchCode);
            }

            this.showRequestDrop = ['3520', '3530'].includes(this.dataTemp.status_id);
          }
        },
        error: (error) => {
          console.error('Error fetching details:', error);
        }
      });
  }

  pudConfirmModel(pud_confirmation_temp: TemplateRef<any>, ticket_id: any, imageType: any, forMoreInfo: any, parent?: any) {
    this.pickupAssigned = 'Select pickup person';
    this.datetime = '';
    if (this.selectedData.pud_type === 'Ample-PUD') {
      this.getQuotation(this.selectedData.ticket_id);
    }
    if (imageType === 'DLR' && forMoreInfo === 'null') {
      this.getGDriveFiles(pud_confirmation_temp, 'DLR');
      this.editOptions = false;
      this.pickupInfo = true;
      this.forMoreTemp = false;
      if (this.s3PickupQrDoc == '' && this.gDrivePickupQrDoc === '') {
        this.saveAsImage(parent);
      }
    } else if (imageType === 'null' && forMoreInfo === 'pickUp') {
      if (this.selectedData.pud_type === 'Ample-PUD') {
        this.getPUDImages(pud_confirmation_temp, 'null');
      } else {
        this.getGDriveFiles(pud_confirmation_temp, 'null');
      }
      this.forMoreTemp = true;
      this.editOptions = true;
      this.pickupInfo = true;
    } else if (imageType === 'null' && forMoreInfo === 'drop') {
      if (this.selectedData.pud_type === 'Ample-PUD') {
        this.getPUDImages(pud_confirmation_temp, 'null');
      } else {
        this.getGDriveFiles(pud_confirmation_temp, 'null');
      }
      this.forMoreTemp = true;
      this.editOptions = true;
      this.dropInfo = true;
      this.pickupInfo = false;
    } else if (imageType === 'null' && forMoreInfo === 'null') {
      this.openModal(pud_confirmation_temp)
      this.editOptions = false;
      this.pickupInfo = true;
      this.forMoreTemp = false;
      if (this.s3PickupQrDoc === '' && this.selectedData.pud_type !== 'Ample-PUD' && this.gDrivePickupQrDoc === '') {
        this.saveAsImage(parent);
      }
    }
    this.selectedData = this.userAllData.filter((data: any) => {
      return data.id === ticket_id;
    });
    this.selectedData = this.selectedData[0];
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  showMapModel(title: any, google_map: TemplateRef<any>) {
    this.gmapTitle = title;
    this.openModal(google_map);
  }

  acknowlegeModel(acknowledge_temp: TemplateRef<any>, id: any, imageType: any) {
    if (imageType === 'HLR') {
      this.getGDriveFiles(acknowledge_temp, 'HLR');
    } else if (imageType === 'DLD') {
      this.getGDriveFiles(acknowledge_temp, 'DLD');

    } else if (imageType === 'P_HLR') {
      this.getPUDImages(acknowledge_temp, 'P_HLR');
    }
    this.selectedData = this.userAllData.filter((data: any) => {
      return data.id === id;
    });
    this.selectedData = this.selectedData[0];
    this.getDetails(this.selectedData.ticket_id);
  }

  hideModel() {
    this.modalService.dismissAll();
  }

  cancel() {
    this.hideModel();
    this.serialNo = '';
    this.dropOTP = '';
    this.pickupOTP = '';
    this.pickupInfo = false;
    this.dropInfo = false;
    this.showerror = false;
    this.buttonLoading = false;
    this.showImagesClicked = false;
    this.showImagess = false;
    this.forMoreTemp = false;
    this.errorMsg = false;
  }

  /************ Make Calls **************/

  makeCall(call_alert: TemplateRef<any>) {
    this.buttonLoading = true;
    let result: any = [];
    this.dataService.makeCall(this.selectedData.ticket_id, this.selectedData.customer_primary_phone)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonLoading = false;
            this.openModal(call_alert);
          } else {
            this.buttonLoading = false;
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  /************ Drop Functions **************/
  checkSerialNo(ticketid: any) {
    this.buttonSpin = true;
    let result: any;
    this.showerror = false;
    this.serialNo = this.serialNo.toUpperCase();
    this.dataService.getProduct(this.serialNo, ticketid)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonSpin = false;
            this.productDetails = result.device;
            this.showProduct = true;
          } else {
            if (ticketid === '') {
              this.showerror = true;
              this.buttonSpin = false;
              this.errorMessage = 'Unable to fetch device details';
              this.serialNo = '';
              this.showProduct = false;
            } else if (ticketid !== '') {
              alert(result.message);
            }
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  acknowledgeAtRC() {
    if (this.selectedData.pud_type !== 'Apple-PUD' && this.selectedData.pud_type !== 'Ample-PUD') {
      this.serialNo = this.dataTemp.serial_no;
      if (this.dlType === 'Imagine') {
        console.log(this.branchCode);
        if ((this.videoUpload === true) || ((this.branchCode == 'STC') || (this.branchCode == 'DTC'))) {
          this.getAcknowledge();
        } else {
          alert('File not Uploaded.')
        }
      } else {
        this.getAcknowledge();
      }
    } else if (this.selectedData.pud_type === 'Ample-PUD') {
      if (this.visibleDamage !== '' && this.diagnosisCharges !== '' && this.checked === false || this.visibleDamage !== '' && this.diagnosisCharges !== '' && this.checked === true && this.remarks !== '') {
        let result: any;
        this.dataService.getAmpleAcknowledge(this.dataTemp.serial_no, this.selectedData.ticket_id, this.remarks, this.visibleDamage, this.diagnosisCharges, this.selectedData.pud_type, this.selectedData.id)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.buttonLoading = false;
                this.getdata('refresh');
                this.hideModel();
                this.sendRAF();
              } else {
                this.showerror = true;
                this.errorMessage = result.message;
                alert('Acknowledge Failed');
              }
            }
          });
      } else {
        alert('Select all mandatory fields');
      }
    } else if (this.selectedData.pud_type === 'Apple-PUD') {
      let ticketId = this.selectedData.ticket_id;
      let result: any;
      this.serialNo = this.serialNo.toUpperCase();
      this.dataService.getProduct(this.serialNo, ticketId)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonLoading = false;
              this.getAcknowledge();
            } else {
              this.showerror = true;
              this.errorMessage = result.message;
            }
          }, // success path
          error: error => this.error = error // error path
        });
    } else {
      alert('Acknowledge failed.');
    }
  }

  getAcknowledge() {
    let result: any;
    if(this.selectedData.currier_method === 'Runner'){
      this.awbNo = this.nrdcNo;
    }
    this.dataService.getAcknowledge(this.serialNo, this.selectedData.ticket_id, this.selectedData.id, this.remarks, this.dataTemp.branch_code, this.selectedData.pud_type, this.pack_received_with_damage, this.awbNo)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata('refresh');
            this.hideModel();
          }
        }
      });
  }

  acknowledgeAtDrop() {
  if ((this.checked === false) || (this.checked === true && this.remarks !== '')) {
    let result: any;
    if (this.dlType === 'Imagine') {
      if ((this.videoUpload === true) || (this.branchCode == 'STC') || (this.branchCode == 'DTC')) {
        if (this.selectedData.currier_method === 'Runner') {
          this.awbNo = this.nrdcNo;
        }

        if (this.selectedData.pickup_branch_code == 'DSQ' || this.selectedData.pickup_branch_code == 'DCA' ||  this.selectedData.pickup_branch_code == 'DPI' ||  this.selectedData.pickup_branch_code == 'DMX' ) {
          this.dataService.rdoAdditionalPart(this.selectedData.ticket_id)
            .subscribe({
              next: (data: any) => {
                result = data;
                if (result.status === true) {
                  //  Only if RDO succeeds → run acknowledgeAtDrop
                  this.dataService.acknowledgeAtDrop(
                    this.selectedData.serial_no,
                    this.selectedData.ticket_id,
                    this.selectedData.id,
                    this.remarks,
                    this.dataTemp.branch_code,
                    this.selectedData.pud_type,
                    this.pack_received_with_damage,
                    this.awbNo
                  ).subscribe({
                    next: (data: any) => {
                      result = data;
                      this.buttonLoading = false;
                      this.getdata('refresh');
                      this.hideModel();
                    },
                    error: (err) => {
                      alert("acknowledgeAtDrop API failed: " + (err.message || "Server error"));
                      this.buttonLoading = false;
                    }
                  });

                } else {
                  //  If RDO fails
                  if (result.gsx_response) {
                    const gsxResponse = result.gsx_response.errors[0].message;
                    alert(gsxResponse);
                  } else {
                    alert(result.message);
                  }
                  this.buttonLoading = false;
                }
              },
              error: (err) => {
                alert("RDO API failed: " + (err.message || "Server error"));
                this.buttonLoading = false;
              }
            });
        } else {
          // If not DSQ/DCA/DPI/DMX → directly call acknowledgeAtDrop
          this.dataService.acknowledgeAtDrop(
            this.selectedData.serial_no,
            this.selectedData.ticket_id,
            this.selectedData.id,
            this.remarks,
            this.dataTemp.branch_code,
            this.selectedData.pud_type,
            this.pack_received_with_damage,
            this.awbNo
          ).subscribe({
            next: (data: any) => {
              result = data;
              this.buttonLoading = false;
              this.getdata('refresh');
              this.hideModel();
            },
            error: (err) => {
              alert("acknowledgeAtDrop API failed: " + (err.message || "Server error"));
              this.buttonLoading = false;
            }
          });
        }

      } else {
        alert('File not Uploaded.');
      }
    } else {
      //  If dlType is not Imagine
      this.dataService.acknowledgeAtDrop( this.selectedData.serial_no, this.selectedData.ticket_id, this.selectedData.id, this.remarks, this.dataTemp.branch_code, this.selectedData.pud_type, this.pack_received_with_damage, this.awbNo )
      .subscribe({
        next: (data: any) => {
          result = data;
          this.buttonLoading = false;
          this.getdata('refresh');
          this.hideModel();
        },
        error: (err) => {
          alert("acknowledgeAtDrop API failed: " + (err.message || "Server error"));
          this.buttonLoading = false;
        }
      });
    }
  } else {
    alert('Enter Remarks');
  }
}
  sendRAF() {
    let result: any;
    this.dataService.sendRAF(this.selectedData.ticket_id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonLoading = false;
            alert('Acknowledgement done, RAF sent successfully');
          } else {
            this.showerror = true;
            alert('Acknowledgement done, RAF Failure please try again');
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getDropOTP() {
    let result: any = [];
    this.dataService.getDropOTP(this.selectedData.serial_no, this.selectedData.id, this.dropOTP, this.selectedData.ticket_id, this.selectedData.pud_type)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata('refresh');
            this.hideModel();
            this.buttonLoading = false;
          } else {
            this.dropOTP = '';
            this.showerror = true;
            this.errorMessage = result.message;
            this.buttonLoading = true;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getOtp() {
    let result: any = [];
    this.dataService.getOTP(this.selectedData.serial_no, this.selectedData.ticket_id, this.selectedData.id, this.pickupOTP, this.selectedData.pickup_assigned_to, this.selectedData.pud_type)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonLoading = false;
            this.hideModel();
            this.getdata('refresh');
          } else {
            this.pickupOTP = '';
            this.showerror = true;
            this.buttonLoading = true;
            this.errorMessage = result.message;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  showImages() {
    this.showImagesClicked = true;
  }

  moveBack() {
    this.showImagesClicked = false;
  }

  showImagesDOC() {
    this.showImagess = true;
  }

  back() {
    this.showImagess = false;
  }

  /************ RC Functions **************/

  getPUDAgent() {
    let results: any = [];
    this.dataService.getPUDAgent()
      .subscribe({
        next: (data: any) => {
          results = data;
          this.drop_assigned_to = results;
        }
      });
  }

  updateGSXStatus() {
    let result: any = [];
    this.dataService.updateGSXStatus(this.gNumber, this.pendingReason)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            alert('Status updated successfully');
          } else {
            alert('Status Update Fail')
          }
        }
      })
  }

  getQuotation(tId: any) {
    let results: any = [];
    this.quotations = [];
    this.paynowResult = '';
    this.dataService.getQuotation(tId)
      .subscribe({
        next: (data: any) => {
          results = data;
          if (results.status === true && results.quotations.length !== 0) {
            this.quotations = results.quotations;
            this.checkQuoteStatuses(this.selectedData.ticket_id);
          } else {
            this.paynowResult = 'Payment Pending';
            this.paymentStatus = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  checkQuoteStatuses(tId: any) {
    for (let i = 0; i < this.quotations.length; i++) {
      if ((this.quotations[i].id !== null) && (this.quotations[i].transaction_id !== null)) {
        this.dataService.checkQuoteStatuses(tId, this.quotations[i].id, this.quotations[i].transaction_id)
          .subscribe({
            next: (data1: any) => {
              this.paynowResult = data1.pay_status;
              if (this.paynowResult === 'Success') {
                this.paymentStatus = true;
              } else if (this.paynowResult !== 'Success') {
                this.paymentStatus = false;
                this.paynowResult = 'Payment Pending';
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }
    }
  }

  registerPickup() {
    this.datetime = this.datePipe.transform(this.datetime, 'yyyy-MM-dd hh:mm:ss');
    let result: any = [];
    if (this.pickupAssigned !== 'Select pickup person' && this.datetime !== '' && this.productDetails.warrantyStatus !== '***********************') {
      this.dataService.registerPickup(this.selectedData.id, this.selectedData.pud_type, this.selectedData.pickup_branch_code, this.selectedData.drop_branch_code, this.pickupAssigned,
        this.customer_name, this.selectedData.customer_primary_phone, this.selectedData.customer_secondry_phone, this.selectedData.customer_email, this.selectedData.address_line1,
        this.selectedData.address_line2, this.selectedData.city, this.selectedData.state, this.selectedData.pin, this.selectedData.landmark, this.selectedData.serial_no, this.datetime, this.selectedData.customer_query,
        this.selectedData.visible_damage, this.selectedData.diagnosis_charges_accepted)
        .subscribe({
          next: (data: any) => {
            result = data;
            this.buttonLoading = false;
            this.getdata('refresh');
            this.hideModel();
            this.getPUDAgent();
          }
        });
    } else {
      alert('Enter All mandatory fields');
    }
  }

  registerAmplePickup(parent: any) {
    this.datetime = this.datePipe.transform(this.datetime, 'yyyy-MM-dd hh:mm:ss');
    if(this.paymentStatus === true){
      this.exceptionCase = '';
    }
    if (this.showProduct === true && this.pickupAssigned !== 'Select pickup person' && this.datetime !== '' && this.productDetails.warrantyStatus !== '***********************') {
      let result: any = [];
      if (this.paymentStatus === true || this.exceptionCase !== 'Select Exception Case') {
        this.dataService.registerAmplePickup(this.selectedData.id, this.selectedData.pud_type, this.selectedData.drop_branch_code, this.pickupAssigned,
          this.selectedData.customer_firstname, this.selectedData.customer_lastname, this.selectedData.customer_primary_phone, this.selectedData.customer_secondry_phone, this.selectedData.customer_email, this.selectedData.address_line1,
          this.selectedData.address_line2, this.selectedData.city, this.selectedData.state, this.selectedData.pin, this.selectedData.landmark, this.serialNo, this.datetime, this.selectedData.customer_query, this.exceptionCase)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.buttonLoading = false;
                this.hideModel();
                this.getdata('refresh');
                if (this.s3PickupQrDoc == '' && this.gDrivePickupQrDoc === '') {
                  this.saveAsImage(parent);
                }
              } else {
                alert(result.message);
              }
            }
          });
        this.getPUDAgent();
        this.hideModel();
      } else {
        alert('Payment failed.')
      }
    } else {
      alert('Serial Number Unavialable or Entered wrong Serial Number')
    }
  }

  requestDrop(parent: any) {
    let result: any = [];
    if (this.drop_assigned !== 'Select drop person') {
      this.dataService.requestDrop(this.selectedData.id, this.selectedData.pud_type, this.selectedData.pickup_branch_code, this.selectedData.drop_branch_code, this.drop_assigned)
        .subscribe({
          next: (data: any) => {
            result = data;
            this.buttonLoading = false;
            this.getdata('refresh');
            if (this.s3DropQrDoc == '') {
              this.saveAsImage(parent);
            }
            this.hideModel();
          }
        });
      this.getPUDAgent();
      this.hideModel();
    } else {
      alert('Select drop person');
    }
  }

  requestDropModel(request_drop_temp: TemplateRef<any>) {
    this.openModal(request_drop_temp);
  }

  requestOTPModel(request_drop_OTP_temp: TemplateRef<any>, imageType: any) {
    this.dropOTP = '';
    if (imageType === 'HLD') {
      this.getGDriveFiles(request_drop_OTP_temp, 'HLD');
    } else if (imageType === 'P_HLD') {
      this.getPUDImages(request_drop_OTP_temp, 'P_HLD');
    }
  }

  /************ get PUD Images **************/

  getPUDImages(popupTemp: TemplateRef<any>, imageType: any) {
    this.RCImages1 = [];
    this.RCImages2 = [];
    this.DLImages1 = [];
    this.DLImages2 = [];
    const pudImages: any = [];
    const pudAllImage: any = [];
    this.gdriveImageExist = false;
    this.pudImageExist = false;
    let result: any;
    this.dataService.getPUDImages(this.selectedData.ticket_id)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.pudImages = result.images_raf;
            for (let i = 0; i < this.pudImages.length; i++) {
              if (this.pudImages[i].type == imageType || this.forMoreTemp === true) {
                pudAllImage.push(this.pudImages[i]);
              }
              pudImages.push(this.pudImages[i]);
            }
            for (let i = 0; i < pudImages.length; i++) {
              if (pudImages[i].type === 'P_DLR' || pudImages[i].type === 'DLR') {
                this.DLImages1.push({ 'fileName': pudImages[i].folder + '/' + pudImages[i].file_id, 'type': pudImages[i].type });
              } else if (pudImages[i].type === 'P_DLD' || pudImages[i].type === 'DLD') {
                this.DLImages2.push({ 'fileName': pudImages[i].folder + '/' + pudImages[i].file_id, 'type': pudImages[i].type });
              }
              if (pudImages[i].type === 'P_HLR' || pudImages[i].type === 'HLR') {
                this.RCImages1.push({ 'fileName': pudImages[i].folder + '/' + pudImages[i].file_id, 'type': pudImages[i].type });
              } else if (pudImages[i].type === 'P_HLD' || pudImages[i].type === 'HLD') {
                this.RCImages2.push({ 'fileName': pudImages[i].folder + '/' + pudImages[i].file_id, 'type': pudImages[i].type });
              }
            }

            if ((pudAllImage.length >= 2) || ((this.branchCode == 'STC') || (this.branchCode == 'DTC')) ) {
              this.pudImageExist = true;
              this.openModal(popupTemp);
            } else if (this.forMoreTemp === true) {
              this.pudImageExist = true;
              this.openModal(popupTemp);

            }
            else {
              alert('Upload the packing images');
              // this.openModal(popupTemp);
              this.pudImageExist = false;
            }
          }
          else if (result.status === false) {
            alert('Upload the packing images');
            // this.openModal(popupTemp);
            this.pudImageExist = false;
          }
        });
  }

  /************ google drive **************/

  getGDriveFiles(popupTemp: TemplateRef<any>, imageType: any) {
    this.RCImages1 = [];
    this.RCImages2 = [];
    this.DLImages1 = [];
    this.DLImages2 = [];
    this.gdriveImageExist = false;
    this.pudImageExist = false;
    const gdriveImages: any = [];
    const gdriveAllImage: any = [];
    let result: any;
    this.dataService.getDriveFiles(this.selectedData.ticket_id)
      .subscribe(
        (data) => {
          result = data;
          if (result.images.length > 0) {
            this.gDriveData = result.images;
            for (let i = 0; i < this.gDriveData.length; i++) {
              if (this.gDriveData[i].type == imageType || this.forMoreTemp === true) {
                gdriveAllImage.push(this.gDriveData[i]);
              }
              gdriveImages.push(this.gDriveData[i]);
            }
            for (let i = 0; i < gdriveImages.length; i++) {
              if (gdriveImages[i].type === 'P_DLR' || gdriveImages[i].type === 'DLR') {
                this.DLImages1.push({ 'url': this.url + gdriveImages[i].file_id, 'side': gdriveImages[i].side, 'type': gdriveImages[i].type });
              } else if (gdriveImages[i].type === 'P_DLD' || gdriveImages[i].type === 'DLD') {
                this.DLImages2.push({ 'url': this.url + gdriveImages[i].file_id, 'side': gdriveImages[i].side, 'type': gdriveImages[i].type });
              }
              if (gdriveImages[i].type === 'P_HLR' || gdriveImages[i].type === 'HLR') {
                this.RCImages1.push({ 'url': this.url + gdriveImages[i].file_id, 'side': gdriveImages[i].side, 'type': gdriveImages[i].type });

              } else if (gdriveImages[i].type === 'P_HLD' || gdriveImages[i].type === 'HLD') {
                this.RCImages2.push({ 'url': this.url + gdriveImages[i].file_id, 'side': gdriveImages[i].side, 'type': gdriveImages[i].type });
              }
            }
            if (gdriveAllImage.length >= 2) {
              this.gdriveImageExist = true;
              this.openModal(popupTemp);
            } else if (this.forMoreTemp === true) {
              this.gdriveImageExist = true;
              this.openModal(popupTemp);
            }
            else {
              // alert('Upload the packing images');
              // this.openModal(popupTemp);
              this.getPUDImages(popupTemp, imageType);
            }
          }
          else if (result.images.length === 0) {
            // alert('Upload the packing images');
            // this.openModal(popupTemp);
            this.getPUDImages(popupTemp, imageType);
          }
        });
  }
  /************ Video Upload **************/

  onFileUploadfun(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
      this.selectedVideo = file;
    }
  }

  onVideoUpload(numb:any) {
    this.videoUpload = false;
    this.buttonSpin = true;
    if (this.selectedVideo) {
      if (numb !== '') {
        const bucketName = 'kbb-kgb-video';
        const today = new Date();
        let filename:any;
        const extension = this.selectedVideo.type.split('/')[1];
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = String(today.getFullYear()).padStart(2, '0');
        const folder = year + '/' + month + '/' + day + '/' + numb;
        if (this.selectedData.status == 'Transit - Outward') {
          filename = 'video_HL.' + extension;
        } else if (this.selectedData.status == 'Transit - Return') {
          filename = 'video_DL.' + extension;
        }

        this.userService.uploadVideoS3Bucket(this.selectedVideo, bucketName, folder,filename)
          .then((fileUrl) => {
            this.updateS3Video(numb);
          })
          .catch((error) => {
            alert('Error uploading file:' + error);
            console.error('Error uploading file:', error);
          });
      } else {
        alert('Please Enter All mandatory fields');
      }
    } else {
      alert('Video is not selected');
    }
  }

  updateS3Video(num: any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year + '/' + month + '/' + day + '/' + num;
    const extension = this.selectedVideo.type.split('/')[1];
    let filename: any;
    if (this.selectedData.status == 'Transit - Outward') {
      filename = 'video_HL.' + extension;
    } else if (this.selectedData.status == 'Transit - Return') {
      filename = 'video_DL.' + extension;
    }
    const commonData = '&ticket_id=' + num + '&type=' + 'KBB' + '&side=' + '' + '&bucket_name=' + 'kbb-kgb-video' + '&name=' + filename + '&folder=' + folder;

    this.userService.updateS3File(commonData)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          alert('KBB video have been uploaded successfully');
          this.videoUpload = true;
          this.selectedVideo = '';
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }
}
