import { Chromosome } from 'app/life/chromosome';
import { UtilsService } from '../services/utils.service';




const attributes:string[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];



export class Genome {
    static totalAttValue:number = Math.round(Math.random() * 10) + 60;
    chromosomes: Chromosome[] = [];
    //matchChromosome:Chromosome;

    constructor(genome1: Genome = null, genome2: Genome = null) {

        attributes.forEach(attribute => {
            this.chromosomes.push(new Chromosome(attribute))
        })
        

        if (!genome1 || !genome2) {
            let arr: number[] = [];

            for (var i = 0; i < 6; i++) {
                let amount = UtilsService.randomNumber(1, Math.ceil(Genome.totalAttValue / 2));
                arr.push(amount);
            }

            let sum: number = arr.reduce((prev, cur) => prev ? cur + prev : cur)
            arr = arr.map(num => Math.round(num / sum * Genome.totalAttValue));

            this.chromosomes.forEach((chromosome, index) => {
                chromosome.value = arr[index];
            })
        } else {
            this.chromosomes.forEach((chromosome, index) => {
                chromosome.value = Math.max(genome1.chromosomes[index].value, genome2.chromosomes[index].value);
            })
        }

        /* let matchArr: IRange[] = this.chromosomes.map(chromosome => {
            let from: number = UtilsService.randomNumber(1, Math.ceil(total / 2));
            let to: number = UtilsService.randomNumber(from, 10);
            return { type: chromosome.type, from: from, to: to }
        }) */

        //this.matchChromosome = new Chromosome('match', matchArr);
    }



    getChromosomeByName(name:string):Chromosome {
        this.chromosomes.forEach(chromosome =>{
            if (name == chromosome.type) return chromosome;
        });

        return null;
    }
}
