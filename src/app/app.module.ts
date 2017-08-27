import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorldComponent } from './world/world.component';
import { HudComponent } from './hud/hud.component';
import { TimeService } from './services/time.service';
import { PopulationService } from './services/population.service';
import { UtilsService } from './services/utils.service';
import { Person } from './life/person';
import { OrganizationChartModule } from 'primeng/primeng';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    WorldComponent,
    HudComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OrganizationChartModule
  ],
  providers: [TimeService, PopulationService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
