// Common convention to place require() statements at the top of a file. Also ESM is now supported
// and is preferred (at least by me!) - You can then omit "use strict" as ESM is always strict mode.
// Also, I try to stick with the promise returning async versions - and only import the functions I need.
import { readFile } from 'fs/promises'

// const filename = '/home/jay/source/aoc2023/day01/input.txt';
// const filename = './input1.txt'; // Answer: 242
const filename = './input2.txt'; // Answer: 55447

// I like to extract functions like these, as they can be reused in multiple places
// and even when not, it helps self-document the code.
const identity = x => x; // useful in filter clauses to remove falsy values
const linebreak = /\r?\n/;  // handles both \r\n and \n

const lines = (await readFile(filename, 'utf-8')) // use of await here behaves just like a synchronous version (or at least looks like it)
    .split(linebreak) // I like to line break chained functions so dots line up
    .filter(identity); // as its easier to follow - like a recipe :-)

// Pulling out the regex definition out of the reduce loop is more efficient (maybe... honestly the Node JIT can
// probably figure this out). Also naming it descriptively self documents the code.
const singleDigit = /(\d)/;

// use reduce() as an accumulator
// Note that by removing the calibration_value temporary variable, we can remove both the {} and the return statement
// hopefully reducing cognitive load. Of course, if we feel the temporary variable helps self-document the code it
// could be worth leaving in. So this is a nitpick - then again, all my suggestions here are nitpicks!
const sum = lines.reduce((running_total, line) =>
    running_total + parseInt(singleDigit.exec(line)[1]) * 10 +
        parseInt(singleDigit.exec(line.split('').reverse().join(''))[1]), 0);

console.log(sum);
