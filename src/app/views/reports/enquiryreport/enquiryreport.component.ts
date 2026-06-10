import { Component } from '@angular/core';
import { EnquiryreportService } from './enquiryreport.service';
import { ExcelService } from '../excel.service';

@Component({
    selector: 'app-enquiryreport',
    templateUrl: './enquiryreport.component.html',
    styleUrls: ['./enquiryreport.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})

export class EnquiryreportComponent {
  reportLoading = false;
  loading = true;
  public fromDate = '';
  toDate = '';
  data: any = [];
  branches: any = [];
  branch = 'Select Branch Name';
  error: any;
  ticketSearch: any = '';
  filtertype: any = 'tList';
  isReport = false;
  isRecords = 0;
  alert = '';
  branchId = '';
  t1Type: any;
  branchList: any = [];
  branchListTemp: any = [];
  dlBranchList: any = [];
  userRole = localStorage.getItem('userRole');

  columns = ['id','branch_code','new_branch_code','g_number','serial_no','entrytime','product_description','customer_name','customer_phone_no','customer_email_id','customer_query','user_name','enquiry_flag','dl_branch_code','technician_comment','warranty_status','Purchased_in','t1_type','t1_invoice_id','token_accepted_date','ledge_no','Protect_plus_details','service_nonrepair_type','repair_type','purchased_in','customer_exist','customer_denied_process','emi_offered','trade_in_offered'];

  constructor(
    public dataService: EnquiryreportService,
    private excelService: ExcelService
  ) {
    this.getBranches();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.loading = false;
            this.branches = result.branch;
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  branchSelect(event: any) {
    this.branchList = event;
    // this.selectedBranchList = [...event];
    this.dlBranchList = [];
    for (let i = 0; i < this.branchList.length; i++) {
      this.branchListTemp = this.branches.filter((item: any) => item.id === this.branchList[i]);
      if (this.branchListTemp[0].parent_location_id !== '0') {
        this.branchList.push(this.branchListTemp[0].parent_location_id);
        this.dlBranchList.push({
          id: this.branchListTemp[0].id,
          branch_code: this.branchListTemp[0].branch_code,
          parent_location_code: this.branchListTemp[0].parent_location_code,
        });
      }
    }
    this.branchList = [...new Set(this.branchList)];
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Enquiry_Report');
  }

  load() {
    this.ticketSearch = '';
    if (this.fromDate === '') {
      alert('Please select the From Date');
      return;
    } else if (this.toDate === '') {
      alert('Please select the To Date');
      return;
    } else {
      // alert(this.toDate);
      this.getEnquiryReport();
    }
  }

  getEnquiryReport() {
    this.reportLoading = true;
    this.isReport = false;
    let result;
    let dataTemp: any = [];
    let dlRafs: any = [];
    let finalData: any = [];
    // let calltype;
  const from = new Date(this.fromDate);
  const to = new Date(this.toDate);
  const diff = (to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24);

  if (diff > 31 && this.userRole !== '2' && this.userRole !== '3') {
    alert('Date range cannot exceed 31 days.');
        this.clear();
        this.reportLoading = false;

    return;
  }
    this.dataService.getEnquiryReport(this.fromDate, this.toDate, this.branchId)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.reportLoading = false;
          }
          if (result.status === true && result.data.length > 0) {
            dataTemp = result.data;
            if (this.dlBranchList.length !== 0) {
              for (let i = 0; i < this.dlBranchList.length; i++) {
                dlRafs = [];
                dlRafs = dataTemp.filter((item: any) => ((item.branch_code === this.dlBranchList[i].parent_location_code) && (item.dl_branch_code === this.dlBranchList[i].branch_code)));
                dlRafs.filter((item1: any) => (item1.enquiry_flag === 'N'));
                dataTemp = dataTemp.filter((item: any) => (item.branch_code != this.dlBranchList[i].parent_location_code));
                finalData = dataTemp.concat(dlRafs);
              }
            } else {
              finalData = dataTemp;
            }
            for (let j = 0; j < finalData.length; j++) {
              if (finalData[j].t1_type === 'T1C') {
                finalData[j].t1_type = 'T1 Collected';
              } else if (finalData[j].t1_type === 'T1D') {
                finalData[j].t1_type = 'Non-willingness to pay T1'
              } else if (finalData[j].t1_type === 'CSCODE') {
                finalData[j].t1_type = 'CSCODE';
              } else if (finalData[j].t1_type === 'QP') {
                finalData[j].t1_type = 'Quality Program';
              } else if (finalData[j].t1_type === 'RR') {
                finalData[j].t1_type = 'Repeat Repair';
              } else if (finalData[j].t1_type === 'TPM') {
                finalData[j].t1_type = 'Third-party modification'
              } else if (finalData[j].t1_type === 'APPLE') {
                finalData[j].t1_type = 'Apple ID related issue';
              } else if (finalData[j].t1_type === 'V/O') {
                finalData[j].t1_type = 'Vintage/ Obsolete model';
              } else if (finalData[j].t1_type === 'CDR') {
                finalData[j].t1_type = 'Customer did not reach ledg';
              } else if (finalData[j].t1_type === 'CORP') {
                finalData[j].t1_type = 'Corporate customer - Paying through Quote';
              } else if (finalData[j].t1_type === 'TT') {
                finalData[j].t1_type = 'Testing token';
              } else if (finalData[j].t1_type === 'IWNoAccyT1C') {
                finalData[j].t1_type = 'IW - No Accy T1 Charges';
              }else if (finalData[j].t1_type === 'OOWAccy') {
                finalData[j].t1_type = 'OOW - Accy Purchased';
              }else if (finalData[j].t1_type === 'OOWAccyT1C') {
                finalData[j].t1_type = 'OOW - Accy T1 Charges Collected';
              }else if (finalData[j].t1_type === 'AccyT1D') {
                finalData[j].t1_type = 'Customer denied Accy T1 charges';
              }else if (finalData[j].t1_type === 'CxNF') {
                finalData[j].t1_type = 'Customer not on floor';
              }else if (finalData[j].t1_type === 'T1D-PE') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - Price Enquiry';
              } else if (finalData[j].t1_type === 'T1D-HP') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - High Pricing';
              } else if (finalData[j].t1_type === 'T1D-IW') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - IW,Device damage';
              }else if (finalData[j].t1_type === 'T1D-Acc') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - Purchased Accessory';
              }else if (finalData[j].t1_type === 'T1D-TPM') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - Third-party modification';
              }else if (finalData[j].t1_type === 'T1D-V/O') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - Vintage/ Obsolete model';
              }else if (finalData[j].t1_type === 'T1D-APPLE') {
                finalData[j].t1_type = 'Non-willingness to pay T1 - Apple ID related issue';
              }else if (finalData[j].t1_type === '14D') {
                finalData[j].t1_type = '14 Days Warranty';
              }else if (finalData[j].t1_type === null) {
                finalData[j].t1_type = 'NA';
              } else if (finalData[j].t1_type === '') {
                finalData[j].t1_type = 'NA';
              }
              if(finalData[j].customer_declined_process === '1') {
                finalData[j].customer_declined_process = 'Yes';
              } else if(finalData[j].customer_declined_process === '0') {
                finalData[j].customer_declined_process = 'No';
              }else{
                finalData[j].customer_declined_process = 'NA';
              }

              if (finalData[j].protect_plus_flag === 'Y') {
                finalData[j].Protect_plus_details = finalData[j].protect_plus_value;
              } else if (finalData[j].protect_plus_flag === 'N') {
              finalData[j].Protect_plus_details = 'NA';
              }

            if (finalData[j].service_nonrepair_type === 'NTF') {
              finalData[j].service_nonrepair_type = 'No Trouble Found (NTF)';
            } else if (finalData[j].service_nonrepair_type === 'SRC') {
              finalData[j].service_nonrepair_type = 'Screening (SRC)'
            } else if (finalData[j].service_nonrepair_type === 'LUA') {
              finalData[j].service_nonrepair_type = 'Loaner Unavailable (LUA)'
            } else if (finalData[j].service_nonrepair_type === 'CDM') {
              finalData[j].service_nonrepair_type = 'Customer Declined - Cost (CDM)'
            } else if (finalData[j].service_nonrepair_type === 'CDP') {
              finalData[j].service_nonrepair_type = 'Customer Declined - Part Unavailable (CDP)'
            } else if (finalData[j].service_nonrepair_type === 'CDT') {
              finalData[j].service_nonrepair_type = 'Customer Declined - Time (CDT)'
            } else if (finalData[j].service_nonrepair_type === 'CSL') {
              finalData[j].service_nonrepair_type = 'Country of Service Limitation (CSL)'
            } else if (finalData[j].service_nonrepair_type === 'FSL') {
              finalData[j].service_nonrepair_type = 'Forward to Service Location (FSL)'
            } else if (finalData[j].service_nonrepair_type === 'ROT') {
              finalData[j].service_nonrepair_type = 'Resolved - Other (ROT)'
            } else if (finalData[j].service_nonrepair_type === 'RSW') {
              finalData[j].service_nonrepair_type = 'Resolved - Software (RSW)'
            } else if (finalData[j].service_nonrepair_type === 'UPT') {
              finalData[j].service_nonrepair_type = 'Reused Part(s) (UPT)'
            }

            if (finalData[j].repair_type == 1) {
              finalData[j].repair_type = 'Hardware';
            } else if (finalData[j].repair_type == 2) {
              finalData[j].repair_type = 'Software';
            } else if (finalData[j].repair_type == 3) {
              finalData[j].repair_type = 'Accessory';
            } else if (finalData[j].repair_type == 4) {
              finalData[j].repair_type = 'Yet to Determine';
            }
          }
          finalData = finalData.filter(function (elem: any, index: any, self: any) {
            return index === self.findIndex((t: { id: any; }) => t.id === elem.id)
          })
            /* if (this.selectedBranchList.includes('45') || (this.selectedBranchList.includes('46'))) {
              if (this.selectedBranchList.includes('45') && (!(this.selectedBranchList.includes('44')))) {
                dcsRafs = dataTemp.filter((item: any) => ((item.branch_code === 'SWS') && (item.dl_branch_code === 'DCS')));
                dcsRafs = dcsRafs.filter((item1: any) => (item1.enquiry_flag === 'N'));
                dataTemp = dataTemp.filter((item: any) => (item.branch_code != 'SWS'));
              }

              if (this.selectedBranchList.includes('46') && (!(this.selectedBranchList.includes('47')))) {
                dnbRafs = dataTemp.filter((item: any) => ((item.branch_code === 'SNB') && (item.dl_branch_code === 'DNB')));
                dnbRafs = dnbRafs.filter((item1: any) => (item1.enquiry_flag === 'N'));
                dataTemp = dataTemp.filter((item: any) => (item.branch_code != 'SNB'));
              }

              finalData = dataTemp.concat(dcsRafs);
              finalData = finalData.concat(dnbRafs);
            } else {
              finalData = dataTemp;
            } */

            this.data = finalData;
            /* if (this.selec) {
            } */
            this.isReport = true;
            this.isRecords = 0;
          } else {
            this.isRecords = 1;
            this.isReport = false;
            this.alert = 'No Records Found';
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }
  clear() {
    this.fromDate = '';
    this.toDate = '';
    this.isReport = false;
    this.branchId = '';
    this.ticketSearch = '';
  }

}

