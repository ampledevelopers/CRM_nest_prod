import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter',
})

export class DataFilterPipe implements PipeTransform {
  totalList: any = [];
  idList: any = [];
  cateList: any = [];
  typeList: any = [];
  nameList: any = [];
  nameList1: any = [];
  mobileList: any = [];
  transform(array: any[], nameSearch: string) {
      const names = nameSearch[0];
      if ( names !== '' ) {
          this.totalList = [];
            this.idList = _.filter(array, row => row.id.indexOf(names) > -1);
            this.cateList = _.filter(array, row => row.enquiry_category.toLowerCase().indexOf(names) > -1);
            this.typeList = _.filter(array, row => row.enquiry_type.toLowerCase().indexOf(names) > -1);
            this.nameList = _.filter(array, row => row.first_name.toLowerCase().indexOf(names) > -1);
            this.nameList = _.filter(array, row => row.first_name.toLowerCase().indexOf(names) > -1);
            this.nameList1 = _.filter(array, row => row.last_name.toLowerCase().indexOf(names) > -1);
            this.mobileList = _.filter(array, row => row.mobile1.indexOf(names) > -1);

          this.totalList = Array.prototype.concat.apply([], [this.idList, this.cateList]);
          this.totalList = Array.from(new Set(this.totalList.concat(this.typeList)));
          this.totalList = Array.from(new Set(this.totalList.concat(this.nameList)));
          this.totalList = Array.from(new Set(this.totalList.concat(this.nameList1)));
          this.totalList = Array.from(new Set(this.totalList.concat(this.mobileList)));

          return this.totalList;
      } else {
        return array;
      }
  }
}
