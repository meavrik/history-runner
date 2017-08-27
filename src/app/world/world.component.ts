import { Component, OnInit } from '@angular/core';
import { PopulationService } from '../services/population.service';
import { Chromosome } from 'app/life/chromosome';
import { Person } from '../life/person';
import { Genome } from '../life/genome';
import { TimeService } from '../services/time.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  population: Person[] = [];
  //currentPerson: Person;

  constructor(public popuplationService: PopulationService, private time: TimeService) {
    
  }

  ngOnInit() {
    this.popuplationService.population.subscribe(population => {
      this.population = population;
      //console.log('pop change!!! '+this.population.length);
      
      //this.currentPerson = population[population.length - 1];
      //this.currentPerson.genome.chromosomes
    })

    for (var i = 0; i < 30; i++) {
      this.popuplationService.generateNewPerson(new Person(), new Person(), UtilsService.randomNumber(15, 60));
    }

    this.time.date.subscribe(date => {

      //this.popuplationService.generateNewPerson(new Person(), new Person());
    })
  }

}
