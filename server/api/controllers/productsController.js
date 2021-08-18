'use strict';
const fs = require('fs');
const path = require('path');

let countries = [];

exports.get_products = function(req, res) {
  console.log('get_products......');
  
  let allData = fs.readFileSync(path.resolve(__dirname, '../stabs/products.json'));
  let products = JSON.parse(allData);

  console.log(products);
  res.send(products);
};

exports.get_countries = function(req, res) {
  console.log('get_countries......');
  
  let allData = fs.readFileSync(path.resolve(__dirname, '../stabs/countries.json'));
  countries = JSON.parse(allData);
  
  console.log(countries);
  res.send(countries);
};

exports.update_product = function(req, res) {
  console.log('update_product.....');
  console.log('Got body:', req.body);
  res.send(true);
};








