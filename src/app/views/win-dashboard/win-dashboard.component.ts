import { Component, ViewChildren } from '@angular/core';
import { WinDashboardService } from './win-dashboard.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'win-dashboard.component.html',
  providers: [ WinDashboardService ],
  styleUrls: ['../../../scss/vendors/ng-select/ng-select.scss', './win-dashboard.component.scss', '../../../scss/customstyle.css'],
  standalone : false
})
export class WinDashboardComponent {
  error: any;
  loading = true;
  buttonSpin = false;
  userRole;
  retryRequest = 0;
  statusCountList: any = [];
  dataStatus: any;
  dataTemp: any = [];
  data = [];
  options: any = [];
  wordSearch = '';
  technicianSearch: any;
  nameSearch = '';
  statusSearch: any = [];
  ticketSearch = '';
  locationSearch: any = [];
  phoneSearch = '';
  emailSearch = '';
  warrantySearch = '';
  serviceSearch = '';
  productSearch: any = [];
  serialSearch = '';
  imeiSearch = '';
  gNoSearch = '';
  pendingSearch = '';
  nameList: any = [];
  warrantyOptions: any = [];
  serviceOptions: any = [];
  ruleStatus: any;
  remarks = '';
  changedata: any;
  requiredfields: any = [];
  requiredinputs = false;
  submitbtn = false;
  dataindex: any;
  statusindex: any;
  optionvalue: any;
  notfilled = false;
  ticket_type: any;
  statusId: any;
  loopcount: any = 0;
  filterMetadata = { count: 0 };
  totalTickets: any;
  p: number[] = [];
  pendingOptions: any = [
    {id: '0', value: 'Select Pending Status', label: 'Select Pending Status'},
    {id: '1', value: 'Apple Pending', label: 'Apple Pending'},
    {id: '2', value: 'Ample Pending', label: 'Ample Pending'},
    {id: '3', value: 'Customer Pending', label: 'Customer Pending'},
  ];
  siteType = localStorage.getItem('siteType');
  @ViewChildren('myVar') createdItems: any;
  companies: any = [];
  constructor(private dataService: WinDashboardService,
    public route: ActivatedRoute, public userService: UserService, private router: Router) {
    this.userRole = localStorage.getItem('userRole');
    this.serviceOptions = [
                            {id: '1', value: 'Warranty - W', label: 'Warranty - W'},
                            {id: '2', value: 'Chargeable - C', label: 'Chargeable - C'},
                            {id: '3', value: 'Courtesy call', label: 'Courtesy call'},
                            {id: '4', value: 'APP', label: 'APP'},
                            {id: '5', value: 'Global Warranty - GW', label: 'Global Warranty - GW'},
                            {id: '6', value: 'AMC', label: 'AMC'},
                            {id: '7', value: 'Chargeable', label: 'Chargeable'},
                            {id: '8', value: 'Under Warranty', label: 'Under Warranty'},
                           ];
    this.warrantyOptions = [
                            {id: '1', value: 'Under Warranty', label: 'Under Warranty'},
                            {id: '2', value: 'Out of Warranty(No Coverage)', label: 'Out of Warranty(No Coverage'}
                           ];
      this.initiate();
      this.getvalues();
        this.getCompanies();
    }

    getCompanies() {
      let result;
      this.dataService.getCompanies()
        .subscribe({next:
          (data: any) => {
              result = data;
              if (result.status === true) {
                this.companies = result.company;
              }
          }, // success path
          error: error => this.error = error // error path
    });
    }

    initiate() {
      this.route.params.subscribe(params => this.ticket_type = params['type']);
      localStorage.setItem('ticket_type', this.ticket_type);
      this.route.params.subscribe(params => {
        this.startFetching();
      });
    }

    getStatusCounts(ticket_type: any) {
      let result: any = [];
      this.dataService.getStatusCount(ticket_type)
      .subscribe({next:
        (data: any) => {
          result = data;
          if (result.status === true) {
            this.statusCountList = result.count;
          }
        }, // success path
        error: error => this.error = error // error path
    });
    }

    locationselect(location: any) {
      localStorage.setItem('locations', location);
    }

    statusSelect(status: any) {
      localStorage.setItem('statuses', status);
    }

    familySelect(product: any) {
      localStorage.setItem('products', product);
    }

    searchTechnician(technician: any) {
      localStorage.setItem('technician', technician);
    }

    getvalues() {
      let locations: any;
      let statuses: any;
      let products: any;
      locations = localStorage.getItem('locations');
      statuses = localStorage.getItem('statuses');
      products = localStorage.getItem('products');
      this.technicianSearch = localStorage.getItem('technician');

      if (locations.length !== 0) {
        this.locationSearch = locations.split(',');
      } else {
        this.locationSearch = [];
      }
      if (statuses.length !== 0) {
        this.statusSearch = statuses.split(',');
      } else {
        this.statusSearch = [];
      }
      if (products.length !== 0) {
        this.productSearch = products.split(',');
      } else {
        this.productSearch = [];
      }
    }

    onRightClick(event: any) {
      event.preventDefault();
    }

    startFetching() {
      if (this.dataStatus === true && this.options.length !== 0) {
        this.storeData_status();
        this.loading = false;
        this.buttonSpin = false;
      } else {
        this.retryRequest = +this.retryRequest + 1;
        if (this.retryRequest <= 3) {
          this.getData_Status();
        } else {
          this.loading = false;
          this.buttonSpin = false;
        }
      }
    }

    getData_Status() {
      this.buttonSpin = true;
      let result: any = [];
      this.dataService.getData(this.ticket_type)
      .subscribe({
        next:(data) => {
          result = data;
          this.dataStatus = result.status;
          setTimeout(() => {
            if (this.dataStatus === true) {
              this.dataTemp = data;
              this.dataTemp = this.dataTemp.tickets;
              localStorage.setItem('tickets', JSON.stringify(this.dataTemp));
              localStorage.setItem('total', this.dataTemp.length);
              this.startFetching();
            } else {
              this.startFetching();
            }
          }, 3000);
        }, // success path
        error: error => this.error = error // error path
       });

      this.dataService.getOptions()
      .subscribe({ next:
        (data) => {
          this.options = data;
        },
        error: error => this.error = error // error path
    });

    }

  storeData_status() {
        for (let i = 0; i < this.dataTemp.length; i++ ) {
          for (let j = 0; j < this.options.status.length; j++) {

            if (this.dataTemp[i].status === this.options.status[j].value) {
              this.dataTemp[i].statusclr = this.options.status[j].color;
            }
          }
          for (let k = 0; k < this.companies.length; k++) {
            if (this.dataTemp[i].company_id === this.companies[k].id) {
              this.dataTemp[i].companyName = this.companies[k].company_name;
            }
          }
        }
        this.data = this.dataTemp;
        this.filterMetadata = { count: this.data.length };
  }

  ticketselect(id: string) {
    if (localStorage.getItem('id') === id) {
      alert(`This ticket is currently active on another page`);
    } else {
      localStorage.setItem('id', id);
      this.router.navigateByUrl('/win-dashboard/ticket');
    }
  }

  public getDate(regDate: string) {
    const date = new Date(regDate);
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
  }

}
