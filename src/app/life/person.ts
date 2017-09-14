import { BehaviorSubject } from 'rxjs/Rx';
import { House } from './../tribe/buildings/house';
import { Chromosome } from 'app/life/chromosome';
import { Genome } from './genome';
import { Tribe } from '../tribe/tribe';
import { UtilsService } from '../services/utils.service';
import { PopulationService } from '../services/population.service';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { CharAttributes } from "app/life/attributes.enum";
import { TimeService } from '../services/time.service';
import { CharAttributeTypes } from './attributes.enum';
import { Male } from 'app/life/person.male';
import { Female } from './person.female';
import { Family } from './family';
import { Observable } from "rxjs/Observable";

interface IWork {
    type: string;
}
interface ILifeEvent {
    event: string;
    date: Date;
}

export abstract class Person {
    currentDate: Date;
    alive: boolean;
    _age: number;
    _health: number;
    tribe: Tribe;
    family: Family;
    father: Male;
    mother: Female;
    _isRoyal: boolean;

    firstName: string = ""
    lastName: string = "";
    sex: string;
    genome: Genome;
    work: IWork;
    spouse: Person;
    spouseLove: number = 0;
    childrens: Person[] = [];
    birthDate: Date;
    fertility: number = 0;

    requireFood: number;
    education: number;
    happiness: number;

    founder: boolean;
    generation: number;
    house: House;

    weight: number;
    height: number;

    myLifeEvents: ILifeEvent[] = [];

    optionalMatches: Person[];
    myLoveFactor: number;
    condition: boolean;



    _kids: BehaviorSubject<Person[]> = <BehaviorSubject<Person[]>>new BehaviorSubject([]);
    get kids(): Observable<Person[]> { return this._kids.asObservable() }

    constructor(father: Male, mother: Female, genome: Genome) {
        this.father = father;
        this.mother = mother;
        this.myLoveFactor = UtilsService.randomNumber(10, 60)

        if (this.father) {
            this.tribe = this.father.tribe;
            /* if (this.father.genome) {     
                this.genome = new Genome(this.father.genome.chromosomesForReproduction, this.mother.genome.chromosomesForReproduction);
            } else {
                
            } */
        }

        /* if (!this.genome) {
            this.genome = new Genome();
        } */

        this.genome = genome;
    }

    createAsAdult(age: number) {
        this.setAlive();
        this._age = age;
        this.founder = true;
        this.generation = 1;
        if (this.age > 13) this.fertility = UtilsService.randomNumber(20, 100);
        this.health = UtilsService.randomNumber(100 - this.age, 95);
        this.weight = this.genome.max_weight;
        this.height = this.genome.max_height;
    }

    born() {
        this.setAlive();
        this._age = 0;
        this.weight = UtilsService.randomNumber(3, 4);
        this.height = UtilsService.randomNumber(40, 60);
        this.fertility = 0;

        let birthHealth = UtilsService.randomNumber(-20, 100);

        this.health = birthHealth < 0 ? Math.abs(birthHealth) : 100;
        if (this.genome.constitution) {

        }

        this.generation = Math.min(this.father.generation, this.mother.generation);
        //this.father.childrens.push(this);
        //this.mother.childrens.push(this);

        if (this.mother.family) {
            this.family = this.mother.family
            this.family.addMember(this);
        }

        //this.isRoyal = (this.father.isRoyal || this.mother.isRoyal) ? true : false;
        this.addLifeEvent('Birthday')
        //console.info(this.fullName + ' IS BORN!');
        this.announce('New BABY, by the name of ' + this.fullName + ' IS BORN!');

        /* this.genome.chromosomes.forEach(chromosome => {
            if (chromosome.value == 1) {
                this.condition = true;
            }
        }) */
    }

    setAlive() {
        this.firstName = this.tribe.generateFirstName(this);
        this.lastName = this.tribe.generateLastName(this.father);
        this.alive = true;
        this.happiness = 100;
    }


    addLifeEvent(name: string) {
        this.myLifeEvents.push({ event: name, date: this.currentDate });
    }

    set isRoyal(value: boolean) {

        if (this._isRoyal != value) {
            this._isRoyal = value;
            if (this.spouse) this.spouse.isRoyal = value;
            this.childrens.forEach(kid => kid.isRoyal = value)
        }
    }

    get isRoyal(): boolean {
        return this._isRoyal;
    }

    get isHeadOfHouse(): boolean {
        if (this.sex == "male" && this.spouse) return true;

        return false;
    }

