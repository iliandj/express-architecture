const Genre = require('mongoose').model('Category')
const Movie = require('mongoose').model('Movie')

module.exports = {
  index: (req, res) => {
    Genre
      .find()
      .then(genres => {
        Movie
          .find()
          .sort({ rating: 'desc' })
          .limit(8)
          .then(movies => {
            res.render('home/index', {genres: genres, movies: movies})
          })
      })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
