import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, TemplateRef } from '@angular/core';

import { PartAddEditService } from './part-add-edit.service';
import { Subject } from 'rxjs';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-part-add-edit',
    templateUrl: './part-add-edit.component.html',
    styleUrls: ['./part-add-edit.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})

export class PartAddEditComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  error: any;
  loading = false;
  buttonSpin = false;
  saveSpin = false;
  bcolor = false;
  userRole;
  data: any = [];
  partList: any = [];
  city = '';
  updateCity = '';
  cityList = [];
  partNo = '';
  gsxPartNo = '';
  description = '';
  stockPrice = '';
  exchangePrice = '';
  batteryPrice = '';
  purchaseStockPrice = '';
  purchaseExchangePrice = '';
  purchaseBatteryPrice = '';
  netsuiteInternalId = '';
  purchaseDisplayPrice = '';
  displayPrice = '';
  hsn = '';
  labourTier = '';
  insurancePrice = '';
  priceType = '';
  partIdInput = '';
  pError = '';
  isPart = false;
  partDetails: any = [];
  simpleAlert: SimpleAlert = {title: '', msg: ''};
  selectedPartCity = '';
  selectedPartEdit: any = [];
  notfilled = false;
  wuPartNo = '';
  wuDescription = '';
  loggedInUser = localStorage.getItem('userId');
  constructor(public dataService: PartAddEditService,  private modalService: NgbModal) {
    this.userRole = localStorage.getItem('userRole');
    this.dtTrigger.next({});
    this.dtOptions={}
    // this.getPartList();
    // this.getCityList();
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.selectedPartEdit = [];
    this.modalService.dismissAll();
  }

  /* getPartList() {
    let result: any = [];
    this.dataService.getPartList()
    .subscribe(
      (data) => {
        result = data;
        this.loading = false;
        this.data = result.items;
      }, // success path
      error => this.error = error // error path
    );
  } */

  getCityList() {
    let result: any = [];
    this.dataService.getCityList()
    .subscribe({
      next: (data: any) => {
        result = data;
        this.cityList = result.city;
      }, // success path
      error:error => this.error = error // error path
  });
  }


  searchPart(event: any) {
    this.partIdInput = this.partIdInput.replace(/\s/g, '');
    if (((event.type === 'keydown') && (event.keyCode === 13) || (event.keyCode === 9)) || (event.type === 'click')) {
      if (this.partIdInput !== '') {
        this.search(this.partIdInput, 'price');
      } else {
        this.bcolor = true;
      }
    }
  }

  search(part_id: string, type: any) {
    this.wuDescription = '';
    this.buttonSpin = true;
      let result: any = [];
      this.partDetails = [];
      this.dataService.getPart(part_id)
      .subscribe({
        next: (data: any) => {
          result = data;
          this.buttonSpin = false;
          if (result.status === true) {
            if (type === 'price') {
              this.partDetails = [];
              setTimeout(() => {
                this.partDetails = [...result.items];
                this.isPart = true;
                this.pError = '';
              });
            } else {
              if (result.items.length === 0) {
                alert(`Part's data not available`);
              } else {
                this.wuDescription = result.items[0].description;
              }
            }
          } else {
            if (type === 'price') {
              this.partDetails = [];
            setTimeout(() => {
            this.partDetails = [...result.items];
            this.isPart = false;
            this.pError = result.message;
          });
            } else {
              alert(`Part's data not available`);
            }
          }
        }, // success path
        error: error => this.error = error // error path
    });
  }

  selectCity(event: string) {
    this.city = event;
  }

  addPart(simple_alert_temp: TemplateRef<any>) {
    this.saveSpin = true;
    let result: any;
    this.partNo = this.partNo.replace(/\s/g, '');
    // this.partNo = this.partNo.toUpperCase();

    if ((this.partNo !== '') && (this.gsxPartNo !== '') && (this.description !== '')
    && (this.stockPrice !== '') && (this.exchangePrice !== '') && (this.purchaseStockPrice !== '')
    && (this.purchaseExchangePrice !== '') && (this.purchaseBatteryPrice !== '') && (this.netsuiteInternalId != '') && (this.hsn != '')) {
      const reqData = '&city=' + this.city + '&part_no=' + this.partNo + '&gsx_part_no=' + this.gsxPartNo + '&description='
      + this.description + '&exchange_price=' + this.exchangePrice + '&stock_price=' + this.stockPrice + '&battery_only_price=' + this.batteryPrice
      + '&display_only_price=' + this.displayPrice + '&price_type=' + this.priceType
      + '&purchase_exchange_price=' + this.purchaseExchangePrice + '&purchase_stock_price=' + this.purchaseStockPrice + '&purchase_battery_only_price=' + this.purchaseBatteryPrice
      + '&netsuite_internal_id=' + this.netsuiteInternalId + '&hsn=' + this.hsn + '&labour_tier=' + this.labourTier;
      this.dataService.addPart(reqData)
    .subscribe({
      next: (data: any) => {
        result = data;
        this.saveSpin = false;
        if (result.status === true) {
          this.simpleAlert = {title: 'Add GSX Part', msg: 'New GSX Part Added Successfully'};
          this.openModal(simple_alert_temp);
          this.city = '';
          this.partNo = '';
          this.gsxPartNo = '';
          this.description = '';
          this.stockPrice = '';
          this.exchangePrice = '';
          this.batteryPrice = '';
          this.displayPrice = '';
          this.priceType = '';
          this.netsuiteInternalId = '';
          this.purchaseStockPrice = '';
          this.purchaseExchangePrice = '';
          this.purchaseBatteryPrice = '';
          this.hsn = '';
          this.labourTier = '';
        } else {
          this.simpleAlert = {title: 'Add GSX Part', msg: result.message};
          this.openModal(simple_alert_temp);
        }
      }, // success path
      error: error => this.error = error // error path
    });
    } else {
      this.saveSpin = false;
      this.simpleAlert = {title: 'Add GSX Part', msg: 'Fill all mandatory fields'};
      this.openModal(simple_alert_temp);
    }
  }

  cityChange(value: string) {
    this.updateCity = value;
  }

  updatePart(item: any, update_part_temp: TemplateRef<any>) {
    this.selectedPartEdit = item;
    this.selectedPartCity = this.selectedPartEdit.city;
    this.openModal(update_part_temp);
  }

  saveupdatedPart(simple_alert_temp: TemplateRef<any>) {
    let selectedCity = '';
    if (this.updateCity !== '') {
      selectedCity = this.updateCity;
    } else {
      selectedCity = this.selectedPartEdit.city;
    }
    if ((selectedCity !== '') && (this.selectedPartEdit.part_no !== '') && (this.selectedPartEdit.gsx_part_no !== '') &&
    (this.selectedPartEdit.description !== '') && (this.selectedPartEdit.stock_price !== '') && (this.selectedPartEdit.exchange_price !== '') && (this.selectedPartEdit.insurance_price !== '')) {
      this.modalService.dismissAll();
      let result: any;
    const reqData = '&city=' + selectedCity + '&id=' + this.selectedPartEdit.id + '&part_no=' + this.selectedPartEdit.part_no
      + '&gsx_part_no=' + this.selectedPartEdit.gsx_part_no + '&description=' + this.selectedPartEdit.description + '&exchange_price=' +
      this.selectedPartEdit.exchange_price + '&stock_price=' + this.selectedPartEdit.stock_price + '&battery_only_price=' + this.selectedPartEdit.battery_only_price
      + '&display_only_price=' + this.selectedPartEdit.display_only_price + '&price_type=' + this.selectedPartEdit.price_type + '&insurance_price=' + this.selectedPartEdit.insurance_price + '&purchase_exchange_price=' +
      this.selectedPartEdit.purchase_exchange_price + '&purchase_stock_price=' + this.selectedPartEdit.purchase_stock_price + '&purchase_battery_only_price=' + this.selectedPartEdit.purchase_battery_only_price
      + '&purchase_display_only_price=' + this.selectedPartEdit.purchase_display_only_price + '&netsuite_internal_id=' + this.selectedPartEdit.netsuite_internal_id + '&hsn=' + this.selectedPartEdit.hsn + '&labour_tier=' + this.selectedPartEdit.labour_tier;
      this.dataService.updatePart(reqData)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.search(this.partIdInput, 'price');
          } else {
            this.simpleAlert = {title: 'Update GSX Part', msg: result.message};
            this.openModal(simple_alert_temp);
          }
        }, // success path
        error: error => this.error = error // error path
    });
    } else {
      this.notfilled = true;
    }
  }

  searchKBBPart(event: any) {
    this.wuPartNo = this.wuPartNo.replace(/\s/g, '');
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      if (this.wuPartNo !== '') {
        this.search(this.wuPartNo, 'kbb');
      } else {
        alert('Enter the correct part number');
      }
    }
  }

  addKbbExPart() {
    let result: any = [];
    this.wuPartNo = this.wuPartNo.toUpperCase();
    this.dataService.addKbbPart(this.wuPartNo, this.wuDescription)
    .subscribe({
      next: (data: any) => {
        result = data;
        alert(result.message);
        this.wuPartNo = '';
        this.wuDescription = '';
      }, // success path
      error: error => this.error = error // error path
  });
  }
}
