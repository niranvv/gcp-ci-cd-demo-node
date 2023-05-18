var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World from Node!');
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});