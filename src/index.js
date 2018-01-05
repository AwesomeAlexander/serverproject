
// Initial setup and constants
const Express = require('express');
const app = Express();
const port = 3000;

// app.use((err, req, res, next) => {
//     console.log(`[${new Date()}] ${req}`);
//     next();
// });

app.get('/',(req,res) => res.send('Hello World!'));

app.listen(port,()=>console.log("And I'm up! Yay :P"));