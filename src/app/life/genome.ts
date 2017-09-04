import { ChromosomeSex } from './chromosome-sex';

import { Chromosome } from 'app/life/chromosome';
import { UtilsService } from '../services/utils.service';
import { Attributes } from "app/life/attributes.enum";

/* const SRENGTH: string = 'str';
const DEXTERITY: string = 'dex';
const CONSTITUTION: string = 'con';
const INTELLIGENCE: string = 'int';
const WISDOM: string = 'wis';
const CHARISMA: string = 'cha';
const SEX: string = 'sex'; */

//strength(כוח), dexterity(זריזות),Constitution(חוסן), intelligent,wisdom,charisma
const attributes: string[] = [
    Attributes.STRENGTH, 
    Attributes.DEXTERITY,
    Attributes.CONSTITUTION, 
    Attributes.INTELLIGENCE, 
    Attributes.WISDOM, 
    Attributes.CHARISMA, 
    Attributes.SEX
];

interface Map<T> {
    [K: string]: T;
}

export class Genome {
    static totalAttValue: number = Math.round(Math.random() * 10) + 60;

    chromosomes: Chromosome[] = [];
    //sexChromosome: Chromosome;



    chromosomesDict: Map<Chromosome> = {};


    constructor(public fatherChromosomes: Chromosome[] = null, public motherChromosomes: Chromosome[] = null) {
 

        if (!this.fatherChromosomes) this.fatherChromosomes = this.generateParentGenome();
        if (!this.motherChromosomes) this.motherChromosomes = this.generateParentGenome();
        
        attributes.forEach((attribute, index) => {

            let newChromosome: Chromosome;

            if (attribute == Attributes.SEX) {
                newChromosome = new Chromosome(attribute, this.fatherChromosomes[index].value);
                //this.sexChromosome = newChromosome;
            } else {
                let value;
                let value1 = this.fatherChromosomes[index].value
                let value2 = this.motherChromosomes[index].value;

                if (value1 <= 0 && value2 <= 0) {
                    value = 1;
                } else if (value1 <= 0 || value2 <= 0) {
                    value = Math.max(value1, value2) * Math.abs(Math.min(value1, value2))
                } else {
                    value = Math.max(value1, value2);
                }

                newChromosome = new Chromosome(attribute, value);
            }
            this.chromosomesDict[attribute] = newChromosome;
           // this.chromosomes.push(newChromosome)
        })
    }

    get chromosomesForReproduction(): Chromosome[] {

        let newSet: Chromosome[] = [];
        attributes.forEach((att, index) => {
            let rand: number = Math.round(Math.random());
            newSet.push(rand ? this.fatherChromosomes[index] : this.motherChromosomes[index]);
        })

        return newSet;
    }

    generateParentGenome(): Chromosome[] {
        let chromosomes: Chromosome[] = [];

        attributes.forEach((attribute, index) => {
            if (attribute == 'sex') {
                let value = Math.round(Math.random()) ? 'x' : 'y';
                chromosomes.push(new Chromosome(attribute, value))
            } else {
                let value = UtilsService.randomNumber(0, 18);
                if (value == 0) value = -0.5;
                if (value == 1) value = -1.5;
                if (value == 2) value = -2;
                //chromosomes.push(new Chromosome(attribute, arr[index]))
                chromosomes.push(new Chromosome(attribute, value))
            }
        })

        return chromosomes;
    }

    getChromosomeByName(name: string): Chromosome {

        /* let found: Chromosome = null;
        this.chromosomes.forEach(chromosome => {
            if (name == chromosome.type) found = chromosome;
        });

        return found; */

        return this.chromosomesDict[name];
    }
}
