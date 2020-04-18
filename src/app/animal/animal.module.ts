import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import {SharedModule} from "../_shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {animalFeatureKey, reducer} from "./animal.reducer";


@NgModule({
  declarations: [AnimalListComponent, AnimalCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnimalRoutingModule,
    StoreModule.forFeature(animalFeatureKey, reducer)
  ],
  entryComponents: [
    AnimalListComponent, AnimalCardComponent
  ]
})
export class AnimalModule { }
