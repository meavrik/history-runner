import { TimeService } from './../../services/time.service';
import { Component, OnInit, Input } from '@angular/core';
import { Tribe } from '../../tribe/tribe';
import { PopulationService } from '../../services/population.service';
import { Person } from '../../life/person';
import { MenuItem } from "primeng/primeng";

@Component({
  selector: 'app-tribe-view',
  templateUrl: './tribe-view.component.html',
  styleUrls: ['./tribe-view.component.css']
})
export class TribeViewComponent implements OnInit {
  @Input() tribe: Tribe;

  population: Person[];
  selectedPerson: Person;
  displayDialog: boolean;
  displayDialog2: boolean;
  displayDialog3: boolean;

  //selectedKid: Person;

  constructor(private populationService: PopulationService,private time:TimeService) {
    this.populationService.population.subscribe(population => {
      this.population = population.filter(person => person.tribe == this.tribe);
    })
  }

  ngOnInit() {
  }

  /* selectPersonInfo(person: Person) {
    this.selectedPerson = person;
    this.displayDialog = true;
  }


  selectPersonInfo2(person: Person) {
    this.selectedPerson = person;
    this.displayDialog2 = true;
  } */

  onDialogHide() {
    this.time.pause=false;
    this.selectedPerson = null;
  }

  personInfoSelected(event: any) {

    this.selectedPerson = event.person;
    if (event.info == 'id') {
      this.displayDialog = true;
    }

    if (event.info == 'genome') {
      this.displayDialog2 = true;
    }

    if (event.info == 'kid') {
      this.displayDialog3 = true;
    }

    this.time.pause=true;
  }


}
