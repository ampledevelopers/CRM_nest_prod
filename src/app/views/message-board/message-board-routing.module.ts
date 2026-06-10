import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageBoardComponent } from './message-board.component';

const routes: Routes = [{
  path: '',
  component: MessageBoardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageBoardRoutingModule { }
