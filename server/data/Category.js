const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const paginate = require('mongoose-paginate')
const requiredValidationMessage = '{PATH} is required'

let CategorySchema = mongoose.Schema({
  name: { type: String, required: requiredValidationMessage, unique: true, trim: true },
  Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', default: [] }]
})

CategorySchema.plugin(uniqueValidator)
CategorySchema.plugin(paginate)

mongoose.model('Category', CategorySchema)
