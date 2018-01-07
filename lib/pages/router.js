"use strict";
/*
 * Main Router
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Constants & Setup
var express = require("express");
var router = express.Router();
// Routing here
router.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
// Exporting
exports = router;
