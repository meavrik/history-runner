import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorldComponent } from './world/world.component';
import { HudComponent } from './hud/hud.component';
import { TimeService } from './services/time.service';
import { PopulationService } from './services/population.service';
import { OrganizationChartModule, SelectButtonModule, ListboxModule, DropdownModule, PanelModule, DialogModule, OverlayPanelModule } from 'primeng/primeng';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from "primeng/components/button/button";
import { FormsModule } from '@angular/forms';
import { PersonIdComponent } from './world/person-id/person-id.component'
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    WorldComponent,
    HudComponent,
    PersonIdComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    OrganizationChartModule,
    ButtonModule,
    SelectButtonModule,
    DropdownModule,
    ListboxModule,
    PanelModule,
    DialogModule,
    HttpModule,
    OverlayPanelModule
  ],
  providers: [TimeService, PopulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
