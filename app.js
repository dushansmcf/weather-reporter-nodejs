// This is the main script where it gets the whether information via http client
// install the following modules;
// npm i https
// npm i yargs
// npm i chalk

const yargs = require('yargs');
const chalk = require('chalk');
const weatherService = require('./weater_service.js')

// get the command with options and execute
yargs.command({
    command: 'get',
    describe: 'Getting Weather Data by location string',
    builder: { 
        key:{
            describe: 'The API Key',
            demandOption: true,
            type: 'string'
        },
        area:{
            describe: 'The name of the area',
            demandOption: true,
            type: 'string'
        },
        country:{
            describe: 'The name of the country',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        weatherService.getLocationIdByNameAndCountry(argv.key, argv.area, argv.country);
    }
});

yargs.parse()