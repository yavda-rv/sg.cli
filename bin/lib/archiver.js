const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

/**
 * 
 * @param {string} directory location where the zip file should be written. It is created, if it does not exist.
 * @param {*} name name of the zip file with extension.
 * @param {*} type type of the zip file. either zip or tar
 * @param {*} filesToZip list of files to be zipped.
 * @returns {Promise<{zipFile: string, files: {[fileName]: boolean}}>}
 */
async function write(directory, name, type, filesToZip) {
    let zipFilePath = path.join(directory, name);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const ostream = fs.createWriteStream(zipFilePath);
        const archive = archiver(type);

        const result = {
            zipFile: zipFilePath,
            files: {}
        };

        ostream.on("close", () => { resolve(result); });

        archive.on("warning", (err) => { reject(err); });
        archive.on("error", (err) => { reject(err); });
        archive.pipe(ostream);

        filesToZip.forEach(item => {
            if (!fs.existsSync(item)) {
                result.files[item] = false;
                return;
            }

            if (fs.statSync(item).isFile()) {
                result.files[item] = true;
                archive.file(item);
            } else if (fs.statSync(item).isDirectory()) {
                result.files[item] = true;
                archive.directory(item);
            } else {
                result.files[item] = undefined;
            }
        });
        return archive.finalize();
    });
}

module.exports = {
    write
}