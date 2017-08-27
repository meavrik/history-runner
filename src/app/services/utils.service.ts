import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  public static randomNumber(from: number, to: number):number {
    return Math.round(Math.random() * (to-from)) + from;
  }
}
