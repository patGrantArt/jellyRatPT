console.log("node app running")

const express = require('express');

const app = express();

app.listen(3000, ()=> console.log(`listening at 3000`));

app.use(express.static('public'));
//serve web page
//recieve update


console.log('node script complete')