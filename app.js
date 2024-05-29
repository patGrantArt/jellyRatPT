console.log("node app running")

const express = require('express');
const app = express();


require("process");
const port = process.env.PORT || 3000;
console.log(process);
console.log(process.env.PORT)
const homeDirectory = process.cwd();

console.log(homeDirectory);

app.listen(port, ()=> console.log(`server listening`));
app.use(express.static('public'));


console.log('node script complete')