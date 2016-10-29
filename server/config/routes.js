let controllers = require('../controllers')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)

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
