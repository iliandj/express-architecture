const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', auth.isAuthenticated, controllers.users.logout)
  app.get('/users/profile', auth.isAuthenticated, controllers.users.profile)
  app.post('/users/update', auth.isAuthenticated, controllers.users.update)
  app.get('/movies/index', auth.isAuthenticated, controllers.movies.index)
  app.get('/movies/add', auth.isAuthenticated, controllers.movies.add)
  app.post('/movies/insert', auth.isAuthenticated, controllers.movies.insert)
  app.get('/categories/index', auth.isAuthenticated, controllers.categories.index)
  app.post('/categories/add', auth.isAuthenticated, controllers.categories.add)
  app.get('/categories/:name', (req, res) => {
    controllers.categories.genre(req.params.name)
  })

// TODO: attach /users/login?returnUrl=..... to return after login

// TODO: To catch all routes with this logic
//   app.all('/:controller/:method/:id', (req, res) => {
//     controllers[req.params.controllers].req.params.method(req.params.id)
//   })

  app.all('*', (req, res) => {
    res.status(404)
    res.render('shared/404')
    res.end()
  })
}
