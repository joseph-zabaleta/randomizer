'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

/**
 *
 * @param {*} filePath Path to CSV file to be imported
 * @param {*} collectionName Collection name
 * @param {*} dataPath Path to collection data
 */
function importFile(filePath, collectionName) {
    let records = [];

    try {
        //READING FROM THE PATH PROVIDED
        fs.createReadStream(filePath)
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

            if (collectionName) {
                parseData.forEach(collection => {
                    if (collection.name === collectionName) {
                        throw new Error('Duplicate Collection names are not allowed.')
                    };
                });

                cname = collectionName;

            } else {
                let split = filePath.split('/');
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
}

module.exports = importFile;
