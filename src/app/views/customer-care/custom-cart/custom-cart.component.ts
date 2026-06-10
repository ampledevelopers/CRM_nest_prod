import { Component, TemplateRef} from '@angular/core';
import { CustomerCareService } from '../customer-care.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface SimpleAlert {
  title: any;
  msg: any;
}

@Component({
    selector: 'app-custom-cart',
    templateUrl: './custom-cart.component.html',
    styleUrls: ['./custom-cart.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class CustomCartComponent {
  public error: any;
  items = 'Select Product';
  appItems: any = [];
  itemData: any = [];
  data: any = [];
  AppitemId = '';
  itemPrice = '';
  itemId = '';
  family = '';
  buttonSpin = false;
  familyId: any;
  itemInfo = false;
  firstName = '' ;
  mobileNo = '';
  emailId = '';
  deviceSlno = '';
  item = '';
  price = '';
  orderId = '';
  userGroup: any;
  action = '';
  simpleAlert: SimpleAlert = {title: '', msg: ''};

  constructor(
    public dataService: CustomerCareService,
    private modalService: NgbModal
    ) {
      this.userGroup = localStorage.getItem('userRole');
      this.getSavedLinks();
  }

  openModal(templat: any) {
   this.modalService.open(templat, { backdrop: 'static', keyboard: false });
    this.buttonSpin = false;
  }

  cancelModel() {
    this.modalService.dismissAll();
    this.getSavedLinks();
  }

  load() {
    this.buttonSpin = true;
    if (this.family === '') {
      alert('Please select the Product Family');
      return;
    } else if (this.items === 'Select Product' && this.family !== '4') {
     alert('Please select the Product');
     return;
   } else {
     this.getAppitemDetails();
   }
  }

  clear() {
    this.family = '';
    this.items = 'Select Product';
    this.itemInfo = false;
    }

  getAppitems(family: any) {
    let result;
    this.dataService.getAppitems(family)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.appItems = result.appProducts;
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  familySelect(family: any) {
    this.itemInfo = false ;
   this.familyId = family;
    if ((this.familyId !== '') || (this.familyId !== '4')) {
      this.getAppitems(this.familyId);
    } else {
      this.appItems = [];
    }

  }

  itemsSelect(itemId: any) {
    this.AppitemId = itemId;
   }

   getAppitemDetails() {
    let result;
    // let calltype;
    this.dataService.getAppitemDetails(this.family, this.AppitemId)
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true)  {
              this.itemData = result.itemDetails[0];
              this.buttonSpin = false;
              this.itemInfo = true ;
              } else {
                this.buttonSpin = false;
                this.itemInfo = false;
              }
}, // success path
error: error => this.error = error // error path
   });
}

getSavedLinks() {
  // this.itemInfo = false;
    let result;
    // let calltype;
    this.dataService.getSavedLinks()
      .subscribe({
        next: (data: any) => {
            result = data;
            if (result.status === true)  {
              this.data = result.savedLinks;
              this.buttonSpin = false;
              } else {
                this.buttonSpin = false;
              }
}, // success path
error: error => this.error = error // error path
});
}

save() {
  this.buttonSpin = true;
  if (this.firstName === '') {
    alert('Please enter Customer Name');
    return;
  } else if (this.mobileNo === '') {
   alert('Please enter Mobile Number');
   return;
} else if (this.emailId === '') {
  alert('Please enter Mail Id');
  return;
} else {
  if (this.familyId !== '4') {
    this.itemId = this.AppitemId ;
    this.itemPrice = this.itemData.price ;
  } else {
    this.itemId = this.item ;
    this.itemPrice = this.price ;
  }
  let result;
  // let calltype;
  this.dataService.saveAppLink(this.family, this.itemId, this.firstName, this.mobileNo, this.itemPrice,
    this.emailId, this.deviceSlno)
    .subscribe({
      next: (data: any) => {
          result = data;
          if (result.status === true)  {
            this.orderId = result.orderId.order_id;
            this.buttonSpin = false;
            this.itemInfo = true ;
            if (this.orderId > '0') {
            alert('Order Id is : ' + this.orderId + '\n\nSent for Manager/TL Approval') ;
            if (this.userGroup === '16' || this.userGroup === '17') {
            this.getSavedLinks() ;
            }
            }
            if (result.orderId.status === false) {
              alert(result.orderId.message);
            }
            this.discard() ;
              } else {
              this.buttonSpin = false;
              this.itemInfo = false;
            }
}, // success path
error: error => this.error = error // error path
});
 }
}

discard() {
  this.family = '';
  this.firstName = '';
  this.mobileNo = '';
  this.emailId = '';
  this.deviceSlno = '';
  this.items = 'Select Product';
  this.itemInfo = false;
  }

  sendLink(orderId: any, status: any, simple_alert_temp: TemplateRef<any>) {
    let result;
  // let calltype;
  this.dataService.sendPaymentLink(orderId, status)
    .subscribe({
      next: (data: any) => {
          result = data;
          if (result.status === true)  {
            // this.action = result.action;
            // this.orderId = result.orderId.order_id;
            this.buttonSpin = false;
                  this.simpleAlert = {title: 'Custom Cart', msg: result.message};
                  this.openModal(simple_alert_temp);
                    this.getSavedLinks() ;
              } else {
              this.buttonSpin = false;
            }
}, // success path
error: error => this.error = error // error path
  });
  }

}
