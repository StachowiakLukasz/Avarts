<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components:{
    Footer
  },
}
</script>

<style>
html, body {
  margin: 0px !important;
  padding: 0px !important;
  background-color: #2c3e50;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #657e97;
  height: 100%;
}

#content {
  height: 93%;
}



</style>
