/*
 * Main Router
 */

// Constants & Setup
const express = require('express');
const router = express.Router();

// Routing here
router.get('/',(req,res)=>{
	res.sendFile('index.html');
});

// Exporting
module.exports = router;