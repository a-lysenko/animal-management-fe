import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OwnerListComponent} from './owner-list/owner-list.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
