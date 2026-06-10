import { Component, TemplateRef, ElementRef, ViewChild, ViewEncapsulation, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WinDashboardService } from '../win-dashboard.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

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
    templateUrl: './win-ticketdetail.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./win-ticketdetail.component.scss',
        '../../../../scss/customstyle.css',
        '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss'
    ],
    providers: [WinDashboardService],
    standalone: false
})

export class WinTicketdetailComponent {

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  @ViewChild('myInput', { static: true }) myInputVariable!: ElementRef;
  @ViewChild('myQInput', { static: true }) myQInputVariable!: ElementRef;
  @ViewChild('myPopInput', { static: true }) popInputVariable!: ElementRef;
  @ViewChild('homeOtpInput', { static: true }) otpInputVariable!: ElementRef;
  ticketId: any;
  loading = true;
  buttonSpin = false;
  clicked = false;
  isManager: any;
  isTechnician: any;
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
  isDevice: any = false;
  productName = '';
  warrantyStatuses: any = [
    { id: '0', name: 'Select Warranty Status' },
    { id: '1', name: 'Apple Limited Warranty' },
    { id: '2', name: 'Out of Warranty(No Coverage)' },
    { id: '3', name: 'AppleCare Protection Plan' },
    { id: '4', name: 'AppleCare Protection Plan Plus' },
  ];
  warrantyStatus = '';
  physicalDamage = false;
  imeiNo = '';
  physicalLocation: any;
  physicalError = '';
  physicalMsg = '';
  description: any = '';
  documentTemp: any = [];
  documents: any = [];
  selectedFile: any;
  removeDocOpt = false;
  quoteDocumentTemp: any = [];
  quoteSelectedFile: any;
  bcolor = false;
  dcolor = false;
  qcolor = false;
  qbcolor = false;
  lineColor = false;
  remarks = '';
  releaseRemarks = '';
  branchCode: any;
  title: any;
  changedata: any;
  requiredFields = false;
  requiredInputs: any = [];
  optionalFields = false;
  optionalInputs: any = [];
  submitbtn = false;
  optionvalue: any;
  notfilled = false;
  acceptSpinner = false;
  userRole;
  siteType;
  userID;
  userBranch;
  isAccepted = 'false';
  showAssign = false;
  documentType = 'Select document type';
  documentTypes;
  isExDocuments = false;
  isViewDoc = false;
  documentUrl: any;
  dError = '';
  selectedDocument: any = [];
  quotations: any = [];
  isQuoteMac = false;
  quoteTable = [];
  quoteError = '';
  partDetails: any = [];
  priceType = 'Select type';
  priceTypes: any = [];
  serviceCharge: any;
  enableServiceCharge = false;
  quoteServiceCharge: any = '';
  quotationACSPrice = '';
  quotationACSPartNo = '';
  quotationInsurencePrice: any;
  quoteType = 'Quotation';
  quoteOpf = '';
  qError = '';
  quoteId = '';
  quoteLimit = false;
  quoteDocuments: any = [];
  quoteDocumentsTypes: any = [];
  quoteDocumentType = 'Select document type';
  isExQuoteDocuments = false;
  currentQuoteStatus = '';
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  onsiteEngg: any = [];
  assignReassign: any;
  isService: any = true;
  servicePartInput: any = [{ serialNo: '', partNo: '', partDetail: '' }];
  sPartDetails: any = [];
  families: any = [];
  gsxRepairs: any = [];
  showRepairDetails = false;
  serviceTypes: any = [];
  repairDetails: any = [];
  repairedParts: any = [];
  analysisText: any = '';
  analysisList: any = [];
  winPartDetails: any = [];
  damageList: any = [];
  conditionError = '';
  typeofDamage = 'Select the Damage';
  pendingOptions: any = [
    { id: '0', name: 'Select Pending Status' },
    { id: '1', name: 'Apple Pending' },
    { id: '2', name: 'Ample Pending' },
    { id: '3', name: 'Customer Pending' },
  ];
  pendingRemarks = '';
  paymentDetails: any = [];
  paymentAdvance: any = [];
  paymentInvoice: any = [];
  isInvoice = false;
  isAdvance = false;
  ccAnalysisText: any = '';
  ccAnalysisList: any = [];
  ccTeam = false;
  EnquiryList: any = [];
  messageList: any = [];
  blueDartResult: any;
  trackData = '';
  ticketType = localStorage.getItem('ticket_type');
  isCollapsed = true;
  upArrow = true;
  upAdvArrow = false;
  upInvArrow = false;
  html: any;
  repairTypes: any = [];
  repairType: any = '';
  technicianComments: any = [];
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: Date = new Date();
  datePipe = new DatePipe('en-US');
  public myTime: Date = new Date();
  poNo = '';
  requestAppleReview: any = false;
  diagnosisHd: any = [];
  diagnosisDt: any = [];
  t1InvoiceNo = '';
  exceptionType = 'NA';
  tokenIssued = false;
  showTokenIssued = false;
  diagnosisHold = true;
  repairStages: any = [];
  repairStage = '';
  repairStagesTemp: any = [];
  showRepairStageList = false;
  ageingTime: any = '';
  showQCButton = false;
  showQCAButton = false;
  serialNoEdit = true;
  kdCall = false;
  gDriveData: any = [];
  serviceChargeHtml: any;
  enableCall = false;
  callId: any;
  isC3 = false;
  smsNotify = false;
  emailNotify = false;
  notifyUpArrow = false;
  smsUpArrow = false;
  emailUpArrow = false;
  smsNotifyTab = false;
  emailNotifyTab = false;
  notificationType = '';
  smsNotifications: any = [];
  emailNotifications: any = [];
  isPopAppleReview = true;
  toTicketStatusUpdate = '';
  serviceTeamUsers = false;
  ticketAssignedUser = false;
  scheduleDateTime = '';
  onsiteL1Approver = false;
  ccFeedBack = 'Excellent';
  ccFeedBackRemarks = '';
  isiPadHighConfig = false;
  sms_email_temp: any;
  sendAgeingSMSTemp: any;
  closeTicketRemarks: any;
  selectedParts: any;
  rafDate: any;
  partDescription:any = '';
  showerror = false;
  partNo:any = '';
  partType = null;
  partTypes = [{ label: 'Genuine', value: 'Genuine' }, { label: '3rd Party', value: '3rd Party' }]
  kbbDisplayImageList: any = [];
  confirmAlert: ConfirmAlert = { id: '', title: '', msg: '' };
  selectedBin = 'Select Status';
  constructor(
    private dataService: WinDashboardService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    public userDataService: UserService, private router: Router) {
    this.bsConfig = Object.assign({}, { showWeekNumbers: false }, { showOnFocus: false });
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
    this.serviceChargeHtml = sanitizer.sanitize(SecurityContext.HTML, this.serviceChargeHtml);
    this.serviceChargeHtml = this.serviceChargeHtml + '<span>' + 'Pre-Tax' + '&nbsp;' + '&nbsp;' + 'Tax' + '&nbsp;' + '&nbsp;' + 'Total' + '</span><br/>' + '<span>' + '1059.00' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '1250.00' + '</span><br/>' + '<span>' + '1483.00' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '1750.00' + '</span><br/>' + '<span>' + '2119.00' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '2500.00' + '</span><br/>' + '<span>' + '3178.00' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '3750.00' + '</span><br/>';
    this.ticketId = localStorage.getItem('id');
    this.userRole = localStorage.getItem('userRole');
    this.siteType = localStorage.getItem('siteType');
    this.userID = localStorage.getItem('userId');
    this.callId = localStorage.getItem('callApi');
    this.userBranch = localStorage.getItem('branchCode');
    this.getOptions();
    this.getdata(this.ticketId);
    this.gettimelinedata(this.ticketId);
    this.documentTypes = [
      { value: 'Select document type', name: 'Select document type' },
      { value: 'ID', name: 'ID Proof' },
      { value: 'Quotation', name: 'Quotation' },
      { value: 'DC/Signed DC', name: 'Signed DC Copy' },
      // { value: 'DOA', name: 'DOA' },
      { value: 'VMI', name: 'VMI' },
      { value: 'Purchased Order', name: 'Purchased Order'},
      { value: 'Other', name: 'Other' },
    ];

   this.getWinParts(); 
  }

