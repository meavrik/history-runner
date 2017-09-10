import { Person } from 'app/life/person';
import { Tribe } from '../tribe/tribe';

export class Male extends Person {
    constructor(father: Person, mother: Person) {
        super(father,mother);
        this.sex = 'male';
    }
}