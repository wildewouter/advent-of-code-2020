import fs from "fs";

const intoGroups = '\n\n';

const answers = fs.readFileSync(__dirname + '/day6-input', 'utf8');

const toNumberOfAnswers = (characters: string) =>
    Object.keys(
        characters
            .split('')
            .reduce((result, yes: string) => ({...result, [yes]: true}), {})
    ).length;

const toSummed = (result: number = 0, next: number) => result + next;

const answerPartOne = answers
    .split(intoGroups)
    .map(groups => groups.split('\n').join(''))
    .map(toNumberOfAnswers)
    .reduce(toSummed);

console.log(`Part one: ${answerPartOne}`)

const answerGroupsPerRespondentToBinaryInt = (value: string) =>
    value
        .split('')
        .map(character => parseInt(character, 36) - 10)
        .reduce((result, next) => result | (1 << next), 0);

const answerPartTwo = answers
    .split(intoGroups)
    .map(groups => groups
        .split('\n')
        .filter(char => char != '')
        .map(answerGroupsPerRespondentToBinaryInt)
    )
    .map(group => group.reduce((previous, next) => previous & next, parseInt('11111111111111111111111111', 2)))
    .map(lettersBinary => (lettersBinary.toString(2).match(/1/g) || []).length)
    .reduce(toSummed)

console.log(`Part two: ${answerPartTwo}`)
