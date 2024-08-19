"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

// const filename = '/home/jay/source/aoc2023/day03/sample.txt';
const filename = '/home/jay/source/aoc2023/day03/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);

// first, find every symbol and store all of the coordinates around it, so we can use them later
let adjacent_coordinates = new Map();
let gears = new Map();
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
        if (lines[y][x] == '*') {
            // console.log(`Symbol ${lines[y][x]} found at (${x},${y})`);
            const center = `${x},${y}`;
            // record adjacent coordinates
            for (let y1 = y-1; y1 <= y+1; y1++) {
                for (let x1 = x-1; x1 <= x+1; x1++) {
                    if (x1 != x || y1 != y) {
                        const coord = `${x1},${y1}`;
                        // console.log(coord);
                        adjacent_coordinates.set(coord, center);
                        gears.set(center, []);
                    }
                }
            }
        }
    }
}

// second, find every part number on each line and check if any of its digits are a symbol-adjacent coordinate
let line_number = 0;
lines.forEach(line => {
    const number_finder = /(\d+)/g;
    let found_number;
    while ((found_number = number_finder.exec(line)) != null) {
        const number = parseInt(found_number[1]);
        for (let i = found_number.index; i < number_finder.lastIndex; i++)
        {
            const coord = `${i},${line_number}`;
            if (adjacent_coordinates.has(coord)) {
                const center = adjacent_coordinates.get(coord);
                gears.get(center).push(number);
                // console.log(`${coord}: ${number}`);
                break;
            }
        }
    }
    line_number++;
});

let sum = 0;
for (let key of gears.keys()) {
    const gears_numbers = gears.get(key);
    if (gears_numbers.length == 2) {
        const gear_ratio = gears_numbers.reduce((i,j) => i * j, 1);
        sum += gear_ratio;
    }
}
console.log(sum);
