import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnimalListComponent} from './animal-list/animal-list.component';
import {AnimalCardComponent} from './animal-card/animal-card.component';


const routes: Routes = [
  {
    path: '',
    component: AnimalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
