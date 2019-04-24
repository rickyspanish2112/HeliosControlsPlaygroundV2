import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MaterialModule } from '../app/shared/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookupdialogComponent } from './controls/lookup-dialog/lookupdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    LookupdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    LookupdialogComponent
  ],
  providers: [HttpClient, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
