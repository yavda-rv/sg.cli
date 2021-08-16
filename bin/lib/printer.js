const msg = require("./msg");

function print(value, method) {
    if (Array.isArray(value)) {
        value.forEach(m => console.log(method(m)));
    } else {
        console.log(method(value));
    }
}

function error(message) {
    print(message, msg.error);
}

function warn(message) {
    print(message, msg.warn);
}

function info(message) {
    print(message, msg.info);
}

function success(message) {
    print(message, msg.success);
}

module.exports = {
    error,
    warn,
    info,
    success
}