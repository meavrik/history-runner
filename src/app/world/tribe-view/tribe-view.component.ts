import { Component, OnInit, Input } from '@angular/core';
import { Tribe } from '../../tribe/tribe';
import { PopulationService } from '../../services/population.service';
import { Person } from '../../life/person';

@Component({
  selector: 'app-tribe-view',
  templateUrl: './tribe-view.component.html',
  styleUrls: ['./tribe-view.component.css']
})
export class TribeViewComponent implements OnInit {
  @Input() tribe:Tribe;

  population:Person[];
  selectedPerson:Person;
  displayDialog:boolean;

  constructor(private populationService:PopulationService) 
  { 
    this.populationService.population.subscribe(population=>{
      this.population = population.filter(person=>person.tribe==this.tribe);
    })
  }

  ngOnInit() {
  }

  selectCar(person: Person) {
    this.selectedPerson = person;
    this.displayDialog = true;
}

onDialogHide() {
    this.selectedPerson = null;
}

}
