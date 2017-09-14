import { Person } from 'app/life/person';
import { UtilsService } from '../services/utils.service';
import { Genome } from './genome';
import { CharAttributes } from 'app/life/attributes.enum';
import { Male } from "app/life/person.male";
import { Tribe } from '../tribe/tribe';

export class Female extends Person {

    maidenName: string = "";
    unbornFetus: Person;

    constructor(father: Male, mother: Female, genome: Genome) {

        super(father, mother, genome)
        this.sex = 'female';

    }

    gotPregnant(): boolean {
        if (this.unbornFetus) return false;
        if (this.fertility <= 0) return false;
        if (!this.spouse) return false;

        let maleFertilityTest = UtilsService.randomNumber(1, 100);
        let femaleFertilityTest = UtilsService.randomNumber(1, 100);

        if (femaleFertilityTest <= this.fertility && maleFertilityTest <= this.spouse.fertility) {
            //let genome: Genome = new Genome(this.spouse.genome.chromosomes, this.genome.chromosomes);
            let genome: Genome = new Genome(this.spouse.genome.chromosomesForReproduction, this.genome.chromosomesForReproduction);
            //this.unbornFetus = genome.getChromosomeByName(CharAttributes.SEX).value == 'y' ? new Male(this, this.spouse as Female) : new Female(this, this.spouse as Female);
            this.unbornFetus = genome.sex == 'male' ? new Male(this, this.spouse as Female, genome) : new Female(this, this.spouse as Female, genome);
            this.unbornFetus.age = -9;

            this.announce(this.fullName + ' GOT pregnant at age ' + this.age);
            return true;
        }

        return false;
    }

    get caloriesNeededPerDay(): number {
        if (this.unbornFetus) {
            return 2400;
        }
        if (this.isChild) {
            return 1000;
        } else {
            return 1800;
        }
    }
}