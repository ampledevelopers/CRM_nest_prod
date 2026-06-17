import { Component } from '@angular/core';
import { SdrDashboardService } from './sdr-dashboard.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExcelService } from '../../reports/excel.service';
import { FormsModule } from '@angular/forms';
import { truncate } from 'lodash';
import { CommonModule } from '@angular/common';
import { report } from 'process';
import { SpinnerModule } from '@coreui/angular';

@Component({
  selector: 'app-sdr-dashboard',
  templateUrl: './sdr-dashboard.component.html',
  styleUrls: ['./sdr-dashboard.component.scss', '../../../../scss/customstyle.css'],
  imports: [FormsModule, CommonModule, SpinnerModule],
  standalone: true
})
export class SdrDashboardComponent {
  loading = false;

  // Core data
  branches: any[] = [];
  branchesListData: any[] = [];
  branchesListTemp: any[] = [];
  partDesData: any[] = [];
  branchPartNo: any[] = [];

  // Data sets
  data: any = [];
  repairCountData: any[] = [];
  amSdrCountData: any[] = [];
  apSdrCountData: any[] = [];
  amOowCountData: any[] = [];

  // UI state
  showNoData = false;
  showTable = false;
  showWarrantyTable = false;
  showexportBtn = false;
  expanded = true;

  // Filters
  branch: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(public dataService: SdrDashboardService, private excelService: ExcelService) {
    this.getBranches();
  }

  /** --------------------------  Data Loaders -------------------------- **/

  getBranches() {
    this.dataService.getBranches().subscribe({
      next: (data: any) => {
        // console.log('Branches loaded:', data);
        this.branches = data.branch;
      },
      error: (err) => console.error(err),
    });
  }

  sdrTypeSelected(event: string) {
    if (event) this.resetDashboard();
  }

  load() {
    if (this.branch === 'Select Branch' || !this.fromDate || !this.toDate) {
      alert('Please Fill all Mandatory Fields');
      return;
    }
    if (this.fromDate > this.toDate) {
      alert('From Date cannot be greater than To Date');
      return;
    }

    this.resetDashboard();
    this.loading = true;
    this.showTable = false;
    this.getSdrData();
  }

  /** -------------------------- Helpers -------------------------- **/

  private resetDashboard() {
    this.repairCountData = [];
    this.branchesListData = [];
    this.branchesListTemp = [];
    this.amSdrCountData = [];
    this.apSdrCountData = [];
    this.amOowCountData = [];
    this.partDesData = [];
    this.showTable = false;
    this.showNoData = false;
    this.loading = false;
    this.showexportBtn = false;
  }

  private sumByCount(list: any[]): number {
    return list.reduce((sum, r) => sum + (+r.count || 0), 0);
  }

  private filterByCoverage(list: any[], type: 'IW' | 'OOW'): any[] {
    const IW_STATUSES = [
      'Apple Limited Warranty', 'Repeat Service', 'AppleCare Protection Plan', 'Quality Program', 'Customer Satisfaction (CS) Code', null,'',
    ];
    const OOW_STATUSES = [
      'Out Of Warranty (No Coverage)', 'Variable Warranty', 'Loaner No Warranty', 'Variable Warranty Repeat'
    ];
    const filterList = type === 'IW' ? IW_STATUSES : OOW_STATUSES;
    return list.filter(r => filterList.includes(r.coverage_status_description));
  }

  /** -------------------------- Main Logic -------------------------- **/

