
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
    firstName: string = ""
    lastName: string = "";
    sex: string;
    genome: Genome;
    work: string;
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
    founder:boolean;
    generation:number;
    // populationService: PopulationService;

    constructor() {
        //let injector = ReflectiveInjector.resolveAndCreate([PopulationService]);
        //this.populationService = injector.get(PopulationService);
    }

    born(parent1: Person = null, parent2: Person = null) {
        this.father = parent1;
        this.mother = parent2;
        this.genome = (this.mother && this.mother.genome) ? new Genome(this.father.genome, this.mother.genome) : new Genome();
        this.fertility = 0;
        this.sex = Math.round(Math.random()) ? "male" : "female";
        //this.age = 0;
        this.health = 100;
        this.childrens = [];

        this.firstName = this.tribe.generateFirstName(this);
        this.lastName = this.tribe.generateLastName(this.father);
        this.alive = true;
        this.happiness = 100;
        console.info(this.fullName + ' IS BORN!');
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
            if (otherChromo.value >= chromosome.valueRangeForMatch.from &&
                otherChromo.value <= chromosome.valueRangeForMatch.to) {
                //debugger
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

    /* setNewMonth() {

        if (!this.alive) return;
        if (this.canHaveChildren && this.spouse) {
            this.tryToBringChild();
        } else {
            if (this.pregnant) {
                if (this.pregnant >= 10) {
                    this.pregnant = 0;
                    this.giveBirth();
                } else {
                    this.pregnant++;
                }
            }
        }
    }

    setNewYear() {
        if (!this.alive) return;
        this.age++;

        
    } */

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

        if (this._age > 12 && this._age <= 30 && this.fertility < 100) {
            this.fertility += UtilsService.randomNumber(1, 10);
            if (this.fertility > 100) this.fertility = 0;
        } else if (this.fertility > 0) {
            this.fertility -= UtilsService.randomNumber(1, 10);
            if (this.fertility < 0) this.fertility = 0;
        }

        if (this._age > 25) {
            this.health -= UtilsService.randomNumber(0, 5);
        }

        if (this._age > 13) {
            let foundMatch: Person = this.findMatch();
            if (foundMatch) {
                this.getMarried(foundMatch);
            }
        }

    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;

        /* if (this._health <= 0) {
            this.health = 0;
            this.die();
        } */
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
}
