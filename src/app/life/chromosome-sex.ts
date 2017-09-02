import { Chromosome } from './chromosome';
import { UtilsService } from '../services/utils.service';
import { IRange } from '../utils/range';
import { Genome } from './genome';

export class ChromosomeSex extends Chromosome {

    weightMax:number;
    heightMax:number;

    constructor(public type: string, val: number = 0) {
        super(type, val);
    }

}