  getOptions() {
    this.dataService.getOptions()
      .subscribe({
        next:
          (data: any) => {
            this.statusOptions = data.status;
          }, // success path
        error: error => this.error = error // error path
      });
  }

  getdata(ticket_id: string | null) {
    let results: any = [];
    this.dataService.getDetail(ticket_id)
      .subscribe({
        next:
          (data) => {
            results = data;
            this.clicked = false;
            this.dataTemp = data;
            this.dataTemp = this.dataTemp.tickets[0];
            this.selectedBin = this.dataTemp.status_id;
            this.diagnosisHd = results.diagnosis[0].repair_hd[0];
            this.diagnosisDt = results.diagnosis[0].repair_dt;
            this.technicianComments = results.diagnosis[0].tech_notes;
            this.data = this.dataTemp;
            this.rafDate = this.data.raf_created_time;
            this.rafDate = this.datePipe.transform(this.rafDate, 'yyyy-MM-dd');
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
            this.imeiNo = this.data.imei_no;
            this.repairStage = this.diagnosisHd.repair_stage;
            this.t1InvoiceNo = this.data.t1_invoice_id;
            if (this.data.kd_call === '0') {
              this.kdCall = false;
            } else {
              this.kdCall = true;
            }
            if (this.data.t1_type === null) {
              this.exceptionType = 'NA';
            } else {
              if (this.data.t1_type === '') {
                this.exceptionType = 'NA';
              } else {
                this.exceptionType = this.data.t1_type;
              }
            }
            this.ageingTime = results.ageing.days + 'Day:' + results.ageing.hours + 'Hr:' + results.ageing.minutes + 'Min';
            this.kbbDisplayImageList = [];
            this.checkTicket();
            this.getAnalysis(this.ticketId);
            this.getDocuments(this.ticketId);
            this.getCustomerInfo(this.dataTemp.customer_id);
            // this.getnotifications();

            this.loading = false;

            this.html = '';
            this.html = this.html + '<span>' + 'Token No' + '&nbsp;' + '-' + '&nbsp;' + this.data.token_no + '</span><br/>' + '<span>' + 'Family' + '&nbsp;' + '-' + '&nbsp;' + this.data.product_family + '</span><br/>' + '<span>' + 'Product' + '&nbsp;' + '-' + '&nbsp;' + this.data.product_category + '</span><br/>';
            this.bsValue = new Date(this.diagnosisHd.unit_received_date);
            this.myTime = new Date(this.data.entrytime);
          }, // success path
        error: error => this.error = error // error path
      });
  }

