import { Person } from '../life/person';
export class Tribe {

    name: string;
    familes: string[];
    names: any;
    peoples: Person[] = [];

    constructor(data: any) {
        this.name = data.tribe;
        this.familes = data.familes;
        this.names = data.names;
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
