let Movie = require('mongoose').model('Movie')

module.exports = {
  index: (req, res) => {
    res.render('movies/index')
  },
  add: (req, res) => {
    res.render('movies/add')
  },
  insert: (req, res) => {
    let movie = req.body

     
  }
}
