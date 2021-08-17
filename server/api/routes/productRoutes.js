'use strict';
module.exports = function(app) {
  const controller = require('../controllers/productsController');

  const cors = require('cors');
  const corsOptions = {
      origin: 'http://localhost:8080',
      methods: "GET,POST",
      //allowedHeaders: 'Access-Control-Allow-Origin,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    }
  app.use(cors(corsOptions));
  
  app.route('/products')
    .get(controller.get_products)

  app.route('/cogs')
  .post(controller.update_product)

};
