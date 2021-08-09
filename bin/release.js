// const { execSync } = require("child_process");
// const fs = require("fs");
// import {config} from "../config";

// function exec(command) {
//     try{
//         execSync(command, {stdio: "inherit"});
//     }catch(err){
//         throw err;
//     }
// }

// function release(newVersion) { //version = major, minor, patch
//     // Build just to check, if there is any error!
//     exec("npm run build");

//     // increment the version
//     exec("npm version " + newVersion);
//     // build and create release version
//     exec("npm run build");
//     exec(`npx rollup -c -p 'terser={compress:true,mangle:true}' -o ${config.output}`);

//     // Push the changes to remote
//     exec("git push");
//     exec("git push --tags");

//     package();

//     postrelease();
// }

// function postrelease() {
//     // increment the version again for new release
//     exec(`npm --no-git-tag-version version prerelease --preid=${config.preId}`);
//     // commit to git
//     currentVersion = JSON.parse(fs.readFileSync("./package.json")).version;
//     exec("git add package.json");
//     exec(`git commit -m "starting v${currentVersion}"`);

//     // Push the changes to remote
//     exec("git push");
// }

// function package() {
//     let filesToZip = [];
//     filesToZip.push("package.json");
//     filesToZip.push(config.output);
//     filesToZip.push(...config.package.include);
//     let packageJson = JSON.parse(fs.readFileSync("./package.json"));
//     let fileName = `${packageJson.name}_${packageJson.version}.zip`;

//     exec(`zip -r ${fileName} ${filesToZip.join(" ")}`);

// }

// function main() {
//     args = process.argv.slice(2);
//     command = args[0];
//     arg = args[1];

//     if(command == "release") {
//         if(arg == "major" || arg == "minor" || arg == "patch")
//             release(arg);
//     }
//     if(command == "package") {
//         package();
//     }
// }

// main();