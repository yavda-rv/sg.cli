#!/usr/bin/env node

const inquiry = require("./inquiry");
const file = require("./file")
const treeify = require('treeify');
const { execSync } = require("child_process");
const simpleGit = require("simple-git");

const packageJson = require("./packageJson");
const apiExtractorJson = require("./apiExtractor");
const rollupConfig = require("./rollupConfig");
const tsconfigJson = require("./tsconfigJson");
const gitIgnore = require("./gitIngore");
const entryPoint = require("./entryPoint");



async function createPlugin() {
    let answers = await inquiry.askPluginName();

    file.mkdir(answers.name);
    packageJson.write(answers.name);
    apiExtractorJson.write(answers.name);
    tsconfigJson.write(answers.name);
    rollupConfig.write(answers.name);
    gitIgnore.write(answers.name);

    file.mkdir(file.join(answers.name, "src"));
    entryPoint.write(answers.name);

    const files = {
        [answers.name]: {
            "package.json": null,
            "api-extractor.json": null,
            "rollup.config.js": null,
            "tsconfig.client.json": null,
            ".gitignore": null,
            "src": {
                "EntryPoint.tsx": null
            }
        }
    }
    console.log("files generated:");
    console.log(treeify.asTree(file));
    console.log("preparing...");

    const git = simpleGit({
        baseDir: file.join(process.cwd(), answers.name),
        binary: "git",
        maxConcurrentProcesses: 1
    });
    await git.init();

    const options = { stdio: "inherit", cwd: file.join(process.cwd(), answers.name) };
    execSync("npm install", options);
    execSync("npm run build", options);
}

module.exports = {
    createPlugin
}