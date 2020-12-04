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

const sledDownSlope = (slope: Slope, position: Position, treeEncounters = 0): number => {
    if (position.y === slope.length) {
        return treeEncounters;
    }

    const newPosition = {
        x: position.x + 3,
        y: position.y + 1,
    }

    const x = position.x % slope[position.y].length;

    if (slope[position.y][x] === '#') {
        return sledDownSlope(slope, newPosition, treeEncounters + 1)
    }

    return sledDownSlope(slope, newPosition, treeEncounters);
}

console.log(sledDownSlope(slope, position));
