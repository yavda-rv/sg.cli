#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { create } = require("./bin/commands/create");
const { release } = require("./bin/commands/release");

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
    .demandCommand()
    .help()
    .showHelpOnFail(true)
    .recommendCommands()
    .argv;