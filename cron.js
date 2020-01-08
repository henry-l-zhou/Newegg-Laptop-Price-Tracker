const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

app = express();

// schedule tasks to be run on the server   
cron.schedule("0 0 0 * * *", function () {
    const service = require("./service.js");
    service();
    console.log("running every day")
});

app.listen(3128);