import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import {SharedModule} from "../_shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
