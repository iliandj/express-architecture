const crypto = require('crypto')

module.exports = {
  generateSalt: () =>
    crypto.randomBytes(128).toString('base64'),
  generateHashPassword: (salt, pwd) =>
    crypto.createHmac('sha256', salt).update(pwd).digest('hex')
}
