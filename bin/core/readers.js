const path = require("path");
const fs = require("fs");
const schema = require("./superglueSchema");
const printer = require("../lib/printer");

function superglueJson() {
    let fullPath = path.join(process.cwd(), "superglue.json");
    if (fs.existsSync(fullPath)) {
        const json = JSON.parse(fs.readFileSync(fullPath).toString());
        let result = schema.verify(json);
        if (result.isValid) {
            return json;
        } else {
            printer.error(["superglue.json schema invalid. Found these errors:", "", ...result.errors]);
            process.exit(2);
        }
    } else {
        printer.error("superglue.json file not found. Please run the command from superglue plugin folder.");
        process.exit(1);
    }
}

function packageJson() {
    let fullPath = path.join(process.cwd(), "package.json");
    return JSON.parse(fs.readFileSync(fullPath).toString());
}

module.exports = {
    packageJson,
    superglueJson
}