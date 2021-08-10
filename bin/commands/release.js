const fs = require("fs");
const path = require("path");
const msg = require("../lib/msg");
const printer = require("../lib/printer");
const sgSchema = require("../core/superglueSchema");
const clui = require("clui");
const archiver = require("archiver");
const npm = require("../lib/npm");
const columnify = require("columnify");
const git = require("../lib/git");

async function release(type) {
    let superglueJson = readSuperglueJson();
    let packageJson = readPackageJson();
    await verifyGitClean();
    await build();
    let releasedVersion = await updateVersion(type);
    await build();
    await minify(superglueJson);
    await archive(superglueJson, packageJson);
    let newVersion = await postRelease(superglueJson);
    await push();
    printer.info("Released: " + releasedVersion);
    printer.info("Starting: " + newVersion);
}

async function postRelease(json) {
    // increment the version again for new release
    await npm.version("prerelease", { tag: false, preid: json.release.preId });
    currentVersion = readPackageJson().version;
    await git.add(["package.json"]);
    await git.commit(`"starting v${currentVersion}"`);
    return currentVersion;
}

async function push() {
    const status = new clui.Spinner("pushing changes to remote...");
    status.start();
    //await git.push();
    //await git.pushTags();
    status.stop();
}

function readSuperglueJson() {
    let fullPath = path.join(process.cwd(), "superglue.json");
    if (fs.existsSync(fullPath)) {
        const json = JSON.parse(fs.readFileSync(fullPath).toString());
        let result = sgSchema.verify(json);
        if (result.isValid) {
            printer.info("superglue.json is valid.");
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

function readPackageJson() {
    let fullPath = path.join(process.cwd(), "package.json");
    return JSON.parse(fs.readFileSync(fullPath).toString());
}

async function verifyGitClean() {
    const status = new clui.Spinner("verifing git...");
    status.start();

    let result;
    try {
        await git.pull();
        result = await git.status();
    } finally {
        status.stop();
    }

    if (!result.isClean()) {
        printer.error("Directory is not clean. Make sure the directory is clean before release.");
        process.exit(3);
    }

    return true;
}

async function build() {
    printer.info("Building plugin...");
    await npm.run("build");
}

async function updateVersion(version) {
    printer.info("Updating version...");
    await npm.version(version);
    return readPackageJson().version;
}

async function minify(json) {
    printer.info("creating minified js bundle...");
    await npm.npx(`rollup -c -p 'terser={compress:true,mangle:true}' -o ${json.release.main}`);
}

function archive(superglueJson, packageJson) {
    let filesToZip = [];
    //let cwd = process.cwd();
    filesToZip.push("package.json");
    filesToZip.push("superglue.json");
    filesToZip.push(superglueJson.release.main);
    filesToZip.push(...superglueJson.release.package.include);
    console.log(filesToZip);

    let releaseFilePath = path.join(superglueJson.release.publish.dir, `${packageJson.name}-${packageJson.version}.zip`);
    if (!fs.existsSync(superglueJson.release.publish.dir)) {
        fs.mkdirSync(superglueJson.release.publish.dir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const ostream = fs.createWriteStream(releaseFilePath);
        const archive = archiver("zip");
        ostream.on("close", () => {
            printer.info(`${releaseFilePath} written.`);
            resolve(releaseFilePath);
        });

        archive.on("warning", (err) => {
            printer.warn(`${err.code}: ${err.message}`)
            reject();
        });

        archive.on("error", (err) => {
            printer.error(`${err.code}: ${err.message}`);
            reject();
        });

        archive.pipe(ostream);
        printer.info("preparing release package. Files:")
        const data = {};
        filesToZip.forEach(item => {
            if (!fs.existsSync(item)) {
                data[msg.warn(item)] = msg.warn("skipped");
                return;
            }

            if (fs.statSync(item).isFile()) {
                data[msg.info(item)] = msg.info("included");
                archive.file(item);
            } else if (fs.statSync(item).isDirectory()) {
                data[msg.info(item)] = msg.info("included");
                archive.directory(item);
            } else {
                data[msg.warn(item)] = msg.warn("unknown");
            }
        });
        console.log(columnify(data, { columns: ["PATH", "STATUS"] }));
        return archive.finalize();
    });
}

module.exports = {
    release
}