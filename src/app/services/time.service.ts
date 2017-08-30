import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { PopulationService } from './population.service';

@Injectable()
export class TimeService {

  year: number = 100;
  month: number = 1;
  startTime: Boolean = false;
  _date: BehaviorSubject<Date> = <BehaviorSubject<Date>>new BehaviorSubject(null);
  _currentDate: Date;

  timer: Observable<number>;
  _pause: boolean = true;

  speed: number = 100;

  constructor(private populationService: PopulationService) {

    this.timer = Observable.timer(0, 10);
    this.timer.subscribe(t => {
      if (!this._pause) {

        let date: Date = new Date();

        date.setFullYear(this.year, this.month);
        if (!this.startTime) {
          this.startTime = true;
          date.setMonth(1);
          date.setDate(0)
        }

        this.month = date.getMonth();
        date.setDate(t);

        if (date.getDate() == 1) {
          this.populationService.newMonth();

          if (date.getMonth() == 0) {
            this.populationService.newYear();
          }
        }

        this._currentDate = date
        this._date.next(date);
      }
    });


    this.populationService.population.subscribe(population => {
      if (population && population.length) {
        population[population.length - 1].birthDate = this._currentDate;
      }

    })
  }

  startHistory() {
    this.pause = false;
  }

 /*  get currentDate(): Date {
    return this._currentDate;
  } */

  get date(): Observable<Date> { return this._date.asObservable() }

  set pause(value: boolean) {
    this._pause = value;
  }

  get pause(): boolean {
    return this._pause
  }
}
