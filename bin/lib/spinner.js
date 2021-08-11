const clui = require("clui");

async function spin(message, promise) {
    const spinner = new clui.Spinner(message);
    try{
        spinner.start();
        return await promise;
    } catch (err) {
        throw err;
    } finally {
        spinner.stop();
    }
}

module.exports = {
    spin
}

