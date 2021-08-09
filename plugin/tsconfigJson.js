const os = require("os");
const file = require("./file")

function getTsConfigJson(name) {
    return {
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
    }
}

function write(name) {
    file.writeJson(getTsConfigJson(name), name, "tsconfig.client.json");
}

module.exports = {
    write
}