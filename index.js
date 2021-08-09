#!/usr/bin/env node

const yargs = require("yargs/yargs");
const {createPlugin} = require("./plugin/createPlugin");

const args = yargs(process.argv.slice(2))
    .command("plugin", "Create Superglue plugin",{}, ()=>{
        createPlugin();
    })
    .command({
        command: "test <value>",
        aliases: ["t"],
        desc: "this is test command",
        builder: (yargs)=> yargs.default("value", "true"),
        handler: (argv)=>{
            console.log("argv.value")
        }
    })
    .demandCommand()
    .help()
    .argv;