<template>
  <div id='product'>
    <h1 class="title">{{title}}</h1>
    <div>
      <b-card v-for="(item,index) in products" :key="item.id"
        :title="item.productName"
        data-test="products"
        tag="article"
        class="mb-4">
        <!-- display mode -->
        <b-card-text
          :class="[`cardReadOnly${index}`]"
          v-if="!item.editMode">
            <div>Manufacturing Cost: {{item.cogs.unitManufacturingCost | toCurrency}}</div>
            <div>ShipmentUnit Cost: {{item.cogs.shipmentUnitCost | toCurrency}}</div>
            <div>MonthlyAdvertisment Cost: {{item.cogs.monthlyAdvertismentCost | toCurrency}}</div>
            <div>Manufacturing Country: {{item.displayCountry}}</div>
        </b-card-text>
        <!-- edit mode -->
        <b-card-text
          :class="[`cardForm${index}`]"
          v-if="item.editMode">
            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="6"
              label="Enter Unit Manufacturing Cost:"
              label-for="input-unitManufacturingCost"
            >
              <b-form-input id="input-unitManufacturingCost"
                placeholder="Enter Unit Manufacturing Cost"
                v-model="item.cogs.unitManufacturingCost">
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="6"
              label="Enter Shipment Unit Cost:"
              label-for="input-shipmentUnitCost"
            >
              <b-form-input id="input-shipmentUnitCost"
                placeholder="Enter Shipment Unit Cost"
                v-model="item.cogs.shipmentUnitCost">
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="6"
              label="Enter Monthly Advertisment Cost:"
              label-for="input-monthlyAdvertismentCost"
            >
              <b-form-input id="input-monthlyAdvertismentCost"
                placeholder="Enter Monthly Advertisment Cost"
                v-model="item.cogs.monthlyAdvertismentCost">
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="6"
              label="Select A Manufacturing Country:"
              label-for="input-monthlyAdvertismentCost"
            >
              <b-form-select class="mb-2" v-model="item.cogs.manufacturingCountry"
                :options="countries"
                value-field="code"
                text-field="name">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select a country --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>

        </b-card-text>

        <b-button :class="[`btnDisplayEditMode${index}`]"
          v-if="!item.editMode"
          v-on:click="item.editMode = !item.editMode"
          variant="outline-primary">Display Edit Mode
        </b-button>

        <b-button
         :class="[`btnEdit${index}`]"
          v-if="item.editMode"
          v-on:click="editProduct(index, item)"
          variant="outline-primary">Edit Product
        </b-button>

         <b-button
          :class="[`btnBackToReadOnly${index}`]"
          v-if="item.editMode"
          v-on:click="item.editMode = false"
          variant="primary">Back
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default  {
  // name: 'Product',
   data () {
    return {
      title: 'Product Page',
      products: [],
      countries: [],
      loading: true,
      hasError: false,
    }
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  methods: {
    getCountryObj: function(key) {
      let ret;
      if(key) {
        ret = this.countries.find((elem) => {
          if(elem.code === key) return elem;
        });
      }
      return (ret && ret.name) ? ret.name : ''
    },
    displayEditMode: function (i) {
      this.products[i].editMode = true;
    },
    editProduct: function (i,item) {
      console.log('editProduct()');

      const product = {
        id: item.id,
        unitManufacturingCost: item.cogs.unitManufacturingCost,
        shipmentUnitCost: item.cogs.shipmentUnitCost,
        monthlyAdvertismentCost: item.cogs.monthlyAdvertismentCost,
        manufacturingCountry: item.cogs.manufacturingCountry
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
            this.products[i].displayCountry = this.getCountryObj(response.data.cogs.manufacturingCountry);
          }
        }).catch(errors => {
          console.log(errors);
          this.hasError = true;
        })
        .finally(() => {
            console.log('editProduct finally');
            this.loading = false;
      });
    },
  },
  mounted: async function() {
    this.loading = true;

    try{
      let resProducts = await axios.get('http://localhost:3000/products');
      let resCountries = await axios.get('http://localhost:3000/countries');

      this.loading = false;

      if(resCountries && resCountries.data) {
        this.countries = resCountries.data
      }

      if(resProducts && resProducts.data){
        this.products = resProducts.data.map(product => {
          product.editMode = false;
          product.displayCountry = this.getCountryObj(product.cogs.manufacturingCountry);
          return product;
        });
      }

      console.log(`products: ${JSON.stringify(this.products)}`);
      console.log(`countries: ${JSON.stringify(this.countries)}`);

    } catch(error) {
      this.loading = false;
      console.log(error);
      this.hasError = true;
    }
  }
}
</script>
