// Constants & Setup
const express = require('express');
const router = express.Router();

// Routing here
router.get('/',(req,res)=>res.sendFile());

// Exporting
module.exports = router;