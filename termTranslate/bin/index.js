#! /usr/bin/env node
const yargs = require('yargs');
const utils = require('./utils.js');

const usage = '\nUsage: tran <lang_name> sentence to be translated';
const options = yargs.usage(usage).option("l", {
    alias: "languages",
    describe: "List all supported languages.",
    type: "boolean",
    demandOption: false
}).help(true).argv;

var sentence = utils.parseSentence(yargs.argv._);


/* yargs: simplify process of parsing arguments and help organize command line flags
default: --help and --version
compulsory option: demandOption: true => missing argument error 
https://dev.to/rushankhan1/build-a-cli-with-node-js-4jbi
*/