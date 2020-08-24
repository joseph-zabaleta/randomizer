'use strict';

/**3rd Party Libraries */
const fs = require('fs');

/** Local Files */
const settings = require('../settings/settings.js');
const { shuffle } = require('../utils/helper-functions.js');
const display = require('../display/display.js');

/**
 *
 * @param {*} set current collection set
 * @param {*} dataPath current path to collections data
 */
function pairs() {
    let records;
    let parseData;

    try {

        if (fs.existsSync(settings.dataPath)) {

            let rawData = fs.readFileSync(settings.dataPath);
            parseData = JSON.parse(rawData);

        } else {
            throw Error('Unable to assign pairs with no available collections. Please import a new collection')
        };

    } catch(err){
        throw err;
    };


    parseData.forEach(collection => {
        if (collection.name === settings.getDefault()) {
            records = collection.records;
        };
    });

    if (!records) {
        let error = `No records were found for Collection: ${settings.getDefault()}`
        throw new Error(error);
    };


    shuffle(records);

    let matrix = [];

    //shell out the matrix
    for (let i = 0; i < records.length / 2; i++) {
        matrix.push([]);
    };


    let flag = false;

    // fill matrix
    for (let i = 0; i < records.length; i++) {
        let currentRecord = records[i];
        let nextRecord = (i + 1 !== records.length) ? records[i + 1] : null;

        if (i < matrix.length) {

            matrix[i].push(currentRecord);

        } else {
            let index = i - matrix.length;
            let firstPerson = matrix[index][0];
            let secondPerson = (index + 1 !== matrix.length)  ? matrix[index + 1][0] : null;


            if (firstPerson.lastMatch.length === 0) {
                firstPerson.lastMatch = [];
                firstPerson.lastMatch.push(currentRecord.id);
                matrix[index].push(currentRecord);
            } else if ( (nextRecord !== null) &&
                        (secondPerson !== null) &&
                        (flag) &&
                        (secondPerson.lastMatch.includes(nextRecord.id)) ) {

                let problemChild = matrix[index].pop();

                firstPerson.lastMatch = [];
                firstPerson.lastMatch.push(nextRecord.id)
                nextRecord.lastMatch = [];
                nextRecord.lastMatch.push(firstPerson.id);
                matrix[index].push(nextRecord);

                secondPerson.lastMatch = [];
                secondPerson.lastMatch.push(problemChild.id)
                problemChild.lastMatch = [];
                problemChild.lastMatch.push(secondPerson.id);
                matrix[index + 1].push(problemChild);

                flag = true;

            } else if (flag) {

                flag = false;
                continue;

            } else if ( ((nextRecord !== null) &&
                        (secondPerson !== null)) &&
                        ((firstPerson.lastMatch.includes(currentRecord.id)) ||
                        (secondPerson.lastMatch.includes(nextRecord.id))) ) {

                firstPerson.lastMatch = [];
                firstPerson.lastMatch.push(nextRecord.id)
                nextRecord.lastMatch = [];
                nextRecord.lastMatch.push(firstPerson.id);
                matrix[index].push(nextRecord);

                secondPerson.lastMatch = [];
                secondPerson.lastMatch.push(currentRecord.id)
                currentRecord.lastMatch = [];
                currentRecord.lastMatch.push(secondPerson.id);
                matrix[index + 1].push(currentRecord);

                flag = true;

            }  else {
                firstPerson.lastMatch = [];
                firstPerson.lastMatch.push(currentRecord.id);
                currentRecord.lastMatch = [];
                currentRecord.lastMatch.push(firstPerson.id);
                matrix[index].push(currentRecord);
            };
        };
    };


    settings.saveMatrix(matrix);
    settings.save();

    display.printMatrix(matrix);


    let jsonData = JSON.stringify(parseData)
    fs.writeFileSync(settings.dataPath, jsonData);
}

module.exports = pairs;
