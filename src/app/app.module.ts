import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalModule } from './animal/animal.module';
import { CoreModule } from './_core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwnerModule } from './owner/owner.module';
import {WildAnimalModule} from './wild-animal/wild-animal.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {animalFeatureKey, reducer} from './_core/animal/animal.reducer';
import {AnimalEffects} from './_core/animal/animal.effects';
import {SharedModule} from './_shared/shared.module';
import {ownerFeatureKey, reducer as ownerReducer} from './_core/owner/owner.reducer';
import {OwnerEffects} from './_core/owner/owner.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnimalModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    OwnerModule,
    WildAnimalModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AnimalEffects, OwnerEffects]),
    StoreModule.forFeature(animalFeatureKey, reducer),
    StoreModule.forFeature(ownerFeatureKey, ownerReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
