let homeController = require('./home-controller')
let usersController = require('./users-controller')
let moviesController = require('./movie-controller')
let categoriesController = require('./categories-controllers')

module.exports = {
  home: homeController,
  users: usersController,
  movies: moviesController,
  categories: categoriesController
}
