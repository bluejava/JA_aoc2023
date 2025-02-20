"use strict";

// const filename = '/home/jay/source/aoc2023/day02/sample.txt';
const filename = '/home/jay/source/aoc2023/day02/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// console.log(lines);

function score_line(running_total, line) {
    let group = {red: 0, green: 0, blue: 0};

    // const group_id = parseInt(/(\d+):/.exec(line)[1]);

    const color_counter = /(\d+)/; // type is RegExp
    for (let draw of line.split(': ')[1].split('; ')) {
        for (let value_and_color of draw.split(', ')) {
            switch (/(red|green|blue)/.exec(value_and_color)[1]) {
                case 'red':
                    group.red = Math.max(group.red, parseInt(color_counter.exec(value_and_color)[1]));
                    break;
                case 'green':
                    group.green = Math.max(group.green, parseInt(color_counter.exec(value_and_color)[1]));
                    break;
                case 'blue':
                    group.blue = Math.max(group.blue, parseInt(color_counter.exec(value_and_color)[1]));
                    break;
            }                    
        }
    }

    const group_power = group.red * group.green * group.blue;
    // console.log(group_power);
    return running_total + group_power;
}

const power = lines.reduce(score_line, 0);
console.log(power);
