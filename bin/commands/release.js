const columnify = require("columnify");
const msg = require("../lib/msg");
const printer = require("../lib/printer");
const archiver = require("../lib/archiver");
const npm = require("../lib/npm");
const git = require("../lib/git");
const reader = require("../core/readers");
const spinner = require("../lib/spinner");

async function release(type) {
    let superglueJson = reader.superglueJson();

    await spinner.spin("verifing there is nothing to commit in git...", verifyNothingToCommit());
    printer.info("git is clean. nothing to commit");

    await spinner.spin("building project...", build());
    printer.info("Build successful")

    let releasedVersion = await spinner.spin("Updating version...", updateVersion(type));
    printer.info(`Version updated to: ${releasedVersion}`)

    await spinner.spin("building project with new version info...", build());
    printer.info("Build successful with new version")

    await spinner.spin("minifying and bundling javaScript...", minify(superglueJson));
    printer.info("minified and bundled");

    let result = await spinner.spin("Preparing release package...", archive(superglueJson));
    printer.info(`${result.zipFile} written.`);
    printer.info("Files included:");
    console.log(columnify(result.files, { columns: ["PATH", "STATUS"] }));

    let devVersion = await spinner.spin("Incrementing to dev version...", incrementDevVersion(superglueJson));
    printer.info(`Version updated to dev: ${devVersion}`);

    await spinner.spin("pushing changes to remote...", push());
    printer.info("Changes pushed to git");

    const cmdResult = {
        "Released": msg.success(releasedVersion),
        "Starting": msg.warn(devVersion)
    };
    console.log(columnify(cmdResult, { showHeaders: false }));
    printer.success("Release successful.");
}

async function verifyNothingToCommit() {
    await git.pull();
    let result = await git.status();
    if (!result.isClean()) {
        printer.error("Directory is not clean. Make sure the directory is clean before release.");
        process.exit(3);
    }
}

async function build() {
    await npm.run("build");
}

async function updateVersion(version) {
    await npm.version(version);
    return reader.packageJson().version;
}

async function minify(json) {
    await npm.npx(`rollup -c -p 'terser={compress:true,mangle:true}' -o ${json.release.main}`);
}

async function archive(superglueJson) {
    let filesToZip = [];
    filesToZip.push("package.json");
    filesToZip.push("superglue.json");
    filesToZip.push(superglueJson.release.main);
    filesToZip.push(...superglueJson.release.package.include);
    try {
        let dir = superglueJson.release.publish.dir;
        let packageJson = reader.packageJson();
        let name = `${packageJson.name}-${packageJson.version}.zip`;
        return await archiver.write(dir, name, "zip", filesToZip);
    } catch (err) {
        printer.error(`${err.code}: ${err.message}`)
    }
}

async function incrementDevVersion(json) {
    await npm.version("prerelease", { tag: false, preid: json.release.preId });
    let currentVersion = reader.packageJson().version;
    await git.add(["package.json"]);
    await git.commit(`"starting v${currentVersion}"`);
    return currentVersion;
}

async function push() {
    await git.push();
    await git.pushTags();
}

module.exports = {
    release
}