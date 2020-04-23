import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import {SharedModule} from '../_shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {petFeatureKey, reducer} from './pet.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PetEffects} from './pet.effects';


@NgModule({
  declarations: [PetListComponent, PetCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    PetRoutingModule,
    StoreModule.forFeature(petFeatureKey, reducer),
    EffectsModule.forFeature([PetEffects])
  ],
  entryComponents: [
    PetListComponent, PetCardComponent
  ]
})
export class PetModule { }
