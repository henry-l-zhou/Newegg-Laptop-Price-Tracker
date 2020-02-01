const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

app = express();
const service = require("./service.js");


// schedule tasks to be run on the server   
cron.schedule("0 18 * * *", function () {
    service();
    console.log("running every day")
});

app.listen(3124);