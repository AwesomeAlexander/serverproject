/**
 * Renders a rounder based on an input of the file directory,
 * recursing down files until it hits a base
 */
function render(filepath) {
	// Constants if undefined by current scope
	if (!express) const express = require('express');
	if (!path) const path = require('path');
	if (!fs) const fs = require('fs');

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
	if (index = files.find( (file)=>file.startsWith("index.") )) router.get('/',(req,res) => {
		res.sendFile(path.join(filepath,index));
	});

	// Recurses down directories within this directory.
	// Ignores ones that start with '_'
	for (let file of files) {
		let newFilepath = path.join(filepath,file);
		if (!file.startsWith('_') && fs.lstatSync(newFilepath).isDirectory()) router.use('/'+file,render(newFilepath));
	}
	

	// Returning router
	return router;
}

module.exports = render;