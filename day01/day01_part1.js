"use strict";

// const filename = '/home/jay/source/aoc2023/day01/sample.txt';
const filename = '/home/jay/source/aoc2023/day01/input.txt';

const fs = require('fs');
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// console.log(lines);

let sum = 0;

lines.forEach(line => {
    const regex = /(\d)/;
    let calibration_value = parseInt(regex.exec(line)[1]) * 10 + 
        parseInt(regex.exec(line.split('').reverse().join(''))[1]);
    sum += calibration_value;
});

console.log(sum);
