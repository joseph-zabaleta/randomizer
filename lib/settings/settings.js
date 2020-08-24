'use strict';

const fs = require('fs');

class Settings {

    baseDataDir = './data';
    settingsPath = this.baseDataDir + '/settings.json';
    dataPath = this.baseDataDir + '/collections.json';

    constructor() {
        this.load();
    };


    setDefault(cname) {

        if (this.jsonSettings.collectionList.includes(cname)) {
            this.jsonSettings.defaultSet = cname;
        } else {
            console.log(`No collection found with provided value: ${cname}`);
            console.log('To view all collections run the --list command');
        }


    };

    getDefault() {
        return this.jsonSettings.defaultSet;
    }

    addCollection(cname) {
        this.jsonSettings.collectionList.push(cname);
        this.setDefault(cname);
    };

    getCollections() {
        return this.jsonSettings.collectionList;
    }

    load() {

        if (!fs.existsSync(this.baseDataDir)) {
            fs.mkdirSync(this.baseDataDir);
        };


        try {

            if (fs.existsSync(this.settingsPath)) {
                this.jsonSettings = JSON.parse(fs.readFileSync(this.settingsPath));
            } else {

                this.jsonSettings = {
                    defaultSet: '',
                    collectionList: [],
                    previousMatrix: [],
                }

                let settings = JSON.stringify(this.jsonSettings);

                fs.writeFileSync(this.settingsPath, settings);
            };

        } catch (err) {
            console.log('Something went wrong loading settings');
            throw err;
        };


    };

    save() {

        try {
            let settings = JSON.stringify(this.jsonSettings);
            fs.writeFileSync(this.settingsPath, settings);
        } catch(err) {
            console.log('Something went wrong with saving to settings. Please try the operation again.');
            throw err;
        };

    };

    saveMatrix(matrix) {
        this.jsonSettings.previousMatrix = matrix;
    };

};

module.exports = new Settings();
