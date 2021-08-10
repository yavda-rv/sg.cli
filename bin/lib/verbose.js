
let isVerbose = false;
function setVerbose(value){
    isVerbose = value;
}

function getVerbose() {
    return isVerbose;
}

module.exports = {
    setVerbose,
    getVerbose
}