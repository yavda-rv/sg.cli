const chalk = require("chalk");

function error(m) {
    return chalk.redBright(m);
}

function warn(m) {
    return chalk.yellowBright(m);
}

function info(m) {
    return chalk.blueBright(m);
}

function success(m) {
    return chalk.greenBright(m);
}

function asis(m) {
    return m;
}

module.exports = {
    error,
    warn,
    info,
    success,
    asis
}