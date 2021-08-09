const os = require("os");
const file = require("./file")

function getPackageJson(name) {
    return {
        name: name,
        version: "1.0.0-alpha.0",
        description: name,
        main: `lib/${name}.js`,
        types: `lib/${name}.d.ts`,
        files: ["lib","!/**/*.map","!/**/*.json"],
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
            "build": "npm run build:clear && npm run build:tsc && npm run build:bundle && npm run build:dts",
            "release": "node ./release.js release"
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
            "sg.shell": "../output/sg.shell-1.8.0.tgz",            
            "typescript": "^3.9.7"
        },
        dependencies: {}
    }
}

function write(name) {
    file.writeJson(getPackageJson(name), name, "package.json");
}

module.exports = {
    write
}