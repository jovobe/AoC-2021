import * as fs from 'fs';
import path from 'path';

const input: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'),'utf8');
const numberStrings: string[] = input.split('\n').filter(s => s.length > 0);
const numbers: number[][] = numberStrings.map(s => s.split('').map(c => parseInt(c)));

const occurences = numbers.reduce((prev, curr): number[] => {
    return prev.map((v, i) => v + curr[i]);
});
const mostCommon = occurences.map(o => o >= (numbers.length / 2) ? 1 : 0);

let gammaRate = 0;
let epsilonRate = 0;
mostCommon.forEach(o => {
    gammaRate = gammaRate << 1;
    epsilonRate = epsilonRate << 1;
    if (o === 1) {
        gammaRate |= 1;
    } else {
        epsilonRate |= 1;
    }
});

console.log('part 1: ' + gammaRate * epsilonRate);

// part 2
function reduceToRate(
    remaining: number[][],
    mostCommon: number[],
    compare: (a: number, b: number) => boolean
): number[] {
    let pos = 0;
    while (remaining.length > 1) {
        remaining = remaining.filter(v => compare(v[pos], mostCommon[pos]));
        pos++;
    }
    return remaining[0];
}

const remainingOxygen = reduceToRate(numbers, mostCommon, (a, b) => a === b);
const remainingCo2 = reduceToRate(numbers, mostCommon, (a, b) => a !== b);

function convertToDecimal(digits: number[]): number {
    let string = digits.reduce((prev, curr) => prev + String(curr), '');
    return parseInt(string, 2);
}

const oxygenGeneratorRating = convertToDecimal(remainingOxygen);
const co2ScrubberRating = convertToDecimal(remainingCo2);

console.log('part 2: ' + oxygenGeneratorRating * co2ScrubberRating);
