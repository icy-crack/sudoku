var express = require('express');
var path = require('path');

var app = express();

app.get('/', (req, res) => {
    res.setHeader('ContentType', 'text/html');
    res.sendFile(path.resolve(__dirname, './template/index.html'));
});
app.use('/static', express.static('dist'));

app.listen(3000, () => {
    console.log('Listening to port 3000.');
});