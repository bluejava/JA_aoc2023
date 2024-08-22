"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

// must use full path when executing node in vscode, because vscode does not start node in the script's directory...
// const filename = '/home/jay/source/aoc2023/day08/sample1b.txt';
const filename = '/home/jay/source/aoc2023/day08/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);

const instructions = lines.shift();
const node_parser = /(\w+) = \((\w+), (\w+)\)/;
const nodes = new Map();
for (let line of lines) {
    const parsed_node = node_parser.exec(line);
    nodes.set(parsed_node[1], [parsed_node[2], parsed_node[3]]);
}

let count = 0;
let next_step = 'AAA';
while (true) {
    const direction = instructions[count % instructions.length];
    next_step = direction === 'L' ? nodes.get(next_step)[0] : nodes.get(next_step)[1];
    count += 1; 
    if (next_step === 'ZZZ') {
        console.log(`Total step requires to reach ZZZ = ${count}`);
        break;
    }
}
