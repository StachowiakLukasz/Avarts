<template>
<div class="container">
  <div class="logo">
    <img class="logo" src="@/assets/logo2.png">
  </div>
  <div class="button">
    <a v-on:click="login()" target="_blank"><img src="@/assets/strava_btn.png"></a>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
   async beforeCreate() {
    const data = await axios.get('isAuth')
    if (!data.data.auth) return
    else this.$router.push('/dashboard')
  },
  methods: {
    login(){
      window.location.replace(`${window.location.origin}/auth/strava`);
    }
  }
}
</script>
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgb(44, 43, 43);
    width: fit-content;
    margin: auto;
    border-radius: 5%;
    transform: translateY(40%);
  }
  .button:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
</style>