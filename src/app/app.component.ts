import { UtilsService } from './services/utils.service';
import { Person } from 'app/life/person';
import { TimeService } from './services/time.service';
import { SelectItem } from 'primeng/primeng';
import { PopulationService } from './services/population.service';
import { Component, OnInit } from '@angular/core';
import { Tribe } from './tribe/tribe';
import { StoreService, AppState, ADD_PERSON } from './store/store.service';
import { Male } from 'app/life/person.male';
import { Female } from './life/person.female';
import { Genome } from './life/genome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  
  gameStarted: boolean = false;
  tribes: SelectItem[];
  selectedTribe: string;

  constructor(private store: StoreService, private populationService: PopulationService, private time: TimeService) {

    this.populationService.tribesObservable.subscribe(tribes => {
      if (tribes) {
        this.tribes = tribes.map(tribe => { return { label: tribe.name, value: tribe.name } });
        this.selectedTribe = this.tribes[0].value;
      }

    })

    this.store.subscribe(() => { console.log(this.store.getState().peoples) });


    
    /* let person: Male = new Male(null, null, new Genome())
    let person2: Female = new Female(null, null, new Genome())
    let person3: Person = new Male(person, person2, new Genome(person.genome.chromosomesForReproduction,person2.genome.chromosomesForReproduction))
    this.store.dispatch({ type: ADD_PERSON, payload: person })
    this.store.dispatch({ type: ADD_PERSON, payload: person2 })
    this.store.dispatch({ type: ADD_PERSON, payload: person3 }) */
    
  }

  ngOnInit(): void {
    
  }

  onStartClick() {
    this.statGame();
  }

  statGame() {
    this.gameStarted = true;
    this.populationService.initTribes(this.selectedTribe)
    
    this.time.startHistory()
    
  }
}
