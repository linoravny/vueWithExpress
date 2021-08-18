<template>
  <div class='product'>
    <h1>Products</h1>

    <div>
      <b-card v-for="(item,index) in products" :key="item.id"
        :title="item.productName"
        tag="article"
        class="mb-4">
        <b-card-text v-if="!item.editMode">
            <div>Manufacturing Cost: {{item.cogs.unitManufacturingCost}}</div>
            <div>ShipmentUnit Cost: {{item.cogs.shipmentUnitCost}}</div>
            <div>MonthlyAdvertisment Cost: {{item.cogs.monthlyAdvertismentCost}}</div>
            <div>Manufacturing Country: {{item.cogs.manufacturingCountry}}</div>
        </b-card-text>

        <b-card-text v-if="item.editMode">
            <div>
              <b-form-input
                v-model="item.unitManufacturingCost"
                placeholder="Enter Unit Manufacturing Cost">
              </b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="item.shipmentUnitCost"
                placeholder="Enter Shipment Unit Cost">
              </b-form-input>
            </div>
            <div>
              <b-form-input
                v-model="item.monthlyAdvertismentCost"
                placeholder="Enter Monthly Advertisment Cost">
              </b-form-input>
            </div>
             <div>
              <b-form-select class="mb-2" v-model="item.manufacturingCountry"
              :options="countries"
              value-field="code"
              text-field="name">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select a country --</b-form-select-option>
                </template>
              </b-form-select>
            </div>
        </b-card-text>

        <b-button v-if="!item.editMode"
          v-on:click="displayEditMode(index)"
          variant="outline-primary">Display Edit Mode
        </b-button>

        <b-button v-if="item.editMode"
          v-on:click="editProduct(index, item)"
          variant="outline-primary">Edit Product
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
   data () {
    return {
      products: [],
      countries: [],
      loading: true,
      hasError: false,
    }
  },
  // filters: {
    // currencydecimal (value) {
    //   return value.toFixed(2)
    // }
  // },
  methods: {
    displayEditMode: function (i) {
      this.products[i].editMode = true;
    },
    editProduct: function (i,item) {
      console.log('editProduct()');
      // this.products[i].editMode = false;
      const product = {
        id: item.id,
        unitManufacturingCost: item.unitManufacturingCost,
        shipmentUnitCost: item.shipmentUnitCost,
        monthlyAdvertismentCost: item.monthlyAdvertismentCost,
        manufacturingCountry: item.manufacturingCountry
      };
      axios.post("http://localhost:3000/cogs", product)
        .then(response => {
          console.log(response);
          this.products[i].editMode = false;
          if(response.data) {
            this.products[i].cogs.unitManufacturingCost = response.data.cogs.unitManufacturingCost;
            this.products[i].cogs.shipmentUnitCost = response.data.cogs.shipmentUnitCost;
            this.products[i].cogs.monthlyAdvertismentCost = response.data.cogs.monthlyAdvertismentCost;
            this.products[i].cogs.manufacturingCountry = response.data.cogs.manufacturingCountry;
          }
        }).catch(errors => {
          console.log(errors);
          this.hasError = true;
        })
        .finally(() => {
            console.log('editProduct finally');
            this.loading = false;
      });
    }
  },
  mounted () {
    this.loading = true;
    const requestOne = axios.get('http://localhost:3000/products');
    const requestTwo = axios.get('http://localhost:3000/countries');
    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      this.products = responses[0].data.map(product => {
        product.editMode = false;
        return product;
      });
      this.countries = responses[1].data;
      console.log(this.products);
      console.log(this.countries);
    })).catch(errors => {
      console.log(errors);
      this.hasError = true;
    })
    .finally(() => {
        console.log('init finally');
        this.loading = false;
    });
  }
}
</script>
