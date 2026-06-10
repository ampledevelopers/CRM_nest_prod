import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter',
    standalone: false
})

export class DataFilterPipe implements PipeTransform {
    list1: any = [];
    wordList: any = [];

    nameList: any = [];
    statusList: any = [];
    ticketList: any = [];
    locationList: any = [];
    phoneList: any = [];
    emailList: any = [];
    warrantyList: any = [];
    serviceList: any = [];
    productList: any = [];
    serialList: any = [];
    technicianList: any = [];
    imeiList: any = [];
    gNoList: any = [];
    pendingList: any = [];
    totalList: any = [];
    filteredlist: any = [];
    transform(array: any[], nameSearch: any[], filterMetadata: any) {
      let names = nameSearch[0];
      const statuss = nameSearch[1];
      let ticket = nameSearch[2];
      const location = nameSearch[3];
      const phone = nameSearch[4];
      let email = nameSearch[5];
      const warranty = nameSearch[6];
      const serviceType = nameSearch[7];
      const product = nameSearch[8];
      let serial = nameSearch[9];
      const technician = nameSearch[10];
      const imeiNo = nameSearch[11];
      const gNo = nameSearch[12];
      const pending = nameSearch[13];
      this.filteredlist = array;
    if ( (names !== '') || (statuss.length !== 0) || (ticket !== '') || (location.length !== 0) || (phone !== '')
    || (email !== '') || (warranty.length !== 0) || (serviceType.length !== 0) || (product.length !== 0) || (serial !== '')
    || (technician !== '') || (imeiNo !== '') || (gNo !== '') || (pending !== '')) {
      this.totalList = [];
    /* ********* Name filter *************/
    if ( names !== '' ) {
      names = names.toLowerCase();
      this.nameList = [];
      if (this.filteredlist.length !== 0) {
        this.nameList = _.filter(array, row => row.customer_name.toLowerCase().indexOf(names) > -1);
        this.filteredlist = this.nameList;
      }
    }
    /* ********* Status filter *************/
    if (statuss.length !== 0) {
      this.statusList = [];
      if (this.filteredlist.length !== 0) {
        for (let a = 0; a < statuss.length;  a++) {
          for (let j = 0; j < this.filteredlist.length; j++) {
            if (statuss[a] === this.filteredlist[j].status) {
              this.statusList.push(this.filteredlist[j]);
            }
          }
        }
        this.filteredlist = this.statusList;
      }
    }
    /* ********* Ticket filter *************/
    if ( ticket !== '' ) {
      ticket = ticket.toLowerCase();
      this.ticketList = [];
        this.ticketList = _.filter(this.filteredlist, row => row.id.indexOf(ticket) > -1);
      this.filteredlist = this.ticketList;
    }
    /* ********* Location filter *************/
    if (location.length !== 0 ) {
      this.locationList = [];
      if (this.filteredlist.length !== 0) {
        for (let i = 0; i < location.length; i++) {
            for (let j = 0; j < this.filteredlist.length; j++) {
              if (this.filteredlist[j].branch_name === location[i]) {
                this.list1.push(this.filteredlist[j]);
            }
          }
          this.locationList = this.locationList.concat(this.list1);
          this.list1 = [];
        }
      }
      this.filteredlist = this.locationList;
    }
    /* ********* Phone filter *************/
    if ( phone !== '' ) {
      this.phoneList = [];
      if (this.filteredlist.length !== 0) {
        for (let j = 0; j < this.filteredlist.length; j++) {
          if (this.filteredlist[j].customer_phone_no === phone) {
            this.list1.push(this.filteredlist[j]);
        }
        this.phoneList = this.phoneList.concat(this.list1);
        this.list1 = [];
      }
      this.filteredlist = this.phoneList;
      }
    }
    /* ********* Email filter *************/
    if ( email !== '' ) {
      email = email.toLowerCase();
      this.emailList = [];
      if (this.filteredlist.length !== 0) {
        for (let j = 0; j < this.filteredlist.length; j++) {
          if (this.filteredlist[j].customer_email_id === email) {
            this.list1.push(this.filteredlist[j]);
        }
        this.emailList = this.emailList.concat(this.list1);
        this.list1 = [];
      }
      this.filteredlist = this.emailList;
      }
    }
    /* ********* Warranty filter *************/
    if ( warranty.length !== 0 ) {
      this.warrantyList = [];
      if (this.filteredlist.length !== 0) {
        for (let i = 0; i < warranty.length; i++) {
          this.list1 = _.filter(this.filteredlist, row => row.warranty_status.indexOf(warranty[i]) > -1);
          this.warrantyList = this.warrantyList.concat(this.list1);
          this.list1 = [];
        }
      }
      this.filteredlist = this.warrantyList;
    }
    /* ********* Service filter *************/
    if ( serviceType.length !== 0 ) {
      this.serviceList = [];
      if (this.filteredlist.length !== 0) {
        for (let i = 0; i < serviceType.length; i++) {
          for (let j = 0; j < this.filteredlist.length; j++) {
            if (this.filteredlist[j].service_type === serviceType[i]) {
              this.list1.push(this.filteredlist[j]);
          }
        }
        this.serviceList = this.serviceList.concat(this.list1);
        this.list1 = [];
        }
      }
      this.filteredlist = this.serviceList;
    }
    /* ********* Product filter *************/
    if ( product.length !== 0 ) {
      this.productList = [];
      if (this.filteredlist.length !== 0) {
        for (let i = 0; i < product.length; i++) {
          for (let j = 0; j < this.filteredlist.length; j++) {
            if (this.filteredlist[j].family === product[i]) {
              this.list1.push(this.filteredlist[j]);
          }
        }
        this.productList = this.productList.concat(this.list1);
        this.list1 = [];
      }

      }
      this.filteredlist = this.productList;
    }

    /* ********* Serial filter *************/
    if ( serial !== '' ) {
      serial = serial.toLowerCase();
      this.serialList = [];
      if (this.filteredlist.length !== 0) {
          this.serialList = _.filter(this.filteredlist, row => row.serial_no.toLowerCase().indexOf(serial) > -1);
          this.filteredlist = this.serialList;
      }
    }
    /* ********* Technician filter *************/
    if ( technician !== '' ) {
      this.technicianList = [];
      if (this.filteredlist.length !== 0) {
        for (let j = 0; j < this.filteredlist.length; j++) {
          if (this.filteredlist[j].assigned_user_id === technician) {
            this.list1.push(this.filteredlist[j]);
        }
        this.technicianList = this.technicianList.concat(this.list1);
        this.list1 = [];
      }
      // this.technicianList = _.filter(this.filteredlist, row => row.assigned_user_id.indexOf(technician) > -1);
      this.filteredlist = this.technicianList;
      }
    }
    /* ********* IMEI filter *************/
    if ( imeiNo !== '' ) {
      this.imeiList = [];
      if (this.filteredlist.length !== 0) {
        for (let j = 0; j < this.filteredlist.length; j++) {
          if (this.filteredlist[j].imei_no === imeiNo) {
            this.list1.push(this.filteredlist[j]);
        }
        this.imeiList = this.imeiList.concat(this.list1);
        this.list1 = [];
        }
          this.filteredlist = this.imeiList;
      }
    }
    /* ********* GNumber filter *************/
    if ( gNo !== '' ) {
      this.gNoList = [];
      if (this.filteredlist.length !== 0) {
        for (let j = 0; j < this.filteredlist.length; j++) {
          if (this.filteredlist[j].g_number === gNo) {
            this.list1.push(this.filteredlist[j]);
        }
        this.gNoList = this.gNoList.concat(this.list1);
        this.list1 = [];
        }
        this.filteredlist = this.gNoList;
      }
    }

    /* ********* Pending filter *************/

    if (pending.length !== 0 ) {
      this.pendingList = [];
      if (this.filteredlist.length !== 0) {
        for (let i = 0; i < pending.length; i++) {
          for (let j = 0; j < this.filteredlist.length; j++) {
            if (this.filteredlist[j].pending_type === pending[i]) {
              this.list1.push(this.filteredlist[j]);
          }
        }
        this.pendingList = this.pendingList.concat(this.list1);
        this.list1 = [];
      }
      }
      this.filteredlist = this.pendingList;
    }

    /* this.totalList = Array.prototype.concat.apply([], [this.statusList, this.ticketList]);
    this.totalList = Array.from(new Set(this.totalList.concat(this.nameList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.locationList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.phoneList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.emailList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.warrantyList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.serviceList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.productList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.serialList)));
    this.totalList = Array.from(new Set(this.totalList.concat(this.technicianList))); */
    // filterMetadata.count = this.totalList.length;
    filterMetadata.count = this.filteredlist.length;
    return this.filteredlist;
    } else {
      filterMetadata.count = array.length;
      return array;
    }

  }
}
