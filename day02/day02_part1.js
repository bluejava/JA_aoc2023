"use strict";

// const filename = '/home/jay/source/aoc2023/day02/sample.txt';
// const filename = '/home/jay/source/aoc2023/day02/input.txt';
const filename = './input-glenn.txt'; // 2406

const fs = require('fs');
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// console.log(lines);

// Rather than use a global max, pass it in as a parameter so that the function can be reused with other data.
// Along these same lines, I'd suggest not mixing parsing the line (an input file detail) within the actual
// reducer function. This will set you up for a different task using the same input in part 2 - or reusing
// this reducer with data from another source (theoretically, since that will never happen in this case).
// Once you parse the input, this part1 can be solved with a series of single-purpose functions..
//
// const setCheckMax = (max: Set, set: Set) =>
// 	max.red! >= (set.red || 0) &&
//  max.green! >= (set.green || 0) &&
//  max.blue! >= (set.blue || 0)
//
// const gameCheckMax = (max: Set) =>
// 	(game: Game) =>
// 		game.sets.reduce((valid, set) => valid && setCheckMax(max, set),true)
//
// 	const answer = games
//      .filter(gameCheckMax(max))
//      .reduce((tot, game) => tot + game.gameNum, 0)
//
const reducerForMax = (max) => {
    return function score_line(running_total, line)  {
        const group = {red: 0, green: 0, blue: 0};

        const group_id = parseInt(/(\d+):/.exec(line)[1]);

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

        if (group.red <= max.red && group.green <= max.green && group.blue <= max.blue)
            return running_total + group_id;

        return running_total;
    }
}

const max = {red: 12, green: 13, blue: 14};
const count = lines.reduce(reducerForMax(max), 0);
console.log(count);
