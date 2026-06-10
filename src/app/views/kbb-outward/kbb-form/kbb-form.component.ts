
import { Component, SecurityContext, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { KbbOutwardService } from '../kbb-outward.service';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '../../reports/excel.service';
import { UserService } from '../../../shared/user.service';
import { Params } from '@angular/router';
import { Console } from 'console';
export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
  selector: 'app-kbb-form',
  templateUrl: './kbb-form.component.html',
  styleUrls: ['./kbb-form.component.scss', '../../../../scss/customstyle.css'],
  standalone: false,
})
export class KbbFormComponent {
  isReadOnlyMode: boolean = false;
  loading = true;
  error: any;
  buttonSpin = false;
  kbbFrom = '';
  toAddress: any;
  toRcAddress = '';
  toDcAddress = '';
  toAd_type = '';
  fromHtml = '';
  nrdcNo: any = '';
  outwardDate = new Date().toLocaleString();
  eWayBillNo = '';
  personName = localStorage.getItem('userName');
  personMobile = localStorage.getItem('UserMobile');
  partList: any;
  kgbList: any;
  servicePartInput: any = [{ticket_no: '', serial_no: '', part_no: '', part_description: '', return_order: ''
  , repair_no: '', return_status: '', value: '', po_number: '', hsn_code: ''}];
  totalValue = '0.00';
  totalBoxes = 1;
  totalItems = '';
  totalWg = '';
  length = '';
  width = '';
  height = '';
  mode = '1';
  boxName = 'Carton Box';
  boxType = [{type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''},
  {type: '1', cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''}];
  cartonBoxes: any;
  toteBoxes: any;
  boxNo = '';
  sign = '';
  awbNo = '';
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  userRole = localStorage.getItem('userRole');
  userBranch = localStorage.getItem('branchCode');
  branchType = localStorage.getItem('branchType');
  isApprover = true;
  exKBBDetailsHd: any;
  remarks = '';
  notfilled = false;
  forUpdate = false;
  boxEdit = false;
  displayCheckColor: any;
  selectedDisplay: any = [];
  selectedDisplayIdx = '';
  diagnosisImage: any = '';
  kbbGDriveImage: any = [];
  kbbImage = '';
  kbbImageSide = '';
  // kbbImageVisibled = false;
  bulkReturnId = '';
  bulkReturnError: any;
  isDoa = false;
  imageSrc: string = '';
  selectedFiles: any;
  noEwayBillHtml: any = '';
  kbbVideoExist = false;
  toAddressList: any = [];
  toAddressId = 'Select the Address';
  toAddId: any = 'RC';
  imageType = '';
  kbbTagExist = false;
  kbbToteExist = false;
  kbbAWBExist = false;
  currentImageType: any;
  enableBulkReturn = false;
  constructor(public sanitizer: DomSanitizer, private modalService: NgbModal, public dataService: KbbOutwardService,
  private _location: Location, public router: Router, private activatedRoute: ActivatedRoute,  private excelService: ExcelService, private userService: UserService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['from']) {
        this.getRcDc();
        this.getKbbData();
        if ((this.userRole === '4') || (this.userRole === '5')) {
          this.isApprover = false;
          this.forUpdate = true;
        } else {
          this.isApprover = true;
          this.forUpdate = false;
        }
        this.boxEdit = true;
      } else {
        this.isApprover = false;
        this.getRcDc();
        this.getLocationaddress('');
        const partlst: any = localStorage.getItem('partlist');
        this.partList = JSON.parse(partlst);
        this.getTotalValue();
        this.forUpdate = false;
        this.totalItems = this.partList.length;
      }
    });
    // this.totalItems = this.partList.length;
    this.toAddress = sanitizer.sanitize(SecurityContext.HTML, this.toAddress);
    this.bulkReturnError = '';
    this.noEwayBillHtml = sanitizer.sanitize(SecurityContext.HTML, this.noEwayBillHtml);
    this.noEwayBillHtml = this.noEwayBillHtml + '<span>' + 'Enter ' + '<b>' + 'NOEWAYBILL' + '</b>' + ' for below 50000.' + '</span>';

  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelAndBack() {
    localStorage.removeItem('nrdcNo');
    this.modalService.dismissAll();
    localStorage.removeItem('partlist');
    this.buttonSpin = false;
    this._location.back();
  }

  cancel() {
    this.modalService.dismissAll();
    this.buttonSpin = false;

  }

  cancelUpdate() {
    this._location.back();
  }

  getRcDc() {
    let result: any;
      this.dataService.getRcDc('')
          .subscribe(
            (data) => {
              result = data;
              const rc = result.rcdc[0];
              for (let i = 0; i < result.rcdc.length; i++) {
                if (result.rcdc[i].type.includes('DC')) {
                  this.toAddressList.push(result.rcdc[i]);
                }
              }
              // const dc = result.rcdc[1];
              if (result.status === true) {
  this.toRcAddress = '<label><b>' + rc.name + '</b></label><br/><label>' + rc.address1 + '</label><br/><label>' + rc.address2 + '</label><br/><label>' + rc.city + '</label>, <label>' + rc.state + '-' + rc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + rc.gstn_no + '</label><br><label>' + 'Acc. No - ' + rc.account_no + '</b></label>';
                /* this.toDcAddress = '<label><b>' + dc.name + '</b></label><br/><label>' + dc.address1 + '</label><br/><label>' + dc.address2 + '</label><br/><label>' + dc.city + '</label>, <label>' + dc.state + '-' + dc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + dc.gstn_no + '</label><br><label>' + 'Acc. No - ' + dc.account_no + '</b></label>';*/
  this.toAddress = this.toRcAddress;
              }
          });
  }

  changeToAddress(event: any) {
    if (event === 'Select the Address') {
      this.toAddId = '';
      this.toAddress = '';
    }
    for (let i = 0; i < this.toAddressList.length; i++) {
      if (this.toAddressList[i].city === event) {
        const dc = this.toAddressList[i];
        this.toAddId = this.toAddressList[i].type;
        this.toAddress = '<label><b>' + dc.name + '</b></label><br/><label>' + dc.address1 + '</label><br/><label>' + dc.address2 + '</label><br/><label>' + dc.city + '</label>, <label>' + dc.state + '-' + dc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + dc.gstn_no + '</label>' + '</label><br><label>' + 'Acc. No - ' + dc.account_no + '</b></label>';
      }
    }
  }

  getLocationaddress(code: any) {
    let result: any;
      this.dataService.getLocation(code)
          .subscribe(
            (data) => {
              result = data;
              const branch = result.branch;
              if (result.status === true) {
  this.fromHtml = '<label><b>Ample Technologies Pvt. Ltd</b></label><br/><label>' + branch.address1 + '</label><br/><label>' + branch.address2 + '</label><br/><label>' + branch.city + '</label>, <label>' + branch.state + '-' + branch.pin + '</label><br/><label><b>' + 'GST No - ' + branch.gstn_no + '</label>';
                setTimeout(() => {
                  this.loading = false;
                }, 2000);
              }
          });
  }

  getTotalValue() {
    let total = 0.00;
    for (let i = 0; i < this.partList.length; i++) {
      total = +total + +this.partList[i].value;
    }
    this.totalValue = total.toFixed(2);
  }

  /* ********** From Approver ************ */

  getKbbData() {
    let result: any;
      this.dataService.getKbbList(localStorage.getItem('nrdcNo'), '', '')
          .subscribe(
            (data) => {
                result = data;
                this.buttonSpin = false;
                if (result.status === true) {
                  this.enableBulkReturn = result.enable_bulk_return;
                  this.partList = result.kbb.dt;
                  this.kgbList = result.kbb.dt2;
                  for (let i = 0; i < this.partList.length; i++) {
                    this.partList[i].displayCheckColor = 'red';
                    this.partList[i].captured_serial_no = this.partList[i].kbb_serial_no;
                  }
                  this.partList.forEach((sPart: any) => {
                    if(sPart.approver_validated == 0) {
                      sPart.approver_validated = false;
                    }
                    sPart.validated_by = sPart.approved_by;
                  });
                  this.getLocationaddress(result.kbb.hd[0].return_from);
                  this.assignValues(result.kbb.hd[0]);
                  this.totalItems = this.partList.length;
                } else {
                  alert(result.message);
                }
      });
  }

  assignValues(data: any) {
    this.exKBBDetailsHd = data;
    this.toAd_type = data.return_to;
    this.toAddId = data.return_to;
    if (data.return_to === 'rc') {
      this.toAddress = this.toRcAddress;
    } else {
      for (let i = 0; i < this.toAddressList.length; i++) {
        if (this.toAddressList[i].type === data.return_to) {
          const dc = this.toAddressList[i];
          this.toAddress = '<label><b>' + dc.name + '</b></label><br/><label>' + dc.address1 + '</label><br/><label>' + dc.address2 + '</label><br/><label>' + dc.city + '</label>, <label>' + dc.state + '-' + dc.pin + '</label><br/><br/><label><b>' + 'GST No - ' + dc.gstn_no + '</label><br><label>' + 'Acc. No - ' + dc.account_no + '</b></label>';
        }
      }
    }
    this.bulkReturnId = data.bulk_return_id;
    // this.bulkReturnBtnLbl = ((this.bulkReturnId === '') || (this.bulkReturnId === null))? 'Create Bulk Return': 'Update Bulk Return';
    this.nrdcNo = data.return_from + data.id;
    // this.getFileDetails(data.id);
    this.outwardDate = data.date;
    if (data.eway_bill_no) {
      this.eWayBillNo = data.eway_bill_no;
    } else {
      this.eWayBillNo = '';
    }
    this.personName = data.user_name;
    this.personMobile = data.mobile;
    this.totalValue = data.total_value;
    this.totalBoxes = data.total_boxes;
    this.totalItems = data.total_items;
    this.totalWg = data.total_weight;
    this.length = data.length;
    this.width = data.width;
    this.height = data.height;
    if (data.mode === 'Apex') {
      this.mode = '1';
    } else {
      this.mode = '2';
    }
    this.boxType = [];
    if (data.carton_box_no > 0) {
      const cartonBoxDetails = JSON.parse(data.carton_box_details);
      for (let i = 0; i < cartonBoxDetails.length; i++) {
        this.boxType.push({
          type: cartonBoxDetails[i].type,
          cartonBoxNo: cartonBoxDetails[i].cartonBoxNo,
          toteId: cartonBoxDetails[i].toteId,
          tagId: cartonBoxDetails[i].tagId,
          toteImage: '',
          tagImage: '',
          topSealImage: '',
          bottomSealImage: '',
          approver_validated: cartonBoxDetails[i].approver_validated,
          approved_by: cartonBoxDetails[i].approved_by,
        });
      }
    }
    if (data.tote_box_no > 0) {
      const toteBoxDetails = JSON.parse(data.tote_box_details);
      for (let j = 0; j < toteBoxDetails.length; j++) {
        this.boxType.push({
          type: toteBoxDetails[j].type,
          cartonBoxNo: toteBoxDetails[j].cartonBoxNo,
          toteId: toteBoxDetails[j].toteId,
          tagId: toteBoxDetails[j].tagId,
          toteImage: '',
          tagImage: '',
          topSealImage: '',
          bottomSealImage: '',
          approver_validated: toteBoxDetails[j].approver_validated,
          approved_by: toteBoxDetails[j].approved_by
        });
      }
    }
    this.awbNo = data.awb_no;
    this.getFileDetails(data.id);
    this.loading = false;
  }


  /* ********** Create New ************ */
  selectRC() {
    this.toAd_type = 'rc';
    this.toAddId = 'rc';
    this.toAddress = this.toRcAddress;
  }

  selectDC() {
    this.toAd_type = 'dc';
    this.toAddress = '';
    this.toAddressId = 'Select the Address';
  }

