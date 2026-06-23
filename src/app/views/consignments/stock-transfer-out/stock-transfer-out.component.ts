import { StockTransferOutService } from './stock-transfer-out.service';
import { Component, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-stock-transfer-out',
    templateUrl: './stock-transfer-out.component.html',
    providers: [NgbModal, NgbModalConfig],
    styleUrls: ['./stock-transfer-out.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class StockTransferOutComponent {
  fromBranchCode = localStorage.getItem('branchCode');
  userRole:any;
  loading = false;
  toBranchLabel: any;
  historyCount: any;
  countLabel: any;
  fromBranchLabel: any;
  Status: any = '';
  stockDetails = false;
  adhesiveDetail = false;
  addAdhesivePart = false;
  adhesivePart: any = '';
  asnNo: any;
  selectType: any = '';
  uniqueAsn: any = [];
  consignmentsList: any = [];
  searchAdhesive: any = [];
  adhesiveList: any[] = [];
  stockTransferHis: any = [];
  stockTransTemp: any = [];
  branches: any = [];
  confirmAdData: any = [];
  ackValue: any;
  userId = localStorage.getItem('userId');
  transcSto = false;
  transcStoHis = false
  addAdesive = false;
  toBranchCode: any = 'Select Branch';
  columns = ['STO(From)', 'STI(To)', 'ASN no', 'Serial no', 'DC no', 'status', 'Gen date', 'ack date'];
  constructor(
    public dataService: StockTransferOutService, private modalService: NgbModal) {
    this.getBranches();
        this.userRole = localStorage.getItem('userRole');


  }


  onChange() {
    this.asnNo = '';
    this.consignmentsList = [];
    this.stockTransTemp = [];
    this.searchAdhesive = [];
    this.transcSto = false;
    this.transcStoHis = false;
    this.adhesiveDetail = false;
    this.stockDetails = false;
    this.addAdhesivePart = false;
    this.adhesiveList = [];
  }

  getConsignment() {
    let result: any = [];
    this.stockDetails = false;
    this.dataService.getConsignment(this.asnNo, this.fromBranchCode)
      .subscribe({
        next: (data: any) => {
          if (data.status === true) {
            result = data.items;
            if (result[0].status === 'A' && result[0].stock_type !== 'Apple') {
              this.stockDetails = true;
              this.consignmentsList = result;
              this.Status = 'Active';
            } else {
              alert('ASN No. is invalid/non-Active' + '\n' + 'Please enter correct ASN NO.');
              this.stockDetails = false;
            }
          } else {
            alert('ASN No. is invalid/non-Active' + '\n' + 'Please enter correct ASN NO.');
            this.stockDetails = false;
          }
        }
      })
  }

  getAdhesives() {
    console.log(this.userId);
    // 7387
    let result: any = '';
    this.adhesiveDetail = false;
    this.dataService.getAdhesives(this.asnNo, this.fromBranchCode)
      .subscribe({
        next: (data: any) => {
          if (data.status === true) {
            result = data.items;
            if ((result[0].status === 'A' && result[0].stock_type !== 'Apple') || (result[0].status === 'A' && this.userRole === '2')) {
              this.adhesiveDetail = true;
              this.searchAdhesive = data.items;
              this.adhesivePart = result;
              this.Status = 'Active';
            } else {
              alert('ASN No. is invalid/non-Active' + '\n' + 'Please enter correct ASN NO.');
              this.adhesiveDetail = false;
            }
          } else {
            alert('ASN No. is invalid/non-Active' + '\n' + 'Please enter correct ASN NO.');
            this.adhesiveDetail = false;
          }
        }
      })
  }

  addAdhesive() {
    this.uniqueAsn = [];
    if (this.adhesiveList.length === 0) {
      this.adhesiveList.push(this.adhesivePart[0]);
      this.addAdhesivePart = true;
      this.adhesiveDetail = false;
      this.asnNo = '';
    } else if (this.adhesiveList.length !== 0) {
      for (let i = 0; i < this.adhesiveList.length; i++) {
        this.uniqueAsn.push(this.adhesiveList[i].asn_no);
      }
      this.uniqueAsn = this.uniqueAsn.filter(function (elem: any, index: any, self: any) {
        return index === self.indexOf(elem);
      })
      if (!this.uniqueAsn.includes(this.adhesivePart[0].asn_no)) {
        this.adhesiveList.push(this.adhesivePart[0]);
        this.addAdhesivePart = true;
        this.adhesiveDetail = false;
        this.asnNo = '';
      }
    }
    this.consignmentsList = this.adhesiveList;
  }

  deleteAdhesive(asnNo: any) {
    this.adhesiveList.forEach((value: any, index: any) => {
      if (value == asnNo) {
        this.adhesiveList.splice(index, 1);
      }
    });
  }


  isValid(event: any) {
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!/^[0-9]/.test(inputChar)) {
      event.preventDefault();
    }
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      if (this.selectType === 'consignment') {
        this.getConsignment();
      } else if (this.selectType === 'adhesive') {
        this.getAdhesives();
      }
    }
  }

  getBranches() {
    let result: any = [];
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data.branch;
          this.branches = result;
        }
      })
  }

  selectBranch() {
    if (this.fromBranchCode !== this.toBranchCode) {
      this.toBranchLabel = this.branches.filter((data: any) => {
        return data.branch_code === this.toBranchCode;
      });
      this.toBranchLabel = this.toBranchLabel[0].label;
      alert('Item sending to' + ' ' + this.toBranchLabel + ' ');
    }
    else {
      alert('Please select the correct From and To Branches')
    }
  }

  stockDetailModel(stock_detail_temp: TemplateRef<any>) {
    this.confirmAdData = [];
    this.toBranchCode = 'Select Branch';
    if (this.consignmentsList.length !== 0) {
      if (this.addAdhesivePart === true || this.consignmentsList[0].stock_type === 'Ample') {
        this.fromBranchLabel = this.branches.filter((data: any) => {
          return data.branch_code === this.fromBranchCode;
        });
        this.fromBranchLabel = this.fromBranchLabel[0].label;
        for (let i = 0; i < this.consignmentsList.length; i++) {
          this.confirmAdData.push({
            asn_no: this.consignmentsList[i].asn_no,
            serial_no: this.consignmentsList[i].serial_no,
            part_no: this.consignmentsList[i].part_no,
            description: this.consignmentsList[i].description,
          })
        }
        this.openModal(stock_detail_temp);
      } else {
        alert('Apple consignment cant be transfered');
      }
    } else {
      alert('Stock not selected.');
    }
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }
  cancel() {
    this.modalService.dismissAll();
  }

  stockTransList() {
    let result: any = [];
    this.dataService.stockTransList(this.fromBranchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          this.stockTransferHis = result.items;
          this.transcStoHis = true;
          this.stockTransTemp = this.stockTransferHis;
          this.historyCount = this.stockTransTemp.length;
          this.countLabel = 'Total';
        }
      })
  }

  adhesivesTransList() {
    let result: any = [];
    let uniqueHisDC: any = [];
    let adhesiveList: any = [];
    this.stockTransferHis = [];
    this.dataService.adhesivesTransList(this.fromBranchCode)
      .subscribe({
        next: (data: any) => {
          result = data;
          adhesiveList = result.items;
          this.transcStoHis = true;
          for (let i = 0; i < adhesiveList.length; i++) {
            uniqueHisDC.push(adhesiveList[i].dc_no);
          }
          uniqueHisDC = uniqueHisDC.filter(function (elem: any, index: any, self: any) {
            return index === self.indexOf(elem);
          })
          for (let i = 0; i < uniqueHisDC.length; i++) {
            let dataTemp = adhesiveList.filter((data: any) => {
              return data.dc_no === uniqueHisDC[i]
            });
            this.stockTransferHis.push({
              dc_no: dataTemp[0].dc_no,
              from_branch_code: dataTemp[0].from_branch_code,
              to_branch_code: dataTemp[0].to_branch_code,
              transfer_date: dataTemp[0].transfer_date,
              acknowledge_date: dataTemp[0].acknowledge_date,
              ack: dataTemp[0].ack
            })
          }
          this.stockTransTemp = this.stockTransferHis;
          this.historyCount = this.stockTransTemp.length;
          this.countLabel = 'Total';
        }
      })
  }

  consignConfirm() {
    if (this.toBranchCode !== 'Select Branch' && this.consignmentsList.length !== 0) {
      if (this.fromBranchCode !== this.toBranchCode) {
        let result: any;
        this.dataService.consignConfirm(this.fromBranchCode, this.toBranchCode, this.asnNo, this.consignmentsList[0].serial_no, this.consignmentsList[0].part_no, this.consignmentsList[0].description)
          .subscribe({
            next: (data: any) => {
              result = data;
              this.cancel();
              this.asnNo = '';
              this.consignmentsList = [];
              this.stockDetails = false;
              this.stockTransList();
            }
          })
      } else {
        alert('Please select the correct From and To Branch');
      }
    } else {
      alert('Please select Branch')
    }
  }

  adhesiveConfirm() {
    if (this.toBranchCode !== 'Select Branch' && this.confirmAdData.length !== 0) {
      if (this.fromBranchCode !== this.toBranchCode) {
        let result: any;
        this.dataService.adhesiveConfirm(this.fromBranchCode, this.toBranchCode, this.confirmAdData)
          .subscribe({
            next: (data: any) => {
              result = data;
              this.cancel();
              this.asnNo = '';
              this.adhesiveDetail = false;
              this.addAdhesivePart = false;
              this.confirmAdData = [];
              this.consignmentsList = [];
              this.adhesiveList = [];
              this.adhesivesTransList();
            }
          })
      } else {
        alert('Please select the correct From and To Branch');
      }
    } else {
      alert('Please select Branch');
    }
  }

  getDC(DCNo: any) {
    const url = localStorage.getItem('nestUrl') + 'stock/dc_print?X_API_KEY=' + localStorage.getItem('userToken') + '&dc_no=' + DCNo;
    const tab = window.open(url);
  }

  getAdhesiveDC(DCNo: any) {
    const url = localStorage.getItem('nestUrl') + 'stock/adhesive_dc_print?X_API_KEY=' + localStorage.getItem('userToken') + '&dc_no=' + DCNo;
    const tab = window.open(url);
  }

  statusChange(event: any) {
    if (event === '1') {
      this.stockTransTemp = this.stockTransferHis;
      this.historyCount = this.stockTransTemp.length;
      this.countLabel = 'Total';
    } else if (event === '2') {
      this.stockTransTemp = this.stockTransferHis.filter((data: any) => {
        return data.ack === '0';
      });
      this.historyCount = this.stockTransTemp.length;
      this.countLabel = 'Ack Pending';
    } else if (event === '3') {
      this.stockTransTemp = this.stockTransferHis.filter((data: any) => {
        return data.ack === '1';
      });
      this.historyCount = this.stockTransTemp.length;
      this.countLabel = 'Acknowledged';
    }
  }
}
