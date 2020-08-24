'use strict';

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


function printObject(obj) {

    let values = [];

    Object.keys(obj).forEach(key => {
        if (key === 'id' || key === 'lastMatch') {
            return;
        };

        let temp = `${key}: ${obj[key]} \n`

        values.push(temp);
    });

    let output = '';

    values.forEach(element => {
        output += element;
    });

    console.log(output);


};


module.exports = { shuffle, printObject };
