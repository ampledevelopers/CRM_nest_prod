import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConsignmentReportService } from './consignment-report.service';

export interface ConsignmentItem {
  part_no: string;
  description: string | null;
  apple_qty: string;
  ample_qty: string;
  total_quantity: string;
}

@Component({
  selector: 'app-consignment-report',
  templateUrl: './consignment-report.component.html',
  styleUrls: ['./consignment-report.component.scss', '../../../../scss/customstyle.css'],
  imports: [CommonModule, FormsModule, SpinnerModule, NgxPaginationModule],
  standalone: true
})
export class ConsignmentReportComponent {
  loading = true;
  error: any;

  allItems: ConsignmentItem[] = [];
  filteredItems: ConsignmentItem[] = [];
  searchTerm = '';

  branchCode = localStorage.getItem('branchCode') || '';

  page = 1;
  pageSize = 50;

  constructor(private dataService: ConsignmentReportService) {
    this.loadReport();
  }

  loadReport() {
    this.loading = true;
    this.error = null;
    this.dataService.getActiveConsignmentReport().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.allItems = this.normalizeResponse(res);
        this.filteredItems = [...this.allItems];
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
        this.allItems = [];
        this.filteredItems = [];
      }
    });
  }

  private normalizeResponse(res: any): ConsignmentItem[] {
    if (Array.isArray(res)) {
      return res;
    }
    if (Array.isArray(res?.data)) {
      return res.data;
    }
    return [];
  }

  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredItems = [...this.allItems];
    } else {
      this.filteredItems = this.allItems.filter(item =>
        (item.part_no || '').toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term)
      );
    }
    this.page = 1;
  }
}
