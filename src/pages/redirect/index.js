const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Give me a page to redirect to!");
});

router.get('/:page',(req,res) => {
    res.redirect(`http://${req.params.page}`);
});

module.exports = router;