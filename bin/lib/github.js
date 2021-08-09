// const Configstore = require("configstore");
// const clui = require("clui");
// const octokit = require("@octokit/rest");
// const { createBasicAuth } = require("@octokit/auth-basic");
// const inquirer = require("./inquirer");
// const pkg = require("../../package.json");

// const conf = new Configstore(pkg.name);

// function getInstance() {
//     return octokit;
// }

// function getStoredGithubToken() {
//     return conf.get("github.token");
// }

// async function getPersonalAccessToken() {
//     const credentials = await inquirer.askGithubCredentials();
//     const status = new clui.Spinner("Authenticating you, please wait...");

//     status.start();

//     const auth = createBasicAuth({
//         username: credentials.username,
//         password: credentials.password,
//         on2Fa: () => {
            
//         },
//         token: {
//             scopes: ['user', 'public_repo', 'repo', 'repo:status'],
//             note: "superglue cli for learning purpose"
//         }
//     });

//     try{
//         const res = await auth();
//         if(res.token) {
//             conf.set("github.token", res.token);
//             return res.token;
//         } else {
//             throw new Error("Github token was not found in response.");
//         }
//     } finally {
//         status.stop();
//     }
// }

// module.exports = {
//     getInstance,
//     getStoredGithubToken,
//     getPersonalAccessToken
// }