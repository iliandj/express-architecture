const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)

// TODO: attach /users//login?returnUrl=..... to return after login  

// TODO: To catch all routes with this logic
//   app.all('/:controller/:method/:id', (req, res) => {
//     controllers[req.params.controllers].req.params.method(req.params.id)
//   })

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
