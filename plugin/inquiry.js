const inquirer = require("inquirer");
const file = require("./file");

function validatePluginName(name) {
    if(name.length == 0)
        return "Plugin name is not provided.";
    if(name.indexOf("/")>=0)
        return "name can't cantain '/' and must be a valid directory name";
    if(file.dirExists(name)) {
        return "A plugin with this name already exists in current directory";
    }
    return true;
}

function askPluginName() {
    const questions = [
        {
            name: "name",
            type: "input",
            message: "Enter plugin name:",
            validate: validatePluginName
        }
    ];
    return inquirer.prompt(questions);
}

module.exports = {
    askPluginName: askPluginName
}