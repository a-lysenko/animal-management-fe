import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnimalModule } from './animal/animal.module';
import { CoreModule } from './_core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwnerModule } from './owner/owner.module';

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
    BrowserAnimationsModule,
    OwnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
