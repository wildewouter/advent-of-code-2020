import fs from "fs";

const [ time, schedule ] = fs.readFileSync(__dirname + '/day13-input', 'utf8')
    .split('\n');

const partOne = schedule
    .split(',')
    .filter(x => x !== 'x')
    .map(x => ({ minuteWait: +x - (+time % +x), id: +x}))
    .sort(
        (a,b) => a.minuteWait - b.minuteWait
    ).shift();
console.log(partOne ? partOne.minuteWait * partOne.id : 'Jammer!');

// console.log(
//     input.match()
// )
