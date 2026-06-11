import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, ModalService } from '@coreui/angular-pro';
import * as _ from 'lodash';
import { UserService } from '../../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmAlert } from '../default-layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavModule } from '@coreui/angular';
import  {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DropdownModule,
  AvatarModule,
  BadgeModule,
  HeaderModule,
  BreadcrumbModule
} from '@coreui/angular'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IconModule } from '@coreui/icons-angular';
import { DefaultAsideComponent } from '../default-aside/default-aside.component';
import { ButtonModule } from '@coreui/angular';
import { SidebarModule } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['../../../../scss/customstyle.css', './default-header.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NavModule,
    NgSelectModule,
    RouterModule,
    ReactiveFormsModule,
    DropdownModule,
    AvatarModule,
    BadgeModule,
    HeaderModule,
    BreadcrumbModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbModalModule,
    IconModule,
    BadgeModule,
    DropdownModule,ButtonModule,SidebarModule
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DefaultHeaderComponent {

  @Input() sidebarId: string = "sidebar1";

  confirmAlert: ConfirmAlert = { id: '', title: '', msg: '' };
  toType = '';
  userGroupTemp: any = [];
  isUsers = false;
  ticketId = '';
  groupId = '';
  messageType = '';
  toMultipleUser: any = [];
  toMultipleTemp: any = [];
  messageText = '';
  public tasks: any = [];
  public navItems = '';
  public menuItems: any = [];
  public filteredMenus: any = '';
  display = 'none';
  displaysms = 'none';
  displayOpen = 'none';
  allSMS: any = [];
  error: any;
  isError = '';
  unreadMessages: any = [];
  openUnreadMessage: any = [];
  public userName: any = '';
  statuseList: any = [];
  userGroup: any;
  locations: any = [];
  statuses: any = [];
  products: any = [];
  technician = '';
  messageReadFlag = true;
  messageBoardText = '';
  messageList: any = [];
  messageDate: any;
  messageBoardBtn = 'Done';
  public menus: any = '';
  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  timer: any;
  getBins:any;
  notifications: any = [];
  notificationList: any = [];
  notifiCount: any;
  userselectedWidget: any;
  toTypeId = '';
  isMultipleAccess = localStorage.getItem('mutipleAccess');
  messageTypes = [
    { label: 'All Users', value: 'A' },
    { label: 'Group Users', value: 'G' },
    { label: 'Single/Multiple Users', value: 'SM' },
  ];
  siteType = localStorage.getItem('siteType');
  messageTypesTemp: any = [];
  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });
  userGroupList: any;
  userList: any;
  isGroup = false;
  enableTekneSearch = false;

  constructor(
    private classToggler: ClassToggleService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.userName = localStorage.getItem('userName');
    this.userGroup = localStorage.getItem('userGroup');
    if (localStorage.getItem('userRole') !== '26') {
      this.requestNotification();
      this.timer = setInterval(() => {
        this.requestNotification();
      }, 300000);
    }
    this.getTasks();
    this.readMessage();
    this.getWidgetOnly();
    this.userName = localStorage.getItem('userName');
    localStorage.setItem('locations', this.locations);
    localStorage.setItem('statuses', this.statuses);
    localStorage.setItem('products', this.products);
    localStorage.setItem('technician', this.technician);
    const menuExist = (localStorage.getItem('menus') !== null);
    if (menuExist) {
      this.userService.widgetClicked('Pre-Repair');
      

    }
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }

  signOut() {
    this.userService.logoutGSX().subscribe({
      next: (data: any) => {},
      error: (error: HttpErrorResponse) => {}
    });
    clearInterval(this.timer);
    const rooturl: any = localStorage.getItem('rootUrl');
    localStorage.clear();
    localStorage.setItem('rootUrl', rooturl);
    this.router.navigate(['login']);
  }

  getWidgetOnly() {
    const data1 = 'user_id=' + localStorage.getItem('userId') + '&user_role=' + localStorage.getItem('userRole');
    this.userService.getWidgetOnly(data1).subscribe({
      next: (data: any) => {
        this.navItems = Array.of(data.json.widget)[0];
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  getSMSMessages() {
    let result;
    this.userService.getSMSMessages()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.unreadMessages = result.message;
          } else {
            this.unreadMessages = [];
          }
        }, // success path
        error: (error: HttpErrorResponse) => this.error = error // error path
      });
  }

  openSMSMessage(messageId: string, type: string) {
    if (type === 'U') {
      for (let i = 0; i < this.unreadMessages.length; i++) {
        if (messageId === this.unreadMessages[i].id) {
          this.openUnreadMessage = this.unreadMessages[i];
          this.displayOpen = 'block';
          let result;
          this.userService.updateMessage(messageId)
            .subscribe({
              next: (data: any) => {
                result = data;
                if (result.status === true) {
                  // this.getSMSMessages();
                  // this.getAllSMS();
                }
              }, // success path
              error: (error: HttpErrorResponse) => this.error = error // error path
            });
        }
      }
    } else {
      for (let i = 0; i < this.allSMS.length; i++) {
        if (messageId === this.allSMS[i].id) {
          this.openUnreadMessage = this.allSMS[i];
          this.displayOpen = 'block';
        }
      }
    }
  }


  requestNotification() {
    let result: any = [];
    const data = 'user_id=' + localStorage.getItem('userId') + '&group_id=' + localStorage.getItem('userRole');
    this.userService.getNotifications(data).subscribe((res: any) => {
      result = res;
      if (result.status === true) {
        this.notifications = result.notification;
        this.notifiCount = this.notifications.length;
      }
    });
  }

  getAllSMS() {
    let result;
    this.userService.getAllSMS()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.allSMS = result.message;
          } else {
            this.allSMS = [];
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  getTasks() {
    const data1 = 'group=' + localStorage.getItem('userRole') + '&user_id=' + localStorage.getItem('userId');
    this.userService.getTasks(data1).subscribe({
      next: (data: any) => {
        this.tasks = data;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  getAllMessages() {
    const data1 = 'group=' + localStorage.getItem('userRole') + '&user_id=' + localStorage.getItem('userId');
    let result: any;
    this.userService.getAllMessageBoard(data1).subscribe({
      next: (data: any) => {
        result = data;
        if (result.status === true) {
          this.messageList = result.rows;
        }

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  readMessage() {
    const data1 = 'group=' + localStorage.getItem('userRole') + '&user_id=' + localStorage.getItem('userId') 
    this.userService.getMessageBoard(data1).subscribe({
      next: (data: any) => {
        if (data.message_read_flag === 'Y') {
          this.display = 'none';
        } else {
          this.display = 'block';
          this.messageBoardBtn = 'Read and Understood';
          this.messageBoardText = data['row'].text;
          this.messageDate = data['row'].entry_time;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  selectedWidget(widgetName: string) {
    if(widgetName == "Tekne") {
      this.enableTekneSearch = true;
    
    } 
    else{
      this.enableTekneSearch = false;
      
    }
    this.userService.widgetClicked(widgetName);
  }

  sendSMS() {
    this.getOptions();
    this.gerUserList();
    setTimeout(() => {
      this.displaysms = 'block';
    }, 2000);
  }

  getOptions() {
    let result;
    this.userService.getOptions()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.userGroupList = result.role;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  gerUserList() {
    let result;
    this.userService.getUserList()
      .subscribe({
        next: (data: any) => {
          result = data;
          this.userList = result;
        }, // success path
        error: error => this.error = error // error path
      });
  }

  closeBoard() {
    this.display = 'none';
    this.displaysms = 'none';
    this.displayOpen = 'none';
    this.userGroupList = [];
    this.messageText = '';
    this.ticketId = '';
    this.isError = '';
    this.groupId = '';
    this.userGroupTemp = [];
    this.toMultipleTemp = [];
    this.messageTypesTemp = [];
  }

  send() {
    if ((this.ticketId === '') || (this.messageType === '') || (this.messageText === '')) {
      this.isError = 'Fill all fields';
    } else {
      if (this.messageType === 'G') {
        if (this.groupId === '') {
          this.isError = 'Fill all fields';
        } else {
          this.isError = '';
        }
      } else if (this.messageType === 'SM') {
        if (this.toMultipleUser.length === 0) {
          this.isError = 'Fill all fields';
        } else {
          this.isError = '';
        }
      }
    }
    setTimeout(() => {
      if (this.isError === '') {
        this.callSMS();
      }
    }, 1000);
  }

  selectUser(event: any) {
    this.toMultipleTemp = event;
    this.toMultipleUser.push(event);
  }

  selectUserGroup(event: { id: string; }) {
    this.userGroupTemp = event;
    this.groupId = event.id;
  }
  callSMS() {
    if (this.messageType === 'A') {
      const inputData = '&type=' + this.messageType + '&text=' + this.messageText + '&ticket_id=' + this.ticketId;
      let result;
      this.userService.sendMessage(inputData)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.closeBoard();
            }
          }, // success path
          error: error => this.error = error // error path
        });
    } else if (this.messageType === 'G') {
      const inputData = '&type=' + this.messageType + '&text=' + this.messageText + '&ticket_id=' + this.ticketId +
        '&group_id=' + this.groupId;
      let result;
      this.userService.sendMessage(inputData)
        .subscribe({
          next: (data: any) => {
            result = data;
            if (result.status === true) {
              this.closeBoard();
            }
          }, // success path
          error: error => this.error = error // error path
        });
    } else if (this.messageType === 'SM') {
      let oneUser = '';
      let multipleUser: any = [];
      if (this.toMultipleUser.length === 1) {
        this.messageType = 'S';
        oneUser = this.toMultipleUser[0].value;
        const inputData = '&type=' + this.messageType + '&text=' + this.messageText + '&ticket_id=' + this.ticketId +
          '&to_user=' + oneUser;
        let result;
        this.userService.sendMessage(inputData)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.closeBoard();
              }
            }, // success path
            error: error => this.error = error // error path
          });
      } else {
        this.messageType = 'M';
        multipleUser = JSON.stringify(this.toMultipleUser);
        const inputData = '&type=' + this.messageType + '&text=' + this.messageText + '&ticket_id=' + this.ticketId +
          '&to_user=' + multipleUser;
        let result;
        this.userService.sendMessage(inputData)
          .subscribe({
            next: (data: any) => {
              result = data;
              if (result.status === true) {
                this.closeBoard();
              }
            }, // success path
            error: error => this.error = error // error path
          });
      }
    }
  }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  selectMessageType(event: { value: string; }) {
    this.messageTypesTemp = event;
    this.messageType = event.value;
    if (this.messageType === 'G') {
      this.isGroup = true;
      this.isUsers = false;
    } else if (this.messageType === 'SM') {
      this.isGroup = false;
      this.isUsers = true;
    } else {
      this.isGroup = false;
      this.isUsers = false;
    }
  }

  switchType(confirm_alert_temp: any) {
    const msg = 'Are you sure want to Switch to ' + this.toType;
    this.confirmAlert = { id: 'switch_type', title: 'Switch Service Type', msg: msg };
    this.openModal(confirm_alert_temp);
  }

  openModal(templat: any) {
    this.modalService.open(templat, { backdrop: 'static', keyboard: false });
  }

  selectedType(toTypeId: any) {
    if (toTypeId === '1') {
      this.toType = 'Service'
    } else if (toTypeId === '2') {
      this.toType = 'Onsite'
    } else if (toTypeId === '3') {
      this.toType = 'Windows'
    }
    this.toTypeId = toTypeId;
  }

  cancelModel() {
    this.modalService.dismissAll();
  }

  confirm(inputdata: any) {
    let result: any;
    if (inputdata === 'switch_type') {
      this.userService.switchType(this.toTypeId)
        .subscribe({
          next:
            (data: any) => {
              result = data;
              if (result.status === true) {
                this.signOut();
              } else {
                alert(result.message);
              }
            }, // success path
          error: error => this.error = error // error path
        });
      this.modalService.dismissAll();
    }
  }

  openTicket(notify: any) {
    if (notify.type !== 'tat6') {
      localStorage.setItem('id', notify.ticket_id);
      this.router.navigateByUrl('/dashboard/ticket');
      if (this.router.url === '/dashboard/ticket') {
        window.location.reload();
      }
    }
  }
  navigateToTekneDashboard() {
  this.router.navigateByUrl('/tekne-search-dashboard');
  this.enableTekneSearch = true;
}
navigateToSearchDashboard() {
  this.router.navigateByUrl('/search-dashboard');
  this.enableTekneSearch = false;
}
}
