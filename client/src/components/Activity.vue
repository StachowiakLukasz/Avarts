<template>
  <div class="activity" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave" v-on:click="mouseClick">

      <div class="name">
        <p>{{ this.data.name }}</p>
      </div>

    <div class="row1">
         <div class="start_date_local">
            <p>Date: {{ this.data.start_date_local }}</p>
        </div>
        <div class="type">
            <p>Type: {{ this.data.type }}</p>
        </div>
    </div>

    <div class="row2">
        <div class="distance">
            <p>Distance: {{ this.data.distance }} km</p>
        </div>
        <div class="moving_time">
            <p>Moving time: {{ this.data.moving_time }}</p>
        </div>
        <div class="total_elevation_gain">
            <p>Elevation gain: {{ this.data.total_elevation_gain }} m</p>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: "Activity",
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        mouseOver(){
            this.$store.commit({
                type: 'updateHover',
                id: this.data.id,
                isHovering: true,
                center: this.data.start_latlng
            })
        },
        mouseLeave(){
            this.$store.commit({
                type: 'updateHover',
                id: null,
                isHovering: false
            })
        },
        mouseClick(){
            this.$store.commit({
                type: 'updateClick',
                id: this.data.id,
                isClicked: true,
                center: this.data.start_latlng
            })
        }
    }
}
</script>

<style scoped>

.activity{
    box-sizing: border-box;
    border: 1px solid rgb(44, 43, 43);
    width: 100%;
    height: 100px;
    margin:0;
    background-color: #2c3e50;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.activity p {
    margin: 0;
    padding: 0;
}
.activity:hover{
    filter: brightness(110%);
}
.activity * {
     pointer-events: none;
}




.name{
    width: 100%;
    font-weight: bold;
    color: #fd5811;
}

.row1 {
    display: flex;
    justify-content: space-evenly;
}
.row2{
    display: flex;
    justify-content: space-evenly;
}


.distance{

}
.moving_time{

}
.type{

}
.total_elevation_gain{

}
.start_date_local{

}

</style>