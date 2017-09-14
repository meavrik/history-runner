import { MenuItem } from 'primeng/primeng';
import { Person } from 'app/life/person';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {

  @Input() person: Person;
  @Output() showInfo: EventEmitter<any> = new EventEmitter<any>();

  selected: Person;
  kidsData: MenuItem[] = [];

  constructor() {

  }

  ngOnInit() {
    this.person.kids.subscribe(kids => {
      if (kids) {
        this.kidsData = this.person.childrens.map(a => {
          return {
            label: a.firstName, value: a
          }
        })
      }

    })
  }

  selectKid() {
    this.showInfo.emit({ person: this.selected, info: 'kid' });
  }

  showGenomeInfo() {
    this.showInfo.emit({ person: this.person, info: 'genome' });
  }

  showId() {
    this.showInfo.emit({ person: this.person, info: 'id' });
  }



  showMom(){
    this.showInfo.emit({ person: this.person.mother, info: 'kid' });
  }


  showSpouse(){
    this.showInfo.emit({ person: this.person.spouse, info: 'kid' });
  }
  showDad(){
    this.showInfo.emit({ person: this.person.father, info: 'kid' });
  }
}
