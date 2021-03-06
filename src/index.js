// Initial setup and constants
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Utils

/**
 * Utility function to be able to get the short readable timestamp of an event
 */
Date.prototype.timestamp = function() {
	return `[${this.toJSON().slice(0,10)/*.replace(/-/g,'/')*/} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}]`;
};

/**
 * Logs Things
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {*} next 
 */
function logger(req, res, next) {
	console.log(`${new Date().timestamp()} Recieved ${req.method} request to '${req.url}' from (IP ${req.ip})`);
	next();
}



/**
 * Handles Errors 
 * @param {Error} err 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {*} next 
 */
function errorHandler(err,req,res,next) {
	console.error(err);
	res.send('An Error Occured!');
	next();
}

// Code //

// Main Router
let router = require('./renderRouter.js')(path.join(__dirname,'pages'));
// replacing require('./router.js')
app.use('/',logger,router,errorHandler);

// Public Resources, TODO: fix, doesn't work
app.use('/assets',express.static(path.join(__dirname,'assets')))

// Start App
app.listen(port,()=>{
	console.log(`Listening at 'http://localhost:${port}' on ${new Date().timestamp()}`);
});