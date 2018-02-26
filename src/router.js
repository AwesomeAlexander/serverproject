/*
 * Main Router
 */

// Constants & Setup
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Routing here
router.get('/',(req,res)=>{
	res.sendFile(`${__dirname}/pages/index.html`);
});

router.get('/:page',(req,res) => {
	var pages = fs.readdirSync(path.join(__dirname,'/pages'),"utf8");
	if (pages.indexOf(req.params.page) > -1) {
		let pageFile = path.join(__dirname,'/pages',req.params.page),
			pageFileDir = fs.readdirSync(pageFile,"utf8");
		if (!pageFileDir.find(f => f.match(/index\.\w+/))) {
			// No index.* in the file
			res.send(`The page requested ('${req.params.page}') does not have an index document`);
		} else {
			// Display page
			res.sendFile(path.join(pageFile,'/index.html'));
		}
	} else {
		res.send(`The '${req.params.page}' page does not exist!`);
	}
});

// Exporting
module.exports = router;