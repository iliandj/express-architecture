const encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')

module.exports = {
  register: (req, res) => {
    if (req.session.body === undefined || (req.headers.referer && req.headers.referer.indexOf('/users/register') < 0)) {
      req.session.body = null
      req.session.errors = null
    }

    res.render('users/register', { body: req.session.body, errors: req.session.errors, success: req.session.success })
  },
  create: (req, res) => {
    let user = req.body

    req.check('username', 'Username must be more that 3 characters long').isLength({ min: 4 })
    req.check('username', 'This username is already taken').isUsernameAvailable()
    req.check(['password', 'confirmPassword'], 'Password must be more than 6 characters long').isLength({ min: 6 })
    req.check('password', 'Passwords do not match').notEmpty().equals(user.confirmPassword)
    req.check('firstName', 'First Name is required').notEmpty()
    req.check('lastName', 'Last Name is required').notEmpty()

    req
      .asyncValidationErrors()
      .then(() => {
        req.session.success = true
        req.session.errors = null
        user.salt = encryption.generateSalt()
        user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

        User
          .create(user)
          .then(user => {
            req.logIn(user, (err, user) => {
              if (err) {
                req.session.body = user
                req.session.errors = [{ msg: 'Ooops 500' }]
                res.redirect(req.headers.referer)
                return
              }

              req.session.success = true
              req.session.errors = null
              res.redirect('/')
            })
          })
      })
      .catch((errors) => {
        if (errors) {
          req.session.body = req.body
          req.session.errors = errors
          req.session.success = false
          res.redirect(req.headers.referer)
        }
      })
  },
  login: (req, res) => {
    if (req.session.body === undefined || (req.headers.referer && req.headers.referer.indexOf('/users/login') < 0)) {
      req.session.body = null
      req.session.errors = null
    }

    req.session.success = null
    res.render('users/login', { body: req.session.body, errors: req.session.errors, success: req.session.success })
  },
  authenticate: (req, res) => {
    let inputUser = req.body

    User
      .findOne({ username: inputUser.username })
      .then(user => {
        if (!user || !user.authenticate(inputUser.password)) {
          req.session.body = user
          req.session.success = false
          req.session.errors = [{ msg: 'Invalid username or password' }]
          res.redirect(req.headers.referer)
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              req.session.body = user
              req.session.success = false
              req.session.errors = [{ msg: 'Ooops 500' }]
              res.redirect(req.headers.referer)
              return
            }

            req.session.success = true
            req.session.errors = null
            res.redirect('/')
          })
        }
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profile: (req, res) => {
    let user = res.locals.currentUser

    res.render('users/profile', {body: user})
  },
  update: (req, res) => {
    // TODO: Update current user
  }
}
