const encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let user = req.body

    req.check('username', 'Username must be more that 3 characters long').isLength({ min: 4 })
    req.check('username', 'This username is already taken').isUsernameAvailable()
    req.check('password', 'Password must be more than 6 characters long').isLength({ min: 6 })
    req.check('password', 'Passwords do not match').notEmpty().equals(user.confirmPassword)
    req.check('firstName', 'First Name is required').notEmpty()
    req.check('lastName', 'Last Name is required').notEmpty()

    req
      .asyncValidationErrors()
      .then(() => {
        user.success = true
        user.errors = null
        user.salt = encryption.generateSalt()
        user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

        User
          .create(user)
          .then(user => {
            req.logIn(user, (err, user) => {
              if (err) {
                res.render('users/register', { globalError: 'Ooops 500' })
                return
              }

              res.redirect('/')
            })
          })
      })
      .catch((errors) => {
        if (errors) {
          user.errors = errors
          user.success = false
          res.render('users/register', user)
          user.errors = null
        }
      })
    // TODO: Password must be more than 6 characters long
    //     if (user.password !== user.confirmPassword) {
    //       user.globalError = 'Passwords do not match!'
    //       res.render('users/register', user)
    //     } else if (!user) {
    //       // TODO: To Fix
    //       user.globalError = `User "${user.username}" already exist!`
    //       res.render('users/register', user)
    //     } else {
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let inputUser = req.body

    User
      .findOne({ username: inputUser.username })
      .then(user => {
        if (!user || !user.authenticate(inputUser.password)) {
          res.render('users/login', { globalError: 'Invalid username or password' })
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/login', { globalError: 'Ooops 500' })
              return
            }

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

    res.render('users/profile', user)
  },
  update: (req, res) => {
    // TODO: Update current user
  }
}
