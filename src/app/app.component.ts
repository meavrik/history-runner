import { UtilsService } from './services/utils.service';
import { Person } from 'app/life/person';
import { TimeService } from './services/time.service';
import { SelectItem } from 'primeng/primeng';
import { PopulationService } from './services/population.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  gameStarted: boolean = false;
  tribes: SelectItem[];
  selectedTribe;

  constructor(private populationService: PopulationService, private time: TimeService) {
    this.populationService.tribesObservable.subscribe(tribes => {
      if (tribes) {
        this.tribes = tribes.map(tribe => { return { label: tribe.name, value: tribe.name } })
      }
      
    })
  }


  onStartClick() {

    this.statGame();
  }

  statGame() {
    /* for (var i = 0; i < 30; i++) {
      this.populationService.generateNewPerson(new Person(), new Person(), UtilsService.randomNumber(15, 60));
    }
    this.gameStarted = true;
    this.time.startHistory() */
  }
}
