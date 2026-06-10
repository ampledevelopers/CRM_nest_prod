import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
    name: 'dataPipe',
    standalone: true
})
export class DataPipePipe implements PipeTransform {
  filteredArray: any;
  withinDateRange: any = [];
  transform(array: any, fromDate: any, toDate: any, pudType: any, status: any) {
    this.filteredArray = array;
    if(array.length !== 0) {
      for(let i=0; i<this.filteredArray.length; i++) {
        if((this.filteredArray[i].date >= fromDate) && (this.filteredArray[i].date <= toDate)) {
          this.withinDateRange.push(this.filteredArray[i]);
        }
      }
      this.filteredArray = this.withinDateRange;
      if(pudType !== 'any') {
        this.filteredArray = this.filteredArray.filter((data: any) => {
          return (data.pud_type === pudType)
        });
      }
      if(status !== 'any') {
        this.filteredArray = this.filteredArray.filter((data: any) => {
          return (data.status === status);
        });
      }
      return this.filteredArray;
    } else return array;
  }
}
