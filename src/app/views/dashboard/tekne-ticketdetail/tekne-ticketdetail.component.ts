import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, TemplateRef, ElementRef, ViewChild, ViewEncapsulation, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from '../dashboard.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import { TekneTicketdetailService } from './tekne-ticketdetail.service';

export interface ApproveReject {
  id: any;
  tag: any;
  title: any;
  msg: any;
  visible: any;
}

export interface SimpleAlert {
  title: any;
  msg: any;
}

export interface ConfirmAlert {
  id: any;
  title: any;
  msg: any;
}

@Component({
    selector: 'app-ticketdetail',
    templateUrl: './tekne-ticketdetail.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tekne-ticketdetail.component.scss',
        '../../../../scss/customstyle.css',
        '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss'
    ],
    providers: [DashboardService, NgbModal, NgbModalConfig],
    standalone: false
})

export class TekneTicketdetailComponent {
  /* @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('myQInput') myQInputVariable: ElementRef;
  @ViewChild('myPopInput') popInputVariable: ElementRef; */

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  @ViewChild('myInput', { static: true }) myInputVariable!: ElementRef;
  @ViewChild('myQInput', { static: true }) myQInputVariable!: ElementRef;
  @ViewChild('myPopInput', { static: true }) popInputVariable!: ElementRef;
  ticketId: any = localStorage.getItem('id');
  loading = true;
  buttonSpin = false;
  clicked = false;
  isManager: any;
  isTechnician: any;
  selectedOption: any;
  error: any;
  data: any = [];
  dataTemp: any = [];
  technicianId = '';
  technicianList: any = [];
  assignedUserName: any;
  customerInfo: any = [];
  companyName = '';
  statusOptions: any = [];
  assignees: any = [];
  ruleStatus: any;
  firstName: any = '';
  recentData: any = [];
  timelineData: any = [];
  isToken: any = true;
  isAdvancetab: any = false;
  isInvoicetab: any = false;
  partsSaved: any = false;
  isDevice: any = false;
  isPhysical: any = true;
  productName = '';
  warrantyStatus = '';
  physicalLocation: any;
  physicalError = '';
  physicalMsg = '';
  description: any = '';
  documentTemp: any = [];
  documents: any = [];
  selectedFile: any;
  removeDocOpt = false;
  bcolor = false;
  dcolor = false;
  qcolor = false;
  qbcolor = false;
  lineColor = false;
  remarks = '';
  branchCode: any;
  title: any;
  notfilled = false;
  userRole = localStorage.getItem('userRole');
  siteType = localStorage.getItem('siteType');
  l2Approver = localStorage.getItem('l2Approval');
  userID = localStorage.getItem('userId');
  userBranch = localStorage.getItem('branchCode');
  branchType = localStorage.getItem('branchType');
  isAccepted = 'false';
  showAssign = false;
  documentType = 'Select document type';
  documentTypes;
  isExDocuments = false;
  isViewDoc = false;
  dError = '';
  selectedDocument: any = [];
  partNo = '';
  partDetails: any = [];
  approveReject: ApproveReject = { id: '', tag: '', title: '', msg: '', visible: 'false' };
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  confirmAlert: ConfirmAlert = { id: '', title: '', msg: '' };
  assignReassign: any;
  isService: any = true;
  sPartDetails: any = [];
  families: any = [];
  existSvc: any = [];
  isExistSvc = false;
  svcDiagnosis = '';
  showSVCForm: any = 'false';
  deleteSvcRemarks = '';
  deleteSvcId = '';
  analysisText: any = '';
  analysisList: any = [];
  isCollapsed = false;
  upArrow = true;
  upAdvArrow = false;
  upInvArrow = false;
  html: any;
  popLoading = false;
  imageTemp: any = [];
  components: any = [];
  componentIssueList: any = [];
  issuesTemp: any = [];
  issues: any = [];
  componentCode: any;
  issueCode: any;
  flagIssue: any = true;
  repairTypes: any = [];
  repairType: any = '';
  coverageOptions: any = [];
  coverageOption = null;
  selectedParts: any = [];
  parts: any = [];
  partDetail: any = [];
  repairClassifications: any = [];
  repairClassification: any;
  partsTemp: any = [];
  errorMsg: any;
  partSearch = '';
  eeeSearch = '';
  isPartDetail: any = false;
  technicianComments: any = [];
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: Date = new Date();
  public myTime: Date = new Date();
  poNo = '';
  finalParts: any = [];
  consignmentASN: any = '';
  consignmentASNError = '';
  svcId: any = '';
  svcRemarks = '';
  isSVCActive = false;
  consignmentType: any = '';
  consignmentPartNumber = '';
  S3Data: any = [];
  serviceChargeHtml: any = '';

  customerPhoneLogs: any = [];
  callAudio = new Audio();
  notifyUpArrow = false;
  smsUpArrow = false;
  emailUpArrow = false;
  smsNotifyTab = false;
  emailNotifyTab = false;

  smsNotifications: any = [];
  emailNotifications: any = [];





  serviceTeamUsers = false;
  enableCreateRepairBtn = false;
  svcDocumentTemp: any = [];
  kbbType = 'KBB Display';
  kbbDisplayDiagSerial = '';
  kbbDisplayImageList: any = [];
  selectedKbbImage = '';
  kbbImageZoom = false;
  kbbImageSerialNo = '';
  kbbErrorMessage = 'KBB Image Serial number not verified';
  kbbVerifyError = '';
  kbbSerialNoVerified = '0';
  ticketAssignedUser = false;
  checkListData: any;
  kbbVerificationParts: any = [];
  ccFeedBackList = [
    { value: 'Excellent', name: 'Excellent' },
    { value: 'Neutral', name: 'Neutral' },
    { value: 'Poor', name: 'Poor' },
  ];
  repairWarrantys = [{value: 'In Warranty', name: 'In Warranty'},{value: 'Out Of Warranty', name: 'Out Of Warranty'},{value: 'Repeat Repair', name: 'Repeat Repair'}]
  repairWarranty: any;
  showInwardButton = false;
  customerDisSatStyles = { cDisStatBColor: '#fff', cDisStatFColor: '#000', linkColor: '#20a8d8' };
  productCode: any;
  customerFirstName: any;
  customerLastName: any;

  moveBackToStage: any = '';
  csCodeAvail = false;
  popRequiredList: any = [];
  popExist = false;
  popRequired = false;
  showTimer = false;
  countdownTime = 180;
  countDown = '';
  ticketBranch = '';
  productFamilies: any = [];
  productFamily: any = 'Select Product Family';

  s3ImageOpenAlert = '';
  showProductSelect = false;
  isS3Document: any;
  s3ImageUrl = '';
  selectedS3Doc: any = '';
  selectedS3Id: any = '';
  showImagePopup = false;
  contentType: any = '';
  stoConsignmentCheck = true;
  selectedCustomerPhone = '';
  warrantyExpiryDate = '';
  netSuiteCase: any = false;
  invoiceError = '';
  paymentDeclinedReason: any = '';
  repairHd: any = [];
  repairDt: any = [];
  isException = false;
  exceptionApprovers: any = [];
  exceptionApprover: any = "";
  showEnterOTP = false;
  showValidateOTP = false;
  exceptionOtpEntered = '';
  exceptionOtp = '';
  otpValidated = false;
  ampleComponentIssues: any = [];
  enableStockTypeChange = false;
  isApprover = false;
  popValidated = false;
  POPImageUrl = '';
  l1InvoiceNo = '';
  issueSelected = '';

