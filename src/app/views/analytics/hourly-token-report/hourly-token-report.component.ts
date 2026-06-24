import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular';
import { HourlyTokenReportService } from './hourly-token-report.service';

export interface HourlyTokenRow {
  time_slot: string;
  user_name: string;
  raf: string;
  delivery: string;
  enquiry: string;
  abandon: string;
}

export interface HourlyTokenTableRow {
  time_slot: string;
  values: Record<string, { raf: string; delivery: string; enquiry: string; abandon: string }>;
}

@Component({
  selector: 'app-hourly-token-report',
  templateUrl: './hourly-token-report.component.html',
  styleUrls: ['./hourly-token-report.component.scss', '../../../../scss/customstyle.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerModule]
})
export class HourlyTokenReportComponent implements OnInit {
  loading = false;
  showTable = false;
  showNoData = false;
  reportDate = new Date().toISOString().split('T')[0];
  branchCode = localStorage.getItem('branchCode') || '';
  branches: any[] = [];
  users: string[] = [];
  timeSlots: string[] = [];
  tableRows: HourlyTokenTableRow[] = [];

  constructor(public dataService: HourlyTokenReportService) {
    this.timeSlots = this.generateTimeSlots();
  }

  ngOnInit() {
    this.getBranches();
  }

  getBranches() {
    this.dataService.getBranches().subscribe({
      next: (data: any) => {
        this.branches = data.branch || [];
        if (this.branchCode) {
          this.loadReport();
        }
      },
      error: () => {
        alert('Unable to load branches.');
      }
    });
  }

  getSelectedBranchLabel(): string {
    const branch = this.branches.find((b) => b.branch_code === this.branchCode);
    return branch?.label || this.branchCode;
  }

  loadReport() {
    if (!this.branchCode) {
      alert('Please select a branch.');
      return;
    }

    this.loading = true;
    this.showTable = false;
    this.showNoData = false;
    this.users = [];
    this.tableRows = [];

    this.dataService.getHourlyTokenReport(this.reportDate, this.branchCode).subscribe({
      next: (result: any) => {
        this.loading = false;
        if (result.status === true && result.report?.length) {
          this.buildTable(result.report);
          this.showTable = true;
          this.showNoData = false;
        } else {
          this.showTable = false;
          this.showNoData = true;
        }
      },
      error: () => {
        this.loading = false;
        this.showNoData = true;
      }
    });
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    let hour = 10;
    let minute = 30;

    while (hour < 20 || (hour === 20 && minute <= 30)) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    return slots;
  }

  private normalizeUserName(name: string): string {
    return (name || '').trim();
  }

  private buildTable(report: HourlyTokenRow[]) {
    const userSet = new Set<string>();
    report.forEach((row) => {
      const userName = this.normalizeUserName(row.user_name);
      if (userName) {
        userSet.add(userName);
      }
    });
    this.users = Array.from(userSet);

    this.tableRows = this.timeSlots.map((slot) => {
      const slotRows = report.filter((row) => row.time_slot === slot);
      const values: Record<string, { raf: string; delivery: string; enquiry: string; abandon: string }> = {};

      this.users.forEach((user) => {
        const match = slotRows.find((row) => this.normalizeUserName(row.user_name) === user);
        values[user] = {
          raf: match?.raf ?? '0',
          delivery: match?.delivery ?? '0',
          enquiry: match?.enquiry ?? '0',
          abandon: match?.abandon ?? '0',
        };
      });

      return { time_slot: slot, values };
    });
  }

  getUserValue(row: HourlyTokenTableRow, user: string, field: 'raf' | 'delivery' | 'enquiry' | 'abandon'): string {
    return row.values[user]?.[field] ?? '0';
  }

  formatDisplayValue(value: string): string {
    const num = Number(value);
    if (!value || isNaN(num) || num === 0) {
      return '-';
    }
    return String(value);
  }

  isActiveValue(value: string): boolean {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }
}
