import { Injectable } from '@angular/core';
import { Chromosome } from "app/life/chromosome";
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Genome } from '../life/genome';
import { Tribe } from '../tribe/tribe';
import { UtilsService } from './utils.service';
import { Http } from "@angular/http";
import { TimeService } from './time.service';
import { Person } from 'app/life/person';
import { Male } from 'app/life/person.male';
import { Female } from '../life/person.female';
import { CharAttributes } from 'app/life/attributes.enum';
import { Family } from '../life/family';

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
      'Shalom',
      'Shemesh',
    ],
    names: {
      male: ['Avraham', 'Yosef', 'Dan', 'Yakov', 'Shoul', 'Alon', 'Dor', 'Moshe', 'Naftali', 'Oren', 'Itzhak', 'Youda', 'Israel', 'Kalev', 'Shmoel'],
      female: ['Rachel', 'Leah', 'Dana', 'Sara', 'Miryam', 'Dafna', 'Vered', 'Ester', 'Neomi', 'Sarai', 'Revka', 'Bat-sheva', 'Dvora', 'Hagar']
    }
  }
]

@Injectable()
export class PopulationService {
  _tribesBS: BehaviorSubject<Tribe[]> = <BehaviorSubject<Tribe[]>>new BehaviorSubject([]);
  _population: BehaviorSubject<Person[]> = <BehaviorSubject<Person[]>>new BehaviorSubject([]);
  _message: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(null);
  peoples: Person[] = [];
  familes: Family[] = [];
  peoplesAlive: Person[] = [];

  tribes: Tribe[];
  dataStore: any = {
    tribes: []
  }

  gameData: any;
  selectedTribe: Tribe;

  constructor(private http: Http) {
    //this.http.get('./assets/gameData.json').map(res => res.json()).subscribe(res => {
    // this.gameData = res;
    this.tribes = [];
    tribesDB.forEach(tribeData => {
      this.tribes.push(new Tribe(tribeData));
    })

    this._tribesBS.next(Object.assign({}, this).tribes);


    this.population.subscribe(people => {

      if (this.tribes) {

        this.tribes.forEach(tribe => {

          if (tribe) {
            tribe.peoples = people.filter(person => person.tribe.name == tribe.name);
            tribe.womans = tribe.peoples.filter(person => person.sex == "female");
            tribe.mans = tribe.peoples.filter(person => person.sex == "male");
            tribe.kids = tribe.peoples.filter(person => person.isChild);

            /* if (!tribe.king) {
              tribe.selectAKing()
            } */
          }
        })
      }

    })
  }

  initTribes(selectedTribe: string) {
    this.tribes.forEach(tribe => {
      const totalFounders: number = 12;
      if (tribe.name == selectedTribe) {
        tribe.mine = true;
      }

      for (var i = 0; i < totalFounders; i++) {
        let founderFather: Male = new Male(null, null, new Genome());
        founderFather.tribe = tribe;
        let founderMother: Female = new Female(null, null, new Genome());
        //let rand = Math.round(Math.random()) ? "x" : "y";

        //founderFather.genome.getChromosomeByName(CharAttributes.SEX).value = rand;
        /* founderMother.genome.fatherChromosomes[0].value = "x";
        founderMother.genome.motherChromosomes[0].value = "x";
        founderMother.genome.setMyGenome();

        founderFather.genome.fatherChromosomes[0].value = "y";
        founderFather.genome.motherChromosomes[0].value = "x";
        founderFather.genome.setMyGenome(); */

        let genome: Genome = new Genome(founderFather.genome.chromosomesForReproduction, founderMother.genome.chromosomesForReproduction);
        genome.fatherChromosomes[0].value = i % 2 == 0 ? 'x' : 'y';
        genome.motherChromosomes[0].value = 'x';
        genome.setMyGenome();

        let founder: Person = genome.sex == 'male' ? new Male(founderFather, founderMother, genome) : new Female(founderFather, founderMother, genome);

        this.addNewPersonToWorld(founder, false);

        if (i == (totalFounders - 1)) {
          tribe.selectAKing();
        }
      }
    })
  }

  get population(): Observable<Person[]> { return this._population.asObservable() }
  get tribesObservable(): Observable<Tribe[]> { return this._tribesBS.asObservable() }
  get message(): Observable<any> { return this._message.asObservable() }

  addNewPersonToWorld(person: Person, baby: boolean = true) {
    if (baby) {
      person.born();

      if (!person.tribe.kids.length) {
        this.alertNewMessage('First Born Baby to the ' + person.tribe.name + "'s", person.fullName + ' is the first born in our new tribe')
      }
    } else {
      person.createAsAdult(UtilsService.randomNumber(18, 30));
    }

    this.peoples.push(person);
    this._population.next(this.peoples);
  }

  newDay(curDate: Date) {
    this.tribes.forEach(tribe => {
      tribe.newDay(curDate)
    })
  }

  newMonth() {
    this.tribes.forEach(tribe => {
      tribe.newMonth()
    })

    this.peoplesAlive = this.peoples.filter(person => person.alive);
    this.peoplesAlive.forEach(person => {

      if (person.health <= 0) {
        this.kill(person);
      } else {

        if (!person.isChild && !person.spouse) {
          person.tribe.findMatchFor(person);
        }

        if (person instanceof Female) {
          let woman: Female = person as Female;
          let gotPregnant: boolean = woman.gotPregnant();

          if (!gotPregnant && woman.unbornFetus) {
            if (woman.unbornFetus.age < 0) {
              woman.unbornFetus.age++;
            } else {
              let newBaby: Person = Object.assign({}, woman).unbornFetus;
              this.addNewPersonToWorld(newBaby);
              woman.unbornFetus = null;
              woman.addLifeEvent('Gave birth to ' + newBaby.firstName);
              woman.spouse.addLifeEvent('Have new Child : ' + newBaby.firstName);

              
            }
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

  alertNewMessage(title: string, txt: string) {
    this._message.next({ title: title, content: txt });
  }

}
