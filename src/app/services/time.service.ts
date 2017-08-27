import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { PopulationService } from './population.service';

@Injectable()
export class TimeService {

  year: number = 0;
  month: number = 1;
  startTime: Boolean = false;
  _date: BehaviorSubject<Date> = <BehaviorSubject<Date>>new BehaviorSubject(null);
  _currentDate: Date;


  constructor(private populationService: PopulationService) {

    let timer = Observable.timer(0, 10);
    timer.subscribe(t => {

      let date: Date = new Date();

      date.setFullYear(this.year, this.month);
      if (!this.startTime) {
        this.startTime = true;
        date.setMonth(1);
        date.setDate(0)
      }

      /* console.log('11111 ' +date.getDate());
      if (date.getDate() == 1 && date.getMonth() == 0) {
        console.log('11111');
        
        this.year++;
        this.populationService.peoples.forEach(person => person.age++);
        debugger
      } */
      this.month = date.getMonth();
      date.setDate(t);

      if (date.getDate() == 1) {
        //this.newMonth(date.getMonth() == 0);
        this.populationService.newMonth();

        if (date.getMonth() == 0) {
          this.populationService.newYear();
        }
        /* if (date.getFullYear() > 0 && date.getMonth() == 0) {
          //this.year++;
          this.newYear();
        } */
      }

      this._currentDate = date
      this._date.next(date);
    });


    this.populationService.population.subscribe(population => {
      if (population && population.length) {
        population[population.length - 1].birthDate = this._currentDate;
      }
      
    })
  }

  /* newMonth(newYear:boolean=false) {
    this.populationService.peoples.forEach(person => {
      person.setNewMonth();

      if (newYear) {
        person.setNewYear();
      }
    });
  }

  newYear() {
    
  } */

  get date(): Observable<Date> { return this._date.asObservable() }


}
