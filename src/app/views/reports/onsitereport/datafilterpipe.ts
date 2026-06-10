import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter',
})

export class DataFilterPipe implements PipeTransform {
    ticketList: any = [];
    partList: any = [];
    eeeList: any = [];
    totalList: any = [];
    transform(array: any[], Search: string) {
      const word = Search[0];
      const type = Search[1];
      this.totalList = [];
    /* ********* Ticket filter *************/
    if ( word !== '' ) {
      this.ticketList = [];
        if (type === 'tList') {
          for (let i = 0; i < array.length; i++) {
            this.ticketList = _.filter(array, row => row.id.indexOf(word) > -1);
          }
          return this.ticketList;
        } else if (type === 'parts') {
          for (let i = 0; i < array.length; i++) {
            this.partList = _.filter(array, row => row.description.indexOf(word) > -1);
          }
          for (let i = 0; i < array.length; i++) {
            this.eeeList = _.filter(array, row => row.number.indexOf(word) > -1);
          }
          this.totalList = Array.prototype.concat.apply([], [this.partList, this.eeeList]);
          return this.totalList;
        }
    } else {
      return array;
    }

  }
}
