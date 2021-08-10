const { execSync } = require("child_process");

function exec(command) {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (err) {
        throw err;
    }
}

async function run(name, ...args) {
    exec(`npm run ${name} ${args.join(" ")}`);
}

async function npx(command) {
    exec(`npx ${command}`);
}

async function version(type, opts) {
    const pNoTag = (opts && opts.tag === false) ? "--no-git-tag-version" : "";
    const preId = (opts && opts.preid) ? `--preid=${opts.preid}` : "";
    let command=`npm ${pNoTag} version ${type} ${preId}`;
    exec(command);
}

module.exports = {
    run,
    version,
    npx
}
