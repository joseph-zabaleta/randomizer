'use strict';

const { program } = require('commander');


program
    .option('-i, --import', 'importing a file');


let something = program.parse(process.argv);

console.log('===========',something);
