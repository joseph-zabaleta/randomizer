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
        this.jsonSettings.defaultSet = cname;
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

};

module.exports = new Settings();
