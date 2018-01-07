// Initial setup and constants
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

/**
 * Utility function to be able to get the short readable timestamp of an event
 */
Date.prototype.toString = function() {
	return `[${this.toJSON().slice(0,10).replace(/-/g,'/')} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}]`;
};

// Middleware
app.use((req, res, next) => {
	console.log(`${new Date()} Recieved ${req.method} request to '${req.url}'`);
	next();
});

app.use('/',require('./pages/router.js'));

// Start App
app.listen(port,()=>{
	console.log(`Listening at 'http://localhost:${port}' on ${new Date()}`);
});