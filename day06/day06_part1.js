"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

const filename = '/home/jay/source/aoc2023/day06/sample.txt';
// const filename = '/home/jay/source/aoc2023/day06/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);

// in my Python version, I used a regex here, but this seems to work just as well
const times = lines[0].split(':')[1].trim().split(/\s+/).map(Number);
const distances = lines[1].split(':')[1].trim().split(/\s+/).map(Number);

// zip() arrays together so I can then use reduce() more easily
const races = times.map((element, index) => [element, distances[index]]);

const ways = races.reduce((record_beaters, race) => {
    let count = 0;
    const [time, distance] = race;
    for(let hold_time = 0; hold_time < time; hold_time++) {
        if ((time - hold_time) * hold_time > distance)
            count++;
    }
    return record_beaters * count;
}, 1);

console.log(ways);
