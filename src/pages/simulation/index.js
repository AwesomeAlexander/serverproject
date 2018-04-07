const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'index.html'));
    //res.sendFile(path.join(__dirname,'main.css'));
    //res.sendFile(path.join(__dirname,'p5.js'));
    //res.sendFile(path.join(__dirname,'animation.js'));
});

module.exports = router;