// ngOnInit() {
//   const storedPartList = localStorage.getItem('partlist');
//   if (storedPartList) {
//     this.partList = JSON.parse(storedPartList);

//     this.partList.forEach((part: any) => {
//       part.value = parseFloat(part.value) || 0;
//       part.hsn_code = parseInt(part.hsn_code) || 0;

//       part._valueFromDB = part.part_no && part.value > 0;
//       part._hsnFromDB = part.part_no && part.hsn_code > 0;

//       part._valueLocked = false;
//       part._hsnLocked = false;
//       part._editing_value = false;
//       part._editing_hsn = false;

//       console.log(`Initialized Part ${part.part_no}:`, {
//         value: part.value,
//         hsn_code: part.hsn_code,
//         _valueFromDB: part._valueFromDB,
//         _hsnFromDB: part._hsnFromDB
//       });
//     });
//   }
// }




ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((params: Params) => {
    // console.log('isApprover:', this.isApprover);

    if (params['from'] === 'approver') {
      // console.log('isApprover:', this.isApprover);

      this.isReadOnlyMode = true;
    }
  });

  const storedPartList = localStorage.getItem('partlist');
  if (storedPartList) {
    this.partList = JSON.parse(storedPartList);

    this.partList.forEach((part: any) => {
      part.value = parseFloat(part.value) || 0;
      part.hsn_code = parseInt(part.hsn_code) || 0;

      part._valueFromDB = part._valueFromDB ?? (part.part_no && part.value > 0);
      part._hsnFromDB = part._hsnFromDB ?? (part.part_no && part.hsn_code > 0);

      part._valueLocked = part._valueLocked ?? false;
      part._hsnLocked = part._hsnLocked ?? false;
      part._editing_value = false;
      part._editing_hsn = false;
    });
  }
}


