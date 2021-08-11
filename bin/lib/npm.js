const cp = require("child_process");
const utils = require("util");
const verbose = require("./verbose");

function exec(command) {
    const execAsync = utils.promisify(cp.exec);    
    try {
        return execAsync(command, { stdio: verbose.getVerbose()? "inherit": "ignore" });
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

/**
 * Runs npm version command
 * @param {string} type 
 * @param {{tag?: boolean, preid?: string}} opts 
 * @returns 
 */
function version(type, opts) {
    const pNoTag = (opts && opts.tag === false) ? "--no-git-tag-version" : "";
    const preId = (opts && opts.preid) ? `--preid=${opts.preid}` : "";
    let command=`npm ${pNoTag} version ${type} ${preId}`;
    return exec(command);
}

function install() {
    return exec("npm install");
}

module.exports = {
    run,
    version,
    install,
    npx
}
