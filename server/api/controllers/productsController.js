'use strict';
const fs = require('fs');
const path = require('path');

let countries = [];
let products = [];

//only the first time
exports.init = (req,res) => {
  console.log("init");

  let allCountries = fs.readFileSync(path.resolve(__dirname, '../stabs/countries.json'));
  countries = JSON.parse(allCountries);

  let allProducts = fs.readFileSync(path.resolve(__dirname, '../stabs/products.json'));
  let productsDB = _initProductState(JSON.parse(allProducts));
  // console.log(JSON.stringify(productsDB));

  let jsonContent = JSON.stringify(productsDB);
  try {
    const data =  fs.writeFileSync(path.resolve(__dirname, '../stabs/productsDataBase.json'),jsonContent);
    console.log('file written successfully');
  } catch (err) {
    console.error(err)
  }
}

exports.get_products = function(req, res) {
  console.log('get_products......');
  
  let productsFromDB = _getProductsFromDB();
  products = toArray(productsFromDB);
  res.send(products);
};

exports.get_countries = function(req, res) {
  console.log('get_countries...');
  res.send(countries);
};

exports.update_product = function(req, res) {
  console.log(`update_product... req.body: ${req.body}`);

  let productsFromDB = _getProductsFromDB();
  let id = req.body.id

  productsFromDB[id].cogs = {
    "unitManufacturingCost": req.body.unitManufacturingCost,
    "shipmentUnitCost": req.body.shipmentUnitCost,
    "monthlyAdvertismentCost": req.body.monthlyAdvertismentCost,
    "manufacturingCountry": req.body.manufacturingCountry
  }
  let jsonContent = JSON.stringify(productsFromDB);

  try {
    const data =  fs.writeFileSync(path.resolve(__dirname, '../stabs/productsDataBase.json'),jsonContent);
    console.log(`file written successfully, data: ${data}`);
    let productsFromDB = _getProductsFromDB(); 
    let diff = { id:id,...productsFromDB[id], editMode:false};
   
    res.send(diff);
  } catch (err) {
    console.error(err);
    res.send(null);
  }

};

const _initProductState = (arr)=> {
  console.log("initProductState...");
  let hash = {};
  console.log(countries);
  arr.forEach(item => {
    hash[item.id] = {
      "productName": item.productName,
      "cogs": {
        "unitManufacturingCost": Math.floor(Math.random() * 1000) + 1,
        "shipmentUnitCost": Math.floor(Math.random() * 1000) + 1,
        "monthlyAdvertismentCost": Math.floor(Math.random() * 1000) + 1,
        "manufacturingCountry": countries[Math.floor(Math.random()*countries.length)].code
      }
    }
  });

  return hash;
}

const _getProductsFromDB = ()=>{
  let allProducts = fs.readFileSync(path.resolve(__dirname, '../stabs/productsDataBase.json'));
  return JSON.parse(allProducts);
}

const toArray = (data)=>{
  let arr = [];
  Object.keys(data).forEach(function (key) { 
    arr.push({ id:key,...data[key]});
  })
  return arr;
}
