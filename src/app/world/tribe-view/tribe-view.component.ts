import { TimeService } from './../../services/time.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Tribe } from '../../tribe/tribe';
import { PopulationService } from '../../services/population.service';
import { Person } from '../../life/person';
import { MenuItem } from "primeng/primeng";
import { UtilsService } from '../../services/utils.service';
import { Male } from 'app/life/person.male';
import { Female } from '../../life/person.female';

@Component({
  selector: 'app-tribe-view',
  templateUrl: './tribe-view.component.html',
  styleUrls: ['./tribe-view.component.css']
})
export class TribeViewComponent implements OnInit {

  @Input() tribe: Tribe;
  @ViewChild('messageWindow') messageWindow:ElementRef
  currentMessage: string = "";

  peoplesAlive: Person[];
  peoplesWithActionToday: Person[];

  population: Person[];
  selectedPerson: Person;
  selectedPersons: Person[];
  displayDialog: boolean;
  displayDialog2: boolean;
  displayDialog3: boolean;
  displayDialog4: boolean;

  //selectedKid: Person;
  curDate: Date;

  constructor(private populationService: PopulationService, private time: TimeService) {
    this.populationService.population.subscribe(population => {
      this.population = population.filter(person => person.tribe == this.tribe);
      this.peoplesAlive = this.population.filter(person => person.alive);
    });



    this.time.date.subscribe(date => {
      if (date) {
        this.curDate = date;

        if (date.getDate() == 1) {
          this.newMonth();

          if (date.getMonth() == 0) {
            this.newYear();
          }
        }

        this.newDay();
      }

    })
  }

  ngOnInit(): void {
    this.tribe.message$.subscribe(message => {
      if (message) {
        this.currentMessage += message + "\n";
      }

      this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight - this.messageWindow.nativeElement.clientHeight;
    })
  }

  newDay() {
    this.tribe.produceFoodPerDay = 0;
    this.tribe.foodNeeded = 0;
    this.tribe.food = 0

    //this.peoplesAlive = this.peoples.filter(person => person.alive);
    this.peoplesWithActionToday = this.peoplesAlive.filter(person => { return person.myActionDay && person.myActionDay.getDate() == this.curDate.getDate() })
    //console.log('people with actions today :' + this.peoplesWithActionToday.length);

    this.peoplesAlive.forEach(person => {
      if (person.health <= 0) {
        this.populationService.kill(person);

        this.tribe.food += person.produceFoodPerDay;
      }
    });

    this.peoplesWithActionToday.forEach(person => {
      if (person.isChild) return;
      if (!person.work) {
        this.tribe.assignForWork(person)
      } else if (!person.spouse) {
        this.tribe.findMatchFor(person);
      } else
        if (person instanceof Female) {
          let woman: Female = person as Female;

          if (woman.unbornFetus) {
            if (woman.unbornFetus.age < 0) {
              woman.unbornFetus.age++;
            } else {
              if (woman.fertility == woman.spouse.fertility) {
                console.log(' get TWEENS!!');
              }

              let newBaby: Person = Object.assign({}, woman).unbornFetus;
              this.populationService.addNewPersonToWorld(newBaby);
              woman.unbornFetus = null;

              woman.haveNewChild(newBaby);
              woman.spouse.haveNewChild(newBaby);

              woman.addLifeEvent('Gave birth to ' + newBaby.firstName);
              woman.spouse.addLifeEvent('Have new Child : ' + newBaby.firstName);
            }
          } else {
            //et gotPregnant: boolean = woman.gotPregnant();

            if (!woman.isChild && woman.spouse) {
              woman.haveSex();
            }
          }
        }
    })


    let foodForEach = Math.floor(this.tribe.food / this.peoplesAlive.length);

    this.peoplesAlive.forEach(person => {
      person.currentDate = this.curDate;
      //if (!person.isChild && !person.work) this.tribe.assignForWork(person)
      this.tribe.produceFoodPerDay += person.produceFoodPerDay;
      this.tribe.foodNeeded += person.caloriesNeededPerDay

      this.tribe.food -= Math.min(foodForEach, person.caloriesNeededPerDay);

      if (foodForEach < person.caloriesNeededPerDay) {

      }
    });
  }

  newMonth() {

    this.peoplesAlive.forEach(person => {

      person.myActionDay = new Date()
      person.myActionDay.setFullYear(this.curDate.getFullYear(), this.curDate.getMonth())
      person.myActionDay.setDate(UtilsService.randomNumber(0, 31));
    })
  }

  newYear() {
    this.peoplesAlive.forEach(person => { person.age++ });
  }




  onDialogHide() {
    //this.time.pause=false;
    this.selectedPerson = null;
    this.selectedPersons = null;
  }

  personInfoSelected(event: any) {

    this.selectedPersons = event.persons;
    this.selectedPerson = event.person;

    switch (event.info) {
      case 'id':
        this.displayDialog = true;
        break;

      case 'genome':
        this.displayDialog2 = true;
        break;
      case 'person':
      case 'person-kids':
        this.displayDialog3 = true;
        break;

      case 'history':
        this.displayDialog4 = true;
        break;
    }
  }

  showSpouse(person: Person) {
    this.selectedPerson = person;
    this.displayDialog3 = true;
  }


}
