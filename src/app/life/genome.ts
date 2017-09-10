
import { Chromosome } from 'app/life/chromosome';
import { UtilsService } from '../services/utils.service';
import { CharAttributes } from 'app/life/attributes.enum';
import { CharAttributeTypes, MAX_ATTRIBUTE_VALUE } from './attributes.enum';

interface IChromosomeData {
    name: string;
    type: string;
}
interface IGenomeData {
    chromosomes: IChromosomeData[]
}
const genomeData: IGenomeData = {
    chromosomes: [
        { name: CharAttributes.SEX, type: CharAttributeTypes.SEX },

        { name: CharAttributes.STRENGTH, type: CharAttributeTypes.CHARACTER },
        { name: CharAttributes.DEXTERITY, type: CharAttributeTypes.CHARACTER },
        { name: CharAttributes.CONSTITUTION, type: CharAttributeTypes.CHARACTER },
        { name: CharAttributes.INTELLIGENCE, type: CharAttributeTypes.CHARACTER },
        { name: CharAttributes.WISDOM, type: CharAttributeTypes.CHARACTER },
        { name: CharAttributes.CHARISMA, type: CharAttributeTypes.CHARACTER },

        { name: CharAttributes.WEIGHT, type: CharAttributeTypes.MEASURES },
        { name: CharAttributes.HEIGHT, type: CharAttributeTypes.MEASURES },
    ]
}

//strength(כוח), dexterity(זריזות),Constitution(חוסן), intelligent,wisdom,charisma
/* const attributesCollection: string[] = [
    CharAttributes.STRENGTH,
    CharAttributes.DEXTERITY,
    CharAttributes.CONSTITUTION,
    CharAttributes.INTELLIGENCE,
    CharAttributes.WISDOM,
    CharAttributes.CHARISMA,
    CharAttributes.SEX,
    CharAttributes.WEIGHT,
    CharAttributes.HEIGHT,
]; */

interface Map<T> {
    [K: string]: T;
}

export class Genome {
    static totalAttValue: number = Math.round(Math.random() * 10) + 60;

    chromosomes: Chromosome[] = [];
    chromosomesDict: Map<Chromosome> = {};

    constructor(public fatherChromosomes: Chromosome[] = null, public motherChromosomes: Chromosome[] = null) {

        if (!this.fatherChromosomes) this.fatherChromosomes = this.generateParentGenome();
        if (!this.motherChromosomes) this.motherChromosomes = this.generateParentGenome();

        genomeData.chromosomes.forEach((chromosomeData, index) => {
            let newChromosome: Chromosome;
            let value;
            let fatherValue = this.fatherChromosomes[index].value
            let motherValue = this.motherChromosomes[index].value;

            switch (chromosomeData.type) {
                case CharAttributeTypes.SEX:
                    value = fatherValue;
                    break;
                case CharAttributeTypes.MEASURES:
                    let min = Math.min(fatherValue, motherValue);
                    let max = Math.min(fatherValue, motherValue);
                    value = UtilsService.randomNumber(min, max);
                    break;
                default:
                    if (fatherValue <= 0 && motherValue <= 0) {
                        value = 1;
                    } else if (fatherValue <= 0 || motherValue <= 0) {
                        value = Math.max(fatherValue, motherValue) * Math.abs(Math.min(fatherValue, motherValue))
                    } else {
                        value = Math.max(fatherValue, motherValue);
                    }
                    break;
            }


            newChromosome = new Chromosome(chromosomeData.name, value, chromosomeData.type);
            this.chromosomesDict[chromosomeData.name] = newChromosome;
            this.chromosomes.push(newChromosome);
        })
    }

    get chromosomesForReproduction(): Chromosome[] {

        let newChromosomesSet: Chromosome[] = [];
        let selectChromosome: Chromosome;

        genomeData.chromosomes.forEach((chromosomeData, index) => {
            selectChromosome = Math.floor(Math.random()) ? this.fatherChromosomes[index] : this.motherChromosomes[index]
            newChromosomesSet.push(selectChromosome);
        })

        return newChromosomesSet;
    }

    generateParentGenome(): Chromosome[] {
        let chromosomes: Chromosome[] = [];

        genomeData.chromosomes.forEach((chromosomeData, index) => {
            let value: any;
            switch (chromosomeData.type) {
                case CharAttributeTypes.SEX:
                    value = Math.round(Math.random()) ? 'x' : 'y';
                    break;
                case CharAttributeTypes.MEASURES:
                    value = UtilsService.randomNumber(140, 200);
                    break;
                default:
                    value = UtilsService.randomNumber(0, MAX_ATTRIBUTE_VALUE);
                    if (value == 0) value = -0.5;
                    if (value == 1) value = -1.5;
                    if (value == 2) value = -2;

                    break;
            }
            chromosomes.push(new Chromosome(chromosomeData.name, value))
        })

        return chromosomes;
    }

    getChromosomeByName(name: string): Chromosome {
        this.chromosomesDict[name];
        return this.chromosomesDict[name];
    }
}
