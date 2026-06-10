import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderModule, SidebarModule, TabContentComponent} from '@coreui/angular';
import { NavModule } from '@coreui/angular';
import { TabsModule } from '@coreui/angular';
import { ListGroupModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
    selector: 'app-default-aside',
    templateUrl: './default-aside.component.html',
    styleUrls: ['./default-aside.component.scss', '../../../../scss/customstyle.css'],
    imports: [
        FormsModule,
        CommonModule,
        SidebarModule,
        TabsModule,
        NavModule,
        ListGroupModule,
        ButtonModule,
        IconModule,
        RouterModule,
        NgSelectModule,HeaderModule,TabContentComponent,
      
    ],
    standalone: true,
    providers: [],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultAsideComponent implements AfterViewInit {
  public messages = new Array(6);
  public activeTabIdx = 0;
  public filteredMenus: any = '';
  public menus: any = '';
  public menuItems: any = [];
  statuses: any = [];
  statuseList: any = [];
  userGroup: any;
  public navItems = '';
  allSMS: any = [];
  unreadMessages: any = [];
  displayOpen = 'none';
  timer;
  messageReadFlag = true;
  messageBoardText = '';
  messageList: any = [];
  messageDate: any;
  messageTitle: any;
  messageBoardBtn = 'Done';
  error: any;
  openUnreadMessage: any = [];
  clickEventsubscription!: Subscription;
  display = 'none';
  messageTypesTemp: any = [];
  messageTypes = [
    { label: 'All Users', value: 'A' },
    { label: 'Group Users', value: 'G' },
    { label: 'Single/Multiple Users', value: 'SM' },
  ];
  enableBtn = false;
  constructor(
    private renderer: Renderer2, private elementRef: ElementRef, private userService: UserService, private router: Router
  ) {
    this.getAllMessages();
    this.readMessage();
    this.userGroup = localStorage.getItem('userGroup');
    this.getAllSMS();
    this.timer = setInterval(() => {
      this.getAllSMS();
      this.getAllMessages();
    }, 1500000);
  }

  ngAfterViewInit(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
  }
 switchTab(idx: number) {   
    this.activeTabIdx = idx;
  }
  getAllSMS() {
    let result;
    this.userService.getAllSMS()
      .subscribe({
        next: (data: any) => {
          result = data;
          if (result.status === true) {
            this.allSMS = result.message;
            // this.allSMS = this.allSMS.reverse();
          } else {
            this.allSMS = [];
          }
        }, // success path
        error: error => this.error = error // error path
      });
  }

  openMessage(msgid: any) {
    this.enableBtn = true;
    this.messageBoardBtn = 'Done';
    this.messageReadFlag = true;
    for (let i = 0; i < this.messageList.length; i++) {
      if (msgid === this.messageList[i].id) {
        this.messageBoardText = this.messageList[i].text;
      }
    }
    this.display = 'block';
  }

  readMessage() {
    const data1 = 'group=' + localStorage.getItem('userRole') + '&user_id=' + localStorage.getItem('userId') + '&X_API_KEY=' +
      localStorage.getItem('userToken');
    this.userService.getMessageBoard(data1).subscribe({
      next: (data: any) => {
        if (data.message_read_flag === 'Y') {
          this.display = 'none';
        } else {
          this.display = 'block';
          setTimeout(() => {
            this.enableBtn = true;
          }, 60000);
          this.messageBoardBtn = 'Read and Understood';
          this.messageBoardText = data['row'].text;
          this.messageDate = data['row'].entry_time;
          this.messageTitle = data['row'].title;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  getAllMessages() {
    const data1 = 'group=' + localStorage.getItem('userRole') + '&user_id=' + localStorage.getItem('userId') + '&X_API_KEY=' +
      localStorage.getItem('userToken');
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

  setMessageFlag() {
    const data1 = 'group=' + localStorage.getItem('userRole') + '&user_id=' + localStorage.getItem('userId') + '&X_API_KEY=' +
      localStorage.getItem('userToken');
    let result;
    this.userService.setMessageFlag(data1).subscribe({
      next: (data: any) => {
        result = data;
        if (result.status === true) {
          this.display = 'none';
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
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

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  menuClick(event: { target: { textContent: string; }; }) {
    const status = event.target.textContent.split('~');
    for (let i = 0; i < this.statuseList.length; i++) {
      if (this.statuseList[i].status_name === status[0]) {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      }
    }
  }

  getWidget() {
    let widgets: any = [];
    let widgetItems: any = [];
    const results1: any = [];
    let children: any = [];
    const data1 = 'user_id=' + localStorage.getItem('userId') + '&user_role=' + localStorage.getItem('userRole');
    this.userService.getWidget(data1).subscribe({
      next: (data: any) => {
        this.navItems = Array.of(data.json.widget)[0];
        widgets = Array(data.json.widget)[0];
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
                icon: 'cui-wrench',
                url: widgetItems[j].angular_url + '/' + this.statuseList[k].status_id
                // url: widgetItems[j].angular_url + '/' + 'mytickets'
              });
            }
          }
          results1.push({
            name: widgetItems[j].widget_item_name,
            url: widgetItems[j].angular_url,
            icon: widgetItems[j].widget_item_icon,
            widget_name: widgetItems[j].widget_name,
            children: children
          });
        }
        this.menus = results1;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  closeBoard() {
    this.display = 'none';
    this.displayOpen = 'none';
    this.messageTypesTemp = [];
  }

}
