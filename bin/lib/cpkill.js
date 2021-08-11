const printer = require("./printer");

const cpList = {};

process.on("uncaughtException", function (err) {
    printer.error(err);
    process.exit(1);
});

process.on("SIGINT", function (code) {
    printer.warn("Quitting...")
    for(let p in cpList) {
        cpList[p].kill('SIGKILL');
    }
    process.exit();
});

function add(key, proc) {
    cpList[key] = proc;
}

function remove(key) {
    delete cpList[key];
}

function kill(key) {
    let cp = cpList[key];
    if(cp) {
        cp.kill('SIGKILL');
    }
}

module.exports = {
    add,
    remove,
    kill
}