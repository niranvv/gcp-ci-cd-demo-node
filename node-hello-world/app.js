var express = require('express');
const os = require('os');
var app = express();



app.get('/', function (req, res) {
  res.send('Hello DevOps Malayalam - from Node (v1)!<br/>Folder:node-hello-world from Hostname:' + os.hostname());
});

const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
