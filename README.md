# Randomizer

## Table of Contents
---
- [Randomizer](#randomizer)
    - [Overview](#overview)
    - [Installation](#installation)
    - [Commands](#commands)
        - [Import](#import)
        - [Cname](#cname)
        - [Default](#default)
        - [List](#list)
        - [Pairs](#pairs)
        - [Last Group](#last-group)
    - [Authors](#authors)
    - [Collaborations](#collaborations)
    - [License](#license)
    - [Acknowledgements / Resources](#acknowledgements-/-resources)
---

## Overview
This application is designed to assign random groups from a CSV file. They can be pairs, triples, quads, etc. It will read the CSV file, produce groups based on input and will keep track of the previous iteration so pairs will not be the same two times in a row.


## Installation
(Coming soon...)
```bash
$ npm install randomizer
```
but for now use `npm install` after cloning the down the repo. You have the following options to run this program:
```bash
$ node index.js <options>
```
Also npm start is supported as follows:
```bash
$ npm start -- <options>
```

To get started you can set up some dummy data like so:
```bash
$ npm run import-dummy
```

## Commands
All publically available commands are listed below.


### Import
`--import` allows you to import a new set of data from a local csv file. This is the first command to run after initial installation. This is also how you add additional collections to use.

```bash
$ rando --import path/to/example.csv
Import Successful: Collection Name: example
```

Every import will save the data as a new collection and set it as the current set. By default, if no collection name is provided using the secondary flag `--cname <name>`, the name will result in the file name. The above example will have a collection saved with the name of `example`.
- Note: Collection Names are unique


### Cname
`--cname` or Collection name is to be used only when importing new collections. Its a secondary flag to be used with import to assign custom names to your collections.

```bash
$ rando --import path/to/example.csv --cname "My first Collection"
Import Successful: Collection Name: My first Collection
```
- Note: Collection Names are unique

### Default
`--default` or `-d` will inform you of the current active set or if a value is provided, update the current active set to the value provided. Note the value provided must be an available collection, meaning it has already been imported for use.
```bash
$ rando --default
Current set: example
```
OR
```bash
$ rando --default
Current set: example

$ rando --default example2
Current set: example2
```

### List
`--list` provides a list of all available/imported collections and will let you know which collection is the current set.
```bash
$ rando --list
Current Set: example

Available Collections:
[example, example2, example3]
```

### Pairs
`--pairs` or `-p` requires at least one set to be imported. Once a data set has been imported and set, running pairs will randomly group the collection into pairs. They are grouped based off the rows of the imported CSV file. The rows are what are grouped.

The results are logged to the console. Currently there is a history of one, which means if you run `--pairs` multiple times, you will not get the same result twice in a row.

Note: The displaying of the properties is directly related to the columns of the imported CSV file. Currently the application only prints the first two columns of the CSV files, in the example below our headers were `first_name` and `last_name`.

```bash
$ rando --pairs

***************

Group: 1
first_name: Eveleen
last_name: Kittredge

first_name: Elinor
last_name: Zahor

***************

Group: 2
first_name: Drusy
last_name: Ferrarin

first_name: Charil
last_name: Breakey

***************

Group: 3
first_name: Halsy
last_name: Annable

first_name: Cece
last_name: Nance

***************
```

### Last Group
`--last-group` will provide the last grouping called. It will log the results to the console.
```bash
$ rando --last-group

***************

Group: 1
first_name: Eveleen
last_name: Kittredge

first_name: Elinor
last_name: Zahor

***************

...etc
```


## Authors
- Software Developer: Joseph Zabaleta
    - [Official Github](https://github.com/joseph-zabaleta)


## Collaborations
- Software Engineer: Kevin Matthiesen
    - [Official Github](https://github.com/kmatthiesen)

## License
This project is under the MIT License.


## Acknowledgements / Resources
- none
