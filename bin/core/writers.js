const fs = require('fs');
const path = require('path');
const os = require("os");
const ejs = require("ejs");


function writeJson(path, json) {
    fs.writeFileSync(path, JSON.stringify(json, null, 4), { encoding: "utf-8" });
}

function packageJson(name) {
    writeJson(path.join(name, "package.json"), {
        name: name,
        version: "1.0.0-alpha.0",
        description: name,
        main: `lib/${name}.js`,
        types: `lib/${name}.d.ts`,
        files: ["lib", "!/**/*.map", "!/**/*.json"],
        scripts: {
            "link:shell": "npm link sg.shell",
            "link:all": "npm run link:shell",
            "build:clear": "rimraf ./.temp && rimraf ./lib",
            "build:tsc": "npx tsc -p ./tsconfig.client.json",
            "build:tsc:watch": "npm run build:tsc -- -w",
            "build:bundle": "npx rollup -c",
            "build:bundle:watch": "npm run build:bundle -- -w --watch.buildDelay 500",
            "build:dts": "npx api-extractor run --local --verbose",
            "build:quick": "npm run build:tsc && npm run build:bundle",
            "build:watch": "npm-run-all -p build:tsc:watch build:bundle:watch",
            "build": "npm run build:clear && npm run build:tsc && npm run build:bundle && npm run build:dts"
        },
        author: os.userInfo().username,
        license: "ISC",
        devDependencies: {
            "@microsoft/api-extractor": "^7.9.2",
            "@rollup/plugin-commonjs": "^12.0.0",
            "@rollup/plugin-json": "^4.1.0",
            "@rollup/plugin-node-resolve": "^8.4.0",
            "@rollup/plugin-replace": "^2.3.2",
            "@types/papaparse": "^5.2.4",
            "@types/react": "16.9.35",
            "@types/react-dom": "^16.9.8",
            "@types/react-select": "^3.0.14",
            "npm-run-all": "^4.1.5",
            "react": "^16.13.1",
            "react-dom": "^16.13.1",
            "rimraf": "^3.0.2",
            "rollup": "^2.23.0",
            "rollup-plugin-terser": "^6.1.0",
            "sg.shell": "../output/sg.shell-1.10.3.tgz",
            "typescript": "^3.9.7"
        },
        dependencies: {}
    });
}

function apiExtractorJson(name) {
    writeJson(path.join(name, "api-extractor.json"), {
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
    });
}

function tsConfigJson(name) {
    writeJson(path.join(name, "tsconfig.client.json"), {
        compilerOptions: {
            module: "ES6",
            moduleResolution: "node",
            resolveJsonModule: true,
            jsx: "react",
            target: "ESNext",
            lib: ["ES6", "DOM"],
            outDir: ".temp/",
            removeComments: true,
            sourceMap: true,
            declaration: true,
            declarationMap: true,
            stripInternal: true
        },
        include: ["src/"],
        exclude: ["lib", "node_modules"]
    });
}

async function rollupConfigJs(name) {
    let content = await ejs.renderFile(path.join(__dirname, "rollupconfig.template.ejs"), {});
    fs.writeFileSync(path.join(name, "rollup.config.js"), content, { encoding: "utf-8" });
}

function gitIgnore(name) {
    const content = `node_modules
    lib
    .temp`;
    fs.writeFileSync(path.join(name, ".gitignore"), content, { encoding: "utf-8" });
}

function superglueJson(name) {
    writeJson(path.join(name, "superglue.json"), {
        "release": {
            "preId": "alpha",
            "main": "lib/index.min.js",
            "package": {
                "include": []
            },
            "publish": {
                "dir": "../releases/"
            }
        }
    });
}

async function entryPoint(name) {
    let content = await ejs.renderFile(path.join(__dirname, "entrypoint.template.ejs"), {});
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