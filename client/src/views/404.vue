<template>
    <div class="container">
        <div class="error-head">
            <p>404</p>
        </div>
        <div class="error-body">
            <p>Sorry, this page does not exist!</p>
        </div>
        <div class="error-button">
            <a v-on:click="redirect()">Take me home!</a>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        redirect (){
            this.$router.push('/')
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
        padding: 1%;
        transform: translateY(100%);
    }
    .error-head {
        font-size: calc(6em + 0.7vw);
    }
    .error-head p{
        padding: 0;
        margin: 0;
        height: fit-content;
    }
    .error-body {
        font-size: calc(1em + 0.7vw);
    }
    .error-button a{
        background-color:#FC4C02;
        border-radius:3px;
        border:1px solid #0b0e07;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-size:20px;
        padding:9px 23px;
        text-decoration:none;
        text-shadow:0px 1px 0px #263666;
    }
    .error-button:hover{
        filter: brightness(90%);
    }
</style>