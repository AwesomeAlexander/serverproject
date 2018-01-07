/*
 * Main Router
 */

// Constants & Setup
import express = require('express');
const router = express.Router();

// Routing here
router.get('/',(req,res)=>{
	res.sendFile(`${__dirname}/index.html`);
});

// Exporting
exports = router;