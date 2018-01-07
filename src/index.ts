// Initial setup and constants
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
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

/**
 * AGH
 * @param {string} filePath
 * @return {void}
 */
var fileReader = (filePath="") => fs.readdir(filePath,"utf8",(err,files)=>{
	if (err) console.error(err);
	
	// Detects whether this folder has a router
	let router = files.find((f: string) => f==='router.js');
	if (!router) { // Goes through files and recursively calls for subfolders
		files.forEach(f => {
			if (!f.includes('.')) fileReader(path.join(filePath,f));
		});
	} else { // Require router (exported by router.js) to process lowest file
		// Handles 'pages' to replace with plain old '/' for website page display
		let displayPath = filePath.substring(path.join(__dirname,"/pages").length);
		app.use(displayPath,require(path.join(filePath,"/router.js")));
	}
});

console.log(path.join(__dirname,"/pages").toString());
fileReader(path.join(__dirname,"/pages"));



// Start App
app.listen(port,()=>{
	console.log(`Listening at 'http://localhost:${port}' on ${new Date()}`);
});