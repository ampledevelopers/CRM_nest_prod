import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, TemplateRef, ElementRef, ViewChild, ViewEncapsulation, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from '../dashboard.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateAppointmentService } from '../../appointments/create-appointment/create-appointment.service';
import { ExcelService } from '../../reports/excel.service';

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

export interface ViewQuoteDetails {
  ticketData: any;
  quoteData: any;
  partList: any;
  serviceCharge: any;
  total: any;
}

export interface SameUnitRepairData {
  label: string;
  options: any;
}

export interface ServiceData {
  gsxNo: string;
  serviceType: any;
  diagnosis: string;
}

export interface AdditionalDetails {
  accessory: any;
  family: any;
  condition: any;
  upgrade: string;
  serviceType: any;
}

export interface CheckList {
  isMRI: any;
  isVMI: any;
  intact: any;
  kgbkbb: any;
  notes: any;
}

export interface DeliveryToCustomer {
  dateTime: any;
  name: any;
  mode: any;
}

export interface CSDetails {
  laborCovered: any;
  partsCovered: any;
  travelCovered: any;
}

@Component({
  selector: 'app-ticketdetail',
  templateUrl: './ticketdetail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ticketdetail.component.scss',
    '../../../../scss/customstyle.css',
    '../../../../scss/vendors/bs-datepicker/bs-datepicker.scss'
  ],
  providers: [DashboardService, NgbModal, NgbModalConfig],
  standalone: false
})

export class TicketdetailComponent {
  /* @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('myQInput') myQInputVariable: ElementRef;
  @ViewChild('myPopInput') popInputVariable: ElementRef; */

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;
  @ViewChild('myInput', { static: true }) myInputVariable!: ElementRef;
  @ViewChild('myQInput', { static: true }) myQInputVariable!: ElementRef;
  @ViewChild('myPopInput', { static: true }) popInputVariable!: ElementRef;
  @ViewChild('homeOtpInput', { static: true }) otpInputVariable!: ElementRef;
  @ViewChild('zz_invoice_temp', { static: true }) zzInvoiceTemp!: TemplateRef<any>;
  issueDescription: string = '';
  issueDescription1: string = '';
  issueDescription2: string = '';
  componentDescription: string = '';
  componentDescription1: string = '';
  componentDescription2: string = '';

  ticketId: any = localStorage.getItem('id');
  loading = true;
  buttonSpin = false;
  clicked = false;
  isManager: any;
  isTechnician: any;
  error: any;
  isGSXError = false;
  gsxError: any = '';
  onlyView: any;
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
  /* modalRef: BsModalRef; */
  firstName: any = '';
  recentData: any = [];
  timelineData: any = [];
  isToken: any = true;
  isAdvancetab: any = false;
  isInvoicetab: any = false;
  isDevice: any = false;
  isPhysical: any = true;
  productName = '';
  adhesive8SE = false;
  adhesive17e = false;  
  warrantyStatuses: any = [
    { id: '0', name: 'Select Warranty Status' },
    { id: '1', name: 'Apple Limited Warranty' },
    { id: '2', name: 'Out of Warranty (No Coverage)' },
    { id: '3', name: 'AppleCare Protection Plan' },
    { id: '4', name: 'AppleCare Protection Plan Plus' },
  ];
  warrantyStatus = '';
  acPlusDetails: any = [];
  acPlusAvailable = false;
  acContract = '';
  acTires: any = '';
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
  userRole = localStorage.getItem('userRole');
  siteType = localStorage.getItem('siteType');
  l2Approver = localStorage.getItem('l2Approval');
  userID = localStorage.getItem('userId');
  userBranch = localStorage.getItem('branchCode');
  branchType = localStorage.getItem('branchType');
  netSuiteEnabled: any;
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
  isCreateQuote = 'null'; // 'null' will be the future use.
  diagnosis = '';
  partNo = '';
  partDetails: any = [];
  priceType = 'Select type';
  priceTypes: any = [];
  serviceChargeList: any = [{ Name: 'T1 Diagnosis Charges OOW - Rs. 800', id: 'T1DCiOS', value: '677.96' }, { Name: 'Service Charges - Rs. 2000', id: 'T2DCiOS', value: '1694.92' }, { Name: 'L1 Diagnosis Charges iOS - Rs. 2000', id: 'DiOS', value: '1694.92' },
  { Name: 'L1 engagement charges Accy - Rs. 300', id: 'T1eca', value: '254' }, { Name: 'L1 Diagnosis Charges Mac - Rs. 2000', id: 'SChM', value: '1694.92' }, { Name: 'Service Charges Mac - Rs. 4000', id: 'DiCM', value: '3389.83' }, { Name: 'T1 Engagement Charges OOW - Rs. 990', id: 'T1CHRG', value: '838.98'},{ Name:'Battery Service Charges - Rs. 1000', value: '847.46' ,id:'T1BATT'} ];
  serviceCharge: any;
  enableServiceCharge = false;
  quoteServiceCharge: any = '';
  consumableCharge: any = '';
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
  currentQuoteStatus: any = '';
  viewPartDetails: ViewQuoteDetails = { ticketData: [], quoteData: [], partList: [], serviceCharge: '', total: '' };
  approveReject: ApproveReject = { id: '', tag: '', title: '', msg: '', visible: 'false' };
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  confirmAlert: ConfirmAlert = { id: '', title: '', msg: '' };
  onsiteEngg: any = [];
  assignReassign: any;
  isService: any = true;
  servicePartInput: any = [{ serialNo: '', partNo: '', partDetail: '' }];
  sPartDetails: any = [];
  sameUnitRepairData: SameUnitRepairData = { label: '', options: [] };
  serviceData: ServiceData = { gsxNo: '', serviceType: 'N/A', diagnosis: '' };
  additionalDetails: AdditionalDetails = { accessory: '', family: 'Select Family', condition: '', upgrade: '', serviceType: 'Select Type' };
  families: any = [];
  gsxRepairs: any = [];
  showRepairDetails = false;
  serviceTypes: any = [];
  svcUrl: any;
  existSvc: any = [];
  isExistSvc = false;
  svcDiagnosis = '';
  showSVCForm: any = 'false';
  deleteSvcRemarks = '';
  deleteSvcId = '';
  gsxNo: any = '';
  srParts: any = [];
  repairDetails: any = [];
  repairedParts: any = [];
  analysisText: any = '';
  analysisList: any = [];
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
  paymentAdvances: any = [];
  paymentInvoices: any = [];
  isInvoice = false;
  isAdvance = false;
  showUpdateStatusTable = false;
  refundStatusText = '';
  refundDate = '';
  refundUtr = '';
  refundValue = '';
  ccAnalysisText: any = '';
  ccAnalysisList: any = [];
  ccTeam = false;
  EnquiryList: any = [];
  messageList: any = [];
  blueDartResult: any;
  trackData = '';
  ticketType = localStorage.getItem('ticket_type');
  isCollapsed = false;
  upArrow = true;
  upAdvArrow = false;
  upInvArrow = false;
  upGsxInvArrow = false;
  isGsxInvoicetab: any = false;
  upCreditMemoArrow = false;
  isCreditMemotab: any = false;
  html: any;
  popUploadView: any = false;
  popUploadBtn: any = false;
  popBtn: any = false;
  popGsxUrl: any;
  popHeader: any = [];
  popLoading = false;
  imageTemp: any = [];
  productDetail: any = [];
  components: any = [];
  componentIssueList: any = [];
  doaComponent: any = '';
  doaIssue: any = '';
  issuesTemp: any = [];
  issues: any = [];
  issues1: any = [];
  issues2: any = [];
  partIssues: any = [];
  componentCode: any;
  issueCode: any;
  componentCode1: any = '';
  issueCode1: any = '';
  componentCode2: any = '';
  issueCode2: any = '';
  addmorecomponentBtn = true;
  addmorecomponentFlag1 = false;
  addmorecomponentFlag2 = false;
  flagIssue: any = true;
  flagIssue1: any = true;
  flagIssue2: any = true;
  flagPart: any = true;
  repairTypes: any = [];
  repairType: any = '';
  snvrTypes: any = [{ label: 'No Trouble Found (NTF)', value: 'NTF' },
  { label: 'Screening (SRC)', value: 'SRC' },
  { label: 'Loaner Unavailable (LUA)', value: 'LUA' },
  { label: 'Customer Declined - Cost (CDM)', value: 'CDM' },
  { label: 'Customer Declined - Part Unavailable (CDP)', value: 'CDP' },
  { label: 'Customer Declined - Time (CDT)', value: 'CDT' },
  { label: 'Country of Service Limitation (CSL)', value: 'CSL' },
  { label: 'Forward to Service Location (FSL)', value: 'FSL' },
  { label: 'Resolved - Other (ROT)', value: 'ROT' },
  { label: 'Resolved - Software (RSW)', value: 'RSW' },
  // { label: 'Reused Part(s) (UPT)', value: 'UPT' }
  ];
  snvrType: any;
  crbr = false;
  crer = false;
  crerSaved = false;
  crbrMandate = false;
  isMailIn: any = false;
  coverageOptions: any = [];
  coverageOption = null;
  pricingOption = false;
  reproducibilities: any = [];
  selectedParts: any = [];
  parts: any = [];
  partDetail: any = [];
  selectedLoadnerPart: any = [];
  addPartLoaner = '';
  loanerPartNumber = '';
  loanerDescription = '';
  loanerSno = '';
  loanerDevice: any = [];
  loaners: any = [];
  loanerStock = false;
  loanerStockUnavailable = false;
  symptoms: any = [];
  mailInSymtoms: any = [];
  mailInSymtomsOptions: any = [];
  mailInComponent = '';
  mailInIssue = '';
  mailInreproducibility = '';
  reproducibility = '';
  symptomId = 1;
  repairClassifications: any = [];
  repairClassification: any;
  gsxPartsTemp: any = [];
  errorMsg: any;
  isLoaner = false;
  partSearch = '';
  eeeSearch = '';
  isPartDetail: any = false;
  isConsignment: any = false;
  consignmentView: any = false;
  diagIssue = '';
  diagReproduce = '';
  diagPerformed = '';
  diagCondition = '';
  diagResolution = '';
  diagnosisData = '';
  editDiagnosis = false;
  technicianNotes = '';
  technicianComments: any = [];
  upDiagArrow = true;
  onRepair = false;
  isGsxRepair = false;
  isNtfRepair = false;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: Date = new Date();
  unitReceivedDate: any;
  unitReceivedTime: any;
  datecolor = false;
  timecolor = false;
  datePipe = new DatePipe('en-US');
  public myTime: Date = new Date();
  holdReview = '';
  referenceNo: any = '';
  poNo = '';
  refcolor: any = true;
  purchaseNo: any = '';
  requestAppleReview: any = false;
  deviceImages: any = [];
  quotationHd: any = [];
  quotationDt: any = [];
  quotationTotal = '';
  quotationAttached = '0';
  quotationDiagnosisDetails = '';
  isReQuoted = false;
  diagnosisHd: any = [];
  diagnosisDt: any = [];
  finalParts: any = [];
  billingParts: any = [];
  consignmentASN: any = '';
  consignmentASNError = '';
  consignmentSlno = '';
  t1InvoiceNo = '';
  exceptionType = 'NA';
  tokenIssued = false;
  showTokenIssued = false;
  reGenerateRemarks = '';
  reGenerateType = '';
  regenerateError = false;
  diagnosisHold = true;
  isLIC = false;
  repairStages: any = [];
  repairStage = '';
  showRepairStageList = false;
  ageingTime: any = '';
  showQCButton = false;
  showQCAButton = false;
  qcDeclineReview = '';
  qcStatus = '';
  repairEligibleDetails: any = [];
  repairEligibleError = '';
  isRepairEligible = false;
  fmipDetails: any = '';
  fmipStatus = false;
  fmipColor = '#008000';
  serialNoEdit = true;
  svcId: any = '';
  isPudTicket: any = '';
  deliveryType = '';
  showConvertToPud = false;
  declinedRemarks = [
    { label: 'Repair created with Wrong Serial number', value: 'Repair created with Wrong Serial number' },
    { label: 'Incorrect Repair classification', value: 'Incorrect Repair classification' },
    { label: 'Incomplete repair notes', value: 'Incomplete repair notes' },
    { label: 'KBB Serial number not documented', value: 'KBB Serial number not documented' },
    { label: 'Wrong coverage option', value: 'Wrong coverage option' },
    { label: 'Wrong date in repair', value: 'Wrong date in repair' },
    { label: 'KGB and KBB mismatch /  Missing', value: 'KGB and KBB mismatch /  Missing' },
    { label: 'Wrong/ poor quality images', value: 'Wrong/ poor quality images' },
    { label: 'VMI Failed', value: 'VMI Failed' },
    { label: 'Wrong Part', value: 'Wrong Part' },
    { label: 'Wrong CompTiA/ Modifier', value: 'Wrong CompTiA/ Modifier' },
    { label: 'Incomplete Diagnostics', value: 'Incomplete Diagnostics' },
    { label: 'NTF', value: 'NTF' },
    { label: 'Payment missing', value: 'Payment missing' },
    { label: 'POP missing', value: 'POP missing' },
    { label: 'Consignment not added', value: 'Consignment not added' },
    { label: 'Questions are not answered', value: 'Questions are not answered' },
    { label: 'Apple Declined', value: 'Apple Declined' }
  ];
  asnList: any[] = [];
  L1L2DeclineReview = '';
  customerInvoiceId = '';
  customerInvoiceDateTime = '';
  zzInvoiceNo = '';
  zzInvoiceDate = '';
  zzInvoiceError = '';
  zzInvoiceValidated = false;
  zzPopValidated = 0;
  pendingApplyL1: { simple_alert: TemplateRef<any>; confirmQuoteCheck: TemplateRef<any> } | null = null;
  invoiceAmount: any;
  svcRemarks = '';
  isSVCActive = false;
  kgbSelectedPart = '';
  kbbDeviceDetail = '';
  kgbDeviceDetail = '';
  kgbPartSequenceNo: any;
  kgbPartNo = '';
  kgbAWBNo = '';
  kgbToteId = '';
  isAdvanceCollected: number = 0;
  isLegalCase = 0;
  gsxInwardCheck = true;
  exLoaners: any = [];
  exRepaires: any = [];
  repairStatuses: any = [];
  exRepairesTemp: any = [];
  consignmentType: any = '';
  consignment : any = '';
  consignmentPartNumber = '';
  gsxStatus: any;
  gsxInvoice: any = [];
  gsxStatusCodes: any = [];
  templateId = '';
  treeId = '';
  requiredQuestions: any = [];
  subRequiredQuestions: any = [];
  subAnsweres: any = [];
  showingQuestion: any = [];
  answeredQuestions: any = [];
  questionNo = 1;
  isGsxQuestionAnswered = '';
  showNextBtn = false;
  additionalParts: any = [];
  additionalPart = false;
  additionalPartHold = false;
  gsxAdditionalParts: any = [];
  rcAddedParts: any = [];
  noAdditionalPart = false;
  rcCoverageChange = false;
  rcCOEnable = false;
  gprDoaPart: any = [];
  gprDoaSelectedPart: any = [];
  gprReason = 'Select';
  gprType = 'Select';
  partPrice = '';
  selectedPricingPart: any = [];
  grpDoaKGBSerial = '';
  gprDoaTechComment = '';
  doaIssueCode = '';
  doaComponentCode = '';
  doaReproducibility = '';
  kdCall = false;
  gDriveData: any = [];
  S3Data: any = [];
  showACSType = false;
  acsPartList: any = [];
  acsPart: any = '';
  acsPriceType = 'Stock';
  insurancePartList: any = [];
  insurancePart = '';
  serviceChargeHtml: any = '';
  showDraftBtn = false;
  closeTicketRemarks = '';
  enableCall = false;
  callId: any = localStorage.getItem('callApi');
  customerPhoneLogs: any = [];
  callAudio = new Audio();
  declinedGNumbers: any = [];
  consumablesCheck = false;
  isL2Approved = false;
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
  svcNotifications: any = [];
  ageingSMSEmails: any = [];
  ageingSMSEmailMessage = '';
  appleCustomerRevertRemarks = '';
  popAppleReviewHold = false;
  isPopAppleReview = true;
  appleDisSat = false;
  appleSat = false;
  googleDisSat = false;
  ticketStatusUpdateRemarks = '';
  toTicketStatusUpdate = '';
  serviceTeamUsers = false;
  enableCreateRepairBtn = false;
  oocCheck = false;
  deviceAwayOTP = '';
  otpError = '';
  checkListData: any = '';
  checkList: CheckList = { isMRI: false, isVMI: false, intact: false, kgbkbb: false, notes: '' };
  homeDeliveryOtp = '';
  svcDocumentTemp: any = [];
  kBBSerialNoCheckList: any = [
    { value: 'KBB Display', label: 'KBB Display Serial Number' },
    { value: 'KBB Battery', label: 'KBB Battery Serial Number' }
  ];
  kbbType = 'KBB Display';
  kbbDisplayDiagSerial = '';
  kbbDisplayImageList: any = [];
  selectedKbbImage = '';
  kbbImageZoom = false;
  kbbImageSerialNo = '';
  kbbErrorMessage = 'KBB Image Serial number not verified';
  kbbVerifyError = '';
  kbbSerialNoVerified = '0';
  exKBBDisplayPartNo = '';
  exKBBDisplayAvail = false;
  exKGBSerialAvail = false;
  ticketAssignedUser = false;
  gsxDiagnosisView = false;
  gsxDiagnosisDetails: any = [];
  eventTestResults: any = [];
  astDiagEligible = false;
  kbbNotRequired = false;
  airpodsDiagStatus: any;
  airpodsOnlyCIN: any;
  airpodsOnlyWums: any;
  airpodsDiagAvailable: any;
  airpodsCoverageStatus = '';
  diagnosisMoveReasons: any = [
    { label: 'Issue persist during product delivery', value: 'Issue persist at Delivery' },
    { label: ' Issue required additional screening from Apple', value: 'Required Additional screening' }];
  dianosisMoveReason: any;
  scheduleDateTime = '';
  sendFromL1Approval = false;
  deliverToCustomer: DeliveryToCustomer = { dateTime: '', name: '', mode: '' };
  ackParts: any = [];
  onsiteL1Approver = true;
  kbbVerificationParts: any = [];
  ccFeedBackList = [
    { value: 'Excellent', name: 'Excellent' },
    { value: 'Neutral', name: 'Neutral' },
    { value: 'Poor', name: 'Poor' },
  ];
  ccFeedBack = 'Excellent';
  ccFeedBackRemarks = '';
  isiPadHighConfig = false;
  LegalCase_flag = false;
  iPadHighConfigDiagStatus = '';
  iPhone1213ForceMailIn = false;
  astLastDiagStatus = '';
  diagPartsFilled = false;
  consumableCharges = false;
  kbbInputType: any = '';
  dCallCheck = false;
  toInwardBin = '1500';
  showInwardButton = false;
  isEligibleInward = false;
  customerDisSatStyles = { cDisStatBColor: '#fff', cDisStatFColor: '#000', linkColor: '#20a8d8' };
  csCode = '';
  selectedPartsTempDoaGpr = [];
  isSubstitutePart = false;
  substituteParNo = '';
  gsxStatusSpin = false;
  repairEscalations: any = [];
  escalationId = '';
  escalationDetails: any = [];
  escalationDamage: any = [];
  aryDayDates: any = [];
  selectedDate: any;
  selectTimeforAppoint: any;
  availSlotForDay: any;
  onlyDate: any;
  availSlots: any;
  fullDate: any;
  productCode: any;
  customerFirstName: any;
  customerLastName: any;
  correlationId: any;
  showDateAndTime: any = false;
  slotError = '';
  iPhoneCategory: any;
  deliveryReservation: any;
  reserveType = '';
  dcallCloseStatus = 'Select the Status';
  partReceivedDate = '';
  repairCompleteDate = '';
  adhesiveType: any = '';
  adhesiveASN: any = '';
  adhesiveASNError = '';
  isEligibleAdhesive = false;
  adhesiveParts = false;
  adhesivePartsList: any = [];
  unblockASN: any = '';
  adhesivesTemp: any = [];
  adhesivesList: any = [];
  enableStockTypeChange = true;
  moveBackToStage: any = '';
  deliveryTypeSelected = false;
  csCodeAvail = false;
  csDetails: CSDetails = { laborCovered: '', partsCovered: '', travelCovered: '' };
  popRequiredList: any = [];
  popExist = false;
  popRequired = false;
  showTimer = false;
  countdownTime = 180;
  countDown = '';
  ticketBranch = '';
  dlReservationDetails: any = [];
  productFamilies: any = [];
  productFamily: any = 'Select Product Family';
  isInternalAsset: any;

  // Questionare
  qanswerKey: any = [];
  answerKey: any = [];
  submitDoc = false;
  questionTemp: any = [];
  qsubmitDoc = false;
  qtemplateId = '';
  qtreeId = '';

  qsubRequiredQuestions: any = [];
  qsubAnsweres: any = [];
  qshowingQuestion: any = [];
  qansweredQuestions: any;
  questionaireStructure: any = [];
  qrequiredQuestions: any = [];
  qquestionNo: any;
  qshowNextBtn = false;
  selectedAnswer: any;
  tree: any = {
    treeId: '',
  };
  s3ImageOpenAlert = '';
  answers: any = [];
  showProductSelect = false;
  isS3Document: any;
  s3ImageUrl = '';
  selectedS3Doc: any = '';
  selectedS3Id: any = '';
  showImagePopup = false;
  contentType: any = '';
  stoConsignmentCheck = true;
  showAppleDeclinedBtn: any;
  thirdlevelQuestions: any = [];
  parentOfThirdLevel: any;
  parentOfFourthLevel: any;
  parentOfFifthLevel: any
  fourthlevelQuestions: any = [];
  fifthlevelQuestions: any = [];
  eligibleQuestions = false;
  selectedCustomerPhone = '';
  pudTicketId: any;
  isImagine: any;
  caseId: any;
  caseIdValidated: any;
  invalidCaseIdMsg = '';
  validateCaseIdCallback: any;
  dropAddressCallback: any;
  warrantyExpiryDate = '';
  dropAddress = '';
  dropAddressTemp = '';
  inboxtitle: any = 'RC Inbox Letter';
  letterHtml: any = '';
  onsiteQuoteDocExists = false;
  netSuiteCase: any = false;
  pudQuotationId = '';
  pudQuoteCharges = '';
  pudAmount = '';
  pudPart_no = '';
  pudDescription = '';
  pudRequested = false;
  dropRequest: any;
  pudExceptionCases = ['Approved by Ops Manager'];
  PUDexception = '';
  pudInvoiceID: any = '';
  isExceptionRequired = 0;
  invoiceError = '';
  paymentDeclinedReason: any = '';
  gsxComponentIssues: any = [];
  doaIssueList: any = [];
  dCallType: any;
  dCallCloseReason: any = '';
  dCallArrivalDate: any = '';
  dCallCompletionDate: any = '';
  gsxSms = false;
  dCallCloseReasons: any = [
    // { label: 'Closed - Repair completed over the phone', value: 'CFPH' },
    { label: 'Closed- Repair Completed with No Parts Used', value: 'CRCN' },
    { label: 'Closed - Repair Completed with Parts Used', value: 'CRCP' },
    { label: 'Closed - Repair Declined by customer', value: 'CRDE' }
  ];
  isRDO = false; //make this false after testing RDO process
  gsxAckId = '';
  constructor(
    private dataService: DashboardService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    public customerService: CreateAppointmentService,
    public userDataService: UserService,
    private router: Router,
    private excelService: ExcelService) {
    this.bsConfig = Object.assign({}, { showWeekNumbers: false }, { showOnFocus: false });
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
    this.serviceChargeHtml = sanitizer.sanitize(SecurityContext.HTML, this.serviceChargeHtml);
    this.serviceChargeHtml = this.serviceChargeHtml + '<span>' + 'Pre-Tax' + '&nbsp;' + '&nbsp;' + 'Tax' + '&nbsp;' + '&nbsp;' + 'Total' + '</span><br/>' + '<span>' + '677.96' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '800.00' + '</span><br/>' + '<span>' + '847.46' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '1000.00' + '</span><br/>' + '<span>' + '1694.92' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '2000.00' + '</span><br/>' + '<span>' + '2542.37' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '3000.00' + '</span><br/>' + '<span>' + '3389.83' + '&nbsp;' + '&nbsp;' + '18%' + '&nbsp;' + '&nbsp;' + '4000.00' + '</span><br/>';
    this.letterHtml = sanitizer.sanitize(SecurityContext.HTML, this.letterHtml);
    this.getOptions();
    this.assignValues();
    // this.getQuestionerData(); //Questionare
    this.getdata(this.ticketId);
    this.netSuiteEnabled = localStorage.getItem('netSuiteEnabled') === '0' ? false : true;
    if (this.siteType === '1') {
      this.documentTypes = [
        { value: 'Select document type', name: 'Select document type' },
        { value: 'ID', name: 'ID Proof' },
        { value: 'AST MRI', name: 'AST MRI Screenshot' },
        { value: 'Display Panel', name: 'Display Panel - High Resolution' },
        { value: 'Barcode Serial', name: 'Barcode Serial No. - CortexScan Screenshot' },
        { value: 'mesh', name: 'Mesh Image' },
        { value: 'Video', name: 'Video' },
        { value: 'Device images', name: 'Device images' },
        { value: 'Other', name: 'Other' }
      ];
    } else {
      this.documentTypes = [
        { value: 'Select document type', name: 'Select document type' },
        { value: 'ID', name: 'ID Proof' },
        { value: 'AST MRI', name: 'AST MRI Screenshot' },
        { value: 'Display Panel', name: 'Display Panel - High Resolution' },
        { value: 'Barcode Serial', name: 'Barcode Serial No. - CortexScan Screenshot' },
        { value: 'Signed DC', name: 'Signed DC Copy' },
        { value: 'mesh', name: 'Mesh Image' },
        { value: 'Video', name: 'Video' },
        { value: 'Other', name: 'Other' }
      ];
    }

    if (this.siteType === '2') {
      this.diagnosisMoveReasons = [{ label: 'Issue persist during product delivery', value: 'Issue persist at Delivery' }];
    }

    this.damageList = [
      { id: '0', name: 'Select the Damage' },
      { id: '1', name: 'Physical Damage' },
      { id: '2', name: 'Liquid Damage' },
      { id: '3', name: 'No Damages' }
    ];
    this.families = [{ id: '0', name: 'Select Family' }, { id: '1', name: 'Accessory' }, { id: '2', name: 'Apple TV' },
    { id: '3', name: 'Apple Watch' }, { id: '4', name: 'Beats' }, { id: '5', name: 'Desktop & Portables' },
    { id: '6', name: 'iPad' }, { id: '7', name: 'iPhone' }, { id: '8', name: 'iPod' }, { id: '9', name: 'Mac' }];
    this.serviceTypes = [{ id: '0', name: 'Select Type' }, { id: '1', name: 'Chargeable - C' }, { id: '2', name: 'Warranty - W' },
    { id: '3', name: 'Yet to determine' }];
    this.partNo = '';

    if ((this.userRole === '2') || (this.userRole === '3') || (this.userRole === '4') || (this.userRole === '10') || (this.userRole === '18')) {
      this.serviceTeamUsers = true;
    } else {
      this.serviceTeamUsers = false;
    }

    if ((this.userRole === '20') || (this.userRole === '6') || (this.userRole === '8')) {
      this.onsiteL1Approver = true;
    } else {
      this.onsiteL1Approver = false;
    }
    this.productFamilies = [{ name: 'iPod', value: 'IPOD' }, { name: 'iPad', value: 'IPAD' }, { name: 'iPhone', value: 'IPHONE' }, { name: 'Apple Watch', value: 'WATCH' }, { name: 'Apple TV', value: 'APPLETV' }, { name: 'Mac', value: 'MAC' }, { name: 'Beats', value: 'BEATS' }, { name: 'Homepod', value: 'HOMEPOD' }, { name: 'Airpods', value: 'AIRPODS' }, { name: 'Others', value: 'IPHONE' }];
  }

  ngOnDestroy() {
    localStorage.removeItem('id');
  }

  assignValues() {
    this.reproducibilities = [
      { label: 'A-Not Applicable', value: 'A' },
      { label: 'B-Continuous', value: 'B' },
      { label: 'C-Intermittent', value: 'C' },
      { label: 'D-Fails After Warm Up', value: 'D' },
      { label: 'E-Environmental', value: 'E' },
      { label: 'F-Configuration: Peripheral', value: 'F' },
      { label: 'G-Damaged', value: 'G' },
      { label: 'H-Screening Request', value: 'H' },
    ];
    this.repairTypes = [
      { label: 'Carry-In', value: 'CIN' },
      { label: 'Mail-In', value: 'WUMS' },
      { label: 'Service Non-Repair Case', value: 'SVNR' },
      /* {label: 'Carry-In Return Before Replace', value: 'CRBR'} */
    ];
    this.repairClassifications = [
      { label: 'DIRECT', value: 'DIRECT' },
      { label: 'INDIRECT', value: 'INDIRECT' },
      { label: 'NEEDS_EXTRA_UNDERSTANDING', value: 'NEEDS_EXTRA_UNDERSTANDING' }
    ];
    this.repairClassification = this.repairClassifications[0].value;
  }

  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  hideModel() {
    this.buttonSpin = false;
    this.kbbImageZoom = false;
    this.notfilled = false;
    this.deliveryType = '';
    this.showDateAndTime = false;
    this.productCode = '';
    this.selectedDate = '';
    this.productFamily = 'Select Product Family';
    this.modalService.dismissAll();
    this.selectTimeforAppoint = false;
    this.qansweredQuestions = [];
    this.answeredQuestions = [];
    this.subRequiredQuestions = [];
    this.selectedAnswer = '';
    this.showingQuestion = '';
    this.showNextBtn = true;
    this.qsubmitDoc = false;
    this.requiredQuestions = [];
    this.qsubRequiredQuestions = [];
    this.thirdlevelQuestions = [];
    this.fourthlevelQuestions = [];
    this.fifthlevelQuestions = [];
    this.parentOfFourthLevel = '';
    this.parentOfThirdLevel = '';
    this.parentOfFifthLevel = '';
    this.L1L2DeclineReview = '';
    this.dropAddress = '';
    this.dCallCloseReason = '';
    this.dCallArrivalDate = '';
    this.dCallCompletionDate = '';
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
    this.caseId = '';
    this.caseIdValidated = false;
    this.invalidCaseIdMsg = '';
    this.warrantyExpiryDate = '';
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

  get gsxInvoiceItems(): any[] {
    return (this.gsxInvoice || []).filter((inv: any) => inv.invoice_desc !== 'AC Rep-Credit Memo');
  }

  get creditMemoItems(): any[] {
    return (this.gsxInvoice || []).filter((inv: any) => inv.invoice_desc === 'AC Rep-Credit Memo');
  }

  gsxInvFun() {
    if (this.upGsxInvArrow) {
      this.upGsxInvArrow = false;
      this.isGsxInvoicetab = !this.isGsxInvoicetab;
    } else {
      this.upGsxInvArrow = true;
      this.isGsxInvoicetab = !this.isGsxInvoicetab;
    }
  }

  creditMemoFun() {
    if (this.upCreditMemoArrow) {
      this.upCreditMemoArrow = false;
      this.isCreditMemotab = !this.isCreditMemotab;
    } else {
      this.upCreditMemoArrow = true;
      this.isCreditMemotab = !this.isCreditMemotab;
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

  getdata(ticket_id: string | null) {
    // console.log(this.data.status_id );
    let results: any = [];
    this.dataService.getDetail(ticket_id)
      .subscribe({
        next: (data: any) => {
          results = data;
          this.clicked = false;
          this.dataTemp = data;
          this.dataTemp = this.dataTemp.tickets[0];
          this.diagnosisHd = results.diagnosis[0]?.repair_hd[0];
          this.diagnosisDt = results.diagnosis[0].repair_dt;
          this.technicianComments = results.diagnosis[0].tech_notes;
          this.data = this.dataTemp;
          this.acPlusDetails = results.agreements;
          this.dCallType = this.dataTemp.dcall_type;
         this.crer = this.data.crer_flag == 1;
         this.crerSaved = this.crer;
          if (this.data.gsx_sms_enabled == 1) {
            this.gsxSms = true;
          } else {
            this.gsxSms = false;
          }
          this.getAssignee();
          /*  if (this.data.agreements !== null) {
             this.acPlusDetails = this.data.agreements;
           } */
          this.title = this.data.problem_reported;
          if (this.title.length > 100) {
            this.title = this.title.slice(0, 150);
            this.title = this.title + '...';
          }
          this.ticketId = '';
          this.ticketId = this.data.id;
          this.zzInvoiceValidated = false;
          this.zzPopValidated = 0;
          this.zzInvoiceNo = '';
          this.zzInvoiceDate = '';
          this.zzInvoiceError = '';
          this.poNo = this.data.branch_code + this.ticketId;
          this.warrantyStatus = this.data.warranty_status;
          this.data.serial_no = this.data.serial_no.toUpperCase();
          this.imeiNo = this.data.imei_no;
          this.repairStage = this.diagnosisHd.repair_stage;
          this.t1InvoiceNo = this.data.t1_invoice_id;
          // this.isInternalAsset = this.data.internal_asset_flag;
          this.letterHtml = this.diagnosisHd.inbox_letter;
          this.isInternalAsset = '0';
          if (this.data.comptia !== '') {
            this.checkListData = JSON.parse(this.data.comptia);
          }
          if (this.diagnosisHd.svc_remarks === '') {
            this.svcRemarks = this.diagnosisHd.technician_note;
            // let remarksLower = this.svcRemarks.toLowerCase();

            // for (let item of this.diagnosisDt) {

            //   if (item.kbb_serial_no) {
            //     let kbbLine = `KBB serial number: ${item.kbb_serial_no}`;
            //     if (!remarksLower.includes(kbbLine.toLowerCase())) {
            //       this.svcRemarks += `\n${kbbLine}`;
            //       remarksLower += kbbLine.toLowerCase();
            //     }
            //   }

            //   if (item.kgb_serial_no) {
            //     let kgbLine = `KGB serial number: ${item.kgb_serial_no}`;
            //     if (!remarksLower.includes(kgbLine.toLowerCase())) {
            //       this.svcRemarks += `\n${kgbLine}`;
            //       remarksLower += kgbLine.toLowerCase();
            //     }
            //   }
            // }

          } else {

            this.svcRemarks = this.diagnosisHd.svc_remarks;
            // let remarksLower = this.svcRemarks.toLowerCase();

            // for (let item of this.diagnosisDt) {

            //   if (item.kbb_serial_no) {
            //     let kbbLine = `KBB serial number: ${item.kbb_serial_no}`;
            //     if (!remarksLower.includes(kbbLine.toLowerCase())) {
            //       this.svcRemarks += `\n${kbbLine}`;
            //       remarksLower += kbbLine.toLowerCase();
            //     }
            //   }

            //   if (item.kgb_serial_no) {
            //     let kgbLine = `KGB serial number: ${item.kgb_serial_no}`;
            //     if (!remarksLower.includes(kgbLine.toLowerCase())) {
            //       this.svcRemarks += `\n${kgbLine}`;
            //       remarksLower += kgbLine.toLowerCase();
            //     }
            //   }
            // }
          }

          if (this.data.kd_call === '0') {
            this.kdCall = false;
          } else {
            this.kdCall = true;
          }
          if (this.data.legal_case === '0') {
            this.LegalCase_flag = false;
          } else {
            this.LegalCase_flag = true;
            this.isLegalCase = 1;
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
          // this.mapOnsiteRepair();
          this.kbbDisplayImageList = [];
          this.getDocuments(this.ticketId);
          this.getPaymentDetails();   //ERP server down(invoice fetch disable)
          if ((this.data.status_id === '2500') && ((this.letterHtml === '') || ((this.letterHtml === null)))) {
            this.downloadInboxLetter();
          }
          if ((this.data.status_id !== '1700') || (this.data.status_id !== '2820') || (this.data.status_id !== '3100') || (this.data.status_id !== '3500') || (this.data.status_id !== '700')) {
            this.userDataService.mapCrmGsx(this.ticketId).subscribe({
              next: (data1: any) => {
              }, // success path
              error: (error: any) => this.error = error // error path
            });
          }
          this.userDataService.mapPartConstraint(this.ticketId).subscribe({
            next: (data1: any) => {
            }, // success path
            error: (error: any) => this.error = error // error path
          });

          if ((this.data.netsuite_internal_id === '0') && (this.netSuiteEnabled)) {
            this.createCase();
          } else {
            this.netSuiteCase = this.netSuiteEnabled
          }

          if ((this.data.status_id === '1600') && (this.netSuiteEnabled)) {
            this.grnInventoryAdjustment();
          }

          if (this.data.status_id === '1800') {
            this.manualTicketChangeConfirm('1100', 'Credit Review Cleared');
          }
          /* this.userDataService.mapBlueDartTrack(this.ticketId).subscribe((data1: any) => {
          }, // success path
          error => this.error = error // error path
          ); */
          this.loading = false;
          if (this.data.product_family === 'Mac') {
            this.isQuoteMac = true;
          } else {
            this.isQuoteMac = false;
          }
          if (this.data.product_description.includes('*****')) {
            this.productName = '';
          } else {
            this.productName = this.data.product_description;
          }
          if (this.data.warranty_status.includes('*****')) {
            this.warrantyStatus = '';
          } else {
            this.warrantyStatus = this.data.warranty_status;
          }
          if (this.warrantyStatus === '') {
            this.showTokenIssued = false;
          } else if ((this.warrantyStatus === 'Out Of Warranty (No Coverage)') && (this.data.t1InvoiceNo === '')) {
            this.showTokenIssued = true;
          } else if (this.data.token_no === '0') {
            this.showTokenIssued = true;
          }
          if (this.data.quotation_new_flag === 'Y') {
            this.isCreateQuote = 'false';
          } else {
            this.isCreateQuote = 'null';
          }

          if (this.data.pending_type === '') {
            this.data.pending_type = 'Select Pending Status';
          }
          if (this.data.g_number === '') {
            this.serviceData = { gsxNo: '', serviceType: 'Select Value', diagnosis: '' };
          } else {
            this.gsxNo = this.data.g_number;
            this.serviceData = { gsxNo: this.data.g_number, serviceType: 'Select Value', diagnosis: '' };
          }

          if (this.data.t1_invoice_id !== '') {
            this.tokenIssued = true;
          }

          this.getComponents();
          this.getParts('exist');

          /* if ((this.userRole === '10') || (this.userRole === '2') || (this.userRole === '3') || (this.userRole === '6') || (this.userRole === '8')) {
            let results1: any = [];
            this.dataService.getRepairStages()
              .subscribe({
                next: (data1: any) => {
                  results1 = data1;
                  if (results1.status === true) {
                    this.repairStages = results1.repair_stage;
                  } else {
                    alert(results1.message);
                  }
                }, // success path
                error: (error: any) => this.error = error // error path
              });
          } */

          this.getTicketDetail();

          if (this.data.g_number.slice(0, 1) === 'D') {
            this.dCallCheck = true;

            this.repairTypes = [
              { label: 'Onsite Service Facilitated', value: 'OSR' },
              { label: 'Onsite Service Pickup', value: 'OSCR' },
            ];
          }

          if ((this.userRole === '10') || (this.userRole === '2') || (this.userRole === '3') || (this.userRole === '6') || (this.userRole === '8')) {
            if (((this.data.status_id === '800') || (this.data.status_id === '8300') || (this.data.status_id === '8400')) && (this.diagnosisHd.additional_part === '0') || (this.userRole === '3')) {
              this.showRepairStageList = true;
              // console.log('showRepairStageList set to true under CIN condition');
            } else if ((this.data.status_id === '800') && (this.diagnosisHd.additional_part === '1') && (this.data.site_type_id === '1') && (this.userRole === '2')) {
              this.showRepairStageList = true;
            } else if ((this.data.status_id === '800') && (this.diagnosisHd.additional_part === '0') && (this.data.site_type_id === '1') && (this.userRole === '2')) {
              this.showRepairStageList = true;
              // console.log('Matched condition: CIN + 800 + additional_part 0 + site 1 + role 2');

            }
          } else {

            // this.showRepairStageList = false;

          }

          if (this.data.site_type_id === '2') {
            this.isDevice = false;
            this.getCustomerInfo(this.data.customer_id);
          } else if (this.data.site_type_id === '1') {
            this.getCustomerInfo(this.data.customer_id);
            if ((this.data.product_family === 'iPad') && ((this.diagnosisHd.component_code !== 'PD17A') && (this.diagnosisHd.component_code !== 'PD17B')) && (this.data.status_id === '300')) {
              this.checkiPadConfig();
              this.getDiagDetails();
            }
          }

          const iPhone1213 = this.data.product_description.slice(0, 9);
          if ((iPhone1213 === 'iPhone 12') || (iPhone1213 === 'iPhone 13')) {
            this.getDiagDetails();
          }

          if (this.data.site_type_id === '1') {
            if ((this.userRole === '4') || (this.userRole === '18')) {
              if ((this.diagnosisHd.repair_stage !== 'In-Diagnosis') && (this.diagnosisHd.repair_stage !== 'L1-Declined') && (this.diagnosisHd.repair_stage !== 'L2-Declined')) {
                this.diagnosisHold = true;
              } else {
                this.diagnosisHold = false;
              }
            }

            if ((this.data.status_id === '400') || (this.data.status_id === '500')) {
              this.diagnosisHold = true;
            }
            if (((this.data.status_id === '1100') || (this.data.status_id === '1900') || (this.data.status_id === '2400') || (this.data.status_id === '1300')) && (this.serviceTeamUsers) &&
              ((this.data.gsx_status_code !== 'SCNC') && (this.data.gsx_status_code !== 'PCNC') && (this.data.gsx_status_code !== 'SCOM'))) {
              this.showInwardButton = true;
            } else {
              this.showInwardButton = false;
            }

            if (((this.data.status_id === '1100') || (this.data.status_id === '2100') || (this.data.status_id === '1500')) && ((this.data.gsx_status_code === 'SCNC') || (this.data.gsx_status_code === 'PCNC') || (this.data.gsx_status_code === 'SCOM'))) {
              this.showAppleDeclinedBtn = true;
            } else {
              this.showAppleDeclinedBtn = false;
            }
            // console.log(this.diagnosisHold);

          } else {
            /* ****************************** SITE TYPE 2 ************************ */

            if (this.userBranch === 'OSH') {
              if (this.warrantyStatus === 'Out Of Warranty (No Coverage)') {
                this.repairTypes = [
                  { label: 'Service Non-Repair Case', value: 'SVNR' },
                ];
                // console.log(this.repairTypes);
              }

              this.repairClassifications = [
                { label: 'INDIRECT', value: 'INDIRECT' },
                { label: 'NEEDS_EXTRA_UNDERSTANDING', value: 'NEEDS_EXTRA_UNDERSTANDING' }
              ];

              this.repairClassification = this.repairClassifications[0].value;
            }

            if ((this.userRole === '5') || (this.userRole === '19')) {
              if (((this.diagnosisHd.repair_stage === 'In-Diagnosis') || (this.diagnosisHd.repair_stage === 'L1-Declined')) && (this.data.status_id === '8210')) {
                this.diagnosisHold = false;
              } else {
                this.diagnosisHold = true;
              }

            } else if ((this.userRole === '20')) {
              if ((this.data.status_id === '8225')) {
                this.diagnosisHold = false;
              } else {
                this.diagnosisHold = true;
              }
            } else {
              /* if ((this.userRole === '8') && (this.data.status_id === '8400')) {
                this.diagnosisHold = false;
              } else {
                this.diagnosisHold = true;
              } */
              this.diagnosisHold = true;
            }


            if (this.data.status_id === '8225') {
              this.quoteDocumentsTypes = [
                { id: '1', name: 'Quotation' },
              ];
            } else if (this.data.status_id === '8350') {
              this.quoteDocumentsTypes = [
                { id: '2', name: 'OPF' },
              ];
            }
          } // Onsite Close

          if ((this.data.status_id === '1600') || (this.data.status_id === '2500')) {
            this.showQCButton = true;
          } else {
            this.showQCButton = false;
          }

          if ((this.data.status_id === '1650') || (this.data.status_id === '1700') || (this.data.status_id === '3100')) {
            this.showQCAButton = true;
          } else {
            this.showQCAButton = false;
          }

          /*  if (this.data.status_id <= 3500) {
             this.repairEligibility();
           } */

          if ((this.data.status_id === '1500') || (this.data.status_id === '8610')) {
            this.checkWholeUnitPart();
          }

          if (this.acPlusDetails.agreements) {
            let acPlusData: any;
            this.acPlusAvailable = true;
            acPlusData = this.acPlusDetails.agreements;
            this.acContract = acPlusData.eligibleAppleCareContract[0].appleCareContract;
            // console.log(acPlusData.eligibleAppleCareContract[0].eligibleAppleCareTiers);
            if (acPlusData.eligibleAppleCareContract[0].eligibleAppleCareTiers) {
              const acTiresTemp = acPlusData.eligibleAppleCareContract[0].eligibleAppleCareTiers
              this.acTires = this.sanitizer.sanitize(SecurityContext.HTML, this.acTires);
              for (let i = 0; i < acTiresTemp.length; i++) {
                if (acTiresTemp[i].tierDescription) {
                  const desc = acTiresTemp[i].tierDescription.charAt(0).toUpperCase() + acTiresTemp[i].tierDescription.slice(1);
                  if ((this.acTires === '') || (this.acTires === null)) {
                    this.acTires = '<span>' + desc + '&nbsp;' + '&nbsp;' + '<b>' + acTiresTemp[i].tierPrice + '</b>' + '</span>'
                  } else {
                    this.acTires = this.acTires + '<br>' + '<span>' + desc + '&nbsp;' + '&nbsp;' + '<b>' + acTiresTemp[i].tierPrice + '</b>' + '</span><br/>'
                  }
                }
              }
            } else {
              this.acTires = '<span>' + 'No AC Tires Available' + '</span>';
            }
          } /* else {
            console.log('empty');
          } */
          setTimeout(() => {
            this.checkTicket();
            let branch = this.statusOptions.branch.find((a: any) => a.branch_code === this.data.dl_branch_code);
            if (branch != undefined) {
              let dlFlag = localStorage.getItem('drop_location_flag')
              if (branch.dl_type === 'Imagine') {
                this.isImagine = true;
              }
              if (this.isImagine === true && dlFlag === '1') {
                if (this.data.status_id === '300') {
                  this.showConvertToPud = true;
                  this.repairTypes = [
                    { label: 'Service Non-Repair Case', value: 'SVNR' }
                  ];
                } else {
                  this.showConvertToPud = false;
                  // this.repairTypes = [];
                }
              }
              if (branch.rdo_id !== null) {
                this.isRDO = true;
              }
            }
          }, 2000);

          setTimeout(() => {
            this.assignDiagnosisData();
            // this.checkQuoteStatuses();
            if (((this.data.product_family === 'iPhone') && (this.data.product_category !== 'Others') && (this.data.product_family !== 'Pencil') && (this.data.product_description !== 'iPhone MagSafe Battery Pack')) && (this.repairType === 'CIN') && (this.data.status_id === '800')) {
              this.getDiagDetails();
            } else {
              this.astDiagEligible = true;
            }
          }, 2000);
          this.html = '';
          this.html = this.html + '<span>' + 'Token No' + '&nbsp;' + '-' + '&nbsp;' + this.data.token_no + '</span><br/>' + '<span>' + 'Family' + '&nbsp;' + '-' + '&nbsp;' + this.data.product_family + '</span><br/>' + '<span>' + 'Product' + '&nbsp;' + '-' + '&nbsp;' + this.data.product_category + '</span><br/>';
          this.bsValue = new Date(this.diagnosisHd.unit_received_date);
          this.myTime = new Date(this.data.entrytime);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getTicketDetail() {
    let analysisTemp: any = [];
    this.dataService.getTicketDetail(this.ticketId)
      .subscribe({
        next: (data1: any) => {
          let resul: any = data1;
          this.getSVC(resul.service_report);
          this.declinedGNumbers = resul.declined_repairs.status === true ? resul.declined_repairs.repairs : [];
          this.consumablesCheck = resul.consumable_required;
          this.getnotifications(resul.notifications);
          this.gsxStatus = resul.gsx_status;
          this.checkDisplayCRBR(resul.display_part);
          this.checkCustomerDisSat(resul.customer_rating);
          this.getTicketAdhesives(resul.adhesives);
          this.repairStages = resul.repair_stage;
          this.getIsPud(resul.pud_ticket);
          this.getQuotation(this.ticketId);
          this.getGsxInvoice(this.ticketId);
          if (resul.analysis.status === true) {
            analysisTemp = resul.analysis.analysis;
            for (let i = 0; i < analysisTemp.length; i++) {
              if ((analysisTemp[i].group_id !== '9') || (analysisTemp[i].group_id !== '16') || (analysisTemp[i].group_id !== '17')) {
                this.analysisList.push(analysisTemp[i]);
              }
              if ((analysisTemp[i].group_id === '9') || (analysisTemp[i].group_id === '16') || (analysisTemp[i].group_id === '17')) {
                this.ccAnalysisList.push(analysisTemp[i]);
              }
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getGsxInvoice(ticketId: string) {
    this.dataService.getGsxInvoice(ticketId).subscribe({
      next: (data: any) => {
        if (data.status !== true) {
          return;
        }
        this.gsxInvoice = data.data || [];
        const st = data.invoice_status;
        if (st && typeof st === 'object') {
          this.refundStatusText = st.refund_payment_status || '';
          this.refundDate       = st.refund_date           || '';
          this.refundUtr        = st.refund_utr            || '';
          this.refundValue      = st.refund_value          || '';
        } else if (st && typeof st === 'string') {
          this.refundStatusText = st;
        }
      },
      error: (error: any) => this.error = error
    });
  }

  checkiPadConfig() {
    let result;
    this.dataService.checkiPadHighConfig(this.data.product_config, this.data.product_description)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.isiPadHighConfig = true;
            // Swal.fire('Warning', 'This iPad deducted as High Config, please don not perform HDI Diagnosis, proceed with the Mail-In Repair.', 'warning')
            Swal.fire({
              title: 'Warning',
              text: 'This iPad deducted as High Config, please do-not perform HDI Diagnosis, proceed with the Mail-In Repair',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'Yes, Understood!',
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result: { isConfirmed: any; }) => {
              if (result.isConfirmed) {
                // console.log('Clicked Yes, File deleted!');
              }
            })
          } else {
            this.isiPadHighConfig = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  checklegalcase() {

  const legalFlag = this.isLegalCase ? 1 : 0;
  this.dataService.checklegalcase(this.ticketId, legalFlag)
    .subscribe({
      next: (res: any) => {

        if (res.result.data.legal_case === '1') {

          this.LegalCase_flag = true;

          if (this.LegalCase_flag) {
            Swal.fire({
              title: 'Warning',
              text: 'Legal Case',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'Yes, Understood!',
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }

        } else {
          this.LegalCase_flag = false;
        }
      },
      error: (error: any) => {
        this.error = error;
        this.LegalCase_flag = false;
      }
    });
}


  checkWholeUnitPart() {
    let result;
    this.dataService.checkCinKgbPart(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.kbbNotRequired = true;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  manualTicketStatusChange(remarks: string) {
    if (remarks === 'appleRevertRemarks') {
      if (this.appleCustomerRevertRemarks !== '') {
        this.manualTicketChangeConfirm('300', this.appleCustomerRevertRemarks);
      } else {
        this.notfilled = true;
      }
    } else {
      if (this.ticketStatusUpdateRemarks !== '') {
        this.manualTicketChangeConfirm(this.toTicketStatusUpdate, this.ticketStatusUpdateRemarks);
      } else {
        this.notfilled = true;
      }
    }
  }

  manualTicketChangeConfirm(toStatus: string, remarks: string) {
    let result;
    this.dataService.changeBinOthersManually(this.ticketId, toStatus, remarks)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if ((this.data.status_id !== '8100') && (this.data.status_id !== '8150') && (toStatus !== '1500') && (toStatus !== '3000')) {
              this.modalService.dismissAll();
            }
            this.getdata(this.ticketId);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  ticketStatusUpdate(ticket_status_update: TemplateRef<any>, toStatus: string) {
    this.toTicketStatusUpdate = toStatus;
    this.openModal(ticket_status_update);
  }

  appleCustomerRevert(apple_customer_revert: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(apple_customer_revert);
  }

  getDelinedRepairs() {
    let result;
    this.dataService.declinedGRepairs(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.declinedGNumbers = result.repairs;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  checkConsumablesRequired() {
    let result;
    this.dataService.checkConsumablesRequired(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.consumablesCheck = true;
          } else {
            this.consumablesCheck = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  repairEligibility(repair_eligible: TemplateRef<any>) {
    let result: any;
    let resultResponse: any;
    let repairMsg = '';
    let reasons1: any = [];
    this.repairEligibleError = '';
    if (this.repairEligibleDetails.length === 0) {
      this.dataService.repairEligibility(this.data.serial_no)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              resultResponse = result.gsx_response.eligibilityDetails.outcome;
              const reasons = resultResponse.map((item: { reasons: any; }) => item.reasons);
              if (reasons.length > 1) {
                reasons1 = reasons[0].concat(reasons[1]);
              } else {
                reasons1 = reasons[0];
              }

              for (let i = 0; i < reasons1.length; i++) {
                if (reasons1[i].type === 'WARNING') {
                  if (reasons1[i].messages) {
                    const messages = reasons1[i].messages;
                    for (let j = 0; j < messages.length; j++) {
                      if ((reasons1[i].messages[j].includes('Find My')) || (reasons1[i].messages[j].includes('active'))) {
                        this.fmipDetails = reasons1[i].messages[j];
                        this.fmipStatus = true;
                        this.fmipColor = '#ff0000';
                      } else {
                        this.fmipDetails = reasons1[i].messages[j];
                      }
                    }
                  }
                } else if (reasons1[i].type === 'REPAIR_TYPE') {
                  if (reasons1[i].messages) {
                    repairMsg = reasons1[i].messages[0];
                  }
                  this.repairEligibleDetails.push({
                    message: repairMsg,
                    repairOptions: reasons1[i].repairOptions
                  });
                }
              }
              this.openModal(repair_eligible);
            } else {
              alert(result.message);
              // this.repairEligibleError = result.message;
            }

          });
    } else {
      this.openModal(repair_eligible);
    }
  }

  /* repairEligibilityDialog(repair_eligible: TemplateRef<any>) {
    this.repairEligibility(repair_eligible);
    this.openModal(repair_eligible);
  } */

  assignDiagnosisData() {

    if (this.data.customer_dissatisfied === '0') {
      this.customerDisSatStyles.cDisStatBColor = '#fff';
      this.customerDisSatStyles.cDisStatFColor = '#000'
      this.customerDisSatStyles.linkColor = '#20a8d8'
    } else {
      this.customerDisSatStyles.cDisStatBColor = '#f00';
      this.customerDisSatStyles.cDisStatFColor = '#fff';
      this.customerDisSatStyles.linkColor = '#fbfb00';
    }

    if ((this.data.site_type_id === '1') && (this.userBranch === 'SMT')) {
      let statusID: number = parseInt(this.data.status_id);
      if ((statusID >= 1100) && ((statusID <= 1600)) && (!this.isReQuoted)) {
        this.checkPOPFile();
        this.getPOPRequiredList();
      }
    }

    /*  if (this.data.product_family === 'iPhone') {
       this.checkiPhoneCategory();
     }
  */

    if ((this.data.status_id === '300') || (this.data.status_id === '8210')) {
      this.diagnosisEdit();
    }

    this.kbbVerificationParts = [];
    for (let i = 0; i < this.repairTypes.length; i++) {
      if (this.repairTypes[i].value === this.diagnosisHd.repair_type) {
        this.repairType = this.repairTypes[i].value;
        // this.repairClassification = this.diagnosisHd.repair_classification;
      }
    }

    if (this.repairType === 'WUMS') {
      this.isMailIn = true;
    }
    for (let j = 0; j < this.snvrTypes.length; j++) {
      if (this.snvrTypes[j].value === this.diagnosisHd.service_nonrepair_type) {
        this.snvrType = this.snvrTypes[j].value;
      }
    }
    this.kbbDisplayDiagSerial = this.diagnosisHd.kbb_display_sr_no;
    this.kbbSerialNoVerified = this.diagnosisHd.kbb_display_sr_no_verified;
    if (this.kbbDisplayDiagSerial === null) {
      this.kbbDisplayDiagSerial = '';
    }
    if (this.kbbSerialNoVerified === '1') {
      this.kbbErrorMessage = 'KBB Image Serial number verified';
    }

    this.coverageOption = this.diagnosisHd.coverage_option === '' ? null : this.diagnosisHd.coverage_option;
    this.diagnosisData = this.diagnosisHd.technician_note;
    this.loanerDescription = this.diagnosisHd.loaner;
    this.loanerSno = this.diagnosisHd.loaner_sr_no;
    this.loanerPartNumber = this.diagnosisHd.loaner_part_no;
    this.snvrType = this.diagnosisHd.service_nonrepair_type;
    this.serviceCharge = this.diagnosisHd.service_charge;
    this.ticketBranch = this.diagnosisHd.branch_code;
    if ((this.ticketBranch === 'SNB') || (this.ticketBranch === 'STC') || (this.ticketBranch === 'SLM') || (this.ticketBranch === 'SOM')) { //APP LOCATION
      this.branchType = 'A';
    } else {
      this.branchType = 'I';
    }
    this.deliveryReservation = ((this.data.delivery_reservation_id === null) || (this.data.delivery_reservation_id === '')) ? false : true;
    if (this.data.dl_branch_code === 'DNB' || this.data.dl_branch_code === 'DTC' || this.data.dl_branch_code === 'DMA' || this.data.dl_branch_code === 'DCC' || this.data.dl_branch_code === 'DLC' || this.data.dl_branch_code === 'DMV') {
      this.deliveryReservation = true;
    }

    if (this.diagnosisHd.repair_classification !== '') {
      this.repairClassification = this.diagnosisHd.repair_classification;
    }
    this.reproducibility = this.diagnosisHd.reproducibility;
    if (this.diagnosisHd.questions !== 'null') {
      this.isGsxQuestionAnswered = 'Yes';
    } else {
      this.isGsxQuestionAnswered = 'No';
    }

    if (this.data.condition_of_device === '') {
      this.typeofDamage = 'Select the Damage';
    } else {
      this.typeofDamage = this.data.condition_of_device;
    }

    if (this.diagnosisHd.consumable_charge === '0.00') {
      this.consumableCharges = false;
    } else {
      this.consumableCharges = true;
    }

    if (((this.data.status_id === '8210') && ((this.warrantyStatus !== 'Out of Warranty (No Coverage)') && (this.warrantyStatus !== 'Out of Warranty(No Coverage)'))) && ((this.userRole === '5') || (this.userRole === '19'))) {
      if ((this.typeofDamage === 'Physical Damage') || (this.typeofDamage === 'Liquid Damage')) {
        this.enableCreateRepairBtn = false;
      } else {
        this.enableCreateRepairBtn = true;
      }
    } else if ((this.data.status_id === '8400') && ((this.userRole === '19') || (this.userRole === '5'))) {
      this.enableCreateRepairBtn = true;
    } else {
      this.enableCreateRepairBtn = false;
    }

    if (this.data.pop_review_hold === '0') {
      this.popAppleReviewHold = false;
    } else {
      this.popAppleReviewHold = true;
    }

    if (this.diagnosisHd.request_review_by_apple === '1') {
      this.requestAppleReview = true;
      this.holdReview = this.diagnosisHd.apple_review_note;
    } else {
      this.requestAppleReview = false;
    }

    if (this.diagnosisHd.coverage_option === 'APPLECARE_PLUS') {
      this.showACSType = true;
      this.getACSParts();
      this.acsPart = this.diagnosisHd.acs_part_no;
      this.acsPriceType = this.diagnosisHd.acs_price_type;
    } else {
      this.showACSType = false;
      this.acsPart = '';
      this.acsPriceType = '';
    }

    if (this.diagnosisDt.length === '0') {
      this.consignmentView = false;
    } else {
      this.consignmentView = true;
      this.showDraftBtn = true;
    }

    setTimeout(() => {
      this.repairSelect(this.repairType);
      if (this.diagnosisHd.component_code !== '') {
        this.componentCode = this.diagnosisHd.component_code;
        this.issues = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode) > -1);
        this.issueCode = this.diagnosisHd.issue_code;
        this.flagIssue = false;
      }
      if ((this.diagnosisHd.customer_component_code !== '') && (this.diagnosisHd.customer_component_code !== null)) {
        this.componentCode1 = this.diagnosisHd.customer_component_code;
        this.issues1 = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode1) > -1);
        this.issueCode1 = this.diagnosisHd.customer_issue_code;
        this.flagIssue1 = false;
        this.addmorecomponentFlag1 = true;
      }

      if ((this.diagnosisHd.customer_component_code1 !== '') && (this.diagnosisHd.customer_component_code1 !== null)) {
        this.componentCode2 = this.diagnosisHd.customer_component_code1;
        this.issues2 = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode2) > -1);
        this.issueCode2 = this.diagnosisHd.customer_issue_code1;
        this.flagIssue2 = false;
        this.addmorecomponentFlag2 = true;
      }

      if (this.diagnosisHold === true) {
        this.flagIssue = true;
        this.flagIssue1 = true;
        this.flagIssue2 = true;
      }

      let checkAddPart = true;

      for (let j = 0; j < this.diagnosisDt.length; j++) {
        if (this.data.site_type_id === '2') {
          if (this.diagnosisDt[j].kgb_serial_no !== '') {
            this.ackParts.push(this.diagnosisDt[j]);
          }
          /* if ((this.diagnosisDt[j].number === '011-00211') || (this.diagnosisDt[j].number === '011-00224') || (this.diagnosisDt[j].number === '076-00410')) {
            this.enableCreateRepairBtn = true;
          } */
        }

        let fromConsignment = false;
        if (this.diagnosisDt[j].from_consigned_stock === '0') {
          fromConsignment = false;
        } else {
          fromConsignment = true;
        }
        if (this.repairType === 'WUMS') {
          const statusID: number = parseInt(this.data.status_id);
          if (this.data.site_type_id === '1') {
            if (((statusID >= 2100) && (statusID <= 2800)) && ((statusID !== 2820)) && (!this.isReQuoted)) {
              if ((this.diagnosisDt[j].additional_part === '1') && (this.diagnosisDt[j].rc_added_part !== '1')) {
                checkAddPart = false;
              } else {
                checkAddPart = true;
              }
            } else {
              if (this.data.status_id === '300') {
                checkAddPart = false;
              } else {
                checkAddPart = true;
              }
            }
          } else {
            if (((this.data.status_id === '8225') && (this.userRole === '20')) || ((this.data.status_id === '8210') && (this.userRole === '5') || (this.userRole === '19'))) {
              checkAddPart = false;
            } else {
              checkAddPart = true;
            }
          }
          let kbbRead: any = false;
          let kgbInwarded: any = false;
          if (this.diagnosisDt[j].kbb_serial_no !== '') {
            kbbRead = true;
          }

          if ((this.diagnosisDt[j].kgb_serial_no !== '') && (this.diagnosisDt[j].consignment_asn_no === '0')) {
            kgbInwarded = true;
          }

          if (this.diagnosisDt[j].billable === '0') {
            this.selectedParts.push({
              number: this.diagnosisDt[j].part_number,
              partUsed: this.diagnosisDt[j].part_used,
              description: this.diagnosisDt[j].description,
              typeDescription: this.diagnosisDt[j].part_type,
              componentCode: this.diagnosisDt[j].component_code,
              issueCode: this.diagnosisDt[j].issue_code,
              reproducibility: this.diagnosisDt[j].reproducibility,
              readOnly: checkAddPart,
              fromConsignedStock: fromConsignment,
              consignmentType: this.diagnosisDt[j].consignment_type,
              consignmentASN: this.diagnosisDt[j].consignment_asn_no,
              kbb_serial_no: this.diagnosisDt[j].kbb_serial_no,
              kbbReadonly: kbbRead,
              kbbInputType: this.diagnosisDt[j].kbb_entry_type,
              kgbInward: kgbInwarded,
            });
            if (this.diagnosisDt[j].pricing_option === '') {
              this.selectedParts[j].pricingCheckBox = false;
            } else {
              this.selectedParts[j].pricingCheckBox = true;
            }
          } else {
            this.selectedParts.push({
              number: this.diagnosisDt[j].part_number,
              description: this.diagnosisDt[j].description,
              typeDescription: this.diagnosisDt[j].part_type,
              readOnly: checkAddPart
            });
          }
        } else if ((this.repairType === 'CIN') || (this.repairType === 'OSR') || (this.repairType === 'OSCR')) {
          let coverageMsg;
          if (this.diagnosisHd.crbr === '1') {
            this.crbr = true;
          } else {
            this.crbr = false;
          }

          if (this.exKBBDisplayPartNo === this.diagnosisDt[j].part_number) {
            this.kbbDisplayDiagSerial = this.diagnosisDt[j].kbb_serial_no;
          }

          if (this.diagnosisDt[j].part_type !== 'Adjustment') {
            this.diagnosisDt[j].kbbVerifySerialNo = '';
            this.kbbVerificationParts.push(this.diagnosisDt[j]);
          }
          // tslint:disable-next-line:radix
          const statusID: number = parseInt(this.data.status_id);
          if (this.data.site_type_id === '1') {
            if ((statusID >= 1100) && ((statusID <= 1600)) && (!this.isReQuoted)) {
              if (this.diagnosisDt[j].additional_part === '1') {
                checkAddPart = false;
              } else {
                checkAddPart = true;
              }
            } else {
              if ((this.data.status_id === '300') && ((this.repairType !== 'OSR') || (this.repairType !== 'OSCR'))) {
                checkAddPart = false;
              } else {
                checkAddPart = true;
              }
            }
          } else {
            if (((this.data.status_id === '8225') && (this.userRole === '20')) || ((this.data.status_id === '8210') && (this.userRole === '5') || (this.userRole === '19'))) { /* || ((this.data.status_id === '8400') && (this.userRole === '8')) */
              checkAddPart = false;
            } else {
              checkAddPart = true;
            }

            if ((this.diagnosisDt[j].additional_part === '1') && (this.diagnosisDt[j].rc_added_part !== '1') && ((statusID == 8750) || (statusID == 8500))) {
              checkAddPart = false;
            }
          }
          for (let k = 0; k < this.coverageOptions.length; k++) {
            if (this.coverageOptions[k].value === this.diagnosisDt[j].coverage_option) {
              coverageMsg = this.coverageOptions[k].description;
            }
          }
          let kbbRead: any = false;
          let kgbInwarded: any = false;
          let doaGPR: any = false;
          if (this.diagnosisDt[j].kbb_serial_no !== '') {
            kbbRead = true
          }

          if (this.diagnosisDt[j].kgb_serial_no !== '') {
            if ((this.diagnosisDt[j].consignment_asn_no === '0') && (this.diagnosisDt[j].doa === '0')) {
              kgbInwarded = true;
            }
            if ((this.diagnosisDt[j].doa === '0') && (this.diagnosisDt[j].gpr === '0')) {
              doaGPR = true;
            }
          }

          if ((this.data.status_id === '1100') || this.data.status_id === '800' || (!checkAddPart)) {
            this.stoConsignmentCheck = false;
          } else {
            this.stoConsignmentCheck = true;
          }

          if (this.diagnosisDt[j].consignment_type === 'AM' || this.diagnosisDt[j].consignment_type === 'Am') {
            this.diagnosisDt[j].consignment_type = 'Ample'
          } else {
            this.diagnosisDt[j].consignment_type = 'Apple'
          }

          this.selectedParts.push({
            number: this.diagnosisDt[j].part_number,
            partUsed: this.diagnosisDt[j].part_used,
            description: this.diagnosisDt[j].description,
            typeDescription: this.diagnosisDt[j].part_type,
            coverageOption: this.diagnosisDt[j].coverage_option,
            coverageMessage: coverageMsg,
            componentCode: this.diagnosisDt[j].component_code,
            issueCode: this.diagnosisDt[j].issue_code,
            reproducibility: this.diagnosisDt[j].reproducibility,
            readOnly: checkAddPart,
            fromConsignedStock: fromConsignment,
            consignmentType: this.diagnosisDt[j].consignment_type,
            consignmentASN: this.diagnosisDt[j].consignment_asn_no,
            pricingType: this.diagnosisDt[j].pricing_option,
            kbb_serial_no: this.diagnosisDt[j].kbb_serial_no,
            additional_part_flag: this.diagnosisDt[j].additional_part,
            kbbReadonly: kbbRead,
            kbbInputType: this.diagnosisDt[j].kbb_entry_type,
            kgbInward: kgbInwarded,
            canDOAGPR: doaGPR
          });
          if ((this.diagnosisDt[j].coverage_option === 'VMI_GREEN') || (this.diagnosisDt[j].coverage_option === 'VMI_YELLOW')) {
            this.selectedParts[j].showPriceOnly = true;
          } else {
            this.selectedParts[j].showPriceOnly = false;
          }
          if (this.diagnosisDt[j].pricing_option === '') {
            this.selectedParts[j].pricingCheckBox = false;
          } else {
            this.selectedParts[j].pricingCheckBox = true;
          }
          if ((this.data.status_id === '8210') && ((this.warrantyStatus !== 'Out of Warranty(No Coverage)') && (this.warrantyStatus !== 'Out of Warranty (No Coverage)')) && ((this.diagnosisDt[j].coverage_option === 'VMI_YELLOW') || (this.diagnosisDt[j].coverage_option === 'VMI_RED'))) {
            this.enableCreateRepairBtn = false;
          }

          if ((this.diagnosisDt[j].part_number === '011-00211') || (this.diagnosisDt[j].part_number === '011-00224') || (this.diagnosisDt[j].part_number === '076-00410')) {
            this.enableCreateRepairBtn = true;
          }
        }

        if (this.diagnosisDt[j].coverage_option === 'APPLECARE_PLUS') {
          this.showACSType = true;
          this.getACSParts();
          this.acsPart = this.diagnosisHd.acs_part_no;
          this.acsPriceType = this.diagnosisHd.acs_price_type;
        }

        for (let k = 0; k < this.parts.length; k++) {
          if (this.parts[k].number === this.diagnosisDt[j].part_number) {
            this.parts[k].isCheck = true;
          }
        }

        if (((this.data.status_id >= '1100') && (this.data.status_id <= '1600')) || ((this.data.status_id >= '2100') && (this.data.status_id <= '2500'))) {
          this.isL2Approved = true;
        }

        if ((this.diagnosisHd.questions === '[]') || (this.diagnosisHd.questions === null) || this.diagnosisHd.questions === '') {
          this.isGsxQuestionAnswered = 'No';
        } else {
          this.isGsxQuestionAnswered = 'Yes';
        }
      }
      if ((this.data.status_id === '1500') && ((this.selectedParts.length === 1) && ((this.selectedParts[0].number === '011-00211') || (this.selectedParts[0].number === '011-00224')))) {
        this.showQCButton = true;
      }
    }, 2000);
  }

  recentUpdate(recent_update_temp: TemplateRef<any>) {
    this.openModal(recent_update_temp);
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
    if (this.data.site_type_id === '2') {
      let results: any;
      this.dataService.getCompany(this.ticketId)
        .subscribe(
          (data: any) => {
            results = data;
            if (results.status === true) {
              this.companyName = results.company.company.company_name;
            }
          });
    }
  }

  selectKDCall() {
    let kd: any;
    if (this.kdCall === true) {
      kd = '1';
    } else {
      kd = '0';
    }
    let results: any;
    this.dataService.KDOptionUpdate(this.ticketId, kd)
      .subscribe(
        (data: any) => {
          results = data;
          if (results.status === false) {
            alert(results.message);
          } else {
            this.getdata(this.ticketId);
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

    if ((this.userRole === '6') || (this.userRole === '8')) {
      this.showAssign = true;
      this.isViewDoc = true;
    }

    if ((this.ticketType === 'enquiry') || (this.data.assigned_user_id === this.userID)) {
      this.isViewDoc = true;
    }

    if ((this.userRole === '4') || (this.userRole === '5') || (this.userRole === '18') || (this.userRole === '19')) {
      this.isTechnician = true;
    } else {
      this.isTechnician = false;
    }

    if ((this.userRole === '10') || (this.userRole === '2') || (this.userRole === '3') || (this.userRole === '18')) {
      this.isC3 = true;
      if (this.userRole === '18') {
        if (this.l2Approver === 'Y') {
          this.isC3 = true;
        } else {
          this.isC3 = false;
        }
      }
    } else {
      this.isC3 = false;
    }

    if ((this.userRole === '2') || (this.userRole === '3') || (this.userRole === '6') || (this.userRole === '20')) {
      this.enableCall = true;
    } else {
      if ((this.data.branch_code === this.userBranch) || (this.data.dl_branch_code === this.userBranch)) {
        this.enableCall = true;
      }
    }

    if ((this.userRole === '3') || (this.userRole === '2') || (this.userRole === '18') || (this.userRole === '8')) {
      this.isManager = true;
    } else {
      this.isManager = false;
    }

    if ((this.userRole === '9') || (this.userRole === '10') || (this.userRole === '11') ||
      (this.userRole === '13') || (this.userRole === '14') || (this.userRole === '15') || (this.userRole === '21')) {
      this.onlyView = true;
    } else {
      this.onlyView = false;
    }

    if ((this.userRole === '9') || (this.userRole === '16') || (this.userRole === '17')) {
      this.ccTeam = true;
    }

    if ((this.userRole === '18')) {
      this.isLIC = true;
    }

    if (this.data.site_type_id === '2') {
      this.data.enquiry_flag = 'Y';
      if (this.data.assigned_user_id !== '0') {
        this.assignReassign = 'Re-Assign';
      } else {
        this.assignReassign = 'Assign';
      }
      this.sameUnitRepairData = { label: 'Is SUR ( Same Unit Repair ) ?', options: [{ id: '1', name: 'Yes' }, { id: '2', name: 'No' }] };
      this.serviceData = { gsxNo: '', serviceType: 'Select', diagnosis: '' };
    } else {
      this.sameUnitRepairData = {
        label: 'Is SUR/WUR/NA (Same Unit Repair/Whole Unit Repair/Not Applicable)?',
        options: [{ id: '1', name: 'N/A' }, { id: '2', name: 'SUR' },
        { id: '3', name: 'WUR' }]
      };
      this.serviceData = { gsxNo: '', serviceType: 'N/A', diagnosis: '' };
      this.serviceData.serviceType = 'Select';
    }

    if ((this.data.status_id === '900') && (this.isC3)) {
      this.isPopAppleReview = false;
    } else {
      this.isPopAppleReview = true;
    }

  }

  editSeriaNo() {
    this.serialNoEdit = false;
    this.showTokenIssued = false;
    this.warrantyStatus = '';
  }

  acceptTicket(simple_alert_temp: TemplateRef<any>) {
    this.dataService.acceptTicket(this.ticketId)
      .subscribe({
        next: (data: any) => {
          this.acceptSpinner = true;
          const result: any = data;
          setTimeout(() => {
            if (result.status === true) {
              // this.getAssignee();
              this.getdata(this.ticketId);
              this.acceptSpinner = false;
            } else {
              this.simpleAlert = { title: 'Accept Ticket', msg: result.message };
              this.acceptSpinner = false;
              this.openModal(simple_alert_temp);
            }
          }, 2000);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  release(ticket_release_temp: TemplateRef<any>) {
    this.acceptSpinner = true;
    this.openModal(ticket_release_temp);
  }

  releaseTicket(simple_alert_temp: TemplateRef<any>) {
    if (this.releaseRemarks === '') {
      this.notfilled = true;
      this.acceptSpinner = false;
    } else {
      this.acceptSpinner = true;
      this.modalService.dismissAll();
      this.dataService.releaseTicket(this.ticketId, this.releaseRemarks)
        .subscribe({
          next: (data: any) => {
            const result: any = data;
            if (result.status === true) {
              // this.getAssignee();
              this.getdata(this.ticketId);
              this.releaseRemarks = '';
              this.acceptSpinner = false;
            } else {
              this.simpleAlert = { title: 'Release Ticket', msg: result.message };
              this.acceptSpinner = false;
              this.releaseRemarks = '';
              this.openModal(simple_alert_temp);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
      this.notfilled = false;
    }
  }

  /*  scheduleDate() {
     const visitDateTime = this.datePipe.transform(this.scheduleDateTime, 'yyyy-MM-dd hh:mm:ss');
   } */

  getAssignee() {
    let userId: any = '';
    if ((this.data.repair_type === 'Software') && (((this.data.dl_branch_code != '') && (this.data.dl_branch_code != null)))) {
      userId = this.data.assigned_user_id;
    } else {
      userId = this.userID;
    }

    this.dataService.getAssignees(userId)
      .subscribe({
        next: (data: any) => {
          const assigneeData: any = data;
          this.assignees = assigneeData.user;
        }, // success path
        error: (error: any) => this.error = error // error path
      });
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

  getOnsiteEnggs(assignee_list_temp: TemplateRef<any>) {
    let getOnsiteEngg = true;
    if ((this.data.status_id === '8400') || (this.data.status_id === '8500') || (this.data.status_id === '8750')) {
      getOnsiteEngg = true;
    } else {
      if (((this.scheduleDateTime === null) || (this.scheduleDateTime === ''))) {
        getOnsiteEngg = false;
        alert('Please select date and time');
      }
    }

    if (getOnsiteEngg) {
      let result: any;
      this.dataService.getOnsiteEnggs(this.data.site_type_id)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.onsiteEngg = result.users;
            }
          });
      this.openModal(assignee_list_temp);
    }
  }

  selectEngg(engg: { user_name: string; user_id: any; }, confirm_assign_engg_temp: TemplateRef<any>) {
    this.modalService.dismissAll();
    const msg = 'Are you sure want to assign this ticket to ' + engg.user_name;
    this.confirmAlert = { id: engg.user_id, title: 'Assign Ticket', msg: msg };
    this.openModal(confirm_assign_engg_temp);
  }

  confirmEnggAssign(userId: any, simple_alert_temp: any) {
    this.buttonSpin = true;
    let result: any = [];
    const visitDateTime = this.datePipe.transform(this.scheduleDateTime, 'yyyy-MM-dd HH:mm:ss');
    if ((this.data.status_id === '8400') || (this.data.status_id === '8500') || (this.data.status_id === '8750')) {
      this.dataService.assignTicket(this.ticketId, userId)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.buttonSpin = false;
              this.simpleAlert = { title: 'Assign Ticket', msg: result.message };
              this.assignReassign = 'Re-Assign';
              this.getdata(this.ticketId);
              this.openModal(simple_alert_temp);
            } else {
              this.modalService.dismissAll();
              this.buttonSpin = false;
              this.simpleAlert = { title: 'Assign Ticket', msg: result.message };
              this.getdata(this.ticketId);
              this.openModal(simple_alert_temp);
            }
          });
    } else {
      this.dataService.assign_call(this.ticketId, userId, visitDateTime)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.buttonSpin = false;
              this.simpleAlert = { title: 'Assign Ticket', msg: result.message };
              this.assignReassign = 'Re-Assign';
              this.getdata(this.ticketId);
              this.openModal(simple_alert_temp);
            } else {
              this.modalService.dismissAll();
              this.buttonSpin = false;
              this.simpleAlert = { title: 'Assign Ticket', msg: result.message };
              this.getdata(this.ticketId);
              this.openModal(simple_alert_temp);
            }
          });
    }
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
      this.showSVCForm = 'true';
      this.gsxNo = '';
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

  qcDecline(qc_decline: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(qc_decline);
  }

  sendDcallQcApproval() {
    let result;
    // if(this.repairType === 'SVNR' || this.dCallCloseReason !== '') {
    this.dataService.updateGSXStatusDcall(this.repairType, this.data.g_number, this.dCallCloseReason, this.dCallArrivalDate, this.dCallCompletionDate)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            alert('GSX status has been updated successfully');
            // this.sendQCCheck(temp);
          } else {
            alert(result.message);
          }
        }
      );
    /*  } else {
       this.sendQCCheck(temp);
     } */
  }

  sendQCCheck(simple_alert_temp: TemplateRef<any>) {
    if(this.data.device_away_status === 'AWAY'){
      alert('Device is marked as AWAY. Cannot proceed further.');
      return;
    }if((this.data.device_away_status === 'RETURNED') && (this.checkListData === '')){
      alert('Confirm the device return. Cannot proceed further.');
      return;
    }
    this.buttonSpin = true;
    let newParts: any = [];
    if (this.diagnosisHd.svc_remarks === this.diagnosisHd.technician_note || this.diagnosisHd.svc_remarks === '') {
      alert('Please update the SVC Remarks');
      this.buttonSpin = false;
    } else {
      if (this.repairType === 'WUMS') {
        this.getRepair(simple_alert_temp);
        setTimeout(() => {
          if (this.gsxRepairs.dt.length !== 0) {
            for (let i = 0; i < this.gsxRepairs.dt.length; i++) {
              let partAvail = false;
              for (let j = 0; j < this.selectedParts.length; j++) {
                if (this.selectedParts[j].number === this.gsxRepairs.dt[i].number) {
                  partAvail = true;
                  break;
                }
              }
              if (partAvail === false) {
                if ((this.gsxRepairs.dt[i].typeDescription === 'Module') || (this.gsxRepairs.dt[i].typeDescription === 'Replacement')) {
                  this.gsxRepairs.dt[i].isCheck = false;
                  this.rcAddedParts.push(this.gsxRepairs.dt[i]);
                }
              }
            }

            if (this.rcAddedParts.length != 0) {
              let kbbSno = '';
              let kgbSno = '';
              let component = '';
              let issue = '';
              let reproduce = '';
              this.rcAddedParts = this.removeDuplicates(this.rcAddedParts, 'number');
              for (let j = 0; j < this.rcAddedParts.length; j++) {
                if (this.rcAddedParts[j].kbbDeviceDetail) {
                  kbbSno = this.rcAddedParts[j].kbbDeviceDetail.identifiers.serial;
                }
                if (this.rcAddedParts[j].kgbDeviceDetail) {
                  kgbSno = this.rcAddedParts[j].kgbDeviceDetail.identifiers.serial;
                }

                if (this.rcAddedParts[j].componentIssue) {
                  component = this.rcAddedParts[j].componentIssue.componentCode;
                  issue = this.rcAddedParts[j].componentIssue.issueCode;
                  reproduce = this.rcAddedParts[j].componentIssue.reproducibility;
                }

                newParts.push({
                  number: this.rcAddedParts[j].number,
                  partUsed: this.rcAddedParts[j].partUsed,
                  description: this.rcAddedParts[j].description,
                  typeDescription: this.rcAddedParts[j].typeDescription,
                  fromConsignedStock: '0',
                  componentCode: component,
                  issueCode: issue,
                  reproducibility: reproduce,
                  readOnly: true,
                  pricingCheckBox: false,
                  pricingType: '',
                  kbbInputType: '',
                  kbb_serial_no: kbbSno,
                  kgb_serial_no: kgbSno,
                  kgb_part_no: this.rcAddedParts[j].number,
                  kgb_description: this.rcAddedParts[j].description,
                  rc_added_part: '1'
                });
              }
              let result: any;
              this.dataService.additionalPartsForSVC(this.ticketId, this.gsxNo, this.diagnosisHd.id, newParts)
                .subscribe({
                  next: (data: any) => {
                    result = data;
                    if (result.status === true) {
                      this.sendToRFPU()
                      this.buttonSpin = false;
                    } else {
                      alert(result.message);
                      this.buttonSpin = false;
                    }
                  }, // success path
                  error: (error: any) => this.error = error // error path
                });
            } else {
              this.sendToRFPU()
            }
          } else {
            alert('GSX data fetching failed. Please try again');
            this.buttonSpin = false;
          }
        }, 8000);
      } else {
        this.sendToRFPU()
      }
    }
  }

  removeDuplicates(arr: any, prop: any) {
    return arr.filter((obj: any, index: any, self: any) =>
      index === self.findIndex((o: any) => o[prop] === obj[prop])
    );
  }

  /*  sendQCCheck() {
     this.buttonSpin = true;
     let result: any;
     if (this.svcRemarks === this.diagnosisHd.technician_note) {
       alert('Please update the SVC Remarks');
       this.buttonSpin = false;
     } else {
       this.dataService.qcRequest(this.ticketId, this.diagnosisHd.id)
           .subscribe(
             (data) => {
               result = data;
               if (result.status === true) {
                 this.getdata(this.ticketId);
                 this.buttonSpin = false;
               } else {
                 alert(result.message);
                 this.buttonSpin = false;
               }
       });
     }
   } */

  /* checkGsxStatus() {
    let result;
    this.dataService.checkGSXStatus()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.gsxStatus = result.gsx_status;
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  } */

  sendDcallQC(temp: any) {
    this.modalService.open(temp);
  }

  dCallDateUpdate(dateUpdate_temp: any) {
    this.modalService.open(dateUpdate_temp);
  }

  /* approveDcall() {
    this.callQCProcess('Approved','',false,this.dCallArrivalDate, this.dCallCompletionDate)
  } */

  callQCProcess(status: string, kbbVerify_temp?: any, reviveRepair: any = false) {
    this.modalService.dismissAll();
    let result: any;
    let callQC = false;
    this.buttonSpin = true;
    this.qcStatus = status;
    if (status === 'Declined') {
      if (this.qcDeclineReview === '') {
        this.notfilled = true;
        callQC = false;
      } else {
        this.callQCApprove(status, reviveRepair);
      }
    } else {
      if (this.diagnosisHd.technician_note === this.diagnosisHd.svc_remarks || this.diagnosisHd.svc_remarks === '') {
        alert('Please update the SVC Remarks');
        this.buttonSpin = false;
        this.deliveryType = '';
        callQC = false;
      } else {
        callQC = true;
      }
    }

    if (callQC === true) {
      if (this.dCallCheck === true) {
        this.callQCApprove(status, reviveRepair);
      } else if ((this.repairType === 'SVNR') || (this.gsxStatus === '0')) {
        if (this.adhesiveParts === true && status === 'Approved') {
          this.issueAdhesive();
        } else {
          this.callQCApprove(status, reviveRepair);
        }
        //  this.callQCApprove(status);
      } else {
        if ((this.data.site_type_id === '1') && ((this.repairType === 'CIN') || (this.repairType === 'OSR') || (this.repairType === 'OSCR'))) {
          if (((this.selectedParts.length === 1) && ((this.selectedParts[0].number === '011-00211') || (this.selectedParts[0].number === '011-00224')))) {
            this.dataService.updateGSXStatus(this.repairType, this.data.g_number, 'RFPU')
              .subscribe(
                (data: any) => {
                  result = data;
                  if (result.status === true) {
                    alert("Moved to RFPU Successfully")
                    this.callQCApprove(this.qcStatus, reviveRepair);
                  } else {
                    if ((this.data.gsx_status_code === 'POPH') || (this.data.gsx_status_code === 'RFPU') || (this.data.gsx_status_code === 'SPCM') || (this.data.gsx_status_code === 'SCNC') || (this.data.gsx_status_code === 'SCOM') || (this.data.gsx_status_code === 'GX08')) {
                      this.callQCApprove(this.qcStatus, reviveRepair);
                    } else {
                      alert(result.message);
                    }
                  }
                });
          } else {
            this.verifyKBB(kbbVerify_temp);
          }
        } else {
          //SHIP TO UPDATION ((this.data.ticket_date < '2024-10-29') && (this.data.branch_code === 'SNB')) ||
          if (((this.data.ticket_date < '2024-11-06') && (this.data.branch_code === 'SNB')) || ((this.data.branch_code === 'STC') && (this.data.ticket_date < '2024-10-25'))) {
            this.callQCApprove(this.qcStatus, reviveRepair);
          } else { //Correct SHIP TO
            this.dataService.updateGSXStatus(this.repairType, this.data.g_number, 'RFPU')
              .subscribe(
                (data: any) => {
                  result = data;
                  if (result.status === true) {
                    alert("Moved to RFPU Successfully")
                    this.callQCApprove(this.qcStatus, reviveRepair);
                  } else {
                    if ((this.data.gsx_status_code === 'POPH') || (this.data.gsx_status_code === 'RFPU') || (this.data.gsx_status_code === 'SPCM') || (this.data.gsx_status_code === 'SCNC') || (this.data.gsx_status_code === 'SCOM') || (this.data.gsx_status_code === 'GX08')) {
                      this.callQCApprove(this.qcStatus, reviveRepair);
                    } else {
                      alert(result.message);
                    }
                  }
                });
          }
        }
      }
    }
  }


  reviveRepairOnsite() {
    let result;
    this.buttonSpin = true;
    let isReviveRepair = false;
    let r;
    for (let l = 0; l < this.selectedParts.length; l++) {
      if ((this.selectedParts[l].number === '011-00211') || (this.selectedParts[l].number === '011-00224')) {
        isReviveRepair = true;
        r = confirm('Are sure want to close the Revive Repair?. This will not reversible');
        if (r === true) {
          this.callQCProcess('Approved', null, true)
        }
        break;
      }
    }
    if (!isReviveRepair) {
      alert("It's not a Revive repair, so you can't close it.");
      this.buttonSpin = false;
    }
  }

  pudDeliverySelect(delivery_temp: any) {
    this.openModal(delivery_temp);
  }

  pudDeliverySelectAPP(delivery_temp: any) {
    this.openModal(delivery_temp);
  }

  preCallAppQC(kbb_temp: any, create_appoint_temp: any, address_temp: any) {
    this.modalService.dismissAll();
    if (this.deliveryType === 'CreateAppoint') {
      this.reservationPopup('reserve', create_appoint_temp);
    } else {
      this.dropAddressTemp = address_temp;
      this.callQCProcess('Approved', kbb_temp);
    }
  }

  preCallQC(kbbVerify_temp: any, address_temp: any) {
    this.modalService.dismissAll();
    this.dropAddressTemp = address_temp;
    this.callQCProcess('Approved', kbbVerify_temp)
  }

  callQCApprove(status: string, reviveRepair: any = false) {
    // this.modalService.dismissAll();
    let typeOfDelivery: any = '';
    if ((this.deliveryType === 'PendingDelivery') || ((this.data.dl_branch_code === 'DNB') || (this.data.dl_branch_code === 'DCS') || (this.data.dl_branch_code === 'DTC')) || ((this.data.dl_branch_code !== '') && (this.data.dl_branch_code !== undefined) && (this.data.dl_branch_code !== null))) {
      typeOfDelivery = 1;
    } else {
      typeOfDelivery = 0;
    }

    if (typeOfDelivery !== '') {
      if (typeOfDelivery === 1 && this.isPudTicket === false) {
        if ((this.data.dl_branch_code === '') || (this.data.dl_branch_code === null)) {
          /* setTimeout(() => {
            this.openAddressModal(this.dropAddressTemp, () => {
              this.createPudTicket(typeOfDelivery, reviveRepair, status);
          });
        }, 1000); */
        } else {
          this.approveQC(typeOfDelivery, reviveRepair, status);
        }
      } else {
        this.approveQC(typeOfDelivery, reviveRepair, status)
      }
    }
  }

  openAddressModal(address_temp: any, callback: () => void) {
    this.modalService.open(address_temp);
    this.dropAddressCallback = callback;
  }

  requestPUD(address_temp: any) {
    this.pudRequested = true;
    this.modalService.open(address_temp);
  }

  exceptionChange() {
    this.invoiceError = '';
  }

  createPudTicket() {
    let result: any;
    this.dataService.createPUD(this.customerInfo.first_name, this.customerInfo.last_name, this.data.customer_phone_no, this.data.customer_email_id, this.customerInfo.phone2,
      this.customerInfo.address1, this.customerInfo.address2, this.customerInfo.city, this.customerInfo.state, this.customerInfo.pin, this.data.customer_query, this.data.branch_code, this.data.product_issue_reported, this.ticketId, 'Ample-PUD', this.data.serial_no, this.dropAddress, 1)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.pudTicketId = result.pud_ticket_id;
            if (this.pudPart_no === 'Zone 1O') {
              this.getTicketDetail();
              this.loading = false;
              this.modalService.dismissAll();
            } else {
              this.generatePUDQuote();
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      })
  }

  quoteChange() {
    const quoteChargesObj = JSON.parse(this.pudQuoteCharges);
    this.pudAmount = quoteChargesObj.data[0];
    this.pudPart_no = quoteChargesObj.data[1];
    this.pudDescription = quoteChargesObj.data[2];
  }

  sendDeliveryQuote() {
    if ((this.isExceptionRequired && this.PUDexception !== '') || (!this.isExceptionRequired && this.pudQuoteCharges !== '') || (!this.isExceptionRequired && this.pudInvoiceID !== '')) {
      this.loading = true;
      if (!this.isPudTicket) {
        this.createPudTicket();
      } else {
        this.updateDropAddress();
      }
    }
    else {
      alert('Fill all mandatory fields');
    }
  }

  updateDropAddress() {
    this.dataService.updateDropAddress(this.pudTicketId, this.dropAddress, 1, this.PUDexception)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if (this.dropRequest === 1) {
            this.updatePUDinvoice();
          } else {
            this.generatePUDQuote();
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      })
  }

  updatePUDinvoice() {
    const rafNo = this.data.branch_code + this.ticketId;
    if (this.isExceptionRequired) {
      this.chnageTicketStatus();
    } else {
      this.dataService.pudInvoiceIdCheck(rafNo, this.pudInvoiceID, this.data.ticket_date)
        .subscribe({
          next: (data: any) => {
            if (data.status === true) {
              this.chnageTicketStatus();
            } else {
              this.invoiceError = data.message;
              this.loading = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        })
    }
  }

  chnageTicketStatus() {
    let finalData: any = [];
    let msg = 'Customer Requested Home Delivery -' + this.PUDexception;
    if (!this.isExceptionRequired) {
      msg = 'Customer Requested Home Delivery - Invoice ID' + '->' + this.pudInvoiceID;
    }
    let remarks = msg;
    let changedata = '&source_status=' + this.data.status_id + '&destination_status=' + '3520' + '&ticket_id=' + this.ticketId;
    this.dataService.statusUpdate(changedata, remarks, finalData)
      .subscribe({
        next: (data: any) => {
          const result: any = data;
          this.loading = false;
          this.modalService.dismissAll();
          this.getdata(this.ticketId);
        }, // success path
        error: (error: any) => this.error = error // error path
      })
  }

  generatePUDQuote() {
    let data = '&ticket_id=' + this.ticketId + '&part_no=' + this.pudPart_no + '&description=' + encodeURIComponent(this.pudDescription) + '&total_amount=' + this.pudAmount;
    this.dataService.generateQuote(data)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if (result.status === true) {
            let quote = result.quotation;
            if (quote.status === true) {
              this.pudQuotationId = quote.quote_id;
              this.sendPUDQuotePayment();
            }
          } else {
            alert('Quotaion Generation Failed! please try again');
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      })
  }

  sendPUDQuotePayment() {
    this.dataService.sendQuotePayment(this.ticketId, this.pudQuotationId)
      .subscribe({
        next:
          (data: any) => {
            if (data.status === true) {
              alert('Quote sent Successfully');
              this.getTicketDetail();
              this.loading = false;
              this.modalService.dismissAll();
            }
            else {
            }
          }, // success path
        error: error => error = error // error path
      });
  }

  approveQC(typeOfDelivery: any, reviveRepair: any, status: any) {
    let result: any;
    this.dataService.qcProcess(this.ticketId, this.diagnosisHd.id, status, this.qcDeclineReview, typeOfDelivery)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.getdata(this.ticketId);
            if (reviveRepair === true) {
              this.closeReviveRepair();
            }
            if ((status === 'Approved') && (this.netSuiteEnabled)) {
              this.inventoryAdjustmentOut();
            }
            if (status === 'Declined') {
              this.modalService.dismissAll();
            }
          } else {
            alert(result.message);
            // this.modalRef.hide();
          }
        });
  }

  updateProductName() {
    if (this.productName !== '') {
      this.buttonSpin = true;
      let result: any;
      this.dataService.updateProductName(this.ticketId, this.productName)
        .subscribe(
          (data: any) => {
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
          (data: any) => {
            result = data;
            this.buttonSpin = false;
            if (result.status === true) {
              this.getdata(this.ticketId);
            }
          });
    }
  }

  checkPhysicalLocation() {
    if (this.physicalLocation !== null) {
      this.buttonSpin = true;
      let result: any;
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
    }
  }

  deviceCondition() {
    if (this.typeofDamage !== 'Select the Damage') {
      this.buttonSpin = true;
      let result: any;
      this.dataService.conditionDevice(this.ticketId, this.typeofDamage)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.data.condition_of_device = this.typeofDamage;
              this.getdata(this.ticketId);
              this.buttonSpin = false;
            } else {
              this.buttonSpin = false;
              this.conditionError = result.message;
              setTimeout(() => {
                this.conditionError = '';
              }, 3000);
            }
          });
    }
  }
  /*
    issueToken() {
      let exp_type: any;
      if (this.exceptionType === 'NA') {
        exp_type = '';
      } else {
        exp_type = this.exceptionType;
      }
      const form = '&family=' + this.data.product_family + '&family_id=' + this.data.family_id + '&location_code=' +
        this.data.branch_code + '&branch_id=' + this.data.branch_id + '&customer_id=' + this.data.customer_id + '&token_type=' +
        '1' + '&category=' + this.data.product_category + '&ticket_id=' + this.ticketId + '&phone=' + this.data.customer_phone_no
        + '&email=' + this.data.customer_email_id + '&serial_no=' + this.data.serial_no + '&otp=' + '00' + '&t1_invoice_id=' + this.t1InvoiceNo +
        '&warranty_status=' + this.warrantyStatus + '&t1_exception_type=' + exp_type;
      this.buttonSpin = true;
      let result: any;
      let issueToken = false;
      if ((this.warrantyStatus === 'Out Of Warranty (No Coverage)')) {
        if (this.t1InvoiceNo !== '') {
          // this.tokenIssued = true;
          let result1: any;
          const rafNo = this.data.branch_code + this.ticketId;
          this.dataService.checkInvoiceId(rafNo, this.customerInvoiceId, this.data.ticket_date, this.diagnosisHd.quotation_id)
          // this.dataService.checkInvoiceId(rafNo, this.t1InvoiceNo, this.data.ticket_date)
            .subscribe(
              (data1: any) => {
                result1 = data1;
                if (result1.status === true) {
                  issueToken = true;
                } else {
                  issueToken = false;
                  alert(result1.message);
                  this.buttonSpin = false;
                }
              });
        } else {
          if (this.exceptionType === 'NA') {
            issueToken = false;
            alert('T1 Charge Invoice Id Required');
            this.buttonSpin = false;
          } else {
            issueToken = true;
          }
        }
      } else {
        issueToken = true;
      }
      setTimeout(() => {
        if (issueToken === true) {
          this.buttonSpin = false;
          this.dataService.issueToken(form)
            .subscribe(
              (data: any) => {
                result = data;
                if (result.status === true) {
                  alert(result.message);
                  this.tokenIssued = true;
                  this.showTokenIssued = false;
                  this.buttonSpin = false;
                  this.getdata(this.ticketId);
                } else {
                  alert(result.message);
                  this.buttonSpin = false;
                }
              });
        }
      }, 1000);
    } */

  reGenerateToken(regenerate_token_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(regenerate_token_temp);
  }

  reGenerateTokenSubmit() {
    let result: any;
    if ((this.reGenerateType !== '') && (this.reGenerateRemarks !== '')) {
      this.dataService.reGenerateToken(this.data.token_no, this.data.branch_code, this.reGenerateType, this.reGenerateRemarks)
        .subscribe(
          (data: any) => {
            result = data;
            this.modalService.dismissAll();
            if (result.status === true) {
              alert(result.message);
            } else {
              alert(result.message);
            }
          });
    } else {
      this.regenerateError = true;
    }
    this.buttonSpin = false;
  }

  cancelPriority() {
    this.modalService.dismissAll();
    this.reGenerateType = '';
    this.reGenerateRemarks = '';
    this.regenerateError = false;
  }

  closeTicketTemp(close_ticket: TemplateRef<any>) {
    this.openModal(close_ticket);
  }

  closeTicket(simple_alert: TemplateRef<any>) {
    let result: any;
    this.dataService.closeTicket(this.ticketId, this.closeTicketRemarks)
      .subscribe(
        (data: any) => {
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

  /*********** Status Change ***********/
  stateonChange(id: string, optidx: any, template: TemplateRef<any>, simple_alert_temp: TemplateRef<any>) {
    this.optionvalue = optidx;
    this.requiredInputs = [];
    this.optionalInputs = [];
    this.remarks = '';
    for (let j = 0; j < this.statusOptions.status.length; j++) {
      if (this.statusOptions.status[j].value === optidx) {
        this.changedata = '&source_status=' + this.data.status_id + '&destination_status=' + this.statusOptions.status[j].id + '&ticket_id=' + id;
        this.dataService.checkRules(this.changedata)
          .subscribe({
            next: (data: any) => {
              this.ruleStatus = data;
              if (this.ruleStatus.status === false) { // Rule Status is False
                if (this.ruleStatus.required_fields.length !== 0) {
                  for (let k = 0; k < this.ruleStatus.required_fields.length; k++) {
                    if (this.ruleStatus.mandatory[k] === 'Y') {
                      this.requiredInputs.push({
                        label: this.ruleStatus.required_fields[k],
                        input: ''
                      });
                    } else {
                      this.optionalInputs.push({
                        label: this.ruleStatus.required_fields[k],
                        input: ''
                      });
                    }
                  }
                  this.optionalFields = true;
                  this.requiredFields = true;
                  this.submitbtn = true;
                  this.openModal(template);
                } else {
                  this.simpleAlert = { title: 'Status Update', msg: this.ruleStatus.message };
                  this.getdata(this.ticketId);
                  this.openModal(simple_alert_temp);
                  this.requiredFields = false;
                  this.optionalFields = false;
                }
              } else { // Rule Status is True
                this.openModal(template);
                this.requiredFields = false;
                this.optionalFields = false;
                this.submitbtn = true;
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }
    }
  }

  submit(requiredInput: any, optionalInput: any) {
    let isFilled: any = true;
    if (this.requiredFields === false) {
      if (this.remarks !== '') {
        this.callUpdate(requiredInput);
      } else {
        this.notfilled = true;
      }
    } else {
      for (let i = 0; i < this.requiredInputs.length; i++) {
        if (requiredInput[i].input === '') {
          isFilled = false;
        }
      }
      if (isFilled === true && this.remarks !== '') {
        requiredInput = Array.from(new Set(requiredInput.concat(optionalInput)));
        this.callUpdate(requiredInput);
      } else {
        this.notfilled = true;
      }
    }
  }

  pendingChange(pending_status_temp: TemplateRef<any>) {
    this.openModal(pending_status_temp);
  }

  pendingConfimation() {
    if (this.pendingRemarks === '') {
      this.notfilled = true;
    } else {
      this.dataService.updatePendingStatus(this.ticketId, this.data.pending_type, this.pendingRemarks)
        .subscribe({
          next: (data: any) => {
            const result: any = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.getdata(this.ticketId);
            } else {
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  callUpdate(filledinput: any[]) {
    let finalData: any[] = [];
    for (let i = 0; i < filledinput.length; i++) {
      if (filledinput[i].label === 'G Number') {
        filledinput.push({
          label: 'N Number',
          input: '0',
        });
        finalData = filledinput as any[];
        break;
      } else if (filledinput[i].label === 'N Number') {
        finalData.push({
          label: 'G Number',
          input: '0',
        },
          {
            label: 'Case Id',
            input: '0',
          },
          {
            label: 'N Number',
            input: filledinput[i].input,
          }
        );
        break;
      }
    }
    this.dataService.statusUpdate(this.changedata, this.remarks, finalData)
      .subscribe({
        next: (data: any) => {
          const result: any = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
            this.modalService.dismissAll();
            this.remarks = '';
            this.requiredInputs = [];
            if (this.data.quotation_new_flag === 'Y') {
              this.isCreateQuote = 'false';
            } else {
              this.isCreateQuote = 'null';
            }
          } else if (result.status === 'truefalse') {
            this.getdata(this.ticketId);
            this.modalService.dismissAll();
            this.remarks = '';
            this.requiredInputs = [];
            if (this.data.quotation_new_flag === 'Y') {
              this.isCreateQuote = 'false';
            } else {
              this.isCreateQuote = 'null';
            }
            alert(result.message);
          } else {
            this.ruleStatus = data;
            this.submitbtn = false;
            this.getdata(this.ticketId);
            this.remarks = '';
            this.requiredInputs = [];
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  cancel() {
    this.modalService.dismissAll();
    this.acceptSpinner = false;
    this.requiredInputs = [];
    this.optionalInputs = [];
    this.notfilled = false;
    const tempstate = this.dataTemp.status_name;
    this.data.status = tempstate;
    this.data.statusclr = this.dataTemp.statusclr;
  }

  updateCustomer() {

  }

  /* ******************* Diagnosis ******************* */

  getDiagDetails() {
    let result;
    this.buttonSpin = true;
    this.dataService.getGSXDiagnosis(this.data.serial_no)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            if (result.response.diagnostics) {
              this.gsxDiagnosisDetails = result.response.diagnostics;
              this.gsxDiagnosisView = true;
              this.buttonSpin = false;
              const eventTime = this.gsxDiagnosisDetails[0].context.diagnosticEndTimeStamp;
              this.airpodsDiagStatus = this.gsxDiagnosisDetails[0].context.diagnosticEventEndResult;
              this.astLastDiagStatus = this.gsxDiagnosisDetails[0].context.diagnosticEventEndResult;
              const currentTime: any = this.datePipe.transform(new Date(), 'yyyy/MM/dd HH:mm');
              const eventDateTime: any = this.datePipe.transform(eventTime, 'yyyy/MM/dd HH:mm');
              const startTime = new Date(eventDateTime);
              const endTime = new Date(currentTime);
              const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
              const resultInMinutes = Math.round(difference / 60000);

              if ((this.data.product_family === 'iPhone') && (this.repairType === 'CIN')) {
                if ((resultInMinutes <= 30 ) && (this.astLastDiagStatus != "CANCEL")) {
                  this.astDiagEligible = true;
                } else {
                  this.astDiagEligible = false;
                }
              } else {
                this.astDiagEligible = true;
              }

              /* ************ iPhone 12/13 MRI Validation & iPad MRI Status check *************  */
              const currentDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
              for (let i = 0; i < this.gsxDiagnosisDetails.length; i++) {
                const eventDateTime = this.gsxDiagnosisDetails[i].context.diagnosticEndTimeStamp;
                const eventDate = this.datePipe.transform(eventDateTime, 'yyyy/MM/dd');
                if (currentDate === eventDate) {
                  if (this.gsxDiagnosisDetails[i].context.suite === 'Mobile Resource Inspector') {
                    this.iPhone1213ForceMailIn = false;
                    this.iPadHighConfigDiagStatus = 'SUCCESS';
                    // this.iPadHighConfigDiagStatus = this.gsxDiagnosisDetails[i].context.diagnosticEventEndResult;
                  }
                }
              }

            } else {
              this.gsxDiagnosisDetails = result.response;
              this.gsxDiagnosisView = true;
            }
            this.airpodsDiagAvailable = true;
            this.buttonSpin = false;
          } else {
            alert(result.message);
            this.buttonSpin = false;
            this.airpodsDiagAvailable = false;
          }
        });
  }

  eventTestResult(eventId: any, diag_test_result_temp: TemplateRef<any>) {
    for (let i = 0; i < this.gsxDiagnosisDetails.length; i++) {
      if (this.gsxDiagnosisDetails[i].context.diagnosticEventNumber === eventId) {
        if (this.gsxDiagnosisDetails[i].testResults) {
          this.eventTestResults = this.gsxDiagnosisDetails[i].testResults;
          this.openModal(diag_test_result_temp);
        }
      }
    }
  }

  checkDisplayCRBR(result: any) { // Check Display Part repair
    let partlist: any = [];
    if (result.status === true) {
      partlist = result.part_number;
      for (let i = 0; i < partlist.length; i++) {
        if (partlist[i].part_no.repair_type) {
          if (partlist[i].part_no.repair_type.includes('display')) {
            this.exKBBDisplayPartNo = partlist[i].part_no.part_no;
          }
        }
        if (this.data.status_id === '300') {
          if (partlist[i].part_no.repair_type.includes('crbr')) {
            this.crbrMandate = true;
          }
        }
      }
    } else {
      this.exKBBDisplayPartNo = '';
    }
  }

  deviceAway(device_away: TemplateRef<any>) {
    let result;
    this.dataService.deviceAwayOTP(this.data.customer_phone_no, this.data.customer_email_id, this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.openModal(device_away);
          } else {
            alert(result.message);
          }
        });
  }

  deviceAwayOtpVerify() {
    if (this.deviceAwayOTP === '') {
      this.otpError = 'Enter the Valid OTP';
    } else {
      let result;
      this.dataService.markDeviceAway(this.ticketId, this.deviceAwayOTP, this.data.customer_phone_no)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.deviceAwayOTP = '';
              this.modalService.dismissAll();
              this.getdata(this.ticketId);
            } else {
              this.otpError = result.message;
            }
          });
    }
  }

  returnConfirm(device_away_checklist: TemplateRef<any>) {
    this.openModal(device_away_checklist);
  }

  checklistSubmit() {
    let result;
    this.dataService.deviceReturnForm(this.checkList, this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.getdata(this.ticketId);
          } else {
            this.otpError = result.message;
          }
        });
  }

  diagnosisEdit() {
    const diagHdData: any = this.diagnosisHd.technician_note;
    let diagnotes: any;
    diagnotes = diagHdData.split('Issue:- ').join('').split('Steps to Reproduce:- ').join('^').split('Diagnosis Performed:- ').join('^').split('Cosmetic Condition:- ').join('^').split('Resolution:- ').join('^');
    const diagnot = diagnotes.split('^');
    this.diagIssue = diagnot[0];
    this.diagReproduce = diagnot[1];
    this.diagPerformed = diagnot[2];
    this.diagCondition = diagnot[3];
    this.diagResolution = diagnot[4];
  }

  repairClassSelect(value: any) {
    this.repairClassification = value;
  }

  appleReviewCheck(event: any, hold_review_temp: TemplateRef<any>) {
    if (this.requestAppleReview === true) {
      this.openModal(hold_review_temp);
    } else {
      this.holdReview = '';
    }
  }

  saveHoldReview() {
    if (this.holdReview === '') {
      this.notfilled = true;
    } else {
      this.notfilled = false;
      this.modalService.dismissAll();
    }
  }

  cancelHoldReview() {
    this.modalService.dismissAll();
    this.requestAppleReview = false;
    this.holdReview = '';
  }

  gsxRepair() {
    this.isGsxRepair = true;
    this.isNtfRepair = false;
    this.onRepair = true;
  }

  ntfRepair() {
    this.isNtfRepair = false;
    this.isGsxRepair = false;
    this.onRepair = true;
  }





  componentsSelect(event: { value: any; label: string }, comp: string) {
    if (comp === 'comp') {
      this.componentCode = event.value;
      this.componentDescription = event.label;
      this.issues = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode) > -1);
      this.flagIssue = false;
      // console.log('Primary Component Selected:', event.label, 'Stored in:', this.componentDescription);


    } else if (comp === 'comp1') {
      this.componentCode1 = event.value;
      this.componentDescription1 = event.label;
      this.issues1 = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode1) > -1);
      this.flagIssue1 = false;

    } else if (comp === 'comp2') {
      this.componentCode2 = event.value;
      this.componentDescription2 = event.label;
      this.issues2 = _.filter(this.issuesTemp, row => row.comptia.indexOf(this.componentCode2) > -1);
      this.flagIssue2 = false;
    }
  }
get showDeleteButton2() {
  return this.addmorecomponentFlag1 && !this.diagnosisHold && this.repairType != 'SVNR';
}

get showDeleteButton3() {
  return this.addmorecomponentFlag2 && !this.diagnosisHold && this.repairType != 'SVNR';
}
 removeComponent(index: number) {
  if (index === 1) {
    if (this.addmorecomponentFlag2) {
      alert('Please delete Component 3 before deleting Component 2.');
      return;
    }
    this.componentCode1 = null;
    this.componentDescription1 = '';
    this.issueCode1 = null;
    this.issueDescription1 = '';
    this.issues1 = [];
    this.addmorecomponentFlag1 = false;
    this.addmorecomponentBtn = true;

    // Clear corresponding payload fields
    this.diagnosisHd.customer_component_code = '';
    this.diagnosisHd.customer_component_description_string = '';
    this.diagnosisHd.customer_issue_code = '';
    this.diagnosisHd.customer_issue_description_string = '';
  }

  if (index === 2) {
    this.componentCode2 = null;
    this.componentDescription2 = '';
    this.issueCode2 = null;
    this.issueDescription2 = '';
    this.issues2 = [];
    this.addmorecomponentFlag2 = false;
    this.addmorecomponentBtn = true;

    // Clear corresponding payload fields
    this.diagnosisHd.customer_component_code1 = '';
    this.diagnosisHd.customer_component_description_string1 = '';
    this.diagnosisHd.customer_issue_code1 = '';
    this.diagnosisHd.customer_issue_description_string1 = '';

  }
}



  issueSelect(event: { value: any, label: string }, issue: any) {
    if (issue === 'issu') {
      this.issueCode = event.value;
      this.issueDescription = event.label;
    } else if (issue === 'issu1') {
      this.issueCode1 = event.value;
      this.issueDescription1 = event.label;
    } else {
      this.issueCode2 = event.value;
      this.issueDescription2 = event.label;
    }
    // console.log(this.issueCode.issu.code);
    // console.log(this.issueCode.issu.description);
  }

  repairSelect(event: any) {
    // console.log(this.repairType);
    if ((this.repairType !== 'CIN') || (this.repairType !== 'OSR') || (this.repairType !== 'OSCR')) {
      this.kbbDisplayDiagSerial = '';
    }
    if (this.components.length === 0) {
      let result: any;
      let gsxResponse: any = [];
      let issuesList: any = [];
      this.dataService.getComponentRetry(this.data.serial_no)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              gsxResponse = result.gsx_response.componentIssues;
              this.gsxComponentIssues = gsxResponse;
              for (let i = 0; i < gsxResponse.length; i++) {
                this.components.push({
                  label: gsxResponse[i].componentDescription,
                  value: gsxResponse[i].componentCode
                });
                if (gsxResponse[i].issues) {
                  issuesList = gsxResponse[i].issues;
                  for (let j = 0; j < issuesList.length; j++) {
                    this.issuesTemp.push({
                      label: issuesList[j].code + '-' + issuesList[j].description,
                      value: issuesList[j].code,
                      comptia: gsxResponse[i].componentCode
                    });

                    this.componentIssueList.push({
                      label: gsxResponse[i].componentDescription + '/' + issuesList[j].code + '-' + issuesList[j].description,
                      value: issuesList[j].code,
                      comptia: gsxResponse[i].componentCode
                    });
                  }
                }
              }
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
    this.diagnosisHd.repair_type = event;
    if (this.diagnosisHd.repair_type === 'WUMS') {
      this.selectedParts = [];
      this.isMailIn = true;
      this.mailInSymtomsOptions.push({
        id: this.symptomId,
        isadded: false,
      });
      this.coverageOptions = [
        { label: 'VMI Green', value: 'VMI_GREEN' },
        { label: 'VMI Yellow', value: 'VMI_YELLOW' },
        { label: 'VMI Red', value: 'VMI_RED' },
        { label: 'Applecare Plus', value: 'APPLECARE_PLUS' },
        { label: 'Billable Display Repair', value: 'DISPLAY' },
        { label: 'Billable Battery Repair', value: 'BATTERY' },
      ];
    } else {
      this.isMailIn = false;
      this.mailInSymtomsOptions = [];
      this.symptoms = [];
      this.selectedParts = [];
      this.coverageOptions = [
        {
          label: 'No Damage or VMI Green',
          description: 'The product has no damage or the condition is listed in the green section of the VMI.', value: 'VMI_GREEN'
        },
        {
          label: 'VMI Yellow - Service',
          description: 'The results of the VMI screening indicate that the device is eligible for out-of-warranty service.',
          value: 'VMI_YELLOW'
        },
        {
          label: 'VMI Red - Full Price',
          description: 'The results of the VMI screening indicate the device is ineligible for service.', value: 'VMI_RED'
        },
        {
          label: 'AppleCare Covered',
          description: 'The product has AppleCare+ incidents available, and damage is not eligible for warranty service.',
          value: 'APPLECARE_PLUS'
        },
      ];
    }
  }

  coverageOnChange(event: { value: any; description: any; } | null, partno: any) {
    if (event !== null) {
      if (this.diagnosisHd.repair_type === 'WUMS') {
        this.diagnosisHd.coverage_option = event.value;
      } else if ((this.diagnosisHd.repair_type === 'CIN') || (this.diagnosisHd.repair_type === 'OSR') || (this.diagnosisHd.repair_type === 'OSCR')) {
        for (let j = 0; j < this.selectedParts.length; j++) {
          if (this.selectedParts[j].number === partno) {
            this.selectedParts[j].coverageOption = event.value;
            this.selectedParts[j].coverageMessage = event.description;
            if ((this.selectedParts[j].coverageOption === 'VMI_GREEN') || (this.selectedParts[j].coverageOption === 'VMI_YELLOW')) {
              this.selectedParts[j].showPriceOnly = true;
            } else {
              this.selectedParts[j].showPriceOnly = false;
            }
          }
        }
      }
    }
  }

  rcCoverageUpdate() {
    this.rcCoverageChange = (this.rcCOEnable === true) ? true : false;
  }

  saveRCCoverage() {
    let result: any;
    this.dataService.updateCoverageOption(this.ticketId, this.diagnosisHd.id, this.diagnosisHd.coverage_option)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.acsPartList = result.items;
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  otherPriceCheck(part: { number: any; }, priceOption: any) {
    for (let j = 0; j < this.selectedParts.length; j++) {
      if (this.selectedParts[j].number === part.number) {
        this.selectedParts[j].pricingCheckBox = true;
        this.selectedParts[j].pricingType = priceOption;
      }
    }
  }

  selectPartPricing(sPart: any, partPricing_temp: TemplateRef<any>) {
    this.selectedPricingPart = sPart;
    this.openModal(partPricing_temp);
  }

  cancelOtherPricing() {
    for (let i = 0; i < this.selectedParts.length; i++) {
      if (this.selectedParts[i].number === this.selectedPricingPart.number) {
        this.selectedParts[i].pricingType = '';
        this.selectedParts[i].pricingCheckBox = false;
      }
    }
    this.modalService.dismissAll();
  }

  snvrSelect(event: { value: string; }) {
    this.snvrType = event.value;
  }

  getComponents() {
    let result: any;
    let gsxResponse: any = [];
    let issuesList: any = [];
    this.dataService.getComponent(this.data.serial_no)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            gsxResponse = result.gsx_response.componentIssues;
            this.gsxComponentIssues = gsxResponse;
            for (let i = 0; i < gsxResponse.length; i++) {
              this.components.push({
                label: gsxResponse[i].componentDescription,
                value: gsxResponse[i].componentCode
              });
              if (gsxResponse[i].issues) {
                issuesList = gsxResponse[i].issues;
                for (let j = 0; j < issuesList.length; j++) {
                  this.issuesTemp.push({
                    label: issuesList[j].code + '-' + issuesList[j].description,
                    value: issuesList[j].code,
                    comptia: gsxResponse[i].componentCode
                  });

                  this.componentIssueList.push({
                    label: gsxResponse[i].componentDescription + '/' + issuesList[j].code + '-' + issuesList[j].description,
                    value: issuesList[j].code,
                    comptia: gsxResponse[i].componentCode
                  });
                }
              }
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getComponentRetry() {
    let result: any;
    let gsxResponse: any = [];
    let issuesList: any = [];
    this.buttonSpin = true;
    this.dataService.getComponentRetry(this.data.serial_no)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            // window.location.reload();
            this.buttonSpin = false;
            this.getdata(this.ticketId);
            gsxResponse = result.gsx_response.componentIssues;
            this.gsxComponentIssues = gsxResponse;
            for (let i = 0; i < gsxResponse.length; i++) {
              this.components.push({
                label: gsxResponse[i].componentDescription,
                value: gsxResponse[i].componentCode
              });
              if (gsxResponse[i].issues) {
                issuesList = gsxResponse[i].issues;
                for (let j = 0; j < issuesList.length; j++) {
                  this.issuesTemp.push({
                    label: issuesList[j].code + '-' + issuesList[j].description,
                    value: issuesList[j].code,
                    comptia: gsxResponse[i].componentCode
                  });

                  this.componentIssueList.push({
                    label: gsxResponse[i].componentDescription + '/' + issuesList[j].code + '-' + issuesList[j].description,
                    value: issuesList[j].code,
                    comptia: gsxResponse[i].componentCode
                  });
                }
              }
            }
            this.getParts('refresh');
          }
          else{
            alert(result.message);
            this.buttonSpin = false;

          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }
  getParts(type: any) {
    if (type === 'exist') {
      let result: any;
      this.dataService.getParts(this.data.serial_no)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.gsxPartsTemp = result.gsx_response;
              this.popLoading = false;
              this.parts = this.gsxPartsTemp;
              for (let i = 0; i < this.parts.length; i++) {
                this.parts[i].isCheck = false;
                this.parts[i].fromConsignedStock = false;
                if (this.parts[i].substitutePartNumber) {
                  this.parts[i].isSubstitute = true;
                } else {
                  this.parts[i].isSubstitute = false;
                }
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
    } else {
      let result: any;
      this.dataService.getPartsRetry(this.data.serial_no)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.gsxPartsTemp = result.gsx_response;
              this.popLoading = false;
              this.parts = this.gsxPartsTemp;
              for (let i = 0; i < this.parts.length; i++) {
                this.parts[i].isCheck = false;
                this.parts[i].fromConsignedStock = false;
                if (this.parts[i].substitutePartNumber) {
                  this.parts[i].isSubstitute = true;
                } else {
                  this.parts[i].isSubstitute = false;
                }
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
  }

  getACSParts() {
    let result: any;
    this.dataService.getACSParts()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.acsPartList = result.items;
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  acsPartSelect(event: { part_no: any; }) {
    this.acsPart = event.part_no;
  }

  /* getInsurenceParts() {
    let result: any;
    this.dataService.getInsuranceParts()
    .subscribe(
      (data) => {
           result = data;
           if (result.status === true) {
             this.insurancePartList = result.items;
            } else {
              alert(result.message);
            }
      }, // success path
      error => this.error = error // error path
    );
  } */

  getProduct(type: any) {
    let result: any;
    this.notfilled = false;
    this.csCode = this.csCode.replace(/\s/g, '');
    this.data.serial_no = this.data.serial_no.toUpperCase();
    this.dataService.getProduct(this.data.serial_no, this.ticketId)
      .subscribe({
        next:
          (data: any) => {
            result = data;
            if (result.status === true) {
              if (type === 'csCode') {
                const csCodeArray = result.gsx_response.device.warrantyInfo.csCodeDetails;
                for (let i = 0; i < csCodeArray.length; i++) {
                  if (csCodeArray[i].csCode === this.csCode) {
                    this.csCodeAvail = true;
                    this.csDetails = { laborCovered: csCodeArray[i].laborCovered, partsCovered: csCodeArray[i].partsCovered, travelCovered: csCodeArray[i].travelCovered }
                    break;
                  }
                }
                if (!this.csCodeAvail) {
                  this.notfilled = true;
                  this.clicked = false;
                }
              } else {
                this.getdata(this.ticketId);
                this.serialNoEdit = true;
              }
            } else {
              this.clicked = false;
              let errorMessage;
              const gsxResponse = result.gsx_response;
              if (result.gsx_response) {
                if (gsxResponse.errors) {
                  errorMessage = result.gsx_response.errors[0].message;
                }
              } else {
                errorMessage = result.message;
              }
              this.buttonSpin = false;
              alert(errorMessage);
            }
          },// success path
        error: (error: any) => this.error = error // error path
      })
  }

  addLoaner(loaner_list_temp: TemplateRef<any>, simple_alert_temp: TemplateRef<any>) {
    this.isLoaner = true;
    this.addPartLoaner = 'Add Loaner';
    this.popLoading = true;
    this.openModal(loaner_list_temp);
    if (this.gsxPartsTemp.length !== 0) {
      this.parts = this.gsxPartsTemp.filter((item: { typeDescription: string; }) => item.typeDescription === 'Loaner');
      this.popLoading = false;
    } else {
      this.popLoading = true;
      this.getParts('exist');
      setTimeout(() => {
        this.parts = this.gsxPartsTemp.filter((item: { typeDescription: string; }) => item.typeDescription === 'Loaner');
        this.popLoading = false;
      }, 2000);
    }
  }

  removeLoanerPart(partno: any, confirmPart_alert_temp: TemplateRef<any>) {
    this.confirmAlert = { id: partno, title: 'Remove Loaner', msg: 'Are you sure want to Remove this Loaner?' };
    this.openModal(confirmPart_alert_temp);
  }

  selectLoanerPart(part: { number: string; description: string; }) {
    this.loanerPartNumber = part.number;
    this.loanerDescription = part.description;
  }

  addConsumableCharge() {
    this.diagnosisHd.consumable_charge = '250.00';
    this.consumableCharges = true;
  }

  removeConsumableCharge() {
    this.diagnosisHd.consumable_charge = '0.00';
    this.consumableCharges = false;
  }

  //Adhesives Block Start
  getTicketAdhesives(result: any) {
    if (result.status === true) {
      this.adhesivePartsList = [];
      for (let i = 0; i < result.items.length; i++) {
        this.adhesivePartsList.push({
          type: result.items[i].stock_type,
          asn: result.items[i].asn_no,
          part_no: result.items[i].part_no,
          status: result.items[i].status
        });
      }
      this.adhesiveParts = true;
    } else {
      this.adhesiveParts = false;
      this.adhesivePartsList = [];
    }
  }

  addAdhesive(adhesive_temp: TemplateRef<any>) {
    this.getAdhesives();
    this.openModal(adhesive_temp);
  }

  getAdhesives() {
    this.adhesive8SE = false;
    this.adhesive17e = false;
    this.isEligibleAdhesive = false;
    let result;
    this.dataService.getAdhesiveList()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.adhesivesTemp = result.items;
            if ((this.data.product_description === 'iPhone 8') || (this.data.product_description === 'iPhone SE (2nd generation)') || (this.data.product_description === 'iPhone SE (3rd generation)')) {
              this.adhesive8SE = true;
            } else {
              this.adhesive8SE = false;
            }
            if((this.data.product_description === 'iPhone 17e') || (this.data.product_description === 'iPhone 16e') ){
              this.adhesive17e = true;
            } else {
              this.adhesive17e = false;
            }
            this.isEligibleAdhesive = true;
            if (this.data.warranty_status === "Out Of Warranty (No Coverage)") {
              this.enableStockTypeChange = false;
              let qpIssue = false;
              if (this.data.status_id === '300') {
                for (let j = 0; j < this.selectedParts.length; j++) {
                  if (this.selectedParts[j].issueCode === 'IP398') {
                    qpIssue = true;
                    this.isEligibleAdhesive = true;
                  }
                }
              }
              if (!qpIssue) {
                if ((this.data.product_description === 'iPhone 14') || (this.data.product_description === 'iPhone 14 Plus') || this.data.product_description.includes('iPhone 15')) {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  this.enableStockTypeChange = true;
                } else if((this.data.product_description === 'iPhone 17e') || (this.data.product_description === 'iPhone 16e')) {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  this.enableStockTypeChange = true;
                }
                else {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  if (this.adhesivesList.length === 0) {
                    this.adhesiveType = 'AP';
                    this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                    this.enableStockTypeChange = true;
                  } else {
                    this.enableStockTypeChange = false;
                  }
                }

                /* this.enableStockTypeChange = false;
                this.adhesiveType = 'AM';
                this.isEligibleAdhesive = true;
                if ((this.data.product_description === 'iPhone 8') || (this.data.product_description === 'iPhone SE (2nd generation)') || (this.data.product_description === 'iPhone SE (3rd generation)')) {
                  this.adhesive8SE = true;
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && ((x.product_model.toLowerCase() === 'iphone 8') || (x.product_model.toLowerCase() === 'iphone se (2nd generation)') || (x.product_model.toLowerCase() === 'iphone se (3rd generation)')) && x.status === 'A');
                  if (this.adhesivesList.length === 0) {
                    this.enableStockTypeChange = true;
                  }
                } else if (this.data.product_description === 'iPhone 6s' || this.data.product_description === 'iPhone 6s Plus' || this.data.product_description === 'iPhone 7' || this.data.product_description === 'iPhone 7 Plus' || this.data.product_description === 'iPhone X' || this.data.product_description === 'iPhone 8 Plus' || this.data.product_description === 'iPhone X' || this.data.product_description === 'iPhone XR' || this.data.product_description === 'iPhone Xs' || this.data.product_description === 'iPhone XS' || this.data.product_description === 'iPhone Xs Max' || this.data.product_description === 'iPhone XS Max' || this.data.product_description === 'iPhone 11' || this.data.product_description === 'iPhone 11 Pro' || this.data.product_description === 'iPhone 11 Pro Max' || this.data.product_description === 'iPhone 12' || this.data.product_description === 'iPhone 12 Pro' || this.data.product_description === 'iPhone 12 Pro Max' || this.data.product_description === 'iPhone 12 mini' || this.data.product_description.includes('iPhone 13')) {
                  this.enableStockTypeChange = false;
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  if (this.adhesivesList.length === 0) {
                    this.enableStockTypeChange = true;
                    this.adhesiveType = 'AP';
                    this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  }
                } else if ((this.data.product_description === 'iPhone 14') || (this.data.product_description === 'iPhone 14 Plus') || this.data.product_description.includes('iPhone 15')) {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  this.enableStockTypeChange = true;
                }
                else {
                  this.adhesive8SE = false;
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                } */

              } else { //OOW QP
                if ((this.data.product_description === 'iPhone 14') || (this.data.product_description === 'iPhone 14 Plus') || this.data.product_description.includes('iPhone 15')) {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  this.enableStockTypeChange = true;
                } else if((this.data.product_description === 'iPhone 17e') || (this.data.product_description === 'iPhone 16e')) {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  this.enableStockTypeChange = true;
                }
                else {
                  this.adhesiveType = 'AP';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  if (this.adhesivesList.length === 0) {
                    this.enableStockTypeChange = true;
                    this.adhesiveType = 'AM';
                    this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  } else {
                    this.enableStockTypeChange = false;
                  }
                }
                /* this.isEligibleAdhesive = true;
                if ((this.data.product_description === 'iPhone 8') || (this.data.product_description === 'iPhone SE (2nd generation)') || (this.data.product_description === 'iPhone SE (3rd generation)')) {
                  this.adhesive8SE = true;
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && ((x.product_model.toLowerCase() === 'iphone 8') || (x.product_model.toLowerCase() === 'iphone se (2nd generation)') || (x.product_model.toLowerCase() === 'iphone se (3rd generation)')) && x.status === 'A');
                } else {
                  this.adhesive8SE = false;
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                }
                if ((this.data.product_description === 'iPhone 14') || (this.data.product_description === 'iPhone 14 Plus') || this.data.product_description.includes('iPhone 15')) {
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  this.enableStockTypeChange = true;
                } else {
                  this.adhesiveType = 'AP';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  if (this.adhesivesList.length === 0) {
                    this.enableStockTypeChange = true;
                  } else {
                    this.enableStockTypeChange = false;
                  }
                } */
              }
            } else { //inwarranty
              if ((this.data.product_description === 'iPhone 14') || (this.data.product_description === 'iPhone 14 Plus') || this.data.product_description.includes('iPhone 15')) {
                this.adhesiveType = 'AM';
                this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                this.enableStockTypeChange = true;
              } else if((this.data.product_description === 'iPhone 17e') || (this.data.product_description === 'iPhone 16e')) {
                this.adhesiveType = 'AM';
                this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                this.enableStockTypeChange = true;
              }
              else {
                this.adhesiveType = 'AP';
                this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                if (this.adhesivesList.length === 0) {
                  this.enableStockTypeChange = true;
                  this.adhesiveType = 'AM';
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                } else {
                  this.enableStockTypeChange = false;
                }
              }
              /* this.isEligibleAdhesive = true;
              if ((this.data.product_description === 'iPhone 14') || (this.data.product_description === 'iPhone 14 Plus') || this.data.product_description.includes('iPhone 15')) {
                this.adhesiveType = 'AM';
                this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                this.enableStockTypeChange = true;
              } else if (this.data.product_description.includes('iPhone 13')) {
                this.enableStockTypeChange = false;
                this.adhesiveType = 'AP';
                this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                if (this.adhesivesList.length === 0) {
                  this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                  if (this.adhesivesList.length === 0) {
                    this.enableStockTypeChange = true;
                  } else {
                    this.enableStockTypeChange = false;
                  }
                }
              } else {
                this.adhesiveType = 'AP';
                this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
                if (this.adhesivesList.length === 0) {
                  this.enableStockTypeChange = true;
                } else {
                  this.enableStockTypeChange = false;
                }
              } */
            }
          }
        }, // success path
        error: (error: any) => error = error // error path
      });
  }

  filterAvailableAdhesives(adhesiveModel: any) {
    const availAdhesives: any[] = [];
    for (let i = 0; i < this.adhesivesList.length; i++) {
      if ((this.adhesivesList[i].product_model === adhesiveModel)) {
        availAdhesives.push(this.adhesivesList[i]);
      }
    }
    return availAdhesives;
  }

  stockTypeChange() {
    if (this.adhesiveType === 'AP') {
      this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
      if ((this.data.product_description === 'iPhone 8') || (this.data.product_description === 'iPhone SE (2nd generation)') || (this.data.product_description === 'iPhone SE (3rd generation)')) {
        this.adhesive8SE = true;
        this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && ((x.product_model.toLowerCase() === 'iphone 8') || (x.product_model.toLowerCase() === 'iphone se (2nd generation)') || (x.product_model.toLowerCase() === 'iphone se (3rd generation)')) && x.status === 'A');
      } else if((this.data.product_description === 'iPhone 17e') || (this.data.product_description === 'iPhone 16e')) {
        this.adhesive17e = true;
        this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && ((x.product_model.toLowerCase() === 'iphone 17e') || (x.product_model.toLowerCase() === 'iphone 16e')) && x.status === 'A');
      } else {
        this.adhesive8SE = false;
        this.adhesive17e = false;
        this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Apple' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
      }
    } else {
      this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
      if ((this.data.product_description === 'iPhone 8') || (this.data.product_description === 'iPhone SE (2nd generation)') || (this.data.product_description === 'iPhone SE (3rd generation)')) {
        this.adhesive8SE = true;
        this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && ((x.product_model.toLowerCase() === 'iphone 8') || (x.product_model.toLowerCase() === 'iphone se (2nd generation)') || (x.product_model.toLowerCase() === 'iphone se (3rd generation)')) && x.status === 'A');
      } else if((this.data.product_description === 'iPhone 17e') || (this.data.product_description === 'iPhone 16e')) {
        this.adhesive17e = true;
        this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && ((x.product_model.toLowerCase() === 'iphone 17e') || (x.product_model.toLowerCase() === 'iphone 16e')) && x.status === 'A');
      } else {
        this.adhesive8SE = false;
        this.adhesive17e = false;
        this.adhesivesList = this.adhesivesTemp.filter((x: any) => x.stock_type === 'Ample' && (x.product_model.toLowerCase() === this.data.product_description.toLowerCase()) && x.status === 'A');
      }
    }
  }

  blockAdhesiveASN() {
    this.adhesiveASNError = '';
    if (this.adhesiveType === '' || this.adhesiveASN === '') {
      this.adhesiveASNError = 'Selected Adhesive Type/ASN number is inavalid';
      return;
    }
    if (this.isEligibleAdhesive === true) {
      let r = confirm('Are you sure you want to Block this ASN?');
      if (r === true) {
        let result;
        this.dataService.blockAdhesive(this.ticketId, this.adhesiveASN).subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.dataService.getBlockedAdhesive(this.adhesiveASN).subscribe({
                next: (data: any) => {
                  let blockedResult = data;
                  if (blockedResult.status === true) {
                    blockedResult = blockedResult.items[0];
                    this.adhesiveParts = true;
                    this.adhesivePartsList.push({
                      type: blockedResult.stock_type,
                      asn: blockedResult.asn_no,
                      part_no: blockedResult.part_no,
                      status: blockedResult.status
                    });
                    this.adhesiveASN = '';
                    this.adhesiveType = '';
                    this.cancelAdhesive();
                  }
                }, // success path
                error: (error: any) => this.error = error // error path
              });
            } else {
              this.adhesiveASNError = result.message;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
      } else {
        this.adhesiveASN = '';
        this.adhesiveType = '';
      }
    } else {
      this.adhesiveASNError = 'Not Successfull! please try again later.'
    }
  }

  /* unblockAdhesivePart(unblockAdhesive_temp: TemplateRef<any>) {
    if(this.adhesivePartsList.length > 1) {
      this.openModal(unblockAdhesive_temp);
    } else {
      let asn = this.adhesivePartsList[0].asn;
      this.unblockAdhesiveASN(asn);
    }
  }

  unblockAdhesiveASN(asn: any) {
    let result;
    this.dataService.unBlockAdhesive(asn)
        .subscribe({
          next: (data: any) => {
              result = data;
            if (result.status === true) {
              let adhesivePartListTemp = this.adhesivePartsList.filter((x: any) => x.asn !== asn);
              this.adhesivePartsList = adhesivePartListTemp;
              if(this.adhesivePartsList === undefined || this.adhesivePartsList.length === 0) {
                this.modalService.dismissAll();
                this.adhesiveParts = false;
              } else {
                this.modalService.dismissAll();
              }
            } else {
              alert(result.message);
            }
          },
          error: (error: any) => error = error
    });
  }    ADHESIVE DELETE*/

  cancelAdhesive() {
    this.modalService.dismissAll();
  }

  addGsxPart(part_list_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.isLoaner = false;
    this.addPartLoaner = 'Add Part';
    this.popLoading = true;
    if (this.gsxPartsTemp.length !== 0) {
      this.parts = this.gsxPartsTemp.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
      this.openModal(part_list_temp);
      this.popLoading = false;
    } else {
      this.getParts('exist');
      this.parts = this.gsxPartsTemp.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
      this.openModal(part_list_temp);
      this.popLoading = false;
    }
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
        for (let i = 0; i < this.gsxPartsTemp.length; i++) {
          descList = _.filter(this.gsxPartsTemp, row => row.number.toLowerCase().indexOf(word) > -1);

          let eeecodes: any = [];
          eeecodes = this.gsxPartsTemp[i].eeeCodes;
          if (eeecodes !== undefined) {
            for (let j = 0; j < eeecodes.length; j++) {
              const eeecode = eeecodes[j].toLowerCase();
              if (eeecode === word) {
                eeepart = this.gsxPartsTemp[i];
                eeeList = Array.prototype.concat.apply([], [eeepart, eeeList]);
              }
            }
          }
        }
        this.parts = Array.prototype.concat.apply([], [descList, eeeList]);
        this.parts = this.parts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
      } else if (type === 'part') {
        this.eeeSearch = '';
        for (let i = 0; i < this.gsxPartsTemp.length; i++) {
          partList = _.filter(this.gsxPartsTemp, row => row.description.toLowerCase().indexOf(word) > -1);
        }
        this.parts = partList;
        this.parts = this.parts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Loaner');
      }
    } else {
      this.parts = this.gsxPartsTemp;
    }
  }

  addPartDetail(partno: any) {
    for (let j = 0; j < this.parts.length; j++) {
      if (this.parts[j].number === partno) {
        this.partDetail = this.parts[j];
        this.isPartDetail = true;
      }
    }
  }

  checkKbbInputType(partNo: any) {
    let result: any;
    this.dataService.checkKbbInputType(partNo, this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.kbbInputType = result.kbb_entry_type;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  selectPart(part: any) {
    let checkFlag = false;
    if (part.isCheck === true) {
      for (let j = 0; j < this.selectedParts.length; j++) {
        if (this.selectedParts[j].number === part.number) {
          checkFlag = true;
        }
      }
      if (checkFlag === false) {
        if ((part.typeDescription === 'Adjustment') && (part.number !== '011-00211') && (part.number !== '011-00224')) {
          const formData = '&part_no=' + part.number + '&stock_out=' + '1' + '&stock_in=' + '0' + '&part_type=' + part.typeDescription + '&ticket_id=' + this.ticketId + '&repair_id=' + '';
          let result: any;
          this.dataService.consumableStockInOut(formData)
            .subscribe({
              next: (data: any) => {
                result = data;
                if (result.status === false) {
                  alert(result.message);
                }
                this.selectedParts.push({
                  number: part.number,
                  partUsed: part.number,
                  description: part.description,
                  typeDescription: part.typeDescription,
                  fromConsignedStock: part.fromConsignedStock,
                  componentCode: '',
                  issueCode: '',
                  reproducibility: '',
                  readOnly: false,
                  pricingCheckBox: false,
                  pricingType: ''
                });
              }, // success path
              error: (error: any) => this.error = error // error path
            });
        } else {
          if (this.data.site_type_id === '1') {
            this.checkKbbInputType(part.number);
          }
          setTimeout(() => {
            if (part.substitutePartNumber) {
              this.selectedParts.push({
                number: part.number,
                partUsed: part.substitutePartNumber,
                description: part.description,
                typeDescription: part.typeDescription,
                fromConsignedStock: part.fromConsignedStock,
                componentCode: '',
                issueCode: '',
                reproducibility: '',
                readOnly: false,
                pricingCheckBox: false,
                pricingType: '',
                kbbInputType: this.kbbInputType,
                kbb_serial_no: '',
              });
            } else {
              this.selectedParts.push({
                number: part.number,
                partUsed: part.number,
                description: part.description,
                typeDescription: part.typeDescription,
                fromConsignedStock: part.fromConsignedStock,
                componentCode: '',
                issueCode: '',
                reproducibility: '',
                readOnly: false,
                pricingCheckBox: false,
                pricingType: '',
                kbbInputType: this.kbbInputType,
                kbb_serial_no: '',
              });
            }
          }, 2000);
        }
      }
    } else {
      for (let j = 0; j < this.selectedParts.length; j++) {
        if (this.selectedParts[j].number === part.number) {
          if ((part.typeDescription === 'Adjustment') && (part.number !== '011-00211') && (part.number !== '011-00224')) {
            const formData = '&part_no=' + part.number + '&stock_out=' + '0' + '&stock_in=' + '1' + '&part_type=' + part.typeDescription + '&ticket_id=' + this.ticketId + '&repair_id=' + '';
            let result: any;
            this.dataService.consumableStockInOut(formData)
              .subscribe({
                next: (data: any) => {
                  result = data;
                  if (result.status === false) {
                    alert(result.message);
                  }
                }, // success path
                error: (error: any) => this.error = error // error path
              });
          }
          this.selectedParts.splice(j, 1);
        }
      }
    }
  }

  partsAdd() {
    for (let i = 0; i < this.selectedParts.length; i++) {

    }
  }

  removeGsxPart(partno: any, confirmPart_alert_temp: TemplateRef<any>) {
    this.confirmAlert = { id: partno, title: 'Remove Part', msg: 'Are you sure want to Remove this Part?' };
    this.openModal(confirmPart_alert_temp);
  }

  confirmPart(partno: string) {
    for (let j = 0; j < this.selectedParts.length; j++) {
      if (this.selectedParts[j].number === partno) {
        if ((this.selectedParts[j].typeDescription === 'Adjustment') && (this.selectedParts[j].number !== '011-00211') && (this.selectedParts[j].number !== '011-00224')) {
          const formData = '&part_no=' + this.selectedParts[j].number + '&stock_out=' + '0' + '&stock_in=' + '1' + '&part_type=' + this.selectedParts[j].typeDescription + '&ticket_id=' + this.ticketId + '&repair_id=' + '';
          let result: any;
          this.dataService.consumableStockInOut(formData)
            .subscribe({
              next: (data: any) => {
                result = data;
                if (result.status === false) {
                  alert(result.message);
                }
              }, // success path
              error: (error: any) => this.error = error // error path
            });
        }

        if (this.data.status_id !== '300') {
          let result1: any;
          this.dataService.deleteAdditionalPart(this.ticketId, this.diagnosisHd.id, partno)
            .subscribe({
              next: (data: any) => {
                result1 = data;
                if (result1.status === true) {
                  this.selectedParts[j].isCheck = false;
                  this.selectedParts.splice(j, 1);
                  this.getdata(this.ticketId);
                } else {
                  alert(result1.message);
                }
              }, // success path
              error: (error: any) => this.error = error // error path
            });
        } else {
          this.selectedParts[j].isCheck = false;
          this.selectedParts.splice(j, 1);
        }
      }
    }

    if (partno === this.loanerPartNumber) {
      this.loanerPartNumber = '';
      this.loanerDescription = '';
      this.loanerSno = '';
    }

    for (let k = 0; k < this.parts.length; k++) {
      if (this.parts[k].number === partno) {
        this.parts[k].isCheck = false;
        break;
      }
    }
    if ((this.selectedParts.length !== 0)) {
      this.consignmentView = true;
    } else {
      this.consignmentView = false;
    }
    this.modalService.dismissAll();
  }

  symptomOnChange(event: { value: any; } | null, partno: any) {
    if (event !== null) {
      for (let j = 0; j < this.selectedParts.length; j++) {
        if (this.selectedParts[j].number === partno) {
          this.selectedParts[j].reproducibility = event.value;
        }
      }
    }
  }

  selectPartIssue(event: { comptia: any; value: any; } | null, partno: any) {
    if (event !== null) {
      for (let j = 0; j < this.selectedParts.length; j++) {
        if (partno === this.selectedParts[j].number) {
          this.selectedParts[j].componentCode = event.comptia;
          this.selectedParts[j].issueCode = event.value;
        }
      }
    }
  }

  back() {
    this.isPartDetail = false;
  }

  gsxPartDetails(partno: null, part_detail_temp: TemplateRef<any>) {
    if (partno !== null) {
      for (let j = 0; j < this.parts.length; j++) {
        if (this.parts[j].number === partno) {
          this.partDetail = this.parts[j];
          this.openModal(part_detail_temp);
        }
      }
    }
  }

  consignmentCheck(part: any, consignment_temp: TemplateRef<any>, simple_alert: TemplateRef<any>) {
    this.consignmentPartNumber = part.number;
    if (part.fromConsignedStock === true) {
      if(this.consignmentType == 'AP'){
      this.consignment = 'Apple';
      this.getASNList(this.consignmentPartNumber,this.consignment);
      this.openModal(consignment_temp);
    }else{
      this.consignment = 'Ample'
      this.getASNList(this.consignmentPartNumber,this.consignment);
      this.openModal(consignment_temp);
    }
  } else {
      let r;
      r = confirm('Are sure want to remove Consignment?');
      if (r === true) {
        for (let i = 0; i < this.selectedParts.length; i++) {
          if (this.selectedParts[i].number === this.consignmentPartNumber) {

            this.selectedParts[i].fromConsignedStock = false;
            this.selectedParts[i].consignmentType = '';
            this.selectedParts[i].consignment_asn_no = '';
            this.updatePartConsignment('0', '', '0', this.consignmentPartNumber, simple_alert)

          }
        }

        if (this.data.status_id === '800') {
          this.updatePartConsignment('0', '', '0', this.consignmentPartNumber, simple_alert)
        }

      } else {
        for (let i = 0; i < this.selectedParts.length; i++) {
          if (this.selectedParts[i].number === this.consignmentPartNumber) {
            this.selectedParts[i].fromConsignedStock = true;
          }
        }
      }
    }
  }
  onConsignmentTypeChange() {
    this.consignmentASN = '';
    this.asnList = [];
    if (!this.consignmentType) {
      return;
    }
    this.consignment = this.consignmentType === 'AP' ? 'Apple' : 'Ample';
    this.getASNList(this.consignmentPartNumber, this.consignment);
  }

  getASNList(partNumber: string, consignmentType: string) {
    this.dataService.getASNList(partNumber, consignmentType).subscribe({
      next: (res: any) => {

        if (res.status) {
          this.asnList = res.results;
          // console.log(this.asnList);
        } else {
          this.asnList = [];
        }
      },
      error: (err) => {
        this.asnList = [];
      }
    });
  }


  popUpload(pop_upload_temp: TemplateRef<any>) {
    this.openModal(pop_upload_temp);
  }

  deviceImagesUpload(images_upload: TemplateRef<any>) {
    this.openModal(images_upload);
  }

  popClose() {
    this.modalService.dismissAll();
  }

  blockASN(consignmentASN: any, simple_alert: TemplateRef<any>) {
    let result;
    let consignPartAvail = false;
    for (let j = 0; j < this.diagnosisDt.length; j++) {
      if (this.diagnosisDt[j].part_number === this.consignmentPartNumber) {
        consignPartAvail = true;
      }
    }
    if (!consignPartAvail) {
      alert('The selected part and Consignment part are mismatch');
      return;
    }
    if ((this.consignmentType !== '') && (consignmentASN !== '') && (consignmentASN !== undefined)) {
      this.dataService.consignmentBlock(this.ticketId, this.consignmentASN)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              for (let i = 0; i < this.selectedParts.length; i++) {
                if (this.selectedParts[i].number === this.consignmentPartNumber) {
                  this.selectedParts[i].fromConsignedStock = true;
                  this.selectedParts[i].consignmentType = this.consignmentType;
                  this.selectedParts[i].consignmentASN = consignmentASN;
                  this.selectedParts[i].kgb_serial_no = result.asn.serial_no;
                  this.selectedParts[i].kgb_description = result.asn.description;
                  this.selectedParts[i].kgb_part_no = result.asn.part_no;
                }
              }

              if (this.data.status_id !== '300') {
                for (let j = 0; j < this.diagnosisDt.length; j++) {
                  if (this.diagnosisDt[j].part_number === this.consignmentPartNumber) {
                    this.modalService.dismissAll();
                    this.updatePartConsignment(consignmentASN, this.consignmentType, '1', this.consignmentPartNumber, simple_alert)
                  }
                }
              }
              this.modalService.dismissAll();
            } else {
              this.consignmentASNError = result.message;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      this.consignmentASNError = 'Fill all mandatory fields';
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
    this.consignmentASN = '';
    this.consignmentASNError = '';
  }

  updatePartConsignment(asnNo: any, type: any, flag: any, partNo: any, simple_alert: TemplateRef<any>) {
    let result: any;
    this.dataService.updatePartConsignment(this.ticketId, asnNo, type, flag, partNo)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            alert('Consignment updated successfully');
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }


  changeRepairStage(option: string, confirmRepairStage_temp: TemplateRef<any>, l1_decline_temp: TemplateRef<any>) {
    if (((this.repairStage === 'In-Diagnosis') || (this.repairStage === 'L2-Hold')) && (this.userRole === '3')) {
      this.openModal(confirmRepairStage_temp);
    } else if ((this.data.status_id === '800') && (this.repairType === 'CIN') && (this.diagnosisHd.additional_part === '1') && (this.data.site_type_id === '1')) {
      // console.log(this.data.status_id)
      {
        if (this.repairStage === 'L2-Approved') {
          this.openModal(confirmRepairStage_temp);
        } else {
          alert('Cannot change to ' + option + ' Stage');
        }
      }
    } else if ((this.data.status_id === '800') && (this.diagnosisHd.additional_part === '0') && (this.data.site_type_id === '1')) {
      // console.log(this.data.status_id)

      if ((this.repairStage === 'In-Diagnosis')) {
        this.openModal(l1_decline_temp);
      } else {
        alert('Cannot change to ' + option + ' Stage');
      }

    } else {
      if (this.repairStage === 'In-Diagnosis') {
        this.openModal(l1_decline_temp);
      } else {
        alert('Cannot change to ' + option + ' Stage');
        this.getdata(this.ticketId);
      }
    }
  }

  confirmRepairStage() {
    this.modalService.dismissAll();
    let result;
    this.dataService.repairStagesUpdate(this.ticketId, this.repairStage, this.diagnosisHd.id)
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

  notConfirmStage() {
    this.repairStage = this.diagnosisHd.repair_stage;
    this.modalService.dismissAll();
  }

  preSavePartsDiagnosis(simple_alert: TemplateRef<any>, gsx_questions: TemplateRef<any>) {
    this.buttonSpin = true;
    const distinctParts = new Set<string>();
    let hasDuplicates = false;
    for (const part of this.selectedParts) {
      if (distinctParts.has(part.number)) {
        hasDuplicates = true;
        break;
      } else {
        distinctParts.add(part.number);
      }
    }
    if (hasDuplicates) {
      alert("Duplicates have been found in the selected parts. Please remove them before proceeding with the saving process.");
      this.buttonSpin = false;
    } else {
      this.savePartsDiagnosis(simple_alert, gsx_questions);
    }
  }

  /*
    savePartsDiagnosis(simple_alert: TemplateRef<any>, gsx_questions: TemplateRef<any>) {
      let result: any;
      let questionDetails: any = [];
      let questionsTemp: any = [];
      this.answeredQuestions = [];
      this.qansweredQuestions = [];
      this.requiredQuestions = [];
      this.sendFromL1Approval = true;
      this.saveDiagnosis(simple_alert);
      this.buttonSpin = true;
      setTimeout(() => {
        this.dataService.checkRepairQuestion(this.ticketId, this.diagnosisHd.id)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                  questionDetails = result.gsx_response.questionDetails;
                  if (questionDetails.length > 0) {
                    for (let j = 0; j < questionDetails.length; j++) {
                      this.qtemplateId = questionDetails[j].templateId;
                      this.qtreeId = questionDetails[j].trees[0].treeId;
                      this.questionTemp = questionDetails[j].trees;
                      for (let k = 0; k < this.questionTemp.length; k++) {
                        // if (this.questionTemp[k].questions[0].optional === false) {
                        this.qrequiredQuestions.push(this.questionTemp[k].questions[0]);
                        // }
                      }
                    }
                  }
                  setTimeout(() => {
                    if (this.qrequiredQuestions.length > 0) {
                      this.qshowingQuestion = this.qrequiredQuestions[0];
                      this.qquestionNo = 1;
                      this.qansweredQuestions.push({
                        templateId: this.qtemplateId,
                        trees: [{ treeId: this.qtreeId, questions: [] }]
                      });
                      this.qanswerKey = this.qansweredQuestions;
                      this.openModal(gsx_questions);
                      this.buttonSpin = false;
                    }
                    else {
                      if ((this.repairType === 'CIN')) {
                        for (let i = 0; i < this.selectedParts.length; i++) {
                          if (this.selectedParts[i].coverageOption === 'APPLECARE_PLUS') {
                            this.getACSParts();
                            this.showACSType = true;
                          } else {
                            this.showACSType = false;
                          }
                        }
                      } else if (this.repairType === 'WUMS') {
                        if (this.coverageOption === 'APPLECARE_PLUS') {
                          this.getACSParts();
                          this.showACSType = true;
                        } else {
                          this.showACSType = false;
                        }
                      }
                      this.sendFromL1Approval = false;
                      this.saveDiagnosis(simple_alert);
                    }
                  }, 1000);
              } else {
                if (this.repairType === 'CIN') {
                  for (let i = 0; i < this.selectedParts.length; i++) {
                    if (this.selectedParts[i].coverageOption === 'APPLECARE_PLUS') {
                      this.showACSType = true;
                      this.getACSParts();
                    } else {
                      this.showACSType = false;
                    }
                  }
                } else if (this.repairType === 'WUMS') {
                  if (this.coverageOption === 'APPLECARE_PLUS') {
                    this.showACSType = true;
                    this.getACSParts();
                  } else {
                    this.showACSType = false;
                  }
                }
                let gsxError: any = [];
                let gsxErrorMsg: any;
                if (result.gsx_response) {
                  gsxError = result.gsx_response;
                  if (gsxError.errors) {
                    gsxErrorMsg = gsxError.errors[0].message;
                  } else {
                    gsxErrorMsg = result.message;
                  }
                } else {
                  gsxErrorMsg = result.message;
                }
                if (gsxErrorMsg === 'Invalid action') {
                  gsxErrorMsg = result.message;
                }
                this.simpleAlert = { title: 'Save Part', msg: gsxErrorMsg };
                this.openModal(simple_alert);
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }, 3000);
    }
   */
  savePartsDiagnosis(simple_alert: TemplateRef<any>, gsx_questions: TemplateRef<any>) {
    this.buttonSpin = true;
    let result: any;
    let questionDetails: any[] = [];
    this.answeredQuestions = [];
    this.qansweredQuestions = [];
    this.requiredQuestions = [];
    this.thirdlevelQuestions = [];
    this.fourthlevelQuestions = [];
    this.parentOfFourthLevel = '';
    this.parentOfThirdLevel = '';
    this.showNextBtn = true;
    this.qsubmitDoc = false;
    this.sendFromL1Approval = true;
    this.saveDiagnosis(simple_alert);
    setTimeout(() => {
      this.dataService.checkRepairQuestion(this.ticketId, this.diagnosisHd.id)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              questionDetails = result.gsx_response.questionDetails;
              this.answers = [];
              if (questionDetails.length > 0) {
                this.answeredQuestions = questionDetails
                  .filter((templateData) => {
                    return templateData.trees.some((treeData: any) => treeData.questions.length > 0);
                  })
                  .map((templateData) => {
                    const templateId = templateData.templateId;
                    const trees = templateData.trees
                      .map((treeData: any) => {
                        const questions = treeData.questions
                          .filter((question: any) => (!question.optional && question.answerType !== 'INT'))
                          .map((question: any) => {
                            return {
                              questionId: question.questionId,
                            };
                          });

                        return {
                          treeId: treeData.treeId,
                          questions: questions,
                        };
                      })
                      .filter((treeData: any) => treeData.questions.length > 0); // Filter out trees with no questions

                    return {
                      templateId: templateId,
                      trees: trees,
                    };
                  })
                  .filter((templateData) => {
                    return templateData.trees.some((treeData: any) => treeData.questions.length > 0);
                  });


                for (let i = 0; i < questionDetails.length; i++) {
                  const templateId = questionDetails[i].templateId;
                  const trees = questionDetails[i].trees;
                  const templateObject: { templateId: any; trees: { treeId: any; questions: any; }[] } = {
                    templateId: templateId,
                    trees: []
                  };

                  for (let j = 0; j < trees.length; j++) {
                    const treeId = trees[j].treeId;
                    const questions = trees[j].questions.filter((question: any) => (!question.optional && question.answerType !== 'INT'));
                    if (questions.length > 0) {
                      let treeObject = { treeId: treeId, questions: questions };
                      templateObject.trees.push(treeObject);

                      for (let k = 0; k < questions.length; k++) {
                        const question = questions[k];
                        if (question.optional === false) {
                          this.requiredQuestions.push(question);
                        }
                      }
                    }
                  }

                  if (templateObject.trees.length > 0) {
                    this.qansweredQuestions.push(templateObject);
                  }
                }

                if (this.requiredQuestions.length > 0) {
                  this.qshowNextBtn = true;
                  if (this.qansweredQuestions.length > 0) {
                    for (const template of this.qansweredQuestions) {
                      for (const tree of template.trees) {
                        if (tree.questions.length > 0) {
                          this.treeId = tree.treeId;
                          break;
                        }
                      }
                      if (this.treeId) {
                        break;
                      }
                    }
                  }

                  this.qshowingQuestion = this.requiredQuestions[0];
                  // this.qshowingQuestion = this.qshowingQuestion[0];
                  this.qquestionNo = 1;
                  this.openModal(gsx_questions);
                  this.buttonSpin = false;
                  this.eligibleQuestions = true;
                } else {
                  this.answeredQuestions = [];
                  this.qansweredQuestions = [];
                  this.buttonSpin = false;
                  this.eligibleQuestions = false;
                }
                this.questionaireStructure = this.answeredQuestions;
              } else {
                if ((this.repairType === 'CIN')) {
                  for (let i = 0; i < this.selectedParts.length; i++) {
                    if (this.selectedParts[i].coverageOption === 'APPLECARE_PLUS') {
                      this.getACSParts();
                      this.showACSType = true;
                    } else {
                      this.showACSType = false;
                    }
                  }
                } else if (this.repairType === 'WUMS') {
                  if (this.coverageOption === 'APPLECARE_PLUS') {
                    this.getACSParts();
                    this.showACSType = true;
                  } else {
                    this.showACSType = false;
                  }
                }
                this.sendFromL1Approval = false;
                this.saveDiagnosis(simple_alert);
              }
            } else {
              if (this.repairType === 'CIN') {
                for (let i = 0; i < this.selectedParts.length; i++) {
                  if (this.selectedParts[i].coverageOption === 'APPLECARE_PLUS') {
                    this.showACSType = true;
                    this.getACSParts();
                  } else {
                    this.showACSType = false;
                  }
                }
              } else if (this.repairType === 'WUMS') {
                if (this.coverageOption === 'APPLECARE_PLUS') {
                  this.showACSType = true;
                  this.getACSParts();
                } else {
                  this.showACSType = false;
                }
              }
              let gsxError: any = [];
              let gsxErrorMsg: any;
              if (result.gsx_response) {
                gsxError = result.gsx_response;
                if (gsxError.errors) {
                  // gsxErrorMsg = gsxError.errors[0].message;
                  gsxErrorMsg = result.message;
                } else {
                  gsxErrorMsg = result.message;
                }
              } else {
                gsxErrorMsg = result.message;
              }
              if (gsxErrorMsg === 'Invalid action') {
                gsxErrorMsg = result.message;
              }
              this.simpleAlert = { title: 'Save Part', msg: gsxErrorMsg };
              this.openModal(simple_alert);
              this.buttonSpin = false;
            }
          },
          error: (error: any) => {
            this.error = error;
            this.buttonSpin = false;
          }
        });
    }, 3000);
  }

  saveAdditionalParts(simple_alert: TemplateRef<any>, gsx_questions: TemplateRef<any>) {
    this.buttonSpin = true;
    let result: any;
    this.requiredQuestions = [];
    this.dataService.checkRepairQuestion(this.ticketId, this.diagnosisHd.id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.templateId = result.gsx_response.questionDetails[0].templateId;
            this.treeId = result.gsx_response.questionDetails[0].trees[0].treeId;
            this.requiredQuestions = result.gsx_response.questionDetails[0].trees[0].questions;
            this.showingQuestion = this.requiredQuestions[0];
            this.questionNo = 0;
            if (this.requiredQuestions.length > this.questionNo) {
              this.showNextBtn = true;
            }
            this.openModal(gsx_questions);
          } else {
            this.saveAdditionalGSXParts();
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  preSaveAdditionalGSXParts() {
    this.buttonSpin = true;
    const distinctParts = new Set<string>();
    let hasDuplicates = false;
    for (const part of this.selectedParts) {
      if (distinctParts.has(part.number)) {
        hasDuplicates = true;
        break;
      } else {
        distinctParts.add(part.number);
      }
    }
    if (hasDuplicates) {
      alert("Duplicates have been found in the selected parts. Please remove them before proceeding with the saving process.");
      this.buttonSpin = false;
    } else {
      this.saveAdditionalGSXParts();
      this.buttonSpin = false;
    }
  }

  saveAdditionalGSXParts() {
    const newPartsTemp: any = [];
    let newParts: any = [];
    let partAvail = false;
    for (let i = 0; i < this.selectedParts.length; i++) {
      partAvail = false;
      if (this.selectedParts[i].readOnly === false) {
        for (let j = 0; j < this.diagnosisDt.length; j++) {
          if (this.selectedParts[i].number === this.diagnosisDt[j].part_number) {
            partAvail = true;
          }
        }
        if (partAvail === false) {
          newPartsTemp.push(this.selectedParts[i]);
        }
      }
    }

    newParts = Array.from(new Set(newPartsTemp));

    for (let j = 0; j < newParts.length; j++) {
      this.diagPartsFilled = true;
      newParts[j].additional_part === '1';
      if (((newParts[j].kbb_serial_no != '') || (newParts[j].kbb_serial_no != undefined))) {
        const serialNoCheck = this.checkingSerialNumber(newParts[j].kbb_serial_no);
        if (serialNoCheck) {
          this.diagPartsFilled = false;
        } else if (this.exKBBDisplayPartNo === newParts[j].number) {
          if (newParts[j].kbb_serial_no === 'ASTNOTAVAILABLE') {
            this.diagPartsFilled = true;
          } else {
            if ((newParts[j].kbb_serial_no.length >= 10)) {
              this.diagPartsFilled = true;
            } else {
              this.diagPartsFilled = false;
            }
          }
        } else if ((newParts[j].kbb_serial_no != 'NONSERIALIZED')) {
          if ((newParts[j].kbb_serial_no.length >= 10)) {
            this.diagPartsFilled = true;
          } else {
            this.diagPartsFilled = false;
          }
        } else {
          this.diagPartsFilled = true;
        }
      } else {
        this.diagPartsFilled = false;
      }

      if (!this.diagPartsFilled) {
        for (let i = 0; i < this.selectedParts.length; i++) {
          if (this.selectedParts[i].number === newParts[j].number) {
            this.selectedParts[i].kbb_serial_no = '';
          }
        }
      }
    }

    if (this.diagPartsFilled) {
      this.buttonSpin = true;
      let result: any;
      this.dataService.addAdditionalPart(this.ticketId, this.gsxNo, this.diagnosisHd.id, newParts)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.getdata(this.ticketId);
              this.buttonSpin = false;
            } else {
              alert(result.message);
              this.buttonSpin = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      alert(`Please check and fill all the part's fields`);
      this.buttonSpin = false;
    }
  }

  submitQA(simple_alert: TemplateRef<any>) {
    this.buttonSpin = false;
    this.sendFromL1Approval = false;
    this.saveDiagnosis(simple_alert);
    this.modalService.dismissAll();
  }

  saveForDraft(simple_alert: TemplateRef<any>) {
    let result;
    let gsxError: any = [];
    this.dataService.repairCreateDraft(this.ticketId, this.diagnosisHd.id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonSpin = false;
          } else {
            let gsxErrorMsg: any;
            if (result.gsx_response) {
              gsxError = result.gsx_response;
              if (gsxError.errors) {
                gsxErrorMsg = gsxError.errors[0].message;
              } else if (gsxError.outcome) {
                let gsxErrorReasons: any = [];
                if (gsxError.outcome.action === 'STOP') {
                  gsxErrorReasons = gsxError.outcome.reasons;
                  for (let i = 0; i < gsxErrorReasons.length; i++) {
                    if (gsxErrorReasons[i].type === 'STOP') {
                      gsxErrorMsg = gsxErrorReasons[i].messages[0];
                    } else if (gsxErrorReasons[i].type === 'REPAIR_TYPE') {
                      if (gsxErrorReasons[i].messages) {
                        gsxErrorMsg = gsxErrorReasons[i].messages[0];
                      } else {
                        gsxErrorMsg = gsxErrorReasons[i].repairOptions;
                      }
                    }
                  }
                }
              } else {
                gsxErrorMsg = result.message;
              }
            } else {
              gsxErrorMsg = result.message;
            }
            this.simpleAlert = { title: 'Save for Later', msg: gsxErrorMsg };
            this.openModal(simple_alert);
            this.buttonSpin = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  checkingSerialNumber(srNo: string) {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(srNo);
  }
  removeSpecialCharacters(input: any) {
    return input.replace(/[^a-zA-Z0-9]/g, '');
  }

  restoreParts() {
    const fParts: any = [];
    let parts: any = [];
    if (this.selectedParts.length !== 0) {
      if ((this.repairType === 'CIN') || (this.repairType === 'OSR') || (this.repairType === 'OSCR')) {
        parts = this.selectedParts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Adjustment');
        for (let j = 0; j < parts.length; j++) {
          this.diagPartsFilled = true;
          parts[j].kbb_serial_no = this.removeSpecialCharacters(parts[j].kbb_serial_no);
          if (((parts[j].kbb_serial_no != '') && (parts[j].kbb_serial_no != undefined))) {
            const serialNoCheck = this.checkingSerialNumber(parts[j].kbb_serial_no);
            if (serialNoCheck) {
              this.diagPartsFilled = false;
            } else if (this.exKBBDisplayPartNo === parts[j].number) {
              if (parts[j].kbb_serial_no === 'ASTNOTAVAILABLE') {
                this.diagPartsFilled = true;
              } else {
                if ((parts[j].kbb_serial_no.length >= 10)) {
                  this.diagPartsFilled = true;
                } else {
                  this.diagPartsFilled = false;
                }
              }
            } else if ((parts[j].kbb_serial_no != 'NONSERIALIZED')) {
              if ((parts[j].kbb_serial_no.length >= 10)) {
                this.diagPartsFilled = true;
              } else {
                this.diagPartsFilled = false;
              }
            } else {
              this.diagPartsFilled = true;
            }
          } else {
            this.diagPartsFilled = false;
          }

          if (!this.diagPartsFilled) {
            for (let i = 0; i < this.selectedParts.length; i++) {
              if (this.selectedParts[i].number === parts[j].number) {
                this.selectedParts[i].kbb_serial_no = '';
              }
            }
          }

          let fromConsignment = 0;
          if (parts[j].fromConsignedStock === true) {
            fromConsignment = 1;
          } else {
            fromConsignment = 0;
          }

          if (this.exKBBDisplayPartNo === parts[j].number) {
            this.kbbDisplayDiagSerial = parts[j].kbb_serial_no;
            this.diagnosisHd.kbb_display_sr_no = parts[j].kbb_serial_no;
          }

          fParts.push({
            gsx_repair_hd_id: this.diagnosisHd.id,
            // number: this.selectedParts[j].number,
            part_number: parts[j].number,
            part_used: parts[j].partUsed,
            description: parts[j].description,
            part_type: parts[j].typeDescription,
            from_consigned_stock: fromConsignment,
            coverage_option: parts[j].coverageOption,
            component_code: parts[j].componentCode,
            issue_code: parts[j].issueCode,
            reproducibility: parts[j].reproducibility,
            pricing_option: parts[j].pricingType,
            ticket_id: this.ticketId,
            consignment_type: parts[j].consignmentType,
            consignment_asn_no: parts[j].consignmentASN,
            kbb_serial_no: parts[j].kbb_serial_no,
            kgb_serial_no: parts[j].kgb_serial_no,
            kgb_description: parts[j].kgb_description,
            kgb_part_no: parts[j].kgb_part_no,
            kbb_entry_type: parts[j].kbbInputType
          });
          if (parts[j].reproducibility !== '') {
            this.reproducibility = parts[j].reproducibility;
          }
        }
        let adjustmentpartsTemp: any = [];
        adjustmentpartsTemp = this.selectedParts.filter((item: { typeDescription: string; }) => item.typeDescription === 'Adjustment'); // Billing Parts
        for (let l = 0; l < adjustmentpartsTemp.length; l++) {
          fParts.push({
            part_number: adjustmentpartsTemp[l].number,
            description: adjustmentpartsTemp[l].description,
            part_type: adjustmentpartsTemp[l].typeDescription,
            billable: '1'
          });
        }
        this.finalParts = fParts;
      } else if (this.repairType === 'WUMS') {
        parts = this.selectedParts.filter((item: { typeDescription: string; }) => (item.typeDescription !== 'Billing')); // Non billing Parts
        for (let k = 0; k < parts.length; k++) {
          let fromConsignment = 0;
          if (parts[k].fromConsignedStock === true) {
            fromConsignment = 1;
          } else {
            fromConsignment = 0;
          }

          this.diagPartsFilled = true;
          if ((parts[k].kbb_serial_no != '')) {
            parts[k].kbb_serial_no = this.removeSpecialCharacters(parts[k].kbb_serial_no);
            const serialNoCheck = this.checkingSerialNumber(parts[k].kbb_serial_no);
            if (serialNoCheck) {
              this.diagPartsFilled = false;
            } else if ((parts[k].kbb_serial_no != 'NONSERIALIZED')) {
              if ((parts[k].kbb_serial_no.length >= 10)) {
                this.diagPartsFilled = true;
              } else {
                this.diagPartsFilled = false;
              }
            } else {
              this.diagPartsFilled = true;
            }
          } else {
            this.diagPartsFilled = false;
          }

          if (!this.diagPartsFilled) {
            for (let i = 0; i < this.selectedParts.length; i++) {
              if (this.selectedParts[i].number === parts[k].number) {
                this.selectedParts[i].kbb_serial_no = '';
              }
            }
          }

          if (this.diagnosisHd.coverage_option === 'DISPLAY') {
            parts[k].pricingType = 'DSPLY';
          } else if (this.diagnosisHd.coverage_option === 'BATTERY') {
            parts[k].pricingType = 'BAT';
          } else if (this.diagnosisHd.coverage_option === 'NOCHG') {
            parts[k].pricingType = 'NOCHG';
          }

          fParts.push({
            part_number: parts[k].number,
            part_used: parts[k].partUsed,
            description: parts[k].description,
            part_type: parts[k].typeDescription,
            from_consigned_stock: fromConsignment,
            component_code: parts[k].componentCode,
            issue_code: parts[k].issueCode,
            reproducibility: parts[k].reproducibility,
            pricing_option: parts[k].pricingType,
            consignment_type: parts[k].consignmentType,
            consignment_asn_no: parts[k].consignmentASN,
            kbb_serial_no: parts[k].kbb_serial_no,
            kgb_serial_no: parts[k].kgb_serial_no,
            kgb_description: parts[k].kgb_description,
            kgb_part_no: parts[k].kgb_part_no,
          });
          if (parts[k].reproducibility !== '') {
            this.reproducibility = parts[k].reproducibility;
          }
        }
        let billingpartsTemp: any = [];
        billingpartsTemp = this.selectedParts.filter((item: { typeDescription: string; }) => (item.typeDescription === 'Billing')); // Billing Parts
        for (let l = 0; l < billingpartsTemp.length; l++) {
          fParts.push({
            part_number: billingpartsTemp[l].number,
            description: billingpartsTemp[l].description,
            part_type: billingpartsTemp[l].typeDescription,
            billable: '1'
          });
        }
        this.finalParts = fParts;
      } else {
        this.finalParts = [];
      }
    } else {
      this.finalParts = [];
    }
  }

  onKeyUp(partNo: any) {
    setTimeout(() => {
      this.submitFunction(partNo);
    }, 1000);
  }

  submitFunction(partNo: any) {
    for (let i = 0; i < this.selectedParts.length; i++) {
      if (partNo === this.selectedParts[i].number) {
        this.selectedParts[i].kbbReadonly = true;
      }
    }
  }

  removeKbb(partNo: any) {
    for (let i = 0; i < this.selectedParts.length; i++) {
      if (partNo === this.selectedParts[i].number) {
        this.selectedParts[i].kbbReadonly = false;
        this.selectedParts[i].kbb_serial_no = '';
      }
    }
  }
  setDescriptions() {
    this.componentDescription = this.getLabel(this.components, this.componentCode);
    this.issueDescription = this.getLabel(this.issues, this.issueCode);

    this.componentDescription1 = this.getLabel(this.components, this.componentCode1);
    this.issueDescription1 = this.getLabel(this.issues1, this.issueCode1);

    this.componentDescription2 = this.getLabel(this.components, this.componentCode2);
    this.issueDescription2 = this.getLabel(this.issues2, this.issueCode2);
  }

  getLabel(list: any[], value: string): string {
    if (!list || !value) return '';
    const found = list.find(item => item.value === value);
    return found ? found.label : '';
  }

  saveDiagnosis(simple_alert: TemplateRef<any>) {
    this.buttonSpin = true;
    this.restoreParts();

    this.setDescriptions();

    // Assign basic values
    this.diagnosisHd.purchase_order_number = this.poNo;
    this.diagnosisHd.repair_classification = this.repairClassification;
    this.diagnosisHd.component_code = this.componentCode;
    this.diagnosisHd.issue_code = this.issueCode;
    this.diagnosisHd.issue_description_string = this.issueDescription;
    this.diagnosisHd.component_description_string = this.componentDescription;

    // Optional Component 2 & 3
    if (this.componentCode1) {
      this.diagnosisHd.customer_component_code = this.componentCode1;
      this.diagnosisHd.customer_component_description_string = this.componentDescription1;
      this.diagnosisHd.customer_issue_code = this.issueCode1;
      this.diagnosisHd.customer_issue_description_string = this.issueDescription1;
    }

    if (this.componentCode2) {
      this.diagnosisHd.customer_component_code1 = this.componentCode2;
      this.diagnosisHd.customer_component_description_string1 = this.componentDescription2;
      this.diagnosisHd.customer_issue_code1 = this.issueCode2;
      this.diagnosisHd.customer_issue_description_string1 = this.issueDescription2;
    }
    this.diagnosisHd.reproducibility = this.reproducibility;
    this.diagnosisHd.request_review_by_apple = this.requestAppleReview;
    this.diagnosisHd.apple_review_note = this.holdReview;
    this.diagnosisHd.service_nonrepair_type = this.snvrType;
    this.diagnosisHd.customer_intake_notes = this.data.customer_query;
    // this.diagnosisHd.kbb_display_sr_no = this.kbbDisplayDiagSerial;

    if (this.repairType === 'CIN') {
      if (this.crbr === true) {
        this.diagnosisHd.crbr = '1';
      } else {
        this.diagnosisHd.crbr = '0';
      }
    }

    if (this.showACSType) {
      if (this.acsPart !== '') {
        this.diagnosisHd.acs_part_no = this.acsPart;
        this.diagnosisHd.acs_price_type = this.acsPriceType;
      } else {
        this.diagnosisHd.acs_part_no = '';
        this.diagnosisHd.acs_price_type = '';
      }
    } else {
      this.diagnosisHd.acs_part_no = '';
      this.diagnosisHd.acs_price_type = '';
    }
    if ((this.data.product_family === 'iPhone') && (this.isMailIn === true)) {
      this.diagnosisHd.loaner = this.loanerDescription;
      this.diagnosisHd.loaner_part_no = this.loanerPartNumber;
      this.diagnosisHd.loaner_sr_no = this.loanerSno;
    } else {
      this.diagnosisHd.loaner = '';
      this.diagnosisHd.loaner_part_no = '';
      this.diagnosisHd.loaner_sr_no = this.loanerSno;
    }

    this.diagnosisHd.service_charge = this.serviceCharge;

    if ((this.diagIssue === '' || this.diagIssue === undefined) || (this.diagReproduce === '' || this.diagReproduce === undefined) || (this.diagPerformed === '' || this.diagPerformed === undefined) || (this.diagCondition === '' || this.diagCondition === undefined) || (this.diagResolution === '' || this.diagResolution === undefined)) {
      alert('Fill all diagnosis notes filed.')
      this.buttonSpin = false;
      return;
    }

    this.diagnosisHd.technician_note =  'Issue:- ' + (this.diagIssue || '').replace(/\n+/g, ' ') + '\n' +'Steps to Reproduce:- ' + (this.diagReproduce || '').replace(/\n+/g, ' ') + '\n' +'Diagnosis Performed:- ' + (this.diagPerformed || '').replace(/\n+/g, ' ') + '\n' +'Cosmetic Condition:- ' + (this.diagCondition || '').replace(/\n+/g, ' ') + '\n' +'Resolution:- ' + (this.diagResolution || '').replace(/\n+/g, ' ');
    let result;
    this.diagnosisData = this.diagnosisHd.technician_note;

    const uniqueParts = Array.from(new Set(this.finalParts));
    /* console.log(this.diagnosisHd);
    this.buttonSpin = false; */
    this.dataService.saveDiagnosis(this.ticketId, this.diagnosisHd, uniqueParts, this.answeredQuestions)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (this.sendFromL1Approval === false) {
              this.buttonSpin = false;
            }
            // this.diagSaved = true;
          } else {
            this.simpleAlert = { title: 'Diagnosis', msg: result.message };
            this.openModal(simple_alert);
            this.buttonSpin = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  submitZZInvoice() {
    if (!this.zzInvoiceNo?.trim() || !this.zzInvoiceDate) {
      this.zzInvoiceError = 'Please enter Invoice Number and Invoice Date';
      return;
    }
    this.buttonSpin = true;
    this.zzInvoiceError = '';

    if (this.data.status_id === '300') {
      this.zzPopValidated = 0;
      this.dataService.updateZZInvoiceNo(this.ticketId, this.zzInvoiceNo.trim(), this.zzInvoiceDate, this.zzPopValidated).subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          if (data.status === true) {
            this.zzInvoiceValidated = true;
            this.zzInvoiceError = '';
            this.modalService.dismissAll();
            this.clicked = false;
          } else {
            this.zzInvoiceError = data.message || 'Failed to update invoice';
          }
        },
        error: () => {
          this.buttonSpin = false;
          this.zzInvoiceError = 'Failed to update invoice';
        }
      });
      return;
    }

    this.dataService.getTicketMoreInfo(this.ticketId).subscribe({
      next: (data: any) => {
        if (data.status !== true || !data.items) {
          this.buttonSpin = false;
          this.zzInvoiceError = data.message || 'Failed to fetch invoice details';
          return;
        }
        const apiNo = (data.items.zz_invoice_no || '').trim();
        const apiDate = (data.items.zz_invoice_date || '').split(' ')[0];
        if (apiNo === this.zzInvoiceNo.trim() && apiDate === this.zzInvoiceDate) {
          if (this.data.status_id === '900') {
            this.zzPopValidated = 1;
            this.dataService.updateZZInvoiceNo(this.ticketId, this.zzInvoiceNo.trim(), this.zzInvoiceDate, this.zzPopValidated).subscribe({
              next: (updateData: any) => {
                this.buttonSpin = false;
                if (updateData.status === true) {
                  this.zzInvoiceValidated = true;
                  this.zzInvoiceError = '';
                  this.modalService.dismissAll();
                  this.clicked = false;
                } else {
                  this.zzInvoiceError = updateData.message || 'Failed to update invoice';
                }
              },
              error: () => {
                this.buttonSpin = false;
                this.zzInvoiceError = 'Failed to update invoice';
              }
            });
          } else {
            this.buttonSpin = false;
            this.zzInvoiceValidated = true;
            this.zzInvoiceError = '';
            this.modalService.dismissAll();
            this.clicked = false;
          }
        } else {
          this.buttonSpin = false;
          this.zzInvoiceError = 'Invoice Number or Invoice Date does not match';
        }
      },
      error: () => {
        this.buttonSpin = false;
        this.zzInvoiceError = 'Failed to fetch invoice details';
      }
    });
  }

  cancelZZInvoice() {
    this.zzInvoiceError = '';
    this.pendingApplyL1 = null;
    this.clicked = false;
    this.hideModel();
  }

  applyL1Approve(simple_alert: TemplateRef<any>, confirmQuoteCheck: TemplateRef<any>) {
    this.buttonSpin = true;

    let createFlag: any;
    let isBillingPart = false;
    let consumable1 = false;
    let consumable2 = false;
    let consumable3 = false;
    let isConsumable = false;
    let isAdhesiveAvail = true;
    if (this.diagnosisDt.reference_number === '') {
      this.refcolor = false;
    } else {
      this.refcolor = true;
    }
    if ((this.diagIssue !== '' && this.diagIssue !== undefined) && (this.diagReproduce !== '' && this.diagReproduce !== undefined) && (this.diagPerformed !== '' && this.diagPerformed !== undefined) && (this.diagCondition !== '' && this.diagCondition !== undefined) && (this.diagResolution !== '' && this.diagResolution !== undefined)) {
      this.diagnosisHd.technician_note =   'Issue:- ' + (this.diagIssue || '').replace(/\n+/g, ' ') + '\n' +'Steps to Reproduce:- ' + (this.diagReproduce || '').replace(/\n+/g, ' ') + '\n' +'Diagnosis Performed:- ' + (this.diagPerformed || '').replace(/\n+/g, ' ') + '\n' +'Cosmetic Condition:- ' + (this.diagCondition || '').replace(/\n+/g, ' ') + '\n' +'Resolution:- ' + (this.diagResolution || '').replace(/\n+/g, ' ');
      this.diagnosisData = this.diagnosisHd.technician_note;
    }
    if ((this.repairType === 'CIN')) { // CIN consumable check
      if (this.userBranch === 'SMT') {
        this.checkPOPFile();
        this.getPOPRequiredList();
      }

      if ((this.data.serial_no.substring(0, 2).toLowerCase() === 'zz') && (this.data.status_id === '300') && !this.zzInvoiceValidated) {
        this.openModal(this.zzInvoiceTemp);
        this.buttonSpin = false;
        return;
      }
      if ((this.consumablesCheck === true) && ((this.componentCode !== '26113') && (this.componentCode !== '26113A') && (this.componentCode !== '26113B') && (this.componentCode !== 'NSP01'))) {
        for (let h = 0; h < this.selectedParts.length; h++) {
          if (this.selectedParts[h].number === '011-00212') {
            consumable1 = true;
          } else if (this.selectedParts[h].number === '011-00213') {
            consumable2 = true;
          } else if (this.selectedParts[h].number === '011-00214') {
            consumable3 = true;
          }
        }

        if ((consumable1 === true) && (consumable2 === true) && (consumable3 === true)) {
          isConsumable = true;
        } else {
          isConsumable = false;
          alert('Consumable parts are required for this Repair');
          this.buttonSpin = false;
          return;
        }
      } else {
        isConsumable = true;
      }

      if ((this.data.product_family === 'iPhone')) {
        if ((this.exKBBDisplayPartNo !== '') && (this.kbbDisplayDiagSerial === '')) {
          alert('KBB Display Serial number required');
          this.buttonSpin = false;
          return;
        }
        if ((this.exKBBDisplayPartNo !== '') && (this.kbbDisplayImageList.length < 3)) {
          alert('Three mandatory KBB images required to proceed');
          this.buttonSpin = false;
          return;
        }
        if (this.data.warranty_status === "Out Of Warranty (No Coverage)") {
          for (let i = 0; i < this.selectedParts.length; i++) {
            if (((this.selectedParts[i].number === '661-18503') || (this.selectedParts[i].number === '661-18504')) && (this.selectedParts[i].issueCode === 'IP398')) {
              this.crbrMandate = false;
            }
          }
          if ((this.crbrMandate === true) && (this.crbr == false)) {
            alert(`This part is restricted to "CRBR Repair Type" only`);
            this.buttonSpin = false;
            return;
          }
        }
      }
    } else { // Main-In consumable check
      isConsumable = true;
    }

    if (this.eligibleQuestions) {
      let allAnswered = true;
      for (const template of this.questionaireStructure) {
        for (const tree of template.trees) {
          for (const question of tree.questions) {
            if (question.questionId && question.questionId.startsWith('Q')) {
              if (!question.answers || question.answers.length === 0) {
                allAnswered = false;
              }
            }
          }
        }
      }
      if (allAnswered === false) {
        alert('Required Questions have not been answered, please answer the questions again');
        createFlag = false;
        this.buttonSpin = false;
        return;
      }
    }

    if ((this.componentCode === '') || (this.componentCode === undefined)) {
      alert('Select the Component');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if ((this.issueCode === '') || (this.issueCode === undefined)) {
      alert('Select Issue');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if ((this.addmorecomponentFlag1) && ((this.componentCode1 === '') || (this.componentCode1 === undefined))) {
      alert('Select the Component');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if ((this.addmorecomponentFlag1) && ((this.issueCode1 === '') || (this.issueCode1 === undefined))) {
      alert('Select Issue');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if ((this.addmorecomponentFlag2) && ((this.componentCode2 === '') || (this.componentCode2 === undefined))) {
      alert('Select the Component');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if ((this.addmorecomponentFlag2) && ((this.issueCode2 === '') || (this.issueCode2 === undefined))) {
      alert('Select Issue');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if (this.repairType === undefined) {
      alert('Select Repair Type');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if (this.diagnosisData === '') {
      alert('Enter Diagnosis notes');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if (this.diagnosisHd.reference_number === '') {
      alert('Enter Reference Number');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if (((this.currentQuoteStatus === 'Expired')) && (this.repairType !== 'SVNR')) {
      alert('Current quote has been expired. Please re-generate a new quote.');
      createFlag = false;
      this.buttonSpin = false;
      return;
    } else if (this.repairType === 'WUMS') {
      if (this.coverageOption === '') {
        alert('Select Coverage Option');
        createFlag = false;
        this.buttonSpin = false;
        return;
      } else {
        createFlag = true;
      }
      for (let i = 0; i < this.selectedParts.length; i++) {
        if ((this.selectedParts[i].typeDescription === 'Billing') && this.selectedParts[i].typeDescription !== 'RCBilling') {
          isBillingPart = true;
        }
      }
    } else if (this.repairType === 'SVNR') {
      if (this.snvrType === undefined) {
        alert('Select SVNR Type');
        this.buttonSpin = false;
      }
    } else if ((this.data.site_type_id === '2') && (this.typeofDamage === 'Select the Damage')) {
      alert('Select the Condition of Equipment');
      this.buttonSpin = false;
      createFlag = false;
      return;
    } else {
      this.sendFromL1Approval = true;
      if (this.diagnosisHd.additional_part === '0') {
        this.saveDiagnosis(simple_alert);
      }
      createFlag = true;
    }

    let partFlag: any = false;
    let quoteCheck = false;
    let quoteAvailable = false;
    if (this.repairType !== 'SVNR') {
      if (this.selectedParts.length !== 0) {
        const billingPart = this.selectedParts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Adjustment');
        for (let k = 0; k < billingPart.length; k++) {
          if ((this.repairType === 'CIN') || (this.repairType === 'OSR') || (this.repairType === 'OSCR')) {
            if ((this.data.site_type_id === '1') || (this.data.site_type_id === '2')) {
              if ((billingPart[k].coverageOption !== undefined) && (billingPart[k].componentCode !== '')
                && (billingPart[k].issueCode !== '') && (billingPart[k].reproducibility !== '')) {
                partFlag = true;
              } else {
                partFlag = false;
                alert('Fill all the Parts fields');
                this.buttonSpin = false;
                return;
              }
            } if ((billingPart[k].coverageOption !== 'VMI_GREEN') && (billingPart[k].coverageOption !== 'APPLECARE_PLUS')) {
              if ((this.diagnosisHd.quotation_id === '') || (this.diagnosisHd.quotation_id === '0')) {
                quoteCheck = true;
              } else {
                quoteAvailable = true;
              }
            }
          } else if (this.repairType === 'WUMS') {
            if ((this.selectedParts[k].typeDescription !== 'Billing') && (this.selectedParts[k].typeDescription !== 'RCBilling')) {
              if (this.data.site_type_id === '1') {
                if ((this.selectedParts[k].componentCode !== '')
                  && (this.selectedParts[k].issueCode !== '') && (this.selectedParts[k].reproducibility !== '')) {
                  partFlag = true;
                } else {
                  partFlag = false;
                  alert('Fill all the Parts fields');
                  this.buttonSpin = false;
                  break;
                }
              } else {
                if ((this.selectedParts[k].componentCode !== '')
                  && (this.selectedParts[k].issueCode !== '') && (this.selectedParts[k].reproducibility !== '') && (this.selectedParts[k].kbb_serial_no !== '')) {
                  partFlag = true;
                } else {
                  partFlag = false;
                  alert('Fill all the Parts fields');
                  this.buttonSpin = false;
                  break;
                }
              }
            }
            if (isBillingPart === false) {
              partFlag = false;
              alert('Add Billable part is Mandatory for Mail-In Repair');
              this.buttonSpin = false;
            }

            if ((this.coverageOption !== 'VMI_GREEN') && (this.coverageOption !== 'APPLECARE_PLUS')) {
              if ((this.diagnosisHd.quotation_id === '') || (this.diagnosisHd.quotation_id === '0')) {
                quoteCheck = true;
              } else {
                quoteAvailable = true;
              }
            }
          }
        }
        if (billingPart.length === 0) {
          for (let l = 0; l < this.selectedParts.length; l++) {
            if ((this.selectedParts[l].number === '011-00211') || (this.selectedParts[l].number === '011-00224')) {
              partFlag = true;
            }
          }
        }
      } else {
        alert('Select GSX Parts Before apply to L1 Approve');
        this.buttonSpin = false;
      }
    } else {
      partFlag = true;
      createFlag = true;
    }

    for (let i = 0; i < this.finalParts.length; i++) {
      if ((this.finalParts[i].component_code) && (this.finalParts[i].kbb_serial_no === '')) {
        alert(`Please check and fill all the part's fields`);
        this.buttonSpin = false;
        partFlag = false;
        return;
      }
    }

    //Adhesive Check
    if ((this.repairType === 'CIN') && (this.data.product_family === 'iPhone') && ((this.componentCode !== '26113') && (this.componentCode !== '26113A') && (this.componentCode !== '26113B') && (this.componentCode !== 'NSP01')) && (this.data.branch_code !== 'FIC') && ((this.data.product_description !== 'iPhone 6') && (this.data.product_description !== 'iPhone 6 Plus') && (this.data.product_description !== 'iPhone SE (1st generation)')) && (this.data.product_category !== 'Others') && (this.data.product_family !== 'Pencil') && (this.data.product_description !== 'iPhone MagSafe Battery Pack') && (this.data.product_description !== 'iPhone MagSafe Charger') && (!this.data.product_description.includes('Smart Battery Case'))) {
      if (this.adhesiveParts === false) {
        if (!confirm('Adhesive parts are required for this Repair. Do you want to continue as this is a Whole unit Repair?')) {
          createFlag = false;
          this.buttonSpin = false;
          return;
        }
        createFlag = true;
      } else {
        createFlag = true;
      }
    }

    if (this.data.status_id === '2800') {
      let quotePendingAvail = false;
      for (let i = 0; i < this.quotations.length; i++) {
        if (this.quotations[i].status === 'Pending') {
          quotePendingAvail = true;
        }
      }
      setTimeout(() => {
        if (!quotePendingAvail) {
          alert('RC Quotation has not been attached');
          createFlag = false;
          this.buttonSpin = false;
          return;
        }
      }, 1000);
    }

    if ((this.diagnosisHd.additional_part === '0') && (this.repairType !== 'SVNR') && (this.data.status_id !== '2800')) {
      // this.sendForL1(simple_alert);
      if (this.data.g_number.slice(0, 1) === 'D') {
        this.sendForL1(simple_alert);
      } else {
        // this.sendForL1(simple_alert); // Exception to send L1

        this.repairEligibilityFull(quoteCheck, quoteAvailable, createFlag, partFlag, isConsumable, simple_alert, confirmQuoteCheck);
      }
    } else {
      if (this.data.site_type_id === '1') {
        setTimeout(() => {
          if (quoteCheck === true) {
            this.openModal(confirmQuoteCheck);
          } else if (quoteAvailable === true) {
            this.quotePendingCheck(this.diagnosisHd.quotation_id, confirmQuoteCheck, simple_alert);
          } else {
            if ((createFlag === true) && (partFlag === true) && (isConsumable === true)) {
              this.sendForL1(simple_alert);
            }
          }
        }, 5000);
      } else {
        if ((createFlag === true) && (partFlag === true) && (isConsumable === true)) {
          this.buttonSpin = false;
          this.quoteRequest();
        }
      }
    }
  }

  repairEligibilityFull(quoteCheck: boolean, quoteAvailable: boolean, createFlag: boolean, partFlag: boolean, isConsumable: boolean, simple_alert: TemplateRef<any>, confirmQuoteCheck: TemplateRef<any>) {
    let result: any;
    let resultResponse: any;
    let eligibilityDetails: any;
    let repairMsg = '';
    let reasons1: any;
    this.buttonSpin = true;
    this.repairEligibleDetails = [];
    this.dataService.repairEligibilityFull(this.ticketId, this.diagnosisHd.id)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            if (result.gsx_response.eligibilityDetails) {
              resultResponse = result.gsx_response.eligibilityDetails.outcome;
              eligibilityDetails = result.gsx_response.eligibilityDetails;
              const reasons = resultResponse.map((item: { reasons: any; }) => item.reasons);
              if (reasons.length > 1) {
                reasons1 = reasons[0].concat(reasons[1]);
              } else {
                reasons1 = reasons[0];
              }

              for (let i = 0; i < reasons1.length; i++) {
                if (reasons1[i].type === 'WARNING') {
                  if (reasons1[i].messages) {
                    const messages = reasons1[i].messages;
                    for (let j = 0; j < messages.length; j++) {
                      if ((messages[j].description.includes('Find My')) || (messages[j].description.includes('active'))) {
                        this.fmipDetails = reasons1[i].messages[j].description;
                        this.fmipStatus = true;
                        this.fmipColor = '#ff0000';
                      } else {
                        this.fmipDetails = messages[j].description;
                      }
                    }
                  }
                } else if (reasons1[i].type === 'REPAIR_TYPE') {
                  if (reasons1[i].messages) {
                    repairMsg = reasons1[i].messages[0];
                  }
                  this.repairEligibleDetails.push({
                    message: repairMsg,
                    repairOptions: reasons1[i].repairOptions
                  });
                  const repairOptions = this.repairEligibleDetails[0].repairOptions;
                  for (let k = 0; k < repairOptions.length; k++) {
                    if ((repairOptions[k].option === 'CIN')) {
                      this.airpodsOnlyCIN = true;
                    }
                    if ((repairOptions[k].option === 'WUMS')) {
                      this.airpodsOnlyWums = true;
                    }

                    if (this.isiPadHighConfig === false) {
                      if (repairOptions[k].option === this.repairType) {
                        this.isRepairEligible = true;
                      }
                    } else {
                      this.isRepairEligible = true;
                    }

                  }
                  this.airpodsCoverageStatus = eligibilityDetails.coverageCode;
                }
              }

              if (this.data.site_type_id === '1') {
                setTimeout(() => {
                  if (quoteCheck === true) {
                    this.openModal(confirmQuoteCheck);
                  } else if (quoteAvailable === true) {
                    this.quotePendingCheck(this.diagnosisHd.quotation_id, confirmQuoteCheck, simple_alert);
                  } else {
                    if ((createFlag === true) && (partFlag === true) && (isConsumable === true)) {
                      if (this.isRepairEligible) {
                        this.sendForL1(simple_alert);
                      } else {
                        alert('The selected Repair Type is not eligible to Create. Please check the repair eligibility');
                        this.buttonSpin = false;
                      }
                    }
                  }
                }, 5000);
              } else {
                this.quoteRequest();
              }
            } else {
              let l1Exception = false;
              if (result.gsx_response.errors) {
                /* if (result.gsx_response.errors[0].code === 'ANSWER_ARRAY_BLANK_OR_EXCEEDS_MAX_LENGTH') {
                  l1Exception = true;
                } else  */
                if (result.gsx_response.errors[0].code === 'UNIT_RECEIVED_DATE_GREATER_THAN_CURRENT_DATE_OR_LESS_THAN_14_DAYS') {
                  l1Exception = true;
                } else {
                  const errorMsg = result.gsx_response.errors[0].message;
                  this.simpleAlert = { title: 'Send for L1 Approval', msg: errorMsg };
                  this.openModal(simple_alert);
                }

                if (this.data.site_type_id === '1') {
                  this.sendForL1(simple_alert);
                } else {
                  this.quoteRequest();
                }

              }
            }
          } else {
            alert(result.message);
            this.buttonSpin = false;
            return;
          }
        });
  }

  quotePendingCheck(quoteId: any, confirmQuoteCheck: TemplateRef<any>, simple_alert: TemplateRef<any>) {
    for (let i = 0; i < this.quotations.length; i++) {
      if (quoteId === this.quotations[i].id) {
        if ((this.quotations[i].status !== 'Approved') && (this.quotations[i].status !== 'Pending')) {
          this.openModal(confirmQuoteCheck);
        } else {
          if ((this.data.status_id === '300') || (((this.data.status_id >= '1100') && (this.data.status_id <= '1600')) || ((this.data.status_id >= '2100') && (this.data.status_id <= '2800')))) {
            this.sendForL1(simple_alert);
          } else {
            this.L1ApproveReject('L1-Approved', simple_alert);
          }
        }
      }
    }
  }

  quoteCheckConfirm(simple_alert: TemplateRef<any>) {
    if ((this.data.status_id === '300') || (((this.data.status_id >= '1100') && (this.data.status_id <= '1600')) || ((this.data.status_id >= '2100') && (this.data.status_id <= '2800')))) {
      this.modalService.dismissAll();
      this.sendForL1(simple_alert);
    } else {
      this.modalService.dismissAll();
      this.L1ApproveReject('L1-Approved', simple_alert);
    }
  }

  sendForL1(simple_alert: TemplateRef<any>) {
    let result;
    let sendToL1 = true;
    if ((this.iPhone1213ForceMailIn === true) && (this.repairType !== 'WUMS')) {
      alert('The selected Repair Type is not eligible to Create. Please check the repair eligibility');
      sendToL1 = false;
    }
    //exception for iPadHighConfig - force mail-in (comment this else-if part if want to allow carry in for that repair)
    else if ((this.isiPadHighConfig) && (this.iPadHighConfigDiagStatus !== 'SUCCESS') && (this.repairType !== 'WUMS') && ((this.repairType !== 'SVNR'))) {
      // alert('This iPad deducted as High Config, please do-not perform HDI Diagnosis, proceed with the Mail-In Repair'); //exception validation disabled
      sendToL1 = true;
    } /* else if ((this.acPlusDetails.agreements) && (this.data.purchased_in !== 'India') && (this.data.product_family === 'Mac') && ((this.diagnosisHd.component_code !== 'MACACC') && (this.diagnosisHd.component_code !== 'MACACC2')) && (this.repairType === 'CIN')) {
      alert('This repair is only eligible for Mail-In');
      sendToL1 = false;
    } */

    if ((this.userBranch === 'SMT') && (this.data.product_family === 'iPhone') && (this.repairType === 'CIN')) {
      for (let i = 0; i < this.selectedParts.length; i++) {
        for (let j = 0; j < this.popRequiredList.length; j++) {
          if (this.selectedParts[i].number === this.popRequiredList[j]) {
            this.popRequired = true;
          }
        }
      }

      if (((this.data.serial_no === 'ZZ510AAAOWP') && (!this.popExist)) || ((this.popRequired) && (!this.popExist))) {
        alert('POP is required for this Repair creation. Refer bundle matrix.');
        sendToL1 = false;
        this.buttonSpin = false;
        return;
      }
    }

    if ((this.userBranch === 'OSH') && (this.warrantyStatus === 'Customer Satisfaction (CS) Code')) {
      if (!this.requestAppleReview) {
        alert('Request Review by Apple is mandatory for this repair');
        sendToL1 = false;
        this.buttonSpin = false;
        return;
      }
    }

    if (sendToL1 === true) {
      this.dataService.diagnosisStatusChange(this.ticketId, 'L1-Hold', this.diagnosisHd.id, '', '0', '')
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              this.getdata(this.ticketId);
            } else {
              this.simpleAlert = { title: 'Send for L1 Approve', msg: result.message };
              this.openModal(simple_alert);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  viewDeviceImages(view_image: TemplateRef<any>) {
    let result;
    this.dataService.viewImage(this.data.serial_no, this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          let resultTemp: any;
          resultTemp = result;
          if (result.status === true) {
            this.deviceImages = result.data;
            for (let i = 0; i < this.deviceImages.length; i++) {
              let date = new Date(this.deviceImages[i].entrytime);
              let date1: any = new Date('01/03/2026');
              if (date > date1) {
                this.deviceImages[i].imageName = this.deviceImages[i].backup_file_name;
              } else {
                this.deviceImages[i].imageName = this.deviceImages[i].file_name.split('-')[1];
              }
            }
          } else {
            this.deviceImages = [];
          }
          this.openModal(view_image);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  viewDeviceImage(imageId: any) {
    for (let i = 0; i < this.deviceImages.length; i++) {
      if (this.deviceImages[i].id === imageId) {
        let date = new Date(this.deviceImages[i].entrytime);
        let date1: any = new Date('31/07/2023');
        if (date < date1) {
          const imageURL = this.deviceImages[i].backup_file_name;
          window.open(imageURL, '_blank');
        } else {
          const imageURL = this.deviceImages[i].file_name;
          window.open(imageURL, '_blank');
        }
      }
    }
  }

  deleteDeviceImage(id: any) {
    let result;
    this.dataService.deleteImage(id, this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          let resultTemp;
          resultTemp = result;
          if (result.status === true) {
            this.modalService.dismissAll();
            alert(result.message);
          } else {
            this.modalService.dismissAll();
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  cancelGsxDetails() {
    this.selectedParts = [];
    this.consignmentView = false;
    this.onRepair = false;
    this.isGsxRepair = false;
  }

  viewKBBDisplayImage(kbbImage: string, kbb_image_temp: TemplateRef<any>, fileId?: any) {
    if (fileId) {
      this.selectedKbbImage = 'https://icare-raf.s3.ap-south-1.amazonaws.com/' + kbbImage + '/' + fileId;
    } else {
      this.selectedKbbImage = kbbImage;
    }
    this.openModal(kbb_image_temp);
  }

  changeKbbImageZoom() {
    if (this.kbbImageZoom) {
      this.kbbImageZoom = false;
    } else {
      this.kbbImageZoom = true;
    }
  }

  verifyKBBImageSerial() {
    let result: any = [];
    if (this.kbbDisplayDiagSerial !== this.kbbImageSerialNo) {
      this.kbbVerifyError = 'KBB Image Serial number mismatch';
      setTimeout(() => {
        this.kbbVerifyError = '';
      }, 3000);
    } else {
      this.dataService.kbbImageSerialVerify(this.ticketId)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.kbbErrorMessage = 'KBB Image Serial number verified';
              this.kbbSerialNoVerified = '1';
              this.kbbImageZoom = false;
              this.getdata(this.ticketId);
            } else {
              this.modalService.dismissAll();
              this.kbbImageZoom = false;
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  applyL2Approve(simple_alert: TemplateRef<any>, confirm_ack_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let result;
    // let gsxError: any = [];
    let gsxErrorMsg: any = [];

    if (this.data.site_type_id === '2') {
      if (this.typeofDamage === 'Select the Damage') {
        alert('Select the Condition of Equipment');
        this.buttonSpin = false;
        return;
      }
    }

    if (this.repairType === 'SVNR') {
      if ((this.diagnosisHd.svc_remarks === this.diagnosisHd.technician_note) || (this.diagnosisHd.svc_remarks === '')) {
        alert('Please update the SVC Remarks');
        this.buttonSpin = false;
      } else {
        this.dataService.repairCreateNTF(this.ticketId, 'L1-Hold', this.diagnosisHd.id)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.buttonSpin = false;
                if (this.data.site_type_id === '2') {
                  this.callQCApprove('Approved');
                } else {
                  this.getdata(this.ticketId);
                }
                // this.getdata(this.ticketId);
              } else {
                if (result.gsx_response) {
                  gsxErrorMsg = result.response;
                } else {
                  gsxErrorMsg = result.message;
                }
                this.simpleAlert = { title: 'Create SVNR Repair', msg: gsxErrorMsg };
                this.openModal(simple_alert);
                this.buttonSpin = false;
                this.clicked = false;
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }
    } else {
      if ((this.astDiagEligible === true) || (this.diagnosisHd.component_code === '26113A') || (this.diagnosisHd.component_code === '26113') || (this.diagnosisHd.component_code === 'NSP01')) {
        this.dataService.repairCreateAuto(this.ticketId, 'L2-Hold', this.diagnosisHd.id)
          .subscribe({
            next: (data: any) => {
              result = data;

              if (result.status === true) {
                // this.getdata(this.ticketId);
                if (result.gsx_response) {
                  gsxErrorMsg = result.response;
                  Swal.fire({
                    title: 'Warning',
                    text: result.response,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonText: 'Yes, Understood!',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  }).then((result: { isConfirmed: any; }) => {
                    if (result.isConfirmed) {
                      this.getdata(this.ticketId);
                    }
                  })
                } else {
                  gsxErrorMsg = result.message;
                }

                this.buttonSpin = false;
                this.clicked = false;
              } else {
                if (result.gsx_response) {
                  gsxErrorMsg = result.response;
                } else {
                  gsxErrorMsg = result.message;
                }
                if ((gsxErrorMsg.includes('customer acknowledge')) || (gsxErrorMsg.includes('customer understand')) || (gsxErrorMsg.includes('By accepting this message'))|| (gsxErrorMsg.includes('temporary substitute part')) || ((gsxErrorMsg.includes('Does the customer agree to proceed with service')))) {
                  const regex = /"id":\s*"([^"]+)"/;
                  const match = gsxErrorMsg.match(regex);
                  this.gsxAckId = match ? match[1] : '';
                } else {
                  this.gsxAckId = '';
                }
                if (this.gsxAckId === '') {
                  this.simpleAlert = { title: 'GSX MESSAGE', msg: gsxErrorMsg };
                  this.openModal(simple_alert);
                } else {
                  this.confirmAlert = { id: 'ack', title: 'GSX MESSAGE', msg: gsxErrorMsg };
                  this.openModal(confirm_ack_temp);
                }

                this.buttonSpin = false;
                this.clicked = false;
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
        if (this.repairType === 'CIN') {
          const parts = this.diagnosisDt;
          let serialSummary = "";

          for (let i = 0; i < parts.length; i++) {
            const serial = parts[i].kbb_serial_no;
            const partNo = parts[i].part_number;

            // Skip if serial empty/null
            if (!serial || serial.trim() === "") {
              continue;
            }
            serialSummary += `${partNo} : ${serial}\n`;
          }
          this.dataService.updateTechnicianNotes(
            serialSummary,this.gsxNo, this.ticketId,this.repairType
          ).subscribe({
            next: (data: any) => {
              if (data.status === true) {
                this.getdata(this.ticketId);
              } else {
                alert(data.message);
              }
            },
            error: (error: any) => this.error = error
          });
        }


      } else {
        alert('The AST diagnosis event results are beyond 30 mins. Please initiate the AST MRI again to create a repair.');
        this.buttonSpin = false;
      }
    }
  }

  confirmAck(ackValue: any) {
    let result: any;
    if (ackValue === 'Y') {
      this.dataService.repairCreateAck(this.ticketId, this.gsxAckId, ackValue)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              this.modalService.dismissAll();
            } else {
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

  applyL2ApproveAddPart(simple_alert: TemplateRef<any>) {
    this.buttonSpin = true;
    const newParts: any = [];
    for (let i = 0; i < this.diagnosisDt.length; i++) {
      if (this.diagnosisDt[i].additional_part === '1') {
        newParts.push(this.selectedParts[i]);
      }
    }

    let result;
    let gsxError: any = [];
    const formData = '&ticket_id=' + this.ticketId + '&update_type=' + 'UpdateNewPartAddition' + '&repair_id=' + this.gsxNo + '&hd_id=' + this.diagnosisHd.id + '&repair_type=' + this.repairType;
    this.dataService.gsxRepairUpdate(formData, newParts)
      .subscribe({
        next: (data: any) => {
          result = data;

          if (this.data.site_type_id === '2') {
            this.simpleAlert = { title: 'Update Repair', msg: 'There seems to be a slight delay in receiving an update regarding the repair status from GSX. Kindly allow up to 3 minutes.' };
            this.openModal(simple_alert);
          }
          if (result.status === true) {
            let gsxErrorMsg: any = '';

            if (result.gsx_response) {
              if (result.gsx_response.includes('STOP')) {
                gsxErrorMsg = result.gsx_response;
                this.simpleAlert = { title: 'Update Repair', msg: gsxErrorMsg };
                this.openModal(simple_alert);
              } else {
                window.location.reload();
              }
              this.buttonSpin = false;
            }
          } else {
            this.modalService.dismissAll();
            this.simpleAlert = { title: 'Update Repair', msg: result.message };
            this.openModal(simple_alert);
            this.buttonSpin = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  openCaseIdModal(case_id_temp: TemplateRef<any>, callback: () => void) {
    this.modalService.open(case_id_temp);
    this.validateCaseIdCallback = callback;
  }


  L1Validation(stage: any, simple_alert: TemplateRef<any>, confirmQuoteCheck: TemplateRef<any>, case_id_temp: TemplateRef<any>) {

    this.buttonSpin = true;
    let quoteCheck = false;
    let quoteAvailable = false;
    if ((this.data.purchased_in === 'India') || (this.data.product_family === 'Mac')) {
      this.oocCheck = true;
    }

    if ((stage === 'L1-Approved') && ((this.data.raf_email_send === 'N') || (this.data.raf_email_send === ''))) {
      alert(`Please send the RAF before L1 Approve`);
      this.buttonSpin = false;
      return;
    }
    if ((this.data.status_id === '600') && (this.repairType === 'CIN') && (this.data.serial_no.substring(0, 2).toLowerCase() === 'zz') && !this.zzInvoiceValidated) {
      this.openModal(this.zzInvoiceTemp);
      this.buttonSpin = false;
      return;
    }

    if (this.repairType !== 'SVNR' && this.isInternalAsset !== '1') {
      if (this.selectedParts.length !== 0) {
        const billingPart = this.selectedParts.filter((item: { typeDescription: string; }) => item.typeDescription !== 'Adjustment');
        for (let k = 0; k < billingPart.length; k++) {
          if (this.repairType === 'CIN') {
            if ((billingPart[k].coverageOption !== 'VMI_GREEN') && (billingPart[k].coverageOption !== 'APPLECARE_PLUS')) {
              if ((this.diagnosisHd.quotation_id === '') || (this.diagnosisHd.quotation_id === '0')) {
                quoteCheck = true;
              } else {
                quoteAvailable = true;
              }
            }
          } else if (this.repairType === 'WUMS') {
            if ((this.coverageOption !== 'VMI_GREEN') && (this.coverageOption !== 'APPLECARE_PLUS')) {
              if ((this.diagnosisHd.quotation_id === '') || (this.diagnosisHd.quotation_id === '0')) {
                quoteCheck = true;
              } else {
                quoteAvailable = true;
              }
            }
          }
        }
      }
      if ((quoteCheck === true)) {
        this.openModal(confirmQuoteCheck);
      } else if ((quoteAvailable === true)) {
        this.quotePendingCheck(this.diagnosisHd.quotation_id, confirmQuoteCheck, simple_alert);
      } else if ((this.repairType === 'CIN') && (!this.oocCheck)) {
        alert('POP is not validated, its force Mail-In to Apple RC');
        this.buttonSpin = false;
        return;
      } else if (this.data.case_id === '0' && (this.data.warranty_status === "Out Of Warranty (No Coverage)")) {
        this.caseIdValidated = false;
        this.openCaseIdModal(case_id_temp, () => {
          if (this.caseIdValidated) {
            this.modalService.dismissAll();
            this.L1ApproveReject(stage, simple_alert);
          } else {
            this.modalService.dismissAll();
            this.buttonSpin = false;
            alert('Case Id not validated');
            return;
          }
        });
      } else {
        this.L1ApproveReject(stage, simple_alert);
      }
    } else {
      this.L1ApproveReject(stage, simple_alert);
    }
  }

  L1Reject(l1_decline: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(l1_decline);
  }

  validateCaseId() {
    this.invalidCaseIdMsg = '';
    let result;
    if (this.warrantyExpiryDate === '') {
      this.invalidCaseIdMsg = "Please enter Warranty Expiry date";
      return;
    }
    let response;
    this.dataService.updateCaseId(this.ticketId, this.warrantyExpiryDate)
      .subscribe({
        next: (value: any) => {
          response = value;
          this.caseIdValidated = true;
          this.validateCaseIdCallback();
        }, // success path
        error: (error: any) => this.error = error // error path
      });

    /* this.dataService.getEscalationDetails(this.caseId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && !result.response.errors) {
            let response;
            this.dataService.updateCaseId(this.ticketId, this.caseId, this.warrantyExpiryDate)
            .subscribe({
              next: (value: any) => {
                response = value;
                if(response.status === true) {
                  this.caseIdValidated = true;
                  this.validateCaseIdCallback();
                } else {
                  // this.caseIdValidated = false;
                  this.invalidCaseIdMsg = "The Case Id already exists";
                  // this.validateCaseIdCallback();
                }
              }, // success path
              error: (error: any) => this.error = error // error path
            });
          } else {
            this.caseIdValidated = false;
            this.invalidCaseIdMsg = result.response.errors[0].message;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      }); */
  }

  L1ApproveReject(stage: string, simple_alert: TemplateRef<any>) {
    this.buttonSpin = true;
    let result;
    let callL1Change;
    if ((stage === 'L1-Approved')) {
      callL1Change = true;
    } else {
      if (this.L1L2DeclineReview !== '') {
        callL1Change = true;
      } else {
        callL1Change = false;
        this.notfilled = true;
      }
    }

    if (callL1Change === true) {
      this.dataService.diagnosisStatusChange(this.ticketId, stage, this.diagnosisHd.id, this.L1L2DeclineReview, '0', '')
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              if ((stage !== 'L1-Approved')) {
                this.modalService.dismissAll();
                this.getdata(this.ticketId);
              } else {
                if (this.data.warranty_status === 'Customer Satisfaction (CS) Code') {
                  this.URDUpdate();
                } else if (this.repairType === 'SVNR') {
                  let currentDate: any = new Date();
                  if ((currentDate.getTime() - this.bsValue.getTime()) > (14 * 24 * 60 * 60 * 1000)) {
                    this.dataService.updateUrdPayment(this.ticketId)
                      .subscribe({
                        next: (data: any) => {
                        }, // success path
                        error: (error: any) => this.error = error // error path
                      });
                    this.getdata(this.ticketId);
                  } else {
                    this.getdata(this.ticketId);
                  }
                } else {
                  this.getdata(this.ticketId);
                }
              }
              this.buttonSpin = false;
            } else {
              this.simpleAlert = { title: 'L1 Approve/Decline', msg: result.message };
              this.openModal(simple_alert);
              this.buttonSpin = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  L2Reject(l2_decline: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(l2_decline);
  }

  L2Approve(l2_approve_confirm_temp: TemplateRef<any>) {
    if ((this.data.status_id === '900') && (this.repairType === 'CIN') && (this.data.serial_no.substring(0, 2).toLowerCase() === 'zz') && !this.zzInvoiceValidated) {
      this.openModal(this.zzInvoiceTemp);
      this.buttonSpin = false;
      return;
    }
    this.openModal(l2_approve_confirm_temp);
    
  }

  L2ApproveReject(stage: string) {
    this.buttonSpin = true;
    let result;
    let callL2Change;
    let kbbSerialVerified = false;
    if ((this.data.purchased_in === 'India') || (this.data.product_family === 'Mac')) {
      this.oocCheck = true;
    }
    if (this.popAppleReviewHold === true && !this.selectedParts.some((part: any) => part.fromConsignedStock === true)) {
      alert('Use Consignment Part is required when POP Apple Review Hold is enabled');
      this.buttonSpin = false;
      return;
    }

    if (this.popAppleReviewHold === false && this.selectedParts.some((part: any) => part.fromConsignedStock === true) && (this.data.serial_no.substring(0, 2).toLowerCase() === 'zz') ) {
      alert('Enable POP Apple Review Hold when consignment part is used');
      this.buttonSpin = false;
      return;
    }

    
    if ((this.repairType === 'CIN') && (!this.oocCheck) && (this.diagnosisHd.additional_part !== '1')) {
      alert('POP is not validated, its force Mail-In to Apple RC');
      this.buttonSpin = false;
      return;
    }
    let popReview: any;
    if (this.popAppleReviewHold === false) {
      popReview = 0;
    } else {
      popReview = 1;
    }


    if ((stage === 'L2-Approved') || (stage === 'L2-Approved-Additional-Part')) {
      // console.log(kbbSerialVerified);
      // console.log(this.kbbDisplayDiagSerial);
      // console.log(this.kbbSerialNoVerified);
      if ((this.kbbDisplayDiagSerial === '')) {
        kbbSerialVerified = true;
      } else {
        if ((this.kbbSerialNoVerified === '1')) {
          kbbSerialVerified = true;
        } else {
          kbbSerialVerified = false;
          alert('KBB Image Serial number not verified');
          this.buttonSpin = false;
          return;
        }
      }
      callL2Change = true;
    } else {
      if (this.L1L2DeclineReview !== '') {
        callL2Change = true;
        kbbSerialVerified = true;
      } else {
        callL2Change = false;
        this.notfilled = true;
      }
    }

    let gsxStatusMatch = false;

    if (this.data.gsx_status_code === '') {
      gsxStatusMatch = false;
      alert(`You can't do this action now. Please reload the page and then retry.`);
      return;
    }
    if (((stage === 'L2-Approved') || (stage === 'L2-Approved-Additional-Part')) && ((this.data.gsx_status_code !== 'GX02') && (this.data.gsx_status_code !== 'GX01') && (this.data.gsx_status_code !== 'GX08') && (this.data.gsx_status_code !== 'SCNC') && (this.data.gsx_status_code !== 'SPCM') && (this.data.gsx_status_code !== 'SCOM'))) {
      gsxStatusMatch = true;
    } else {
      if (((stage === 'L2-Declined') || (stage === 'L2-Declined-Additional-Part')) && ((this.data.gsx_status_code === 'GX02') || (this.data.gsx_status_code === 'PCNC') || (this.data.gsx_status_code === 'SCNC'))) {
        gsxStatusMatch = true;
      } else {
        alert(`GSX status mismatching. Please check again.`);
        gsxStatusMatch = false;
      }
    }

    // gsxStatusMatch = true; // L2 approval Exception

    if ((callL2Change === true) && (kbbSerialVerified) && (gsxStatusMatch)) {
      this.dataService.diagnosisStatusChange(this.ticketId, stage, this.diagnosisHd.id, this.L1L2DeclineReview, popReview, '')
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.getdata(this.ticketId);
              this.modalService.dismissAll();
              this.buttonSpin = false;
            } else {
              alert(result.message);
              this.buttonSpin = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  ticketBinChange(customer_paid: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(customer_paid);
  }

  validateInvoiceId(toStatusId: any) {
    let result: any = [];
    // const rafNo = this.data.branch_code + this.ticketId;
    // this.dataService.checkInvoiceId(rafNo, this.customerInvoiceId, this.data.ticket_date, this.diagnosisHd.quotation_id)//commented because added new api for advance validation
    this.dataService.validateAdvance(this.ticketId, this.customerInvoiceId, this.data.ticket_date, this.diagnosisHd.quotation_id)
      .subscribe({
        next: (data: any) => {
          result = data;
          this.modalService.dismissAll();
          if (result.status === true) {
            if (this.data.status_id === '2820') {
              this.reQuotePaidNonEbs();
            } else {
              //Enable this after POS invoice integration
              this.customerInvoiceDateTime = result.data.Response.WsTransaction.SalesOrder.OrderTime;
              this.invoiceAmount = result.data.Response.WsTransaction.SalesOrder.TotalValue;
              // this.invoiceAmount = '';
              this.binChangetoSparetobeOrder(toStatusId);
            }
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  binChangetoSparetobeOrder(toStatusId: any) {
    let result: any = [];
    const re = /\-/gi;
    // const invoiceDate = this.customerInvoiceDateTime.replace(re, '/');
    // const invoiceDateTime = new Date(invoiceDate + ' UTC');
    // const paymentDateTime = this.datePipe.transform(invoiceDateTime, 'yyyy-MM-dd HH:mm:ss');
    const invoiceDate = this.customerInvoiceDateTime.split(' ');
    const datePart = invoiceDate[0];
    const timePart = invoiceDate[1].split('.')[0];
    const paymentDateTime = `${datePart} ${timePart}`;
    // const paymentDateTime = '';
    this.dataService.changeBinManually(this.ticketId, toStatusId, this.customerInvoiceId, paymentDateTime, this.invoiceAmount)
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

  reQuotePaidNonEbs() {
    let result: any = [];
    this.dataService.reQuoteNonEbs(this.ticketId, this.customerInvoiceId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.gsxStatusRefresh();
            this.getdata(this.ticketId);
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  paymentDeclined(payment_decline_temp: TemplateRef<any>) {
    this.openModal(payment_decline_temp);
  }

  CustomerDeclined() {
    let result: any;

    if (!this.paymentDeclinedReason || this.paymentDeclinedReason.trim() === '') {
      this.notfilled = true;
      return;
    }

    this.notfilled = false;

    this.dataService.diagnosisStatusChange(
      this.ticketId, 'In-Diagnosis', this.diagnosisHd.id, this.paymentDeclinedReason, '0', '')
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.getdata(this.ticketId);
          } else {
            alert(result.message);
          }
        },
        error: (error: any) => this.error = error
      });
  }


  CustomerDeclinedReQuote() {
    let r;
    r = confirm('Please Confirm, this is not reversible');
    if (r === true) {
      let result;
      this.dataService.updateGSXReQuoteStatus(this.repairType, this.data.g_number, 'RQRJ', this.ticketId, this.diagnosisHd.quotation_id)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.gsxStatusRefresh();
              this.simpleAlert = { title: 'Re-Quotation', msg: result.message };
            } else {
              this.simpleAlert = { title: 'Re-Quotation', msg: result.message };
            }
          });
    }
  }

  closeReviveRepair() {
    let result;
    this.dataService.updateGSXStatus(this.repairType, this.data.g_number, 'SPCM')
      .subscribe(
        (data: any) => {
          result = data;
          this.dataService.closeReviveRepair(this.ticketId)
            .subscribe(
              (data: any) => {
                result = data;
                if (result.status === true) {
                  this.buttonSpin = false;
                  this.getdata(this.ticketId);
                } else {
                  this.simpleAlert = { title: 'Close Revive Repair', msg: result.message };
                }
              });
        });
  }

  appleDeclinedUpdate(reRepair: string) {
    this.buttonSpin = true;
    if ((reRepair === '0') && ((this.svcRemarks === this.diagnosisHd.technician_note) || (this.svcRemarks === ''))) {
      alert('Please update the SVC Remarks');
      this.buttonSpin = false;
    } else {
      let result;
      this.dataService.appleDeclineReturn(this.ticketId, reRepair)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.getdata(this.ticketId);
            } else {
              alert(result.message);
            }
            this.buttonSpin = false;
          });
    }
  }

  updateGSXStatus() {
    let result;
    let isReviveRepair = false;
    let r;
    for (let l = 0; l < this.selectedParts.length; l++) {
      if ((this.selectedParts[l].number === '011-00211') || (this.selectedParts[l].number === '011-00224')) {
        isReviveRepair = true;
        r = confirm('Are sure want to close the Revive Repair?. This will not reversible');
        if (r === true) {
          this.dataService.updateGSXStatus(this.repairType, this.data.g_number, 'SPCM')
            .subscribe(
              (data: any) => {
                result = data;
                if (result.status === true) {
                  this.closeReviveRepair();
                } else {
                  alert(result.message);
                }
              });
        }
        break;
      }
    }

    if (!isReviveRepair) {
      alert(`This is not a Revive Repair. So you can't close this repair`);
    }
  }

  updateKgbInward(selectedPart: { number: string; consignmentASN: string; }, kgbInwardTemp: TemplateRef<any>) { // For Service Team
    this.kgbSelectedPart = selectedPart.number;

    this.GSXParts(this.data.g_number);

    if (selectedPart.consignmentASN !== '0') {
      let result;
      this.dataService.getConsignment(selectedPart.consignmentASN)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.kgbDeviceDetail = result.items[0].serial_no;
            } else {
              this.modalService.dismissAll();
              alert(result.gsx_response.outcome.reasons[0].messages[0].description);
            }
          });
    }
    /* if (selectedPart.consignmentType === 'AP') {
      this.GSXParts(this.data.g_number);
      this.gsxInwardCheck = true;
    } else {
      this.gsxInwardCheck = false;
    }
  }*/

    if ((this.repairType === 'CIN') || (this.repairType === 'OSR') || (this.repairType === 'OSCR')) {
      for (let i = 0; i < this.diagnosisDt.length; i++) {
        if (this.diagnosisDt[i].part_number === this.kgbSelectedPart) {
          if (this.exKBBDisplayPartNo === this.kgbSelectedPart) {
            this.kbbDeviceDetail = this.kbbDisplayDiagSerial;
            this.exKBBDisplayAvail = true;
          } else if (this.diagnosisDt[i].kbb_serial_no !== '') {
            this.kbbDeviceDetail = this.diagnosisDt[i].kbb_serial_no;
            if (this.kbbDeviceDetail !== '') {
              this.exKBBDisplayAvail = true;
            }
            this.kgbDeviceDetail = this.diagnosisDt[i].kgb_serial_no;
            this.kgbAWBNo = this.diagnosisDt[i].kgb_awb_no;
            this.kgbPartNo = this.kgbSelectedPart;
            if (this.diagnosisDt[i].from_consigned_stock === '0') {
              this.isConsignment = false;
            } else {
              this.isConsignment = true;
            }
          } else {
            this.kbbDeviceDetail = '';
            this.exKBBDisplayAvail = false;
          }
          break;
        }
      }
    }
    for (let a = 0; a < this.diagnosisDt.length; a++) {
      if ((this.kgbSelectedPart === this.diagnosisDt[a].part_number) && (this.diagnosisDt[a].consignment_asn_no !== '0')) {
        this.kgbDeviceDetail = this.diagnosisDt[a].kgb_serial_no;
        this.exKGBSerialAvail = true;
      }
      /* if (this.diagnosisDt[a].consignment_type === 'AP') {
      this.gsxInwardCheck = true;
    } else {
      this.gsxInwardCheck = false;
    } */
    }
    this.openModal(kgbInwardTemp);
  }

  saveKgbDetail() {
    let result;
    let asnNo;
    let gsxInwardtype;

    if (this.gsxInwardCheck === true) {
      console.log('GSX' + this.gsxInwardCheck);
      gsxInwardtype = '1';
    } else {
      gsxInwardtype = '0';
    }

    if (this.diagnosisHd.componet === 'ZM923-01228') {
      gsxInwardtype = '0';
    }

    /* if ((this.data.site_type_id === '2') && (this.data.status_id === '8610')) {
      gsxInwardtype = '0';
    } */

    if ((this.repairType === 'CIN') || (this.repairType === 'OSR') || (this.repairType === 'OSCR')) {
      if ((((this.kgbDeviceDetail === '') || (this.kgbAWBNo === '') || (this.kgbToteId === ''))) && (this.kbbNotRequired === true)) {
        this.notfilled = true;
      } else if ((this.kbbNotRequired === false) && ((this.kgbDeviceDetail === '') || (this.kbbDeviceDetail === '') || (this.kgbAWBNo === '') || (this.kgbToteId === ''))) {
        this.notfilled = true;
        return;
      } else {
        this.notfilled = false;
      }
    } else {
      if ((this.kgbDeviceDetail === '') || (this.kgbPartNo === '') || (this.kgbAWBNo === '') || (this.kgbToteId === '')) {
        this.notfilled = true;
        return;
      } else {
        this.notfilled = false;
      }
    }

    if (this.data.site_type_id === '1') {
      for (let i = 0; i < this.diagnosisDt.length; i++) {
        if (this.diagnosisDt[i].part_number === this.kgbSelectedPart) {
          asnNo = this.diagnosisDt[i].consignment_asn_no;
        }
      }
    } else {
      asnNo = '';
    }

    if (this.notfilled === false) {
      if (this.kgbPartSequenceNo === undefined) {
        this.kgbPartSequenceNo = '1';
      }

      if (this.kbbNotRequired) {
        this.kbbDeviceDetail = '';
      }

      for (let i = 0; i < this.diagnosisDt.length; i++) {
        if (this.diagnosisDt[i].part_number === this.kgbSelectedPart) {
          if (this.diagnosisDt[i].kbb_entry_type === 'KGB') {
            this.kbbDeviceDetail = this.kgbDeviceDetail.slice(0, -1);
          }
          break;
        }
      }

      if (this.isSubstitutePart) {
        this.kgbSelectedPart = this.substituteParNo;
      }

      const form = '&update_type=' + 'KGBKBBUpdate' + '&kbb_device_detail=' + encodeURIComponent(this.kbbDeviceDetail) + '&kgb_device_detail=' + encodeURIComponent(this.kgbDeviceDetail) + '&part_number=' + this.kgbSelectedPart
        + '&repair_id=' + this.gsxNo + '&from_consignment=' + this.isConsignment + '&asn_no=' + asnNo + '&ticket_id=' + this.ticketId + '&repair_type=' + this.repairType + '&sequence_number=' + this.kgbPartSequenceNo +
        '&kgb_part_no=' + this.kgbPartNo + '&kgb_airway_bill_no=' + this.kgbAWBNo + '&inward_in_gsx=' + gsxInwardtype + '&kgb_tote_id=' + this.kgbToteId;
      this.dataService.updateKgbDetails(form)
        .subscribe({
          next: (data: any) => {
            result = data;
            this.modalService.dismissAll();
            // this.getdata(this.ticketId);
            this.UpdateToteTracker(this.ticketId, this.kgbToteId);
            if (this.data.status_id === '1600') {
              this.buttonSpin = false;
              const kgbdetails = 'KGB Part Detail: ' + this.kgbSelectedPart  + 'KGB Serial Number: ' + encodeURIComponent(this.kgbDeviceDetail);
              this.dataService.updateTechnicianNotes(kgbdetails, this.gsxNo, this.ticketId, this.repairType)
                .subscribe({
                  next: (data: any) => {
                    if (data.status === true) {
                      this.getdata(this.ticketId);
                    } else {
                      alert(data.message);
                    }
                  },
                  error: (error: any) => this.error = error
                });
            } else {
              if (result.gsx_response.errors) {
                alert(result.gsx_response.errors[0].message);
                this.buttonSpin = false;
              } else {
                alert(result.message);
                this.buttonSpin = false;
              }
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }
  UpdateToteTracker(ticketId: string, kgbToteId: string) {

  this.dataService.updateToteTracker(ticketId, kgbToteId).subscribe({
    next: (data: any) => {
      this.modalService.dismissAll();
      this.getdata(ticketId);
    },
    error: () => {
      console.error('Tote tracker update failed');
    }
  });
}

  applyGPR(selectedPart: { number: any; }, GPR_temp: TemplateRef<any>) {
    this.gprDoaSelectedPart = selectedPart;
    this.GSXParts(this.data.g_number);
    let result;
    this.dataService.getPartPrice(selectedPart.number)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.partPrice = result.price[0].stock_price;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
    setTimeout(() => {
      this.openModal(GPR_temp);
    }, 3000);
  }

  submitGPR(simple_alert_temp: any) {
    let result;
    if ((this.gprReason !== 'Select') && (this.gprType !== 'Select') && (this.gprDoaTechComment !== '')) {
      const form = '&update_type=' + 'UpdateRepairGPR' + '&technician_comment=' + encodeURIComponent(this.gprDoaTechComment) + '&part_number=' + this.gprDoaPart.number + '&kgb_serial_no=' + this.grpDoaKGBSerial + '&return_status_reason_code=' + this.gprReason
        + '&return_status_subtypecode=' + this.gprType + '&sequence_number=' + this.gprDoaPart.sequenceNumber + '&repair_type=' + this.repairType + '&repair_id=' + this.gsxNo +
        '&ticket_id=' + this.ticketId;
      this.dataService.applyGPRDOA(form)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.simpleAlert = { title: 'Good Part Return', msg: result.message };
              this.openModal(simple_alert_temp);
              this.getdata(this.ticketId);
            } else {
              this.modalService.dismissAll();
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      this.notfilled = true;
    }
  }

  applyDOA(selectedPart: { number: any; }, DOA_temp: TemplateRef<any>) {
    this.gprDoaSelectedPart = selectedPart;
    this.GSXParts(this.data.g_number);
    let result;
    this.gsxComponentIssues.forEach((component: any) => {
      component.displayLabel = component.componentCode + ' - ' + component.componentDescription;
    });
    this.dataService.getPartPrice(selectedPart.number)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.partPrice = result.price[0].stock_price;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
    setTimeout(() => {
      this.openModal(DOA_temp);
    }, 2000);
  }

  doaComptiaCheck(event: any) {
    // this.doaComponentCode = event.comptia;
  }

  doaComponentSelect(event: any) {
    this.doaComponentCode = event.componentCode;
    this.doaComponent = event.componentDescription;
    this.doaIssue = '';
    this.doaIssueList = _.filter(this.gsxComponentIssues, row => row.componentCode === this.doaComponentCode);
    this.doaIssueList[0].issues.forEach((issue: any) => {
      issue.displayLabel = issue.code + '-' + issue.description;
    });
  }

  submitDOA(simple_alert_temp: any) {
    if (this.doaComponent !== '' && this.doaIssue !== '') {
      this.doaIssueCode = this.doaIssue;
    }
    let result;
    if ((this.doaIssueCode !== '') && (this.doaReproducibility !== '') && (this.gprDoaTechComment !== '')) {
      const form = '&update_type=' + 'UpdateRepairDOA' + '&technician_comment=' + encodeURIComponent(this.gprDoaTechComment) + '&part_number=' + this.gprDoaPart.number + '&kgb_serial_no=' + this.grpDoaKGBSerial +'&component_code=' + this.doaComponentCode
        + '&reproducibility=' + this.doaReproducibility + '&issue_code=' + this.doaIssueCode + '&sequence_number=' + this.gprDoaPart.sequenceNumber + '&repair_type=' + this.repairType + '&repair_id=' + this.gsxNo +
        '&ticket_id=' + this.ticketId;
      this.dataService.applyGPRDOA(form)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.simpleAlert = { title: 'Dead on Arrival', msg: result.message };
              this.openModal(simple_alert_temp);
              this.getdata(this.ticketId);
            } else {
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      this.notfilled = true;
    }
  }

  hideGRPDOAModel() {
    this.buttonSpin = false;
    this.gprDoaTechComment = '';
    this.gprReason = 'Select';
    this.gprType = 'Select';
    this.modalService.dismissAll();
  }

  techNotesUpdate(technician_notes: TemplateRef<any>) {
    this.diagIssue = '';
    this.diagReproduce = '';
    this.diagPerformed = '';
    this.diagCondition = '';
    this.diagResolution = '';
    this.openModal(technician_notes);
  }

  saveTechnicianNotes(simple_alert: TemplateRef<any>) {
    let result: any;
    if ((this.diagIssue === '' || this.diagIssue === undefined) || (this.diagReproduce === '' || this.diagReproduce === undefined) || (this.diagPerformed === '' || this.diagPerformed === undefined) || (this.diagCondition === '' || this.diagCondition === undefined) || (this.diagResolution === '' || this.diagResolution === undefined)) {
      this.notfilled = true;
      this.buttonSpin = false;
      return;
    }
    this.technicianNotes =   'Issue:- ' + (this.diagIssue || '').replace(/\n+/g, ' ') + '\n' +
  'Steps to Reproduce:- ' + (this.diagReproduce || '').replace(/\n+/g, ' ') + '\n' +
  'Diagnosis Performed:- ' + (this.diagPerformed || '').replace(/\n+/g, ' ') + '\n' +
  'Cosmetic Condition:- ' + (this.diagCondition || '').replace(/\n+/g, ' ') + '\n' +
  'Resolution:- ' + (this.diagResolution || '').replace(/\n+/g, ' ');

    this.dataService.updateTechnicianNotes(this.technicianNotes, this.gsxNo, this.ticketId, this.repairType)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.modalService.dismissAll();
            this.simpleAlert = { title: 'Technician Notes', msg: result.message };
            this.openModal(simple_alert);
            this.getdata(this.ticketId);
          } else {
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  /************* POP Upload ********************/

  onFileUploadfun(event: { target: { files: any[]; }; }) {
    this.buttonSpin = true;
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      this.imageTemp = event.target.files[0];
      reader.readAsDataURL(this.imageTemp);
      reader.onload = () => { // called once readAsDataURL is completed
        this.selectedFile = reader.result;
        this.dcolor = false;
      };
    }
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
              this.buttonSpin = false;
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

  makeCall(phoneNo: any, call_alert: TemplateRef<any>) {
    this.buttonSpin = true;
    this.selectedCustomerPhone = phoneNo;
    let result: any = [];
    this.dataService.makeCall(this.ticketId, phoneNo)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonSpin = false;
            this.openModal(call_alert);
          } else {
            this.buttonSpin = false;
            alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getPhoneCalls(phoneNo: any, call_log_alert: TemplateRef<any>) {
    this.buttonSpin = true;
    let results: any = [];
    let resultTemp: any = [];
    this.customerPhoneLogs = [];
    this.selectedCustomerPhone = phoneNo;
    this.dataService.getPhoneCalls(this.ticketId, phoneNo)
      .subscribe({
        next: (data: any) => {
          results = data;
          if (results.status === true) {
            resultTemp = results.tata_record.results;
            for (let i = 0; i < resultTemp.length; i++) {
              resultTemp[i].isPlay = false;
              const clientNumber = resultTemp[i].client_number.slice(resultTemp[i].client_number.length - 10);
              if (phoneNo === clientNumber) {
                this.customerPhoneLogs.push(resultTemp[i]);
              }
            }
          }
          this.openModal(call_log_alert);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  playAudio(call: { recording_url: string; id: any; isPlay: boolean; }) {
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

  stopAudio(call: { isPlay: boolean; }) {
    this.callAudio.pause();
    call.isPlay = false;
  }

  closeCallDialog() {
    this.buttonSpin = false;
    this.callAudio.pause();
    this.modalService.dismissAll();
  }

  /* ******************* Time Line Data ******************* */
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

  /* ******************* Documents ******************* */
  getDocuments(ticketId: string | null) {
    let result: any = [];
    this.quoteDocuments = [];
    this.documents = [];
    this.kbbDisplayImageList = [];
    this.dataService.getDocuments(ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          let onsiteData = result;
          if (result.length === 0 || this.siteType === '2') {
            // this.isExDocuments = false;
            this.userDataService.getS3FileDetails(this.ticketId)
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
                    if (this.siteType === '2') {
                      if (onsiteData.length !== 0) {
                        this.documentsCheck(onsiteData, 'docS3');
                      }
                    }
                  }
                }, // success path
                error: (error: any) => this.error = error // error path
              });
          } else {
            this.documentsCheck(result, 'nonS3');
          }
          this.documentType = 'Select document type';
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  documentsCheck(result: any, type: any) {
    let qdocs: any = [];
    let kdocs: any;
    let docs: any = [];
    if (type === 'S3') {
      this.isS3Document = true;
    } else if (type === 'nonS3') {
      this.isS3Document = false;
    } else {
      this.onsiteQuoteDocExists = true;
    }
    for (let i = 0; i < result.length; i++) {
      if (((result[i].document_type === 'Quotation') || (result[i].document_type === 'Purchase Order') || (result[i].document_type === 'Invoice')) || ((result[i].type === 'Quotation') || (result[i].type === 'Purchase Order') || (result[i].type === 'Invoice'))) {
        qdocs = result[i];
        if (this.siteType === '2') {
          result[i].quoteFrom = type;
        }
        this.quoteDocuments = Array.prototype.concat.apply([], [qdocs, this.quoteDocuments]);
        this.isExQuoteDocuments = true;
        if (this.data.opf_ref_no !== '') {
          this.quoteDocuments.push({
            date: '',
            document_type: 'OPF',
            file_name: '',
            opf_no: this.data.opf_ref_no,
          });
        }
        /* if (result[i].document_type === 'Invoice') {
          this.isInvoiceUpdated = true;
        } */
      } else {
        if (((result[i].document_type === 'AST MRI') || (result[i].document_type === 'Display Panel') || (result[i].document_type === 'Barcode Serial')) || ((result[i].type === 'AST MRI') || (result[i].type === 'Display Panel') || (result[i].type === 'Barcode Serial'))) {
          kdocs = result[i];
          kdocs.removeDocOpt = true;
          this.kbbDisplayImageList.push(kdocs);
        } else {
          if (type === 'S3') {
            if (result[i].type === 'ID' || result[i].type === 'mesh' || result[i].type === 'Video' || result[i].type === 'Other' || result[i].type === 'POP' || result[i].type === 'Device images') {
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
    }

    /* for (let j = 0; j < result.length; j++) {
      if (this.documents.length !== 0) {
        if (((result[j].document_type === 'customer_pop') || (result[j].document_type === 'customer_id')) || ((result[j].type === 'POP') || (result[j].type === 'ID')) ) {
          this.documents[j].removeDocOpt = false;
        } else {
          this.documents[j].removeDocOpt = true;
        }
      }
    } */
    for (let j = 0; j < result.length; j++) {
      const index = this.documents.findIndex((document: { id: any; }) => document.id === result[j].id);
      if (index !== -1) {
        if (
          (result[j].document_type === 'customer_pop' || result[j].document_type === 'customer_id') ||
          (result[j].type === 'POP' || result[j].type === 'ID')
        ) {
          this.documents[index].removeDocOpt = false;
        } else {
          this.documents[index].removeDocOpt = true;
        }
      }
    }
    this.documentType = 'Select document type';
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

    // Document type validation
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

    // Description check
    if (desc === '') {
      alert('Please enter the description');
      this.buttonSpin = false;
      return;
    }

    // Prepare file data
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

      // File type restrictions
      if (this.documentType === 'Device images') {
        const allowedDeviceImageTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
        if (!allowedDeviceImageTypes.includes(this.documentTemp.type)) {
          alert('Device images must be PDF, PNG, JPG, or JPEG.');
          this.buttonSpin = false;
          return;
        }
      }

      if (this.documentType === 'Video') {
        const allowedVideoTypes = ['video/mp4', 'video/quicktime']; // quicktime = MOV
        if (!allowedVideoTypes.includes(this.documentTemp.type)) {
          alert('Video must be MP4 or MOV.');
          this.buttonSpin = false;
          return;
        }
      }

      // File size check - 50 MB
      if (this.documentTemp.size <= 50000000 || this.documentType === 'Video') {
        let blobData;
        let file: any;

        // Correct MIME type handling
        blobData = this.convertBase64ToBlob(this.selectedFile);
        file = new Blob([blobData], { type: this.documentTemp.type });

        // ===== Filename handling with version increment for all types =====
        let existingFiles = this.S3Data.filter((f: { type: string }) => f.type === this.documentType);
        let filename = '';
        if (existingFiles.length > 0) {
          const lastUploadedFile = existingFiles[existingFiles.length - 1];
          const fileID = lastUploadedFile.file_id.split('_')[0]; // e.g., "Video3"
          const match = fileID.match(/\d+$/);
          let increment = match ? +match[0] + 1 : 1;
          filename = this.documentType + increment + '_' + this.ticketId + '.' + this.documentTemp.type.split('/')[1];
        } else {
          filename = this.documentType + '1_' + this.ticketId + '.' + this.documentTemp.type.split('/')[1];
        }

        let type = this.documentType;

        // S3 upload
        const bucketName = 'icare-raf';
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
        this.dError = 'File size should be less than 50MB';
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

  updateS3Data(file: any, filename: any, type: any, desc: any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year + '/' + month + '/' + day + '/' + this.ticketId;
    const commonData = '&ticket_id=' + this.ticketId + '&type=' + type + '&side=' + desc + '&bucket_name=' + 'icare-raf' + '&name=' + filename + '&folder=' + folder;

    this.userDataService.updateS3File(commonData)
      .subscribe({
        next: (data: any) => {
          this.buttonSpin = false;
          alert('File has been uploaded successfully');
          this.getDocuments(this.ticketId);
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  typeExistsInDocumentTypes(type: string): boolean {
    return (this.documentTypes.some(docType => docType.value === type) || type === 'RAF');
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

  /* ********** Onsite Quote/OPF/Invoice/DC Upload *********** */

  quotRefNoUpdate(simple_alert_temp: TemplateRef<any>) {
    let result: any;
    this.dataService.quotationRefUpdate(this.ticketId, this.quoteOpf)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  onSiteFileUpload(event: { target: { files: any[]; }; }) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      this.quoteDocumentTemp = event.target.files[0];
      reader.readAsDataURL(this.quoteDocumentTemp);
      reader.onload = () => { // called once readAsDataURL is completed
        this.selectedFile = reader.result;
        this.qcolor = false;
      };
    }
  }

  onsiteQuoteOpfUpload(desc: any) {
    this.buttonSpin = true;
    const today = new Date().toDateString();
    const docs: any = [];
    let quoteOpffail = false;
    let blobData: any;
    let file: any;
    let filename: any;

    if (this.data.status_id === '8650') {
      if (this.quoteDocumentTemp.length !== 0) {
        docs.push({
          document_type: 'Invoice',
          file_name: this.quoteDocumentTemp.name,
          extension: this.quoteDocumentTemp.type.split('/')[1],
          date: today,
          file: this.selectedFile,
          description: desc
        });
      }

      if (this.quoteDocumentTemp.size <= 5000000) {
        /* this.dataService.uploadDocuments(this.ticketId, docs)
          .subscribe({
            next: (responseList: any) => {
              this.quoteDocumentTemp = [];
              this.getdata(this.ticketId);
              this.buttonSpin = false;
            }, // success path
            error: (error: any) => this.error = error // error path
          }); */
        filename = this.quoteType + '_' + this.ticketId + '.' + this.quoteDocumentTemp.type.split('/')[1];
        blobData = this.convertBase64ToBlob(this.selectedFile);
        file = new Blob([blobData], { type: "image/png" });
        let type = this.quoteType;
        const bucketName = 'icare-raf';
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = String(today.getFullYear()).padStart(2, '0');
        const folder = year + '/' + month + '/' + day + '/' + this.ticketId;
        this.userDataService.uploadFileToS3Bucket(file, bucketName, filename, folder)
          .then((fileUrl) => {
            this.updateS3Data(file, filename, type, desc);
          })
          .catch((error) => {
            alert('Error uploading file:' + error);
          });
      } else {
        alert('File size should be less than 5MB');
        this.buttonSpin = false;
      }
    } else {
      if (this.quoteType === 'Quotation') {
        if (this.quoteOpf === '') {
          alert('Please enter the Quotation Id');
          this.buttonSpin = false;
          quoteOpffail = true;
          return;
        } else {
          quoteOpffail = false;
        }

        if (this.quoteDocumentTemp.length !== 0) {
          docs.push({
            document_type: this.quoteType,
            file_name: this.quoteDocumentTemp.name,
            extension: this.quoteDocumentTemp.type.split('/')[1],
            date: today,
            file: this.selectedFile,
            description: desc
          });
        } else {
          this.qbcolor = true;
        }

        if ((this.dcolor === false) && (this.bcolor === false) && (this.quoteType === 'Quotation')) {
          if (this.quoteDocumentTemp.size <= 5000000) {
            filename = this.quoteType + '_' + this.ticketId + '.' + this.quoteDocumentTemp.type.split('/')[1];
            blobData = this.convertBase64ToBlob(this.selectedFile);
            file = new Blob([blobData], { type: "image/png" });
            let type = this.quoteType;
            const bucketName = 'icare-raf';
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = String(today.getFullYear()).padStart(2, '0');
            const folder = year + '/' + month + '/' + day + '/' + this.ticketId;
            this.userDataService.uploadFileToS3Bucket(file, bucketName, filename, folder)
              .then((fileUrl) => {
                this.updateS3Data(file, filename, type, desc);
              })
              .catch((error) => {
                alert('Error uploading file:' + error);
              });
            this.dataService.updateQuotaion(docs, this.ticketId, this.quoteOpf)
              .subscribe({
                next: (responseList: any) => {
                  this.quoteDocumentTemp = [];
                  this.getdata(this.ticketId);
                  this.quoteOpf = '';
                  this.buttonSpin = false;
                  this.qError = '';
                }, // success path
                error: error => this.error = error // error path
              });
            this.dcolor = false;
          } else {
            this.qError = 'File size should be less than 5MB';
            this.buttonSpin = false;
          }
        } else {
          this.buttonSpin = false;
        }
      } else if (this.quoteType === 'OPF') {
        let result: any;
        this.dataService.saveOpfRef(this.ticketId, this.quoteOpf)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.getdata(this.ticketId);
                this.buttonSpin = false;
              } else {
                alert(result.message);
                this.buttonSpin = false;
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }
    }
  }

  /* ******************* Quotation ******************* */

  quoteRequest() {
    let result: any;
    this.dataService.requestQuote(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
            this.buttonSpin = false;
          } else {
            alert(result.message);
            this.buttonSpin = false;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  checkQuote(create_quote_temp: TemplateRef<any>, gsx_part_list: TemplateRef<any>, simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.createQuoteTemp(create_quote_temp);
    /* if (this.data.status_id === '2800') {
      this.getRepair(simple_alert_temp);
      setTimeout(() => {
        if (this.gsxRepairs.dt.length !== 0) {
          for (let i = 0; i < this.gsxRepairs.dt.length; i++) {
            let partAvail = false;
            for (let j = 0; j < this.selectedParts.length; j++) {
              if (this.selectedParts[j].number === this.gsxRepairs.dt[i].number) {
                partAvail = true;
                break;
              }
            }
            if (partAvail === false) {
              this.gsxRepairs.dt[i].isCheck = false;
              this.rcAddedParts.push(this.gsxRepairs.dt[i]);
            }
          }
          console.log(this.rcAddedParts);
          if (this.rcAddedParts.length !== 0) {
            this.openModal(gsx_part_list);
            this.buttonSpin = false;
          } else {
            this.createRCQuote(create_quote_temp);
          }
        } else {
          alert('GSX data fetching failed. Please try again');
          this.buttonSpin = false;
        }
      }, 8000);
    } else {
      this.createQuoteTemp(create_quote_temp);
    } */
  }

  GSXRepairPartSelect(part: { isCheck: any; number: any; typeDescription: string; description: any; componentIssue: { componentCode: any; issueCode: any; reproducibility: any; }; }, create_quote_temp: TemplateRef<any>) {
    let addPart = false;
    let partAvail = false;
    if ((this.data.status_id === '2800')) {
      this.noAdditionalPart = false;
      if (part.isCheck) {
        if (this.gsxAdditionalParts.length === 0) {
          addPart = true;
        } else {
          for (let j = 0; j < this.gsxAdditionalParts.length; j++) {
            if (part.number === this.gsxAdditionalParts[j].number) {
              partAvail = true;
            }
          }
          if (partAvail === false) {
            addPart = true;
          }
        }

        if (addPart) {
          if ((part.typeDescription === 'Module')) {
            this.gsxAdditionalParts.push({
              number: part.number,
              partUsed: part.number,
              description: part.description,
              typeDescription: part.typeDescription,
              fromConsignedStock: 0,
              componentCode: part.componentIssue.componentCode,
              issueCode: part.componentIssue.issueCode,
              reproducibility: part.componentIssue.reproducibility,
              readOnly: true,
              pricingCheckBox: false,
              pricingType: ''
            });
          } else {
            this.gsxAdditionalParts.push({
              number: part.number,
              partUsed: part.number,
              description: part.description,
              typeDescription: part.typeDescription,
              fromConsignedStock: 0,
              componentCode: '',
              issueCode: '',
              reproducibility: '',
              readOnly: true,
              pricingCheckBox: false,
              pricingType: ''
            });
          }
        }
      } else {
        for (let i = 0; i < this.gsxAdditionalParts.length; i++) {
          if (this.gsxAdditionalParts[i].number === part.number) {
            this.gsxAdditionalParts.splice(i, 1);
          }
        }
      }
    }
  }

  addGSXAdditionalPart(create_quote_temp: TemplateRef<any>) {
    let result: any;

    for (let i = 0; i < this.gsxAdditionalParts.length; i++) {
      for (let j = 0; j < this.selectedParts.length; j++) {
        if (this.selectedParts[j].number === this.gsxAdditionalParts[i].number) {
          this.gsxAdditionalParts.splice(i, 1);
          break;
        }
      }
    }

    if (this.gsxAdditionalParts.length !== 0) {
      this.dataService.appendRCParts(this.ticketId, this.gsxNo, this.diagnosisHd.id, this.gsxAdditionalParts)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.createQuoteTemp(create_quote_temp);
              this.buttonSpin = false;
            } else {
              alert(result.message);
              this.buttonSpin = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      this.modalService.dismissAll();
      this.createQuoteTemp(create_quote_temp);
    }
  }

  createQuoteTemp(create_quote_temp: TemplateRef<any>) {
    this.partDetails = [];
    let results: any = [];
    let allowGenerateQuote = false;
    this.quotationDiagnosisDetails = this.diagnosisHd.technician_note;
    if (this.quotations.length !== 0) {
      for (let i = 0; i < this.quotations.length; i++) {
        if (this.quotations[i].status !== 'Pending') {
          allowGenerateQuote = true;
        }
      }
    } else {
      allowGenerateQuote = true;
    }
    if (allowGenerateQuote === true) {
      // if (this.selectedParts.length !== 0) {
      if (this.data.status_id === '2800') {
        this.dataService.rcQuotationDraft(this.ticketId, this.diagnosisHd.id, this.serviceCharge)
          .subscribe({
            next: (data: any) => {
              results = data;
              if (results.status === true) {
                this.quotationHd = results.quotation.quote_hd;
                if (results.quotation.acs_part_no !== '') {
                  this.quotationACSPartNo = results.quotation.acs_part_no;
                  this.quotationACSPrice = results.quotation.acs_price;
                } else {
                  this.quotationDt = results.quotation.quote_dt;
                }
                this.quoteServiceCharge = +results.quotation.service_charge;
                this.consumableCharge = +results.quotation.consumable_charge;
                this.quotationTotal = results.quotation.total_amount;
              }
              this.buttonSpin = false;
              this.qError = '';
            }, // success path
            error: (error: any) => this.error = error // error path
          });
        this.isCreateQuote = 'true';
        this.openModal(create_quote_temp);
      } else {
        this.dataService.quotationDraft(this.ticketId, this.diagnosisHd.id, this.serviceCharge)
          .subscribe({
            next: (data: any) => {
              results = data;
              if (results.status === true) {
                this.quotationHd = results.quotation.quote_hd;
                if (results.quotation.acs_part_no !== '') {
                  this.quotationACSPartNo = results.quotation.acs_part_no;
                  this.quotationACSPrice = results.quotation.acs_price;
                } else {
                  this.quotationDt = results.quotation.quote_dt;
                }
                this.quoteServiceCharge = +results.quotation.service_charge;
                this.consumableCharge = +results.quotation.consumable_charge;
                this.quotationTotal = results.quotation.total_amount;
              }
              this.buttonSpin = false;
              this.qError = '';
            }, // success path
            error: (error: any) => this.error = error // error path
          });
        this.isCreateQuote = 'true';
        this.openModal(create_quote_temp);
      }
    } else {
      this.buttonSpin = false;
      alert('You cannot generate another quotation, if existing quotation is Pending');
    }
  }

  /* createRCQuote(create_quote_temp: TemplateRef<any>) {
    let results: any = [];
    let allowGenerateQuote = false;
    this.quotationDiagnosisDetails = this.diagnosisHd.technician_note;
    if (this.quotations.length !== 0) {
      for (let i = 0; i < this.quotations.length; i++) {
        if (this.quotations[i].status !== 'Pending') {
          allowGenerateQuote = true;
        }
      }
    } else {
      allowGenerateQuote = true;
    }
    if (allowGenerateQuote === true) {
      this.dataService.rcQuotationDraft(this.ticketId, this.diagnosisHd.id, this.serviceCharge)
        .subscribe({
          next: (data: any) => {
            results = data;
            if (results.status === true) {
              this.quotationHd = results.quotation.quote_hd;
              if (results.quotation.acs_part_no !== '') {
                this.quotationACSPartNo = results.quotation.acs_part_no;
                this.quotationACSPrice = results.quotation.acs_price;
              } else {
                this.quotationDt = results.quotation.quote_dt;
              }
              this.quoteServiceCharge = results.quotation.service_charge;
              this.quotationTotal = results.quotation.total_amount;
            }
            this.buttonSpin = false;
            this.qError = '';
          }, // success path
          error: (error: any) => this.error = error // error path
        });
      this.isCreateQuote = 'true';
      this.openModal(create_quote_temp);
    } else {
      alert('You cannot generate another quotation, if existing quotation is Pending');
    }
  } */

  getQuotation(id: string | null) {
    let results: any = [];
    this.dataService.getQuotation(id)
      .subscribe({
        next: (data: any) => {
          results = data;
          if (results.status === true) {
            this.quotations = results.quotations;
            for (let i = 0; i < this.quotations.length; i++) {
              if (this.quotations[i].status === 'Declined') {
                this.quotations[i].sendmail = false;
              } else {
                this.quotations[i].sendmail = true;
              }

              if ((this.quotations[i].requote === '1') && (this.quotations[i].status === 'Approved')) {
                if (this.data.status_id === '2400') {
                  this.isReQuoted = true;
                }
              } else {
                this.isReQuoted = false;
              }

              if (this.diagnosisHd.quotation_id === this.quotations[i].id) {
                this.currentQuoteStatus = this.quotations[i].status;
              }
            }

            //get Paynow status
            if (this.data.status_id === '700') {
              this.checkQuoteStatuses();
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  checkQuoteStatuses() {
    for (let i = 0; i < this.quotations.length; i++) {
      if ((this.quotations[i].transaction_id !== null) && (this.quotations[i].paynow_status !== 'Success') && (this.data.status_id === '700')) {
        this.dataService.quotationStatusCheck(this.ticketId, this.quotations[i].id, this.quotations[i].transaction_id)
          .subscribe({
            next: (data1: any) => {
              let paynowResult: any;
              paynowResult = data1;
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }
    }
  }

  viewQuoteTemp(view_quote: TemplateRef<any>) {
    this.buttonSpin = true;
    this.getQuotation(this.ticketId);
    setTimeout(() => {
      if (this.quotations.length) {
        this.openModal(view_quote);
        this.buttonSpin = false;
      } else {
        alert('No Quotations attached');
        this.buttonSpin = false;
      }
    }, 2000);
  }

  createQuote() {
    this.isCreateQuote = 'true';
  }
  generateQuote(simple_alert_temp: TemplateRef<any>) {
    const isAdvanceCollectedValue = this.isAdvanceCollected ? 1 : 0;
    this.buttonSpin = true;
    const serviceCharge = parseFloat(this.serviceCharge);
    const commonData = '&ticket_id=' + this.ticketId + '&hd_id=' + this.diagnosisHd.id + '&diagnosis=' + this.quotationDiagnosisDetails +
      '&service_charge=' + serviceCharge + '&is_advance_collected=' + isAdvanceCollectedValue;
    if (this.data.status_id !== '2800') {
      this.dataService.generateQuotation(commonData)
        .subscribe({
          next: (data: any) => {
            let result: any;
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              // this.getdata(this.ticketId);
              this.simpleAlert = { title: 'Quotation', msg: result.message };
              this.modalService.dismissAll();
              if (confirm("Success")) {
                location.reload();
              }
            }
            else {
              this.buttonSpin = false;
              this.modalService.dismissAll();
              this.simpleAlert = { title: 'Quotation', msg: result.message };
              this.openModal(simple_alert_temp);
              location.reload();

            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      this.dataService.generateRCQuotation(commonData)
        .subscribe({
          next: (data: any) => {
            let result: any;
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              this.getdata(this.ticketId);
              this.simpleAlert = { title: 'Quotation', msg: result.message };
              this.modalService.dismissAll();
              this.openModal(simple_alert_temp);
            } else {
              this.buttonSpin = false;
              this.modalService.dismissAll();
              this.simpleAlert = { title: 'Quotation', msg: result.message };
              this.openModal(simple_alert_temp);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  approveRejectSubmit(simple_alert_temp: TemplateRef<any>) {
    let result: any;
    this.dataService.approveRejectQuote(this.ticketId, this.approveReject, this.data.status_id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
            this.diagnosis = '';
            this.serviceCharge = '';
            this.modalService.dismissAll();
            this.simpleAlert = { title: this.approveReject.title, msg: result.message };
            this.getdata(this.ticketId);
            this.openModal(simple_alert_temp);
            this.approveReject = { id: '', tag: '', title: '', msg: '', visible: 'false' };
          } else {
            this.modalService.dismissAll();
            this.diagnosis = '';
            this.serviceCharge = '';
            this.simpleAlert = { title: this.approveReject.title, msg: result.message };
            this.getdata(this.ticketId);
            this.openModal(simple_alert_temp);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  resendQuote(qid: any, simple_alert_temp: TemplateRef<any>) {
    let result;
    this.dataService.resendQuotation(this.ticketId, qid)
      .subscribe({
        next: (data: any) => {
          result = data;
          this.modalService.dismissAll();
          if (result.status === true) {
            this.simpleAlert = { title: 'Quotation', msg: result.message };
            this.openModal(simple_alert_temp);
          } else {
            this.simpleAlert = { title: 'Quotation', msg: result.message };
            this.openModal(simple_alert_temp);
          }
        }
      });
  }

  downloadQuote(qid: any, simple_alert_temp: TemplateRef<any>) {
    const tab: any = window.open();
    this.dataService.downloadQuotation(this.ticketId, qid)
      .subscribe(
        (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
        });
  }

  deleteQuote(qtId: string, confirmDeleteQuote: TemplateRef<any>) {
    this.quoteId = qtId;
    this.modalService.dismissAll();
    this.openModal(confirmDeleteQuote);
  }

  confirmDeleteQuote(simple_alert: TemplateRef<any>) {
    let result;
    this.modalService.dismissAll();
    this.dataService.deleteQuotation(this.ticketId, this.quoteId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.simpleAlert = { title: 'Quotation', msg: result.message };
            this.openModal(simple_alert);
          } else {
            this.simpleAlert = { title: 'Quotation', msg: result.message };
            this.openModal(simple_alert);
          }
        }
      });
  }

  reQuoteApproved() {
    let result;
    this.dataService.updateGSXReQuoteStatus(this.repairType, this.data.g_number, 'RQAC', this.ticketId, this.diagnosisHd.quotation_id)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.simpleAlert = { title: 'Re-Quotation', msg: result.message };
          } else {
            this.simpleAlert = { title: 'Re-Quotation', msg: result.message };
          }
        });
  }

  changeQuoteOpf(event: string) {
    if (event === 'Quotation') {
      this.quoteType = 'Quotation';
    } else {
      this.quoteType = 'OPF';
    }
    this.quoteOpf = '';
  }

  /* ******************* GSX Repair ******************* */
  getRepair(simple_alert_temp: TemplateRef<any>) {
    let result;
    this.buttonSpin = true;
    this.startCountdown();
    this.dataService.getRepairDetail(this.data.g_number, this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.showRepairDetails = true;
            this.gsxRepairs = result.gsx_response;
            this.gsxRepairs.repairCreatedOnDate = new Date(this.gsxRepairs.repairCreatedOnDate).toLocaleString();
            this.gsxRepairs.dt = this.gsxRepairs.parts;
            if (this.gsxRepairs.escalations) {
              this.repairEscalations = this.gsxRepairs.escalations;
              for (let i = 0; i < this.repairEscalations.length; i++) {
                if ((this.repairEscalations[i].type !== 'GSXCHAT') && (this.repairEscalations[i].type !== 'GSXHELP')) {
                  this.escalationId = this.repairEscalations[i].id;
                }
              }
            }
            this.buttonSpin = false;
          } else {
            this.simpleAlert = { title: 'GSX Repair', msg: result.message };
            this.openModal(simple_alert_temp);
          }
        });
    /* this.dataService.getRepair(this.data.g_number, this.ticketId)
            .subscribe(
              data => {
                result = data;
                if (result.status === true) {
                  this.showRepairDetails = true;
                  this.gsxRepairs.hd = result.repair_hd[0];
                  this.gsxRepairs.dt = result.repair_dt;
                  for (let i = 0; i < this.gsxRepairs.dt.length; i++) {
                    if (this.gsxRepairs.dt[0].from_consigned === '0') {
                      this.gsxRepairs.dt[0].from_consigned = 'False';
                    } else {
                      this.gsxRepairs.dt[0].from_consigned = 'True';
                    }
                  }
                } else {
                  this.simpleAlert = {title: 'GSX Repair', msg: result.message};
                  this.openModal(simple_alert_temp);
                }
              }); */
  }

  getBlueDartData(trackNumber: any, blueDart_details: TemplateRef<any>) {
    this.buttonSpin = true;
    let result: any;
    this.dataService.getBlueDartTracking(trackNumber).subscribe(
      (data: any) => {
        result = data;
        if (result.status === true) {
          this.blueDartResult = this.sanitizer.sanitize(SecurityContext.HTML, result.response[0]);
          this.openModal(blueDart_details);
        } else {
          alert(result.message);
        }
        this.buttonSpin = false;
      });
  }

  getGsxStatusCode() {
    let result: any;
    this.dataService.getGsxStatusCode().subscribe(
      (data: any) => {
        result = data;
        if (result.status === true) {
          this.gsxStatusCodes = result.repair_status;
        }
      });
  }

  getRepairsStatus(repair_log: TemplateRef<any>) {
    this.getGsxStatusCode();
    this.buttonSpin = true;
    let result: any;
    let detailsResponse: any = [];
    this.repairStatuses = [];
    setTimeout(() => {
      this.dataService.getRepairDetails(this.data.g_number)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              detailsResponse = result.repair_audit;
              for (let i = 0; i < detailsResponse.length; i++) {
                for (let j = 0; j < this.gsxStatusCodes.length; j++) {
                  if (detailsResponse[i].record.newValue === this.gsxStatusCodes[j].status_code) {
                    detailsResponse[i].record.newValue = this.gsxStatusCodes[j].status_name;
                  }
                }

                if (detailsResponse[i].record.name !== 'PART') {
                  this.repairStatuses.push(detailsResponse[i]);
                }
                /* if (this.repairStatuses[i].action === 'CREATE') {
                  if (this.repairStatuses[i].record.name === 'PART') {
                    if (this.repairStatuses[i].record.newValue) {
                      this.repairStatuses[i].record.name = 'PART UPDATED';
                      this.repairStatuses[i].record.newValue = this.repairStatuses[i].record.newValue;
                    } else if (this.repairStatuses[i].record.oldValue) {
                      this.repairStatuses[i].record.name = 'PART ADDED';
                      this.repairStatuses[i].record.newValue = this.repairStatuses[i].record.oldValue;
                    }
                  }
                } */
              }
              this.openModal(repair_log);
            } else {
              this.buttonSpin = false;
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }, 2000);
  }

  printReturnLabel(sqNo: any) {
    let result: any;
    const tab: any = window.open();
    this.dataService.printReturnLabel(this.gsxNo, sqNo)
      .subscribe({
        next: (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          tab.location.href = fileUrl;
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  /* ******************* Service Report ******************* */

  updateSvcRemarks() {
    this.buttonSpin = true;
    let result: any;
    this.dataService.updateSvcRemarks(this.svcRemarks, this.ticketId, this.diagnosisHd.id).subscribe(
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

  fetchRepairDetails(simple_alert_temp: TemplateRef<any>, confirm_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.GSXParts(this.data.g_number);
  }

  getGSX(event: { keyCode: number; target: { value: any; }; }, simple_alert_temp: TemplateRef<any>, confirm_alert_temp: TemplateRef<any>) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.GSXParts(event.target.value);
    }
  }

  GSXParts(repairID: string) {
    this.sPartDetails = [];
    let result: any = [];
    if (repairID !== '') {
      this.dataService.getRepairDetails(repairID)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              if (result.repair_detail) {
                this.repairDetails = result.repair_detail;
                this.repairedParts = this.repairDetails.parts;
                for (let i = 0; i < this.repairedParts.length; i++) {

                  /* GPR */
                  if (this.repairedParts[i].number === this.gprDoaSelectedPart) {
                    if (this.repairedParts[i].kgbDeviceDetail) {
                      this.isGSXError = false;
                      this.kgbDeviceDetail = this.repairedParts[i].kgbDeviceDetail.identifiers.serial;
                      this.kgbPartNo = this.repairedParts[i].number;
                      this.kgbPartSequenceNo = this.repairedParts[i].sequenceNumber;
                    } else {
                      this.kgbPartNo = this.repairedParts[i].number;
                      this.kgbPartSequenceNo = this.repairedParts[i].sequenceNumber;
                    }
                  }

                  /* DOA */

                  if (this.gprDoaSelectedPart.number === this.repairedParts[i].number) {
                    this.gprDoaPart = this.repairedParts[i];
                    // this.doaComponentCode = this.repairedParts[i].componentIssue.componentCode;
                    if (this.repairedParts[i].kgbDeviceDetail) {
                      this.grpDoaKGBSerial = this.repairedParts[i].kgbDeviceDetail.identifiers.serial;
                    }
                  }

                  /* KGB */

                  if (this.repairedParts[i].number === this.kgbSelectedPart) {
                    this.kgbPartSequenceNo = this.repairedParts[i].sequenceNumber;
                    if (this.repairedParts[i].kgbDeviceDetail) {
                      this.kgbDeviceDetail = this.repairedParts[i].kgbDeviceDetail.identifiers.serial;
                    }
                    if (this.repairedParts[i].serialized === true) {
                      if (this.repairType === 'WUMS') {
                        if ((this.repairDetails.repairStatus === 'RRPL') && (this.kgbDeviceDetail === '')) {
                          this.gsxInwardCheck = true;
                        } else {
                          this.gsxInwardCheck = false;
                        }
                      } else {
                        if ((this.repairedParts[i].returnStatusCode === 'KBB')) {
                          this.kgbPartSequenceNo = this.repairedParts[i].sequenceNumber;
                          this.gsxInwardCheck = true;
                        } else {
                          this.gsxInwardCheck = false;
                        }
                      }
                    } else {
                      this.gsxInwardCheck = false;
                    }
                  }
                }
              } else {
                this.gsxInwardCheck = false;
              }
            } else {
              alert(result.message);
              this.buttonSpin = false;
            }
          });
    }
  }

  serviceTypeSelect(value: any) {
    this.serviceData.serviceType = value;
  }

  addServicePart(inputData: { serialNo: string; partNo: string; partDetail: string; }) {
    if ((inputData.serialNo !== '') && (inputData.partNo !== '') && (inputData.partDetail !== '')) {
      this.sPartDetails.push(inputData);
      this.servicePartInput = [{ serialNo: '', partNo: '', partDetail: '' }];
    }
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
    if (this.moveBackToStage === '1600' && this.dianosisMoveReason !== undefined) {
      this.deleteSvcRemarks = this.dianosisMoveReason;
      this.deleteSvcId = this.svcId;
    }
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

  generatesvc(diagnosis: string | number | boolean, inputData: { serialNo: string; partNo: string; partDetail: string; }, add_data: { condition: string; upgrade: string; family: string; serviceType: string; accessory: string; }, simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let inputDataComplete = true;
    let sDataComplete = false;
    let reportData: any;

    if ((inputData.serialNo !== '') && (inputData.partNo !== '') && (inputData.partDetail !== '')) {
      this.sPartDetails.push(inputData);
      this.servicePartInput = [{ serialNo: '', partNo: '', partDetail: '' }];
      inputDataComplete = true;
    } else {
      if (this.sPartDetails.length === 0) {
        inputDataComplete = false;
      }
    }

    if (this.gsxNo !== '' && this.serviceData.serviceType !== 'Select' && diagnosis !== '') {
      sDataComplete = true;
    } else {
      sDataComplete = false;
    }
    if (inputDataComplete === true && sDataComplete === true) {
      if (this.data.site_type_id === '2') {
        reportData = '&gsx_no=' + this.gsxNo + '&gsx_service_type=' + this.serviceData.serviceType + '&diagnosis=' +
          encodeURIComponent(diagnosis) + '&status_id=' + this.data.status_id + '&product_description=' + this.data.product_description +
          '&condition_of_device=' + add_data.condition + '&upgrades=' + add_data.upgrade +
          '&warranty_status=' + this.data.warranty_status + '&product_family=' + add_data.family +
          '&service_type=' + add_data.serviceType + '&accessory_received=' + add_data.accessory;
        this.callGenerateSVC(reportData, simple_alert_temp);
      } else {
        reportData = '&gsx_no=' + this.gsxNo + '&gsx_service_type=' + this.serviceData.serviceType + '&diagnosis=' +
          encodeURIComponent(diagnosis) + '&status_id=' + this.data.status_id;
        this.callGenerateSVC(reportData, simple_alert_temp);
      }
    } else {
      this.simpleAlert = { title: 'Service Report', msg: 'Fill all mandatory fields' };
      this.openModal(simple_alert_temp);
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

  generateOTPforDelivery(type: any) {
    let result;
    let hdImagesCount = 0; //comment for google drive disable
    // let hdImagesCount = 6; // uncomment it for Google Drive image disable
    for (let i = 0; i < this.gDriveData.length; i++) {
      if (this.gDriveData[i].type === 'HD') {
        hdImagesCount = hdImagesCount + 1;
      }
    }

    if (hdImagesCount < 6) {
      for (let i = 0; i < this.S3Data.length; i++) {
        if (this.S3Data[i].type === 'HD') {
          hdImagesCount = hdImagesCount + 1;
        }
      }
    }

    if (hdImagesCount >= 6) { //comment for google drive disable
      this.dataService.generateOTPforDelivery(this.data.customer_phone_no, this.data.customer_email_id, this.ticketId)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              if (type === 'new') {
                alert(result.message);
                this.getdata(this.ticketId);
              } else {
                alert(result.message);
              }
            } else {
              alert(result.message);
            }
          });
    } else {  //comment for google drive disable
      alert('Please upload the device images for Home Delivery');  //comment for google drive disable
    }  //comment for google drive disable
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

  homeDeliverySubmit() {
    this.buttonSpin = true;
    const today = new Date().toDateString();
    const docs: any = [];
    let homeDeliver = false;
    if (this.homeDeliveryOtp === '') {
      this.buttonSpin = false;
      alert('Please Enter OTP');
      return;
    } else if (this.svcDocumentTemp.length === 0) {
      this.buttonSpin = false;
      alert('Please Select the Signed SVC');
      return;
    } else {
      docs.push({
        document_type: 'Delivered SVC',
        file_name: this.svcDocumentTemp.name,
        extension: this.svcDocumentTemp.type.split('/')[1],
        date: today,
        file: this.selectedFile,
        description: 'Delivered SVC'
      });
      homeDeliver = true;
    }

    if (homeDeliver) {
      let results: any = [];

      if (this.svcDocumentTemp.size <= 5000000) {
        this.dataService.submitHomeDelivery(this.ticketId, docs, this.data.customer_phone_no, this.homeDeliveryOtp)
          .subscribe({
            next: (responseList: any) => {
              results = responseList;
              if (results[0].status === true && results[1].status === true) {
                this.svcDocumentTemp = [];
                this.getdata(this.ticketId);
                this.homeDeliveryOtp = '';
                this.myQInputVariable.nativeElement.value = '';
                this.buttonSpin = false;
              } else {
                if (results[0].status === false) {
                  alert(results[0].message);
                } else {
                  alert(results[1].message);
                }
                this.buttonSpin = false;
              }
            }, // success path
            error: error => this.error = error // error path
          });
        //
        this.dcolor = false;
      } else {
        this.buttonSpin = false;
        alert('File size should be less than 5MB');
      }
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
    this.ccAnalysisList = [];
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
                this.ccAnalysisList.push(analysisTemp[i]);
              }
            }
          } else {
            this.analysisList = [];
            this.ccAnalysisList = [];
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

  /************ Payments **************/

  /* Commeny this for POS invoice validation */
  /* getPaymentDetails() {
    const raf_id = this.data.branch_code + this.data.id;
    let result: any;
    this.dataService.getPaymentDetails(raf_id, this.data.ticket_date)
      .subscribe(
        (data: any) => {
          result = data.invoice;
          if (result.advance.length !== 0) {
            this.isAdvance = true;
            this.paymentAdvances = result.advance;

            for (let i = 0; i < this.paymentAdvances.length; i++) {
              const re = /\-/gi;
              const invoiceDate = this.paymentAdvances[i].damindate.replace(re, '/');
              this.paymentAdvances[i].damindate = new Date(invoiceDate + ' UTC');
            }
          } else {
            this.isAdvance = false;
          }
          if (result.invoice.length !== 0) {
            this.isInvoice = true;
            this.paymentInvoices = result.invoice;
            for (let i = 0; i < this.paymentInvoices.length; i++) {
              const re = /\-/gi;
              const invoiceDate = this.paymentInvoices[i].damindate.replace(re, '/');
              this.paymentInvoices[i].damindate = new Date(invoiceDate + ' UTC');
            }
          } else {
            this.isInvoice = false;
          }
        });
  }
 */
  /* Enable this for POS invoice validation */
  getPaymentDetails() {
    const raf_id = this.data.branch_code + this.data.id;
    let result: any;
    this.dataService.getPaymentDetails(raf_id, this.data.ticket_date, this.data.id)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.invoice) {
            for (let i = 0; i < result.invoice.length; i++) {
              if (result.invoice[i].invoice_type === '1') {
                this.paymentAdvances.push(result.invoice[i]);
              } else {
                this.paymentInvoices.push(result.invoice[i]);
              }
            }
            if (this.paymentAdvances.length > 0) {
              this.isAdvance = true;
              for (let i = 0; i < this.paymentAdvances.length; i++) {
                const re = /\-/gi;
                const invoiceDate = this.paymentAdvances[i].inv_date.replace(re, '/');
                this.paymentAdvances[i].inv_date = new Date(invoiceDate + ' UTC');
              }
            } else {
              this.isAdvance = false;
            }
            if (this.paymentInvoices.length > 0) {
              this.isInvoice = true;
              for (let i = 0; i < this.paymentInvoices.length; i++) {
                const re = /\-/gi;
                const invoiceDate = this.paymentInvoices[i].inv_date.replace(re, '/');
                this.paymentInvoices[i].inv_date = new Date(invoiceDate + ' UTC');
              }
            } else {
              this.isInvoice = false;
            }
          }
        });
  }
  saveInvoiceRefundStatus() {
    if (!this.refundStatusText) {
      Swal.fire({ icon: 'warning', title: 'Please select a status' });
      return;
    }
    this.dataService.updatePaymentSummaryRefundStatus(
      String(this.ticketId),
      this.refundStatusText,
      this.refundDate || '',
      this.refundUtr || '',
      this.refundValue || ''
    ).subscribe({
      next: (res: any) => {
        const ok = res?.status === true;
        Swal.fire({ icon: ok ? 'success' : 'error', title: ok ? (res?.message || 'Saved') : (res?.message || 'Save failed') });
      },
      error: () => Swal.fire({ icon: 'error', title: 'Save failed' })
    });
  }

  

  /************ CC Updates **************/

  ccUpdateAnalysis(analysis: any) {
    let result: any;
    this.dataService.uploadAnalysis(this.ticketId, analysis)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.ccAnalysisText = '';
            // this.ccGetAnalysis(this.ticketId);
            this.getAnalysis(this.ticketId);
          }
        });
  }

  ccFeedBackSubmit() {
    if (this.ccFeedBackRemarks === '') {
      alert('Please Enter the Remarks');
    } else {
      let result: any;
      this.dataService.psfSubmit(this.ticketId, this.ccFeedBackRemarks, this.ccFeedBack)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              alert(result.message);
              this.ccFeedBackRemarks = '';
              this.getAnalysis(this.ticketId);
            }
          });
    }
  }

  /* ccGetAnalysis(ticketId) {
    let result: any;
    this.dataService.getAnalysis(ticketId)
            .subscribe(
              (data) => {
                result = data;
                if (result.status === true) {
                  this.ccAnalysisList = result.analysis;
                } else {
                  this.ccAnalysisList = [];
                }

    });
  } */

  /************ CC Enquiry **************/

  getEnquiry(ticketId: string | null) {
    let result: any;
    this.dataService.getEnquiry(ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.EnquiryList = result.enquiry;
          } else {
            this.EnquiryList = [];
          }

        });
  }

  /************ getMessage **************/

  getMessage(ticketId: string | null) {
    let result: any;
    this.dataService.getMessage(ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.messageList = result.message;
          } else {
            this.messageList = [];
          }
        });
  }

  /************ google drive **************/
  getGDriveFiles() {
    let result: any;
    this.dataService.getDriveFiles(this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.gDriveData = result.images;
          }
        });
  }

  openImage(fileId: string) {
    const imageURL = 'https://api.icareservice.co.in/gdrive4/google-api-php-client/examples/download.php?fileId=' + fileId;
    window.open(imageURL, '_blank');
  }
  imageLoadError(event: any): void {
    this.s3ImageOpenAlert = 'This format is not viewable here; please use the link in the table below to access the content.';
  }


  openS3Image(folder: any, fileId: string, docModel?: any, contentType?: any) {
    this.s3ImageOpenAlert = '';
    this.s3ImageUrl = 'https://icare-raf.s3.ap-south-1.amazonaws.com/' + folder + '/' + fileId;
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
    /*  } else {
       const imageURL = 'https://icare-raf.s3.ap-south-1.amazonaws.com/' + folder + '/' + fileId;
       window.open(imageURL, '_blank');
     } */

    /* var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = imageURL;
    document.body.appendChild(iframe);
    iframe.onload = function () {
      alert("Download completed!");
      document.body.removeChild(iframe);
    }; */
  }

  /************ Notifications **************/

  getnotifications(result: any) {
    let rafMails: any = [];
    let quoteMails: any = [];
    let svcMails: any = [];
    let notificationEmails: any = [];
    if (result.status === true) {
      this.smsNotifications = result.sms;
      quoteMails = result.quotation_emails;
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

      for (let i = 0; i < quoteMails.length; i++) {
        this.emailNotifications.push({
          type: 'Quote',
          date: new Date(quoteMails[i].email_send_time),
          sendStatus: quoteMails[i].email_send,
          status: quoteMails[i].status
        });
      }

      for (let j = 0; j < svcMails.length; j++) {
        this.emailNotifications.push({
          type: 'SVC',
          date: svcMails[j].email_send_time,
          sendStatus: svcMails[j].email_send,
          status: svcMails[j].status
        });
      }

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

  sendAgeingSMSTemp(sms_email: TemplateRef<any>) {
    let result: any;
    let smsemailResponse: any;
    this.ageingSMSEmails = [];
    let statuses: any = [];
    this.dataService.getMsgNotification(this.ticketId)
      .subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            smsemailResponse = result.message;
            for (let i = 0; i < smsemailResponse.length; i++) {
              if (smsemailResponse[i].status_id === 'ALL') {
                this.ageingSMSEmails.push(smsemailResponse[i]);
              }
              statuses = smsemailResponse[i].status_id.split(',');
              for (let j = 0; j < statuses.length; j++) {
                if (statuses[j] === this.data.status_id) {
                  this.ageingSMSEmails.push(smsemailResponse[i]);
                }
              }
            }
            this.openModal(sms_email);
          }
        });
  }

  sendSMSMailConfirm(confirmSMSMail: TemplateRef<any>, message: string) {
    this.ageingSMSEmailMessage = message;
    this.modalService.dismissAll();
    this.openModal(confirmSMSMail);
  }

  smsMailConfirm() {
    this.modalService.dismissAll();
    let result: any;
    this.dataService.sendSMSEmail(this.ticketId, this.ageingSMSEmailMessage)
      .subscribe(
        (data: any) => {
          result = data;
          if ((result.status === true) && (result.email_status === 'Y')) {
            alert('SMS and Email send successfully');
          } else if ((result.status === false) && (result.email_status === 'Y')) {
            alert('SMS send failed and Email send successfully');
          } else if ((result.status === true) && (result.email_status === 'N')) {
            alert('Email send failed and SMS send successfully');
          } else {
            alert('SMS and Email send failed');
          }
          this.getdata(this.ticketId);
        });
  }

  checkCustomerDisSat(result: any) {
    let disSatList: any = [];
    if (result.status === true) {
      disSatList = result.items;
      for (let i = 0; i < disSatList.length; i++) {
        if (disSatList[i].apple_csat_rating === 'Dissatisfied') {
          this.appleDisSat = true;
          this.appleSat = false;
        } else if (disSatList[i].apple_csat_rating === 'Satisfied') {
          this.appleSat = true;
          this.appleDisSat = false;
        }
        if (disSatList[i].google_rating === 'Dissatisfied') {
          this.googleDisSat = true;
        }
      }
    }
  }

  moveToDianosis(diagnoisis_move_temp: TemplateRef<any>) {
    this.openModal(diagnoisis_move_temp);
  }

  moveToDianosisConfirm() {
    let result: any;
    if (this.dianosisMoveReason === '') {
      this.notfilled = true;
    } else {
      this.dataService.movetoDiagnosis(this.ticketId, this.dianosisMoveReason)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.getdata(this.ticketId);
            } else {
              alert(result.message);
            }
          });
    }
  }

  /*  deliveryToCustomerPlace(delivery_customer_temp: TemplateRef<any>) {
       this.openModal(delivery_customer_temp);
   }

   deliveryToCustomerPlaceConfirm() {
     if ((!this.deliverToCustomer.dateTime) || (!this.deliverToCustomer.mode) || (!this.deliverToCustomer.name)) {
       this.notfilled = true;
     } else {
       let result: any;
       this.deliverToCustomer.dateTime = this.datePipe.transform(this.deliverToCustomer.dateTime, 'yyyy-MM-dd HH:mm:ss');
       this.dataService.DeliveryToCustomer(this.ticketId, this.deliverToCustomer)
       .subscribe(
         (data) => {
           result = data;
           if (result.status === true) {
             this.modalRef.hide();
             this.getdata(this.ticketId);
           } else {
             alert(result.message);
           }
       });
     }
   } */

  acknowledgedToInrepair(acknowledge_part_temp: TemplateRef<any>) {
    this.openModal(acknowledge_part_temp);
  }

  acknowledgedToInrepairConfirm() {
    let result;
    this.dataService.changeBinOthersManually(this.ticketId, '8750', 'Acknowlegded to In-Repair')
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.getdata(this.ticketId);
            this.modalService.dismissAll();
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  sendToRFPU() {
    this.buttonSpin = true;
    let result: any;
    if (this.diagnosisHd.svcRemarks === this.diagnosisHd.technician_note || this.diagnosisHd.svc_remarks === '') {
      alert('Please update the SVC Remarks');
      this.buttonSpin = false;
    } else {
      this.dataService.qcRequest(this.ticketId, this.diagnosisHd.id)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.modalService.dismissAll();
              this.getdata(this.ticketId);
              this.buttonSpin = false;
              if (this.dCallCheck === true) {
                this.sendDcallQcApproval();
              }
            } else {
              alert(result.message);
              this.buttonSpin = false;
            }
          });
    }
  }

  verifyKBB(kbbVerify_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.openModal(kbbVerify_temp);
  }

  //issue Adhesive

  issueAdhesive() {
    let result;
    let count = 0;
    for (let i = 0; i < this.adhesivePartsList.length; i++) {
      this.dataService.issueAdhesives(this.ticketId, this.adhesivePartsList[i].asn).subscribe(
        (data: any) => {
          result = data;
          if (result.status === true) {
            count = +count + +1;
            if (count === this.adhesivePartsList.length) {
              setTimeout(() => {
                this.callQCApprove('Approved');
              }, 3000);
            }
          } else {
            alert(result.message);
          }
        });
    }
  }

  /* unblockAdhesive() {
    let result;
    let count = 0;
    for (let i = 0; i < this.adhesivePartsList.length; i++) {
    this.dataService.unBlockAdhesive(this.adhesivePartsList[i].asn)
        .subscribe({
          next: (data: any) => {
              result = data;
            if (result.status === true) {
              count = +count + +1;
              if (count === this.adhesivePartsList.length) {
                setTimeout(() => {
                  this.callQCApprove('Approved');
                }, 3000);
              }
            } else {
              alert(result.message);
            }
          },
          error: (error: any) => error = error
        });
      }
  } */

  kbbVerified(gsx_status_update_temp: TemplateRef<any>) {
    let kbbVerified = true;
    let result: any;
    for (let i = 0; i < this.kbbVerificationParts.length; i++) {
      this.kbbVerificationParts[i].kbbVerifySerialNo = this.removeSpecialCharacters(this.kbbVerificationParts[i].kbbVerifySerialNo);
      // this.kbbVerificationParts[i].kbbVerifySerialNo = this.checkingSerialNumber(this.kbbVerificationParts[i].kbbVerifySerialNo);
      if (this.kbbVerificationParts[i].kbb_serial_no !== this.kbbVerificationParts[i].kbbVerifySerialNo) {
        kbbVerified = false;
      }
    }

    if (kbbVerified) {
      if (this.data.site_type_id === '1') {
        if ((this.repairType === 'OSR') || (this.repairType === 'OSCR')) {
          this.callQCApprove(this.qcStatus);
        } else {
          //SHIP TO UPDATION ((this.data.ticket_date < '2024-10-25') && (this.data.branch_code === 'SNB')) ||
          if (((this.data.ticket_date < '2024-11-06') && (this.data.branch_code === 'SNB')) || ((this.data.branch_code === 'STC') && (this.data.ticket_date < '2024-10-25'))) {
            if (this.adhesiveParts === true) {
              this.issueAdhesive();
            } else {
              this.callQCApprove(this.qcStatus);
            }
            this.modalService.dismissAll();
            this.buttonSpin = false;
          } else { //Correct SHIP TO
            this.dataService.updateGSXStatus(this.repairType, this.data.g_number, 'RFPU')
              .subscribe(
                (data: any) => {
                  result = data;
                  if (result.status === true) {
                    // this.callQCApprove(this.qcStatus);
                    alert("Moved to RFPU successfully")
                    if (this.adhesiveParts === true) {
                      this.issueAdhesive();
                    } else {
                      this.callQCApprove(this.qcStatus);
                    }

                  } else {
                    if ((this.popAppleReviewHold) || (this.data.gsx_status_code === 'POPH') || (this.data.gsx_status_code === 'RFPU') || (this.data.gsx_status_code === 'SPCM') || (this.data.gsx_status_code === 'SCNC') || (this.data.gsx_status_code === 'SCOM') || (this.data.gsx_status_code === 'GX08')) {
                      // this.callQCApprove(this.qcStatus);
                      if (this.adhesiveParts === true) {
                        this.issueAdhesive();
                      } else {
                        this.callQCApprove(this.qcStatus);
                      }
                    } else {
                      // this.callQCApprove(this.qcStatus); //  Exception for RFPU status update
                      alert(result.message);
                    }
                  }
                  this.modalService.dismissAll();
                  this.buttonSpin = false;
                }
              );
          }
        }
      } else {
        this.dataService.updateGSXStatus(this.repairType, this.data.g_number, 'SPCM')
          .subscribe(
            (data: any) => {
              result = data;
              if (result.status === true) {
                this.mapOnsiteRepair();
                this.manualTicketChangeConfirm('8850', 'KBB Verified');
              } else {
                this.modalService.dismissAll();
                if (this.data.gsx_status_code === 'SPCM') {
                  this.mapOnsiteRepair();
                  this.manualTicketChangeConfirm('8850', 'KBB Verified');
                } else {
                  this.simpleAlert = { title: 'GSX Status Update', msg: result.message };
                  this.openModal(gsx_status_update_temp);
                }
              }
              this.buttonSpin = false;
            });
      }
    } else {
      this.notfilled = true;
    }
  }

  toBeInward(tobeInward_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    if (this.data.site_type_id === '1') {
      if (this.diagnosisHd.repair_type === 'WUMS') {
        this.openModal(tobeInward_temp);
      } else {
        this.manualTicketChangeConfirm('1500', 'Parts Arrived from DC');
      }
    }
  }

  selectedStatusBin() {
    const RCOImages: any = [];

    if (this.toInwardBin === '1500') {
      this.isEligibleInward = true;
      // this.modalService.dismissAll();
    } else {
      // this.isEligibleInward = true;  //Google drive API disable - uncomment it
      /***/
      for (let i = 0; i < this.gDriveData.length; i++) {
        if (this.gDriveData[i].type === 'RCI') {
          RCOImages.push(this.gDriveData[i]);
        }
      }
      if (RCOImages.length >= 6) {
        this.isEligibleInward = true;
      } else {
        for (let i = 0; i < this.S3Data.length; i++) {
          if (this.S3Data[i].type === 'RCI') {
            RCOImages.push(this.S3Data[i]);
          }
        }
        if (RCOImages.length >= 6) {
          this.isEligibleInward = true;
        } else {
          this.isEligibleInward = false;
          this.errorMsg = 'Please Upload the Images of Part Arrived';
        }
      }
    }
    /***/ //Comment this section for Google drive disable/
  }

  tobeInwardSubmit(toStatusId: string) {
    if (this.isEligibleInward === true) {
      if (toStatusId === '1500') {
        this.manualTicketChangeConfirm(toStatusId, 'Parts Arrived from DC');
        this.modalService.dismissAll();
      } else {
        this.manualTicketChangeConfirm(toStatusId, 'Parts Arrived from RC');
        this.modalService.dismissAll();
      }
    } else {
      this.modalService.dismissAll();
      alert(this.errorMsg);
    }
  }

  URDUpdate() {
    let result: any;
    this.dataService.csCodeURDUpdate(this.ticketId)
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

  gsxStatusRefresh() {
    this.gsxStatusSpin = true;
    this.userDataService.mapCrmGsx(this.ticketId).subscribe({
      next: (data1: any) => {
        if (data1.status === true) {
          this.gsxStatusSpin = false;
          if (data1.repairStatusCode === null) {
            alert('GSX fetch failed, please try again.');
          } else {
            this.data.gsx_status_code = data1.repairStatusCode;
            this.data.gsx_status_description = data1.repairStatusDescription;
          }
        }
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  checkEscalation(excalation_temp: TemplateRef<any>, simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    this.getRepair(simple_alert_temp);
    setTimeout(() => {
      let results: any = [];
      this.dataService.getEscalationDetails(this.escalationId).subscribe((data: any) => {
        results = data;
        if (results.status === true) {
          let gsxResponse: any = [];
          gsxResponse = results.response;
          this.escalationDetails = gsxResponse.proposedRequotePartsDetails.requoteParts[0];
          this.escalationDamage = gsxResponse.damageInfo.details;
        } else {
          this.escalationDetails.errorMsg = results.message;
        }
      });
      this.openModal(excalation_temp);
    }, 7000);
  }

  addRCRequotedPart() {
    this.clicked = true;
    let newParts: any = [];

    let isAvail = false;
    for (let i = 0; i < this.selectedParts.length; i++) {
      if (this.selectedParts[i].number === this.escalationDetails.number) {
        isAvail = true;
      }
    }

    if (!isAvail) {
      // uncomment for Spart
      // coverage_option: coverage_option,
      // let coverage_option: any;
      // if(this.warrantyStatus == 'Out Of Warranty (No Coverage)') {
      //   coverage_option = 'VMI_RED';
      // } else {
      //   coverage_option = 'VMI_GREEN';
      // }
      newParts.push({
        number: this.escalationDetails.number,
        partUsed: '',
        description: this.escalationDetails.description,
        typeDescription: 'RCBilling',
        readOnly: true,
        fromConsignedStock: '0',
        componentCode: '',
        issueCode: '',
        reproducibility: '',
        coverage_option: 'VMI_RED',
        pricingCheckBox: false,
        pricingType: '',
        kbbInputType: '',
        kbb_serial_no: '',
        kgb_serial_no: '',
        kgb_part_no: '',
        kgb_description: '',
        rc_added_part: '1'
      });

      let result: any;
      this.dataService.appendRCParts(this.ticketId, this.gsxNo, this.diagnosisHd.id, newParts)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.buttonSpin = false;
              this.modalService.dismissAll();
              this.getdata(this.ticketId);
              this.clicked = false;
            } else {
              this.modalService.dismissAll();
              alert(result.message);
              this.buttonSpin = false;
              this.clicked = false;
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    } else {
      alert('This part has beed added already.');
    }
  }

  /* Reservation */

  onSelectProduct(event: any, productCode?: any) {
    this.buttonSpin = true;
    this.showDateAndTime = false;
    this.selectedDate = '';
    this.slotError = '';
    if (productCode) {
      this.productCode = this.productSelect(this.dlReservationDetails.product_code);
    } else {
      this.productCode = event.target.value;
    }
    this.customerService.getAvailableSlots(this.productCode, localStorage.getItem('shipTo')).subscribe(
      (data: any) => {
        const result = data;
        if (result.status === true) {
          this.buttonSpin = false;
          this.showDateAndTime = true;
          this.GetDates(new Date(), 6);
          this.availSlots = result.gsx_response.slots;
          this.correlationId = result.gsx_response.correlationId;
          this.slotError = '';
        } else {
          this.buttonSpin = false;
          this.showDateAndTime = false;
          if (result.response) {
            this.slotError = result.message + ' (' + result.response.errors[0].code + ')';
          } else {
            this.slotError = result.message;
          }
        }

      }
    );
  }

  reservationPopup(type: any, create_reserve_temp: TemplateRef<any>) {
    this.reserveType = type;
    this.showProductSelect = true;
    if (type !== 'reserve') {
      this.buttonSpin = true;
      this.getReservationById();
      setTimeout(() => {
        let currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 2);
        let reserveDate = new Date(this.dlReservationDetails.reservation_date)
        if (this.dlReservationDetails.reservation_date !== undefined) {
          if (reserveDate > currentTime) {
            this.showProductSelect = false;
            this.onSelectProduct('', this.dlReservationDetails.product_code);
            this.openModal(create_reserve_temp);
          } else {
            let r = confirm('This Reservation has been Expired. Do you want to create a new Reservation?');
            if (r) {
              this.showProductSelect = true;
              this.openModal(create_reserve_temp);
            } else {
              this.buttonSpin = false;
            }
          }
        } else {
          this.reservationPopup(type, create_reserve_temp);
        }
      }, 7000);
    } else {
      this.openModal(create_reserve_temp);
    }
  }

  GetDates(startDate: any, daysToAdd: any) {
    this.aryDayDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      this.aryDayDates.push({
        date: currentDate.getDate(),
        day: this.DayAsString(currentDate.getDay()),
        // fulldate: (this.DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + this.MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear())
      });
    }
  }

  DayAsString(dayIndex: any) {
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    return weekdays[dayIndex];
  }
  MonthAsString(monthIndex: any) {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthIndex];
  }

  onDateSelected(val: any) {
    // this.buttonColor = 'hsl(258, 20%, 10%)';
    this.selectedDate = val;
    this.selectTimeforAppoint = true;
    this.availSlotForDay = [];
    this.onlyDate = [];
    for (let i = 0; i < this.availSlots.length; i++) {
      this.onlyDate.push(this.datePipe.transform(this.availSlots[i].start, 'dd'));
      if (val == this.onlyDate[i]) {
        this.availSlotForDay.push(this.datePipe.transform(this.availSlots[i].start, 'h:mm a'));
      }
    }
  }

  filterAvailableSlots(start: any, end: any) {
    const availSlotts = [];
    for (let i = 0; i < this.availSlotForDay.length; i++) {
      if ((this.availSlotForDay[i] >= start) && (this.availSlotForDay[i] < end)) {
        availSlotts.push(this.availSlotForDay[i]);
      }
    }
    return availSlotts;
  }

  onTimeSelected(selectedtime: any) {
    for (let i = 0; i < this.availSlots.length; i++) {
      if ((this.datePipe.transform(this.availSlots[i].start, 'dd') == this.selectedDate) && (this.datePipe.transform(this.availSlots[i].start, 'h:mm a') == selectedtime)) {
        this.fullDate = this.availSlots[i].start;
      }
    }
  }

  productSelect(family: any): string | void {
    let productFamilies = [{ name: 'iPod', value: 'IPOD' }, { name: 'iPad', value: 'IPAD' }, { name: 'iPhone', value: 'IPHONE' }, { name: 'Watch', value: 'WATCH' }, { name: 'Apple TV', value: 'APPLETV' }, { name: 'Mac', value: 'MAC' }, { name: 'Beats', value: 'BEATS' }, { name: 'Homepod', value: 'HOMEPOD' }, { name: 'AirPods', value: 'AIRPODS' }, { name: 'Others', value: 'IPHONE' }, { name: 'Pencil', value: 'IPAD' }];
    // let productFamilies = [{ name: 'iPod', value: 'IPOD' }, { name: 'iPad', value: 'IPAD' }, { name: 'iPhone', value: 'IPHONE' }, { name: 'Watch', value: 'WATCH' }, { name: 'Apple TV', value: 'APPLETV' }, { name: 'Mac', value: 'MAC' }, { name: 'Beats', value: 'BEATS' }, ]
    for (let i = 0; i < productFamilies.length; i++) {
      if (productFamilies[i].name.toLowerCase() === family.toLowerCase()) {
        return productFamilies[i].value;
      }
    }
  }

  submitCreate() {
    if (this.fullDate != undefined) {
      this.buttonSpin = true;
      let commonData: any;
      commonData = '&product_code=' + this.productCode + '&reservation_type=' + 'CIN' + '&reservation_date=' + this.fullDate +
        '&first_name=' + this.customerFirstName + '&last_name=' + this.customerLastName + '&ship_to=' + localStorage.getItem('shipTo') + '&serial_no=' + this.data.serial_no + '&phone=' + this.data.customer_phone_no + '&email_id=' + this.data.customer_email_id + '&correlation_id=' + this.correlationId + '&issue_reported=' + 'Reservation for product delivery' + '&language_code=' + 'en-US' +
        '&ticket_id=' + this.ticketId;
      this.createReservation(commonData);
    }
    else {
      alert('Please select the Date and Time');
    }
  }

  createReservation(commonData: any) {
    let result;
    this.dataService.createReservation(commonData)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonSpin = false;
            this.modalService.dismissAll();
            alert("Thank you! Your appointment has been confirmed.");
            this.modalService.dismissAll();
            this.getdata(this.ticketId);
          } else {
            this.buttonSpin = false;
            this.modalService.dismissAll();
            alert(result.gsx_response.errors[0].message);
          }
        },
        error: (error: any) => this.error = error // error path
      });
  }

  reschedule() {
    let result;
    if (this.fullDate != undefined) {
      this.buttonSpin = true;
      this.dataService.getReservation(this.data.customer_phone_no, this.data.customer_email_id, this.data.delivery_reservation_id)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              let reserveDate = new Date(result.reservation[0].reservation_date);
              let currentDate = new Date();
              currentDate.setMinutes(currentDate.getMinutes() + 2);
              if (reserveDate <= currentDate) {
                this.submitCreate();
              } else {
                this.rescheduleReservation();
              }
            } else {
              this.getReservationById('reschedule');
              this.buttonSpin = false
            }
          },
          error: (error: any) => this.error = error // error path
        });
    } else {
      alert('Please select the Date and Time');
    }
  }

  rescheduleReservation() {
    let result;
    this.dataService.reservationUpdate(this.data.delivery_reservation_id, this.fullDate, this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && !result.gsx_response.errors) {
            this.buttonSpin = false;
            this.modalService.dismissAll()
            alert("Thank you! Your appointment has been confirmed.");
            this.getdata(this.ticketId);
          } else {
            this.buttonSpin = false;
            this.modalService.dismissAll()
            alert(result.gsx_response.errors[0].message);
          }
        },
        error: (error: any) => this.error = error // error path
      });
  }

  getReservationById(type?: any, temp?: any) {
    let result;
    this.dataService.getReservationDetailsbyId(this.data.delivery_reservation_id).subscribe({
      next: (data: any) => {
        result = data;
        if (result) {
          if (result.status === true) {
            if (type === 'reschedule')
              this.reschedule();
            else {
              if (temp) {
                this.dlReservationDetail(temp);
              } else {
                this.dlReservationDetail();
              }
            }
          }
          else {
            alert('Cannot fetch Reservation');
          }
        }
      }, // success path
      error: (error: any) => error // error path
    });
  }

  dCallRepairClose() {
    let result: any;
    if ((this.dcallCloseStatus !== 'Select the Status') && ((this.partReceivedDate !== '') && (this.partReceivedDate !== undefined)) && ((this.repairCompleteDate !== '') && (this.repairCompleteDate !== undefined))) {
      this.dataService.updateGSXStatusDcall(this.repairType, this.data.g_number, this.dcallCloseStatus, this.partReceivedDate, this.repairCompleteDate)
        .subscribe(
          (data: any) => {
            result = data;
            if (result.status === true) {
              this.manualTicketChangeConfirm('3600', 'Device Delivered');
            } else {
              alert(result.message);
            }
            this.modalService.dismissAll();
            this.buttonSpin = false;
          }
        );
    } else {
      this.notfilled = true;
    }
  }

  mapOnsiteRepair() {
    let result;
    this.dataService.mapOnsiteRepair(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.buttonSpin = false;
            this.getdata(this.ticketId);
          } else {
            this.buttonSpin = false;
          }
        },
        error: (error: any) => this.error = error // error path
      });
  }

  getIsPud(result: any) {
    if (result.status === true) {
      this.isPudTicket = true;
      this.dropRequest = result.data.drop_request_flag;
      this.dropAddress = result.data.drop_address;
      this.pudTicketId = result.data.id;
      // this.dropRequest = 1; //PUD BUG
      // this.dropAddress = "Maruthinagar,Bangalore";
      // this.pudTicketId = '3639';
      this.buttonSpin = false;
    } else {
      this.isPudTicket = false;
      this.dropRequest = 0;
      this.buttonSpin = false;
    }
  }

  checkPOPFile() {
    let result;
    this.dataService.viewImage(this.data.serial_no, this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.deviceImages = result.data;
            for (let i = 0; i < this.deviceImages.length; i++) {
              if (this.deviceImages[i].type === 'POP') {
                this.popExist = true;
              }
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  getPOPRequiredList() {
    let result;
    this.dataService.getPopRequiredList(this.productName)
      .subscribe({
        next: (data: any) => {
          result = data;
          const partList = result.data[0].part_no;
          if (result.status === true) {
            this.popRequiredList = partList.split(",");
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
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
    this.userDataService.getS3FileDetails(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.S3Data = result.images_raf;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  DeleteS3ImageUpload() {
    this.buttonSpin = true;
    // console.log(filename.folder+'/'+filename.file_id);
    const bucketName = 'icare-raf';
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
                this.getDocuments(this.ticketId);
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  }

  dlReservationDetail(reservation_detail_temp?: TemplateRef<any>) {
    let result;
    this.dataService.getReservation(this.data.customer_phone_no, this.data.customer_email_id, this.data.delivery_reservation_id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.dlReservationDetails = result.reservation[0];
            if (reservation_detail_temp) {
              this.openModal(reservation_detail_temp);
            }
          } else {
            if (reservation_detail_temp) {
              this.getReservationById('showDetail', reservation_detail_temp);
            } else {
              this.getReservationById();
            }
            // alert(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }


  /*   ******************* Questionare Block Start ************************* */

  qselectedRadAns(ans: any, question_Id: any, treeId: any) {
    const answ = { 'answerId': ans.answerId, 'answerPhrase': ans.answerPhrase };
    this.pushAnsweredQuestion(answ, question_Id, treeId);
    this.qshowNextBtn = true;
  }

  qselectedTextAns(ans: any, question_Id: any, treeId: any) {
    this.pushAnsweredQuestion(ans, question_Id, treeId, question_Id, false, 1);
    this.qshowNextBtn = true;
  }

  qselectedSubRadAns(ans: any, subQuesId: any, treeId: any, parentQuestionId: any, nestedSubQuestion?: any, masterParent?: any, fourthLevel?: any, fourthLevelMaster?: any, fifthLevel?: any, fifthLevelMaster?: any) {
    const subAnswer = { 'answerId': ans.answerId, 'answerPhrase': ans.answerPhrase };
    for (let i = 0; i < this.qsubRequiredQuestions.length; i++) {
      let selectedAnswer: any = '';
      if (nestedSubQuestion) {
        if (fifthLevel) {
          let r = this.qsubRequiredQuestions[i].answers.find((a: any) => (a.answerId === this.answers[fourthLevelMaster] || a.answerId === this.answers[fourthLevelMaster + '_' + fifthLevelMaster]));
          if (r) {
            let question = r.questions.find((a: any) => a.questionId === masterParent);
            if (question) {
              let q;
              q = question.answers.find((a: any) => (a.answerId === this.answers[masterParent] || a.answerId === this.answers[masterParent + '_' + fourthLevelMaster]));
              if (q) {
                let question = q.questions.find((a: any) => a.questionId === parentQuestionId);
                if (question) {
                  let answer = question.answers.find((a: any) => (a.answerId === this.answers[parentQuestionId] || a.answerId === this.answers[parentQuestionId + '_' + masterParent]));
                  if (answer) {
                    let q = answer.questions.find((a: any) => a.questionId === subQuesId);
                    if (q) {
                      selectedAnswer = q.answers.find((a: any) => a.answerId === ans.answerId);
                    }
                  }
                }
              }
            }
          }
        }
        else if (fourthLevel) {
          this.handleFifthLevelQuestions(ans.answerId, subQuesId, parentQuestionId, masterParent, fourthLevelMaster, treeId);
          let r = this.qsubRequiredQuestions[i].answers.find((a: any) => (a.answerId === this.answers[masterParent] || a.answerId === this.answers[masterParent + '_' + fourthLevelMaster]));
          if (r) {
            let question = r.questions.find((a: any) => a.questionId === parentQuestionId);
            if (question) {
              let q;
              q = question.answers.find((a: any) => (a.answerId === this.answers[parentQuestionId] || a.answerId === this.answers[parentQuestionId + '_' + masterParent]));
              if (q) {
                let question = q.questions.find((a: any) => a.questionId === subQuesId);
                selectedAnswer = question.answers.find((a: any) => a.answerId === ans.answerId);
              }
            }
          }
        } else {
          this.handleFourthLevelQuestions(ans.answerId, subQuesId, parentQuestionId, masterParent, treeId);
          let r = this.qsubRequiredQuestions[i].answers.find((a: any) => (a.answerId === this.answers[parentQuestionId] || a.answerId === this.answers[parentQuestionId + '_' + masterParent]));
          if (r) {
            let question = r.questions.find((a: any) => a.questionId === subQuesId);
            selectedAnswer = question.answers.find((a: any) => a.answerId === ans.answerId);
          }
        }
      } else {
        if (this.qsubRequiredQuestions[i].questionId === subQuesId) {
          selectedAnswer = this.qsubRequiredQuestions[i].answers.find((a: any) => a.answerId === ans.answerId);
        }
      }
      if (selectedAnswer !== '' && selectedAnswer !== undefined) {
        this.showNextBtn = false;
        this.handleThirdLevelQuestions(ans.answerId, subQuesId, treeId, parentQuestionId);
        if (nestedSubQuestion) {
          if (fifthLevel) {
            this.pushAnsweredQuestion(subAnswer, subQuesId, treeId, parentQuestionId, true, 0, true, masterParent, true, fourthLevelMaster, true, fifthLevelMaster);
          }
          else if (fourthLevel) {
            this.pushAnsweredQuestion(subAnswer, subQuesId, treeId, parentQuestionId, true, 0, true, masterParent, true, fourthLevelMaster);
          } else {
            this.pushAnsweredQuestion(subAnswer, subQuesId, treeId, parentQuestionId, true, 0, true, masterParent);
          }
        } else {
          this.pushAnsweredQuestion(subAnswer, subQuesId, treeId, parentQuestionId, true);
        }
        if (i == this.qsubRequiredQuestions.length) {
          this.showNextBtn = true;
        }
        break;
      }
    }
  }

  qselectedSubTextAns(ans: any, subQuesId: any, treeId: any, parentQuestionId: any, nestedQues?: any, masterParent?: any, fouthLevel?: any, fourthMaster?: any, fifthLevel?: any, fifthMaster?: any) {
    this.handleThirdLevelQuestions(ans, subQuesId, treeId, parentQuestionId);
    if (nestedQues) {
      if (fifthLevel) {
        this.pushAnsweredQuestion(ans, subQuesId, treeId, parentQuestionId, true, 1, true, masterParent, true, fourthMaster, true, fifthMaster);
      }
      else if (fouthLevel) {
        this.pushAnsweredQuestion(ans, subQuesId, treeId, parentQuestionId, true, 1, true, masterParent, true, fourthMaster);
      } else {
        this.pushAnsweredQuestion(ans, subQuesId, treeId, parentQuestionId, true, 1, true, masterParent);
      }
    } else {
      this.pushAnsweredQuestion(ans, subQuesId, treeId, parentQuestionId, true, 1);
    }
  }

  qselectedSubDPDAns(ans: any, subQuesId: any, treeId: any, parentQuestionId: any, nestedSubQuestion?: any, masterParent?: any, fourthLevel?: any, fourthParent?: any, fifthLevel?: any, fifthParent?: any) {
    for (let i = 0; i < this.qsubRequiredQuestions.length; i++) {
      let selectedAnswer: any = '';
      if (nestedSubQuestion) {
        if (fifthLevel) {
          this.handleFifthLevelQuestions(ans, subQuesId, parentQuestionId, masterParent, fourthParent, treeId);
          let r = this.qsubRequiredQuestions[i].answers.find((a: any) => (a.answerId === this.answers[masterParent] || a.answerId === this.answers[masterParent + '_' + fourthParent]));
          if (r) {
            let question = r.questions.find((a: any) => a.questionId === parentQuestionId);
            if (question) {
              let q;
              q = question.answers.find((a: any) => (a.answerId === this.answers[parentQuestionId] || a.answerId === this.answers[parentQuestionId + '_' + masterParent]));
              if (q) {
                let question = q.questions.find((a: any) => a.questionId === subQuesId);
                selectedAnswer = question.answers.find((a: any) => a.answerId === ans.answerId);
              }
            }
          }
        } else if (fourthLevel) {
          let r = this.qsubRequiredQuestions[i].answers.find((a: any) => ((this.answers[masterParent + '_' + fourthParent] && a.answerId === this.answers[masterParent + '_' + fourthParent]) || (this.answers[masterParent] && a.answerId === this.answers[masterParent]) || (this.answers[masterParent].answerId && a.answerId === this.answers[masterParent].answerId)));
          if (r) {
            let a = r.questions.find((a: any) => a.questionId === parentQuestionId);
            if (a) {
              let b = a.answers.find((a: any) => ((this.answers[parentQuestionId + '_' + masterParent] && a.answerId === this.answers[parentQuestionId + '_' + masterParent]) || (this.answers[parentQuestionId] && a.answerId === this.answers[parentQuestionId]) || (this.answers[parentQuestionId].answerId && a.answerId === this.answers[parentQuestionId].answerId)));
              if (b) {
                let question = b.questions.find((a: any) => a.questionId === subQuesId);
                selectedAnswer = question.answers.find((a: any) => a.answerId === ans);
              }
            }
          }
        } else {
          this.handleFourthLevelQuestions(ans, subQuesId, parentQuestionId, masterParent, treeId);
          let r = this.qsubRequiredQuestions[i].answers.find((a: any) => (a.answerId === this.answers[parentQuestionId + '_' + masterParent] || a.answerId === this.answers[parentQuestionId]));
          if (r) {
            let question = r.questions.find((a: any) => a.questionId === subQuesId);
            selectedAnswer = question.answers.find((a: any) => a.answerId === ans);
          }
        }
      } else {
        selectedAnswer = this.qsubRequiredQuestions[i].answers.find((a: any) => a.answerId === ans);
      }
      if (selectedAnswer !== '' && selectedAnswer !== undefined) {
        this.showNextBtn = false;
        if (nestedSubQuestion) {
          if (fifthLevel) {
            this.pushAnsweredQuestion(selectedAnswer, subQuesId, treeId, parentQuestionId, true, 0, true, masterParent, true, fourthParent, true, fifthParent);
          }
          else if (fourthLevel) {
            this.pushAnsweredQuestion(selectedAnswer, subQuesId, treeId, parentQuestionId, true, 0, true, masterParent, true, fourthParent);
          } else {
            this.pushAnsweredQuestion(selectedAnswer, subQuesId, treeId, parentQuestionId, true, 0, true, masterParent);
          }
        } else {
          this.handleThirdLevelQuestions(selectedAnswer.answerId, subQuesId, treeId, parentQuestionId);
          this.pushAnsweredQuestion(selectedAnswer, subQuesId, treeId, this.qshowingQuestion.questionId, true);
        }
        if (i == this.qsubRequiredQuestions.length) {
          this.showNextBtn = true;
        }
        break;
      }
    }
  }

  qselectedDPDAns(selectedAnswer: any, question_Id: any, treeId: any) {
    const templateIndex = this.qansweredQuestions.findIndex((template: any) => {
      const treeIndex = template.trees.findIndex((tree: any) => tree.treeId === treeId);
      return treeIndex !== -1;
    });
    if (templateIndex !== -1) {
      const template = this.qansweredQuestions[templateIndex];
      const treeIndex = template.trees.findIndex((tree: any) => tree.treeId === treeId);

      if (treeIndex !== -1) {
        const tree = template.trees[treeIndex];
        const existingAnswer = tree.questions.find((q: any) => q.questionId === question_Id);

        const answ = { 'answerId': selectedAnswer.answerId, 'answerPhrase': selectedAnswer.answerPhrase };
        this.pushAnsweredQuestion(answ, question_Id, tree.treeId);

        if (selectedAnswer.questions) {
          this.qshowNextBtn = true;
          for (const subQuestion of selectedAnswer.questions) {
            this.pushAnsweredQuestion(null, subQuestion.questionId, question_Id, tree.treeId);
          }
          this.qshowNextBtn = false;
        } else {
          this.qshowNextBtn = true;
        }
      }
    }
  }

  qnextQuestion(answeredVal: any, subQuesId: any, questionId: any, sub?: any) {
    let currentQuestion = null;
    let currentTemplate: any = null;
    let currentTree: any = null;

    const processSubQuestions = (questions: any[]) => {
      for (const question of questions) {
        if (!question.optional && question.answerType !== 'INT') {
          this.qsubRequiredQuestions.push(question); // Push the current subquestion to the array
        }
        if (Array.isArray(question.questions)) {
          processSubQuestions(question.questions); // Process nested subquestions
        }
      }
    };
    for (const template of this.qansweredQuestions) {
      for (const tree of template.trees) {
        currentQuestion = tree.questions.find((q: any) => q.questionId === questionId);
        if (currentQuestion) {
          currentTemplate = template;
          currentTree = tree;
          if (subQuesId && currentQuestion && Array.isArray(currentQuestion?.answers)) {
            for (const answer of (currentQuestion?.answers || [])) {
              if (Array.isArray(answer.questions)) {
                const subQuestion = answer.questions.find((q: any) => q.questionId === subQuesId && !q.optional);
                if (subQuestion) {
                  currentQuestion = subQuestion;
                  if (currentQuestion?.questions) {
                    processSubQuestions(currentQuestion?.questions); // Process nested subquestions
                  }
                  break;
                }
              }
            }
          }
          break;
        }
      }
      if (currentQuestion) {
        break;
      }
    }

    if ((currentQuestion && currentQuestion.answers && currentQuestion.answers.length > 0) || (currentQuestion && currentQuestion.answerPhrase && (currentQuestion.answerType === 'FFB' || currentQuestion.answerType === 'BBX' || currentQuestion.answerType === 'INT'))) {
      let selectedAnswer: any = [];
      if (currentQuestion.answerType !== 'FFB' && currentQuestion.answerType !== 'BBX' && currentQuestion.answerType !== 'INT') {
        selectedAnswer = currentQuestion.answers.find((a: any) => a.answerId === answeredVal.answerId);
        if (currentQuestion.answerType === 'RAD') {
          selectedAnswer = currentQuestion.answers.find((a: any) => a.answerId === answeredVal);
        }
      }
      if (selectedAnswer && selectedAnswer.questions && selectedAnswer.questions.length > 0 && (selectedAnswer.questions.filter((question: any) => !question.optional && question.answerType !== 'INT').length > 0)) {
        this.qsubRequiredQuestions = selectedAnswer.questions.filter((question: any) => (!question.optional && question.answerType !== 'INT'));
        this.showNextBtn = false;
      } else {
        this.showNextBtn = true;
        let currentIndex;
        currentIndex = currentTree.questions.findIndex((q: any) => q.questionId === questionId);
        if (currentIndex !== -1) {
          const nextIndex = currentIndex + 1;
          if (nextIndex < currentTree.questions.length) {
            this.qsubRequiredQuestions = [];
            this.qshowingQuestion = currentTree.questions[nextIndex];
            this.qshowNextBtn = true;
          } else {
            this.qsubRequiredQuestions = [];
            const treeIndex = currentTemplate.trees.findIndex((t: any) => t.treeId === currentTree.treeId);
            if (treeIndex !== -1 && treeIndex < currentTemplate.trees.length - 1) {
              // Move to the next tree within the same template
              currentTree = currentTemplate.trees[treeIndex + 1];
              this.requiredQuestions = currentTree.questions[0];
              this.qshowingQuestion = this.requiredQuestions;
              this.qshowNextBtn = true;
              this.treeId = currentTree.treeId;
            } else {
              const templateIndex = this.qansweredQuestions.findIndex((t: any) => t.templateId === currentTemplate.templateId);

              if (templateIndex !== -1 && templateIndex < this.qansweredQuestions.length - 1) {
                // Move to the next template
                currentTemplate = this.qansweredQuestions[templateIndex + 1];
                currentTree = currentTemplate.trees[0];
                this.qshowingQuestion = currentTree.questions[0];
                if (this.qshowingQuestion) {
                  this.qshowNextBtn = true;
                  this.treeId = currentTree.treeId;
                } else {
                  this.qshowNextBtn = false;
                  this.qsubmitDoc = true;
                  this.treeId = currentTree.treeId;
                  this.questionaireStructure = this.answeredQuestions;
                }
              } else {
                this.qshowNextBtn = false;
                this.qshowingQuestion = '';
                this.qsubmitDoc = true;
                this.questionaireStructure = this.answeredQuestions;
              }
            }
          }
        } else {
          this.qshowNextBtn = false;
          this.qsubmitDoc = true;
          this.questionaireStructure = this.answeredQuestions;
        }
      }
    }
  }

  pushAnsweredQuestion(selectedAnswer: any, questionId: any, treeId: any, parentQuestionId: any = null, isSubQuestion: boolean = false, userInput: any = 0, thirdLevelQuestion: boolean = false, masterParent?: any, fourthLevelQuestion?: any, fourthMaster?: any, fifthLevelQuestion?: any, fifthMaster?: any) {
    const templateIndex = this.qansweredQuestions.findIndex((template: any) => {
      const treeIndex = template.trees.findIndex((tree: any) => tree.treeId === treeId);
      return treeIndex !== -1;
    });
    if (templateIndex !== -1) {
      const template = this.qansweredQuestions[templateIndex];
      const treeIndex = template.trees.findIndex((tree: any) => tree.treeId === treeId);
      if (treeIndex !== -1) {
        const tree = template.trees[treeIndex];
        let parentQuestion: any = null;
        if (isSubQuestion && parentQuestionId) {
          if (thirdLevelQuestion) {
            if (fifthLevelQuestion) {
              let a = tree.questions.find((q: any) => q.questionId === fifthMaster);
              if (a) {
                let b = a.answers.find((q: any) => (q.answerId === this.answers[fifthMaster] || q.answerId === this.answers[fifthMaster].answerId));
                if (b) {
                  let c = b.questions.find((q: any) => q.questionId === fourthMaster);
                  if (c) {
                    let d = c.answers.find((q: any) => (q.answerId === this.answers[fourthMaster] || q.answerId === this.answers[fourthMaster + '_' + fifthMaster] || q.answerId === this.answers[fourthMaster + '_' + fifthMaster] || q.answerId === this.answers[fourthMaster].answerId));
                    if (d) {
                      let e = d.questions.find((q: any) => q.questionId === masterParent);
                      if (e) {
                        let f = e.answers.find((q: any) => (q.answerId === this.answers[masterParent] || q.answerId === this.answers[masterParent + '_' + fourthMaster] || q.answerId === this.answers[masterParent + '_' + fourthMaster] || q.answerId === this.answers[masterParent].answerId));
                        if (f) {
                          parentQuestion = f.questions.find((q: any) => q.questionId === parentQuestionId);
                        }
                      }
                    }
                  }
                }
              }
            } else if (fourthLevelQuestion) {
              let a = tree.questions.find((q: any) => q.questionId === fourthMaster);
              if (a) {
                let b = a.answers.find((q: any) => (q.answerId === this.answers[fourthMaster] || q.answerId === this.answers[fourthMaster].answerId));
                if (b) {
                  let c = b.questions.find((q: any) => q.questionId === masterParent);
                  if (c) {
                    let d = c.answers.find((q: any) => (q.answerId === this.answers[masterParent] || q.answerId === this.answers[masterParent + '_' + fourthMaster] || q.answerId === this.answers[masterParent + '_' + fourthMaster] || q.answerId === this.answers[masterParent].answerId));
                    if (d) {
                      parentQuestion = d.questions.find((q: any) => q.questionId === parentQuestionId);
                    }
                  }
                }
              }
            } else {
              let a = tree.questions.find((q: any) => q.questionId === masterParent);
              if (a) {
                let b = a.answers.find((q: any) => (q.answerId === this.answers[masterParent] || q.answerId === this.answers[masterParent + '_' + fourthMaster] || q.answerId === this.answers[masterParent].answerId));
                if (b) {
                  parentQuestion = b.questions.find((q: any) => q.questionId === parentQuestionId);
                }
              }
            }
          } else {
            parentQuestion = tree.questions.find((q: any) => q.questionId === parentQuestionId);
          }
        }
        let selectedAnswerObj: any;
        if (userInput === 1) {
          selectedAnswerObj = {
            questionId: questionId,
            answers: [{ answerPhrase: selectedAnswer }]
          };
        } else {
          selectedAnswerObj = {
            questionId: questionId,
            answers: [{ answerId: selectedAnswer.answerId }]
          };
        }

        if (userInput === 1) {
          if (isSubQuestion && parentQuestion) {
            for (const answer of parentQuestion.answers) {
              if (answer.questions) {
                const answerIndex = answer.questions.findIndex((q: any) => q.questionId === questionId);
                if (answerIndex !== -1) {
                  answer.questions[answerIndex] = selectedAnswerObj;
                }
              }
            }
          } else {
            const questionIndex = tree.questions.findIndex((q: any) => q.questionId === questionId);
            if (questionIndex !== -1) {
              tree.questions[questionIndex].answerPhrase = selectedAnswer;
            }
          }
        }
        if (userInput === 1) {
          selectedAnswerObj = {
            questionId: questionId,
            answers: [{ answerPhrase: selectedAnswer }]
          };
        }
        const answeredTemplateIndex = this.answeredQuestions.findIndex((aTemplate: any) => aTemplate.templateId === template.templateId);
        if (answeredTemplateIndex !== -1) {
          const answeredTemplate = this.answeredQuestions[answeredTemplateIndex];
          const answeredTreeIndex = answeredTemplate.trees.findIndex((aTree: any) => aTree.treeId === tree.treeId);
          if (answeredTreeIndex !== -1) {
            const answeredTree = answeredTemplate.trees[answeredTreeIndex];
            if (isSubQuestion && parentQuestion) {
              if (thirdLevelQuestion) {
                if (fifthLevelQuestion) {
                  const a = answeredTree.questions.findIndex((aQuestion: any) => aQuestion.questionId === fifthMaster);
                  const b = answeredTree.questions[a].answers[0].questions.findIndex((aQuestion: any) => aQuestion.questionId === fourthMaster);
                  const c = answeredTree.questions[a].answers[0].questions[b].answers[0].questions.findIndex((aQuestion: any) => aQuestion.questionId === masterParent);
                  const answeredQuestionIndex = answeredTree.questions[a].answers[0].questions[b].answers[0].questions[c].answers[0].questions.findIndex((aQuestion: any) => aQuestion.questionId === parentQuestion.questionId);
                  if (answeredQuestionIndex !== -1) {
                    if (!answeredTree.questions[a].answers[0].questions[b].answers[0].questions[c].answers[0].questions[answeredQuestionIndex].answers[0].questions) {
                      answeredTree.questions[a].answers[0].questions[b].answers[0].questions[c].answers[0].questions[answeredQuestionIndex].answers[0].questions = [selectedAnswerObj];
                    } else {
                      answeredTree.questions[a].answers[0].questions[b].answers[0].questions[c].answers[0].questions[answeredQuestionIndex].answers[0].questions.push(selectedAnswerObj);
                    }
                  }
                }
                else if (fourthLevelQuestion) {
                  const a = answeredTree.questions.findIndex((aQuestion: any) => aQuestion.questionId === fourthMaster);
                  const b = answeredTree.questions[a].answers[0].questions.findIndex((aQuestion: any) => aQuestion.questionId === masterParent);
                  const answeredQuestionIndex = answeredTree.questions[a].answers[0].questions[b].answers[0].questions.findIndex((aQuestion: any) => aQuestion.questionId === parentQuestion.questionId);
                  if (answeredQuestionIndex !== -1) {
                    if (!answeredTree.questions[a].answers[0].questions[b].answers[0].questions[answeredQuestionIndex].answers[0].questions) {
                      answeredTree.questions[a].answers[0].questions[b].answers[0].questions[answeredQuestionIndex].answers[0].questions = [selectedAnswerObj];
                    } else {
                      answeredTree.questions[a].answers[0].questions[b].answers[0].questions[answeredQuestionIndex].answers[0].questions.push(selectedAnswerObj);
                    }
                  }
                } else {
                  const a = answeredTree.questions.findIndex((aQuestion: any) => aQuestion.questionId === masterParent);
                  const answeredQuestionIndex = answeredTree.questions[a].answers[0].questions.findIndex((aQuestion: any) => aQuestion.questionId === parentQuestion.questionId);
                  if (answeredQuestionIndex !== -1) {
                    if (!answeredTree.questions[a].answers[0].questions[answeredQuestionIndex].answers[0].questions) {
                      answeredTree.questions[a].answers[0].questions[answeredQuestionIndex].answers[0].questions = [selectedAnswerObj];
                    } else {
                      answeredTree.questions[a].answers[0].questions[answeredQuestionIndex].answers[0].questions.push(selectedAnswerObj);
                    }
                  }
                }
              } else {
                const answeredQuestionIndex = answeredTree.questions.findIndex((aQuestion: any) => aQuestion.questionId === parentQuestion.questionId);
                if (answeredQuestionIndex !== -1) {
                  if (!answeredTree.questions[answeredQuestionIndex].answers[0].questions) {
                    answeredTree.questions[answeredQuestionIndex].answers[0].questions = [selectedAnswerObj];
                  } else {
                    answeredTree.questions[answeredQuestionIndex].answers[0].questions.push(selectedAnswerObj);
                  }
                } else {
                  answeredTree.questions.push(selectedAnswerObj);
                }
              }
            } else {
              const answeredQuestionIndex = answeredTree.questions.findIndex((aQuestion: any) => aQuestion.questionId === questionId);
              if (answeredQuestionIndex !== -1) {
                answeredTree.questions[answeredQuestionIndex] = selectedAnswerObj;
              } else {
                answeredTree.questions.push(selectedAnswerObj);
              }
            }
          }
        }
      }
    }
  }

  handleNextClick(subQuestion: any) {
    for (let i = 0; i < this.qsubRequiredQuestions.length; i++) {
      subQuestion = this.qsubRequiredQuestions[i];
      if (subQuestion.answerType === 'FFB' || subQuestion.answerType === 'BBX' || subQuestion.answerType === 'INT') {
        setTimeout(() => {
          this.qnextQuestion(this.answers[subQuestion.questionId + '_' + this.qshowingQuestion.questionId], subQuestion.questionId, this.qshowingQuestion.questionId, subQuestion);
        }, 500);
      } else if (subQuestion.answerType === 'RAD') {
        setTimeout(() => {
          this.qnextQuestion(this.answers[subQuestion.questionId], subQuestion.questionId, this.qshowingQuestion.questionId, subQuestion);
        }, 500);
      } else {
        this.qnextQuestion(this.answers[subQuestion.questionId + '_' + this.qshowingQuestion.questionId], subQuestion.questionId, this.qshowingQuestion.questionId, subQuestion);
      }
    }
  }

  handleRadioChange(selectedAnswer: any, questionId: any, treeId: any, subId: any, thirdLevel?: any, masterQuestion?: any, fourthLevel?: any, parentMaster?: any, fifthLevel?: any, fifthMaster?: any) {
    if (subId === '') {
      this.answers[questionId] = selectedAnswer.answerId;
      this.qselectedRadAns(selectedAnswer, questionId, treeId);
    } else {
      if (thirdLevel) {
        if (fifthLevel) {
          this.answers[subId] = selectedAnswer.answerId;
          this.qselectedSubRadAns(selectedAnswer, subId, treeId, questionId, thirdLevel, masterQuestion, fourthLevel, parentMaster, fifthLevel, fifthMaster);
        }
        else if (fourthLevel) {
          this.answers[subId] = selectedAnswer.answerId;
          this.qselectedSubRadAns(selectedAnswer, subId, treeId, questionId, thirdLevel, masterQuestion, fourthLevel, parentMaster);
        } else {
          this.answers[subId] = selectedAnswer.answerId;
          this.qselectedSubRadAns(selectedAnswer, subId, treeId, questionId, thirdLevel, masterQuestion);
        }
      } else {
        this.answers[subId] = selectedAnswer.answerId;
        this.qselectedSubRadAns(selectedAnswer, subId, treeId, questionId);
      }
    }
  }

  handleThirdLevelQuestions(ans: any, subQuesId: any, treeId: any, parentQuestionId: any) {
    let childQuestions;
    const selectedAnswer = this.qsubRequiredQuestions.find((a: any) => a.questionId === subQuesId);
    if (selectedAnswer && selectedAnswer.answers) {
      const currentAnswer = selectedAnswer.answers.find((a: any) => a.answerId === ans);
      if (currentAnswer && currentAnswer.questions) {
        this.parentOfThirdLevel = subQuesId;
        this.thirdlevelQuestions = currentAnswer.questions.filter((q: any) => (!q.optional && q.answerType !== 'INT'));
      }
    }
  }

  handleFourthLevelQuestions(ans: any, questionId: any, subQuesId: any, parentQuestionId: any, treeId: any) {
    let childQuestions;
    const selectedAnswer = this.qsubRequiredQuestions.find((a: any) => a.questionId === subQuesId);
    if (selectedAnswer && selectedAnswer.answers) {
      const currentAnswer = selectedAnswer.answers.find((a: any) => (
        (this.answers[subQuesId] && a.answerId === this.answers[subQuesId].answerId) ||
        (this.answers[subQuesId] && a.answerId === this.answers[subQuesId]) ||
        (this.answers[subQuesId + '_' + parentQuestionId] && a.answerId === this.answers[subQuesId + '_' + parentQuestionId])
      ));
      if (currentAnswer && currentAnswer.questions) {
        const currentQues = currentAnswer.questions.find((a: any) => a.questionId === questionId);
        if (currentQues && currentQues.answers) {
          const answer = currentQues.answers.find((a: any) => a.answerId === ans);
          if (answer && answer.questions) {
            this.parentOfFourthLevel = questionId;
            this.fourthlevelQuestions = answer.questions.filter((q: any) => (!q.optional && q.answerType !== 'INT'));
          }
        }
      }
    }
  }

  handleFifthLevelQuestions(ans: any, childQuestion: any, questionId: any, subQuesId: any, parentQuestionId: any, treeId: any) {
    let childQuestions;
    const selectedAnswer = this.qsubRequiredQuestions.find((a: any) => a.questionId === subQuesId);
    if (selectedAnswer && selectedAnswer.answers) {
      const currentAnswer = selectedAnswer.answers.find((a: any) => (
        (this.answers[subQuesId] && a.answerId === this.answers[subQuesId].answerId) ||
        (this.answers[subQuesId] && a.answerId === this.answers[subQuesId]) ||
        (this.answers[subQuesId + '_' + parentQuestionId] && a.answerId === this.answers[subQuesId + '_' + parentQuestionId])
      ));
      if (currentAnswer && currentAnswer.questions) {
        const currentQues = currentAnswer.questions.find((a: any) => a.questionId === questionId);
        if (currentQues && currentQues.answers) {
          const answer = currentQues.answers.find((a: any) => (
            (this.answers[questionId] && a.answerId === this.answers[questionId].answerId) ||
            (this.answers[questionId] && a.answerId === this.answers[questionId]) ||
            (this.answers[questionId + '_' + subQuesId] && a.answerId === this.answers[questionId + '_' + subQuesId])
          ));
          if (answer && answer.questions) {
            const question = answer.questions.find((a: any) => a.questionId === childQuestion);
            if (question && question.answers) {
              const child = question.answers.find((a: any) => a.answerId === ans);
              if (child && child.questions) {
                this.parentOfFifthLevel = questionId;
                // this.fifthlevelQuestions = child.questions.filter((q: any) => (!q.optional && q.answerType !== 'INT' && (q.answers.every((answer: any) => !answer.questions || answer.questions.length === 0))));
                this.fifthlevelQuestions = child.questions.filter((q: any) => {
                  if (!q.optional && q.answerType !== 'INT' && q.answers) {
                    q.answers = q.answers.filter((answer: any) => !answer.questions || answer.questions.length === 0);
                    return true;
                  }
                  return false;
                });
              }
            }
          }
        }
      }
    }
  }


  // ***************************************** End of Questionnar **************************************

  moveToPartial() {
    // console.log(this.data.status_id);
    let r = confirm('Are you sure, you want move to Partial Shipment - Awaiting parts?');
    if (r === true) {
      let result;
      this.dataService.changeBinOnly(this.ticketId, '1300', 'Partial Shipment')
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.getdata(this.ticketId);
              this.modalService.dismissAll();
            } else {
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  changeBinOnly(toStatus: any) {
    let callApi = false;
    let remarks: any = '';
    if (toStatus === '3400') {
      let r = confirm('Are you sure, you want move it?');
      if (r === true) {
        callApi = true;
        remarks = 'Apple Declined';
      }
    } else if (toStatus === '8750') {
      callApi = true;
      remarks = 'Customer Declined the Quote';
    } else {
      callApi = false;
      alert(`You can't move this status. GSX status is mismatching`);
    }

    if (callApi) {
      let result;
      this.dataService.changeBinOnly(this.ticketId, toStatus, remarks)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.getdata(this.ticketId);
              this.modalService.dismissAll();
            } else {
              alert(result.message);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        });
    }
  }

  convertToPUD(type?: any) {
    let pudType = 'DL';
    let branchCode = this.data.dl_branch_code;
    if (type) {
      pudType = type;
      branchCode = this.data.branch_code;
    }
    let r = confirm('Are you sure you want to Convert to PUD?');
    if (r === true) {
      if (pudType === 'DL' && this.isRDO === true) {
        if (this.componentCode === null || this.componentCode === undefined || this.componentCode === '' || this.issueCode === null || this.issueCode === '' || this.issueCode === undefined) {
          alert('Please update the Component and Issue code');
        } else {
          let result1;
          this.dataService.repairCreateSCR(this.ticketId, this.diagnosisHd.id)
            .subscribe({
              next: (data: any) => {
                result1 = data;
                if (result1.status === true) {
                  this.executeConvertToPUD(branchCode, pudType);
                } else {
                  alert(result1.response);
                }
              }, // success path
              error: (error: any) => this.error = error // error path
            });
        }
      }
      else {
        this.executeConvertToPUD(branchCode, pudType);
      }
    }
  }

  executeConvertToPUD(branchCode: any, pudType: any) {
    let result: any = [];
    this.dataService.createPUD(this.customerInfo.first_name, this.customerInfo.last_name, this.data.customer_phone_no, this.data.customer_email_id, this.customerInfo.phone2,
      this.customerInfo.address1, this.customerInfo.address2, this.customerInfo.city, this.customerInfo.state, this.customerInfo.pin, this.data.customer_query, branchCode, this.data.product_issue_reported, this.ticketId, pudType, this.data.serial_no, this.pudPart_no)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            alert('This ticket has been converted to PUD');
            this.pudTicketId = result.pud_ticket_id;
            this.getdata(this.ticketId);
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  downloadInboxLetter() {
    let result: any;
    this.dataService.inboxLetterDownload(this.data.g_number)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            const htmlText: any = result.gsx_response;
            this.letterHtml = htmlText;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  showInboxLetter(inbox_letter_temp: TemplateRef<any>) {
    this.openModal(inbox_letter_temp);
  }

  createCase() {
    let result: any;
    this.dataService.createCase(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            console.log('NetSuite Case Create');
            this.netSuiteCase = true;
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  grnInventoryAdjustment() {
    let result: any;
    this.dataService.grnInventoryAdjustment(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            console.log('Inventory Adjusted');
          } else {
            console.log(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  inventoryAdjustmentOut() {
    let result: any;
    this.dataService.inventoryAdjOut(this.ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            console.log('Inventory Adjust Out Done');
          } else {
            console.log(result.message);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  pushEstimateToNetsuite() {
    let result;
    // console.log(this.ticketId);
    // console.log(this.diagnosisHd.id);
    this.dataService.pushEstimateToNetsuite(this.ticketId, this.diagnosisHd.id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
          } else {
            alert(result.message);
            this.hideModel();
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  pushPOToNetsuite() {
    let result;
    // console.log(this.ticketId);
    // console.log(this.diagnosisHd.id);
    this.dataService.pushPOToNetsuite(this.ticketId, this.diagnosisHd.id)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
          } else {
            alert(result.message);
            this.hideModel();
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }

  openPO(poId: any) {
    const tab: any = window.open();
    this.dataService.openPO(poId)
      .subscribe({
        next: (data: Blob | MediaSource) => {
          const fileUrl = URL.createObjectURL(data);
          setTimeout(() => {
            tab.location.href = fileUrl;
          }, 100);
        },
        error: (error: any) => this.error = error
      });
  }

  // const poUrl = 'https://api.icareservice.co.in/api/suite/document?internal_id=' + poId + '&type=purchaseorder&X_API_KEY=UI@PWD#'
  // window.open(poUrl, '_blank');

  openGRN(grnId: any) {
    const grnUrl = 'https://api.icareservice.co.in/api/suite/document?internal_id=' + grnId + '&type=itemreceipt&X_API_KEY=UI@PWD#'
    window.open(grnUrl, '_blank');
  }


  addComponentIssue() {
    if (this.addmorecomponentFlag1 === false) {
      this.addmorecomponentFlag1 = true;
    } else {
      this.addmorecomponentFlag2 = true;
    }
    this.addmorecomponentBtn = this.addmorecomponentFlag2 === true ? false : true;

  }


  selectGsxSms() {
    let enableSMS: any;
    if (this.gsxSms === true) {
      enableSMS = '1';
    } else {
      enableSMS = '0';
    }
    let results: any;
    this.dataService.gsxSmsUpdate(this.ticketId, enableSMS)
      .subscribe(
        (data: any) => {
          results = data;
          if (results.status === false) {
            alert(results.message);
          } else {
            alert(results.message);
            this.getdata(this.ticketId);
          }
        });
  }
    crer_flag(){
       let enablecrer: any;
      if (this.crer === true){
        enablecrer = '1';
      } else {
        enablecrer = '0';
      }
      let results: any;
      this.dataService.crer_flag(this.ticketId, enablecrer)
      .subscribe(
        (data: any) => {
          results = data;
          if (results.status === false) {
            alert(results.message);
          } else {
            alert(results.message);
            this.getdata(this.ticketId);
          }
        });
  }
}



 // Close Class
