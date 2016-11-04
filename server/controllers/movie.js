const Movie = require('mongoose').model('Movie')
const Category = require('mongoose').model('Category')

module.exports = {
  index: (req, res) => {
    if (req.session.body === undefined || (req.headers.referer && req.headers.referer.indexOf('/movies/index') < 0)) {
      req.session.body = null
      req.session.errors = null
    }

    res.render('movies/index', { body: req.session.body, errors: req.session.errors })
  },
  create: (req, res) => {
    Category
      .find()
      .select('_id name')
      .then(category => {
        req.session.body = category
        res.redirect(req.headers.referer)
      })

    res.render('movies/create')
  },
  store: (req, res) => {

    // let movie = req.body
  }
}
