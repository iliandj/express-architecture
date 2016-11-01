let Movie = require('mongoose').model('Movie')

module.exports = {
  manage: (req, res) => {
    res.render('movies/manage')
  },
  add: (req, res) => {
    res.render('movies/add')
  },
  insert: (req, res) => {
    let movie = req.body

     
  }
}
