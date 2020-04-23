import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    EffectsModule.forRoot([AnimalEffects]),
    StoreModule.forFeature(animalFeatureKey, reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
