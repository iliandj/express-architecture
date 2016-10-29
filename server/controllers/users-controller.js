let encryption = require('../utilities/encryption')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },

  create: (req, res) => {
    let user = req.body

    // TODO: User must not already exist
    // TODO: Password must be more than 6 characters long
    if (user.password !== user.confirmPassword) {
      res.render('users/register', { globalError: 'Password do not match!' })
    } else {
      user.salt = encryption.generateSalt()
      user.hashedPassword = encryption.generateHashPassword(user.salt, user.password)
      res.send('BACHKA')
    }
  }
}
