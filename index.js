#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { createPlugin } = require("./plugin/createPlugin");
const { release } = require("./bin/commands/release");

const args = yargs(process.argv.slice(2))
    .command("plugin", "Create Superglue plugin", {}, () => {
        //createPlugin();
        console.log("create plugin");
    })
    .command({
        command: "release <type> [verbose]",
        desc: "Prepares and publishes a release.",
        builder: (yargs) => {
            yargs.positional("type", { choices: ["major", "minor", "patch"] })
            yargs.positional("verbose", {alias:["v"],desc:"verbosity of command"})
        },
        handler: (argv) => {
            console.log(argv);
            //release(argv.type);
        }
    })
    .demandCommand()
    .help()
    .argv;