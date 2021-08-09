// #!/usr/bin/env node

// const chalk = require("chalk");
// const boxen = require("boxen");
// const yargs = require("yargs");
// const axios = require("axios");
// const figlet = require("figlet");
// const clui = require("clui");

// let counter = 0;
// const progress = new clui.Progress(20);
// console.log(progress.update(counter++, 30));

// const interval = setInterval(() => {
//     progress.update(counter++, 30);
//     if (counter > 30) {
//         clearInterval(interval);
//     }
// }, 1000);

// let superglue = figlet.textSync("Superglue");
// console.log(superglue);

// const options = yargs
//     .usage("Usage: -n <name>")
//     .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
//     .option("s", { alias: "search", describe: "Search term", type: "string" })
//     .argv;

// const greeting = chalk.white.bold(`Hello, ${options.name}!`);
// const boxenOptions = {
//     padding: 1,
//     margin: 1,
//     borderStyle: "round",
//     borderColor: "green",
//     backgroundColor: "#555555"
// }
// const msgBox = boxen(greeting, boxenOptions);

// console.log(msgBox);

// if (options.search) {
//     console.log("search option chosen: " + options.search)
// } else {
//     console.log("no search option");
// }

// //console.log("here is a random joke for you:");

// // const url = "https://pbivizedit.com/app/api.v1/config";
// // axios.get(url, { headers: { Accept: "application/json" } }).then(res => {
// //     console.log(res.data);
// // }).catch(err => {
// //     console.log(err);
// // });