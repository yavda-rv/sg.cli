const express = require('express');
const path = require('path');
const cp = require("child_process");
const printer = require("../lib/printer");
const readers = require("../core/readers");

const app = express();

async function start(port) {
    spwan("COMPILE", "npm", ["run", "build:tsc:watch"]);
    spwan("BUNDLE ", "npm", ["run", "build:bundle:watch"]);
    runserver(port);
}

function spwan(tag, command, args) {
    const child = cp.spawn(command, args, { stdio: "inherit" });
    child.on("exit", (code, singal) => {
        console.log(`${tag}: existed with code ${code} and signal ${singal}`);
    });
}

function runserver(port) {
    const libPath = path.join(process.cwd());
    app.use(express.static(libPath));
    app.get("/", function (req, res) {
        console.log(`SERVER: configuration requested`);
        let config = buildConfiguration();
        return res.json(config).end();
    });

    app.listen(port, () => {
        printer.success(`SERVER : running at http://localhost:${port}/`);
    });
}

function buildConfiguration() {
    let package = readers.packageJson();
    let superglue = readers.superglueJson();
    
    let result =  {
        id: package.name,
        version: package.version,
        displayName: package.displayName,
        deps: [],
        url: package.main,
        configuration: superglue.configuration
    }
    return result;
}

module.exports = {
    start
}