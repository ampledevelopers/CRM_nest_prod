
import { Component, OnDestroy, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../.././shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { OverlayScrollbars } from 'overlayscrollbars';
//import { LayoutComponent } from '../../views/forms/layout/layout.component';
import { SidebarModule, GridModule } from '@coreui/angular';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { DefaultAsideComponent } from './default-aside/default-aside.component';
import { IconModule } from '@coreui/icons-angular';
export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
}
export interface ConfirmAlert {
  id: any;
  title: any;
  msg: any;
}

export const navItems: NavData[] = [];

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss', '../../../scss/customstyle.css'],
    imports: [MatProgressBarModule,
       SidebarModule,
       GridModule,
       CommonModule,
       RouterModule,
       DefaultFooterComponent,
      DefaultHeaderComponent,
      DefaultAsideComponent,
      IconModule,
    ],
    standalone: true,
})


export class DefaultLayoutComponent implements OnDestroy {
  error: any;
  isError = '';
  public navItems = '';
  public menus: any = '';
  public menuItems: any = [];
  public menuItems1: any = [];
  public filteredMenus: any = [];
  public userName: any = '';
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public tasks: any = [];
  timer: any;
  notifications: any = [];
  notificationList: any = [];
  notifiCount: any;
  messageReadFlag = true;
  messageBoardText = '';
  messageList: any = [];
  messageDate: any;
  messageBoardBtn = 'Done';
  locations: any = [];
  statuses: any = [];
  products: any = [];
  technician = '';
  userGroup: any;
  display = 'none';
  displaysms = 'none';
  displayOpen = 'none';
  unreadMessages: any = [];
  allSMS: any = [];
  messageTypes = [
    { label: 'All Users', value: 'A' },
    { label: 'Group Users', value: 'G' },
    { label: 'Single/Multiple Users', value: 'SM' },
  ];
  messageType = '';
  messageTypesTemp: any = [];
  isGroup = false;
  isUsers = false;
  userList: any = [];
  userListTemp: any = [];
  userGroupList: any = [];
  groupId = '';
  userGroupTemp: any = [];
  toOneUser = '';
  toMultipleUser: any = [];
  toMultipleTemp: any = [];
  messageText = '';
  ticketId = '';
  openUnreadMessage: any = [];
  confirmAlert: ConfirmAlert = { id: '', title: '', msg: '' };
  siteType = localStorage.getItem('siteType');
  branch = localStorage.getItem('branchCode');
  group = localStorage.getItem('userRole');
  toType = '';
  statuseList: any = [];
  modalService: any;
  clickEventsubscription!: Subscription;
  widgetName: any;
  preIndex = '';
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  showChild = false;
  userRole = localStorage.getItem('userRole');
  menuProgress = true;
  @Inject(DOCUMENT) private _document: Document;

