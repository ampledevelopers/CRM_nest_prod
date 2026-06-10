import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter',
    standalone: false
})

export class DataFilterPipe implements PipeTransform {
  totalList: any = [];

  transform(array: any[], nameSearch: string) {
      const names = nameSearch[0];
      if ( names !== '' ) {
          this.totalList = [];
          for (let i = 0; i < array.length; i++) {
            this.totalList = _.filter(array, (row: { id: string | string[]; }) => row.id.indexOf(names) > -1);
          }
          return this.totalList;
      } else {
        return array;
      }
  }
}
