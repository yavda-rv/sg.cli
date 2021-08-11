const express = require('express');
const path = require('path');
const cp = require("child_process");
const printer = require("../lib/printer");

const app = express();

async function start(port) {
    spwan("COMPILE", "npm", ["run", "build:tsc:watch"]);
    spwan("BUNDLE ", "npm", ["run", "build:bundle:watch"]);
    runserver(port);
}

function spwan(tag, command, args) {
    const child = cp.spawn(command, args, { stdio:"inherit"});
    child.on("exit", (code, singal) => {
        console.log(`${tag}: existed with code ${code} and signal ${singal}`);
    });
}

function runserver(port) {
    const libPath = path.join(process.cwd(), "lib");
    app.use(express.static(libPath));
    app.get("/", function (req, res) {
        return res.end("Superglue server running and serving path: " + libPath);
    });

    app.listen(port, () => {
        printer.success(`SERVER : running at http://localhost:${port}/`);
    });
}

module.exports = {
    start
}