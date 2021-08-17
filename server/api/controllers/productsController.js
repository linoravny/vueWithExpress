'use strict';
const fs = require('fs');
const path = require('path');

exports.get_products = function(req, res) {
  console.log('get_products......');
  
  let allData = fs.readFileSync(path.resolve(__dirname, '../stabs/products.json'));
  let products = JSON.parse(allData);
  
  console.log(products);
  res.send(products);
};

exports.update_product = function(req, res) {
  console.log('update_product.....');
  
  res.send(true);
};








