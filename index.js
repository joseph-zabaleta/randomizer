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


/**
 * Helper function to randomize the order of a records array
 * @param {[Array]} records An array of records
 */
function shuffle(records) {

    let times = records.length / 3;
    let counter = 0;

    do {
        records.sort(() => Math.random() - 0.5);
        counter++
    } while (counter < times)

};





if (userInput.import) {
    // console.log('I am file path!', userInput.import);
    let records = [];

    try {
        //READING FROM THE PATH PROVIDED
        fs.createReadStream(userInput.import)
          .pipe(csv())
          .on('data', (row) => {
              //PARSING, ADDING ID TO EACH ROW, PUSH TO ARRAY
            row.id = uuidv4();
            row.lastMatch = [];
            records.push(row);
          })
          .on('end', () => {
            console.log('CSV file successfully processed');
            // console.log('ALL RECORDS', records);


            let parseData;

            /** Try to read from data file, and it not found, catch, create an empty array */
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

            /** Compare Cname to current collection names */

            let cname;

            if (userInput.cname) {
                parseData.forEach(collection => {
                    if (collection.name === userInput.cname) {
                        throw new Error('Duplicate Collection names are not allowed.')
                    };
                });

                cname = userInput.cname;

            } else {
                let split = userInput.import.split('/');
                let rawFileName = split[split.length -1];

                cname = rawFileName.slice(0, -4);
            };


            let collection = {
                name: cname,
                records: records
            }


            console.log('collection body name: ', collection.name);

            /** Push collection into the parsed Database then write this to the database */
            parseData.push(collection);

            let jsonData = JSON.stringify(parseData)


            fs.writeFileSync('./data/collections.json', jsonData);

          })
    } catch (error) {
        console.log(error);
    };



} else if (userInput.pairs === true) {
    console.log('pairs has been selected');
    let currentSet = 'python';
    let activeCollection;
    let records;


    let parseData;

    try {
        let rawData = fs.readFileSync('./data/collections.json');
        parseData = JSON.parse(rawData);


    } catch(err){
        if (err.code === 'ENOENT'){
            throw Error('Unable to assign pairs with no available collections. Please import a new collection')

        } else {
            throw Error(err);
        }
    };


    parseData.forEach(collection => {
        if (collection.name === currentSet) {
            activeCollection = collection;
            // console.log(collection);
        };
    });

    records = activeCollection.records;

    //shuffle records data
    shuffle(records);


    let matrix = [];

    //shell out the matrix
    for (let i = 0; i < records.length / 2; i++) {
        matrix.push([]);
    };

    console.log('records lenght==', records.length)
    console.log(matrix.length);

    // fill matrix
    for (let i = 0; i < records.length; i++) {
        let current = records[i];

        if (i < matrix.length) {

            matrix[i].push(current);

        } else {
            let index = i - matrix.length;

            let firstPerson = matrix[index][0];

            firstPerson.lastMatch = [];
            firstPerson.lastMatch.push(current.id);

            current.lastMatch = [];
            current.lastMatch.push(firstPerson.id);

            matrix[index].push(current);
        };

    };

    // console.log(activeCollection);

    // console.log(parseData[0].records);

    let jsonData = JSON.stringify(parseData)


    fs.writeFileSync('./data/collections.json', jsonData);

    console.log('finished pairs');






} else {
    throw new Error('Command not recognized');
};





