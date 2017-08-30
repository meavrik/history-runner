import { Component, OnInit } from '@angular/core';
import { TimeService } from '../services/time.service';
import { PopulationService } from '../services/population.service';
import { Person } from '../life/person';
import { SelectItem } from "primeng/primeng";


@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.css']
})
export class HudComponent implements OnInit {
  date: Date;
  population: Person[] = [];
  speedOptions: SelectItem[] = [
    { label: '0', value: 0 },
    { label: '1', value: 1000 },
    { label: 'x10', value: 100 },
    { label: 'x100', value: 10 }
  ]
  selectedSpeed = 1000;

  constructions: SelectItem[] = [
    { label: 'House', value: 10 },
    { label: 'Farm', value: 100 },
    { label: 'Castle', value: 10000 }
  ]
  selectedConstruct

  constructor(public time: TimeService, private populationService: PopulationService) {
    this.time.date.subscribe(date => {
      this.date = date;
    });

    this.populationService.population.subscribe(population => {
      this.population = population;
    })

  }

  ngOnInit() {
  }

  onPause() {
    this.time.pause = !this.time.pause
  }

  onSpeedChange() {
    if (this.selectedSpeed == 0) {
      this.time.pause = true
    } else {
      this.time.pause = false;
      this.time.speed = this.selectedSpeed;
    }

  }
}
