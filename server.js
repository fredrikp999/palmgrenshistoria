const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser'); // for shaping JSON objects
const app = express();
const port = 3000;


// Enable serving of static files stored in a directory
// e.g. html, js and pictures. Here in ./public/...
// These files can now be access directly from the
// server, e.g. index.html
app.use(express.static('public'))

// As we now serve the static file index.html from
// ./public/index.html, this will not be executed anomore
// but keeping it here as reference
// app.get('/', (req,res) => console.log("Hello World!"));

// This endpoint only prints out something in the console
app.get('/endpoint2/', (req,res) => console.log("Hello Endpoint 2!"));

// One endpoint we just write back some stuff for
app.get('/view/', function (req,res){
    res.send('Hello Mr.View!');
    console.log("Someone is here... In the view endpoint...");
})

// One endpoint we just write back some stuff for
app.get('/theugly/', function (req,res){
    var uglyfile = "public/ugly.html"
    // Send the html-file in the public directory
    // Adding optional parameter to specify the
    // root of node so that files can be found
    res.sendFile(uglyfile, {root : __dirname});
    console.log("Someone wants ugly...");
})

app.get('/thedata/', function (req,res){
    var thedatajson = "public/thedata.json"
    //res.sendFile(thedatajson, {root : __dirname});
    res.send('{"this":2, "that":22}');
    console.log("Oops, sent out the datafile.json")
})

app.listen(port, () => console.log("Example app listening on port: "+ port));