  constructor(
    private dataService: TekneTicketdetailService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    public userDataService: UserService, private router: Router) {
    this.bsConfig = Object.assign({}, { showWeekNumbers: false }, { showOnFocus: false });
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
    this.serviceChargeHtml = sanitizer.sanitize(SecurityContext.HTML, this.serviceChargeHtml);
    this.serviceChargeHtml = this.serviceChargeHtml + '<span>' + 'Pre-Tax' + '&nbsp;' + '&nbsp;' + 'Tax' + '&nbsp;' + '&nbsp;' + 'Total' + '</span><br/>' + '<span>' + '677.96' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '800.00' + '</span><br/>' + '<span>' + '847.46' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '1000.00' + '</span><br/>' + '<span>' + '1694.92' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '2000.00' + '</span><br/>' + '<span>' + '2542.37' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '3000.00' + '</span><br/>' + '<span>' + '3389.83' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '4000.00' + '</span><br/>';
    this.getOptions();
    this.assignValues();
    this.getComponents();
    this.getdata(this.ticketId);
      this.documentTypes = [
        { value: 'Select document type', name: 'Select document type' },
        { value: 'Device images', name: 'Device images' },
        { value: 'Other', name: 'Other' }
      ];

    this.coverageOptions = [
      { label: 'No Damage', value: 'No Damage' },
      { label: 'Full Price (stock)', value: 'Full Price (stock)' },
      { label: 'Service Price (exchange)', value: 'Service Price (exchange)' },
    ];

    this.families = [{ id: '0', name: 'Select Family' }, { id: '1', name: 'Tekne' }, { id: '2', name: 'Pulse' },
    { id: '3', name: 'Yet to determine' }];
    this.partNo = '';

    if ((this.userRole === '2') || (this.userRole === '3') || (this.userRole === '4') || (this.userRole === '10') || (this.userRole === '18')) {
      this.serviceTeamUsers = true;
    } else {
      this.serviceTeamUsers = false;
    }
    this.productFamilies = [{ name: 'iPod', value: 'IPOD' }, { name: 'iPad', value: 'IPAD' }, { name: 'iPhone', value: 'IPHONE' }, { name: 'Apple Watch', value: 'WATCH' }, { name: 'Apple TV', value: 'APPLETV' }, { name: 'Mac', value: 'MAC' }, { name: 'Beats', value: 'BEATS' }, { name: 'Homepod', value: 'HOMEPOD' }, { name: 'Airpods', value: 'AIRPODS' }, { name: 'Others', value: 'IPHONE' }];
  }

  coverageOnChange(event: { value: any; description: any; } | null, partno: any) {
    if (event !== null) {
        for (let j = 0; j < this.selectedParts.length; j++) {
          if (this.selectedParts[j].part_no === partno) {
            this.selectedParts[j].coverageOption = event.value;
          }
        }
    }
  }

