const fs = require("fs");
const path = require('path');
const reader = require("../core/readers");
const printer = require("../lib/printer");
const { copyFile } = require("../lib/template");

async function fragment(name) {
    reader.superglueJson();

    let fullPath = path.join("src", name);
    ensureFilePathEmpty(fullPath);
    fs.mkdirSync(fullPath, { recursive: true });

    let context = await generateFiles(fullPath);

    printer.asis("");
    printer.success("Fragment has been geneated.");
    printer.asis(["", "Now import the factory in  EntryPoint:"]);
    printer.info(`import {${context.factoryName}} from "./${name}/FragmentFactory";`);
    printer.asis(["", "And register it with fragment service:"]);
    printer.info(`sgd.fragmentService().register(${context.factoryName});`);
    printer.asis("");
}

function ensureFilePathEmpty(dirPath) {
    if (!fs.existsSync(dirPath))
        return;

    let fsList = fs.readdirSync(dirPath);
    if (fsList.length == 0)
        return;

    printer.error(`Path ${dirPath} must be empty or non-existent.`);
    process.exit(1);
}

async function generateFiles(fullPath) {
    let fragmentId = fullPath.split("/").slice(-1)[0];
    let packageFilePath = fullPath.split("/").map(i => "../").join("") + "package.json";
    let fragmentName = fragmentId.split(/(?=[A-Z])/).join(" ");
    let factoryName = fragmentId + "Factory";

    let context = {
        packageFilePath,
        fragmentId,
        fragmentName,
        factoryName
    }

    let templateDir = path.join(__dirname, "../core/fragment_template");

    await copyFile(
        path.join(templateDir, "FragmentFactory.tsx"),
        path.join(fullPath, "FragmentFactory.tsx"),
        context);

    await copyFile(
        path.join(templateDir, "Fragment.tsx"),
        path.join(fullPath, "Fragment.tsx"),
        context);

    await copyFile(
        path.join(templateDir, "FragmentElement.tsx"),
        path.join(fullPath, "FragmentElement.tsx"),
        context);

    return context;
}

module.exports = {
    fragment
}