// Initial setup and constants
const express = require('express');
const app = express();
const port = 3000;

/*
 * Utility function to be able to get the short readable timestamp of an event
 */
Date.prototype.timestamp = function() {
	return `[${this.toJSON().slice(0,10).replace(/-/g,'/')} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}]`;
};

/*
 * Logging functionality middleware
 */
app.use((req, res, next) => {
	console.log(`${new Date().timestamp()} Recieved ${req.method} request to '${req.url}'`);
	next();
});

// Routing
app.use('/',require(`${__dirname}/routing/page.js`));

// Start App
app.listen(port,()=>{
	console.log(`Listening at 'http://localhost:${port}' on ${new Date().timestamp()}`);
});