const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const history = require('connect-history-api-fallback')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development') {
  //app.use(morgan('dev'))
}

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    unset: 'destroy',
    cookie: {
      maxAge: 31556952000 //1year
    }
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})
app.use('/auth', require('./routes/auth'))
app.use(history())
app.use('/', require('./routes/routes'))

app.use(express.static(path.join(__dirname, 'public')))
//app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`PORT: ${PORT}`))