  constructor(private userService: UserService, private router: Router, public route: ActivatedRoute) {
     this._document = document;
    this.userGroup = localStorage.getItem('userGroup');
    this.getWidget();
    this.getMenu();
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = this._document.body.classList.contains('sidebar-minimized');
    });
    this.element = this._document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.userName = localStorage.getItem('userName');
    localStorage.setItem('locations', this.locations);
    localStorage.setItem('statuses', this.statuses);
    localStorage.setItem('products', this.products);
    localStorage.setItem('technician', this.technician);
    this.clickEventsubscription = this.userService.getSelectedWidget().subscribe((data: any) => {
      this.selectedWidget(this.userService.selectedWidget);
    })

    const menuExist = (localStorage.getItem('menus') !== null);
    if (menuExist) {
      const isMenus:any = localStorage.getItem('menus');
      const isStatus:any = localStorage.getItem('statusList');
      this.menus = eval(isMenus);
      this.statuseList = eval(isStatus);
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  getWidget() {
    const data1 = 'user_id=' + localStorage.getItem('userId') + '&user_role=' + localStorage.getItem('userRole');
    this.userService.getWidget(data1).subscribe({
      next: (data: any) => {
        let widgetItems: any = [];
        const results1: any = [];
        let children: any = [];
        // this.navItems = Array.of(data.json.widget)[0];
        // this.userService.allWidgets = (this.navItems);

        widgetItems = Array(data.json.widget_items)[0];
        this.statuseList = Array(data.json.status)[0];

        for (let i = 0; i < widgetItems.length; i++) {
        }
        for (let j = 0; j < widgetItems.length; j++) {
          children = [];
          for (let k = 0; k < this.statuseList.length; k++) {
            if (this.statuseList[k].widget_item_name === widgetItems[j].widget_item_name) {
              children.push({
                name: this.statuseList[k].status_name + '~' + this.statuseList[k].count,
                url: widgetItems[j].angular_url + '/' + this.statuseList[k].status_id,
                iconComponent: { name: this.statuseList[k].widget_item_icon_v2 }
              });
            }
          }
          results1.push({
            name: widgetItems[j].widget_item_name,
            url: widgetItems[j].angular_url,
            iconComponent: { name: widgetItems[j].widget_item_icon_v2 },
            widget_name: widgetItems[j].widget_name,
            showChild: false,
            children: children
          });
        }
        // this.userService.widgetClicked('Pre-Repair');
        // this.userService.widgetClicked('Pre-Repair');
        this.menus = results1;
        localStorage.setItem('menus', JSON.stringify(this.menus));
        localStorage.setItem('statusList', JSON.stringify(this.statuseList));
        this.menuProgress = false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  getMenu() {
    const data1 = 'user_id=' + localStorage.getItem('userId') + '&user_role=' + localStorage.getItem('userRole');
    this.userService.getMenu(data1).subscribe({
      next: (data: any) => {
        const menuItems = Array.of(data)[0];
        let child: any;
        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i].children) {
            child = menuItems[i].children;
            this.menuItems.push({
              menuId: menuItems[i].menu_id,
              name: menuItems[i].name,
              url: menuItems[i].url,
              iconComponent: { name: menuItems[i].icon_v2 },
              showChild: false,
              children: child
            })
          } else {
            this.menuItems.push({
              menuId: menuItems[i].menu_id,
              name: menuItems[i].name,
              url: menuItems[i].url,
              iconComponent: { name: menuItems[i].icon_v2 }
            })
          }
        }
        for (let menu of this.menuItems) {
          if (menu.menuId < 31) {
            this.filteredMenus.push(menu);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  selectedWidget(widgetName: any) {
    this.filteredMenus = _.filter(this.menus, row => row.widget_name.indexOf(widgetName) > -1);
    let menus: any = [];
    if (widgetName === 'Tekne') {
      for (let menu of this.menuItems) {
        if (menu.menuId > 30) {
          menus.push(menu);
        }
      }
    } else {
      for (let menu of this.menuItems) {
          if (menu.menuId < 31) {
            menus.push(menu);
          }
        }
      }

    this.filteredMenus = this.filteredMenus.concat(menus);
    menus = [];
  }

  menuToggle(id: any) {
    this.filteredMenus[id].showChild = !this.filteredMenus[id].showChild;
  }

  menuClick(event: any, sub: any) {
    const status = event.target.textContent.split('~');
    if (status.length === 2) {
      for (let i = 0; i < this.statuseList.length; i++) {
        if (this.statuseList[i].status_name === status[0]) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([sub.url]);
          })
        }
      }
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([sub.url]);
      })
    }
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
        error: error => this.error = error // error path
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
                  this.getAllSMS();
                }
              }, // success path
              error: error => this.error = error // error path
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


  sendSMS() {
    this.getOptions();
    this.gerUserList();
    setTimeout(() => {
      this.displaysms = 'block';
    }, 2000);
  }

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

  selectUser(event: any) {
    this.toMultipleTemp = event;
    this.toMultipleUser.push(event);
  }

  selectUserGroup(event: { id: string; }) {
    this.userGroupTemp = event;
    this.groupId = event.id;
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
}
