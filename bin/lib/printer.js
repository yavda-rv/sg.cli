const chalk = require("chalk");

function error(message) {
    if (Array.isArray(message)) {
        message.forEach(m => error(m));
    } else {
        console.log(chalk.redBright(message));
    }
}

function errorNoLog(message) {
    return chalk.redBright(message);
}

function warn(message) {
    console.log(chalk.yellowBright(message));
}
function warnNoLog(message) {
    chalk.yellowBright(message);
}

function info(message) {
    console.log(chalk.blueBright(message));
}
function infoNoLog(message) {
    return chalk.blueBright(message);
}

function success(message) {
    console.log(chalk.greenBright(message));
}
function successNoLog(message) {
    return chalk.greenBright(message);
}

module.exports = {
    error,
    warn,
    info,
    success,
    errorNoLog,
    warnNoLog,
    infoNoLog,
    successNoLog
}