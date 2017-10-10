import { Injectable } from '@angular/core';
import { Person } from 'app/life/person';
import { Family } from '../life/family';
import { Tribe } from '../tribe/tribe';

export const ADD_PERSON: string = "ADD_PERSON"
export const KILL_PERSON: string = "KILL_PERSON"


export interface Action {
  type: string;
  payload?: any;
}



interface ListenerCallback {
  (): void;
}

interface UnsubscribeCallback {
  (): void;
}


export interface AppState {
  //tribes: Tribe[],
  peoples: Person[],
  //familes: Family[],
}

export interface Reducer {
  (state: AppState, action: Action): AppState;
}

const addNewPerson: Action = { type: ADD_PERSON }
const killPerson: Action = { type: KILL_PERSON }

@Injectable()
export class StoreService {
  private _state: AppState;
  private _listeners: ListenerCallback[] = [];

  initialState: AppState = {
    peoples: [],
    //familes: [],
    //tribes: []
  }



  constructor() {
    this._state = this.initialState;
  }

  reducer: Reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
      case ADD_PERSON:
        return {
          peoples: [...state.peoples, action.payload]
        };

      case KILL_PERSON:
        return {
          peoples:state.peoples
        };

      default: return state;
    }
  }
  getState(): AppState {
    return this._state;
  }

  dispatch(action: Action): void {
    this._state = this.reducer(this._state, action);
    this._listeners.forEach((listener: ListenerCallback) => listener());
  }

  subscribe(listener: ListenerCallback): UnsubscribeCallback {
    this._listeners.push(listener);
    return () => { // returns an "unsubscribe" function
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }
}
