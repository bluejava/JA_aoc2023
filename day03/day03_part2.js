"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

// const filename = '/home/jay/source/aoc2023/day03/sample.txt';
// const filename = '/home/jay/source/aoc2023/day03/input.txt';
const filename = './input-glenn.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);

/*
    Looks like you were nearly able to re-use this next section from your part 1. It illustrates the point of
    the benefits of constructing from many single-purpose functions. In this more complex function you had to
    make some tweaks, and therefor had to re-write it all. After part 1 I pasted as a comment into part 1
    part 2 is merely:

	const p2 = data.symbols
		.filter(s => s.symbol === "*" && (s.numbers?.length || 0) > 1)
		.map(prop("numbers"))
		.map(product)
		.sum()

    The only new function I needed was product:

    const product = (ar: number[]) => ar.reduce((tot, cur) => tot * cur)

    Oh, also to use sum() in a chain like that I had to define it on the Array prototype:
    Array.prototype.sum = function(): number { return sum(this as number[]) }

    You could also do it by defining a temporary variable to hold the array before summing, and then:
    const p2 = sum(tempArray)

    But as I've said, I try to avoid temporary varaibles and rather extend native objects like Array
    (though some frown on that practice - and I agree for libraries or frameworks I am publishing for others
    to use).
*/

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
