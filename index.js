'use strict';

const { program } = require('commander');
var fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

program
    .description('An application to create random groups')
    .option('-i, --import <path>', 'imports a CSV file from provided path, if --cname is not present the file name will be used')
    .option('--cname <name>', 'Collection name: Optional secondary flag for file name')
    .option('-p, --pairs', 'random pairs');


let userInput = program.parse(process.argv);

// console.log(userInput);

if (userInput.import) {
    // console.log('I am file path!', userInput.import);
    let records = [];

    try {
        fs.createReadStream(userInput.import)
          .pipe(csv())
          .on('data', (row) => {
            row.id = uuidv4();
            records.push(row);
          })
          .on('end', () => {
            console.log('CSV file successfully processed');
            // console.log('ALL RECORDS', records);

            let id = uuidv4()
            let collection = {
                name: userInput.cname ? userInput.cname : id,
                records: records
            }

            let parseData;

            try {
                let rawData = fs.readFileSync('./data/collections.json');
                parseData = JSON.parse(rawData);

            } catch(err){
                if (err.code === 'ENOENT'){
                    console.log('First time ever');
                    parseData = [];

                } else {
                    throw new Error(err);
                }
            };

            parseData.push(collection);

            let jsonData = JSON.stringify(parseData)

            // console.log(jsonData);
            fs.writeFileSync('./data/collections.json', jsonData);

          })
    } catch (error) {
        console.log(error);
    };







} else if (userInput.pairs === true) {
    console.log('pairs has been selected');
} else {
    throw new Error('Command not recognized');
};





