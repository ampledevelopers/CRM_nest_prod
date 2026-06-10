import { MessageBoardService } from './message-board.service';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from '../../shared/user.service';

@Component({
    selector: 'app-message-board',
    templateUrl: './message-board.component.html',
    styleUrls: ['./message-board.component.scss', '../../../scss/customstyle.css'],
    standalone: false
})
export class MessageBoardComponent implements OnInit {
  htmlTitleContent: any;
  htmlBodyContent: any;
  userGroupList: any = [
    { label: 'All users', value: '0' },
    { label: 'TL/C3', value: '2' },
    { label: 'LIC/Supervisor', value: '18' },
    { label: 'Manager', value: '3' }
  ];
  error: any;
  userGroupTemp: any;
  groupId: any;
  data: any;
  grouptype = '';
  constructor(private userService: MessageBoardService) {
    // this.getOptions();
  }
  editorConfigBody: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '15rem',
    maxHeight: '15rem',
    width: '70%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    placeholder: 'Enter your message here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  }
  ngOnInit(): void {
  }

  sendMessage() {
    let result;
    if (this.groupId === undefined || this.groupId.length === 0 || this.htmlTitleContent === undefined || this.htmlBodyContent === undefined) {
      alert("Please fill all fields!");
    } else {
      if(this.groupId[0] == '0') {
        this.grouptype = 'All';
      }
      var str = '&amp;'
      var classStr = 'class="selectable-text copyable-text"'
      var htmlTemp = this.htmlBodyContent.split('</p>');
      for(let i=0 ; i<htmlTemp.length; i++) {
        if(this.htmlBodyContent.includes(str) || this.htmlBodyContent.includes(classStr)) {
          this.htmlBodyContent = this.htmlBodyContent.replace(str, 'and');
          // this.htmlBodyContent = this.htmlBodyContent.replace(classStr, '');
        }
      }
      this.data = '&groupid=' + this.groupId + '&grouptype=' + this.grouptype + '&title=' + encodeURIComponent(this.htmlTitleContent) + '&html=' + encodeURIComponent(this.htmlBodyContent);
      this.userService.submitMessageBoard(this.data)
        .subscribe({
          next: (data: any) => {
            result = data;
            if(result.status === true) {
              alert('Message sent!')
              this.htmlTitleContent = '';
              this.htmlBodyContent = '';
              this.userGroupTemp = '';
              this.grouptype = '';
            }
          }, // success path
          error: error => this.error = error // error path
        });
    }
  }

  public e: any;

  omit_special_char(val: any) {
    var k;
    k = val.charCode;
    return (k == 38);
  }

  getOptions() {
    let result;
    this.userService.getOptions()
      .subscribe({
        next:(data: any) => {
            result = data;
            const arr = [ {id: "26", group_name: "All", site_type_id: "", default_page: "search-dashboard", label: "All users"  }, ...result.role]
            this.userGroupList = arr;
            for(let i=0; i<this.userGroupList.length; i++) {
              if(this.userGroupList[i].label == 'TeamLead') {
                this.userGroupList[i].label = 'TL/C3';
              }
              if(this.userGroupList[i].label == 'Location In-Charge') {
                this.userGroupList[i].label = "LIC's/ Supervisors";
              }
            }
        }, // success path
        error: error => this.error = error // error path
  });
  }

  selectUserGroup(event: { id: string; }) {
    this.groupId = event;
  }
}
