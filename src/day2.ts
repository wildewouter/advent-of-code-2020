import {inputDayTwo} from "./day2-input";

const toPatternAndInput = (item: string): [string, string] => item.match(/^(\d+-\d+ \w): (\w+)$/)?.filter((_, index) => index > 0 && index < 3) as [string, string];

const intoCharacters = '';

const onPartOneMatch = ([pattern, value]: [string, string]): Boolean => {
    const matches = pattern.match(/(\d+)-(\d+) (\w)/) ?? [];
    const letter = matches[3];
    const offset = matches[1];
    const limit = matches[2];

    const regex = `^${letter}{${offset},${limit}}$`;

    return value
        .split(intoCharacters)
        .filter(character => character === letter)
        .join('')
        .match(regex) !== null;
}

console.log(
    'Part one: ',
    inputDayTwo
        .map(toPatternAndInput)
        .filter(onPartOneMatch)
        .length
);
