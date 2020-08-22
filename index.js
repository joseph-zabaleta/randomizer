'use strict';

const { program } = require('commander');

const pairs = require('./lib/pairs/pair-logic.js');
const fileImport = require('./lib/import/import-logic.js');

program
    .description('An application to create random groups')
    .option('-i, --import <path>', 'imports a CSV file from provided path, if --cname is not present the file name will be used')
    .option('--cname <name>', 'Collection name: Optional secondary flag for file name')
    .option('-p, --pairs', 'random pairs');


let userInput = program.parse(process.argv);


if (userInput.import) {
    fileImport(userInput.import, userInput.cname);

} else if (userInput.pairs === true) {

    pairs();

} else {
    throw new Error('Command not recognized');
};





