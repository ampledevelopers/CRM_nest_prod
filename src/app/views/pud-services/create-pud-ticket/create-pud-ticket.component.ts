import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePudTicketService } from './create-pud-ticket.service';

@Component({
    selector: 'app-create-pud-ticket',
    templateUrl: './create-pud-ticket.component.html',
    styleUrls: ['./create-pud-ticket.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})
export class CreatePudTicketComponent {
  firstName = '';
  lastName = '';
  phoneNo = '';
  emailId = '';
  landMark = '';
  productFamily = 'Select Product Family';
  productFamilies: any;
  // serialNo = '';
  states = '';
  problem = '';
  bcolor = true;
  branches: any;
  error: any;
  branchesTemp: any;
  statesTemp: any = [];
  Branch = 'Select Location';
  secondphoneNo = '';
  ErrorMessage = '';
  buttonLoading = false;
  ticketId: any;
  customerId: any;
  customerDetail: any;
  isExCustomer = false;
  customerStatus: any;
  state: any = '';
  address1 = '';
  address2 = '';
  pin = '';
  city = '';
  dlvryState: any = '';
  dlvryAddress1 = '';
  dlvryAddress2 = '';
  dlvryPin = '';
  dlvryCity = '';
  dlvryLandMark = '';
  dlvrySameAsPickup = false;
  dlvryAddress = '';
  isSame = false;
  editCancel = 'Edit';
  detailsEdited = false;
  isUpdate = false;
  validPhone = true;
  isAmpleCustomer: any = '';
  nonAmpleCustomer = false;
  fmipCheck = false;
  quoteCharges = 'Select Quote Charges';
  amount = 0;
  part_no = '';
  quotationId = '';
  pudTicketId = '';
  retryText = '';
  retryType = '';
  description = '';
  isDropIncluded = 0;

  constructor(private dataService: CreatePudTicketService,private modalService: NgbModal) {
    this.productFamilies = [{ name: 'iPod', value: 'IPOD', id: 7 }, { name: 'iPad', value: 'IPAD', id: 3 }, { name: 'iPhone', value: 'IPHONE', id: 1 }, { name: 'Watch', value: 'WATCH', id: 5 }, { name: 'Apple TV', value: 'APPLETV', id: 6 }, { name: 'Mac', value: 'MAC', id: 2 }, { name: 'Beats', value: 'BEATS', id: 12 }]
    this.getBranches();
  }
  submit(temp_ref: any) {
    this.submitPUD(temp_ref);
    if (this.problem === '') {
      this.bcolor = false;
    } else {
      this.bcolor = true;
    }
  }

  getBranches() {
    this.dataService.getBranches().subscribe({
      next:
        (data: any) => {
          const result: any = data;
          this.branches = result.branch;
          const excludedBranches = ['FIC', 'SAM', 'SMT', 'DCS', 'DLT', 'DSQ', 'DCA', 'DMX', 'DPI'];
          this.branches = this.branches.filter((branch: any) => {
            return !excludedBranches.includes(branch.branch_code);
          });
          for (let i = 0; i < this.branches.length; i++) {
            this.statesTemp.push(this.branches[i].state);
          }
          this.states = this.statesTemp.filter(function (elem: any, index: any, self: any) {
            return index === self.indexOf(elem);
          })
        }, // success path
      error: error => this.error = error // error path
    });
  }

  filterBranchesOfThisState(state: any) {
    this.branchesTemp = [];
    this.branchesTemp = this.branches.filter((branch: any) => {
      return branch.state === state;
    });
    return this.branchesTemp;

  }

  quoteChange() {
    const quoteChargesObj = JSON.parse(this.quoteCharges);
    this.amount = quoteChargesObj.data[0];
    this.part_no = quoteChargesObj.data[1];
    this.description = quoteChargesObj.data[2];
    if((this.description.toLowerCase()).includes('drop')) {
      this.isDropIncluded = 1;
    } else {
      this.isDropIncluded = 0;
    }
  }

  cancel() {
    this.phoneNo = '';
    this.firstName = '';
    this.lastName = '';
    this.emailId = '';
    this.landMark = '';
    this.Branch = 'Select Location';
    this.productFamily = 'Select Product Family';
    // this.serialNo = '';
    this.problem = '';
    this.address1 = '';
    this.address2 = '';
    this.state = '';
    this.pin = '';
    this.city = '';
    this.secondphoneNo = '';
    this.dlvryAddress1 = '';
    this.dlvryAddress2 = '';
    this.dlvryState = '';
    this.dlvryPin = '';
    this.dlvryCity = '';
    this.dlvryLandMark = '';
    this.isSame = false;
    this.ErrorMessage = '';
    this.bcolor = true;
    this.isSame = false;
    this.dlvrySameAsPickup = false;
    this.buttonLoading = false;
    this.isExCustomer = false;
    this.detailsEdited = false;
    this.validPhone = true;
    this.isAmpleCustomer = '';
    this.pudTicketId = '';
    this.ticketId = '';
    this.quotationId = '';
    this.fmipCheck = false;
    this.quoteCharges = 'Select Quote Charges';
  }

  submitPUD(temp_ref: any) {
    this.ErrorMessage = '';
     if(this.isAmpleCustomer === '') {
       alert('Please select the Customer type Ample/Non-Ample')
       return;
     }
    // this.state = "Karnataka";
    if ((this.productFamily != 'Select Product Family') && (this.firstName != '') && (this.lastName) && (this.emailId != '') && (this.address1 != '') && (this.address2 != '') && (this.city != '') && (this.pin != '') && (this.landMark !== '') && (this.dlvryAddress1 !== '') && (this.dlvryAddress2 !== '') && (this.dlvryCity !== '') && (this.dlvryPin !== '') && (this.dlvryLandMark !== '') && (this.state !== '') && (this.dlvryState !== '') && this.problem !== '' && this.phoneNo.length === 10 && this.isAmpleCustomer !== '' && this.quoteCharges !== 'Select Quote Charges') {
      this.buttonLoading = true;
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const specialChars1 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (((specialChars1.test(this.pin)) || (specialChars1.test(this.dlvryPin))) || ((this.pin.length !== 6) || (this.dlvryPin.length !== 6))) {
        this.buttonLoading = false;
        this.dlvrySameAsPickup = false;
        this.isSame = false;
        this.checkboxToggle();
        this.ErrorMessage = 'Please enter valid Pincode';
        return;
      }
      if (this.isExCustomer === false || this.isUpdate === true) {
        if (specialChars.test(this.firstName) || specialChars.test(this.lastName)) {
          this.buttonLoading = false;
          this.ErrorMessage = 'Special characters are not alllowed in Name field';
          return;
        }
        else if (!(this.emailId.includes('@') && this.emailId.includes('.'))) {
          this.buttonLoading = false;
          this.ErrorMessage = 'Please enter valid Email id';
          return;
        } else {
          this.dataService.createCustomer(this.firstName, this.lastName, this.phoneNo, this.emailId, this.address1, this.address2, this.city, this.state, this.pin)
            .subscribe({
              next:
                (data: any) => {
                }, // success path
              error: error => error = error // error path
            });
        }
      }
      let result: any = [];
      let BranchTemp = this.branches.filter((branch: any) => {
        return branch.label === this.Branch;
      });
      this.dlvryAddress = this.dlvryAddress1 + ',' + this.dlvryAddress2 + ',' + this.dlvryCity + ',' + this.dlvryState + ',' + this.dlvryLandMark + ',' + this.dlvryPin;
      this.Branch = BranchTemp[0].branch_code;
      // this.Branch = 'IUB';
      let custType = '';
      if (this.isAmpleCustomer === 'true') {
        custType = 'A';
      } else if (this.isAmpleCustomer === 'false') {
        custType = 'N'
      }
      let dataToService = '&customer_firstname=' + this.firstName + '&customer_lastname=' + this.lastName + '&customer_primary_phone=' + this.phoneNo + '&customer_secondry_phone=' + this.secondphoneNo + '&customer_query=' + encodeURIComponent(this.problem) + '&pud_type=' + 'Ample-PUD' + '&address_line1=' + this.address1 + '&address_line2=' + this.address2 + '&city=' + this.city + '&pin=' + this.pin + '&country=' + 'India' + '&landmark=' + this.landMark + '&pickup_scheduled_time=' + '' + '&reservation_id=' + '' + '&diagnosis_charges_accepted=' + '' + '&visible_damage=' + '' + '&notes=' + '' + '&user_id=' + localStorage.getItem('userId') + '&pickup_assigned_to=' + '' + '&branch_code=' + this.Branch + '&technician_note=' + '' + '&customer_email=' + this.emailId + '&state=' + this.state + '&customer_id=' + this.customerId + '&technician_comment=' + '' + '&product_family=' + this.productFamily + '&drop_address=' + this.dlvryAddress + '&customer_type=' + custType + '&condition_of_device=' + '' + '&enquiry_only=' + 'N' + '&drop_request_flag=' + this.isDropIncluded;
      this.dataService.createPUD(dataToService)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.pudTicketId = result.pud_ticket_id
              this.ticketId = result.ticket_id;
              // this.ticketId = '426955';
              this.generateQuote(temp_ref);
            } else {
              this.retryText = 'Error while creating PUD ticket!';
              this.retryType = 'ticket';
              this.openModal(temp_ref);
            }
          }, // success path
          error: (error: any) => this.error = error // error path
        })
    }
    else { this.ErrorMessage = 'Fill all mandatory fields'; }
  }

  openModal(templat: TemplateRef<any>) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  generateQuote(temp_ref: any) {
    let data = '&ticket_id=' + this.ticketId + '&part_no=' + this.part_no + '&description=' + encodeURIComponent(this.description) + '&total_amount=' + this.amount;
    this.dataService.generateQuote(data)
      .subscribe({
        next: (data: any) => {
          let result = data;
          if (result.status === true) {
            let quote = result.quotation;
            if (quote.status === true) {
              this.quotationId = quote.quote_id;
              this.sendQuotePayment(temp_ref);
            }
          } else {
            this.retryText = 'Error while Generating Quote!';
              this.retryType = 'quote';
              this.openModal(temp_ref);
          }
        }, // success path
        error: (error: any) => this.error = error // error path
      })
  }

  sendQuotePayment(temp_ref: any) {
    this.dataService.sendQuotePayment(this.ticketId, this.quotationId)
      .subscribe({
        next:
          (data: any) => {
            if (data.status === true) {
              this.buttonLoading = false;
              alert('New PUD-ticket has been created with id -' + '' + this.pudTicketId);
              this.cancel();
            }
            else {
              this.retryText = 'Error while sending Payment Link!';
              this.retryType = 'payment';
              this.openModal(temp_ref);
            }
          }, // success path
        error: error => error = error // error path
      });
  }

  getCustomer(event: any) {
    this.validPhone = true;
    this.customerId = '';
    this.isExCustomer = false;
    let result: any;
    const specialChars1 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if ((event.keyCode === 13) || (event.keyCode === 9)) {
      if ((specialChars1.test(this.phoneNo)) || this.phoneNo.length !== 10) {
        this.validPhone = false;
        this.phoneNo = '';
      } else {
        this.validPhone = true;
        this.dataService.getCustomer(this.phoneNo)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.firstName = result.customer.first_name;
                this.lastName = result.customer.last_name;
                this.customerId = result.customer.customer_id;
                this.emailId = result.customer.email;
                this.customerStatus = result.customer_status;
                this.address1 = result.customer.address1;
                this.address2 = result.customer.address2;
                this.city = result.customer.city;
                // this.state = result.customer.state;
                this.pin = result.customer.pin;
                this.secondphoneNo = result.customer.phone2;
                this.isExCustomer = true;
                this.detailsEdited = true;
              } else {
                this.customerStatus = 0;
                this.firstName = '';
                this.emailId = '';
                this.isExCustomer = false;
                this.detailsEdited = false;
              }
            }, // success path
            error: (error: any) => this.error = error // error path
          });
      }
    }
  }

  checkboxToggle() {
    // this.state = 'Karnataka';
    if (this.dlvrySameAsPickup) {
      if (this.firstName !== '' && this.lastName !== '' && this.city !== '' && this.state !== '' && this.pin !== '' && this.landMark !== '') {
        this.dlvryAddress1 = this.address1;
        this.dlvryAddress2 = this.address2;
        this.dlvryCity = this.city;
        this.dlvryPin = this.pin;
        this.dlvryLandMark = this.landMark;
        this.dlvryState = this.state;
        this.isSame = true;
      } else {
        setTimeout(() => {
          this.dlvrySameAsPickup = false;
        }, 1000);
        alert('Please fill all mandatory fields of Pickup Address');
      }
    }
    else if (!this.dlvrySameAsPickup) {
      this.dlvryAddress1 = '';
      this.dlvryAddress2 = '';
      this.dlvryCity = '';
      this.dlvryPin = '';
      this.dlvryLandMark = '';
      this.dlvryState = '';
      this.isSame = false;
    }
  }

  retry(errorSource: any, template: any) {
    if(errorSource === 'ticket') {
      this.hideModel();
      this.buttonLoading = false;
      // this.submitPUD(template);
    } else if(errorSource === 'quote') {
      this.hideModel();
      this.generateQuote(template);
    } else if(errorSource === 'payment') {
      this.hideModel();
      this.sendQuotePayment(template);
    }
  }

  hideModel() {
    this.modalService.dismissAll();
  }

  customerEdit() {
    if (this.editCancel === 'Edit') {
      this.detailsEdited = false;
      this.editCancel = 'Cancel';
      this.isUpdate = true;
    } else {
      this.detailsEdited = true;
      this.editCancel = 'Edit';
      this.isUpdate = false;
    }
  }
}

