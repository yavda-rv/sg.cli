#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { create } = require("./bin/commands/create");
const { release } = require("./bin/commands/release");
const { start } = require("./bin/commands/start");

yargs(process.argv.slice(2))
    .command({
        command: "create [name]",
        desc: "Creates superglue plugin",
        builder: (yargs) => {
            yargs.positional("name", { desc: "name of the plugin" })
        },
        handler: (argv) => {
            create(argv.name);
        }
    })
    .command({
        command: "release <type> [verbose]",
        desc: "Prepares and publishes a release.",
        builder: (yargs) => {
            yargs.positional("type", { choices: ["major", "minor", "patch"] })
            yargs.positional("verbose", { alias: ["v"], desc: "verbosity of command" })
        },
        handler: (argv) => {
            require("./bin/lib/verbose").setVerbose(argv.verbose);
            release(argv.type);
        }
    })
    .command({
        command: "start [port]",
        desc: "Starts dev server on the given port",
        builder: (yargs) => {
            yargs.positional("port", { alias: ["p"], desc: "port at which development server should run", default: 8080, type: "number" })
        },
        handler: (argv) => {
            //console.log(argv.port);
            start(argv.port);
        }
    })
    .demandCommand()
    .help()
    .showHelpOnFail(true)
    .recommendCommands()
    .argv;