"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Initial setup and constants
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var port = 3000;
/**
 * Utility function to be able to get the short readable timestamp of an event
 */
Date.prototype.toString = function () {
    return "[" + this.toJSON().slice(0, 10).replace(/-/g, '/') + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds() + "]";
};
// Middleware
app.use(function (req, res, next) {
    console.log(new Date() + " Recieved " + req.method + " request to '" + req.url + "'");
    next();
});
/**
 * AGH
 * @param {string} filePath
 * @return {void}
 */
var fileReader = function (filePath) {
    if (filePath === void 0) { filePath = ""; }
    return fs.readdir(filePath, "utf8", function (err, files) {
        if (err)
            console.error(err);
        // Detects the file's router
        var router = files[files.indexOf('router.js')];
        if (!router) {
            files.forEach(function (f) {
                if (f.indexOf('.') > -1)
                    fileReader(path.join(filePath, f));
            });
        }
        else {
            // Handles 'pages' to replace with plain old '/' for website page display
            var displayPath = filePath.substring(path.join(__dirname, "/pages").length);
            app.use(displayPath, require(path.join(filePath, "/router.js")));
        }
    });
};
console.log(path.join(__dirname, "/pages").toString());
fileReader(path.join(__dirname, "/pages"));
// Start App
app.listen(port, function () {
    console.log("Listening at 'http://localhost:" + port + "' on " + new Date());
});
