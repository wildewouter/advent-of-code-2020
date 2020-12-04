import fs from "fs";

type Document = {
    byr?: string,
    iyr?: string,
    eyr?: string,
    hgt?: string,
    hcl?: string,
    ecl?: string,
    pid?: string,
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
