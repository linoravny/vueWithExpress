
const express = require('express');

var app = express();

const http = require('http').createServer(app);
var port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/**** ROUTE ****/
var routes = require('./api/routes/productRoutes');
routes(app);

http.listen(port, () => {
  console.log('listeninghttp on *:3000');
});