  getSdrData() {
    this.showWarrantyTable = false;
    this.dataService.getSdrData(this.branch, this.fromDate, this.toDate)
      .subscribe({
        next: (result: any) => {
          this.loading = false;
          if (result.status === true ) {
          this.showexportBtn = true;
          this.data = result;
          this.repairCountData = result.repair_count || [];
          this.amSdrCountData = result.am_sdr_data || [];
          this.amOowCountData = result.am_oow_sdr_data || [];
          this.apSdrCountData = result.ap_sdr_data || [];

          if (!this.repairCountData.length) {
            console.log('No repair count data available.');
            this.showNoData = true;
            this.showTable = false;
            return;
          }

          this.showWarrantyTable = true;

          // Extract branch and part info
          this.branchesListTemp = [...new Set(this.repairCountData.map((r: any) => r.branch_code))];
          this.partDesData = this.repairCountData
            .map((r: any) => ({ branch_code: r.branch_code, part_number: r.part_number, description: r.description }))
            .filter(
              (v, i, self) => i === self.findIndex(p => p.branch_code === v.branch_code && p.part_number === v.part_number)
            );

          this.processBranchLevel();
          this.processPartLevel();

          this.showTable = true;
        }
      },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  /** --------------------------  Branch Calculations -------------------------- **/
  private processBranchLevel() {
    this.branchesListData = this.branchesListTemp.map(branchCode => {
      const branchDetails = this.branches.find(b => b.branch_code === branchCode);
      if (!branchDetails) return null;

      const repairList = this.repairCountData.filter(r => r.branch_code === branchCode);
      const amIwList = this.amSdrCountData.filter(r => r.branch_code === branchCode);
      const amOowList = this.amOowCountData.filter(r => r.branch_code === branchCode);
      const apList = this.apSdrCountData.filter(r => r.branch_code === branchCode);

      const repairIW = this.sumByCount(this.filterByCoverage(repairList, 'IW'));
      const repairOOW = this.sumByCount(this.filterByCoverage(repairList, 'OOW'));
      const totalRepair = repairIW + repairOOW;

      const amIW = this.sumByCount(amIwList);
      const amOOW = this.sumByCount(amOowList);
      const apCount = this.sumByCount(apList);

      const grandTotal = amIW + amOOW + apCount;
      const percentage = totalRepair > 0 ? Math.round((grandTotal / totalRepair) * 100) + '%' : '0%';

      return {
        name: branchDetails.label,
        branchCode,
        repairIW,
        repairOOW,
        totalRepairCount: totalRepair,
        amIWCount: amIW,
        amOOWCount: amOOW,
        apTotalCount: apCount,
        grandTotal,
        percentage,
      };
    }).filter(Boolean);
  }

  /** -------------------------- ⚙️ Part Calculations -------------------------- **/
private processPartLevel() {
  this.partDesData = this.partDesData.map(part => {
    const filter = (data: any[]) =>
      data.filter(r => r.branch_code === part.branch_code && r.part_number === part.part_number);

    const repairList = filter(this.repairCountData);
    const amIwList = filter(this.amSdrCountData);
    const amOowList = filter(this.amOowCountData);
    const apList = filter(this.apSdrCountData);

    // Collect Ticket IDs for Tooltip
    const repairTicketIds = repairList.map(r => r.id);
    const amIwTicketIds = amIwList.map(r => r.id);
    const amOowTicketIds = amOowList.map(r => r.id);
    const apTicketIds = apList.map(r => r.id);

    const repairIW = this.sumByCount(this.filterByCoverage(repairList, 'IW'));
    const repairOOW = this.sumByCount(this.filterByCoverage(repairList, 'OOW'));
    const totalRepair = repairIW + repairOOW;

    const amIW = this.sumByCount(amIwList);
    const amOOW = this.sumByCount(amOowList);
    const apCount = this.sumByCount(apList);

    const grandTotal = amIW + amOOW + apCount;
    const percentage = totalRepair > 0
      ? Math.round((grandTotal / totalRepair) * 100) + '%'
      : '0%';

    return {
      ...part,
      repairIWPartCount: repairIW,
      repairOOWPartCount: repairOOW,
      amIWPartCount: amIW,
      amOOWPartCount: amOOW,
      apPartCount: apCount,
      totalRepairCount: totalRepair,
      partPercentage: percentage,

      // Add Ticket IDs for Tooltip
      repairTicketIds,
      amIwTicketIds,
      amOowTicketIds,
      apTicketIds
    };
  });
}

  /** -------------------------- 📐 Utility Methods -------------------------- **/

  getTotal(field: string): number {
    return this.branchesListData.reduce((sum, x) => sum + (Number(x[field]) || 0), 0);
  }

  expandBranch(i: number, branchCode: string, action: string) {
    this.expanded = false;
    const currentBranch = this.branchesListData[i];
    if (action === 'open') {
      this.branchesListData.forEach(b => (b.showInnerTable = false));
      currentBranch.showInnerTable = true;
      this.branchPartNo = this.partDesData.filter(p => p.branch_code === branchCode);
    } else {
      currentBranch.showInnerTable = false;
    }
  }

  expandTech(j: number, id: any, action: string) {
    this.expanded = action === 'open';
    this.branchPartNo.forEach(p => (p.showProductList = false));
    if (action === 'open') this.branchPartNo[j].showProductList = true;
  }

  /** --------------------------  Excel Export -------------------------- **/

  formatTicketIds(ids: (string | number)[]): string {
    return [...new Set((ids || []).filter(Boolean).map(String))].join(', ');
  }

   exportAsXLSX(): void {
  const exportData: any[] = [];

  // Branch-level + Part-level rows
  this.branchesListData.forEach((branch: any) => {
    const branchTicketIds = this.repairCountData
      .filter((r: any) => r.branch_code === branch.branchCode)
      .map((r: any) => r.id);

    // Branch-level row
    exportData.push({
      'Branch/Part No (Part Desc)': branch.name,
      'Ticket Id': this.formatTicketIds(branchTicketIds),
      'Repair Count IW': branch.repairIW,
      'Repair Count OOW': branch.repairOOW,
      'Ample SDR IW': branch.amIWCount,
      'Ample SDR OOW': branch.amOOWCount,
      'Apple SDR IW': branch.apTotalCount,
      'Apple SDR OOW': branch.apOOWCount || 0,
      'Grand Total':
        (branch.amIWCount || 0) +
        (branch.amOOWCount || 0) +
        (branch.apTotalCount || 0) +
        (branch.apOOWCount || 0),
      'SDR %':
        branch.totalRepairCount > 0
          ? Math.round(
              ((branch.amIWCount || 0) +
                (branch.amOOWCount || 0) +
                (branch.apTotalCount || 0) +
                (branch.apOOWCount || 0)) /
                branch.totalRepairCount *
                100
            ) + '%'
          : '0%'
    });

    // Part-level rows
    const parts = this.partDesData.filter(
      (p: any) => p.branch_code === branch.branchCode
    );

    parts.forEach((part: any) => {
      exportData.push({
        'Branch/Part No (Part Desc)': `${part.part_number} (${part.description})`,
        'Ticket Id': this.formatTicketIds(part.repairTicketIds),
        'Repair Count IW': part.repairIWPartCount,
        'Repair Count OOW': part.repairOOWPartCount,
        'Ample SDR IW': part.amIWPartCount,
        'Ample SDR OOW': part.amOOWPartCount,
        'Apple SDR IW': part.apPartCount,
        'Apple SDR OOW': 0,
        'Grand Total':
          (part.amIWPartCount || 0) +
          (part.amOOWPartCount || 0) +
          (part.apPartCount || 0),
        'SDR %':
          part.totalRepairCount > 0
            ? Math.round(
                ((part.amIWPartCount || 0) +
                  (part.amOOWPartCount || 0) +
                  (part.apPartCount || 0)) /
                  part.totalRepairCount *
                  100
              ) + '%'
            : '0%'
      });
    });
  });

  // Total Row
  exportData.push({
    'Branch/Part No (Part Desc)': 'Total',
    'Ticket Id': '',
    'Repair Count IW': this.getTotal('repairIW'),
    'Repair Count OOW': this.getTotal('repairOOW'),
    'Ample SDR IW': this.getTotal('amIWCount'),
    'Ample SDR OOW': this.getTotal('amOOWCount'),
    'Apple SDR IW': this.getTotal('apTotalCount'),
    'Apple SDR OOW': this.getTotal('apOOWCount'),
    'Grand Total':
      this.getTotal('amIWCount') +
      this.getTotal('amOOWCount') +
      this.getTotal('apTotalCount') +
      this.getTotal('apOOWCount'),
    'SDR %':
      this.getTotal('totalRepairCount') > 0
        ? Math.round(
            ((this.getTotal('amIWCount') +
              this.getTotal('amOOWCount') +
              this.getTotal('apTotalCount') +
              this.getTotal('apOOWCount')) /
              (this.getTotal('repairIW') +
                this.getTotal('repairOOW'))) *
              100
          ) + '%'
        : '0%'
  });

  // Convert JSON → Excel
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SDR Dashboard');

  // Save file
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(
    new Blob([wbout], { type: 'application/octet-stream' }),
    `SDR_Dashboard_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

}
