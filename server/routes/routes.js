const express = require('express')
const router = express.Router()
const moment = require('moment')
const User = require('../models/User')
const axios = require('axios')
var polyline = require('@mapbox/polyline')

const momentDurationFormatSetup = require("moment-duration-format")
momentDurationFormatSetup(moment)
typeof moment.duration.fn.format === "function"
typeof moment.duration.format === "function"

router.get('/isAuth', (req, res) => {
    if(req.isAuthenticated()){
        res.json({
            "id": req.user.stravaId,
            "firstname": req.user.firstname,
            "lastname": req.user.lastname,
            "image": req.user.image,
            "auth":true
        }) 
    } else {
        res.json({
            "auth":false
        })
    }
})

router.get('/logout', (req, res) => {
    if(req.isAuthenticated()){
        req.logout()
        req.session = null
    }   
    res.send('/')
})
  
router.get('/data', async (req, res) => {
    if(req.isAuthenticated()){
    let user = await User.findById(req.session.passport.user)
    console.log(`user token before update: ${user.token}`)
    console.log( `Token expires in: ${moment.duration( moment(user.expires).diff(moment()) ).format('HH:mm:ss')}` )

    if(moment(user.expires).isBefore(moment())){
        console.log('token expired, getting new one')
        await axios.post(`https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${user.refreshToken}`).then( async resp => {
            await User.findByIdAndUpdate(req.session.passport.user, {$set: {token: resp.data.access_token, refreshToken: resp.data.refresh_token, expires: moment().add(resp.data.expires_in-60*15, 'seconds')}})
        })
        user = await User.findById(req.session.passport.user)
        console.log(`user token after update: ${user.token}`)
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    }
    const stravaData = await axios.get(`https://www.strava.com/api/v3/athlete/activities?page=1&per_page=100`, config).then (res => {
            return res.data
        })
        res.send(stravaData)
    } else {
        res.send('Unauthenticated user!')
    }
})

module.exports = router
