import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataPipe',
    standalone: false
})


export class DataPipePipe implements PipeTransform {
  productList: any =[];
  filteredlist: any = [];
  list1: any = [];
  statusList: any = [];
  datePipe = new DatePipe('en-US');
  todaysList: any = [];

  transform(array: any[], productFamily: any[], status: any, range: any) {
    this.filteredlist = array;
    if(this.filteredlist.length !== 0 && status !== '' && range !== '') {
      if (productFamily.length !== 0) {
        this.productList = [];
        if (this.filteredlist.length !== 0) {
          for (let i = 0; i < productFamily.length; i++) {
              for (let j = 0; j < this.filteredlist.length; j++) {
                if (this.filteredlist[j].product_code === productFamily[i]) {
                  this.list1.push(this.filteredlist[j]);
              }
            }
            this.productList = this.productList.concat(this.list1);
            this.list1 = [];
          }
        }
        this.filteredlist = this.productList;
      }
      if(status !== '' && status !== 'any') {
        this.statusList = this.filteredlist.filter((reservations: any) => {
          return (reservations.current_status === status) });
        this.filteredlist = this.statusList;
      }
      if(range === 'Today') {
        let todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        for (let i = 0; i < this.filteredlist.length; i++) {
          if(this.filteredlist[i].current_status === 'RESCHEDULED' || this.filteredlist[i].rescheduled_to !== '') {
            if(this.datePipe.transform(this.filteredlist[i].rescheduled_date, 'yyyy-MM-dd') === todayDate) {
              this.todaysList.push(this.filteredlist[i]);
            }
          } else {
            if(this.datePipe.transform(this.filteredlist[i].reservation_date, 'yyyy-MM-dd') === todayDate) {
              this.todaysList.push(this.filteredlist[i]);
            }
          }
        }
        this.filteredlist = this.todaysList;
      }
      return this.filteredlist;
    } else {
      return array;
    }
  }
}
