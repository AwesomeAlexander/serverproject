const express = require('express');
const router = express.Router();

// Routing here
router.get('/',(req,res)=>res.send("This is the homepage."));
router.get('/about',(req,res)=>res.send("This is the about page! Find info here."));

module.exports = router;