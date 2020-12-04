import fs from "fs";

type Point = '.' | '#';

type Slope = Point[][];

type Position = {
    x: number,
    y: number
};

const slope = fs.readFileSync(__dirname + '/day3-input', 'utf8')
    .split('\n')
    .map(row => row.split('')) as Slope;

const position: Position = {
    x: 0,
    y: 0,
}

const sledDownSlope = (slope: Slope, position: Position, addX: number, addY: number, treeEncounters = 0): number => {
    if (position.y === slope.length) {
        return treeEncounters;
    }

    const newPosition = {
        x: position.x + addX,
        y: position.y + addY,
    }

    const x = position.x % slope[position.y].length;

    if (slope[position.y][x] === '#') {
        return sledDownSlope(slope, newPosition, addX, addY, treeEncounters + 1)
    }

    return sledDownSlope(slope, newPosition, addX, addY, treeEncounters);
}

console.log('part one: ', sledDownSlope(slope, position, 3, 1))

console.log('part two: ',
    sledDownSlope(slope, position, 1, 1)
    * sledDownSlope(slope, position, 3, 1)
    * sledDownSlope(slope, position, 5, 1)
    * sledDownSlope(slope, position, 7, 1)
    * sledDownSlope(slope, position, 1, 2)
);
