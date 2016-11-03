let homeController = require('./home')
let usersController = require('./users')
let moviesController = require('./movie')
let categoriesController = require('./categories')

module.exports = {
  home: homeController,
  users: usersController,
  movies: moviesController,
  categories: categoriesController
}
