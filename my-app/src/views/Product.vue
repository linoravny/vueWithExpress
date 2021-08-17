<template>
  <div class='product'>
    <h1>Products</h1>

    <div >
      <b-card v-for="(item,index) in products" :key="index"
        :title="item.productName"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">
        <b-card-text>
            <div>Manufacturing Cost: {{item.cogs.unitManufacturingCost}}</div>
            <div>ShipmentUnit Cost: {{item.cogs.shipmentUnitCost}}</div>
            <div>MonthlyAdvertisment Cost: {{item.cogs.monthlyAdvertismentCost}}</div>
        </b-card-text>

          <b-button
            v-on:click="editProduct"
            variant="outline-primary">Edit Product
          </b-button>
      </b-card>
    </div>
    <!-- <b-table striped hover :items="products.data"></b-table> -->
    <!-- <pre>{{ products }}</pre> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
   data () {
    return {
      products: [],
      loading: true,
      hasError: false
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  methods: {
    editProduct: function () {
        console.log('editProduct()');
    }
  },
  mounted () {
    this.loading = true;
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        console.log(response);
        this.products = response.data;
      })
      .catch(error => {
        console.log(error);
        this.hasError = true;
      })
      .finally(() => {
        console.log('finally');
        this.loading = false;
      })
  }
}
</script>
