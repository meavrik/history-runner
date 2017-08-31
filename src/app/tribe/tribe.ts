import { House } from './buildings/house';
import { Person } from "app/life/person";
import { Chromosome } from '../life/chromosome';
import { UtilsService } from '../services/utils.service';

export class Tribe {
    king: Person;
    name: string;
    familes: string[];
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

    constructor(data: any) {
        this.name = data.tribe;
        this.familes = UtilsService.shuffle(data.familes);
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
            return this.familes.length ? this.familes.pop() : 'Ben-' + fatherName;

        }

    }

    newDay() {
        this.peoplesAlive = this.peoples.filter(person => person.alive);
        this.produceFoodPerDay = 0;
        this.foodNeeded = 0;
        this.food = 0
        this.peoplesAlive.forEach(person => {
            this.food += person.produceFoodPerDay;
        });

        let foodForEach = Math.floor(this.food / this.peoplesAlive.length);

        this.peoplesAlive.forEach(person => {

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

    produceFoodPerDay: number;
    foodNeeded: number
}
