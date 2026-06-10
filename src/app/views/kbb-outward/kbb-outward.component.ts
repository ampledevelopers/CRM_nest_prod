import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { KbbOutwardService } from './kbb-outward.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../shared/user.service';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
  selector: 'app-kbb-outward',
  templateUrl: './kbb-outward.component.html',
  styleUrls: ['./kbb-outward.component.scss', '../../../scss/customstyle.css'],
  standalone : false
})
export class KbbOutwardComponent {
  error: any;
  loading = false;
  buttonSpin = false;
  bcolor = false;
  ticketSearch = '';
  repairSearch = '';
  ticketId = '';
  gNumber = '';
  data: any = [];
  gsxId = '';
  showList = false;
  showSelectedList = false;
  gsxParts = [];
  partList: any = [];
  partListTemp: any = [];
  selectedPartListTemp: any = [];
  selectedPartList: any = [];
  simpleAlert: SimpleAlert = { title: '', msg: '' };
  fromDate = '';
  toDate = '';
  pageNo = 1;
  isEligibleRC = false;
  siteType = localStorage.getItem('siteType');
  S3Data: any = [];
  constructor(private modalService: NgbModal, private router: Router, public dataService: KbbOutwardService, public userDataService: UserService) {
  }
  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  nextPage() {
    this.pageNo = this.pageNo + 1;
    this.getTicketDetails(this.pageNo);
  }

  prevPage() {
    this.pageNo = this.pageNo - 1;
    this.getTicketDetails(this.pageNo);
  }

