import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { ProjCreatorComponent } from './proj-creator/proj-creator.component';
import { IntermScreenComponent } from './interm-screen/interm-screen.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ProjDetailsComponent } from './proj-details/proj-details.component';
import { AdmFetinStagesComponent } from './adm-fetin-stages/adm-fetin-stages.component';
import { AdmUpdaterComponent } from './adm-updater/adm-updater.component';

const materialModules = [
  CommonModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...materialModules
  ],
  exports:[
    ...materialModules,
  ],
  providers: [],
  declarations: [ AppComponent, AuthComponent, ProjCreatorComponent, IntermScreenComponent, HelpPageComponent, AdmFetinStagesComponent, AdmUpdaterComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }