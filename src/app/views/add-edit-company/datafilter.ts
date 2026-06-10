import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter1',
})

export class DataFilter implements PipeTransform {
    userList: any = [];
    transform(array: any[], nameSearch: string) {
        const names = nameSearch[0].toLowerCase();

        if ( names !== '' ) {
            this.userList = [];
            for (let i = 0; i < array.length; i++) {
              this.userList = _.filter(array, row => row.company_name.toLowerCase().indexOf(names) > -1);
            }
            return this.userList;
        } else {
          return array;
        }
    }
}
