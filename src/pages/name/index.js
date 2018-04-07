const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("What's your name?");
});

router.get('/:name',(req,res) => {
    res.send(`<h1>Why hello there, ${req.params.name}!!!</h1>`);
});

module.exports = router;