import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import {SharedModule} from '../_shared/shared.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerCardComponent } from './owner-card/owner-card.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ownerFeatureKey, reducer} from './owner.reducer';
import {OwnerEffects} from './owner.effects';


@NgModule({
  declarations: [OwnerListComponent, OwnerCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwnerRoutingModule,
    StoreModule.forFeature(ownerFeatureKey, reducer),
    EffectsModule.forFeature([OwnerEffects])
  ]
})
export class OwnerModule { }