    get produceWorkForcePerDay(): number {
        if (this.work && this.work.type == 'build') {
            return 5000 + (this.myStrength * 10) + (this.myDexterety * 5)
        }
        return 0;
    }

    get produceFoodPerDay(): number {
        if (this.work && this.work.type == 'food') {
            return 2500 + (this.myStrength * 10) + (this.myDexterety * 5)
        }
        return 0;
    }

    get produceSiencePerDay(): number {
        if (this.work && this.work.type == 'sience') {
            return 5000 + (this.myIntelgence * 10) + (this.myWisdom * 5)
        }
        return 0;
    }

    get myStrength(): number {

        //let chromo: Chromosome = this.genome.getChromosomeByName(CharAttributes.STRENGTH);
        let value: number = this.genome.strength
        if (this.sex == 'male') {
            value += 1;
        }
        return value;
    }

    get myDexterety(): number {
        //let chromo: Chromosome = this.genome.getChromosomeByName(CharAttributes.DEXTERITY)
        return this.genome.dexterity;
    }

    get myIntelgence(): number {
        //let chromo: Chromosome = this.genome.getChromosomeByName(CharAttributes.INTELLIGENCE)
        return this.genome.intelligent;
    }

    get myWisdom(): number {
        //let chromo: Chromosome = this.genome.getChromosomeByName(CharAttributes.WISDOM)
        return this.genome.wisdom;
    }

    get availableForMatch(): boolean {
        if (this.spouse) return false;
        if (this.age < 13 || this.age > 60) return false;
        return true;
    }

    isInloveWith(other: Person): number {
        let inlove: boolean = false;

        if (!this.genome) {
            console.error('PROBLEM - no genome');
            return
        }

        let matches: number = 0;

        this.genome.chromosomes.forEach((chromosome, index) => {
            if (chromosome.type == CharAttributeTypes.CHARACTER) {
                let otherChromo: Chromosome = other.genome.chromosomes[index]
                if (
                    otherChromo.value >= chromosome.valueRangeForMatch.from &&
                    otherChromo.value <= chromosome.valueRangeForMatch.to) {
                    matches++;
                }
            }
        })
        let inlovePercent: number = Math.round(matches * 100 / 6);
        if (inlovePercent >= 50) {
            //console.log('inlove = ' + inlovePercent + "%");
            inlove = true;
        }

        return inlovePercent;
    }

    isFamilyMember(person): boolean {
        if (person == this.father || person == this.mother) return true;
        if (this.father && this.father.childrens && this.father.childrens.indexOf(person) != -1) return true;
        if (this.mother && this.mother.childrens && this.mother.childrens.indexOf(person) != -1) return true;
        if (this.childrens && this.childrens.indexOf(person) == -1) return true;
        return false;
    }

    announce(str) {
        if (this.tribe.mine) {
            console.info(str);
        }
    }

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
        if (!this.alive) return;

        if (this._age > 12 && this._age <= 30 && this.fertility < 100) {
            this.fertility += UtilsService.randomNumber(1, 10);
            if (this.fertility > 100) this.fertility = 0;
        } else if (this.fertility > 0) {
            this.fertility -= UtilsService.randomNumber(1, 10);
            if (this.fertility < 0) this.fertility = 0;
        }

        /* if (this._age > 13) {
            let foundMatch: Person = this.findMatch();
            if (foundMatch) {
                this.getMarried(foundMatch);
            }
        } */


        if (this.weight < this.genome.max_weight) {
            this.weight += UtilsService.randomNumber(1, 5);
        }

        if (this.height < this.genome.max_height) {
            this.height += UtilsService.randomNumber(5, 8);
        }


        if (this._age > 25 || this.genome.constitution < 5) {
            this.health -= UtilsService.randomNumber(0, 5);
        }
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    die() {
        if (this.family) this.family.removeMember(this);
        console.warn(this.fullName + ' HAS DIED! :( at the age of ' + this.age);
        this.addLifeEvent('Died');
        this.alive = false;
    }

    get isChild(): boolean {
        return this.age < 13 ? true : false;
    }

    get isInfant(): boolean {
        return this.age < 3 ? true : false;
    }

    get isHomeless(): boolean {
        return this.house ? false : true;
    }

    get caloriesNeededPerDay(): number {

        return 1000;
    }


    get needs(): any[] {

        let needsArr = []
        if (!this.house) needsArr.push('house')
        if (!this.spouse) needsArr.push('love')

        return needsArr
    }


    haveNewChild(person:Person) {
        this.childrens.push(person);
        this._kids.next(this.childrens);
    }
}
