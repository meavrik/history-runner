import { Person } from 'app/life/person';
import { Tribe } from '../tribe/tribe';
import { Female } from './person.female';
import { Genome } from './genome';

export class Male extends Person {
    constructor(father: Male, mother: Female, genome: Genome) {
        super(father,mother,genome);
        this.sex = 'male';
    }


    get caloriesNeededPerDay(): number {
        if (this.isChild) {
            return 1500;
        } else {
            return 2400;
        }
    }
}