'use strict';

const settings = require('../settings/settings.js');

class Display {
    constructor(){};

    printObject(obj) {
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


    printMatrix(matrix) {

        console.log('***************');

        matrix.forEach((group, i) => {

            console.log(`\nGroup: ${i + 1}`)

            group.forEach(obj => {
                this.printObject(obj);
            });

            console.log('***************');
        });
    };


    printPreviousMatrix() {
        this.printMatrix(settings.jsonSettings.previousMatrix);
    };


    printDefaultSet() {
        console.log(`Current set: ${settings.getDefault()}`);
    };


    printAllCollections() {
        console.log(`Current set: ${settings.getDefault()}\n`);
        console.log('Available Collections:');
        console.log(settings.getCollections());
    };

};

module.exports = new Display();
