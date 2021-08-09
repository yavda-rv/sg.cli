const file = require("./file");

const content=`
node_modules
lib
.temp
`;

module.exports = {
    write : (name)=>{
        file.writeJs(content, name, ".gitignore");
    }
}