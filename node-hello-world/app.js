var express = require('express');
const os = require('os');
var app = express();



app.get('/', function (req, res) {
  res.send('Hello World from Node v4!<br/> from Hostname:' + os.hostname());
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});