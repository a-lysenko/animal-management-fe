import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WildAnimalListComponent} from './wild-animal-list/wild-animal-list.component';

const routes: Routes = [
  {
    path: '',
    component: WildAnimalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WildAnimalRoutingModule { }
