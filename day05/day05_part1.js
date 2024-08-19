"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

const filename = '/home/jay/source/aoc2023/day05/sample.txt';
// const filename = '/home/jay/source/aoc2023/day05/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);
