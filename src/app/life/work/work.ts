
const workDB: any = [
    {
        type: 'government', jobs: [
            {
                type: 'king', min: 1, max: 1,
                require: [
                    { type: 'chr', min: 10 },
                ]
            },
            {
                type: 'minister',
                require: [
                    { type: 'int', min: 10 },
                    { type: 'wis', min: 10 },
                ]
            },
            { type: 'tax-collector' },
            { type: 'official' }
        ]
    },
    {
        type: 'construction', jobs: [
            { type: 'architect', produce: '' },
            { type: 'engineer', produce: '' },
            {
                type: 'builder', produce: '', require: [
                    { type: 'str', min: 10 },
                    { type: 'con', min: 10 },
                ]
            },
        ]
    },
    {
        type: 'food', jobs: [
            {
                type: 'farmer', produce: 'food', require: [
                    { type: 'str', min: 10 },
                    { type: 'con', min: 10 },
                ]
            },
            {
                type: 'cowboy', produce: 'food', require: [
                    { type: 'str', min: 10 },
                    { type: 'con', min: 10 },
                ]
            },
            { type: 'merchant', produce: '' }
        ]
    },
    {
        type: 'resources', jobs: [
            { type: 'lumber' },
            { type: 'stone' },
            { type: 'gold' },
        ]
    },
    {
        type: 'art', jobs: [
            { type: 'musician' },
            { type: 'painter' },
            { type: 'writer' }
        ]
    },
    {
        type: 'religion', jobs: [
            {
                type: 'high priest', min: 1, max: 1,
                require: [
                    { type: 'chr', min: 15 },
                ]
            },
            { type: 'priest' },
        ]
    },
]

export class Work {

    //static types: string[] = ['construction', 'food', 'army', 'art', 'resources']


}
