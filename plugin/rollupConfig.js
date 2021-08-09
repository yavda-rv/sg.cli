const file = require("./file")
const ejs = require("ejs");
const path = require('path');

module.exports = {
    write: async (name)=>{
        let filePath = path.join( __dirname, "rollupconfig.template.ejs");
        let content = await ejs.renderFile(filePath, {});
        file.writeJs(content, name, "rollup.config.js");
    }
}