const express = require('express')
const passport = require('passport')
const router = express.Router()

function ensureNotLogged (req, res, next){
    if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
}

router.get('/strava',
    ensureNotLogged,
    passport.authenticate('strava',{  scope: ['activity:read'] }),
)

router.get('/strava/callback',
    ensureNotLogged,
    passport.authenticate('strava', { failureRedirect: '/' }),
    (req, res) => {res.redirect('/dashboard')}
)

module.exports = router