onValueFocus(part: any): void {
  if (!part._valueFromDB && !part._valueLocked) {
    part._editing_value = true;
  }
}

onHSNFocus(part: any): void {
  if (!part._hsnFromDB && !part._hsnLocked) {
    part._editing_hsn = true;
  }
}

onValueBlur(part: any): void {
  part.value = parseFloat(part.value) || 0;
  part._editing_value = false;

  // Lock if user entered a value manually
  if (part.value > 0 && !part._valueFromDB) {
    part._valueLocked = true;
  }
}

onHSNBlur(part: any): void {
  part.hsn_code = part.hsn_code || 0;
  part._editing_hsn = false;

  if (part.hsn_code > 0 && !part._hsnFromDB) {
    part._hsnLocked = true;
  }
}



addServicePart(inputData: any) {
   if ((inputData.serialNo !== '') && (inputData.partNo !== '') && (inputData.description !== '') && (inputData.returnOrder !== '') &&
  (inputData.repairNo !== '') && (inputData.box !== '') && (inputData.value !== '') && (inputData.PoNo !== '') &&
  (inputData.HSNCode !== '')) {
    // Normalize and assign to consistent internal fields
    inputData.value = parseFloat(inputData.value) || 0;
    inputData.hsn_code = parseInt(inputData.HSNCode) || 0;

    inputData._valueFromDB = false;
    inputData._hsnFromDB = false;
    inputData._valueLocked = inputData.value > 0;
    inputData._hsnLocked = inputData.hsn_code > 0;
    inputData._editing_value = false;
    inputData._editing_hsn = false;

    this.partList.push(inputData);

    // Reset form
    this.servicePartInput = [{
      ticket_no: '',
      serial_no: '',
      part_no: '',
      part_description: '',
      return_order: '',
      repair_no: '',
      return_status: '',
      value: '',
      po_number: '',
      hsn_code: ''
    }];
  }

  this.totalItems = this.partList.length;
  this.getTotalValue();
}

  deleterow(idx: any) {
    this.partList.splice(idx, 1);
    this.totalItems = this.partList.length;
    this.getTotalValue();
  }

  modeonChange(event: any) {
    this.mode = event;
  }

  boxonChange(event: any, boxNo: any) {
    this.boxType[boxNo] = {type: event, cartonBoxNo: '', toteId: '', tagId: '', toteImage: '', tagImage: '', topSealImage: '', bottomSealImage: '', approver_validated: 0, approved_by: ''};
  }

  /* selectDOA() {
    console.log(this.isDoa);
  } */
  imageSelect(boxDetail: any, image_model: any) {
    this.currentImageType = boxDetail;
    this.modalService.open(image_model);
  }

  async saveKBB(simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
    let isBattery: any;
    let notFilled = false;
    let total1 = 0;
    this.toteBoxes = [];
    this.cartonBoxes = [];
    let checkCINType = 'RC';
    let checkWUMSType = 'DC';
    if (this.personMobile !== '') {
      this.notfilled = true;
    }

    if (this.toAddId.length === 0) {
      alert('Please select the To Address');
      this.buttonSpin = false;
      return;
    }

    if (this.partList.length > 0) {
      for (let j = 0; j < this.partList.length; j++) {
        if (
          this.partList[j].value == '' ||
          this.partList[j].value == '0' ||
          this.partList[j].value == 0 ||
          this.partList[j].hsn_code == '' ||
          this.partList[j].hsn_code == '0' ||
          this.partList[j].hsn_code == 0
        ) {
          notFilled = true;
          break;
        } else {
            total1 = +total1 + parseFloat(this.partList[j].value);
        }

        if (this.partList[j].repair_type === 'CIN') {
          checkCINType = 'DC';
        }

        if (this.partList[j].repair_type === 'WUMS') {
          checkWUMSType = 'RC';
        }

        if (this.partList[0].return_status === "DOA") {
          this.isDoa = true;
        } else {
          this.isDoa = false;
        }

      }
      const totalTemp = total1.toFixed(2);
      if (totalTemp !== this.totalValue) {
        this.totalValue = totalTemp;
      }
    }

    if ((this.toAd_type === 'rc') && (checkCINType === 'DC')) {
      alert('Select the Correct Shipping Address for Carry-In parts');
      return;
    } else if ((this.toAd_type === 'dc') && (checkWUMSType === 'RC')) {
      alert('Select the Correct Shipping Address for Mail-In parts');
      return;
    }

    for (let i = 0; i < this.totalBoxes; i++) {
      if (this.boxType[i].type === '1') {
        this.cartonBoxes.push(this.boxType[i]);
        if (this.boxType[i].cartonBoxNo === '') {
          notFilled = true;
        }
      } else {
        this.toteBoxes.push(this.boxType[i]);
        if ((this.boxType[i].toteId === '') || (this.boxType[i].tagId === '')) {
          notFilled = true;
        }
      }
    }

    if ((this.totalBoxes <= 0) || (this.totalWg === '') || (this.awbNo === '') || (this.length === '') || (this.width === '') || (this.height === '') || (this.toAd_type.toLowerCase().includes('dc') && !this.isFormValid())) {
      notFilled = true;
    }

    if (notFilled === true) {
      alert('Fill all mandatory fileds');
      this.buttonSpin = false;
      return;
    }

    if (notFilled === false) {
      for (let i = 0; i < this.partList.length; i++) {
        const partDes = this.partList[i].part_description.toLowerCase();
        isBattery = partDes.includes('battery');
      }

      if ((isBattery) && (this.mode === 'Apex')) {
        alert ('Battery Parts should be in Surface mode only \n \n**Note: Refer Mode of Transport**');
      } else {
        // this.createNRDC(simple_alert_temp); //create NRDC Exception
        if(this.toAd_type.includes('rc')) {
          if (this.mode === '1' || this.mode === 'Apex') {
          const isValid = await this.check_battery_compitia();
          if (!isValid) {
            return;
          }
       }
         this.createBulkReturn(simple_alert_temp);
        } else {
    this.createNRDC(simple_alert_temp);
  }
        /* if (this.partList[0].return_status === 'DOA') {
          this.createNRDC(simple_alert_temp);
        } else {
          this.createBulkReturn(simple_alert_temp);
        } */
      }
    }
  }
