import { CEODashboardService } from './ceo-dashboard.service';
import { Component, ElementRef, ViewChild, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { GoogleAnalyticsService } from '../../../google-analytics.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
    selector: 'app-ceo-dashboard',
    templateUrl: './ceo-dashboard.component.html',
    styleUrls: ['./ceo-dashboard.component.scss', '../../../../scss/customstyle.css'],
    standalone: false
})


export class CEODashboardComponent {
  @ViewChildren('graph')
  divs!: QueryList<ElementRef>;
  // graph!: ElementRef;
  branches: any;
  branchNames: any = [];
  reportType: any = '';
  year: any = '';
  quarter: any = '';
  loading = false;
  isAll = false;
  count = 6;
  reportTypeTemp: any;
  yearTemp: any;
  showLoadButton = true;
  contentDataURL: any;
  imageHeight: any;
  imageWidth: any;
  pdfLoading = false;
  generatedPDF: any;
  siteTypeId = localStorage.getItem('siteType');
  options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      datalabels: {
        enabled: true,
        formatter: (value: any) => {
          if (value < 1) return '';
          else {
            if ((value - Math.floor(value)) !== 0) {
              return Math.round((value + Number.EPSILON) * 100) / 100;
            } else return value;
          }
        },
        display: true,
        color: 'black',
        font: {
          // weight: 'bold',
          size: 8
        }
      }
    },
  };

  lineOptions = {
    plugins: {
      datalabels: {
        display: function (context: any) {
          if (context.dataset.data._chartjs.listeners[0]._type === 'line') {
            return false;
          } else return true
        },
        color: 'black',
        formatter: (value: any) => {
          if (value < 1) return '';
          else return value;
        },
        font: {
          size: 8
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'end',
        usePointStyle: true,
        pointStyleWidth: '2',
        labels: {
          usePointStyle: true,
          generateLabels: (chart: any) => {
            let pointStyle: any = [];
            let labelDisplay: any;
            chart.data.datasets.forEach((dataset: any) => {
              if (dataset.type === 'line') {
                pointStyle.push('line');
                labelDisplay = false;
              } else {
                pointStyle.push('rect');
                labelDisplay = true;
              }
            });
            return chart.data.datasets.map(
              (dataset: any, index: any) => ({
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.borderColor,
                pointStyle: pointStyle[index],
              }))
          }
        },
      }
    },
  };

  accyOptions = {
    scales: {
      A: {
        // type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Target & Acheivement (in Lacs)'
        },
        stacked: false
      },
      B: {
        // type: 'linear',
        beginAtZero: true,
        position: 'right',
        ticks: {
          max: 1,
          min: 0
        },
        title: {
          display: true,
          text: 'Attach (in %)'
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      datalabels: {
        display: function (context: any) {
          if (context.dataset.data._chartjs.listeners[0]._type === 'line') {
            return true;
          } else return false
        },
        color: 'black',
        formatter: (value: any) => {
          if (value < 1) return '';
          else return value + '%';
        },
        font: {
          size: 12,
        },
        align: 'top',
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'end',
        usePointStyle: true,
        pointStyleWidth: '2',
        borderJoinStyle: '',
        labels: {
          usePointStyle: true,
          boxWidth: 9,
          display: true,
          generateLabels: (chart: any) => {
            let pointStyle: any = [];
            chart.data.datasets.forEach((dataset: any) => {
              if (dataset.type === 'line') {
                pointStyle.push('circle');
                // labelDisplay = true;
              } else {
                pointStyle.push('rect');
                // labelDisplay = false;
              }
            });
            return chart.data.datasets.map(
              (dataset: any, index: any) => ({
                text: dataset.label,
                fillStyle: (dataset.type === 'line' ? dataset.borderColor : dataset.backgroundColor),
                strokeStyle: (dataset.type === 'line' ? dataset.backgroundColor : dataset.borderColor),
                pointStyle: pointStyle[index],
              }))
          }
        }
      }
    },
  };

  acPlusOptions = {
    scales: {
      A: {
        // type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Pre Tax (in lacs)'
        },
        stacked: true
      },
      B: {
        // type: 'linear',
        beginAtZero: true,
        position: 'right',
        ticks: {
          max: 1,
          min: 0
        },
        title: {
          display: true,
          text: 'Sum of Quantity'
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      datalabels: {
        display: function (context: any) {
          if (context.dataset.data._chartjs.listeners[0]._type === 'line') {
            return true;
          } else return true
        },
        align: function (context: any) {
          if (context.dataset.data._chartjs.listeners[0]._type === 'line') {
            return 'top';
          } else {
            return 'center';
          }
        },
        color: 'black',
        formatter: (value: any) => {
          if (value === 0) return '';
          else {
           /*  if ((value - Math.floor(value)) !== 0) {
              return Math.round((value + Number.EPSILON) * 100) / 100;
            } else */ return value;
          }
        },
        font: {
          size: 8
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'end',
        usePointStyle: true,
        pointStyleWidth: '2',
        labels: {
          usePointStyle: true,
          generateLabels: (chart: any) => {
            let pointStyle: any = [];
            let labelDisplay: any;
            chart.data.datasets.forEach((dataset: any) => {
              if (dataset.type === 'line') {
                pointStyle.push('line');
                labelDisplay = false;
              } else {
                pointStyle.push('rect');
                labelDisplay = true;
              }
            });
            return chart.data.datasets.map(
              (dataset: any, index: any) => ({
                text: dataset.label,
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.borderColor,
                pointStyle: pointStyle[index],
              }))
          }
        },
      }
    },
  };

  totalRAFOptions: any;
  csatOptions: any;

  revenueReportTitle: any;
  revenueAchievements: any = [];
  revenueLabels: any = [];
  revenueDueValues: any = [];
  revenueTargetValues: any = [];
  revenueBranchName: any;
  revenueChartData: any = '';
  showRevenueChart = false;
  noRevenueData = false;
  revenueLoading = false; //Overall Revenue

  accyReportTitle: any;
  accyAchievements: any = [];
  accyLabels: any = [];
  accyDueValues: any = [];
  accyTargetValues: any = [];
  accyBranchName: any;
  accyChartData: any = '';
  showAccyChart = false;
  noAccyData = false;
  accyLoading = false;
  accyAttach: any = [];  //Accy & Target

  rafReportTitle: any;
  rafBranchName: any;
  rafChartData: any = '';
  showRafChart = false;
  rafLoading = false;
  noRafData = false;
  rafLabels: any = [];
  rafBranchesTemp: any = [];
  totalRafList: any = [];
  inWarrantyList: any = [];
  outOfWarrantyList: any = [];
  rafBranches: any;
  totalRaf = 0;
  totalRafTemp: any;
  totalOOW: any;
  totalIW = 0;
  footFallCount: any;
  serviceCount: any;
  rafFootFall: any = [];
  rafPercent: any = [];//Total RAF

  cSatReportTitle: any;
  cSatAchievements: any = [];
  cSatLabels: any = [];
  cSatGoogleRating: any = [];
  cSatTargetValues: any = [];
  cSatChartData: any = '';
  showcSatChart = false;
  nocSatData = false;
  cSatLoading = false;
  cSatBranchName: any; //CSAT

  custEngmntReportTitle: any;
  custEngmntPermittedWT: any = [];
  custEngmntAvgWT: any = [];
  custEngmntAvgHT: any = [];
  custEngmntBranchName: any = [];
  custEngmntLabels: any = [];
  showCustEngmntChart = false;
  custEngmntChartData: any = '';
  noCustEngmntData = false; //Customer Engagement

  acPlusTitle: any;
  acPlusLabels: any = [];
  acPlusQuantity: any = [];
  acPlusPreTax: any = [];
  showAcPlusChart = false;
  acPlusChartData: any = '';
  noAcPlusData = false; //AC+

  datePipe = new DatePipe('en-US'); array: any;
  imageData: any;
  ;

  constructor(public dataService: CEODashboardService, private googleAnalyticsService: GoogleAnalyticsService) {
    Chart.register(ChartDataLabels);
    this.getBranches();
  }

  ngOnInit(): void {
    // Load Google Analytics and track the pageview
    this.googleAnalyticsService.loadGoogleAnalytics();
    this.googleAnalyticsService.trackPageView();
  }

  getBranches() {
    let result;
    this.dataService.getBranches()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.branches = result.branch;
            this.branches = this.branches.filter((branchCode: any) => {
              // && branchCode.branch_code !== 'DTC'
              return (branchCode.branch_code !== 'SCS' && branchCode.branch_code !== 'SAM' && branchCode.branch_code !== 'IUB' && branchCode.branch_code !== 'DNB' && branchCode.branch_code !== 'FIC')
            });
            for (let i = 0; i < this.branches.length; i++) {
              this.branchNames.push({
                branchName: this.branches[i].label.replace('iCare ', ''),
                branchCode: this.branches[i].branch_code
              });
            }
            this.branchNames = this.branchNames.sort(function (a: any, b: any) { return (a.branchName > b.branchName ? 1 : -1) });
            this.assignValues();
          }
        }, // success path
        error: error => error // error path
      });
  }

  assignValues() {
    this.reportType = 'All';
    var today = new Date();
    var month = today.getMonth();
    var quarter;
    if (month < 3)
      quarter = 4;
    else if (month < 6)
      quarter = 1;
    else if (month < 9)
      quarter = 2;
    else if (month < 12)
      quarter = 3;
    this.year = today.getFullYear();
    this.quarter = quarter;
    if (this.quarter === 4) {
      this.year = +this.year - +1;
    }
    this.load();
  }

  filterChange() {
    this.showLoadButton = true;
  }

  load() {
    this.showLoadButton = false;
    this.isAll = false;
    this.count = 6;
    this.reportTypeTemp = this.reportType;

    this.revenueAchievements = [];
    this.revenueDueValues = [];
    this.revenueTargetValues = [];
    this.revenueLabels = [];
    this.showRevenueChart = false;
    this.revenueChartData = '';
    this.noRevenueData = false;

    this.accyAchievements = [];
    this.accyLabels = [];
    this.accyDueValues = [];
    this.accyTargetValues = [];
    this.showAccyChart = false;
    this.accyChartData = '';
    this.noAccyData = false;
    this.accyAttach = [];

    this.rafLabels = [];
    this.rafBranchesTemp = [];
    this.totalRafList = [];
    this.inWarrantyList = [];
    this.outOfWarrantyList = [];
    this.showRafChart = false;
    this.rafChartData = '';
    this.noRafData = false;
    this.footFallCount = '';
    this.serviceCount = '';
    this.rafFootFall = [];
    this.rafPercent = [];

    this.cSatAchievements = [];
    this.cSatLabels = [];
    this.cSatGoogleRating = [];
    this.cSatTargetValues = [];
    this.cSatChartData = '';
    this.showcSatChart = false;
    this.nocSatData = false;

    this.custEngmntPermittedWT = [];
    this.custEngmntAvgWT = [];
    this.custEngmntAvgHT = [];
    this.custEngmntBranchName = [];
    this.custEngmntLabels = [];
    this.showCustEngmntChart = false;
    this.noCustEngmntData = false;

    this.acPlusLabels = [];
    this.acPlusQuantity = [];
    this.acPlusPreTax = [];
    this.showAcPlusChart = false;
    this.acPlusChartData = '';
    this.noAcPlusData = false;

    if (this.year === '') {
      alert('Please select the Year');
      return;
    } else if (this.quarter === '') {
      alert('Please select Quarter');
      return;
    } else if (this.reportType === '') {
      alert('Please select the Report type');
      return;
    } else {
      this.loading = true;
      if (this.reportType === 'Overall Revenue') {
        this.getOverAllRevenue();
      }
      else if (this.reportType === 'Accy Target') {
        this.getAccyTarget();
      }
      else if (this.reportType === 'RAF') {
        this.getTotalRaf();
      }
      else if (this.reportType === 'CSAT') {
        this.getCSAT();
      }
      else if (this.reportType === 'Customer Engagement') {
        this.getCustometEngmnt();
      }
      else if (this.reportType === 'AC+ Revenue') {
        this.getAcPlus();
      }
      else if (this.reportType === 'All') {
        this.isAll = true;
        this.count = 0;
        this.getOverAllRevenue('Overall Revenue');
        this.getAccyTarget('Accy Target');
        this.getTotalRaf('RAF');
        this.getCSAT('CSAT');
        this.getCustometEngmnt('Customer Engagement');
        this.getAcPlus('AC+ Revenue');
      }
    }
  }

  /* ************************************** Overall Revenue *************************************** */

  getOverAllRevenue(type?: any) {
    let result: any;
    this.loading = true;
    (type ? this.reportTypeTemp = type : this.reportTypeTemp = this.reportTypeTemp);
    this.dataService.getRevenue(this.year, this.quarter, this.reportTypeTemp)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && result.target.status === true && result.data !== null) {
            this.revenueReportTitle = 'Overall Revenue' + ' ' + (this.quarter === 1 ? 'AMJ' : this.quarter === 2 ? 'JAS' : this.quarter === 3 ? 'OND' : 'JFM') + '-' + ' ' + 'FY' + ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
            let revenueAchInLacs: any;
            // let revenuetarInLacs: any;
            if (result.data.achieved.length > 0 && result.target.items.length > 0) {
              let branchNames = this.branchNames.filter((branchCode: any) => {
                return branchCode.branchCode !== 'DCS' && branchCode.branchCode !== 'DTC'
              });
              for (let i = 0; i < branchNames.length; i++) {
                let revenueTemp = result.data.achieved.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                if (revenueTemp[0] !== undefined) {
                  revenueAchInLacs = Math.round(revenueTemp[0].revenue) / 100000;
                  this.revenueAchievements.push(revenueAchInLacs);
                } else {
                  this.revenueAchievements.push('0');
                }
                let targetTemp: any = result.target.items.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                if (targetTemp[0] !== undefined) {
                  // revenuetarInLacs = Math.round(result.target.items[i].value) / 100000;
                  this.revenueTargetValues.push(targetTemp[0].value);
                } else {
                  this.revenueTargetValues.push('0');
                }
                this.revenueLabels.push(branchNames[i].branchName);
                /* this.revenueBranchName = this.branches.filter((branchCode: any) => {
                  return branchCode.branch_code === result.data.achieved[i].branch_code
                });

                if (this.revenueBranchName.length !== 0) {
                  this.revenueLabels.push(this.revenueBranchName[0].label.replace('iCare ', ''));
                } else {
                  this.revenueLabels.push('');
                } */
              }
              for (let i = 0; i < this.revenueAchievements.length; i++) {
                this.revenueDueValues.push((this.revenueTargetValues[i] - this.revenueAchievements[i]) > 0 ? (this.revenueTargetValues[i] - this.revenueAchievements[i]) : 0);
              }
              this.showRevenueChart = true;
              this.revenueChartData = {
                labels: this.revenueLabels,
                datasets: [
                  {
                    label: 'Due',
                    backgroundColor: '#4888d2',
                    data: this.revenueDueValues,
                    grouped: false,
                    order: 2,
                    stack: 'bar',
                  },
                  {
                    label: 'Achievement',
                    backgroundColor: '#0eb80e',
                    data: this.revenueAchievements,
                    grouped: false,
                    order: 1,
                    stack: 'bar',
                  },
                ]
              };
              this.loading = false;
            } else {
              this.showRevenueChart = true;
              this.loading = false;
              this.noRevenueData = true;
            }
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
          } else {
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
            this.showRevenueChart = true;
            this.loading = false;
            this.noRevenueData = true;
          }
        }, // success path
        error: (error: any) => error // error path
      });
  }

  /* ************************************** Accy Target & Attach *************************************** */

  getAccyTarget(type?: any) {
    let result: any;
    this.loading = true;
    (type ? this.reportTypeTemp = type : this.reportTypeTemp = this.reportTypeTemp);
    this.showAccyChart = true;
    this.dataService.getAccyRevenue(this.year, this.quarter, this.reportTypeTemp)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && result.target.status === true && result.data !== null) {
            this.accyReportTitle = 'Accy Target & Attach' + ' ' + (this.quarter === 1 ? 'AMJ' : this.quarter === 2 ? 'JAS' : this.quarter === 3 ? 'OND' : 'JFM') + '-' + ' ' + 'FY' + ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
            let accyAchInLacs: any;
            let accyTarInLacs: any;
            if (result.data.achieved.length > 0) {
              let branchNames = this.branchNames.filter((branchCode: any) => {
                return branchCode.branchCode !== 'DCS' && branchCode.branchCode !== 'DTC'
              });
              for (let i = 0; i < branchNames.length; i++) {
                let achieveTemp = result.data.achieved.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                if (achieveTemp[0] !== undefined) {
                  accyAchInLacs = Math.round(achieveTemp[0].revenue) / 100000;
                  this.accyAchievements.push(accyAchInLacs);
                } else {
                  this.accyAchievements.push('0');
                }
                let targetTemp = result.target.items.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                if (targetTemp[0] !== undefined) {
                  // accyTarInLacs = Math.round(result.target.items[i].value) / 100000;
                  this.accyTargetValues.push(targetTemp[0].value);
                } else {
                  this.accyTargetValues.push('0');
                }

                let invoiceCount = result.data.invoice.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                let deliveryTokenCount = result.delivery_token_count.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });

                if (invoiceCount.length > 0 && deliveryTokenCount.length > 0) {
                  this.accyAttach.push(Math.round((((invoiceCount[0].count) / (deliveryTokenCount[0].count)) * 100)));
                } else {
                  this.accyAttach.push('0');
                }
                this.accyLabels.push(branchNames[i].branchName);

                /* this.accyBranchName = this.branches.filter((branchCode: any) => {
                  return branchCode.branch_code === result.data.achieved[i].branch_code
                });
                if (this.accyBranchName.length !== 0) {


                  if(invoiceCount.length > 0 && serviceTokenCount.length > 0) {
                    this.accyAttach.push(Math.round((((invoiceCount[0].count)/(serviceTokenCount[0].count))*100)));
                  } else {
                    this.accyAttach.push('0');
                  }
                  this.accyLabels.push(this.accyBranchName[0].label.replace('iCare ', ''));
                } else {
                  this.accyLabels.push('');
                  this.accyAttach.push('');
                } */
              }
              for (let i = 0; i < this.accyAchievements.length; i++) {
                this.accyDueValues.push((this.accyTargetValues[i] - this.accyAchievements[i]) > 0 ? (this.accyTargetValues[i] - this.accyAchievements[i]) : 0);
              }
              this.showAccyChart = true;

              this.accyChartData = {
                labels: this.accyLabels,
                datasets: [
                  {
                    label: 'Target',
                    backgroundColor: '#4888d2',
                    data: this.accyTargetValues,
                    // grouped: true,
                    order: 3,
                    yAxisID: 'A',
                    stack: 'bar',
                  },
                  {
                    label: 'Achievement',
                    backgroundColor: '#0eb80e',
                    data: this.accyAchievements,
                    // grouped: true,
                    order: 2,
                    yAxisID: 'A',
                    stack: 'bar',

                  },
                  {
                    data: this.accyAttach,
                    label: 'Attach%',
                    type: 'line',
                    borderColor: '#992A6C',
                    borderCapStyle: 'butt',
                    backgroundColor: 'white',
                    borderWidth: '3',
                    yAxisID: 'B',
                    showLine: false,
                    elements: { point: { radius: 3 } },
                    order: 1,
                  }
                ]
              };
              this.loading = false;
            } else {
              this.loading = false;
              this.noAccyData = true;
              this.showAccyChart = true;
            }
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
          } else {
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
            this.loading = false;
            this.noAccyData = true;
            this.showAccyChart = true;
          }
        }, // success path
        error: (error: any) => error // error path
      });
  }

  /* ************************************** Total RAF *************************************** */

  getTotalRaf(type?: any) {
   
    let isRAFLine = false;
    this.totalRAFOptions = {
      scales: {
        A: {
          // type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'RAF Count'
          },
          stacked: true
        },
        B: {
          // type: 'linear',
          beginAtZero: true,
          position: 'right',
          ticks: {
            max: 1,
            min: 0
          },
          title: {
            display: true,
            text: 'RAF%'
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
  datalabels: {
    display: (context: any) => {
      return context.dataset.type === 'line' || context.dataset.type === 'bar';
    },
    color: (context: any) => {
      return context.dataset.type === 'line' ? '#330420' : 'black';
    },
    formatter: (value: any, context: any) => {
      if (value < 1) return '';
      return context.dataset.type === 'line' ? value + '%' : value;
    },
    font: {
      size: 12
    },
    clamp: true,
    align: (context: any) => {
      return context.dataset.type === 'line' ? 'top' : 'center';
    }
  },
  legend: {
    display: true,
    position: 'bottom',
    align: 'end',
    labels: {
      usePointStyle: true,
      boxWidth: 9,
      generateLabels: (chart: any) => {
        return chart.data.datasets.map((dataset: any, index: any) => ({
          text: dataset.label,
          fillStyle: dataset.type === 'line' ? dataset.borderColor : dataset.backgroundColor,
          strokeStyle: dataset.type === 'line' ? dataset.backgroundColor : dataset.borderColor,
          pointStyle: dataset.type === 'line' ? 'circle' : 'rect'
        }));
      }
    }
  }
}

    };  // Graph Options

    let result: any;
    /* let branchNames = this.branchNames.filter((branchCode: any) => {
      return branchCode.branchCode !== 'DCS' && branchCode.branchCode !== 'DTC'
    }); */
    let branchNames = this.branchNames;
    this.loading = true;
    (type ? this.reportTypeTemp = type : this.reportTypeTemp = this.reportTypeTemp);
    this.dataService.getRafCount(this.year, this.quarter, this.siteTypeId, this.reportTypeTemp)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            if (result.data.raf.length > 0) {
              this.rafReportTitle = 'Total RAF' + ' ' + (this.quarter === 1 ? 'AMJ' : this.quarter === 2 ? 'JAS' : this.quarter === 3 ? 'OND' : 'JFM') + '-' + ' ' + 'FY' + ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
              for (let i = 0; i < branchNames.length; i++) {
                this.totalRafTemp = result.data.raf.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                this.footFallCount = result.data.footfall.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                this.serviceCount = result.data.service_footfall.filter((branchCode: any) => {
                  return branchCode.branch_code === branchNames[i].branchCode
                });
                this.totalRaf = 0;
                for (let i = 0; i < this.totalRafTemp.length; i++) {
                  this.totalRaf = (+this.totalRaf) + (+this.totalRafTemp[i].raf_count);
                }
                if (this.footFallCount[0] !== undefined)
                  this.rafFootFall.push(this.footFallCount[0].footfall);
                else
                  this.rafFootFall.push('0');
                if (this.serviceCount[0] === undefined)
                  this.serviceCount[0] = '0';
                this.rafPercent.push(Math.round((this.totalRaf / this.serviceCount[0].footfall) * 100));
                this.totalOOW = this.totalRafTemp.find((x: { warranty_status: string; }) => x.warranty_status === 'Out Of Warranty (No Coverage)');
                if (this.totalOOW !== undefined) {
                  this.totalOOW = this.totalOOW.raf_count;
                } else {
                  this.totalOOW = '0';
                }
                this.totalIW = this.totalRaf - this.totalOOW;
                this.totalRafList.push(this.totalRaf);
                this.inWarrantyList.push(this.totalIW);
                this.outOfWarrantyList.push(this.totalOOW);
                this.rafLabels.push(branchNames[i].branchName);
              }
              this.loading = false;
              this.showRafChart = true;
              this.rafChartData = {
                labels: this.rafLabels,
                datasets: [
                  {
                    label: 'INW',
                    backgroundColor: '#4888d2',
                    data: this.inWarrantyList,
                    grouped: false,
                    order: 2,
                    stack: 'bar',
                  },
                  {
                    label: 'OOW',
                    backgroundColor: '#0eb80e',
                    data: this.outOfWarrantyList,
                    grouped: false,
                    order: 3,
                    stack: 'bar',
                  },
                  {
                    data: this.rafPercent,
                    label: 'RAF%',
                    type: 'line',
                    borderColor: '#992A6C',
                    borderCapStyle: 'butt',
                    backgroundColor: 'white',
                    borderWidth: '3',
                    yAxisID: 'B',
                    showLine: false,
                    elements: { point: { radius: 3 } },
                    order: 1,
                  }
                ]
              };
            } else {
              this.showRafChart = true;
              this.noRafData = true;
              this.loading = false;
            }
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
          } else {
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
            this.showRafChart = true;
            this.noRafData = true;
            this.loading = false;
          }
        }, // success path
        error: (error: any) => error // error path
      });
  }

  /* ************************************** CSAT *************************************** */

  getCSAT(type?: any) {
    this.csatOptions = {
      scales: {
        A: {
          // type: 'linear',
          beginAtZero: false,
          position: 'left',
          title: {
            display: true,
            text: 'Achivements'
          },
          stacked: false,
          ticks: {
            Min: 50,
            maxTicksLimit: 6
          }
        },
        B: {
          // type: 'linear',
          beginAtZero: false,
          position: 'right',
          ticks: {
            max: 5,
            min: 0,
            maxTicksLimit: 6
          },
          title: {
            display: true,
            text: 'Google Rating'
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        datalabels: {
          display: function (context: any) {
            if (context.dataset.data._chartjs.listeners[0]._type === 'line') {
              return false;
            } else return true
          },
          color: 'black',
          formatter: (value: any) => {
            if (value < 1) return '';
            else return value;
          },
          font: {
            size: 8
          },
          clamp: true,
          align: function (context: any) {
            if (context.dataset.data._chartjs.listeners[0]._type === 'line') {
              return 'top';
            } else {
              return 'top';
            }
          },
        },
        legend: {
          display: true,
          position: 'bottom',
          align: 'end',
          usePointStyle: true,
          pointStyleWidth: '2',
          labels: {
            usePointStyle: true,
            generateLabels: (chart: any) => {
              let pointStyle: any = [];
              let labelDisplay: any;
              chart.data.datasets.forEach((dataset: any) => {
                if (dataset.type === 'line') {
                  pointStyle.push('line');
                  labelDisplay = false;
                } else {
                  pointStyle.push('rect');
                  labelDisplay = true;
                }
              });
              return chart.data.datasets.map(
                (dataset: any, index: any) => ({
                  text: dataset.label,
                  fillStyle: dataset.backgroundColor,
                  strokeStyle: dataset.borderColor,
                  pointStyle: pointStyle[index],
                }))
            }
          },
        }
      },
    };

    let result: any;
    this.loading = true;
    (type ? this.reportTypeTemp = type : this.reportTypeTemp = this.reportTypeTemp);
    this.dataService.getCSAT(this.year, this.quarter, this.reportTypeTemp)
      .subscribe({
        next: (data: any) => {
          result = data;
          let CASTbranchTemp = this.branchNames.filter((branchCode: any) => {
            return branchCode.branchCode !== 'DCS' && branchCode.branchCode !== 'SCS' && branchCode.branchCode !== 'SMT' && branchCode.branchCode !== 'DTC'
          });
          if (result.status === true && result.items.length !== 0 && result.target.length !== 0) {
            this.cSatReportTitle = 'CSAT' + ' ' + (this.quarter === 1 ? 'AMJ' : this.quarter === 2 ? 'JAS' : this.quarter === 3 ? 'OND' : 'JFM') + '-' + ' ' + 'FY' + ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
            if (result.items.length > 0) {
              for (let i = 0; i < CASTbranchTemp.length; i++) {
                this.cSatLabels.push(CASTbranchTemp[i].branchName);
                let targetTemp = result.target.filter((branchCode: any) => {
                  return branchCode.branch_code === CASTbranchTemp[i].branchCode
                });
                if (targetTemp[0] !== undefined) {
                  this.cSatTargetValues.push(Math.round(targetTemp[0].value));
                } else {
                  this.cSatTargetValues.push('0');
                }

                let achieveTemp = result.items.filter((branchCode: any) => {
                  return branchCode.branch_code === CASTbranchTemp[i].branchCode
                });
                if (achieveTemp[0] !== undefined) {
                  this.cSatAchievements.push(Math.round(achieveTemp[0].csat));
                } else {
                  this.cSatAchievements.push('0');
                }

                let gRatingTemp = result.items.filter((branchCode: any) => {
                  return branchCode.branch_code === CASTbranchTemp[i].branchCode
                });
                if (gRatingTemp[0] !== undefined) {
                  this.cSatGoogleRating.push(gRatingTemp[0].google_rating);
                } else {
                  this.cSatGoogleRating.push('0');
                }
              }
              this.showcSatChart = true;

              this.cSatChartData = {
                labels: this.cSatLabels,
                datasets: [
                  {
                    label: 'Achivement',
                    backgroundColor: '#3e883e',
                    data: this.cSatAchievements,
                    grouped: true,
                    order: 2,
                    yAxisID: 'A'
                  },
                  {
                    label: 'Google Rating',
                    backgroundColor: '#d18905',
                    data: this.cSatGoogleRating,
                    grouped: true,
                    order: 3,
                    yAxisID: 'B',
                  },
                  {
                    data: this.cSatTargetValues,
                    label: 'Target',
                    type: 'line',
                    borderColor: '#00c3ff',
                    borderCapStyle: 'butt',
                    backgroundColor: 'white',
                    borderWidth: '3',
                    elements: { point: { radius: 0 } },
                    order: 1,
                  }
                ]
              };
              this.loading = false;
            } else {
              this.loading = false;
              this.nocSatData = true;
              this.showcSatChart = true;
            }
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
          } else {
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
            this.loading = false;
            this.nocSatData = true;
            this.showcSatChart = true;
          }
        }, // success path
        error: (error: any) => error // error path
      });
  }

  /* ************************************** Customer Engagement *************************************** */

  getCustometEngmnt(type?: any) {
    let result: any;
    this.loading = true;
    (type ? this.reportTypeTemp = type : this.reportTypeTemp = this.reportTypeTemp);
    this.dataService.getCustometEngmnt(this.year, this.quarter, this.reportTypeTemp)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true && result.target.status === true) {
            this.custEngmntReportTitle = 'Customer Engagement' + ' ' + (this.quarter === 1 ? 'AMJ' : this.quarter === 2 ? 'JAS' : this.quarter === 3 ? 'OND' : 'JFM') + '-' + ' ' + 'FY' + ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
            if (result.data.length > 0) {
              // let filteredData = result.data.filter((branch: any) => { return branch.branch_code !== 'IUB' && branch.branch_code !== 'SNB' && branch.branch_code !== 'STC' && branch.branch_code !== 'DNB' && branch.branch_code !== 'SAM' && branch.branch_code !== 'SCS'});
              for (let i = 0; i < this.branchNames.length; i++) {
                let targetTemp = result.target.items.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branchNames[i].branchCode
                });
                if (targetTemp[0] !== undefined) {
                  this.custEngmntPermittedWT.push(Math.round(targetTemp.value));
                } else {
                  this.custEngmntPermittedWT.push('0');
                }
                let waitTimeTemp = result.data.filter((branchCode: any) => {
                  return branchCode.branch_code === this.branchNames[i].branchCode
                });
                if (waitTimeTemp[0] !== undefined) {
                  this.custEngmntAvgWT.push(Math.round(waitTimeTemp[0] !== undefined ? waitTimeTemp[0].WaitTime : 0));
                  this.custEngmntAvgHT.push(Math.round(waitTimeTemp[0] !== undefined ? waitTimeTemp[0].HandlingTime : 0));
                } else {
                  this.custEngmntAvgWT.push('0');
                  this.custEngmntAvgHT.push('0');
                }
                this.custEngmntLabels.push(this.branchNames[i].branchName);
                /* this.custEngmntAvgWT.push(Math.round(result.data[i].WaitTime));
                this.custEngmntAvgHT.push(Math.round(result.data[i].HandlingTime));
                this.custEngmntBranchName = this.branches.filter((branchCode: any) => {
                  return branchCode.branch_code === result.data[i].branch_code
                });
                if (this.custEngmntBranchName.length !== 0) {
                  this.custEngmntLabels.push(this.custEngmntBranchName[0].label.replace('iCare ', ''));
                } else {
                  this.custEngmntLabels.push('');
                } */
              }
              this.showCustEngmntChart = true;

              this.custEngmntChartData = {
                labels: this.custEngmntLabels,
                datasets: [
                  {
                    label: 'Average Wait Time',
                    backgroundColor: '#d18905',
                    data: this.custEngmntAvgWT,
                    grouped: true,
                    order: 3,
                    type: 'bar'
                  },
                  {
                    label: 'Average Handling Time',
                    backgroundColor: '#3e883e',
                    data: this.custEngmntAvgHT,
                    grouped: true,
                    order: 2,
                    type: 'bar'
                  },
                  {
                    data: this.custEngmntPermittedWT,
                    label: 'Permitted Wait Time',
                    type: 'line',
                    borderColor: '#00c3ff',
                    borderCapStyle: 'butt',
                    backgroundColor: '#00c3fe',
                    borderWidth: '3',
                    elements: { point: { radius: 0 } },
                    order: 1,
                  }
                ]
              };
              this.loading = false;
            } else {
              this.loading = false;
              this.noCustEngmntData = true;
              this.showCustEngmntChart = true;
            }
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
          } else {
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
            this.loading = false;
            this.noCustEngmntData = true;
            this.showCustEngmntChart = true;
          }
        }, // success path
        error: (error: any) => error // error path
      });
  }

  /* ************************************** AC+ *************************************** */

  getAcPlus(type?: any) {
    let result: any;
    this.loading = true;
    (type ? this.reportTypeTemp = type : this.reportTypeTemp = this.reportTypeTemp);
    this.dataService.getAcPlusData(this.year, this.quarter, this.reportTypeTemp)
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.acPlusTitle = 'AC+ / Protect+ Revenue' + ' ' + (this.quarter === 1 ? 'AMJ' : this.quarter === 2 ? 'JAS' : this.quarter === 3 ? 'OND' : 'JFM') + '-' + ' ' + 'FY' + ' ' + this.year + '-' + (+String(this.year).slice(2, 4) + +1);
            if (result.items.length > 0) {
              // result.data = result.data.filter((branch: any) => { return branch.branch_code !== 'IUB' });
              let acBranchTemp = [...this.branchNames];
              acBranchTemp.push({
                branchName: 'Support Centre',
                branchCode: 'CCB'
              });
              for (let i = 0; i < acBranchTemp.length; i++) {
                let sumOfQuantity = result.items.filter((branchCode: any) => {
                  return branchCode.branch_code === acBranchTemp[i].branchCode
                });
                let sumOfPreTax = result.items.filter((branchCode: any) => {
                  return branchCode.branch_code === acBranchTemp[i].branchCode
                });
                this.acPlusLabels.push(acBranchTemp[i].branchName);
                if (sumOfQuantity[0] !== undefined)
                  this.acPlusQuantity.push(sumOfQuantity[0].quandity);
                else this.acPlusQuantity.push(0);
                if (sumOfPreTax[0] !== undefined)
                  this.acPlusPreTax.push(sumOfPreTax[0].pretax_amount);
                else this.acPlusPreTax.push(0);
              }
              this.showAcPlusChart = true;
              this.acPlusChartData = {
                labels: this.acPlusLabels,
                datasets: [
                  {
                    label: 'Pre Tax',
                    backgroundColor: '#4888d2',
                    data: this.acPlusPreTax,
                    grouped: true,
                    order: 3,
                    type: 'bar'
                  },
                  {
                    data: this.acPlusQuantity,
                    label: 'Sum Of Quantity',
                    type: 'line',
                    borderColor: '#992A6C',
                    borderCapStyle: 'butt',
                    backgroundColor: 'white',
                    borderWidth: '3',
                    order: 1,
                    yAxisID: 'B',
                    showLine: false,
                    elements: { point: { radius: 3 } },
                  }
                ]
              };
              this.loading = false;
            } else {
              this.loading = false;
              this.noAcPlusData = true;
              this.showAcPlusChart = true;
            }
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
          } else {
            (this.isAll ? this.count = this.count + 1 : this.count = this.count);
            this.loading = false;
            this.noAcPlusData = true;
            this.showAcPlusChart = true;
          }
          setTimeout(() => {
            html2canvas(document.body).then((canvas) => {
              const imageData = canvas.toDataURL('image/png');
              this.imageData = imageData;
              // this.sendGraph(this.imageData);
            });
          }, 6000);
        }, // success path
        error: (error: any) => error // error path
      });
  }

  /* sendGraph(data: any) {
    this.dataService.sendImageData(data).subscribe({
      next: (data: any) => {
      },
      error: (error: any) => {
        console.error('Error sending Graph data:', error);
        this.loading = false;
      }
    });
  } */

  sendGraph(data: any) {
    if (this.count === 6) {
      this.dataService.sendImageData(data).subscribe({
        next: (data: any) => {
        },
        error: (error: any) => {
          console.error('Error sending Graph data:', error);
          this.loading = false;
        }
      });
    }
  }

  createPDF(data: any, i: any, pdf: any) {
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    html2canvas(data).then((canvas: any) => {
      const imgWidth = 209;
      const imgHeight = (canvas.height * (+imgWidth + +20)) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', 0, 15, imgWidth, imgHeight);

      if (i != 2) {
        pdf.addPage();
      } else {
        this.pdfLoading = false;
        pdf.save(currentDate + '.pdf'); // Save the PDF

        // Convert the PDF into a Blob
        const blob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
        // Read the Blob as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => { // called once readAsDataURL is completed
          this.generatedPDF = reader.result;

          // Generate mail and upload PDF
          this.generateMail(pdf, currentDate);
          this.uploadPDF(this.generatedPDF, currentDate);
        };
      }
    });
  }


  uploadPDF1(pdf: any, date: any) {

    this.dataService.uploadPDF(pdf,date)
      .subscribe({
        next: (data: any) => {
        }, // success path
        error: (error: any) => error // error path
      });
  }

  getDivs(index: any) {
    this.divs.forEach((div: ElementRef) => this.array = (div.nativeElement.childNodes[index]));
    return this.array;
  }

  savePdf() {
    this.pdfLoading = true;
    let pdf = new jsPDF({ compress: true });
    let data1 = this.getDivs(0);
    let data2 = this.getDivs(1);
    let data3 = this.getDivs(2);
    this.createPDF(data1, 0, pdf);
    setTimeout(() => {
      this.createPDF(data2, 1, pdf);
    }, 1000);
    setTimeout(() => {
      this.createPDF(data3, 2, pdf);
    }, 1500);
  }

  singlePDF() {
    this.pdfLoading = true;
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    const data: any = document.getElementById('divId');
    html2canvas(data).then((canvas: any) => {
      const imgWidth = 209;
      const pageHeight = 270;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 12;
      heightLeft -= pageHeight;
      const doc = new jsPDF('p', 'mm');
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      this.pdfLoading = false;
      doc.save(this.reportType + '_' + currentDate + '.pdf');
    });
  }

  generateMail(file: any, date: any) {
    {
      let mail = document.createElement("a");
      // rajesh.narang@ample.co.in; cc- padmanabha.gowda@ample.co.in; bijas.muraleedharan@ample.co.in; vijay.k@ample.co.in;
      mail.href = "mailto:rajesh.narang@ample.co.in?cc=padmanabha.gowda@ample.co.in, bijas.muraleedharan@ample.co.in, vijay.k@ample.co.in&subject=iCare Dashboard" + ' ' + date + "&body=Hi ALL,%0D%0DPlease find the attached iCare Dashboard Report for your review.";
      mail.click();
    }
  }

 async base64ToBlob(base64Data: any, contentType: string) {
    const byteString = await fetch(`data:${contentType};base64,${base64Data}`).then(response => response.text());
    const decodedData = new Uint8Array([...byteString].map(c => c.charCodeAt(0)));
    return new Blob([decodedData], { type: contentType });
  }

  async uploadPDF(pdfData: any, filename: string | null) {
    // Convert the base64 PDF data to a Blob
    // const pdfBlob = await this.base64ToBlob(pdfData, 'application/pdf');

    const docs: any = [];
      docs.push({
        document_type: 'dashboard',
        file_name: filename+'.pdf',
        extension: 'pdf',
        date: new Date().toDateString(),
        file: this.generatedPDF,
        description: 'CEO Dahsboard'
      });

    this.dataService.uploadPDF(docs, filename)
      .subscribe({
        next: (data: any) => {
          // Handle success
        },
        error: (error: any) => {
          // Handle error
        }
      });
  }

}