  getTicketDetails(pageNo: any) {
    this.buttonSpin = true;
    let gsxData: any;
    let result: any;

    const re = /\//gi;
    this.fromDate = this.fromDate.replace(re, '-');
    this.toDate = this.toDate.replace(re, '-');

    this.partList = [];
    if ((this.fromDate !== '') && (this.toDate !== '')) {
      this.dataService.getReturnDetailList(this.fromDate, this.toDate, this.pageNo)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              gsxData = result.gsx_response.parts;
              if (result.gsx_response.length === 0) {
                alert('No Data is available');
                this.buttonSpin = false;
              } else {
                setTimeout(() => {
                  for (let i = 0; i < gsxData.length; i++) {
                    // let ticketId = gsxData[i].purchaseOrderNumber;
                    /* if(ticketId.length > 9 && ticketId.length != 12) {
                      ticketId = gsxData[i].purchaseOrderNumber.substring(5);
                    } else {
                      ticketId = gsxData[i].purchaseOrderNumber.substring(3);
                    } */
                    let ticketId: any;
                    if (gsxData[i].referenceNumber.includes('DROPOFF')) {
                      ticketId = gsxData[i].referenceNumber.replace('DROPOFF ', '');
                    } else {
                      let numbers = gsxData[i].purchaseOrderNumber.match(/\d+/g);
                      ticketId = numbers ? numbers.join("") : "";
                    }
                    this.partList.push({
                      ticket_no: ticketId,
                      serial_no: gsxData[i].repairDevice.identifiers.serial,
                      part_no: gsxData[i].partNumber,
                      part_description: gsxData[i].partDescription,
                      return_order: gsxData[i].returnOrderNumber,
                      repair_no: gsxData[i].repairId,
                      repair_type: gsxData[i].repairType,
                      repair_status: gsxData[i].repairStatusDescription,
                      po_number: gsxData[i].purchaseOrderNumber,
                      return_status: gsxData[i].returnStatusCode,
                      sequence_number: gsxData[i].sequenceNumber,
                      value: '',
                      hsn_code: '',
                      isSelectPart: false,
                      image_required: '0'
                    });
                  }
                  this.partListTemp = [...this.partList];
                  this.showList = true;
                  this.buttonSpin = false;
                }, 2000);
              }
            } else {
              if (result.gsx_response) {
                const gsxResponse = result.gsx_response.errors[0].message;
                alert(gsxResponse);
              } else {
                alert(result.message);
              }
            }
          });
    } else {
      alert('Please select valid From date and To date');
      this.buttonSpin = false;
    }
  }

  getGSXDataFetch(event: { keyCode: number; target: { value: any; }; }) {
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      this.getGSXData();
    }
  }

  getGSXData() {
    this.buttonSpin = true;
    let gsxData: any;
    let result: any;
    this.partList = [];
    this.selectedPartListTemp = [];
    if (this.gNumber === '') {
      this.bcolor = false;
    } else {
      this.dataService.getReturnDetail(this.gNumber)
        .subscribe(
          (data) => {
            result = data;
            if (result.status === true) {
              gsxData = result.gsx_response.parts;
              if (result.gsx_response.length === 0) {
                alert('No Data is available');
                this.buttonSpin = false;
              } else {
                setTimeout(() => {
                  for (let i = 0; i < gsxData.length; i++) {
                    // let ticketId = gsxData[i].purchaseOrderNumber;
                    // if(ticketId.length > 9) {
                    //   ticketId = gsxData[i].purchaseOrderNumber.substring(5);
                    // } else {
                    //   ticketId = gsxData[i].purchaseOrderNumber.substring(3);
                    // }
                    let ticketId: any;
                    if (gsxData[i].referenceNumber.includes('DROPOFF')) {
                      ticketId = gsxData[i].referenceNumber.replace('DROPOFF ', '');
                    } else {
                      let numbers = gsxData[i].purchaseOrderNumber.match(/\d+/g);
                      ticketId = numbers ? numbers.join("") : "";
                    }
                    this.partList.push({
                      ticket_no: ticketId,
                      serial_no: gsxData[i].repairDevice.identifiers.serial,
                      part_no: gsxData[i].partNumber,
                      part_description: gsxData[i].partDescription,
                      return_order: gsxData[i].returnOrderNumber,
                      repair_no: gsxData[i].repairId,
                      repair_type: gsxData[i].repairType,
                      repair_status: gsxData[i].repairStatusDescription,
                      po_number: gsxData[i].purchaseOrderNumber,
                      return_status: gsxData[i].returnStatusCode,
                      sequence_number: gsxData[i].sequenceNumber,
                      value: '',
                      hsn_code: '',
                      isSelectPart: false,
                      image_required: '0'
                    });
                  }
                  this.partListTemp = [...this.partList];
                  this.showList = true;
                  this.buttonSpin = false;
                }, 2000);
              }
            } else {
              if (result.gsx_response) {
                const gsxResponse = result.gsx_response.errors[0].message;
                alert(gsxResponse);
                this.buttonSpin = false;
              } else {
                alert(result.message);
                this.buttonSpin = false;
              }
            }
          });
    }
  }

  partSelect(event: any, sPart: any, idx: any) {
    let isPartexist: any;
    if (sPart.isSelectPart === true) {
      if (this.siteType === '1') {
        if (sPart.repair_type === 'WUMS') {
          if (sPart.repair_status !== 'Repair Marked Complete') {
            this.getS3Images(sPart.ticket_no, 'RCO');
            // this.isEligibleRC = true;
            setTimeout(() => {
              if (this.isEligibleRC === true) {
                if (event === true) {
                  if (this.selectedPartList.length === 0) {
                    this.selectedPartListTemp.push(sPart);
                    this.getPartDetails(sPart.ticket_no, sPart.part_no);
                  } else {
                    for (let i = 0; i < this.selectedPartList.length; i++) {
                      if ((sPart.ticket_no === this.selectedPartList[i].ticket_no) && (sPart.part_no === this.selectedPartList[i].part_no)) {
                        alert('This ticket Part already added in the List');
                        this.unCheckPart(sPart);
                        isPartexist = true;
                      } else {
                        isPartexist = false;
                      }
                    }
                    if (isPartexist === false) {
                      this.selectedPartListTemp.push(sPart);
                      this.getPartDetails(sPart.ticket_no, sPart.part_no);
                    }
                  }
                }
              } else {
                alert('Device Images are required to upload for Shipment to Apple RC');
                this.unCheckPart(sPart);
              }
            }, 1000);
          } else {
            alert(`You can't select this part, because of GSX status is Repair Marked Complete.`);
            this.unCheckPart(sPart);
          }
        } else { // CIN
          let partlist: any = [];
          if ((sPart.repair_status == 'Ready for Pickup') || (sPart.repair_status == 'Ready For Pickup') || (sPart.repair_status == 'Repair Marked Complete') || ((sPart.return_status === 'DOA') || (sPart.return_status === 'GPR') || (sPart.return_status === 'DIAG'))) {
            if (event === true) {
              if (sPart.part_description.includes('Display')) {
                this.dataService.checkPartSerialNo(sPart.ticket_no)
                  .subscribe(
                    (data) => {
                      const result: any = data;
                      if (result.status === true) {
                        partlist  = result.part_number;
                        for (let i = 0; i < partlist.length; i++) {
                          if (partlist[i].part_no.repair_type.includes('display')) {
                            if (partlist[i].part_no.part_no === sPart.part_no) {
                              this.getS3Images(sPart.ticket_no, 'KBBDC');
                              setTimeout(() => {
                                if (this.isEligibleRC === true) {
                                  if (this.selectedPartList.length === 0) {

                                    if (this.selectedPartListTemp.length === 0) {
                                      sPart.image_required = '1';
                                      this.selectedPartListTemp.push(sPart);
                                      this.getPartDetails(sPart.ticket_no, sPart.part_no);
                                    } else {
                                      if (((this.selectedPartListTemp[0].return_status === 'KBB') || (this.selectedPartListTemp[0].return_status === 'GPR') || (this.selectedPartListTemp[0].return_status === 'DIAG')) && (sPart.return_status !== 'DOA')) {
                                          sPart.image_required = '1';
                                          this.selectedPartListTemp.push(sPart);
                                          this.getPartDetails(sPart.ticket_no, sPart.part_no);
                                      } else if ((this.selectedPartListTemp[0].return_status === 'DOA') && (sPart.return_status === 'DOA')) {
                                          sPart.image_required = '1';
                                          this.selectedPartListTemp.push(sPart);
                                          this.getPartDetails(sPart.ticket_no, sPart.part_no);
                                      } else {
                                        alert(`You can't add the DOA and KBB parts in same NRDC`);
                                        this.unCheckPart(sPart);
                                      }
                                    }

                                  } else { //selectedPartList !=0
                                    for (let i = 0; i < this.selectedPartList.length; i++) {
                                      if ((sPart.ticket_no === this.selectedPartList[i].ticket_no) && (sPart.part_no === this.selectedPartList[i].part_no)) {
                                        alert('This ticket Part already added in the List');
                                        isPartexist = true;
                                        this.unCheckPart(sPart);
                                      } else {
                                        isPartexist = false;
                                      }
                                    }

                                    if (((this.selectedPartList[0].return_status === 'KBB') || (this.selectedPartList[0].return_status === 'GPR') || (this.selectedPartList[0].return_status === 'DIAG')) && (sPart.return_status !== 'DOA')) {
                                      if (isPartexist === false) {
                                        sPart.image_required = '1';
                                        this.selectedPartListTemp.push(sPart);
                                        this.getPartDetails(sPart.ticket_no, sPart.part_no);
                                      }
                                    } else if ((this.selectedPartList[0].return_status === 'DOA') && (sPart.return_status === 'DOA')) {
                                      if (isPartexist === false) {
                                        sPart.image_required = '1';
                                        this.selectedPartListTemp.push(sPart);
                                        this.getPartDetails(sPart.ticket_no, sPart.part_no);
                                      }
                                    } else {
                                      alert(`You can't add the DOA and KBB parts in same NRDC`);
                                      this.unCheckPart(sPart);
                                    }

                                  }
                                } else {
                                  alert(`KBB part images must be uploaded to create NRDC for Apple DC`)
                                  this.unCheckPart(sPart);
                                }
                              }, 1000);
                            }
                          }
                        }
                      } else {
                        if (this.selectedPartList.length === 0) {

                          if (this.selectedPartListTemp.length === 0) {
                            this.selectedPartListTemp.push(sPart);
                            this.getPartDetails(sPart.ticket_no, sPart.part_no);
                          } else {
                            if (((this.selectedPartListTemp[0].return_status === 'KBB') || (this.selectedPartListTemp[0].return_status === 'GPR') || (this.selectedPartListTemp[0].return_status === 'DIAG')) && (sPart.return_status !== 'DOA')) {
                                this.selectedPartListTemp.push(sPart);
                                this.getPartDetails(sPart.ticket_no, sPart.part_no);
                            } else if ((this.selectedPartListTemp[0].return_status === 'DOA') && (sPart.return_status === 'DOA')) {
                                this.selectedPartListTemp.push(sPart);
                                this.getPartDetails(sPart.ticket_no, sPart.part_no);
                            } else {
                              alert(`You can't add the DOA and KBB parts in same NRDC`);
                              this.unCheckPart(sPart);
                            }
                          }

                          /* this.selectedPartListTemp.push(sPart);
                          this.getPartDetails(sPart.ticket_no, sPart.part_no); */
                        } else { //selectedPartList !=0
                          for (let i = 0; i < this.selectedPartList.length; i++) {
                            if ((sPart.ticket_no === this.selectedPartList[i].ticket_no) && (sPart.part_no === this.selectedPartList[i].part_no)) {
                              alert('This ticket Part already added in the List');
                              isPartexist = true;
                              this.unCheckPart(sPart);
                            } else {
                              isPartexist = false;
                            }
                          }

                          if (((this.selectedPartList[0].return_status === 'KBB') || (this.selectedPartList[0].return_status === 'GPR') || (this.selectedPartList[0].return_status === 'DIAG')) && (sPart.return_status !== 'DOA')) {
                            if (isPartexist === false) {
                              this.selectedPartListTemp.push(sPart);
                              this.getPartDetails(sPart.ticket_no, sPart.part_no);
                            }
                          } else if ((this.selectedPartList[0].return_status === 'DOA') && (sPart.return_status === 'DOA')) {
                            if (isPartexist === false) {
                              this.selectedPartListTemp.push(sPart);
                              this.getPartDetails(sPart.ticket_no, sPart.part_no);
                            }
                          } else {

                            alert(`You can't add the DOA and KBB parts in same NRDC`);
                            this.unCheckPart(sPart);
                          }
                        }
                      }
                    });
              } else {
                if (this.selectedPartList.length === 0) {

                  if (this.selectedPartListTemp.length === 0) {
                    this.selectedPartListTemp.push(sPart);
                    this.getPartDetails(sPart.ticket_no, sPart.part_no);
                  } else {
                    if (((this.selectedPartListTemp[0].return_status === 'KBB') || (this.selectedPartListTemp[0].return_status === 'GPR') || (this.selectedPartListTemp[0].return_status === 'DIAG')) && (sPart.return_status !== 'DOA')) {
                        this.selectedPartListTemp.push(sPart);
                        this.getPartDetails(sPart.ticket_no, sPart.part_no);
                    } else if ((this.selectedPartListTemp[0].return_status === 'DOA') && (sPart.return_status === 'DOA')) {
                        this.selectedPartListTemp.push(sPart);
                        this.getPartDetails(sPart.ticket_no, sPart.part_no);
                    } else {
                      alert(`You can't add the DOA and KBB parts in same NRDC`);
                      this.unCheckPart(sPart);
                    }
                  }

                  /* this.selectedPartListTemp.push(sPart);
                  this.getPartDetails(sPart.ticket_no, sPart.part_no); */
                } else { //selectedPartList !=0

                  for (let i = 0; i < this.selectedPartList.length; i++) {
                    if ((sPart.ticket_no === this.selectedPartList[i].ticket_no) && (sPart.part_no === this.selectedPartList[i].part_no)) {
                      alert('This ticket Part already added in the List');
                      isPartexist = true;
                    } else {
                      isPartexist = false;
                    }
                  }

                  if (((this.selectedPartList[0].return_status == 'KBB') || (this.selectedPartList[0].return_status === 'GPR') || (this.selectedPartList[0].return_status === 'DIAG')) && (sPart.return_status !== 'DOA')) {
                    if (isPartexist === false) {
                      this.selectedPartListTemp.push(sPart);
                      this.getPartDetails(sPart.ticket_no, sPart.part_no);
                    }
                } else if ((this.selectedPartList[0].return_status === 'DOA') && (sPart.return_status === 'DOA')) {
                  if (isPartexist === false) {
                    this.selectedPartListTemp.push(sPart);
                    this.getPartDetails(sPart.ticket_no, sPart.part_no);
                  }
                } else {
                  alert(`You can't add the DOA and KBB parts in same NRDC`);
                  this.unCheckPart(sPart);
                }
                }
              }
            }

          } else {
            alert(`This Part can't be add because of GSX Repair is not marked complete`);
            this.unCheckPart(sPart);
          }
        }
      } else { // Site type 2
        if ((sPart.repair_status === 'Repair Marked Complete') || ((sPart.return_status === 'DOA') || (sPart.return_status === 'GPR') || (sPart.return_status === 'DIAG'))) {
          this.getPartDetails(sPart.ticket_no, sPart.part_no);  // new code onsite
          if (this.selectedPartList.length === 0) {
            this.selectedPartListTemp.push(sPart);
          } else {
            for (let i = 0; i < this.selectedPartList.length; i++) {
              if ((sPart.ticket_no === this.selectedPartList[i].ticket_no) && (sPart.part_no === this.selectedPartList[i].part_no)) {
                alert('This ticket Part already added in the List');
                isPartexist = true;
              } else {
                isPartexist = false;
              }
            }
            if (isPartexist === false) {
              this.selectedPartListTemp.push(sPart);
            }
          }
        } else {
          alert(`This Part can't be add because of GSX Repair is not marked complete`);
          this.unCheckPart(sPart);
        }
      }
    } else {
      for (let k = 0; k < this.selectedPartListTemp.length; k++) {
        if ((this.selectedPartListTemp[k].ticket_no === sPart.ticket_no) && (this.selectedPartListTemp[k].part_no === sPart.part_no)) {
          this.partList[k].isSelectPart = false;
          this.selectedPartListTemp.splice(k, 1);
        }
      }
    }
  }

  unCheckPart(sPart: any) {
    setTimeout(() => {
      for (let j = 0; j < this.partList.length; j++) {
        if ((this.partList[j].ticket_no === sPart.ticket_no) && (this.partList[j].return_order === sPart.return_order)) {
          this.partList[j].isSelectPart = false;
        }
      }
    }, 1000);
  }

  getPartDetails(ticketId: any, partNo: any) {
    let result: any = [];
    let diagPartList: any = [];
    this.dataService.checkPartDetails(ticketId)
      .subscribe(
        (data) => {
          result = data;
          if (result.status === true) {
            diagPartList = result.repair_dt;
            for (let k = 0; k < this.selectedPartListTemp.length; k++) {
              if ((this.selectedPartListTemp[k].ticket_no === ticketId) && (this.selectedPartListTemp[k].part_no === partNo)) {
                for (let i = 0; i < diagPartList.length; i++) {
                  if ((this.selectedPartListTemp[k].part_no === diagPartList[i].part_number)) {
                    this.selectedPartListTemp[k].kbb_serial_no = diagPartList[i].kbb_serial_no;
                    this.selectedPartListTemp[k].kgb_serial_no = diagPartList[i].kgb_serial_no;
                            // console.log("Updated:", this.selectedPartListTemp[k]);

                  }
                }
              }
            }
          }
        });
  }

  addPart() {
    // this.showSelectedList = true;
    if (this.selectedPartListTemp.length !== 0) {

      for (let i = 0; i < this.selectedPartListTemp.length; i++) {
        // console.log('Adding Part →', this.selectedPartListTemp[i]);
        this.selectedPartList.push(this.selectedPartListTemp[i]);
        this.showSelectedList = true;
      }
    } else {
      alert('Select at-least one Part');
    }

    this.selectedPartListTemp = [];
    this.showList = false;
    this.ticketId = '';
    this.gNumber = '';
  }

  deleterow(idx: any) {
    this.selectedPartList.splice(idx, 1);
  }

  // goToForm() {
  //   localStorage.setItem('partlist', JSON.stringify(this.selectedPartList));
  //   this.router.navigate(['kbb-outward/kbbform']);
  // }

