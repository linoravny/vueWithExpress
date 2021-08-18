
const express = require('express');
const productController = require('./api/controllers/productsController');

var app = express();

const http = require('http').createServer(app);
var port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/**** ROUTE ****/
var routes = require('./api/routes/productRoutes');
routes(app);

// productController.init().then((res)=>{
//   console.log(res);
// });

productController.init();


http.listen(port, () => {
  console.log('listeninghttp on *:3000');
});

