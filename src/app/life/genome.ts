
import { Chromosome } from 'app/life/chromosome';
import { UtilsService } from '../services/utils.service';
import { CharAttributes } from 'app/life/attributes.enum';
import { CharAttributeTypes, MAX_ATTRIBUTE_VALUE } from './attributes.enum';
import { IRange } from '../utils/range';

interface IChromosomeData {
    name: string;
    type: string;
    range: IRange;
}
interface IGenomeData {
    chromosomes: IChromosomeData[]
}
interface Map<T> {
    [K: string]: T;
}
const genomeData: IGenomeData = {
    chromosomes: [
        { name: CharAttributes.SEX, type: CharAttributeTypes.SEX, range: { from: 0, to: 1 } },

        { name: CharAttributes.STRENGTH, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.DEXTERITY, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.CONSTITUTION, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.INTELLIGENCE, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.WISDOM, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.CHARISMA, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.CHARM, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.LOYALTY, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },
        { name: CharAttributes.EMPATHY, type: CharAttributeTypes.CHARACTER, range: { from: 0, to: 20 } },

        { name: CharAttributes.HEIGHT, type: CharAttributeTypes.MEASURES, range: { from: 140, to: 200 } },
        { name: CharAttributes.WEIGHT, type: CharAttributeTypes.MEASURES, range: { from: 0, to: 40 } },
    ]
}

//strength(כוח), dexterity(זריזות),Constitution(חוסן), intelligent,wisdom,charisma
//charm, loyalty, empathy

export class Genome {
    static totalAttValue: number = Math.round(Math.random() * 10) + 60;

    chromosomes: Chromosome[] = [];
    chromosomesDict: Map<Chromosome> = {};

    sex: string;
    strength: number;

    dexterity: number;
    constitution: number;
    intelligent: number;
    wisdom: number;
    charisma: number;
    charm: number;
    loyalty: number;
    empathy: number;

    max_weight: number;
    max_height: number;

    constructor(public fatherChromosomes: Chromosome[] = null, public motherChromosomes: Chromosome[] = null) 
    {
        if (this.fatherChromosomes && this.motherChromosomes) {
            this.setMyGenome();
        } else {
            this.fatherChromosomes = this.generateParentGenome('y');
            this.motherChromosomes = this.generateParentGenome('x');
            this.setMyGenome();
        }
    }

    setMyGenome() {
        this.chromosomes = [];
        genomeData.chromosomes.forEach((chromosomeData, index) => {
            let newChromosome: Chromosome;
            let value;
            let fatherValue = this.fatherChromosomes[index].value;
            let motherValue = this.motherChromosomes[index].value;

            switch (chromosomeData.type) {
                case CharAttributeTypes.SEX:
                    value = fatherValue;
                    break;
                case CharAttributeTypes.MEASURES:
                    let min = Math.min(fatherValue, motherValue);
                    let max = Math.max(fatherValue, motherValue);
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
        });


        this.sex = this.fatherChromosomes[0].value == 'y' ? 'male' : 'female';
        this.strength = this.calcParentsValues(this.fatherChromosomes[1].value, this.motherChromosomes[1].value);
        this.dexterity = this.calcParentsValues(this.fatherChromosomes[2].value, this.motherChromosomes[2].value);
        this.constitution = this.calcParentsValues(this.fatherChromosomes[3].value, this.motherChromosomes[3].value);
        this.intelligent = this.calcParentsValues(this.fatherChromosomes[4].value, this.motherChromosomes[4].value);
        this.wisdom = this.calcParentsValues(this.fatherChromosomes[5].value, this.motherChromosomes[5].value);
        this.charisma = this.calcParentsValues(this.fatherChromosomes[6].value, this.motherChromosomes[6].value);
        this.charm = this.calcParentsValues(this.fatherChromosomes[7].value, this.motherChromosomes[7].value);
        this.loyalty = this.calcParentsValues(this.fatherChromosomes[8].value, this.motherChromosomes[8].value);
        this.empathy = this.calcParentsValues(this.fatherChromosomes[9].value, this.motherChromosomes[9].value);


        this.max_height = this.calcParentsMesures(this.fatherChromosomes[10].value, this.motherChromosomes[10].value);
        this.max_weight = this.max_height - 100 + this.calcParentsMesures(this.fatherChromosomes[11].value, this.motherChromosomes[11].value);
    }

    calcParentsMesures(fatherValue: number, motherValue: number): number {
        let min = Math.min(fatherValue, motherValue);
        let max = Math.min(fatherValue, motherValue);
        return UtilsService.randomNumber(min, max);
    }

    calcParentsValues(fatherValue: number, motherValue: number): number {
        if (fatherValue <= 0 && motherValue <= 0) {
            return 1;
        } else if (fatherValue <= 0 || motherValue <= 0) {
            return Math.max(fatherValue, motherValue) * Math.abs(Math.min(fatherValue, motherValue))
        } else {
            return Math.max(fatherValue, motherValue);
        }
    }

    get chromosomesForReproduction(): Chromosome[] {

        let newChromosomesSet: Chromosome[] = [];
        let selectChromosome: Chromosome;

        genomeData.chromosomes.forEach((chromosomeData, index) => {
            let rand = Math.round(Math.random());
            selectChromosome = rand ? Object.assign({}, this.fatherChromosomes[index]) : Object.assign({}, this.motherChromosomes[index]);
            newChromosomesSet.push(selectChromosome);
        })

        return newChromosomesSet;
    }

    generateParentGenome(sex: string): Chromosome[] {

        let chromosomes: Chromosome[] = [];

        genomeData.chromosomes.forEach((chromosomeData, index) => {
            let value: any;
            switch (chromosomeData.type) {
                case CharAttributeTypes.SEX:
                    value = sex;
                    break;
                case CharAttributeTypes.MEASURES:
                    value = UtilsService.randomNumber(chromosomeData.range.from, chromosomeData.range.to);
                    break;
                default:
                    value = UtilsService.randomNumber(chromosomeData.range.from, chromosomeData.range.to);
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
