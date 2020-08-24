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


module.exports = { shuffle };
