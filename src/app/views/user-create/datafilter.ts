import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter1',
})

export class DataFilter implements PipeTransform {
    userList: any = [];
    transform(array: any[], nameSearch: string) {
        const groupId = nameSearch[0].toString();
        /* const location = nameSearch[1].toLowerCase();
        const names = nameSearch[2].toLowerCase();
        if ( names !== '' ) {
          this.userList = [];
          for (let i = 0; i < array.length; i++) {
            this.userList = _.filter(array, row => row.user_name.toLowerCase().indexOf(names) > -1);
          }
          return this.userList;
        } else if (location !== '') {
          this.userList = [];
          for (let i = 0; i < array.length; i++) {
            this.userList = _.filter(array, row => row.branch_code.toLowerCase().indexOf(location) > -1);
            return this.userList;
          }
        } else */
        if  (groupId !== '') {
          this.userList = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i].group_id.toString() === groupId) {
              this.userList.push(array[i]);
            }
          }
          return this.userList;

        } else {
          return array;
        }
    }
}
