const express = require('express');
const path = require('path');
const cp = require("child_process");

const app = express();

async function start(port) {
    const tsc = cp.spawn("npm", ["run", "build:tsc:watch"], { stdio: "inherit" });
    const rollup = cp.spawn("npm", ["run", "build:bundle:watch"], {stdio:"inherit"});

    runserver(port);
}

function runserver(port) {
    const libPath = path.join(process.cwd(), "lib");
    app.use(express.static(libPath));
    app.get("/", function (req, res) {
        return res.end("Superglue server running and serving " + process.cwd());
    });

    console.log('here');
    app.listen(port, () => {
        console.log("server running at port: " + port);
    });
}

module.exports = {
    start
}