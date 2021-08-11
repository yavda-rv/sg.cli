const simpleGit = require("simple-git");

//https://github.com/steveukx/git-js/blob/HEAD/typings/response.d.ts
//https://www.npmjs.com/package/simple-git
const git = simpleGit({ 
    baseDir: process.cwd(), 
    binary: "git", 
    maxConcurrentProcesses: 1 
});

/**
 * @exports simpleGit
 */
module.exports = git;