const fs = require("fs");
const path = require('path');
const printer = require("../lib/printer");
const writers = require("../core/writers");
const spinner = require("../lib/spinner");
const npm = require("../lib/npm");
const git = require("../lib/git");

async function create(name) {
    createDirectory(name);
    createDirectory(path.join(name, 'src'));

    printer.info("Writing plugin files...");
    await writers.superglueJson(name);
    await writers.packageJson(name);
    await writers.apiExtractorJson(name);
    await writers.tsConfigJson(name);
    await writers.rollupConfigJs(name);
    await writers.gitIgnore(name);
    await writers.entryPoint(name);
    printer.info("Plugin files are generated");

    process.chdir(name);
    
    await spinner.spin("Initalizing git...", gitInit(process.cwd()));
    printer.info("Git initialized");

    await spinner.spin("Installing dependencies...", npmInit());
    printer.info("Dependencies installed");

    printer.success("Plugin creation successful.");
}

async function gitInit(cwd) {
    await git.cwd(cwd);
    await git.init();
}

async function npmInit() {
    await npm.install();
    await npm.run("build");
}

function createDirectory(name) {
    if(!fs.existsSync(name)) {
        fs.mkdirSync(name);
        return;
    }

    if(!fs.existsSync(name)) {
        printer.error(`${name} is not valid. Please choose another name.`)
        process.exit(3);
    }

    let stat = fs.lstatSync(name);
    if(stat.isDirectory() && fs.readdirSync(name).length == 0) // the directory is empty. OK for us.
        return;

    if(stat.isFile()) {
        printer.error(`'${name} file already exists. Please choose another name.'`);
        process.exit(4);
    }

    printer.error(`${name} directory is not empty. Plase choose another name.`);
    process.exit(5);
}

module.exports = {
    create
}