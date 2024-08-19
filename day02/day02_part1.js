"use strict";

const filename = '/home/jay/source/aoc2023/day02/sample.txt';
// const filename = '/home/jay/source/aoc2023/day02/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// console.log(lines);

const max = {red: 12, green: 13, blue: 14};
let count = 0;

lines.forEach(line => {
    let group = {red: 0, green: 0, blue: 0};

    const group_id = parseInt(/(\d+):/.exec(line)[1]);

    const color_counter = /(\d+)/; // type is RegExp
    line.split(': ')[1].split('; ').forEach(draw => {
        draw.split(', ').forEach(value_and_color => {
            switch (/(red|green|blue)/.exec(value_and_color)[1]) {
                case 'red':
                    const red_count = parseInt(color_counter.exec(value_and_color)[1]);
                    group.red = (red_count > group.red) ? red_count : group.red;
                    break;
                case 'green':
                    const green_count = parseInt(color_counter.exec(value_and_color)[1]);
                    group.green = (green_count > group.green) ? green_count : group.green;
                    break;
                case 'blue':
                    const blue_count = parseInt(color_counter.exec(value_and_color)[1]);
                    group.blue = (blue_count > group.blue) ? blue_count : group.blue;
                    break;
            }                    
        });
    });

    if (group.red <= max.red && group.green <= max.green && group.blue <= max.blue)
        count += group_id;
});

console.log(count);
