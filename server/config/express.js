const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (config, app) => {
  app.set('view engine', 'pug')
  app.set('views', path.join(config.rootPath, 'server/views'))

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))

  let sessionOptions = {
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
  }

  if (app.get('env' !== 'development')) {
    app.set('trust proxy', 1)
    sessionOptions.cookie.secure = true
    sessionOptions.cookie.httpOnly = true
  }

  // TODO: Use MongoDB Session Store instead memory store
  app.use(session(sessionOptions))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })

  app.use(express.static(path.join(config.rootPath + 'public')))
}
