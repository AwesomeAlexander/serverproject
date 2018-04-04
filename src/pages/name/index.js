const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("What's your name?");
});

router.get('/:name',(req,res) => {
    res.send(`<h1>Hi there, ${req.params.name}!!!</h1>`);
});

module.exports = router;