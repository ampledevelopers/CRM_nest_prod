import { Component, TemplateRef } from '@angular/core';
import { StockTransferInService } from './stock-transfer-in.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-stock-transfer-in',
    templateUrl: './stock-transfer-in.component.html',
    providers: [NgbModal, NgbModalConfig],
    styleUrls: ['./stock-transfer-in.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class StockTransferInComponent {
  toBranchCode = localStorage.getItem('branchCode');
  selectType: any = '';
  loading = false;
  transcStiHis = false;
  transferStatus = 2;
  stockTransfer: any = [];
  stockTransferHis: any = [];
  stockTransCount: any = 0;
  historyCount: any = 0;
  asnNo: any;
  dcNo: any;
  fromBranch: any;
  toBranch: any;
  ack: any = '';

  constructor(
    public dataService: StockTransferInService, private modalService: NgbModal) {
  }

  onChange() {
    this.asnNo = '';
    this.stockTransfer = [];
    this.stockTransferHis = [];
    this.stockTransCount = '';
    this.historyCount = '';
    this.transcStiHis = false;
    this.transferStatus = 2;
    if (this.selectType === 'consignment') {
      this.stockTransList();
    } else if (this.selectType === 'adhesive') {
      this.adhesivesTransList();
    }
  }

  stockTransList() {
    this.ack = '0';
    let result: any = [];
    let stockAllTransfer: any = [];
    this.historyCount = '';
    this.stockTransCount = '';
    this.dataService.stockTransList(this.toBranchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            stockAllTransfer = result.items;
            this.stockTransfer = stockAllTransfer.filter((data: any) => {
              return data.ack === '0';
            });
            this.stockTransCount = this.stockTransfer.length;
            this.stockTransferHis = stockAllTransfer.filter((data: any) => {
              return data.ack === '1';
            })
            this.historyCount = this.stockTransferHis.length;
            this.transferStatus = 1;
          } else {
            this.transcStiHis = false;
            this.transferStatus = 0;
          }
        }
      })
  }

  adhesivesTransList() {
    this.ack = '0';
    let result: any = [];
    let stockAllTransfer: any = [];
    let uniqueDC: any = [];
    let uniqueHisDC: any = [];
    let adhesiveList: any = [];
    let adhesiveHis: any = [];
    this.stockTransferHis = [];
    this.stockTransfer = [];
    this.stockTransCount = 0;
    this.historyCount = 0;
    this.dataService.adhesivesTransList(this.toBranchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            stockAllTransfer = result.items;
            adhesiveList = stockAllTransfer.filter((data: any) => {
              return data.ack === '0';
            });
            for (let i = 0; i < adhesiveList.length; i++) {
              uniqueDC.push(adhesiveList[i].dc_no);
            }
            uniqueDC = uniqueDC.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            })
            for (let i = 0; i < uniqueDC.length; i++) {
              let dataTemp = adhesiveList.filter((data: any) => {
                return data.dc_no === uniqueDC[i]
              });
              this.stockTransfer.push({
                dc_no: dataTemp[0].dc_no,
                from_branch_code: dataTemp[0].from_branch_code,
                to_branch_code: dataTemp[0].to_branch_code,
                transfer_date: dataTemp[0].transfer_date,
              })
            }
            this.stockTransCount = this.stockTransfer.length;
            adhesiveHis = stockAllTransfer.filter((data: any) => {
              return data.ack === '1';
            })
            for (let i = 0; i < adhesiveHis.length; i++) {
              uniqueHisDC.push(adhesiveHis[i].dc_no);
            }
            uniqueHisDC = uniqueHisDC.filter(function (elem: any, index: any, self: any) {
              return index === self.indexOf(elem);
            })
            for (let i = 0; i < uniqueHisDC.length; i++) {
              let dataTemp = adhesiveHis.filter((data: any) => {
                return data.dc_no === uniqueHisDC[i]
              });

              this.stockTransferHis.push({
                dc_no: dataTemp[0].dc_no,
                from_branch_code: dataTemp[0].from_branch_code,
                to_branch_code: dataTemp[0].to_branch_code,
                transfer_date: dataTemp[0].transfer_date,
                acknowledge_date: dataTemp[0].acknowledge_date,
              })
            }
            this.historyCount = this.stockTransferHis.length;
            this.transferStatus = 1;
          } else {
            this.transcStiHis = false;
            this.transferStatus = 0;
          }
        }
      })
  }

  stockAckModel(stock_ack_temp: TemplateRef<any>, asnNumber: any, dcNumber: any, fromCode: any, toCode: any) {
    this.asnNo = asnNumber;
    this.dcNo = dcNumber;
    this.fromBranch = fromCode;
    this.toBranch = toCode;
    this.openModal(stock_ack_temp);
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }
  cancel() {
    this.modalService.dismissAll();
  }

  consignmentAck() {
    let result: any = [];
    this.dataService.consignmentAck(this.dcNo)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.cancel();
            this.stockTransList();
          }
        }
      })
  }

  adhesivesAck() {
    let result: any = [];
    this.dataService.adhesivesAck(this.dcNo)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.cancel();
            this.adhesivesTransList();
          }
        }
      })
  }

  stockTransHis() {
    this.transcStiHis = true;
  }

  getDC(DCNo: any) {
    const url = localStorage.getItem('rootUrl') + 'api/stock/dc_print?X_API_KEY=' + localStorage.getItem('userToken') + '&dc_no=' + DCNo;
    const tab = window.open(url);
  }

  getAdhesiveDC(DCNo: any) {
    const url = localStorage.getItem('rootUrl') + 'api/adhesives/dc_print?X_API_KEY=' + localStorage.getItem('userToken') + '&dc_no=' + DCNo;
    const tab = window.open(url);
  }
  
}
