<template>
<div class="dashboard">

  <div class="header">
    <div v-if="this.$store.state.userData.firstname" class="header-welcome">
      <p>Welcome, {{ this.$store.state.userData.firstname }}!</p>
    </div>
    <div class="header-logout">
      <a v-on:click="logout()">Log Out</a>
    </div>
  </div>


  
  <div class="load-spinner" v-if="this.$store.state.loading">
      <font-awesome-icon :icon="['fas', 'spinner']" size="10x" spin />
  </div>
  <div v-else class="content">
      <div class="map">
        <Map />
      </div>
      <div class="data">
        <div class="data-header" v-if="!this.$store.state.loading">
            <p>Your Activites</p>
        </div>
        <div class="data-body">
            <div v-for="activity in this.$store.getters.getActivites" :key="activity.id">
              <Activity :data="activity"/>
            </div>
        </div>
      </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import polyline from '@mapbox/polyline'
import Map from '@/components/Map.vue'
import Activity from '../components/Activity.vue'

export default {
  name: 'Dashboard',
  components:{
    Map,
    Activity
  },
  
  
  data(){
    return {
      stravaData: '',
    }
  },
  beforeCreate(){
    axios.get('isAuth').then(dataAuth =>{
      if(dataAuth.data.auth){
        this.$store.commit('updateUserData', dataAuth.data)

        axios.get('/data').then(activities =>{
        activities.data.forEach(element => {
          element.map.summary_polyline = polyline.decode(element.map.summary_polyline)
          element.distance = Math.round(element.distance/10) / 100
          element.moving_time = (new Date(element.moving_time * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]
          element.start_date_local = moment(element.start_date_local).format('DD/MM/YYYY | hh:mm:ss')
        })

        this.$store.commit('updateUserActivities', activities.data)
        this.$store.commit('updateLoading')
          })
      } else this.$router.push('/')
    })
  },
  methods: {
    async logout(){
      await axios.get('/logout').then(res => {
        this.$router.push(res.data)
      })
    },
    async fetchData(){
      const x = await axios.get('/data')
      this.stravaData = x.data[0].map.summary_polyline
    },
  }
}
</script>

<style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    height: 100%;
  }


  .header {
    background-color: rgb(44, 43, 43);
    height: 5%;
    width: 100%;
    position: relative;
  }
  .header-welcome {
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: bold;
    font-size: calc(0.7em + 1vw);
    transform: translate(-50%, -50%);
  }
  .header-logout {
    position: absolute;
    right: 0;
    background-color:#FC4C02;
    border-radius:3px;
    border:1px solid #0b0e07;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-size: 2.1vh;
    padding:9px 23px;
    text-decoration:none;
    text-shadow:0px 1px 0px #263666;
  }
  .header-logout:hover {
    filter: brightness(90%);
  }


  .load-spinner{
   margin-top: 20%;
  }

  .content{
    display: inherit;
    flex-direction: row;
    height: 95%;
  }
  .map{
    position: relative;
    height: 100%;
    width: 70%;
  }
  .data{
    height: 100%;
    width: 30%;
    text-align: center;
  }
  .data-header{
    height: 8%;
    width: 100%;
    background-color: #657e97;
    position: relative;
  }
  .data-header p{
    margin: 0;
    position:absolute;
    top: 50%;
    left: 50%;
    font-size: calc(0.7em + 1vw);
    font-weight: bold;
    color:#2c3e50;
    transform: translate(-50%, -50%);
  }
  .data-body{
    height: 92%;
    width: 100%;
    overflow-y:scroll
  }

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(44, 43, 43);
  border-radius: 10px;
}

  @media only screen and (max-width: 400px) {
    .content{
      display: inherit;
      flex-direction: column;
      height: 100%;
    }
    .map{
      position: relative;
      height: 50%;
      width: 100%;
    }
    .data{
      height: 50%;
      width: 100%;
      text-align: center;
    }
  }

</style>
