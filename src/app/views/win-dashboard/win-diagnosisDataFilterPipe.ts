import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diagnosisFilter',
})

export class DiagnosisDataFilterPipe implements PipeTransform {
  totalList: any = [];

  transform(array: any[], nameSearch: string) {
      const names = nameSearch[0];
      if ( names !== '' ) {
          this.totalList = [];
          for (let i = 0; i < array.length; i++) {
            this.totalList = _.filter(array, row => row.ticket_id.indexOf(names) > -1);
          }
          return this.totalList;
      } else {
        return array;
      }
  }
}
