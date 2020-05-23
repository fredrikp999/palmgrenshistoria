// This file is used to test out different things
// Started with >npm test

const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser'); // for shaping JSON objects
const app = express();
const port = 3000;
// Use togeojson in nodejs
// https://www.npmjs.com/package/@mapbox/togeojson
var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;

// Enable serving of static files stored in a directory
// e.g. html, js and pictures. Here in ./public/...
// These files can now be access directly from the
// server, e.g. index.html
app.use(express.static('public'))

// One endpoint we just write back some stuff for
app.get('/onekml/', function (req,res){
    // Read KML-file using DOM Parser
    var kml = new DOMParser().parseFromString(fs.readFileSync('./public/GustafGabrielPalmgren.kml', 'utf8'));
    // Convert to 
    var converted = tj.kml(kml);
    var convertedWithStyles = tj.kml(kml, { styles: true });
    res.send(convertedWithStyles.features[1])
    console.log("Someone is here... In the KML endpoint...");
    console.log(convertedWithStyles.features[0])
})

// Send back gthe full KML
app.get('/fullkml/', function (req,res){
    // Read KML-file using DOM Parser
    var kml = new DOMParser().parseFromString(fs.readFileSync('./public/GustafGabrielPalmgren.kml', 'utf8'));
    // Convert to 
    var converted = tj.kml(kml);
    var convertedWithStyles = tj.kml(kml, { styles: true });
    res.send(convertedWithStyles)
    console.log("Someone is here... In the KML endpoint...");
    console.log(convertedWithStyles)
})







// This endpoint only prints out something in the console
app.get('/endpoint2/', (req,res) => console.log("Hello Endpoint 2!"));

// One endpoint we just write back some stuff for
app.get('/view/', function (req,res){
    res.send('Hello Mr.View!');
    console.log("Someone is here... In the view endpoint...");
})

app.listen(port, () => console.log("Example app listening on port: "+ port));