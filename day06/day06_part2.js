"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

// const filename = '/home/jay/source/aoc2023/day06/sample.txt';
const filename = '/home/jay/source/aoc2023/day06/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);

const time = Number(/(\d+)/.exec(lines[0].replaceAll(' ', ''))[1]);
const distance = Number(/(\d+)/.exec(lines[1].replaceAll(' ', ''))[1]);

let count = 0;
for(let hold_time = 0; hold_time < time; hold_time++) {
    if ((time - hold_time) * hold_time > distance)
        count++;
}

console.log(count);
