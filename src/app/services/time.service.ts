import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { PopulationService } from './population.service';

@Injectable()
export class TimeService {

  year: number = 100;
  month: number = 0;
  startTime: Boolean = false;
  _date: BehaviorSubject<Date> = <BehaviorSubject<Date>>new BehaviorSubject(null);
  _currentDate: Date;

  timer: Observable<number>;
  _pause: boolean = true;

  _speed: number = 1000;
  _count: number = 0;

  timeout
  constructor(private populationService: PopulationService) {

    this._currentDate = new Date()
    this._currentDate.setFullYear(this.year, this.month, 1);

    //this.setTimer()

    //this.nextDay();
    this.populationService.population.subscribe(population => {
      if (population && population.length) {
        population[population.length - 1].birthDate = this._currentDate;
      }

    })
  }

  /* setTimer() {

    this.timer = null;
    this.timer = Observable.timer(0, this._speed)
    this.timer.takeWhile(pause => true).subscribe(t => {
      if (this._pause) return true;

      let date: Date = new Date();

      date.setFullYear(this.year, this.month);
      if (!this.startTime) {
        this.startTime = true;
        date.setMonth(1);
        date.setDate(0)
      }

      this.month = date.getMonth();
      this._count = t;
      date.setDate(t);

      this._currentDate = date;

      this.populationService.newDay();
      if (date.getDate() == 1) {
        this.populationService.newMonth();

        if (date.getMonth() == 0) {
          this.populationService.newYear();
        }
      }

      this._date.next(date);
    }
    );
  } */


  nextDay(timeout = 0) {
    this.clearTheTimeout()
    this.timeout = setTimeout(a => {

      let date: Date = new Date();

      date.setFullYear(this.year, this.month);
      if (!this.startTime) {
        this.startTime = true;
        date.setMonth(1);
        date.setDate(0)
      }

      this.month = date.getMonth();
      this._count++
      date.setDate(this._count);

      this._currentDate = date;

      

      /* if (date.getMonth() == 0) {
        this.populationService.newYear();
      }

      if (date.getDate() == 1) {
        this.populationService.newMonth(this._currentDate);
      }

      this.populationService.newDay(this._currentDate); */

      this._date.next(date);

      if (!this._pause)  this.nextDay(this._speed);
    }, timeout);
  }



  set speed(value: number) {
    
    this._speed = value;

    this.nextDay(this._speed)
  }

  clearTheTimeout() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }




  startHistory() {
    this.pause = false;
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  get date(): Observable<Date> { return this._date.asObservable() }

  set pause(value: boolean) {
    this._pause = value;

    if (value == false) {
      this.nextDay()
    } else {
      this.clearTheTimeout()
    }
  }

  get pause(): boolean {
    return this._pause
  }
}
