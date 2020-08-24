'use strict';

/**3rd Party Libraries */
const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

/** Local Files */
const settings = require('../settings/settings.js');



/**
 *
 * @param {*} filePath Path to CSV file to be imported
 * @param {*} collectionName Collection name
 */
function importFile(filePath, collectionName) {
    let records = [];
    let cname;

    try {

        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {

            row.id = uuidv4();
            row.lastMatch = [];
            records.push(row);

          })
          .on('end', () => {

            let parseData;

            try {

                if (fs.existsSync(settings.dataPath)) {

                    let rawData = fs.readFileSync(settings.dataPath);
                    parseData = JSON.parse(rawData);

                } else {
                    parseData = [];
                };

            } catch(err){
                console.log('Something went wrong with reading the collections data.');
                throw err;
            };


            if (collectionName) {
                cname = collectionName;
            } else {
                let split = filePath.split('/');
                let rawFileName = split[split.length -1];

                cname = rawFileName.slice(0, -4);
            };


            if (settings.getCollections().includes(cname)) {
                let error = `Duplicate Collection names are not allowed. Collection Name: ${cname} is already in use.`
                throw new Error(error);
            };


            settings.addCollection(cname);

            let collection = {
                name: cname,
                records: records
            }


            console.log(`Import Successful: Collection Name: ${collection.name}`);


            parseData.push(collection);
            let jsonData = JSON.stringify(parseData)
            fs.writeFileSync(settings.dataPath, jsonData);

            settings.save();

        });
    } catch (error) {
        console.log('import catch',error);
    };


};

module.exports = importFile;
