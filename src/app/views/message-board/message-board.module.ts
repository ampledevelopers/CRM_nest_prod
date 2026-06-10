import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MessageBoardRoutingModule } from './message-board-routing.module';
import { MessageBoardComponent } from './message-board.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [ MessageBoardComponent],
  imports: [
    CommonModule,
    MessageBoardRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ]
})
export class MessageBoardModule { }
