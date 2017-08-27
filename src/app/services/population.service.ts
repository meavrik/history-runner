import { Injectable } from '@angular/core';
import { Person } from '../life/person';
import { Chromosome } from "app/life/chromosome";
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Genome } from '../life/genome';
import { Tribe } from '../tribe/tribe';
import { UtilsService } from './utils.service';

const tribesDB: any[] = [
  {
    tribe: 'Hobbit',
    familes: [
      'Brandybuck',
      'Chubb',
      'Grubb',
      'Took',
      'Goold',
      'Goodchild',
      'Smallburrow',
      'Bolger',
      'Sackville',
      'Baggins',
      'Tûk',
      'Hogpen',
      'Sandheaver',
      'Oldbuck',
      'Tunnelly',
      'Gammidge',
      'Maggot',
      'Bracegirdle',
      'Clayhanger',
      'Zaragamba',
      'Brockhouse',
      'Sandheaver',
      'Banks'
    ],
    names: {
      male: ['Sadoc', 'Posco', 'Folcard', 'Melampus', 'Hal', 'Dinodas', 'Odo', 'Gerontius', 'Roper', 'Marcus', 'Isembold', 'Minto', 'Madoc', 'Hildigard', 'Chilimanzar'],
      female: ['Primula', 'Cara', 'Maxima', 'Matilda', 'Pamphila', 'Poppy', 'Rose', 'Yolanda', 'Diamanda', 'Donnamira', 'Rosamunda', 'Camelia', 'Fatima', 'Celendine']
    }
  },
  {
    tribe: 'Klingon',
    familes: [
      'Gordek',
      'Koru',
      'Kommora',
      'Edronh',
      'Simparri',
      'Olahg',
      'Quark',
      'Boral',
      'Gura',
      'Trisra',
      'Gowr',
      'Torghn',
      'Simpalla',
      'Napos',
      'Vallic',
      'Rajuc',
      'Neygebh',
      "Qua'lon",
      'Wulfek',
      'Kotzher',
      'Furstig',
      "K'mpec",
      "Torin"
    ],
    names: {
      male: ['Kheyl', "Ka'As", 'Torak', "M'Kita", "L'Kraka", 'Dukath', 'Karagg', 'Klynn', 'Kraden', 'Korus', 'Konjah', "Kaa'lak", "Tel'peh", "Ch'targh", 'Angghal'],
      female: ['Leskit', "G'Mira", "K'leela", "M'Kola", "Ch'Mira", "D'Lij", "J'Eval", "T'Mara", "G'Kara", 'Kintata', "R'Mara", 'Kezhke', "D'Lij", 'Aperokei']
    }
  },
  {
    tribe: 'Hebrew',
    familes: [
      'Cohen',
      'Levi',
      'Shabat',
      'Baroh',
      'Ben-$',
      'Israel',
      'Dov',
    ],
    names: {
      male: ['Avraham', 'Yosef', 'Dan', 'Yakov', 'Shoul', 'Alon', 'Dor', 'Moshe', 'Naftali', 'Oren', 'Itzhak', 'Youda', 'Israel', 'Kalev', 'Shmoel'],
      female: ['Rachel', 'Leah', 'Dana', 'Sara', 'Miryam', 'Dafna', 'Vered', 'Ester', 'Neomi', 'Sarai', 'Revka', 'Bat-sheva', 'Dvora', 'Hagar']
    }
  }
]

@Injectable()
export class PopulationService {
  _population: BehaviorSubject<Person[]> = <BehaviorSubject<Person[]>>new BehaviorSubject([]);
  peoples: Person[] = [];
  peoplesAlive: Person[] = [];
  tribes: Tribe[] = []

  constructor() {
    tribesDB.forEach(tribeData => {
      this.tribes.push(new Tribe(tribeData));
    })

    this.population.subscribe(people => {
      this.tribes.forEach(tribe => {
        tribe.peoples = people.filter(person => person.tribe.name == tribe.name);
      })
    })
  }

  get population(): Observable<Person[]> { return this._population.asObservable() }

  generateNewPerson(parent1: Person, parent2: Person, age: number = 0) {

    let person: Person = new Person();

    person.tribe = parent1.tribe ? parent1.tribe : this.tribes[Math.floor(Math.random() * this.tribes.length)];
    person.age = age;
    if (person.age > 13) person.fertility = UtilsService.randomNumber(20, 100);
    if (person.age > 30) person.health = UtilsService.randomNumber(100 - person.age, 95);
    person.born(parent1, parent2);

    parent1.childrens.push(person);
    parent2.childrens.push(person);

    //person.tribe.peoples.push(person)
    this.peoples.push(person);
    this._population.next(this.peoples);
  }

  newMonth() {
    this.peoplesAlive = this.peoples.filter(person => person.alive);
    this.peoplesAlive.forEach(person => {

      if (person.health <= 0) {
        this.kill(person);
      }
      if (person.canHaveChildren && person.spouse) {
        person.tryToBringChild();
      } else {
        if (person.pregnant) {
          if (person.pregnant >= 10) {
            person.pregnant = 0;
            this.generateNewPerson(person.spouse, person);

          } else {
            person.pregnant++;
          }
        }
      }
    })
  }

  newYear() {
    this.peoplesAlive.forEach(person => { person.age++ });
  }

  kill(person: Person) {
    person.die();

    this.peoples.splice(this.peoples.indexOf(person), 1);
    this._population.next(this.peoples);
  }

}
