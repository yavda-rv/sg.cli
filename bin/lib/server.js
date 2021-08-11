const express = require('express');
const path = require('path');

function runserver() {
    const libPath = path.join(process.cwd(), "lib");
    app.use(express.static(libPath));
    app.get("/", function (req, res) {
        return res.end("Superglue server running and serving " + process.cwd());
    });

    app.listen(port, () => {
        console.log("server running at port: " + port);
    });
}
