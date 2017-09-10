import { UtilsService } from '../services/utils.service';
import { IRange } from '../utils/range';
import { Genome } from './genome';
import { CharAttributes } from 'app/life/attributes.enum';
import { MAX_ATTRIBUTE_VALUE, CharAttributeTypes } from './attributes.enum';

export class Chromosome {
    valueRangeForMatch: IRange

    constructor(public name: string, public value: any, public type: string = "") {
        if (type == CharAttributeTypes.CHARACTER) {
            //let from: number = UtilsService.randomNumber(Math.max(this.value - 5, 0), this.value + 5);
            //let to: number = UtilsService.randomNumber(from, from + 10);

            let val: number = UtilsService.randomNumber(2, MAX_ATTRIBUTE_VALUE);
            this.valueRangeForMatch = { from: val, to: val + 2 };
        }
    }

}
