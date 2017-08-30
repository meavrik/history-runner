import { House } from './buildings/house';

import { Person } from "app/life/person";

export class Tribe {
    king: Person;
    name: string;
    familes: string[];
    names: any;
    peoples: Person[] = [];
    womans: Person[];
    mans: Person[];
    kids: Person[];
    employed: Person[] = [];
    unemployed: Person[] = [];
    resources: any[];
    gold: number;

    scienePoints: number;
    constructionPoints: number;


    houses: House[] = [];

    constructor(data: any) {
        this.name = data.tribe;
        this.familes = data.familes;
        this.names = data.names;
    }

    selectAKing() {
        let mostFit: Person;
        this.peoples.forEach(person => {
            if (!mostFit) { mostFit = person; } else
                if (person.genome.getChromosomeByName('chr').value > mostFit.genome.getChromosomeByName('cha').value) {
                    mostFit = person;
                }
        })

        this.king = mostFit;
    }

    assignForWork(person: Person) {
        this.unemployed = this.peoples.filter(person => person.job)
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
            return this.familes[Math.floor(Math.random() * this.familes.length)];
    }
}