// saveKBB(simple_alert_temp: TemplateRef<any>) {
//   this.buttonSpin = true;
//   let isBattery: any;
//   let notFilled = false;
//   let total1 = 0;
//   this.toteBoxes = [];
//   this.cartonBoxes = [];
//   let checkCINType = 'RC';
//   let checkWUMSType = 'DC';

//   if (this.personMobile !== '') {
//     this.notfilled = true;
//   }

//   // Validate To Address
//   if (this.toAddId.length === 0) {
//     alert('Please select the To Address');
//     this.buttonSpin = false;
//     return;
//   }

//   // Validate Part List
//   if (this.partList.length > 0) {
//     for (let j = 0; j < this.partList.length; j++) {
//       const part = this.partList[j];

//       if (part.value === '') {
//         notFilled = true;
//         break;
//       }

//       if (part.value === '' || part.value == null || part.hsn === '' || part.hsn == null)  {
//         notFilled = true;
//         break;
//       }

//       total1 += parseFloat(part.value);

//       if (part.repair_type === 'CIN') {
//         checkCINType = 'DC';
//       }

//       if (part.repair_type === 'WUMS') {
//         checkWUMSType = 'RC';
//       }

//       this.isDoa = part.return_status === "DOA";
//     }

//     const totalTemp = total1.toFixed(2);
//     if (totalTemp !== this.totalValue) {
//       this.totalValue = totalTemp;
//     }
//   }

//   // Validate Address Type vs Part Type
//   if ((this.toAd_type === 'rc') && (checkCINType === 'DC')) {
//     alert('Select the Correct Shipping Address for Carry-In parts');
//     return;
//   }

//   if ((this.toAd_type === 'dc') && (checkWUMSType === 'RC')) {
//     alert('Select the Correct Shipping Address for Mail-In parts');
//     return;
//   }

//   // Validate Box Inputs
//   for (let i = 0; i < this.totalBoxes; i++) {
//     const box = this.boxType[i];

//     if (box.type === '1') {
//       this.cartonBoxes.push(box);
//       if (box.cartonBoxNo === '') {
//         notFilled = true;
//       }
//     } else {
//       this.toteBoxes.push(box);
//       if (box.toteId === '') {
//         notFilled = true;
//       }
//       if (box.tagId === '') {
//         notFilled = true;
//       }
//     }
//   }

//   // Validate Global Fields
//   if (this.totalBoxes <= 0) {
//     notFilled = true;
//   }
//   if (this.totalWg === '') {
//     notFilled = true;
//   }
//   if (this.awbNo === '') {
//     notFilled = true;
//   }
//   if (this.length === '') {
//     notFilled = true;
//   }
//   if (this.width === '') {
//     notFilled = true;
//   }
//   if (this.height === '') {
//     notFilled = true;
//   }
//   if (this.toAd_type.toLowerCase().includes('dc') && !this.isFormValid()) {
//     notFilled = true;
//   }

//   // Final Validation
//   if (notFilled) {
//     alert('Fill all mandatory fields');
//     this.buttonSpin = false;
//     return;
//   }

//   // Proceed based on mode and battery check
//   for (let i = 0; i < this.partList.length; i++) {
//     const partDes = this.partList[i].part_description.toLowerCase();
//     isBattery = partDes.includes('battery');
//   }

//   if ((isBattery) && (this.mode === 'Apex')) {
//     alert('Battery Parts should be in Surface mode only \n \n**Note: Refer Mode of Transport**');
//   } else {
//     if (this.toAd_type.includes('rc')) {
//       this.createBulkReturn(simple_alert_temp);
//     } else {
//       this.createNRDC(simple_alert_temp);
//     }
//   }
// }

