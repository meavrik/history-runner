import { MenuItem } from 'primeng/primeng';
import { Person } from 'app/life/person';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopulationService } from '../../../services/population.service';


@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  @Input() person: Person;
  @Output() showInfo: EventEmitter<any> = new EventEmitter<any>();

  selected: Person;
  //kidsData: MenuItem[] = [];

  constructor(private populationService:PopulationService) {

  }

  ngOnInit() {
    /* this.person.kids.subscribe(kids => {
      if (kids) {
        this.kidsData = this.person.childrens.map(a => {
          return {
            label: a.firstName, value: a
          }
        })
      }

    }) */
  }


  showGenomeInfo() {
    this.showInfo.emit({ person: this.person, info: 'genome' });
  }

  showId() {
    this.showInfo.emit({ person: this.person, info: 'id' });
  }

  showSpouse(){
    this.showInfo.emit({ persons: [this.person.spouse], info: 'person' });
  }
  showParents(){
    this.showInfo.emit({ persons: [this.person.mother,this.person.father], info: 'person' });
  }

  showKids() {
    this.showInfo.emit({ persons: this.person.childrens, info: 'person-kids' });
  }

  showHistory() {
    this.showInfo.emit({ person: this.person, info: 'history' });
  }

  killMe() {
    this.populationService.kill(this.person);
  }
}
