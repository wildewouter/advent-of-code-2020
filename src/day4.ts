import fs from "fs";

type Document = {
    byr: string,
    iyr: string,
    eyr: string,
    hgt: string,
    hcl: string,
    ecl: string,
    pid: string,
    cid?: string,
}

const intoDocumentList = /\n\n/;
const intoSingleDocuments = ' ';

const toDocuments = (document: string) =>
    document
        .replace(/\n/g, ' ')
        .split(intoSingleDocuments)
        .map(line => line.split(':'))
        .filter(([field]) => field !== '')
        .reduce(
            (result, [field, value]) =>
                ({...result, [field]: value})
            , {} as Document
        );


const documents: Document[] = fs.readFileSync(__dirname + '/day4-input', 'utf8')
    .split(intoDocumentList)
    .map(toDocuments);

const onValidDocument = (document: Document): boolean =>
    (Object.keys(document).length === 8) || (Object.keys(document).length === 7 && document.cid === undefined)


console.log('Part one: ', documents.filter(onValidDocument).length);

interface ValidateDocumentPropertyFunc {
    (value: string): boolean;
}

const daRules: {
    [k in keyof Document]: ValidateDocumentPropertyFunc
} = {
    byr: (value: string) => 1920 <= +value && +value <= 2002,
    iyr: (value: string) => 2010 <= +value && +value <= 2020,
    eyr: (value: string) => 2020 <= +value && +value <= 2030,
    hgt: (value: string) => {
        const [, number, identifier] = value.match(/^([0-9]+)([a-z]*)/) as [string, string, string];
        if (number === undefined || identifier === undefined) {
            return false;
        }

        const parsedNumber = +number;

        return identifier === 'cm' ? 150 <= parsedNumber && parsedNumber <= 193
            : identifier === 'in' ? 59 <= parsedNumber && parsedNumber <= 76
                : false;
    },
    hcl: (value: string) => Boolean(value.match(/^#[0-9a-f]{6}$/)),
    ecl: (value: string) => Boolean(value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)),
    pid: (value: string) => Boolean(value.match(/^[0-9]{9}$/)),
    cid: () => true,
}

const onDaRules = (document: Document) =>
    !Object.keys(document)
        .filter((key): key is keyof Document => true)
        .map(key => ({func: daRules[key], key}))
        .map(
            ({func, key}) => {
                const value = document[key];

                return (func !== undefined && value !== undefined)
                    ? func(value)
                    : false
            }
        ).includes(false);

console.log('Part two: ', documents.filter(onValidDocument).filter(onDaRules).length);