  viewRaf() {
    const tab: any = window.open();
    this.dataService.viewRaf(this.data)
      .subscribe(
        (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
        });
  }

  getCustomerInfo(id: string) {
    let result: any;
    this.dataService.getCustomerInfo(id, this.data.customer_phone_no)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            this.customerInfo = result.customer;
            this.customerInfo.address = this.customerInfo.address1 + '\n' + this.customerInfo.address2 + '\n' +
              this.customerInfo.city + '\n' + this.customerInfo.state + '\n' + this.customerInfo.pin;
          }
        });
        if (this.data.site_type_id === '3') {
          let results: any;
          this.dataService.getCompany(this.ticketId)
            .subscribe(
              (data: any) => {
                results = data;
                if (results.status === true) {
                  this.companyName = results.company?.company?.company_name;
                }
              });
        }
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

    if ((this.userRole === '6') || (this.userRole === '8')) {
      this.showAssign = true;
      this.isViewDoc = true;
    }

    if ((this.ticketType === 'enquiry') || (this.data.assigned_user_id === this.userID)) {
      this.isViewDoc = true;
    }

    if (this.data.branch_code === this.userBranch) {
      this.enableCall = true;
    }
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  updateProductName() {
    if (this.productName !== '') {
      this.buttonSpin = true;
      let result: any;
      this.dataService.updateProductName(this.ticketId, this.productName)
        .subscribe(
          (data) => {
            result = data;
            this.buttonSpin = false;
            if (result.status === true) {
              this.getdata(this.ticketId);
            }
          });
    }
  }

  updateWarrantyStatus() {
    if (this.warrantyStatus !== 'Select Warranty Status') {
      this.buttonSpin = true;
      let result: any;
      this.dataService.updateWarrantyStatus(this.ticketId, this.warrantyStatus)
        .subscribe(
          (data) => {
            result = data;
            this.buttonSpin = false;
            if (result.status === true) {
              this.getdata(this.ticketId);
            }
          });
    }
  }

  closeTicketTemp(close_ticket: TemplateRef<any>) {
    this.openModal(close_ticket);
  }

  closeTicket(simple_alert: TemplateRef<any>) {
    let result: any;
    this.dataService.closeTicket(this.ticketId, this.closeTicketRemarks)
      .subscribe(
        (data) => {
          result = data;
          this.modalService.dismissAll();
          if (result.status === true) {
            this.simpleAlert = { title: 'Close Ticket', msg: 'Ticket has been closed successfully' };
            this.openModal(simple_alert);
            this.getdata(this.ticketId);
          } else {
            alert(result.message);
          }
        });
  }

  /* ******************* Add Part detail ******************* */

  addPart() {
    let result: any;
    this.dataService.addPart(this.ticketId,this.partType, this.partNo, this.partDescription)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.partType = null;
            this.partNo = '';
            this.partDescription = '';
            this.getWinParts();
          }
        });
  }

  getWinParts() {
    let result: any;
    this.dataService.getWinParts(this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.winPartDetails = result.data;
          }
        });
  }

  /* ******************* Time Line Data ******************* */

  gettimelinedata(ticketId: any) {
    this.dataService.timelineData(ticketId)
      .subscribe({
        next:
          (data) => {
            this.timelineData = data;
            if (this.timelineData.status !== 'false') {
              this.recentData = this.timelineData.timeline;
            } else {
              this.recentData = [];
            }
          }, // success path
        error: error => this.error = error // error path
      });
  }

  updateAnalysis(analysis: any) {
    let result: any;
    this.dataService.uploadAnalysis(this.ticketId, analysis)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.analysisText = '';
            this.getAnalysis(this.ticketId);
            this.gettimelinedata(this.ticketId);
          }
        });
  }

  getAnalysis(ticketId: any) {
    let result: any;
    let analysisTemp: any = [];
    this.analysisList = [];
    this.dataService.getAnalysis(ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            analysisTemp = result.analysis;
            for (let i = 0; i < analysisTemp.length; i++) {
              this.analysisList.push(analysisTemp[i]);
            }
          } else {
            this.analysisList = [];
          }

        });
  }

  upload(desc: any) {
    this.buttonSpin = true;
    const today = new Date().toDateString();
    const docs: any = [];
    if (this.documentType !== 'Select document type') {
      if ((this.documentType === 'AST MRI') || (this.documentType === 'Display Panel') || (this.documentType === 'Barcode Serial')) {
        if ((this.kbbDisplayImageList.length >= 3)) {
          alert('Uploading KBB Display images reached maximum. Please delete the old image and upload again');
          this.buttonSpin = false;
          this.bcolor = true;
          return;
        } else {
          this.bcolor = false;
        }
      } else {
        this.bcolor = false;
      }
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
      if (this.documentTemp.size <= 8000000) {
        this.dataService.uploadDocuments(this.ticketId, docs)
          .subscribe({
            next: (data: any) => {
              this.documentTemp = [];
              this.documentType = 'Select document type';
              this.getDocuments(this.ticketId);
              this.buttonSpin = false;
              this.dError = '';
            }, // success path
            error: (error: any) => this.error = error // error path
          });
        this.description = null;
        this.myInputVariable.nativeElement.value = '';
        this.dcolor = false;
      } else {
        this.dError = 'File size should be less than 5MB';
        this.buttonSpin = false;
      }
    } else {
      this.buttonSpin = false;
    }
  }

  /* ******************* Documents ******************* */
  getDocuments(ticketId: any) {
    let result: any = [];
    let qdocs: any = [];
    let kdocs: any = [];
    let docs: any = [];
    this.quoteDocuments = [];
    this.documents = [];
    this.dataService.getDocuments(ticketId)
      .subscribe({
        next:
          (data) => {
            result = data;
            if (result.length === 0) {
              this.isExDocuments = false;
            } else {
              this.isExDocuments = true;
              for (let i = 0; i < result.length; i++) {
                docs = result[i];
                this.documents = Array.prototype.concat.apply([], [docs, this.documents]);
              }

              for (let j = 0; j < result.length; j++) {
                if (this.documents.length !== 0) {
                  if ((result[j].document_type === 'customer_pop') || (result[j].document_type === 'customer_id')) {
                    this.documents[j].removeDocOpt = false;
                  } else {
                    this.documents[j].removeDocOpt = true;
                  }
                }
              }
            }
            this.documentType = 'Select document type';
          }, // success path
        error: error => this.error = error // error path
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

  removeDoc(doc: { id: any; ticket_id: any; }, confirm_alert_temp: TemplateRef<any>) {
    this.selectedDocument = { doc_id: doc.id, doc_tid: doc.ticket_id };
    const msg = 'Are you sure want to delete this document?';
    this.confirmAlert = { id: '00', title: 'Delete Document', msg: msg };
    this.openModal(confirm_alert_temp);
  }

  cancelModel() {
    this.buttonSpin = false;
    this.modalService.dismissAll();
    this.partDetails = [];
  }

  confirm(inputdata: string, simple_alert_temp: TemplateRef<any>, create_svc_temp: TemplateRef<any>) {
    let result: any;
    if (inputdata === '00') {
      this.dataService.deleteDocument(this.selectedDocument.doc_id, this.selectedDocument.doc_tid)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.getDocuments(this.ticketId);
            } else {
              this.simpleAlert = { title: 'Delete Document', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
      this.modalService.dismissAll();
    } else if (inputdata === 'SVC') {
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
    }
  }

  confirmChangeStatus(simple_alert_temp: any) {
    this.modalService.dismissAll();
    let result;
    this.remarks = encodeURIComponent(this.remarks);
    const reqData = '&ticket_id=' + this.ticketId + '&destination_status=' + this.selectedBin + '&source_status=' +
    this.dataTemp.status_id + '&remarks=' + this.remarks;
    this.dataService.changeStatus(reqData)
      .subscribe({
        next:(data: any) => {
            result = data;
            if (result.status === true) {
              this.remarks = '';
              this.simpleAlert = {title: 'Change Ticket Status', msg: result.message};
              this.openModal(simple_alert_temp);
            }

            if (result.status === false) {
              this.simpleAlert = {title: 'Change Ticket Status', msg: result.message};
              this.openModal(simple_alert_temp);
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }
}
