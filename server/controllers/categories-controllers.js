const Category = require('mongoose').model('Category')

module.exports = {
  manage: (req, res) => {
    res.render('categories/manage')
  },
  add: (req, res) => {
    req.check('name', 'Category must be more that 3 characters long').isLength({ min: 4 })

    let category = req.body

    req
      .asyncValidationErrors()
      .then(() => {
        category.success = true
        category.errors = null
        Category
          .create(category)
          .then(() => {
            Category
              .find({})
              .then((categories) => {
                res.render('categories/manage', categories)
              })
          })
      })
      .catch((errors) => {
        if (errors) {
          category.errors = errors
          category.success = false
          res.render('categories/manage', category)
          category.errors = null
        }
      })
  }
}
