import { Person } from 'app/life/person';
import { UtilsService } from '../services/utils.service';
import { Genome } from './genome';
import { CharAttributes } from 'app/life/attributes.enum';
import { Male } from "app/life/person.male";
import { Tribe } from '../tribe/tribe';

export class Female extends Person {
    //pregnant: number;
    maidenName: string = "";
    unbornFetus: Person;

    constructor(father: Person, mother: Person) {
        
        super(father, mother)
        this.sex = 'female';
    }

    /* tryToBringChild() {
        let maleFertilityTest = UtilsService.randomNumber(1, 100);
        let femaleFertilityTest = UtilsService.randomNumber(1, 100);

        if (femaleFertilityTest <= this.fertility && maleFertilityTest <= this.spouse.fertility) {
            this.gotPregnant();
        }
    } */

    gotPregnant():boolean {
        if (this.unbornFetus) return false;
        if (this.fertility <= 0) return false;
        if (!this.spouse) return false;

        let maleFertilityTest = UtilsService.randomNumber(1, 100);
        let femaleFertilityTest = UtilsService.randomNumber(1, 100);

        if (femaleFertilityTest <= this.fertility && maleFertilityTest <= this.spouse.fertility) {
            let genome: Genome = new Genome(this.spouse.genome.chromosomes, this.genome.chromosomes);
            this.unbornFetus = genome.getChromosomeByName(CharAttributes.SEX).value == 'y' ? new Male(this, this.spouse) : new Female(this, this.spouse);
            this.unbornFetus.age = -9;
            //this.pregnant = 1;
            this.announce(this.fullName + ' GOT pregnant at age ' + this.age);
            return true;
        }

        return false;
    }

    /* get canHaveChildren(): boolean {

        if (this.unbornFetus) return false;
        if (this.fertility <= 0) return false;

        return true;
    } */
}