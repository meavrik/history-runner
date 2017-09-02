import { House } from './../tribe/buildings/house';

import { Chromosome } from 'app/life/chromosome';
import { Genome } from './genome';
import { Tribe } from '../tribe/tribe';
import { UtilsService } from '../services/utils.service';
import { PopulationService } from '../services/population.service';
import { Injectable, ReflectiveInjector } from '@angular/core';


export class Person {
    alive: boolean;
    _age: number;
    _health: number;
    tribe: Tribe;
    father: Person;
    mother: Person;
    _isRoyal: boolean;

    firstName: string = ""
    lastName: string = "";
    sex: string;
    genome: Genome;
    work: any;
    spouse: Person;
    childrens: Person[] = [];
    birthDate: Date;
    fertility: number;
    pregnant: number;
    job
    requireFood: number;
    education: number;
    happiness: number;
    maidenName: string = "";
    founder: boolean;
    generation: number;
    house: House;

    weight: number;
    height: number;

    constructor(tribe: Tribe = null, sex: string = 'male') {
        this.tribe = tribe;
        this.sex = sex;
    }

    born(parent1: Person = null, parent2: Person = null, age: number = 0) {
        this.age = age;
        if (age != 0) {
            this.founder = true;
            this.generation = 1;
            if (this.age > 13) this.fertility = UtilsService.randomNumber(20, 100);
            this.health = UtilsService.randomNumber(100 - this.age, 95);
        } else {
            this.weight = UtilsService.randomNumber(3, 4);
            this.height = UtilsService.randomNumber(40, 60);
            this.fertility = 0;
            this.health = 100;
            this.generation = Math.min(parent1.generation, parent2.generation);
            parent1.childrens.push(this);
            parent2.childrens.push(this);
        }

        this.father = parent1;
        this.mother = parent2;
        if (this.father.genome) {
            this.genome = new Genome(this.father.genome.chromosomesForReproduction, this.mother.genome.chromosomesForReproduction);
        } else {
            this.genome = new Genome()
        }
        
        this.sex = this.genome.chromosomes[6].value == 'x'?'female':'male';
        this.childrens = [];
        this.firstName = this.tribe.generateFirstName(this);
        this.lastName = this.tribe.generateLastName(this.father);
        this.alive = true;
        this.happiness = 100;
        this.isRoyal = (parent1.isRoyal || parent2.isRoyal) ? true : false;
        console.info(this.fullName + ' IS BORN!');
    }


    set isRoyal(value: boolean) {

        if (this._isRoyal != value) {
            if (this.spouse) this.spouse.isRoyal = value;
            this._isRoyal = value;

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
        let chromo: Chromosome = this.genome.getChromosomeByName('str')
        return chromo ? chromo.value : 0;
    }

    get myDexterety(): number {
        let chromo: Chromosome = this.genome.getChromosomeByName('dex')
        return chromo ? chromo.value : 0;
    }

    get myIntelgence(): number {
        return this.genome.getChromosomeByName('int').value
    }

    get myWisdom(): number {
        return this.genome.getChromosomeByName('wis').value
    }

    get availableForMatch(): boolean {
        if (this.spouse) return false;
        if (this.age < 13 || this.age > 60) return false;
        return true;
    }

    findMatch(): Person {
        //debugger
        let found: Person;
        if (!this.availableForMatch) return;

        let otherSexPersons: Person[] = this.tribe.peoples.filter(person => {
            return person.sex != this.sex && this.isFamilyMember(person)
        })

        otherSexPersons.forEach(person => {
            if (person.availableForMatch && this.isInloveWith(person)) {
                found = person;
            }
        })

        return found;
    }


    isInloveWith(other: Person): boolean {
        let inlove: boolean = false;

        if (!this.genome) {
            console.error('PROBLEM - no genome');
            return

        }
        this.genome.chromosomes.forEach((chromosome, index) => {
            let otherChromo: Chromosome = other.genome.chromosomes[index]
            if (otherChromo.type!="sex" && otherChromo.value >= chromosome.valueRangeForMatch.from &&
                otherChromo.value <= chromosome.valueRangeForMatch.to) {
 
                console.log(this.firstName + ' is looking for love');
                inlove = true;
            }

        })

        return inlove;
    }

    isFamilyMember(person): boolean {
        if (person == this.father || person == this.mother) return true;
        // if (this.father.childrens && this.father.childrens.indexOf(person) != -1) return true;
        //if (this.mother.childrens && this.mother.childrens.indexOf(person) != -1) return true;
        if (this.childrens && this.childrens.indexOf(person) == -1) return true;
        return false;
    }

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    getMarried(person: Person) {
        this.spouse = person;
        person.spouse = this;

        if (this.sex == "male") this.spouse.lastName = this.lastName;
        if (this.sex == "female") {
            this.maidenName = this.lastName;
            this.lastName = this.spouse.lastName;
        };

        console.info(this.firstName + ' and ' + person.firstName + ' GOT MARRIED');
    }

    tryToBringChild() {
        let rand = UtilsService.randomNumber(1, 100);

        if (rand <= this.fertility) {
            this.gotPregnant()
        }
    }

    gotPregnant() {
        this.pregnant = 1;
        console.info(this.fullName + ' GOT pregnant at age ' + this.age);

    }

    /* giveBirth() {
        this.populationService.generateNewPerson(this.father, this.mother)

    } */

    get canHaveChildren(): boolean {
        if (this.sex != "female") return false;
        if (this.pregnant) return false;
        if (this.fertility <= 0) return false;

        return true;
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

        if (this._age > 13) {
            let foundMatch: Person = this.findMatch();
            if (foundMatch) {
                this.getMarried(foundMatch);
            }
        }

        if (this._age < 18) {
            this.weight += 5;
            this.height += 5;
        }

        if (this._age > 25) {
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
        console.warn(this.fullName + ' HAS DIED! :( at the age of ' + this.age);

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
        if (this.sex == "male") {
            if (this.isChild) {
                return 1500;
            } else {
                return 2400;
            }
        } else if (this.sex == "female") {
            if (this.pregnant) {
                return 2400;
            }
            if (this.isChild) {
                return 1000;
            } else {
                return 1800;
            }
        }
    }


    get needs(): any[] {

        let needsArr = []
        if (!this.house) needsArr.push('house')
        if (!this.spouse) needsArr.push('love')

        return needsArr
    }
}
