<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style>
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

 body {
    overflow-x: hidden;
 }
</style>
