# Vue With Express

Vue JS framework With Node Express For Server.

- this app incudes test with Jest

# Required installation:

1. Node JS : https://nodejs.org/en/download/ (install npm packege by default)

# Getting started - only the first time:

1. open terminal at folder 'my-app', run:$ npm install
2. open terminal at folder 'server', run: $ npm install

# Run App

1. client run: open terminal at folder 'my-app'
   - $ npm run serve
   - client: http://localhost:8080/
2. test : open terminal at folder 'my-app'
   - $ npm run test
3. open terminal at folder 'server'
   - $ npm run start
   - server: http://localhost:3000/

# Technologies in this project

1. Node js express for server side + handle CORS on server
2. client VUE
3. for UI: bootstrap-vue
4. node FS for state maintain in file system
5. test with jest

# POC

single page application that lets sellers fill their COGS (cost of goods) of each product.
The app display the seller’s products, and once the seller selects a product from the list, the seller will be shown a form page where the seller can update COGS fields of the selected product.

For each product - display
● Unit manufacturing cost (currency)
● Shipment unit cost (currency)
● Monthly advertising cost (currency)
● Manufacturing country (dropdown)

# Server API

- GET - /products - retrieve a list of seller products
- GET - /countries - retrieve a statuc list of countries
- POST - /cogs - save the cost data for a product

# Test with jest API

1. remove and add elements to the dom while chage display mode (form/read only)
2. get country name by key
3. post product with many requests
4. check currency filter
