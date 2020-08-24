'use strict';

/** 3rd Party Libraries */
const { program } = require('commander');

/** Local  */
const pairs = require('./lib/pairs/pair-logic.js');
const fileImport = require('./lib/import/import-logic.js');
const settings = require('./lib/settings/settings.js');
const display = require('./lib/display/display.js');

program
    .description('An application to create random groups')
    .option('-i, --import <path>', 'imports a CSV file from provided path, if --cname is not present the file name will be used')
    .option('--cname <name>', 'Collection name: Optional secondary flag for file name')
    .option('-p, --pairs', 'random pairs')
    .option('-d, --default [new set]', 'View current active set or if a value is provided, update the current active set to the value provided.')
    .option('-l, --list', 'List all available/imported collections')
    .option('--last-group', 'Display the last grouping');


let userInput = program.parse(process.argv);


if (userInput.import) {
    fileImport(userInput.import, userInput.cname);

} else if (userInput.pairs) {

    pairs();

} else if (userInput.default) {

    if (userInput.default !== true) {
        settings.setDefault(userInput.default);
        settings.save();
    };

    display.printDefaultSet();

} else if (userInput.list) {

    display.printAllCollections();

} else if (userInput.lastGroup) {

    display.printPreviousMatrix();

}



else {
    throw new Error('Command not recognized');
};
