import * as fs from 'fs';
import path from 'path';

const input: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'),'utf8');
const numberStrings: string[] = input.split('\n').filter(s => s.length > 0);
const numbers: number[][] = numberStrings.map(s => s.split('').map(c => parseInt(c)));

const occurences = numbers.reduce((prev, curr): number[] => {
    return prev.map((v, i) => v + curr[i]);
});

let gammaRate = 0;
let epsilonRate = 0;
occurences.forEach(o => {
    gammaRate = gammaRate << 1;
    epsilonRate = epsilonRate << 1;
    if (o > numbers.length / 2) {
        gammaRate |= 1;
    } else {
        epsilonRate |= 1;
    }
});

console.log('part 1: ' + gammaRate * epsilonRate);
