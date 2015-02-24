var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist'));

console.log('running on': process.env.port);

app.listen(process.env.PORT || 3000);