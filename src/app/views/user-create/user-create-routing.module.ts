import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create.component';
const routes: Routes = [
  { path: '',  component: UserCreateComponent, data: { title: 'Create User'}}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreateRoutingModule { }
