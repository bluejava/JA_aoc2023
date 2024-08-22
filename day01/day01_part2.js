import { readFile } from 'fs/promises'

// const filename = '/home/jay/source/aoc2023/day01/sample2.txt';
// const filename = '/home/jay/source/aoc2023/day01/input.txt';
const filename = './input2.txt'; // Answer: 54706

const identity = x => x; // useful in filter clauses to remove falsy values
const linebreak = /\r?\n/;  // handles both \r\n and \n

const lines = (await readFile(filename, 'utf-8')) // use of await here behaves just like a synchronous version (or at least looks like it)
    .split(linebreak) // I like to line break chained functions so dots line up
    .filter(identity); // as its easier to follow - like a recipe :-)
// console.log(lines);

const convert_name_to_number = { // This doesn't support 0 (or 'zero') but I guess that's okay...
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
};

const numberTextRE = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
// this is a positive lookahead regex - enjoy! Native JavaScript does not support splitting regex across lines... (Glenn: Isn't multiline option available? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline - though not sure its useful here..)
const last_regex = /(?=\d|one|two|three|four|five|six|seven|eight|nine).*(\d|one|two|three|four|five|six|seven|eight|nine).*$/;

// Again here I pulled the regex out of the loop. This may not really improve performance, but years of doing this in places
// where it does matter makes it look "wrong" to me. Also the removal of temporary variables is a style question - I lean
// towards less temporary variables unless it really helps with readability.
let sum = lines.reduce((running_total, line) =>
    running_total +
        10 * convert_name_to_number[numberTextRE.exec(line)[1]] +
        convert_name_to_number[last_regex.exec(line)[1]]
, 0);

console.log(sum);
