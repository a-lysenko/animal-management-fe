import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WildAnimalRoutingModule } from './wild-animal-routing.module';
import { WildAnimalListComponent } from './wild-animal-list/wild-animal-list.component';
import { WildAnimalCardComponent } from './wild-animal-card/wild-animal-card.component';
import {SharedModule} from '../_shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducer, wildAnimalFeatureKey} from './wild-animal.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WildAnimalEffects} from './wild-animal.effects';


@NgModule({
  declarations: [WildAnimalListComponent, WildAnimalCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    WildAnimalRoutingModule,
    StoreModule.forFeature(wildAnimalFeatureKey, reducer),
    EffectsModule.forFeature([WildAnimalEffects])
  ],
  entryComponents: [
    WildAnimalListComponent, WildAnimalCardComponent
  ]
})
export class WildAnimalModule { }
