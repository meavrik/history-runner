import { House } from './buildings/house';
import { Person } from "app/life/person";
import { Chromosome } from '../life/chromosome';
import { UtilsService } from '../services/utils.service';
import { Female } from '../life/person.female';
import { Male } from 'app/life/person.male';
import { Family } from '../life/family';

export class Tribe {
    mine: boolean;
    king: Person;
    name: string;
    famileNames: string[];
    names: any;
    peoples: Person[] = [];
    peoplesAlive: Person[]
    womans: Person[] = []
    mans: Person[] = []
    kids: Person[] = []
    employed: Person[] = [];
    unemployed: Person[] = [];
    resources: any[];
    gold: number;
    food: number;
    isRoyal: boolean;
    scienePoints: number;
    constructionPoints: number;

    houses: House[] = [];
    actions: any[] = [];

    produceFoodPerDay: number;
    foodNeeded: number;

    familes:Family[]=[];

    constructor(data: any) {
        this.name = data.tribe;
        this.famileNames = UtilsService.shuffle(data.familes);
        this.names = data.names;
        //this.food = 500;
    }

    selectAKing() {

        let kandidates: Person[] = this.peoples.filter(person => person.sex == 'male')
        if (!kandidates || !kandidates.length) return;

        let mostFit: Person = kandidates[0]
        kandidates.forEach(person => {
            let cha1: Chromosome = person.genome.getChromosomeByName('cha')
            let cha2: Chromosome = mostFit.genome.getChromosomeByName('cha')

            if (cha1 && cha2 && person != mostFit && cha1.value > cha2.value) {

                mostFit = person;
            }
        })

        if (mostFit) {
            mostFit.isRoyal = true;
            this.king = mostFit;
        }

    }

    assignForWork(person: Person) {
        //this.unemployed = this.peoples.filter(person => person.work)

        if (this.food <= 5000) {
            person.work = { type: 'food' };
            return
        }

        person.work = { type: 'build' };
    }

    generateFirstName(person: Person): string {
        let name: string;
        let namesDB: string[] = person.sex == "male" ? this.names.male : this.names.female;
        do {
            name = namesDB[Math.floor(Math.random() * namesDB.length)];
        } while ((person.father && name == person.father.firstName) || (person.mother && name == person.mother.firstName))
        return name;
    }

    generateLastName(father: Person): string {
        if (father && father.lastName) {
            return father.lastName
        } else
        //return this.familes[Math.floor(Math.random() * this.familes.length)];
        {
            let fatherName: string = father.firstName ? father.firstName : this.generateFirstName(father)
            return this.famileNames.length ? this.famileNames.pop() : 'Ben-' + fatherName;

        }

    }

    newDay(curDate: Date) {
        this.peoplesAlive = this.peoples.filter(person => person.alive);
        this.produceFoodPerDay = 0;
        this.foodNeeded = 0;
        this.food = 0
        this.peoplesAlive.forEach(person => {
            this.food += person.produceFoodPerDay;
        });

        let foodForEach = Math.floor(this.food / this.peoplesAlive.length);

        this.peoplesAlive.forEach(person => {
            person.currentDate = curDate;
            if (!person.isChild && !person.work) this.assignForWork(person)
            this.produceFoodPerDay += person.produceFoodPerDay;
            this.foodNeeded += person.caloriesNeededPerDay

            this.food -= Math.min(foodForEach, person.caloriesNeededPerDay);
            /* if (this.food <= 0) {
                this.food = 0;
            } */

            if (foodForEach < person.caloriesNeededPerDay) {
                //console.info(person.fullName + "don't hanve enough food!!!")
            }
        });

        //this.food += this.produceFoodPerDay;
    }

    newMonth() {

    }

    findMatchFor(me: Person) {
        if (!me.availableForMatch) return;

        let theOne: Person;
        let foundMatches: Person[] = [];
        let bestMatch: Person;
        let bestLoveFactor: number = 0;
        let loveFactorFound: number

        if (!me.optionalMatches) {
            me.optionalMatches = this.getPersonOptionalMatches(me);
        }

        if (me.optionalMatches.length == 0) {
            if (me.myLoveFactor > 10) {
                me.myLoveFactor--;
            }

            me.optionalMatches = this.getPersonOptionalMatches(me);
        }

        if (me.optionalMatches.length) {
            //let removeArr: Person[] = [];
            //let index: number = Math.round(Math.random() * me.optionalMatches.length - 1);
            let randomMatch: Person = me.optionalMatches.pop();
            //me.optionalMatches.forEach(person => {
            loveFactorFound = me.isInloveWith(randomMatch);

            if (loveFactorFound >= me.myLoveFactor) {
                me.addLifeEvent('Fall inlove with ' + randomMatch.fullName);
                this.announce(`${me.fullName} Fall inlove ${loveFactorFound}% with '${randomMatch.fullName}`);

                let otherLoveFactor: number = randomMatch.isInloveWith(me)
                if (otherLoveFactor >= randomMatch.myLoveFactor) {

                    me.spouseLove = loveFactorFound;
                    randomMatch.spouseLove = otherLoveFactor;

                    this.announce(`${me.fullName} (${me.spouseLove}% love) AND ${randomMatch.fullName}(${randomMatch.spouseLove}% love) fall inlove with eachother! :)`, 1);
                    let bride: Female;
                    let groom: Male;

                    if (me instanceof Female) {
                        bride = me as Female;
                        groom = randomMatch as Male;
                    } else {
                        bride = randomMatch as Female;
                        groom = me as Male;
                    }

                    this.marrie(bride, groom);
                } else {
                    this.announce(`${randomMatch.fullName} turned ${me.fullName} off (${otherLoveFactor}%) :(`);

                    if (otherLoveFactor < 10) {
                        //me.optionalMatches.splice(me.optionalMatches.indexOf(found), 1);
                        if (randomMatch.optionalMatches && randomMatch.optionalMatches.length) randomMatch.optionalMatches.splice(randomMatch.optionalMatches.indexOf(me), 1);
                        //removeArr.push(found);
                    }
                }






                //foundMatches.push(randomMatch);
            } else if (loveFactorFound < 10) {
                //me.optionalMatches.splice(me.optionalMatches.indexOf(person), 1);

                //removeArr.push(randomMatch);
            }
            //});

            //foundMatches.forEach(found => {

            //})

            /* removeArr.forEach(item => {
                me.optionalMatches.splice(me.optionalMatches.indexOf(item), 1);
            }) */

            /* if (me.myLoveFactor > 10) {
                me.myLoveFactor--;
            } */
            //return found;
        }
    }

    getPersonOptionalMatches(me: Person): Person[] {
        let matches: Person[] = this.peoples.filter(person => {
            return person.availableForMatch && person.sex != me.sex && me.isFamilyMember(person) && !person.isChild
        })

        matches = UtilsService.shuffle(matches);
        return matches;
    }

    marrie(female: Female, male: Male) {
        let newFamily:Family = new Family();
        this.familes.push(newFamily);
        
        newFamily.addMember(male);
        newFamily.addMember(female);
        female.spouse = male;
        male.spouse = female;
        female.addLifeEvent('Got married with ' + male.fullName);
        male.addLifeEvent('Got married with ' + female.fullName);

        female.maidenName = male.lastName;
        female.lastName = male.lastName;

        this.announce(female.firstName + ' and ' + male.firstName + ' GOT MARRIED');
    }


    announce(str, status: number = 0) {
        if (this.mine) {
            switch (status) {
                case 1:
                    console.warn(str);
                    break;

                default:
                    console.info(str);
                    break;
            }

        }
    }

}
