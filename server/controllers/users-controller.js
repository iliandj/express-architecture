let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },

  create: (req, res) => {
    let user = req.body

    // TODO: User must not already exist
    // TODO: Password must be more than 6 characters long
    if (user.password !== user.confirmPassword) {
      user.globalError = 'Password do not match!'
      res.render('users/register', user)
    } else {
      user.salt = encryption.generateSalt()
      user.hashedPassword = encryption.generateHashPassword(user.salt, user.password)

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
    }
  }
}
