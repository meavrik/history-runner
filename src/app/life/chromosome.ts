import { UtilsService } from '../services/utils.service';
import { IRange } from '../utils/range';
import { Genome } from './genome';

export class Chromosome {
    valueRangeForMatch: IRange
    value: any;

    /* get value(): number {
        return this._value;
    }

    set value(v: number) {
        this._value = v;

        let from: number = UtilsService.randomNumber(Math.max(this._value - 5, 0), this._value + 5);
        let to: number = UtilsService.randomNumber(from, from+10);

        this.valueRangeForMatch = { from: from, to: to };
    } */

    constructor(public type: string, val: any) {
        this.value = val;

        if (type != 'sex') {
            let from: number = UtilsService.randomNumber(Math.max(this.value - 5, 0), this.value + 5);
            let to: number = UtilsService.randomNumber(from, from + 10);

            this.valueRangeForMatch = { from: from, to: to };
        }
    }

}
