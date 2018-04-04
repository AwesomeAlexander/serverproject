const express = require('express');
const path = require('path');
const fs = require('fs');

/**
 * Generator function
 * Renders a rounder based on an input of the file directory,
 * recursing down files until it hits a base
 */
function render(filepath) {
	// Variable Declarations
	let router = express.Router();
	let files = fs.readdirSync(filepath,"utf8");

	// If the directory has an index.js, use it as a Router and stop recursing.
	if (files.includes('index.js')) {
		return router = require(path.join(filepath,'index.js'));
	}

	// ELSE:

	// If the page has an index.* (html, php, etc.), use that as the page
	let index;
	if (index = files.find( (file)=>file.startsWith("index.") )) {
		router.get('/',(req,res) => {
			res.sendFile(path.join(filepath,index));
		});
	} else {
		router.get('/',(req,res) => {
			res.send("This file does not have an index.html file.");
		});
	}

	// Recurses down directories within this directory.
	// Ignores ones that start with '_'
	for (let file of files) {
		let newFilepath = path.join(filepath,file);
		if (!file.startsWith('_') && fs.lstatSync(newFilepath).isDirectory()) router.use('/'+file,render(newFilepath));
	}
	
	// Covering for someone trying to reach unknown pages.
	router.get('/:page',(req,res) => {
		res.send(`The page "${req.params.page}" does not exist`);
	});

	// Returning router
	return router;
}

module.exports = render;