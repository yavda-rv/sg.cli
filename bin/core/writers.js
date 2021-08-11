const fs = require('fs');
const path = require('path');
const os = require("os");
const ejs = require("ejs");

async function packageJson(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/package.json"), {name: name, user: os.userInfo().username});
    fs.writeFileSync(path.join(name, "package.json"), content, { encoding: "utf-8" });
}

async function apiExtractorJson(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/api-extractor.json"), {});
    fs.writeFileSync(path.join(name, "api-extractor.json"), content, { encoding: "utf-8" });
}

async function tsConfigJson(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/tsconfig.client.json"), {});
    fs.writeFileSync(path.join(name, "tsconfig.client.json"), content, { encoding: "utf-8" });
}

async function rollupConfigJs(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/rollup.config.js"), {});
    fs.writeFileSync(path.join(name, "rollup.config.js"), content, { encoding: "utf-8" });
}

async function gitIgnore(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/.gitignore"), {});
    fs.writeFileSync(path.join(name, ".gitignore"), content, { encoding: "utf-8" });
}

async function superglueJson(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/superglue.json"), {});
    fs.writeFileSync(path.join(name, "superglue.json"), content, { encoding: "utf-8" });
}

async function entryPoint(name) {
    let content = await ejs.renderFile(path.join(__dirname, "templates/src/EntryPoint.ts"), {});
    fs.writeFileSync(path.join(name, "src", "EntryPoint.ts"), content, { encoding: "utf-8" });
}

module.exports = {
    superglueJson,
    packageJson,
    apiExtractorJson,
    tsConfigJson,
    rollupConfigJs,
    gitIgnore,
    entryPoint
}