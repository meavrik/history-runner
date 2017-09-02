import { ChromosomeSex } from './chromosome-sex';

import { Chromosome } from 'app/life/chromosome';
import { UtilsService } from '../services/utils.service';

//strength(כוח), dexterity(זריזות),Constitution(חוסן), intelligent,wisdom,charisma
const attributes: string[] = ['str', 'dex', 'con', 'int', 'wis', 'cha', 'sex'];

export class Genome {
    static totalAttValue: number = Math.round(Math.random() * 10) + 60;

    chromosomes: Chromosome[] = [];
    sexChromosome: Chromosome;

    constructor(public fatherChromosomes: Chromosome[] = null, public motherChromosomes: Chromosome[] = null) {

        if (!this.fatherChromosomes) this.fatherChromosomes = this.generateParentGenome();
        if (!this.motherChromosomes) this.motherChromosomes = this.generateParentGenome();

        attributes.forEach((attribute, index) => {
            
            let newChromosome:Chromosome;

            if (attribute == 'sex') {
                newChromosome = new Chromosome(attribute, this.fatherChromosomes[index].value);
                this.sexChromosome = newChromosome;
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

            this.chromosomes.push(newChromosome)
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
                chromosomes.push(new Chromosome(attribute,value))
            }
        })

        return chromosomes;
    }

    getChromosomeByName(name: string): Chromosome {

        let found: Chromosome = null;
        this.chromosomes.forEach(chromosome => {
            if (name == chromosome.type) found = chromosome;
        });

        return found;
    }
}
