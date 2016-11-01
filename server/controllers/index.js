let homeController = require('./home-controller')
let usersController = require('./users-controller')
let moviesController = require('./movie-controller')

module.exports = {
  home: homeController,
  users: usersController,
  movies: moviesController
}
