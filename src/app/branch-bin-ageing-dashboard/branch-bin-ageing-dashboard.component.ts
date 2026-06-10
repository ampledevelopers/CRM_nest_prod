import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { UserService } from '../shared/user.service';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-bin-ageing-dashboard',
  templateUrl: './branch-bin-ageing-dashboard.component.html',
  styleUrls: ['./branch-bin-ageing-dashboard.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class BranchBinAgeingDashboardComponent implements OnInit, OnDestroy {

  branchCode = localStorage.getItem('branchCode');
  userRole = localStorage.getItem('userRole');
  branchName : any = {};
  siteTypeId = localStorage.getItem('siteType');
  now = new Date();
  intervalId: any;
  dashboardIntervalId: any;
  loading = false;
  binDashboard: any = null;
  refreshCounter: number = 0;
  selectedStatus: string = '';
  ticketsList: any[] = [];
  branchId : string = '';
  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  this.now = new Date();
  this.intervalId = setInterval(() => this.now = new Date(), 1000);
    const lastFetchTime = localStorage.getItem('lastDashboardFetch');
    const now = Date.now();

    if (lastFetchTime && now - parseInt(lastFetchTime) < 15 * 60 * 1000) {
      alert('You cannot refresh the dashboard within 15 minutes of the last update.');
      this.router.navigate(['login']);
      return;
    }
  this.loadBinAgeingDashboardAllowed();
  this.dashboardIntervalId = setInterval(() => this.loadBinAgeingDashboardAllowed(), 900000);
}

ngOnDestroy(): void {
  clearInterval(this.intervalId);
  clearInterval(this.dashboardIntervalId);
}



  loadBinAgeingDashboardAllowed(): void {
    if (new Date().getHours() >= 22 && this.userRole !== '29') {
      this.terminateSession();
      return;
    }
    this.loadBinAgeingDashboard();
  }

  terminateSession(): void {
    alert('Dashboard session has ended for the day. Please log in tomorrow.');
    localStorage.clear();
    this.router.navigate(['login']);
    clearInterval(this.intervalId);
    clearInterval(this.dashboardIntervalId);
  }

  loadBinAgeingDashboard(): void {
    if (!this.branchCode)
      return;
    this.loading = true;
    this.userService.getBinAgeingBranch({
      user_id: localStorage.getItem('userId'),
      branch_code: this.branchCode
    }).subscribe({
      next: (res: any) => {
        this.refreshCounter++;
        console.log(`Dashboard refreshed ${this.refreshCounter} times`);
        if (res.status) {
          this.binDashboard = res.data;
          this.branchId = this.binDashboard.branch?.id || '';
          this.branchName = res.data.branch;
        }
       localStorage.setItem('lastDashboardFetch', Date.now().toString());
        this.loading = false;
        this.logDashboardFetch();

      },
      error: () => this.loading = false
    });
  }
  logDashboardFetch(): void {
  const logData = {
    user_id: localStorage.getItem('userId'),
    branch_code: this.branchCode
  };

  this.userService.logDashboardEvent(logData).subscribe({
    next: (response: any) => console.log('Dashboard refresh logged successfully:', response),
    error: (error) => console.warn('Failed to log dashboard refresh:', error)
  });
}
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd-MM-yyyy HH:mm:ss') || '';
  }

  getBinTotal(statusName: string): number {
    if (!this.binDashboard || !this.binDashboard.allTotal) {
      return 0;
    }

    const match = this.binDashboard.allTotal.find((b: any) => b.status_name === statusName);
    if (match) {
      return Number(match.total_count);
    } else {
      return 0;
    }
  }

  getBinAgeing(statusName: string): number {
    if (!this.binDashboard || !this.binDashboard.all_ageing) {
      return 0;
    }

    const flatList = this.binDashboard.all_ageing.flat();
    const match = flatList.find((b: any) => b.status_name === statusName);

    if (match) {
      return Number(match.ageing_count);
    } else {
      return 0;
    }
  }

  getTotalCount(): number {
    if (!this.binDashboard || !this.binDashboard.allTotal) {
      return 0;
    }

    let total = 0;
    for (const b of this.binDashboard.allTotal) {
      total += Number(b.total_count);
    }
    return total;
  }

  getTotalAgeing(): number {
    if (!this.binDashboard || !this.binDashboard.all_ageing) {
      return 0;
    }

    const flatList = this.binDashboard.all_ageing.flat();
    let total = 0;

    for (const b of flatList) {
      total += Number(b.ageing_count);
    }

    return total;
  }

  // -------------------- Mac Data --------------------
  getMacTotal(statusName: string): number {
    if (!this.binDashboard || !this.binDashboard.mac_array) {
      return 0;
    }

    const macList = this.binDashboard.mac_array.macTotal;
    const match = macList.find((b: any) => b.status_name === statusName);

    if (match) {
      return Number(match.total_count);
    } else {
      return 0;
    }
  }

  getMacAgeing(statusName: string): number {
  if (!this.binDashboard || !this.binDashboard.mac_array) return 0;

  const macAgeingList = this.binDashboard.mac_array.macAgeing;
  const match = macAgeingList.find((b: any) => b.status_name === statusName);

  return match ? Number(match.ageing_count) : 0;
}
  getMacTotalSum(): number {
    if (!this.binDashboard || !this.binDashboard.mac_array) {
      return 0;
    }

    let total = 0;
    for (const b of this.binDashboard.mac_array.macTotal) {
      total += Number(b.total_count);
    }

    return total;
  }

  getMacAgeingSum(): number {
  if (!this.binDashboard || !this.binDashboard.mac_array) {
    return 0;
  }

  const macAgeing = this.binDashboard.mac_array.macAgeing; // flat array
  let total = 0;

  for (const item of macAgeing) {
    const count = item.ageing_count ? parseInt(item.ageing_count, 10) : 0;
    total += count;
  }

  return total;
}

  ageingTicketList(
    family: string,
    type: string,
    statusId: any,
    ticket_list_temp: TemplateRef<any>,
    index: any,
    branchId: any,
    statusName: string
  ) {
    this.selectedStatus = statusName;
    let countType = index % 2 === 0 ? 'AC' : 'SC';
    statusId = statusId.toString().replace(/\s+/g, '');

    this.userService.getBranchAgeingTicketList(family, type, statusId, countType, this.branchId)
      .subscribe({
        next: (res: any) => {
          if (res.status) {
            this.ticketsList = res.data; // just tickets, no SMS/Email/Call
            this.modalService.open(ticket_list_temp, {
              size: 'xl',
              centered: true,
              scrollable: true,
              backdrop: 'static'
            });
          }
        },
        error: (err: any) => console.error(err)
      });
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

}
