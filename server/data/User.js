const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: requiredValidationMessage,
    unique: true
  },
  firstName: {
    type: String,
    required: requiredValidationMessage
  },
  lastName: {
    type: String,
    required: requiredValidationMessage
  },
  salt: String,
  hashedPassword: String,
  roles: [String]
})

userSchema.method({
  authenticate: (password) => {
    let inputHashedPassword = encryption.generateHashPassword(this.salt, password)
    if (inputHashedPassword === this.hashedPassword) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User
    .find({})
    .then(users => {
      if (users.length > 0) {
        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashPassword(salt, 'Admin1234')

        User.create({
          username: 'Admin',
          firstName: 'Admin',
          lastName: 'Adminov',
          salt: salt,
          hashedPassword: hashedPassword,
          roles: ['Admin']
        })
      }
    })
}
