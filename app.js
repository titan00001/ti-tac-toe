const express = require('express');


const app = express();

app.use(express.static('asset'));

app.get('/', function(req, res) {
    res.sendFile("./asset/index.html");
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})
