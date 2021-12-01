import * as fs from 'fs';

const input = fs.readFileSync('input.txt','utf8');
const signals = input.split('\n').map(value => Number(value));

// part 1
let countFlanks = 0;
signals.reduce((prev, curr) => {
    if (curr > prev) {
        countFlanks++;
    }
    return curr;
});

console.log('part 1: ' + countFlanks);

// part 2
const windows: number[] = signals.map((elem, idx, array) => {
    if (idx < 1 || idx > array.length - 2) {
        return 0;
    }
    return array[idx - 1] + elem + array[idx + 1];
}).filter(value => value !== 0);

countFlanks = 0;
windows.reduce((prev, curr) => {
    if (curr > prev) {
        countFlanks++;
    }
    return curr;
});

console.log('part 2: ' + countFlanks);
