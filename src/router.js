/*
 * Main Router
 */

// Constants & Setup
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Routing here
router.get('/',(req,res,next)=>{
	res.sendFile(`${__dirname}/pages/index.html`);
	next();
});

router.get('/pages/:page',(req,res,next) => {
	console.log('hi');
	var pages = fs.readdirSync(path.join(__dirname,'/pages'),"utf8");
	if (pages.indexOf(req.params.page) > -1) {
		let pageFile = path.join(__dirname,'/pages',req.params.page),
			pageFileDir = fs.readdirSync(pageFile,"utf8");
			console.log(pageFile);
			console.log(pageFileDir);
			if (pageFileDir.indexOf('index.html') < 0) {
			// No index.html in the file
			res.send(`This file (${req.params.page}) does not have an index.html`);
		} else {
			// Display page
			res.sendFile(path.join(pageFile,'/index.html'));
		}
	} else {
		res.send(`The '${req.params.page}' page does not exist!`);
	}
	next();
});

// Exporting
module.exports = router;