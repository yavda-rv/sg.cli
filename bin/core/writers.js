const fs = require('fs');
const path = require('path');
const ejs = require("ejs");

async function writeTemplateFile(templateFileName, fileName, context) {
    let content = await ejs.renderFile(templateFileName, context);
    fs.writeFileSync(fileName, content, { encoding: "utf-8" });
}

async function copyTemplate(baseDir, targetDir, context, result) {
    let files = fs.readdirSync(baseDir);
    for (let index = 0; index < files.length; index++) {
        let file = files[index];
        let filePath = path.join(baseDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            let targetPath = path.join(targetDir, file);
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
                result[targetPath] = {}
            }
            await copyTemplate(filePath, targetPath, context, result[targetPath]);
        } else {
            let targetFileName = path.join(targetDir, file);
            await writeTemplateFile(filePath, targetFileName, context);
            result[targetFileName] = null;
        }
    }
}

module.exports = {
    copyTemplate
}