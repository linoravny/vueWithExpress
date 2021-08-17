<template>
  <div class='product'>
    <h1>This is a product page</h1>
    <button v-on:click="editProduct">Edit Product</button>
    <div>{{ info }}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
   data () {
    return {
      info: null,
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
        this.info = response;
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
