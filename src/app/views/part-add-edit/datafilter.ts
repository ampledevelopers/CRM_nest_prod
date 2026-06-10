import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter1',
})

export class DataFilter implements PipeTransform {
    partList: any = [];
    gsxPartList: any = [];
    descriptionList: any = [];
    exchangePrice: any = [];
    stockPriceList: any = [];
    totalList: any = [];

    transform(array: any[], nameSearch: string) {
        const names = nameSearch[0].toLowerCase();

        if ( names !== '' ) {
            this.partList = [];
            for (let i = 0; i < array.length; i++) {
              this.partList = _.filter(array, row => row.part_no.toLowerCase().indexOf(names) > -1);
            }
            return this.partList;
        } else {
          return array;
        }
    }
}
