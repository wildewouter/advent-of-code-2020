import fs from "fs";

enum SeatIndicator {
    Front = 'F',
    Back = 'B',
    Left = 'L',
    Right = 'R',
}

const seats = fs.readFileSync(__dirname + '/day5-input', 'utf8')
    .split('\n')
    .map(seat => seat
        .split('')
        .filter((seat): seat is SeatIndicator => true)
        .reduce((result, indicator, index) =>
                indicator === SeatIndicator.Front
                    ? [result[0], result[1] - (128 / Math.pow(2, index + 1)), result[2], result[3]]
                    : indicator === SeatIndicator.Back
                    ? [result[0] + (128 / Math.pow(2, index + 1)), result[1], result[2], result[3]]
                    : indicator === SeatIndicator.Left
                        ? [result[0], result[1], result[2], result[3] - (8 / Math.pow(2, index - 6))]
                        : indicator === SeatIndicator.Right
                            ? [result[0], result[1], result[2] + (8 / Math.pow(2, index - 6)), result[3]]
                            : result,
            [0, 127, 0, 7])
    );

console.log('Part one: ', seats
    .map(ranges => ranges[0] * 8 + ranges[2])
    .sort((a, b) => b - a)[0]
);

console.log('Part two: ', Object.entries(seats
    .sort((a, b) => a[0] - b[0])
    .reduce((result, next) => ({
        ...result,
        [next[0]]: [...(result[next[0]] ?? []), next[2]]
            .sort((a, b) => a - b),
    }), {} as { [key: number]: number[] }))
    .filter(([, seats]) => seats.length < 8)
);