//  goToForm() {
//   const partNos = this.selectedPartList.map((p: any) => p.part_no);
// console.log('Sending part_nos:', JSON.stringify(partNos)); // <-- Log here

//   this.dataService.fetchPartDetails(partNos).subscribe((response: any) => {
//     // Merge HSN and value into selectedPartList
//     this.selectedPartList.forEach((part: any) => {
//       const found = response.data.find((item: any) => item.part_no === part.part_no);
//       if (found) {
//         part.hsn_code = found.hsn_code;
//         part.value = found.value;
//       } else {
//         part.hsn_code = '';  // fallback to textbox
//         part.value = '';
//       }
//     });

//     // Store to localStorage and navigate
//     localStorage.setItem('partlist', JSON.stringify(this.selectedPartList));
//     this.router.navigate(['kbb-outward/kbbform']);
//   });
// }

goToForm(): void {
  const partNos = this.selectedPartList.map((p: any) => p.part_no);

  // console.log('Sending part_nos:', JSON.stringify(partNos));

  this.dataService.fetchPartDetails(partNos).subscribe((response: any) => {
    const responseData = response?.data || [];

    this.selectedPartList.forEach((part: any) => {
      const match = responseData.find((item: any) => item.part_no === part.part_no);

      // Correctly assign value and hsn_code from the response
      part.value = match?.value ?? 0;
      part.hsn_code = match?.hsn_code ?? 0;

      // Mark if fetched from DB
      part._valueFromDB = part.value > 0;
      part._hsnFromDB = part.hsn_code > 0;

      // These control whether user is allowed to edit manually
      part._valueLocked = false;
      part._hsnLocked = false;
      part._editing_value = false;
      part._editing_hsn = false;

      // console.log(`Matched Part ${part.part_no}:`, {
      //   value: part.value,
      //   hsn_code: part.hsn_code,
      //   _valueFromDB: part._valueFromDB,
      //   _hsnFromDB: part._hsnFromDB
      // });
    });

    localStorage.setItem('partlist', JSON.stringify(this.selectedPartList));
    this.router.navigate(['kbb-outward/kbbform']);
  });
}


  searchTicketList() {
    if (this.ticketSearch !== '') {
      this.repairSearch = '';
      this.partList = _.filter(this.partList, row => row.ticket_no.toLowerCase().indexOf(this.ticketSearch) > -1);
    } else {
      this.partList = this.partListTemp;
    }
  }

  searchRepairList() {
    if ((this.repairSearch === '')) {
      this.partList = this.partListTemp;
    } else {
      this.ticketSearch = '';
      this.partList = _.filter(this.partList, row => row.repair_no.indexOf(this.repairSearch) > -1);
    }
  }

  getS3Images(ticketId: any, imageType: any) {
    let result;
    let s3Images: any = [];
    this.userDataService.getS3FileDetails(ticketId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.S3Data = result.images_raf;
            for (let i = 0; i < this.S3Data.length; i++) {
              if (this.S3Data[i].type === imageType) {
                s3Images.push(this.S3Data[i]);
              }
            }
            if (imageType === 'RCO') {
              if (s3Images.length >= 6) {
                this.isEligibleRC = true;
              } else {
                this.isEligibleRC = false;
              }
            } else {
              if (s3Images.length >= 2) {
                this.isEligibleRC = true;
              } else {
                this.isEligibleRC = false;
              }
            }
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      });
  }


}
