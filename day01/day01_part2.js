"use strict";

// const filename = '/home/jay/source/aoc2023/day01/sample2.txt';
const filename = '/home/jay/source/aoc2023/day01/input.txt';

const fs = require('fs');
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// console.log(lines);

const convert_name_to_number = {
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
};

let sum = lines.reduce((running_total, line) => {
    const first_regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
    let calibration_value = 10 * convert_name_to_number[first_regex.exec(line)[1]]; 

    // this is a positive lookahead regex - enjoy! Native JavaScript does not support splitting regex across lines...
    const last_regex = /(?=\d|one|two|three|four|five|six|seven|eight|nine).*(\d|one|two|three|four|five|six|seven|eight|nine).*$/;
    calibration_value += convert_name_to_number[last_regex.exec(line)[1]];

    return running_total + calibration_value;
}, 0);

console.log(sum);
