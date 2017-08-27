import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorldComponent } from './world/world.component';
import { HudComponent } from './hud/hud.component';
import { TimeService } from './services/time.service';
import { PopulationService } from './services/population.service';
import { UtilsService } from './services/utils.service';
import { Person } from './life/person';


@NgModule({
  declarations: [
    AppComponent,
    WorldComponent,
    HudComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimeService, PopulationService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
