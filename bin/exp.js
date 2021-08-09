// #!/usr/bin/env node

// //https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
// const boxen = require("boxen");
// const chalk = require("chalk");
// const clear = require("clear");
// const figlet = require("figlet");
// const files = require("./lib/files");
// const github = require("./lib/github");

// clear();
// console.log(
//     boxen(
//         chalk.yellow(
//             figlet.textSync("SG-CLI", { horizontalLayout: "full" })
//         ),
//         {
//             margin: 1,
//             borderColor: "yellow",
//             align: "center",
//             dimBorder: true,
//             padding: 1,
//             borderStyle: "double"
//         }
//     )
// );

// if (files.directoryExists(".git")) {
//     console.log(chalk.red("Already a git repository"))
//     process.exit();
// }

// const run = async () => {
//     let token = github.getStoredGithubToken();
//     if(!token) {
//         token = await github.getPersonalAccessToken();
//     }
//     console.log(token);
// }

// run();
