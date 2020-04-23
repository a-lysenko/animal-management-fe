import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import {SharedModule} from '../_shared/shared.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerCardComponent } from './owner-card/owner-card.component';

@NgModule({
  declarations: [OwnerListComponent, OwnerCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
