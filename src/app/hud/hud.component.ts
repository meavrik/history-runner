import { Component, OnInit } from '@angular/core';
import { TimeService } from '../services/time.service';
import { PopulationService } from '../services/population.service';
import { Person } from '../life/person';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.css']
})
export class HudComponent implements OnInit {
  date: Date;
  population: Person[]=[];


  constructor(private time: TimeService, private populationService: PopulationService) {
    this.time.date.subscribe(date => {
      this.date = date;
    });

    this.populationService.population.subscribe(population => {
      this.population = population;
    })

  }

  ngOnInit() {
  }

}
