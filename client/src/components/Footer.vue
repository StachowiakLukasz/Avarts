<template>
<div class="footer">
    <div class="copyright">
        <p>Copyright © 2020 Avarts. All rights reserved</p>
    </div>
    <div class="strava-btn">
        <a href="https://www.strava.com/" target="_blank"><img src="@/assets/strava_footer.png"></a>
    </div>
    <div class="social">
        <a href="https://github.com/StachowiakLukasz" target="_blank"><font-awesome-icon :icon="['fab', 'github']" size="3x" class="icon"/></a>
        <a href="https://www.strava.com/athletes/20308579" target="_blank"><font-awesome-icon :icon="['fab', 'strava']" size="3x" class="icon"/></a>
        <a href="https://www.linkedin.com/in/%C5%82ukasz-stachowiak/" target="_blank"><font-awesome-icon :icon="['fab', 'linkedin']" size="3x" class="icon"/></a>
        <a href="https://www.facebook.com/easy4u2/" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" size="3x" class="icon"/></a>
        <a href="https://www.instagram.com/luke_skyrunner/?hl=pl" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" size="3x" class="icon"/></a>
    </div>
</div>
</template>

<script>
export default {
    name: 'Footer',
}

</script>

<style scoped>
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 7%;
        background-color: rgb(44, 43, 43);
    }
    .copyright{
        font-size: calc(0.1em + 0.9vw);
        display: flex;
        min-width: 25%;
        justify-content: flex-start;
    }
    .copyright p {
        margin-left: 4%;
    }
    .social{
        display: flex;
        min-width: 25%;
        justify-content: flex-end;
    }
    .strava-btn {
        min-width: 50%;
    }
    .strava-btn a img{
        width: 35%;
        min-width: 120px;
    }
    .strava-btn a img:hover{
        filter: brightness(90%);
    }
    .social a {
        color: inherit;
        text-decoration: inherit;
        margin-right: 4%;
    }
    .icon{
        font-size: calc(0.5em + 2vw);
    }
    .icon:hover{
        filter: brightness(90%);
    }
</style>