const Category = require('mongoose').model('Category')

module.exports = {
  index: (req, res) => {
    if (req.session.body === undefined || (req.headers.referer && req.headers.referer.indexOf('/users/register') < 0)) {
      req.session.body = null
      req.session.errors = null
      req.session.success = false
    }

    res.render('categories/index', { body: req.session.body, errors: req.session.errors, success: req.session.success })
  },
  add: (req, res) => {
    req.check('name', 'Category must be more that 3 characters long').isLength({ min: 4 })

    let category = req.body

    req
      .asyncValidationErrors()
      .then(() => {
        category.success = true
        Category
          .create(category)
          .then(() => {
            Category
              .find({})
              .then((categories) => {
                req.session.body = categories
                req.session.errors = null
                req.session.success = true
                res.render('categories/index', {errors: req.session.errors, success: req.session.success})
              })
          })
      })
      .catch((errors) => {
        if (errors) {
          req.session.errors = errors
          req.session.success = false
          res.redirect(req.headers.referer)
        }
      })
  },
  genre: (name) => {
    console.log(name)
    // TODO: Load all movies for this category name
  }
}
