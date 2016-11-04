const Category = require('mongoose').model('Category')

module.exports = {
  index: (req, res) => {
    if (req.session.body === undefined || (req.headers.referer && req.headers.referer.indexOf('categories/index') < 0)) {
      // req.session.body = null
      req.session.errors = null
      req.session.success = false
      req.session.selected = null
    }

    Category
      .find()
      .sort({ name: 1 })
      .then(categories => {
        req.session.body = categories
        req.session.errors = null
        req.session.success = false

        res.render('categories/index', { body: req.session.body, selected: req.session.selected, errors: req.session.errors, success: req.session.success })
      })
  },
  store: (req, res) => {
    req.check('name', 'Category must be more that 3 characters long').isLength({ min: 4 })

    let category = req.body
    let selectedCategory = req.session.selected

    req
      .asyncValidationErrors()
      .then(() => {
        Category
          .update({ name: selectedCategory }, { $set: { name: category.name } }, { upsert: true }, () => {
            Category
              .find()
              .sort({ name: 1 })
              .then(categories => {
                req.session.body = categories
                req.session.errors = null
                req.session.success = true
                req.session.selected = null
                res.redirect(req.headers.referer)
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
  update: (req, res) => {
    console.log(req.query.id)
    req.session.selected = req.query.id
    req.session.errors = null
    console.log(req.headers.referer)
    res.redirect('index')
  },
  delete: (id) => {

  },
  genre: (name) => {
    console.log(name)
    // TODO: Load all movies for this category name
  }
}
