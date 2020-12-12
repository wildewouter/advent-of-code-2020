import fs from "fs";

const daRules = fs.readFileSync(__dirname + '/day7-input', 'utf8');

// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.

const pattern = /^(\w+ \w+) \b\w+\b \b\w+\b (no other|(\d \b\w+\b \b\w+\b bags?\.?,? ?)+)/;

const rulesPerBag = daRules
    .split('\n')
    .map(line => line.match(pattern))
    .filter(match => match !== null)
    .reduce((result, next) => ({...result, [next![1]]: next![2].split(', ')}), {} as { [index: string]: string[] })


const findBags = (find: string, foundBags: string[] = [], rules: { [index: string]: string[] } = rulesPerBag): string[] => {
    const containingBags = Object.entries(rules)
        .filter(
            ([, contains]) =>
                contains.filter(bag => bag.includes(find)).length > 0
        );

    if (containingBags.length > 0) {
        return removeDuplicates(
            containingBags
                .reduce(
                    (result, [bagFound]) =>
                        ([...result, ...findBags(bagFound, [...foundBags, bagFound])]),
                    [] as string[]
                )
        );
    }

    return removeDuplicates(foundBags);
};

const removeDuplicates = (arr: Array<any>) => arr.filter((value, index) => arr.indexOf(value) === index);

console.log(`Part one: ${findBags('shiny gold').length}`);
