const express = require('express');


const app = express();

PORT = process.env.port | 3000;


app.use(express.static('asset'));

app.get('/', function(req, res) {
    res.sendFile("./asset/index.html");
})

export function reset() {
    app.get('/', function(req, res) {
        res.sendFile("./asset/index.html");
    })
}

app.listen(PORT, function(){
    console.log("Server running on port "+PORT);
})
