const fs = require("fs");
const path = require("path");
const process = require("process")

function getRootDir() {
    return path.basename(process.cwd());
}

function getPath(...paths) {
    return path.join(getRootDir(), ...paths);
}

function join(...paths) {
    return path.join(...paths);
}

function dirExists(dir) {
    return fs.existsSync(dir);
}

function mkdir(dir) {
    return fs.mkdirSync(dir);
}

function dirEmpty(dir) {
    if(!dirExists(dir))
        return undefined;
    
    return fs.readdirSync(dir).length == 0;
}

function writeJson(obj, ...paths) {
    let finalpath = path.join(...paths);
    fs.writeFileSync(finalpath, JSON.stringify(obj, null, 4),{encoding: "utf-8"});
}

function writeJs(content, ...paths) {
    let finalpath = path.join(...paths);
    fs.writeFileSync(finalpath, content,{encoding: "utf-8"});
}

module.exports = {
    getRootDir,
    getPath,
    dirExists,
    writeJson,
    writeJs,
    dirEmpty,
    mkdir,
    join
}