import fs from "fs";

const intoGroups = '\n\n';

const toNumberOfAnswers = (characters: string) =>
    Object.keys(
        characters
            .split('')
            .reduce((result, yes: string) => ({...result, [yes]: true}), {})
    ).length;

const answerPartOne = fs.readFileSync(__dirname + '/day6-input', 'utf8')
    .split(intoGroups)
    .map(groups => groups.split('\n').join(''))
    .map(toNumberOfAnswers)
    .reduce((result, next) => result + next, 0);

console.log(`Part one: ${answerPartOne}`)
