const process = require('node:process');
const _ = require('lodash');
const bruh = require("./user.js");

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const args = yargs(hideBin(process.argv)).argv

command = args["_"][0];
switch (command){
    case "add":
        bruh.add(args.title,args.level);
        break;
    case "remove":
        bruh.remove(args.title);
        break;
    case "list":
        bruh.list();
        break;
    case "read":
        bruh.read(args.title);
        break;
}