  stockTypeChange() {
    let result;
    this.dataService.getConsignment(this.ticketId, this.data.branch_code, this.consignmentPartNumber, this.consignmentType)
    .subscribe({
      next: (data: any) => {
        result = data;
        if (result.status === true) {
          this.consignmentASN = result.items[0].asn_no;
          this.consignmentPartNumber = result.items[0].part_no;
        } else {
          alert(result.message);
        }
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  getConsignment(consignment_temp: TemplateRef<any>, part: any) {
    let result: any;
    this.consignmentType = 'Service';
    this.dataService.getConsignment(this.ticketId, this.data.branch_code, part.number, this.consignmentType)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.enableStockTypeChange = false;
            this.consignmentASN = result.items[0].asn_no;
            this.consignmentPartNumber = result.items[0].part_no;
            this.openModal(consignment_temp);
          } else {
            part.fromConsignedStock = false;
            this.enableStockTypeChange = true;
            this.openModal(consignment_temp);
            this.consignmentPartNumber = part.number;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }
blockConsignment() {
  this.dataService.blockConsignment(this.ticketId, this.consignmentASN, this.consignmentPartNumber, this.consignmentType)
    .subscribe({
      next: (result: any) => {
        const status = result.status == true || result.status == 'true';

        if (status) {
          this.consignmentASNError = '';
          alert("Consignment has been blocked");
          this.modalService.dismissAll();
          this.getdata(this.ticketId);
        } else {
          alert(result.message || "Failed to block consignment");
        }
      },
      error: (err: any) => {
        console.error(err);
        this.error = err;
      }
    });
}


  checkTicket() {
    if ((this.data.assigned_user_id === '0')) {
      const temp: any = [{ user_name: 'unassigned', user_id: '0' }];
      this.technicianList = Array.prototype.concat.apply([], [temp, this.assignees]);
      for (let i = 0; i < this.technicianList.length; i++) {
        if (this.data.assigned_user_id === this.technicianList[i].user_id) {
          this.assignedUserName = this.technicianList[i].user_name;
        }
      }
      this.isAccepted = 'false';
      this.isViewDoc = false;
      this.showAssign = false;
    } else if (this.data.assigned_user_id === this.userID) {
      const temp: any = [{ user_name: 'unassigned', user_id: '0' }];
      this.technicianList = Array.prototype.concat.apply([], [temp, this.assignees]);
      for (let i = 0; i < this.technicianList.length; i++) {
        if (this.data.assigned_user_id === this.technicianList[i].user_id) {
          this.assignedUserName = this.technicianList[i].user_name;
        }
      }
      this.isAccepted = 'true';
      this.isViewDoc = true;
      this.ticketAssignedUser = true;
      this.showAssign = true;
    } else {
      const temp: any = [{ user_name: 'unassigned', user_id: '0' }];
      this.technicianList = Array.prototype.concat.apply([], [temp, this.assignees]);
      for (let i = 0; i < this.technicianList.length; i++) {
        if (this.data.assigned_user_id === this.technicianList[i].user_id) {
          this.assignedUserName = this.technicianList[i].user_name;
        }
      }
      this.isAccepted = 'null';
      this.isViewDoc = false;
      this.showAssign = false;
    } // Assigned Used
  }

  consignmentCheck(part: any, consignment_temp: TemplateRef<any>, simple_alert: TemplateRef<any>) {
      if (this.data.status_id != 11000) {
    return;
    }
   if (!this.partsSaved) {
    alert("Please save parts before blocking consignment");
    this.buttonSpin = false;
    // part.fromConsignedStock = false;

    return;
  }
    if(this.repairHd.svc_remarks === this.repairHd.technician_note || this.repairHd.svc_remarks === '') {
      this.buttonSpin = false;
      part.fromConsignedStock = false;
      alert("Please update Repair Notes");
      return;
    }
    this.consignmentPartNumber = part.part_no;
    if (part.fromConsignedStock === true) {
      this.consignmentType = '';
      this.getConsignment(consignment_temp, part);
    } else {
      let r;
      r = confirm('Are sure want to remove Consignment?');
      if (r === true) {
        this.dataService.unblockConsignment(this.ticketId, this.consignmentASN)
          .subscribe({
            next: (res: any) => {
              if (res.status) {
                alert("Consignment Unblocked Successfully");
                for (let i = 0; i < this.selectedParts.length; i++) {
                  if (this.selectedParts[i].part_no === this.consignmentPartNumber) {
                    this.selectedParts[i].fromConsignedStock = false;
                    this.selectedParts[i].consignment_asn_no = '';
                    part.fromConsignedStock = false;
                    part.consignment_asn_no = '';
                    part.consignmentType = '';
                    part.consignmentASN = '';
                  }
                }
              } else {
                alert("Failed to unblock consignment: " + res.message);
                // rollback
                for (let i = 0; i < this.selectedParts.length; i++) {
                  if (this.selectedParts[i].part_no === this.consignmentPartNumber) {
                    this.selectedParts[i].fromConsignedStock = true;
                  }
                }
              }
            },
            error: () => {
              alert("Error while unblocking consignment");
              for (let i = 0; i < this.selectedParts.length; i++) {
                if (this.selectedParts[i].part_no === this.consignmentPartNumber) {
                  this.selectedParts[i].fromConsignedStock = true;
                }
              }
            }
          });
      } else {
        this.getdata(this.ticketId);
        for (let i = 0; i < this.selectedParts.length; i++) {
          if (this.selectedParts[i].part_no === this.consignmentPartNumber) {
            this.selectedParts[i].fromConsignedStock = true;
          }
        }
      }
    }
  }


  confirm(inputdata: string, simple_alert_temp: TemplateRef<any>, create_svc_temp: TemplateRef<any>) {
    let result: any;
    if (inputdata === 'SVC') {
      this.showSVCForm = 'true';
      this.modalService.dismissAll();
      this.openModal(create_svc_temp);
    } else if (inputdata === 'serviceAssign') {
      this.dataService.assignTicket(this.ticketId, this.technicianId)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.getdata(this.ticketId);
            } else {
              this.simpleAlert = { title: 'Assign Ticket', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
      this.modalService.dismissAll();
    } else if (inputdata === 'S3') {
      this.DeleteS3ImageUpload();
      this.modalService.dismissAll();
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('id');
  }

  assignValues() {
    this.repairTypes = [
      { label: 'Carry-In', value: 'CIN' },
      { label: 'Service Non-Repair Case', value: 'SVNR' },
    ];
    this.repairClassifications = [
      { label: 'DIRECT', value: 'DIRECT' },
      { label: 'INDIRECT', value: 'INDIRECT' }
    ];
    this.repairClassification = this.repairClassifications[0].value;
  }

  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }

  selectTechnician(value: string, confirm_alert_temp: TemplateRef<any>) {
    for (let i = 0; i < this.technicianList.length; i++) {
      if (value === this.technicianList[i].user_name) {
        this.technicianId = this.technicianList[i].user_id;
      }
    }
    const msg = 'Are you sure want to assign this ticket to ' + value;
    this.confirmAlert = { id: 'serviceAssign', title: 'Assign Ticket', msg: msg };
    this.openModal(confirm_alert_temp);
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  hideModel() {
    this.buttonSpin = false;
    this.kbbImageZoom = false;
    this.notfilled = false;
    this.productCode = '';
    this.productFamily = 'Select Product Family';
    this.modalService.dismissAll();
  }

  hideQuoteModel() {
    this.buttonSpin = false;
    this.modalService.dismissAll();
    this.getdata(this.ticketId);
  }

  cancelModel() {
    this.buttonSpin = false;
    this.modalService.dismissAll();
    this.partDetails = [];
    this.eeeSearch = '';
    this.partSearch = '';
    this.warrantyExpiryDate = '';
  }

  cancel() { //tekne
    this.modalService.dismissAll();
    this.notfilled = false;
    const tempstate = this.dataTemp.status_name;
    this.data.status = tempstate;
    this.data.statusclr = this.dataTemp.statusclr;
  }

  playAudio(call: { recording_url: string; id: any; isPlay: boolean; }) { //tekne
    this.callAudio.src = call.recording_url;
    this.callAudio.load();
    for (let i = 0; i < this.customerPhoneLogs.length; i++) {
      this.customerPhoneLogs[i].isPlay = false;
      if (call.id === this.customerPhoneLogs[i].id) {
        this.callAudio.play();
        call.isPlay = true;
      }
    }
  }

  stopAudio(call: { isPlay: boolean; }) { //tekne
    this.callAudio.pause();
    call.isPlay = false;
  }

  closeCallDialog() { //tekne
    this.buttonSpin = false;
    this.callAudio.pause();
    this.modalService.dismissAll();
  }


  notifyCollapse() {
    if (this.upArrow) {
      this.notifyUpArrow = false;
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.notifyUpArrow = true;
      this.isCollapsed = !this.isCollapsed;
    }
  }

  smsmNotifyFun() {
    if (this.smsUpArrow) {
      this.smsUpArrow = false;
    } else {
      this.smsUpArrow = true;
      this.smsNotifyTab = !this.smsNotifyTab;
    }
  }

  emailNotifyFun() {
    if (this.emailUpArrow) {
      this.emailUpArrow = false;
      this.emailNotifyTab = !this.emailNotifyTab;
    } else {
      this.emailUpArrow = true;
      this.emailNotifyTab = !this.emailNotifyTab;
    }
  }


  collapse() {
    if (this.upArrow) {
      this.upArrow = false;
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.upArrow = true;
      this.isCollapsed = !this.isCollapsed;
    }
  }

  paymentAdvFun() {
    if (this.upAdvArrow) {
      this.upAdvArrow = false;
      this.isAdvancetab = !this.isAdvancetab;
    } else {
      this.upAdvArrow = true;
      this.isAdvancetab = !this.isAdvancetab;
    }
  }

  paymentInvFun() {
    if (this.upInvArrow) {
      this.upInvArrow = false;
      this.isInvoicetab = !this.isInvoicetab;
    } else {
      this.upInvArrow = true;
      this.isInvoicetab = !this.isInvoicetab;
    }
  }

  getOptions() {
    this.dataService.getOptions()
      .subscribe({
        next: (data: any) => {
          this.statusOptions = data;
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getCustomerInfo(id: any) {
    let result: any;
    this.dataService.getCustomerInfo(id, this.data.customer_phone_no)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.customerInfo = result.customer;
            this.customerFirstName = this.customerInfo.first_name;
            this.customerLastName = this.customerInfo.last_name;
            this.customerInfo.address = this.customerInfo.address1 + '\n' + this.customerInfo.address2 + '\n' +
              this.customerInfo.city + '\n' + this.customerInfo.state + '\n' + this.customerInfo.pin;
          }
        });
  }

  onFileUpload(event: { target: { files: any[]; }; }) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      this.documentTemp = event.target.files[0];
      reader.readAsDataURL(this.documentTemp);
      reader.onload = () => { // called once readAsDataURL is completed
        this.selectedFile = reader.result;
        this.dcolor = false;
      };
    }
  }

  upload(desc: string | number | boolean) {
    this.buttonSpin = true;
    const today = new Date().toDateString();
    const docs: any = [];
    if (this.documentType !== 'Select document type') {
      this.bcolor = false;
    } else {
      this.bcolor = true;
    }
    if (desc === '') {
      alert('Please enter the description');
      this.buttonSpin = false;
      return;
    }
    if (this.documentTemp.length !== 0) {
      docs.push({
        document_type: this.documentType,
        file_name: this.documentTemp.name,
        extension: this.documentTemp.type.split('/')[1],
        date: today,
        file: this.selectedFile,
        description: encodeURIComponent(desc)
      });
    } else {
      this.dcolor = true;
    }

    if (this.dcolor === false && this.bcolor === false) {
      if (this.documentTemp.size <= 8000000 || this.documentType === 'Video') {
        let blobData;
        let file: any;
        if (this.documentType === 'Video') {
          blobData = this.convertBase64ToBlob(this.selectedFile);
          file = new Blob([blobData], { type: "image/png" });
        } else {
          blobData = this.convertBase64ToBlob(this.selectedFile);
          file = new Blob([blobData], { type: 'video/mp4' })
        }
        // saves as image
        let filename = this.documentType + '_' + this.ticketId + '.' + this.documentTemp.type.split('/')[1];
        if (this.documentType === 'Other') {
          const existingOtherFiles = this.S3Data.filter((file: { type: string; }) => file.type === 'Other');
          if (existingOtherFiles.length > 0) {
            const lastUploadedFile = existingOtherFiles[existingOtherFiles.length - 1];
            const fileID = lastUploadedFile.file_id.split('_');
            let increament = fileID[0].match(/\d+/);
            increament = +increament + +1;
            const newFileID = 'Other' + increament;
            filename = newFileID + '_' +'T'+ this.ticketId + '.' + this.documentTemp.type.split('/')[1];
          }
        }
        if (this.documentType === 'Device images') {
          const existingOtherFiles = this.S3Data.filter((file: { type: string; }) => file.type === 'Device images');
          if (existingOtherFiles.length > 0) {
            const lastUploadedFile = existingOtherFiles[existingOtherFiles.length - 1];
            const fileID = lastUploadedFile.file_id.split('_');
            let increament = fileID[0].match(/\d+/);
            increament = +increament + +1;
            const newFileID = 'Device images' + increament;
            filename = newFileID + '_' + this.ticketId + '.' + this.documentTemp.type.split('/')[1];
          }
        }
        let type = this.documentType;
        const bucketName = 'ample-accy';
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = String(today.getFullYear()).padStart(2, '0');
        const folder = year + '/' + month + '/' + day + '/' + this.ticketId;
        if (this.documentType !== 'Video') {
          this.userDataService.uploadFileToS3Bucket(file, bucketName, filename, folder)
            .then((fileUrl) => {
              this.updateS3Data(file, filename, type, desc);
            })
            .catch((error) => {
              alert('Error uploading file:' + error);
            });
        }
        if (this.documentType === 'Video') {
          this.userDataService.uploadVideoS3Bucket(file, bucketName, folder, filename)
            .then((fileUrl) => {
              this.updateS3Data(file, filename, type, desc);
            })
            .catch((error) => {
              alert('Error uploading file:' + error);
            });
        }
        this.description = null;
        this.dcolor = false;
      } else {
        this.dError = 'File size should be less than 5MB';
        this.buttonSpin = false;
      }
    } else {
      this.buttonSpin = false;
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

  gettimelinedata(ticketId: string | null, recent_update_temp: TemplateRef<any>) {
    this.dataService.timelineData(ticketId)
      .subscribe({
        next: (data: any) => {
          this.timelineData = data;
          if (this.timelineData.status !== 'false') {
            this.recentData = this.timelineData.timeline;
          } else {
            this.recentData = [];
          }
          this.openModal(recent_update_temp);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  updateS3Data(file: any, filename: any, type: any, desc: any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year + '/' + month + '/' + day + '/' + this.ticketId;
    const commonData = '&ticket_id=' + this.ticketId + '&type=' + type + '&side=' + desc + '&bucket_name=' + 'ample-accy' + '&name=' + filename + '&folder=' + folder;

    this.userDataService.updateS3FileTekne(commonData)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          alert('File has been uploaded successfully');
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  typeExistsInDocumentTypes(type: string): boolean {
    return (this.documentTypes.some(docType => docType.value === type) || type === 'RAF');
  }

  getdata(ticket_id: string | null) {
    let results: any = [];
    this.dataService.getDetail(ticket_id)
      .subscribe({
        next: (data: any) => {
          results = data;
          this.clicked = false;
          this.dataTemp = data;
          this.dataTemp = this.dataTemp.tickets[0];
          this.repairHd = results.service_data[0].repair_hd[0];
          this.repairDt = results.service_data[0].repair_dt;
          this.technicianComments = results.service_data[0].tech_notes;
          this.data = this.dataTemp;
          this.l1InvoiceNo = this.data.l1_invoice_id;
          if(this.repairHd) {
            this.repairType = this.repairHd.repair_type;
          }
          this.repairWarranty = this.repairHd.repair_warranty;
          let issue = this.issuesTemp.filter((item: any) => item.id == this.repairHd.issue_code);
          this.issueSelected = issue.label;
          this.getAssignee();
          this.title = this.data.problem_reported;
          if (this.title.length > 100) {
            this.title = this.title.slice(0, 150);
            this.title = this.title + '...';
          }
          this.ticketId = '';
          this.ticketId = this.data.id;
          this.poNo = this.data.branch_code + this.ticketId;
          this.warrantyStatus = this.data.warranty_status;
          this.data.serial_no = this.data.serial_no.toUpperCase();
          this.productName = this.data.product_description;
          this.componentCode = this.repairHd.component_code;
          this.issues = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode) > -1);
          this.issueCode = this.repairHd.issue_code;

          this.selectedParts = [];
          for (let j = 0; j < this.repairDt.length; j++) {
            let consign1 = false;
            if(this.repairDt[j].from_consigned_stock == 1) {
              consign1 = true;
            }
          this.selectedParts.push({
            number: this.repairDt[j].part_number,
            partUsed: this.repairDt[j].part_used,
            description: this.repairDt[j].description,
            coverageOption: this.repairDt[j].coverage_option,
            componentCode: this.repairDt[j].component_code,
            issueCode: this.repairDt[j].issue_code,
            fromConsignedStock: consign1,
            consignmentType: this.repairDt[j].consignment_type,
            consignmentASN: this.repairDt[j].consignment_asn_no,
            kbb_serial_no: this.repairDt[j].kbb_serial_no,
          });
        }
          if(this.data.exception == 1) {
            this.otpValidated = true;
            this.isException = true;
          }
          if (this.repairHd.svc_remarks === '') {
            this.svcRemarks = this.repairHd.technician_note;
          } else {
            this.svcRemarks = this.repairHd.svc_remarks;
          }

          // this.ageingTime = results.ageing.days + 'Day:' + results.ageing.hours + 'Hr:' + results.ageing.minutes + 'Min';
          this.kbbDisplayImageList = [];
          this.getDocuments(this.ticketId);
          // console.log('User Role:', this.userRole);
          // console.log('Approver Role:', this.data.approver_role);

          // if(this.userRole == this.data.approver_role) {
            if(this.userRole === "2") {
            this.isApprover = true;
          } else {
            this.isApprover = false;
          }
          this.loading = false;
          this.getParts();
          this.getTicketDetail();
          this.checkTicket();

          this.getCustomerInfo(this.data.customer_id);

          this.html = '';
          this.html = this.html + '<span>' + 'Token No' + '&nbsp;' + '-' + '&nbsp;' + this.data.token_no + '</span><br/>' + '<span>' + 'Family' + '&nbsp;' + '-' + '&nbsp;' + this.data.product_family + '</span><br/>' + '<span>' + 'Product' + '&nbsp;' + '-' + '&nbsp;' + this.data.product_category + '</span><br/>';
          this.myTime = new Date(this.data.entrytime);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getParts() {
      let result: any;
      this.dataService.getParts(this.data.serial_no)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.parts = result.items;
              this.partsTemp = this.parts;
              for (let i = 0; i < this.parts.length; i++) {
                this.parts[i].isCheck = false;
                // this.parts[i].fromConsignedStock = false;
              }
              this.errorMsg = '';
              this.buttonSpin = false;
            } else {
              this.buttonSpin = false;
              this.errorMsg = result.message;
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
  }


  checkPhysicalLocation() {
    if (this.physicalLocation !== null) {
      this.buttonSpin = true;
      let result: any;
      if(this.physicalLocation >= 601 && this.physicalLocation <= 700) {
      this.dataService.checkPhysicalLocation(this.ticketId, this.physicalLocation, this.data.branch_code, this.data.family_id)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              this.physicalMsg = result.message;
              setTimeout(() => {
                this.physicalError = '';
                this.getdata(this.ticketId);
              }, 3000);
            } else {
              this.buttonSpin = false;
              this.physicalError = result.message;
              setTimeout(() => {
                this.physicalError = '';
              }, 3000);
            }
          });
        } else {
          alert('Physical location should be between 601 to 700');
          this.buttonSpin = false;
          return;
        }
    }
  }

  getTicketDetail() {
    let analysisTemp: any = [];
    this.dataService.getTicketDetail(this.ticketId)
      .subscribe({
        next: (data1: any) => {
          let resul: any = data1;
          this.getSVC(resul.service_report);
          // this.declinedGNumbers = resul.declined_repairs.status === true ? resul.declined_repairs.repairs : [];
          // this.consumablesCheck = resul.consumable_required;
          this.getnotifications(resul.notifications);
          // this.gsxStatus = resul.gsx_status;
          // this.repairStages = resul.repair_stage;
          // this.getQuotation(this.ticketId);
          if (resul.analysis.status === true) {
            analysisTemp = resul.analysis.analysis;
            for (let i = 0; i < analysisTemp.length; i++) {
              this.analysisList.push(analysisTemp[i]);
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }


  getDocuments(ticketId: string | null) {
    let result: any = [];
    this.documents = [];
    this.kbbDisplayImageList = [];
    this.userDataService.getS3FileDetails_tekne(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.S3Data = result.images_raf;
            this.S3Data = this.S3Data.filter((item: any) => item.type !== 'Sig');
            if (this.S3Data.length === 0) {
              this.isExDocuments = false;
            }
            this.documentsCheck(this.S3Data, 'S3');
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
    this.documentType = 'Select document type';
  }

  documentsCheck(result: any, type: any) {
    let qdocs: any = [];
    let kdocs: any;
    let docs: any = [];
    if (type === 'S3') {
      this.isS3Document = true;
    } else if (type === 'nonS3') {
      this.isS3Document = false;
    }
    for (let i = 0; i < result.length; i++) {
        if (((result[i].document_type === 'AST MRI') || (result[i].document_type === 'Display Panel') || (result[i].document_type === 'Barcode Serial')) || ((result[i].type === 'AST MRI') || (result[i].type === 'Display Panel') || (result[i].type === 'Barcode Serial'))) {
          kdocs = result[i];
          kdocs.removeDocOpt = true;
          this.kbbDisplayImageList.push(kdocs);
        } else {
          if (type === 'S3') {
            if (result[i].type === 'ID' || result[i].type === 'mesh' || result[i].type === 'Video' || result[i].type === 'Other' || result[i].type === 'POP' || result[i].type === 'Device images' || result[i].type === 'RAF') {
              docs = result[i];
              this.documents = Array.prototype.concat.apply([], [docs, this.documents]);
              this.isExDocuments = true;
            }
          } else {
            docs = result[i];
            this.documents = Array.prototype.concat.apply([], [docs, this.documents]);
            this.isExDocuments = true;
          }
      }
    }

    for (let j = 0; j < result.length; j++) {
      const index = this.documents.findIndex((document: { id: any; }) => document.id === result[j].id);
      if (index !== -1) {
        if (
          (result[j].document_type === 'customer_pop' || result[j].document_type === 'customer_id') ||
          (result[j].type === 'POP' || result[j].type === 'ID')
        ) {
          this.documents[index].removeDocOpt = false;

            if(result[j].type === 'POP') {
              this.POPImageUrl = 'https://ample-accy.s3.ap-south-1.amazonaws.com/' + result[j].folder + '/' + result[j].file_id;
            }
        } else {
          this.documents[index].removeDocOpt = true;
        }
      }
    }
    this.documentType = 'Select document type';
  }

  getAssignee() {
    this.dataService.getAssignees(this.userID)
      .subscribe({
        next: (data: any) => {
          const assigneeData: any = data;
          this.assignees = assigneeData.user;
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  removeDoc(doc: { id: any; ticket_id: any; }, confirm_alert_temp: TemplateRef<any>, S3Doc?: any, folder?: any, file_id?: any) {
    if (S3Doc) {
      this.selectedS3Doc = folder + '/' + file_id;
      this.selectedS3Id = file_id;
      const msg = 'Are you sure want to delete this document?';
      this.confirmAlert = { id: 'S3', title: 'Delete Document', msg: msg };
    } else {
      this.selectedDocument = { doc_id: doc.id, doc_tid: doc.ticket_id };
      const msg = 'Are you sure want to delete this document?';
      this.confirmAlert = { id: '00', title: 'Delete Document', msg: msg };
    }
    this.openModal(confirm_alert_temp);
  }

  downloadDoc(doc: { document_type: string; extension: string; file_name: string | Blob; }) {
    const docName: string = doc.document_type + '.' + doc.extension;
    saveAs(doc.file_name, docName);
  }

  downloadS3Doc(doc: { folder: any; type: string; file_id: string; }) {
    const docName: string = doc.folder + doc.file_id;
    saveAs(doc.type, docName);
  }

  approveL1() {
    if(this.l1InvoiceNo == '') {
      alert('Please validate POP before approving L1');
      this.buttonSpin = false;
      return;
    }
    this.buttonSpin = true;
    let result: any;
    this.dataService.approveL1(this.ticketId, this.repairHd.id).subscribe(
      (data: any) => {
        result = data;
        if (result.status === true) {
          this.getdata(this.ticketId);
          alert(result.message);
        } else {
          alert(result.message);
        }
        this.buttonSpin = false;
      });
  }

  rejectL1() {
    this.buttonSpin = true;
    let result: any;
    this.dataService.rejectL1(this.ticketId, this.repairHd.id).subscribe(
      (data: any) => {
        result = data;
        if (result.status === true) {
          this.getdata(this.ticketId);
          alert(result.message);
        } else {
          alert(result.message);
        }
        this.buttonSpin = false;
      });
  }

  /* ******************* Service Report ******************* */

  updateSvcRemarks() {
    this.buttonSpin = true;
    let result: any;
    //tekne repair_hd need to check
    this.dataService.updateSvcRemarks(this.svcRemarks, this.ticketId, this.repairHd.id).subscribe(
      (data: any) => {
        result = data;
        if (result.status === true) {
          this.getdata(this.ticketId);
          alert(result.message);
        } else {
          alert(result.message);
        }
        this.buttonSpin = false;
      });
  }

  deleterow(idx: any) {
    this.sPartDetails.splice(idx, 1);
  }

  getSVC(SVC: any) {
    if (SVC.length !== 0) {
      this.isExistSvc = true;
      this.existSvc = SVC;
      for (let i = 0; i < this.existSvc.length; i++) {
        if (this.existSvc[i].status === 'Active') {
          this.showSVCForm = 'null';
          this.isSVCActive = true;
          this.svcId = this.existSvc[i].id;
          break;
        } else {
          this.showSVCForm = 'false';
        }
      }
    } else {
      this.isExistSvc = false;
      this.existSvc = [];
      this.showSVCForm = 'false';
    }
  }

  viewSVC() {
    const tab: any = window.open();
    this.dataService.showSVC(this.ticketId)
      .subscribe(
        (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
        });
  }

  deleteSVC(svcId: string, delete_svc_temp: TemplateRef<any>) {
    this.deleteSvcId = svcId;
    this.openModal(delete_svc_temp);
  }

  deleteSvcConfirm(simple_alert_temp: any) {
    if (this.deleteSvcRemarks === '') {
      this.notfilled = true;
    } else {
      let result;
      this.dataService.deleteSVC(this.ticketId, this.deleteSvcId, this.deleteSvcRemarks)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.getSVC(this.ticketId);
              this.modalService.dismissAll();
            } else {
              this.simpleAlert = { title: 'Service Report', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          });
    }
  }


  callGenerateSVC(reportData: any, simple_alert_temp: TemplateRef<any>) {
    let result: any;
    this.dataService.generateSVC(this.ticketId, reportData, this.sPartDetails)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.sPartDetails = [];
            this.getSVC(this.ticketId);
            this.svcDiagnosis = '';
            this.buttonSpin = false;
          } else {
            this.buttonSpin = false;
            this.showSVCForm = 'false';
            this.sPartDetails = [];
            this.simpleAlert = { title: 'Create Repair', msg: result.message };
            this.openModal(simple_alert_temp);
          }
        });
  }

  svcFileUpload(event: { target: { files: any[]; }; }) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      this.svcDocumentTemp = event.target.files[0];
      reader.readAsDataURL(this.svcDocumentTemp);
      reader.onload = () => { // called once readAsDataURL is completed
        this.selectedFile = reader.result;
        this.qcolor = false;
      };
    }
  }

  /************ Analysis **************/

  updateAnalysis(analysis: any) {
    let result: any;
    this.dataService.uploadAnalysis(this.ticketId, analysis)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.analysisText = '';
            this.getAnalysis(this.ticketId);
          }
        });
  }

  getAnalysis(ticketId: string | null) {
    let result: any;
    let analysisTemp: any = [];
    this.analysisList = [];
    // this.ccAnalysisList = [];
    this.dataService.getAnalysis(ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            analysisTemp = result.analysis;
            for (let i = 0; i < analysisTemp.length; i++) {
              if ((analysisTemp[i].group_id !== '9') || (analysisTemp[i].group_id !== '16') || (analysisTemp[i].group_id !== '17')) {
                this.analysisList.push(analysisTemp[i]);
              }
              if ((analysisTemp[i].group_id === '9') || (analysisTemp[i].group_id === '16') || (analysisTemp[i].group_id === '17')) {
                // this.ccAnalysisList.push(analysisTemp[i]);
              }
            }
          } else {
            this.analysisList = [];
            // this.ccAnalysisList = [];
          }

        });
  }

  viewRaf() {
    const tab: any = window.open();
    this.dataService.viewRaf(this.ticketId)
      .subscribe(
        (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
        });
  }

  viewEnquiry() {
    const tab: any = window.open();
    this.dataService.viewEnquiry(this.ticketId)
      .subscribe(
        (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
        });
  }

  sendRaf() {
    let result: any;
    this.dataService.sendRAF(this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          alert(result.message);
          this.getdata(this.ticketId);
          // window.location.reload();
        });
  }



  ccUpdateAnalysis(analysis: any) {
    let result: any;
    this.dataService.uploadAnalysis(this.ticketId, analysis)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            // this.ccAnalysisText = '';
            // this.ccGetAnalysis(this.ticketId);
            this.getAnalysis(this.ticketId);
          }
        });
  }

  /************ google drive **************/

  openImage(fileId: string) {
    const imageURL = 'https://api.icareservice.co.in/gdrive4/google-api-php-client/examples/download.php?fileId=' + fileId;
    window.open(imageURL, '_blank');
  }
  imageLoadError(event: any): void {
    this.s3ImageOpenAlert = 'This format is not viewable here; please use the link in the table below to access the content.';
  }

  validatePOP(POP_image_temp: any) {
    // this.POPImageUrl = 'https://ample-accy.s3.ap-south-1.amazonaws.com/' + '2025/03/24/T100009' + '/' + 'Other_T100009.jpeg';
    // window.open(this.POPImageUrl, '_blank');
    this.modalService.open(POP_image_temp);
  }

  validateL1POP() {
    this.buttonSpin = true;
    let result: any;
      this.dataService.validateL1POP(this.ticketId, this.l1InvoiceNo)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.getdata(this.ticketId);
              this.buttonSpin = false;
            }
    });
  }

  openS3Image(folder: any, fileId: string, docModel?: any, contentType?: any) {
    this.s3ImageOpenAlert = '';
    // const folderId = folder.split("/", 4);
    // folder = `${folderId[0]}/${folderId[1]}/${folderId[2]}/T${folderId[3]}`;
    this.s3ImageUrl = 'https://ample-accy.s3.ap-south-1.amazonaws.com/' + folder + '/' + fileId;
    if (docModel) {
      if (contentType === 'Video') {
        this.contentType = 'video';
      } else {
        this.contentType = 'image';
      }
      this.modalService.open(docModel);
    } else {
      window.open(this.s3ImageUrl, '_blank');
    }
  }

  /************ Notifications **************/

  getnotifications(result: any) {
    let rafMails: any = [];
    let quoteMails: any = [];
    let svcMails: any = [];
    let notificationEmails: any = [];
    if (result.status === true) {
      this.smsNotifications = result.sms;
      // quoteMails = result.quotation_emails;
      svcMails = result.svc_emails;
      rafMails = result.raf_emails;
      notificationEmails = result.notification_emails;
      for (let k = 0; k < rafMails.length; k++) {
        this.emailNotifications.push({
          type: 'RAF',
          date: rafMails[k].email_send_time,
          sendStatus: rafMails[k].email_send,
          status: rafMails[k].status
        });
      }

      if(svcMails.lenght > 0) {
        for (let j = 0; j < svcMails.length; j++) {
          this.emailNotifications.push({
            type: 'SVC',
            date: svcMails[j].email_send_time,
            sendStatus: svcMails[j].email_send,
            status: svcMails[j].status
          });
        }
      }

      if(svcMails.lenght > 0) {
      for (let j = 0; j < notificationEmails.length; j++) {
        this.emailNotifications.push({
          type: 'Notification',
          date: svcMails[j].email_send_time,
          sendStatus: svcMails[j].email_send,
          status: svcMails[j].status
        });
      }
    }
    }
  }

  moveToDianosis(diagnoisis_move_temp: TemplateRef<any>) {
    this.openModal(diagnoisis_move_temp);
  }

  updateTimerDisplay(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    this.countDown = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  startCountdown() {
    let remainingTime = this.countdownTime;
    this.updateTimerDisplay(remainingTime);

    const countdownInterval = setInterval(() => {
      remainingTime--;

      if (remainingTime >= 0) {
        this.updateTimerDisplay(remainingTime);
      } else {
        clearInterval(countdownInterval);
        this.modalService.dismissAll();
      }
    }, 1000); // Update every second
  }

  // S3 images
  getS3Images() {
    let result;
    this.userDataService.getS3FileDetails_tekne(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.S3Data = result.images;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  DeleteS3ImageUpload() {
    this.buttonSpin = true;
    // console.log(filename.folder+'/'+filename.file_id);
    const bucketName = 'ample-accy';
    // const fileName = filename.folder+'/'+filename.file_id;
    const fileName = this.selectedS3Doc;
    const fileId = this.selectedS3Id;
    this.userDataService.deleteFileFromS3Bucket(bucketName, fileName)
      .then((response) => {
        this.userDataService.deleteS3File(bucketName, fileId, this.ticketId)
          .subscribe({
            next: (data: any) => {
              if (data) {
                this.buttonSpin = false;
                alert(data.message);
                // this.getDocuments(this.ticketId);
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  }

  showInboxLetter(inbox_letter_temp: TemplateRef<any>) {
    this.openModal(inbox_letter_temp);
  }

  onExceptionSelect(event: Event, exception_modal: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked) {
      this.getExceptionApprovers(exception_modal);
    }
  }

  sendExceptionOTP() {
    let result: any;
    this.dataService.getExceptionOTP(this.ticketId, this.exceptionApprover, this.branchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.showEnterOTP = true;
            this.showValidateOTP = true;
            this.exceptionOtp = result.otp;
          } else {
            console.log(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getExceptionApprovers(exception_modal: any) {
    let result: any;
    this.dataService.getExceptionApprovers(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.exceptionApprovers = result.data;
            this.openModal(exception_modal);
          } else {
            console.log(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  validateExceptionOTP() {
    if(this.exceptionOtp == this.exceptionOtpEntered) {
      this.updateExceptionOnTicket();
    } else {
      alert('Invalid OTP, please enter the correct OTP');
      this.showValidateOTP = true;
    }
  }

  updateExceptionOnTicket() {
    let result: any;
    this.dataService.updateException(this.ticketId, this.exceptionApprover)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            alert('OTP Validated');
            this.otpValidated = true;
            this.modalService.dismissAll();
            this.exceptionOtp = '';
          } else {
            console.log(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  popUpload(pop_upload_temp: TemplateRef<any>) {
    this.openModal(pop_upload_temp);
  }

  uploadfun(uploadType: any) {
    this.buttonSpin = true;
    if (this.imageTemp.length !== 0) {
      const docs: any = [];
      docs.push({
        file_name: this.imageTemp.name,
        extension: this.imageTemp.type.split('/')[1],
        date: new Date().toDateString(),
        file: this.selectedFile,
      });
      let result: any;
      this.dataService.uploadPics(this.ticketId, this.data.serial_no, this.imageTemp.size, docs, uploadType)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.buttonSpin = false;
              this.imageTemp = [];
            } else {
              this.modalService.dismissAll();
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      this.buttonSpin = false;
      this.modalService.dismissAll();
    }
  }

  getComponents() {
    let result: any;
    let ampleResponse: any = [];
    let issuesList: any = [];
    this.dataService.getComponent(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            ampleResponse = result.componentIssues;
            this.ampleComponentIssues = ampleResponse;
            for (let i = 0; i < ampleResponse.length; i++) {
              this.components.push({
                label: ampleResponse[i].componentDescription,
                value: ampleResponse[i].componentCode
              });
              if (ampleResponse[i].issues) {
                issuesList = ampleResponse[i].issues;
                for (let j = 0; j < issuesList.length; j++) {
                  this.issuesTemp.push({
                    label: issuesList[j].code + '-' + issuesList[j].description,
                    value: issuesList[j].code,
                    comptia: ampleResponse[i].componentCode
                  });

                  this.componentIssueList.push({
                    label: ampleResponse[i].componentDescription + '/' + issuesList[j].code + '-' + issuesList[j].description,
                    value: issuesList[j].code,
                    comptia: ampleResponse[i].componentCode
                  });
                }
              }
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  repairSelect(event: any) {
    if (this.components.length === 0) {
      let result: any;
      let ampleResponse: any;
      let issuesList: any = [];
      this.dataService.getComponent(this.ticketId)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              ampleResponse = result.componentIssues;
              this.ampleComponentIssues = ampleResponse;
              for (let i = 0; i < ampleResponse.length; i++) {
                this.components.push({
                  label: ampleResponse[i].componentDescription,
                  value: ampleResponse[i].componentCode
                });
                if (ampleResponse[i].issues) {
                  issuesList = ampleResponse[i].issues;
                  for (let j = 0; j < issuesList.length; j++) {
                    this.issuesTemp.push({
                      label: issuesList[j].code + '-' + issuesList[j].description,
                      value: issuesList[j].code,
                      comptia: ampleResponse[i].componentCode
                    });

                    this.componentIssueList.push({
                      label: ampleResponse[i].componentDescription + '/' + issuesList[j].code + '-' + issuesList[j].description,
                      value: issuesList[j].code,
                      comptia: ampleResponse[i].componentCode
                    });
                  }
                }
              }
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
    this.repairHd.repair_type = event;
      this.selectedParts = [];
    }

    componentsSelect(event: { value: any; }, comp: any) {
      if (comp === 'comp') {
        this.componentCode = event.value;
        this.issues = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode) > -1);
        this.flagIssue = false;
      }
    }

    issueSelect(event: { value: any; }, issue: any) {
      if (issue === 'issu') {
        this.issueCode = event.value;
      }
    }

    addPart(part_list_temp: TemplateRef<any>) {
      // console.log(this.isPartDetail);
      // console.log(this.isPartDetail);
      // console.log(this.isPartDetail);
      // console.log(this.errorMsg);
      this.buttonSpin = true;
      this.popLoading = true;
      if (this.partsTemp.length !== 0) {
        this.parts = this.partsTemp.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
        this.openModal(part_list_temp);
        this.popLoading = false;
      } else {
        this.getParts();
        this.parts = this.partsTemp.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
        this.openModal(part_list_temp);
        this.popLoading = false;
      }
    }

    selectPart(part: any) {
      let checkFlag = false;
      if (part.isCheck === true) {
          this.selectedParts.push({
            number: part.part_no,
            partUsed: part.part_no,
            description: part.description,
            fromConsignedStock: false,
            coverageOption: '',
            consignment_asn_no: ''
          });
        }
      }

      cancelConsignment(consignmentPartNumber: any, simple_alert: TemplateRef<any>) {
        for (let i = 0; i < this.selectedParts.length; i++) {
          if (this.selectedParts[i].number === consignmentPartNumber) {
            this.selectedParts[i].fromConsignedStock = false;
            this.selectedParts[i].consignmentType = '';
            this.selectedParts[i].consignment_asn_no = '';
          }
        }
        this.modalService.dismissAll();
        this.getdata(this.ticketId);
        this.consignmentASN = '';
        this.consignmentASNError = '';


      }

    addPartDetail(partno: any) {
      for (let j = 0; j < this.parts.length; j++) {
        if (this.parts[j].part_no === partno) {
          this.partDetail = this.parts[j];
          this.isPartDetail = true;
        }
      }
    }

  confirmPart(partno: string) {
  const partIndex = this.selectedParts.findIndex((p: any) => p.number === partno);
  if (partIndex === -1) return;

  if (this.data.status_id === '11000') {
    const formData =
      '&part_no=' + this.selectedParts[partIndex].number +
      '&ticket_id=' + this.ticketId +
      '&repair_hd=' + this.repairHd.id +
      '&asn_no=' + this.consignmentASN;

    this.dataService.deletePart(formData).subscribe({
      next: (res: any) => {
        if (res.status === true) {
          // Remove the part from local array
          this.selectedParts.splice(partIndex, 1);

          // Close the modal immediately
          this.modalService.dismissAll();

          // Optionally refresh list
          this.getdata(this.ticketId);

          // Clear memory
          this.confirmAlert = { id: '', title: '', msg: '' };
        } else {
          alert(res.message);
          this.modalService.dismissAll();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.modalService.dismissAll();
      }
    });
  } else {
    // For statuses other than 11000, remove locally
    this.selectedParts.splice(partIndex, 1);
    this.modalService.dismissAll();
    this.confirmAlert = { id: '', title: '', msg: '' };
  }
}

  removePart(partno: any, confirmPart_alert_temp: TemplateRef<any>) {
  this.confirmAlert = {
    id: partno,
    title: 'Remove Part',
    msg: 'Are you sure want to Remove this Part?'
  };
  this.modalService.open(confirmPart_alert_temp, { backdrop: 'static', keyboard: false });
}


    searchPart(event: { target: { value: string; }; }, type: string) {
      let partList: any = [];
      let eeepart: any = [];
      let eeeList: any = [];
      let descList: any = [];
      const word = event.target.value.toLowerCase();

      if ((word !== null) && (word !== '')) {
        if (type === 'eee') {
          this.partSearch = '';
          for (let i = 0; i < this.partsTemp.length; i++) {
            descList = _.filter(this.partsTemp, row => row.part_no.toLowerCase().indexOf(word) > -1);

            let eeecodes: any = [];
            eeecodes = this.partsTemp[i].eeeCodes;
            if (eeecodes !== undefined) {
              for (let j = 0; j < eeecodes.length; j++) {
                const eeecode = eeecodes[j].toLowerCase();
                if (eeecode === word) {
                  eeepart = this.partsTemp[i];
                  eeeList = Array.prototype.concat.apply([], [eeepart, eeeList]);
                }
              }
            }
          }
          this.parts = Array.prototype.concat.apply([], [descList, eeeList]);
          this.parts = this.parts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
        } else if (type === 'part') {
          this.eeeSearch = '';
          for (let i = 0; i < this.partsTemp.length; i++) {
            partList = _.filter(this.partsTemp, row => row.description.toLowerCase().indexOf(word) > -1);
          }
          this.parts = partList;
          this.parts = this.parts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
        }
      } else {
        this.parts = this.partsTemp;
      }
    }

    checkingSerialNumber(srNo: string) {
      const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(srNo);
    }
    removeSpecialCharacters(input: any) {
      return input.replace(/[^a-zA-Z0-9]/g, '');
      }

      savePartsDetails(simple_alert: TemplateRef<any>) {
        // console.log(this.isPartDetail);
        this.saveRepairNotes(simple_alert, 0);
        this.partsSaved = true;
      }
  // onSaveRepairNotes(simple_alert: TemplateRef<any>) {
  //   // Fetch the latest ticket data first
  //   interface SelectedPart {
  //     number: string;
  //     partUsed: string;
  //     description: string;
  //     fromConsignedStock: boolean;
  //     coverageOption?: string;
  //     consignment_asn_no?: string;
  //     typeDescription?: string;
  //     consignmentType?: string;
  //     consignmentASN?: string;
  //     kbb_serial_no?: string;
  //     kgb_serial_no?: string;
  //     kgb_part_no?: string;
  //   }

  //   const hasConsignment: boolean = (this.selectedParts as SelectedPart[]).some((part: SelectedPart) => part.fromConsignedStock === true);

  //   if (hasConsignment) {
  //     this.modalService.open(simple_alert, { centered: true });
  //     this.saveRepairNotes(simple_alert, 1);
  //   } else {
  //     this.saveRepairNotes(simple_alert, 1);
  //   }

  // }
  onSaveRepairNotes(simple_alert: TemplateRef<any>, qcModal: TemplateRef<any>) {
    // console.log(this.isPartDetail);
    if (this.repairType !== 'CIN') {

      const modalRef = this.modalService.open(qcModal, { centered: true });

      modalRef.result.then(
        (result) => {
          if (result === 'confirm') {
            this.saveRepairNotes(simple_alert, 1);
          }
        },
        () => {
          // Modal dismissed
          this.hideQuoteModel();
        }
      );
    } else {
      if (!this.selectedParts || this.selectedParts.length === 0) {
        alert("Please add at least one part before saving.");
        this.getdata(this.ticketId);
        return;
      }
      else {
        // directly save when not svnr
        this.saveRepairNotes(simple_alert, 1);
      }


    }
  }
  restoreParts() {
    const fParts: any = [];
    let parts: any = [];
    parts = this.selectedParts;
    if (this.selectedParts.length !== 0) {
      if ((this.repairType === 'CIN')) {
        for (let j = 0; j < parts.length; j++) {
          parts[j].kbb_serial_no = this.removeSpecialCharacters(parts[j].kbb_serial_no);
          if (((parts[j].kbb_serial_no != '') && (parts[j].kbb_serial_no != undefined))) {
            const serialNoCheck = this.checkingSerialNumber(parts[j].kbb_serial_no);
            let fromConsignment = 0;
            if (parts[j].fromConsignedStock === true) {
              fromConsignment = 1;
            } else {
              fromConsignment = 0;
            }

            fParts.push({
              ample_accy_repair_hd_id: this.repairHd.id,
              part_number: parts[j].number,
              part_used: parts[j].partUsed,
              description: parts[j].description,
              part_type: parts[j].typeDescription,
              from_consigned_stock: fromConsignment,
              coverage_option: parts[j].coverageOption,
              component_code:  this.componentCode,
              issue_code: this.issueCode,
              ticket_id: this.ticketId,
              consignment_type: parts[j].consignmentType,
              consignment_asn_no: parts[j].consignmentASN,
              kbb_serial_no: parts[j].kbb_serial_no,
              kgb_serial_no: parts[j].kgb_serial_no,
              kgb_part_no: parts[j].kgb_part_no,
            });
          }
          this.finalParts = fParts;
        }
      } else {
        this.finalParts = [];
      }
    }
  }


  saveRepairNotes(simple_alert: TemplateRef<any>, approval:any = 0) {
    this.repairHd.svc_remarks = this.svcRemarks?.trim();
    if( this.repairHd.svc_remarks === '') {
      this.buttonSpin = false;
      alert("Please enter Repair Notes");
      return;
    }
      this.buttonSpin = true;
      this.restoreParts();
      this.repairHd.purchase_order_number = this.poNo;
      this.repairHd.repair_classification = this.repairClassification;
      this.repairHd.component_code = this.componentCode;
      this.repairHd.issue_code = this.issueCode;
      this.repairHd.customer_intake_notes = this.data.customer_query;
      this.repairHd.repair_warranty = this.repairWarranty;
      if (this.repairType === 'CIN') {
      }
      let result;
      const uniqueParts = Array.from(new Set(this.finalParts));
      this.dataService.saveServiceNotes(this.ticketId, this.repairHd, uniqueParts, approval)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
                this.buttonSpin = false;
                this.getdata(this.ticketId);
            } else {
              this.simpleAlert = { title: 'Service Notes', msg: result.message };
              this.openModal(simple_alert);
              this.buttonSpin = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }

    approveQC() {
      let result;
      this.dataService.approveQc(this.ticketId, this.repairHd.id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
    }

    sendForQC() {
    if(this.repairHd.svc_remarks === this.repairHd.technician_note || this.repairHd.svc_remarks === '') {
      this.buttonSpin = false;
      alert("Please update the SVC remarks");
      return;
    }
    let result: any;
    this.dataService.sendForQc(this.ticketId,this.selectedOption)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }


} // Close Class