check_battery_compitia(): Promise<boolean> {

  const repairIds: string[] = [];

  for (let i = 0; i < this.partList.length; i++) {
    if (this.partList[i].repair_no) {
      repairIds.push(this.partList[i].repair_no);
    }
  }

  const payload = {
    repair_ids: repairIds,
    mode: this.toAd_type.toLowerCase(),
    type: this.mode
  };

  return new Promise((resolve) => {
    this.dataService.checkBatteryByRepairIds(payload).subscribe({
      next: (res: any) => {
        if (res.status === false) {
          alert(res.message);
          this.loading = false;
          this.buttonSpin = false;
          resolve(false);
        } else {
          resolve(true);
        }
      },
      error: () => {
        alert('Battery validation failed');
        this.buttonSpin = false;
        resolve(false);
      }
    });
  });
}


  createNRDC(simple_alert_temp: TemplateRef<any>) {
    this.buttonSpin = true;
        let mode = 'Apex';
        if (this.mode === '1') {
          mode = 'Apex';
        } else if (this.mode === '2') {
          mode = 'Surface';
        }

        const return_hd = [
          {'return_to': this.toAddId, 'date': this.outwardDate, 'user_name': this.personName,
        'mobile': this.personMobile, 'eway_bill_no': this.eWayBillNo, 'total_boxes': this.totalBoxes, 'total_items': this.totalItems,
        'total_weight': this.totalWg, 'total_value': this.totalValue, 'mode': mode, 'awb_no': this.awbNo,
        'carton_box_no': this.cartonBoxes.length, 'tote_box_no': this.toteBoxes.length, 'user_id': localStorage.getItem('userId'),
        'length': this.length, 'width': this.width, 'weight': this.totalWg, 'height': this.height, 'transportation_carrier': 'XBDE', 'tracking_no': this.awbNo,
        'bulk_return_id': this.bulkReturnId
          }
        ];

        // this.partList.forEach((element: any) => { delete element.invalid;});
        // // this.partList.forEach((element: any) => { delete element.captured_serial_no;});
        // const return_dt = this.partList;
        // let result: any;
        // // return;

        // this.dataService.kbbSubmit(return_hd, return_dt, this.cartonBoxes, this.toteBoxes)
         const return_dt = this.partList.map((part: any) => {
         const cleanPart = { ...part };

    // Transfer hsn -> hsn_code if needed
    if (!cleanPart.hsn_code && cleanPart.hsn) {
      cleanPart.hsn_code = cleanPart.hsn;
    }

    // Remove frontend-only fields
    delete cleanPart.hsn;
    delete cleanPart._valueFromDB;
    delete cleanPart._hsnFromDB;
    delete cleanPart._valueLocked;
    delete cleanPart._hsnLocked;
    delete cleanPart._editing_value;
    delete cleanPart._editing_hsn;
    delete cleanPart.invalid;


    return cleanPart;
  });

  let result: any;

  this.dataService.kbbSubmit(return_hd, return_dt, this.cartonBoxes, this.toteBoxes)
            .subscribe(
              (data) => {
                  result = data;
                  if (result.status === true) {
                    this.nrdcNo = result.nrdc_no;
                    localStorage.setItem('nrdcNo', this.nrdcNo);
                    if(this.toAd_type.includes('rc')) {
                      this.simpleAlert = {title: 'KBB Outward', msg: 'Form has been submitted for Approve.\n' + 'NRDC No:' + ' ' + this.nrdcNo +  '-' + 'Bulk Return ID: ' + this.bulkReturnId};
                    } else {
                      this.simpleAlert = {title: 'KBB Outward', msg: 'Form has been saved as Draft.\n' + 'NRDC No:' + ' ' + this.nrdcNo};
                    }
                    this.buttonSpin = false;
                    this.openModal(simple_alert_temp);
                  } else {
                    this.buttonSpin = false;
                    alert(result.message);
                  }
        });
  }

  approveKbb(simple_alert_temp: TemplateRef<any>) {
    if (((this.branchType === 'I') || (this.branchType === 'A') || (this.branchType === 'O')) && ((!this.kbbVideoExist) && !this.approveBoxes())) {
      alert('KBB Packing Video/Images not yet uploaded.');
      this.buttonSpin = false;
      return;
    }

    let confirmKbbImage = true;
    let r;
      r = confirm('Are sure want to Approve this NRDC' + this.exKBBDetailsHd.id + '?');
      if (r === true) {
        if ((parseInt(this.totalValue) >= 50000)) {
          if (this.eWayBillNo === '') {
            alert('E-Way Bill number is mandatory, if Total value 50000 and above');
            return;
          } else {
            for (let i = 0; i < this.partList.length; i++) {
              if ((this.partList[i].image_required === '1') && ((this.partList[i].displayCheckColor === 'red'))) {
                confirmKbbImage = false;
              }
            }
            if (confirmKbbImage) {
              // this.submit(simple_alert_temp, 'Y');
              if(this.toAddId.toLowerCase().includes('dc') && localStorage.getItem('partlist')) {
                // this.updateValidationDetails(simple_alert_temp);
                this.bulkReturnConfirm(simple_alert_temp);
              } else {
                this.bulkReturnConfirm(simple_alert_temp);
              }
              this.buttonSpin = true;
            } else {
              alert('KBB Images are not verified.');
            }
          }
        } else {
          if (this.eWayBillNo === '') {
            alert('E-Way Bill number is mandatory, if Total value is less than 50000 please enter NOEWAYBILL');
            return;
          } else {
            for (let i = 0; i < this.partList.length; i++) {
              if ((this.partList[i].image_required === '1') && ((this.partList[i].displayCheckColor === 'red'))) {
                confirmKbbImage = false;
              }
            }
            if (confirmKbbImage) {
              // this.submit(simple_alert_temp, 'Y');
              if(this.toAddId.toLowerCase().includes('dc') && localStorage.getItem('partlist')) {
                // this.updateValidationDetails(simple_alert_temp);
                this.bulkReturnConfirm(simple_alert_temp);
              } else {
                this.bulkReturnConfirm(simple_alert_temp);
              }
              this.buttonSpin = true;
            } else {
              alert('KBB Images are not verified.');
            }
          }
        }
      }

  }

  declineKbb(decline_temp: TemplateRef<any>) {
    this.openModal(decline_temp);
    this.buttonSpin = true;
  }

  submit(simple_alert_temp: TemplateRef<any>, status: any) {
    if (status === 'D') {
      if (this.remarks === '') {
        this.notfilled = true;
      } else {
        this.notfilled = false;
        this.modalService.dismissAll();
      }
    }

    if (this.notfilled === false) {
      let result: any;
      this.dataService.approveDeclineKbb(this.exKBBDetailsHd.id, status, this.eWayBillNo)
            .subscribe(
              (data) => {
                  result = data;
                  this.buttonSpin = false;
                  this.simpleAlert = {title: 'KBB Outward', msg: result.message};
                  this.openModal(simple_alert_temp);
                  localStorage.removeItem('isApprover');
        });
    }
  }
  exportPartList():void {
    if (this.partList.length !== 0) {
      this.excelService.exportAsExcelFile(this.partList, this.nrdcNo.slice(3)+'_'+'KBB Part List');
    } else {
      alert('No part details are not available');
    }
  }

  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  imageVerification(sPart: any, image_verify_temp: TemplateRef<any>, indx: any) {
    let result: any = [];
    this.selectedDisplay = [];
    this.selectedDisplay = sPart;
    this.selectedDisplayIdx = indx;
    this.kbbGDriveImage = [];
    let s3Images: any = [];
    this.userService.getS3FileDetails(sPart.ticket_no)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            s3Images = result.images_raf;
            for (let i = 0; i < s3Images.length; i++) {
              if (s3Images[i].type === 'Barcode Serial') {
                this.diagnosisImage =  'https://icare-raf.s3.ap-south-1.amazonaws.com/' + s3Images[i].folder + '/' + s3Images[i].file_id;
              }

              if (s3Images[i].type === 'KBBDC') {
                const imageUrl = 'https://icare-raf.s3.ap-south-1.amazonaws.com/' + s3Images[i].folder + '/' + s3Images[i].file_id;
                s3Images[i].file_id = imageUrl;
                this.kbbGDriveImage.push(s3Images[i]);
              }
            }

            if (this.kbbGDriveImage.length != 0) {
              this.kbbImage = this.kbbGDriveImage[0].file_id;
              this.kbbImageSide = this.kbbGDriveImage[0].side;
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });

      setTimeout(() => {
        this.openModal(image_verify_temp);
      }, 1000);
  }

  kbbImagetype(imgSideIdx: any) {
    this.kbbImage = this.kbbGDriveImage[imgSideIdx].file_id;
  }

  openImage(url: any) {
    window.open(url, '_blank');
  }

  /* isImageVisible(isVisible: any) {
    this.kbbImageVisibled = isVisible;
  } */

  kbbImageApprove() {
    // if (this.kbbImageVisibled) {
      this.partList[this.selectedDisplayIdx].displayCheckColor = 'green';
      this.modalService.dismissAll();
   /*  } else {
      alert('Login to Google drive and then verify the Images');
    } */
  }

  createBulkReturn(simple_alert_temp: TemplateRef<any>) {

    this.buttonSpin = true;
    let bulkReturnParts: any = [];
    for (let i = 0; i < this.partList.length; i++) {
      bulkReturnParts.push({
        returnOrderNumber: this.partList[i].return_order,
        sequenceNumber: parseInt(this.partList[i].sequence_number),
        overPackId: '1',
        action: 'CREATE',
        partNumber: this.partList[i].part_no,
        repairId: this.partList[i].repair_no
      });
    }

    let bulkReturnJSON: any = [];
    bulkReturnJSON.push({
      'data': {
        'shipmentDetails': {
          packageMeasurements: {
            "length": this.length,
            "width": this.width,
            "weight": this.totalWg,
            "height": this.height

          },
          carrierCode: "XBDE",
          trackingNumber: this.awbNo
        },
        'parts': bulkReturnParts,
        'shipTo': localStorage.getItem('shipTo'),
      },
      'user_id': localStorage.getItem('userId'),
      'branch_code': this.userBranch,
      'type': this.toAddId
    });

    if (this.toAddId.toLowerCase().includes('dc')) {
      bulkReturnJSON[0]['nrdc_no'] = this.nrdcNo.slice(3);
  }


    let result: any = [];
    this.dataService.bulkReturnCreateV2(bulkReturnJSON)
          .subscribe({
            next: (data: any) => {
              result = data;
              this.bulkReturnError = '';
              if (result.status === true) {
                this.buttonSpin = false;
                if (result.gsx_response.outcome) {
                  let errors: any;
                  errors = result.gsx_response.outcome.reasons;
                  this.bulkReturnError = this.sanitizer.sanitize(SecurityContext.HTML, this.bulkReturnError);
                  for (let i = 0; i < errors.length; i++) {
                    this.bulkReturnError = this.bulkReturnError + '<br/>' + errors[i].messages[0];
                  }
                  this.simpleAlert = {title: 'KBB Outward', msg:''}
                  this.openModal(simple_alert_temp);
                } else {
                  this.bulkReturnId = result.gsx_response.bulkReturn;
                  if(this.toAd_type.includes('rc')) {
                    this.createNRDC(simple_alert_temp);
                  } else {
                    this.buttonSpin = false;
                    this.simpleAlert = {title: 'KBB Outward', msg: 'Form has been submitted for Approve.\n' + 'NRDC No:' + ' ' + this.nrdcNo +  '-' + 'Bulk Return ID: ' + result.gsx_response.bulkReturn};
                    this.openModal(simple_alert_temp);
                  }
                  // this.createNRDC(simple_alert_temp);draft change also next 3 lines were commented before
                }
              } else {
                this.buttonSpin = false;
                if (result.response) {
                  let errors: any;
                  errors = result.response.errors;
                  this.bulkReturnError = this.sanitizer.sanitize(SecurityContext.HTML, this.bulkReturnError);
                  for (let i = 0; i < errors.length; i++) {
                    this.bulkReturnError = this.bulkReturnError + '<br/>' + errors[i].message;
                  }
                  this.simpleAlert = {title: 'KBB Outward', msg:''}
                  this.openModal(simple_alert_temp);
                } else {
                  alert(result.message);
                }
              }
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  printReturnLabel() {
    if (this.partList.length === 1) {
      this.singleLablePrint();
    } else {
      this.printReturnLabels();
    }
  }

  printReturnLabels() {
    const tab: any = window.open();
    this.dataService.labelPrint(this.nrdcNo.slice(3), this.bulkReturnId) //this.bulkReturnId
          .subscribe({
            next: (data: Blob | MediaSource) => {
              const fileUrl = URL.createObjectURL(data);
              tab.location.href = fileUrl;
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  singleLablePrint() {
    const tab: any = window.open();
    this.dataService.labelSinglePrint(this.nrdcNo.slice(3), this.bulkReturnId) //this.bulkReturnId
          .subscribe({
            next: (data: Blob | MediaSource) => {
              const fileUrl = URL.createObjectURL(data);
              tab.location.href = fileUrl;
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  bulkReturnConfirm(simple_alert_temp: TemplateRef<any>) {
    let result: any = [];
    this.dataService.bulkReturnConfirm(this.nrdcNo.slice(3))
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.submit(simple_alert_temp, 'Y');
              } else {
                if ((this.bulkReturnId === '') || (this.bulkReturnId === null)) {
                  this.submit(simple_alert_temp, 'Y');
                } else {
                  // this.submit(simple_alert_temp, 'Y'); // Exception for confirm
                  if (result.response) {
                    let errors: any;
                    errors = result.response.errors;
                    this.bulkReturnError = this.sanitizer.sanitize(SecurityContext.HTML, this.bulkReturnError);
                    for (let i = 0; i < errors.length; i++) {
                      this.bulkReturnError = this.bulkReturnError + '<br/>' + errors[i].message;
                    }
                    this.simpleAlert = {title: 'KBB Outward', msg:''}
                    this.openModal(simple_alert_temp);
                  } else {
                    alert(result.message);
                  }
                }
              }
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  printPackingList() {
    const tab: any = window.open();
    this.dataService.packListPrint(this.nrdcNo.slice(3), this.bulkReturnId) //this.bulkReturnId
          .subscribe({
            next: (data: Blob | MediaSource) => {
              const fileUrl = URL.createObjectURL(data);
              tab.location.href = fileUrl;
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  printNrdc() {
    const url = localStorage.getItem('rootUrl') + 'api/returns/print?X_API_KEY=' + localStorage.getItem('userToken') + '&id=' + this.nrdcNo.slice(3) + '&approved=' + 'N';
    const tab = window.open(url);
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

    const datevalue = Date.now();
        const date = new Date(datevalue);
        const timeStamp = date.getFullYear() + '-' +
          String(date.getMonth() + 1).padStart(2, '0') + '-' +
          String(date.getDate()).padStart(2, '0') + ' ' +
          String(date.getHours()).padStart(2, '0') + ':' +
          String(date.getMinutes()).padStart(2, '0') + ':' +
          String(date.getSeconds()).padStart(2, '0');


    if (this.selectedFiles) {
      let bucketName = 'kbb-kgb-video';
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = String(today.getFullYear()).padStart(2, '0');
      const folder = year+ '/' + month+ '/' +day + '/' + this.nrdcNo.slice(3);
      const extension =  this.selectedFiles.type.split('/')[1];
      var uniqueSuffix = '';
      if(this.imageType == 'Tote') {
        uniqueSuffix = this.currentImageType.toteId+'_'+timeStamp;
      } else if(this.imageType == 'Tag') {
        uniqueSuffix = this.currentImageType.tagId+'_'+timeStamp;
      } else if(this.imageType == 'TopSeal' || this.imageType == 'BottomSeal') {
        uniqueSuffix = this.currentImageType.cartonBoxNo+'_'+timeStamp;
      } else if(this.imageType == 'AWB') {
        uniqueSuffix = timeStamp;
      } else {
        this.imageType = 'video';
        uniqueSuffix = 'RCPacking';
      }
      // const uniqueSuffix = Date.now();
      let filename = this.nrdcNo.slice(3)+'_'+this.imageType+'_'+uniqueSuffix+'.'+extension;
      this.userService.uploadVideoS3Bucket(this.selectedFiles, bucketName, folder, filename)
        .then((fileUrl) => {
          this.updateS3Data(filename);
        })
        .catch((error) => {
          alert('Error uploading file:' + error);
          console.error('Error uploading file:', error);
        });
    } else {
      alert('Video/Image is not selected');
    }
  }

  updateS3Data(filename: any) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).padStart(2, '0');
    const folder = year+ '/' + month+ '/' +day + '/' + this.nrdcNo.slice(3);
    let commonData = '&ticket_id=' + this.nrdcNo.slice(3) + '&type=' + 'KBB' + '&side=' + '' + '&bucket_name=' + 'kbb-kgb-video' + '&name=' + filename + '&folder=' + folder;
    if(this.imageType != "video") {

      commonData = '&ticket_id=' + this.nrdcNo.slice(3) + '&type=' + 'KBB' + '&side=' + this.imageType + '&bucket_name=' + 'kbb-kgb-video' + '&name=' + filename + '&folder=' + folder;

    }
    this.userService.updateS3File(commonData)
    .subscribe({
      next: (data: any) => {
      this.buttonSpin = false;

      if(this.toAd_type.toLowerCase().includes('dc')) {
        const index = this.boxType.findIndex((box : any) => box.id === this.currentImageType.id);

        if (index !== -1) {
          if (this.imageType === 'Tote') {
          this.boxType[index].toteImage = '1';
        } else if (this.imageType === 'Tag') {
          this.boxType[index].tagImage = '1';
        } else if (this.imageType === 'TopSeal') {
          this.boxType[index].topSealImage = '1';
        } else if (this.imageType === 'BottomSeal') {
          this.boxType[index].bottomSealImage = '1';
        }
      }
      }

       alert('KBB video/image have been uploaded successfully');
       this.selectedFiles = '';
       this.imageType = '';
      }, // success path
      error: (error: any) => this.error = error // error path
    });
  }

  getFileDetails(ticketId: any) {
    let result: any;
    this.userService.getS3FileDetails(ticketId)
      .subscribe(
        (data) => {
          result = data;
          if(this.toAd_type.includes('rc')) {
            if ((result.status === true) && (result.images.length !== 0)) {
              for(let i = 0; i < result.images.length; i++) {
                if (result.images[i].ticket_id === ticketId) {
                  this.kbbVideoExist = true;
                }
              }
            } else {
              alert('KBB Packing Video/Image not yet uploaded.')
              this.buttonSpin = false;
            }
          }

          if(this.toAd_type.toLowerCase().includes('dc')) {
            this.kbbVideoExist = true;
            if ((result.status === true) && (result.images.length !== 0)) {
              const sidesMap = {
                Tote: { key: 'toteImage', idField: 'toteId' },
                Tag: { key: 'tagImage', idField: 'tagId' },
                TopSeal: { key: 'topSealImage', idField: 'cartonBoxNo' },
                BottomSeal: { key: 'bottomSealImage', idField: 'cartonBoxNo' }
              } as const;

              type SideKey = keyof typeof sidesMap;

              Object.values(result.images).forEach((image:any) => {
                // const regex = /^(\d+)_(Tote|Tag|TopSeal|BottomSeal)_(.+)\.\w+$/;
                const regex = /^(\d+)_(Tote|Tag|TopSeal|BottomSeal)_([^_]+)_(.+)\.\w+$/;
                const match = image.file_id.match(regex);
                if (match) {
                  const [, ticketId, side, id] = match;

                  if (side in sidesMap) {
                    const { key: imageField, idField } = sidesMap[side as SideKey];

                    const index = this.boxType.findIndex(
                      (box) => box[idField] === id
                    );

                    if (index !== -1) {
                      this.boxType[index][imageField] = '1';
                    }
                  }
                }
              });
            } else {
              alert('KBB Packing Images not yet uploaded.')
              this.buttonSpin = false;
            }
          } else {
            this.kbbTagExist = true;
            this.kbbToteExist = true;
            this.kbbAWBExist = true;
          }
      });
  }

  approveBoxes() {
    if (this.toAd_type.toLowerCase().includes('rc')) {
      return true;
    } else {
      const allValid = this.boxType.every((box: any) => {
        if (box.type === '1') {
          return box.topSealImage === '1' && box.bottomSealImage === '1';
        } else if (box.type === '2') {
          return box.tagImage === '1' && box.toteImage === '1';
        } else {
          return false;
        }
      });
      return allValid;
    }
  }


  updateEwayBill() {
    let result: any = [];
    this.dataService.eWayBillUpdate(this.nrdcNo.slice(3), this.eWayBillNo)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                alert('E-Way Bill number have been updated successfully');
                window.location.reload();
              } else {
                alert(result.message);
              }
            }, // success path
            error: (error: any) => this.error = error // error path
        });
  }

  checkSerial(part: any, index: any) {
    // console.log(part.captured_serial_no);
    // console.log(part.kbb_serial_no);
    if(part.captured_serial_no != '') {
       if (part.return_status === 'DOA' || part.return_status === 'GPR') {
        // console.log(part.kgb_serial_no);
      if (part.captured_serial_no.split('+')[0] === part.kgb_serial_no) {
        part.invalid = false;
        const datevalue = Date.now();
        const date = new Date(datevalue);
        const timeStamp = date.getFullYear() + '-' +
          String(date.getMonth() + 1).padStart(2, '0') + '-' +
          String(date.getDate()).padStart(2, '0') + ' ' +
          String(date.getHours()).padStart(2, '0') + ':' +
          String(date.getMinutes()).padStart(2, '0') + ':' +
          String(date.getSeconds()).padStart(2, '0');
        this.partList[index].captured_serial_no = part.captured_serial_no.split('+')[0];
        this.partList[index].kbb_captured_date = timeStamp;

        localStorage.setItem('partlist', JSON.stringify(this.partList));
        return;
       }
      }
      if (part.captured_serial_no.split('+')[0] !== part.kbb_serial_no) {
        part.invalid = true;
        part.captured_serial_no = '';
      } else {
        part.invalid = false;
        const datevalue = Date.now();
        const date = new Date(datevalue);
        const timeStamp = date.getFullYear() + '-' +
          String(date.getMonth() + 1).padStart(2, '0') + '-' +
          String(date.getDate()).padStart(2, '0') + ' ' +
          String(date.getHours()).padStart(2, '0') + ':' +
          String(date.getMinutes()).padStart(2, '0') + ':' +
          String(date.getSeconds()).padStart(2, '0');
        // const index = this.partList.findIndex((item: any) => item.kbb_serial_no === part.kbb_serial_no);
        // if (index !== -1) {
        //   this.partList[index].captured_serial_no = part.captured_serial_no;
        //   this.partList[index].kbb_captured_date = timeStamp;
        //   localStorage.setItem('partlist', JSON.stringify(this.partList));
        // }

        this.partList[index].captured_serial_no = part.captured_serial_no.split('+')[0];
        this.partList[index].kbb_captured_date = timeStamp;

        localStorage.setItem('partlist', JSON.stringify(this.partList));
      }
    } else {
      part.invalid = true;
    }
  }
  // checkSerialDoaGpr(part: any, index: any) {

  //   const scanSerial = part.captured_serial_no.split('+')[0];
  //   // get the KGB serial from kgbList
  //   let validSerial = '';
  //   for (let i = 0; i < this.kgbList.length; i++) {
  //     if (this.kgbList[i].part_no === part.part_no) {

  //       if (part.return_status === 'DOA') {
  //         validSerial = this.getKgbSerialFromJson(this.kgbList[i].doa_json);
  //       } else if (part.return_status === 'GPR') {
  //         validSerial = this.getKgbSerialFromJson(this.kgbList[i].gpr_json);
  //       }
  //       break;
  //     }
  //   }

  //   // serial mismatch
  //   if (scanSerial !== validSerial) {
  //     part.invalid = true;
  //     part.captured_serial_no = '';
  //     return;
  //   }

  //   // serial matched
  //   part.invalid = false;

  //   // timestamp
  //   const date = new Date();
  //   const timeStamp = date.getFullYear() + '-' +
  //     String(date.getMonth() + 1).padStart(2, '0') + '-' +
  //     String(date.getDate()).padStart(2, '0') + ' ' +
  //     String(date.getHours()).padStart(2, '0') + ':' +
  //     String(date.getMinutes()).padStart(2, '0') + ':' +
  //     String(date.getSeconds()).padStart(2, '0');

  //   this.partList[index].captured_serial_no = scanSerial;
  //   this.partList[index].kbb_captured_date = timeStamp;

  //   localStorage.setItem('partlist', JSON.stringify(this.partList));
  // }
  // getKgbSerialFromJson(data: any): string {
  //   if (!data) return '';

  //   try {
  //     const parsed = JSON.parse(data);
  //     return parsed.kgb_serialNo?.trim() || ''; // property name inside JSON
  //   } catch (e) {
  //     return ''; // in case of invalid JSON
  //   }
  // }


  // isFormValid() {
  //   return this.partList.every((part: { captured_serial_no: any; kbb_serial_no: any; invalid: any; }) => part.captured_serial_no && part.captured_serial_no === part.kbb_serial_no && !part.invalid);
  // }
  isFormValid() {
    return this.partList.every((part: any) => {
      if (part.return_status === 'DOA' || part.return_status === 'GPR') {
        // For DOA and GPR → match kgb_serial_no
        return part.captured_serial_no &&
          part.captured_serial_no === part.kgb_serial_no &&
          !part.invalid;
      } else {
        // For normal parts → match kbb_serial_no
        return part.captured_serial_no &&
          part.captured_serial_no === part.kbb_serial_no &&
          !part.invalid;
      }
    });
  }


  uploadKBB(kbb_model: any) {
    this.modalService.open(kbb_model);
  }

  approverValidated(part: any, index: any) {
    // const index = this.partList.findIndex((item: any) => item.kbb_serial_no === part.kbb_serial_no);
    if(part.approver_validated == 1) {
        this.partList[index].approver_validated = 1;
        this.partList[index].validated_by = localStorage.getItem('userId');
        localStorage.setItem('partlist', JSON.stringify(this.partList));
    } else {
        this.partList[index].approver_validated = 0;
        this.partList[index].validated_by = '';
        localStorage.setItem('partlist', JSON.stringify(this.partList));
    }
  }

  updateValidationDetails() {
    this.buttonSpin = true;
    let result: any = [];
    this.dataService.validationUpdate(this.partList)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                // this.bulkReturnConfirm(simple_alert_temp);
                alert("Validation details have been updated.");
                this.getKbbData();
                this.buttonSpin = false;
              } else {
                alert('Error occured');
              }
            }, // success path
            error: (error: any) => this.error = error // error path
        });
  }

}
