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

  showPerson: Person;


  constructor(private populationService: PopulationService) {
    this.populationService.population.subscribe(population => {
      this.population = population.filter(person => person.tribe == this.tribe);
    })
  }

  ngOnInit() {
  }

  selectPersonInfo(person: Person) {
    this.selectedPerson = person;
    this.displayDialog = true;
  }


  selectPersonInfo2(person: Person) {
    this.selectedPerson = person;
    this.displayDialog2 = true;
  }

  onDialogHide() {
    this.selectedPerson = null;
  }

  kidsData: MenuItem[] = [];

  getDPFor(person:Person): MenuItem[] {
    let arr = person.childrens.map(a => {
      return {
        label: a.firstName, value: a.firstName, command: () => {
          this.showPerson = a;
        }
      }
    })

    return arr
  }


  selectKid(person:Person) {
    debugger;
  }
}
