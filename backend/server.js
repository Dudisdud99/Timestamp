var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('./routes');
var app = express();

let indexFile = path.join(__dirname, '..', 'frontend', 'index.html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.get('/', function (req, res) {
    res.sendFile(indexFile);
});

app.use(express.static('frontend'));

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Node.js listening on port " + listener.address().port);
});