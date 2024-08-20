"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

// const filename = '/home/jay/source/aoc2023/day04/sample.txt';
const filename = '/home/jay/source/aoc2023/day04/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);

function score_card(running_total, line){
    const [wins, nums] = line.split(':')[1].split('|').map(x => x.trim());
    let winners = wins.split(/\s+/).map(Number);
    let matching_numbers = nums.split(/\s+/).map(Number).filter(x => winners.includes(x)); // basically, intersect the two "sets"
    // console.log(matching_numbers);
    if (matching_numbers.length)
        return running_total + 2**(matching_numbers.length-1);
    return running_total;
}

const score = lines.reduce(score_card, 0);
console.log(score);
