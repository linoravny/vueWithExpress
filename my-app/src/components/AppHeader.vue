<template>
  <header>
    <img alt="Vue logo" src="../assets/logo.png" height="50">
    <p class="title">{{title}}</p>
  </header>
</template>

<script>
export default  {
  name: 'AppHeader',
  data () {
    return {
      title: 'Vue App With Node Express',
    }
  }
}
</script>
