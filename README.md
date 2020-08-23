# Randomizer

## Table of Contents
---
- [Randomizer](#randomizer)
    - [Installation](#installation)
    - [Commands](#commands)

---

## Overview
This application is designed to assign random groups from a CSV file. They can be pairs, triples, quads, etc. It will read the CSV file, produce groups based on input and will keep track of the previous iteration so pairs will not be the same two times in a row.

## Installation
(Coming soon...)
```bash
npm install randomizer
```

## Commands
All publically available commands are listed below.

### Import
Import allows you to import a new set of data from a local csv file. This is the first command to run after initial installation. This is also how you add additional collections to use.

```bash
rando --import path/to/example.csv
```


## Features To Accomplish End Goal syntax


### Phase 1
rando --import /path/to/CSV [-i] with a second flag --name "name of collection" [-n]
    `rando --import /path/to/file.csv --name 'class-123`
rando --pairs [-p]
rando --help

### Future Phases TBD
rando --set (switching between collections)
rando -c (show current collection that is set)
randon --collections (shows a list of all available collections)
rando --triple -t
rando --quad -q

## Authors
- Software Developer: Joseph Zabaleta
  - [Official Github](https://github.com/joseph-zabaleta)

## Collaborations
- none

## License
This project is under the MIT License.

## Acknowledgements / Resources
- none
