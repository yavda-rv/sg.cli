const fs = require("fs");
const path = require('path');
const printer = require("../lib/printer");
const template = require("../lib/template");
const spinner = require("../lib/spinner");
const npm = require("../lib/npm");
const git = require("../lib/git");
const os = require("os");
const treeify = require("treeify")

async function create(name) {
    createDirectory(name);

    await spinner.spin("Generating plugin files...", generateFiles(name));

    process.chdir(name);

    await spinner.spin("Initalizing git...", gitInit(process.cwd()));
    printer.info("Git initialized");

    await spinner.spin("Installing dependencies...", npm.install());
    printer.info("Dependencies installed");

    await spinner.spin("Compiling plugin...", npm.run("build"));
    printer.info("Plugin compiled");

    printer.success("Plugin creation successful.");
}

async function generateFiles(dir) {
    let context = { 
        name: dir, 
        user: os.userInfo().username 
    };

    let result = {};
    await template.copyDir(path.join(__dirname, "../core/templates"), dir, context, result);

    printer.info("Plugin files generated: ");
    printer.info(treeify.asTree({[dir]: result}));
}

async function gitInit(cwd) {
    await git.cwd(cwd);
    await git.init();
}

function createDirectory(name) {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
        return;
    }

    if (!fs.existsSync(name)) {
        printer.error(`${name} is not valid. Please choose another name.`)
        process.exit(3);
    }

    let stat = fs.lstatSync(name);
    if (stat.isDirectory() && fs.readdirSync(name).length == 0) // the directory is empty. OK for us.
        return;

    if (stat.isFile()) {
        printer.error(`'${name} file already exists. Please choose another name.'`);
        process.exit(4);
    }

    printer.error(`${name} directory is not empty. Plase choose another name.`);
    process.exit(5);
}

module.exports = {
    create
}