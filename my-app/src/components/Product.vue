<template>
  <b-container fluid="sm">
    <h1 class="title">{{title}}</h1>
    <b-row>
      <b-col>
        <b-card v-for="(item,index) in products" :key="item.id"
          :title="item.productName"
          data-test="products"
          tag="article"
          class="mb-4">
          <!-- read only mode -->
          <b-card-text v-if="!item.editMode"
            :class="[`cardReadOnly${index}`]"
          >
            <b-row class="mb-3">
              <b-col>
                <div>Manufacturing Cost: {{item.cogs.unitManufacturingCost | toCurrency}}</div>
                <div>ShipmentUnit Cost: {{item.cogs.shipmentUnitCost | toCurrency}}</div>
                <div>MonthlyAdvertisment Cost: {{item.cogs.monthlyAdvertismentCost | toCurrency}}</div>
                <div>Manufacturing Country: {{item.displayCountry}}</div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <!--btn change to edit mode-->
                <b-button :class="[`btnDisplayEditMode${index}`]"
                  v-on:click="item.editMode = !item.editMode"
                  variant="outline-primary">Display Edit Mode
                </b-button>
              </b-col>
            </b-row>
          </b-card-text>

          <!-- edit mode -->
          <b-card-text :class="[`cardForm${index}`]" v-else>
            <!--btn back to read only without do nothing-->
              <b-button
                :class="[`btnBackToReadOnly${index}`]"
                v-on:click="item.editMode = false"
                size="sm"
                variant="link">Back to read only mode
              </b-button>
              <b-row>
                <b-col md="6" offset-md="3">
                  <b-form>
                    <b-form-group class="mb-3"
                      label="Enter Unit Manufacturing Cost:"
                      label-for="input-unitManufacturingCost"
                    >
                      <b-form-input id="input-unitManufacturingCost"
                        type="number"
                        placeholder="Enter Unit Manufacturing Cost"
                        v-model="item.cogs.unitManufacturingCost">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group class="mb-3"
                      label="Enter Shipment Unit Cost:"
                      label-for="input-shipmentUnitCost"
                    >
                      <b-form-input id="input-shipmentUnitCost"
                        type="number"
                        placeholder="Enter Shipment Unit Cost"
                        v-model="item.cogs.shipmentUnitCost">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group class="mb-3"
                      label="Enter Monthly Advertisment Cost:"
                      label-for="input-monthlyAdvertismentCost"
                      >
                      <b-form-input id="input-monthlyAdvertismentCost"
                        type="number"
                        placeholder="Enter Monthly Advertisment Cost"
                        v-model="item.cogs.monthlyAdvertismentCost">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group class="mb-3"
                      label="Select A Manufacturing Country:"
                      label-for="input-monthlyAdvertismentCost"
                    >
                      <b-form-select v-model="item.cogs.manufacturingCountry"
                      class="w-100"
                        :options="countries"
                        value-field="code"
                        type="text"
                        text-field="name">
                        <template #first>
                          <b-form-select-option :value="null" disabled>-- Please select a country --</b-form-select-option>
                        </template>
                      </b-form-select>
                    </b-form-group>

                    <!--btn edit product submit post request-->
                    <b-button class="mb-3"
                      v-on:click="editProduct(index, item)"
                      :class="[`btnEdit${index}`]"
                      variant="outline-success">Edit Product
                    </b-button>


                    <b-alert v-if="validationError" show variant="danger">{{validationError}}</b-alert>

                  </b-form>
                </b-col>
              </b-row>
          </b-card-text>

        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default  {
  data () {
    return {
      title: 'Products Page',
      products: [],
      countries: [],
      loading: true,
      hasError: false,
      validationError: null
    }
  },
  filters: {
    toCurrency(value) {
      console.log(`filter toCurrency value:${value}`)
      if (!value && typeof value !== "number") {
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
    editProduct: function (i,item) {
      this.validationError = null
      console.log(`editProduct() index: ${i}`);

      if(item && item.cogs &&
        item.cogs.unitManufacturingCost && item.cogs.unitManufacturingCost > 0 &&
        !isNaN(item.cogs.unitManufacturingCost) &&
        item.cogs.shipmentUnitCost && item.cogs.shipmentUnitCost > 0 &&
        !isNaN(item.cogs.shipmentUnitCost) &&
        item.cogs.monthlyAdvertismentCost && item.cogs.monthlyAdvertismentCost > 0 &&
        !isNaN(item.cogs.monthlyAdvertismentCost) &&
        item.cogs.manufacturingCountry
      ) {
        const product = {
          id: item.id,
          unitManufacturingCost: item.cogs.unitManufacturingCost,
          shipmentUnitCost: item.cogs.shipmentUnitCost,
          monthlyAdvertismentCost: item.cogs.monthlyAdvertismentCost,
          manufacturingCountry: item.cogs.manufacturingCountry
        };

        console.log(JSON.stringify(product))

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
      } else {
        this.validationError = 'form validate error'
      }
    },
  },
  beforeMount: async function() {
    console.log('created')
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
