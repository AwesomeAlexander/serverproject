// Constants & Setup
const express = require('express');
const router = express.Router();

// Routing here
router.get('/about',(req,res)=>res.send("In this page, type any following url and it'll reroute to that page."));
router.get('/:name',(req,res)=>{
	res.send(`You've reached the "${req.params.name}" page.`);
});

// Exporting
module.exports = router;