<template>
<div>
    <l-map :zoom="12" :center="this.$store.getters.getCenter" class="map">

        <l-control-layers position="topright"  ></l-control-layers>
        <l-tile-layer v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"/>

        <l-control position="bottomleft" >
            <button class="showAll" v-on:click="showAll">Show All</button>
        </l-control>

        <div v-if="this.$store.state.mouseHoverActivity.isHovering == true">
          <l-polyline :lat-lngs="this.$store.getters.getHoverActivity" :color=" '#FC4C02' "/>
        </div>

        <div v-else-if="this.$store.state.mouseClickActivity.isClicked == true">
            <l-polyline :lat-lngs="this.$store.getters.getClickActivity" :color=" '#FC4C02' " />
        </div>

        <div v-else>
          <div v-for="item in this.$store.getters.getAllPolylines" :key="item[0]">
            <l-polyline :lat-lngs="item[0]" :color="getRandomColor()" v-on:click="showSelected(item)"/>
          </div>
        </div>

    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet"
import { LMap, LTileLayer, LPolyline, LControlLayers, LControl } from "vue2-leaflet"
import axios from 'axios'

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LControlLayers,
    LControl
  },
  data() {
    return {
      tileProviders: [
        {
          name: 'Dark',
          visible: true,
          attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> | &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
          url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        },
        {
          name: 'Topo',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
      ],
    }
  },
  methods: {
    getRandomColor() {
      const letters = '456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 12)]
      return color
    },
    showAll(){
      this.$store.commit({
        type: 'updateClick',
        id: null,
        isClicked: false,
        center: this.$store.state.userActivities[0].start_latlng
      })
    },
    showSelected(item){
      this.$store.commit({
        type: 'updateClick',
        id: item[1],
        isClicked: true,
        center: item[2]
      })
    }
  }
}
</script>

 <style scoped>
 .map{
    height: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
 }
 .showAll{
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
 .showAll:hover{
   filter: brightness(90%);
 }
 </style>