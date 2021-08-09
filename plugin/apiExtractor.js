const os = require("os");
const file = require("./file")

function getApiExtractorJson() {
    return {
        "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
        "projectFolder": ".",
        "mainEntryPointFilePath": "<projectFolder>/.temp/src/EntryPoint.d.ts",
        "bundledPackages": [],
        "compiler": {
            "tsconfigFilePath": "<projectFolder>/tsconfig.client.json"
        },
        "dtsRollup": {
            "enabled": true,
            "publicTrimmedFilePath": "<projectFolder>/lib/<unscopedPackageName>.d.ts",
            "untrimmedFilePath": "<projectFolder>/lib/<unscopedPackageName>.d.ts"
        },
        "docModel": {
            "enabled": false
        },
        "apiReport": {
            "enabled": false
        },
        "messages": {
            "extractorMessageReporting": {
                "ae-missing-release-tag": {
                    "logLevel": "none"
                }
            }
        }
    }
}

function write(name) {
    file.writeJson(getApiExtractorJson(), name, "api-extractor.json");
}

module.exports = {
    write
}