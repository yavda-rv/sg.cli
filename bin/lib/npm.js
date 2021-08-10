const { execASync } = require("child_process");
const verbose = require("./verbose");

function exec(command) {
    try {
        return execASync(command, { stdio: verbose.getVerbose()? "inherit": "ignore" });
    } catch (err) {
        throw err;
    }
}

async function run(name, ...args) {
    return exec(`npm run ${name} ${args.join(" ")}`);
}

function npx(command) {
    return exec(`npx ${command}`);
}

function version(type, opts) {
    const pNoTag = (opts && opts.tag === false) ? "--no-git-tag-version" : "";
    const preId = (opts && opts.preid) ? `--preid=${opts.preid}` : "";
    let command=`npm ${pNoTag} version ${type} ${preId}`;
    return exec(command);
}

module.exports = {
    run,
    version,
    npx
}
