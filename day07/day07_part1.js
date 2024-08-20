"use strict";

// this works for Objects but not for Classes
function pretty_print_object(s) {
    console.log(JSON.stringify(s, undefined, 2));
}

// must use full path when executing node in vscode, because vscode does not start node in the script's directory...
// const filename = '/home/jay/source/aoc2023/day07/sample.txt';
const filename = '/home/jay/source/aoc2023/day07/input.txt';

const fs = require('fs');
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/).filter(l => l.length > 0);
// pretty_print_object(lines);

// Python lists & strings have a native count() method, but JavaScript Arrays & Strings don't
//   a.filter(c => c === x).length counts the number of ocurrences of 'x' in array 'a'
function count_occurrences(a, x) {
    return a.filter(c => c === x).length;
}

const CARD_STRENGTHS = '23456789TJQKA';

// enum-ish, reference https://www.geeksforgeeks.org/enums-in-javascript/#
const HandType = Object.freeze({
    UNKNOWN: 0,
    HIGH_CARD: 1,
    ONE_PAIR: 2,
    TWO_PAIR: 3,
    THREE_OF_A_KIND: 4,
    FULL_HOUSE: 5,
    FOUR_OF_A_KIND: 6,
    FIVE_OF_A_KIND: 7
});

class Hand {
    constructor(cards, bid) {
        this.cards = cards;
        this.bid = bid;
        this.type = HandType.UNKNOWN;
        this.evaluate_hand_type();
    }

    evaluate_hand_type() {
        const card_counts = [...CARD_STRENGTHS].map(c => count_occurrences([...this.cards], c)); // [...s] converts string 's' to array
        
        if (card_counts.includes(5)) // if there are only 5 cards in the hand, then counting how many of each strength card we have is all we need
            this.type = HandType.FIVE_OF_A_KIND;
        else if (card_counts.includes(4)) // if there is 4 of anything, then there is only 1 of anything else - so, Four of a Kind
            this.type = HandType.FOUR_OF_A_KIND;
        else if (card_counts.includes(3) && card_counts.includes(2)) // is there is 3 of anything, the other two could be a pair or not
            this.type = HandType.FULL_HOUSE; // if the other two are a pair, it's a Full House
        else if (card_counts.includes(3)) // if the other two are not a pair, then it's just Three of a Kind
            this.type = HandType.THREE_OF_A_KIND;
        else if (card_counts.includes(2) && count_occurrences(card_counts, 2) === 2) // if there is more than one pair, it must be Two Pair
            this.type = HandType.TWO_PAIR;
        else if (card_counts.includes(2)) // if we've gotten here then there is not two pairs, so it must be One Pair
            this.type = HandType.ONE_PAIR;
        else if (count_occurrences(card_counts, 1) === 5) //  # otherwise, if all of the cards are different, then it is High Card
            this.type = HandType.HIGH_CARD;
        else
            console.log(`cannot determine card type for ${this.cards} with counts ${card_counts}`)
    }

    eq(other) {
        return (this.type === other.type && this.cards === other.cards);
    }

    // these are the sorting rules definied by the puzzle
    gt(other) {
        if (this.type != other.type)
            return this.type > other.type;

        for (let i = 0; i < this.cards.length; i++)
            if (this.cards[i] != other.cards[i])
                return CARD_STRENGTHS.indexOf(this.cards[i]) > CARD_STRENGTHS.indexOf(other.cards[i]);

        return false;
    }

    lt(other) {
        return !this.gt(other) && !this.eq(other);
    }

    // how Array.sort()'s compareFn works to sort smallest to largest: (per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
    //   if a > b,   return +1 ; ie the delta between a & b is positive, so a goes after b
    //   if a < b,   return -1 ; ie the delta between a & b is negative, so a goes before b
    //   if a === b, return  0 ; ie a & b are equivalent, so no change in sort order is needed
    static compare_for_sorting(a, b) {
        if (a.eq(b))
            return 0;
        else if (a.gt(b))
            return +1;
        else
            return -1;
    }
}

// 1. parse the input into Hands
const hands = lines.map(line => new Hand(...line.split(' ')));

// 2. sort the Hands, per the rules
hands.sort(Hand.compare_for_sorting);

// 3. score the sorted list, per the rules: sum up hand rank (ones-based) * bid
const score = [...hands.entries()].reduce((running_total, entry) => running_total + (entry[0] + 1) * entry[1].bid, 0);
console.log(score);
