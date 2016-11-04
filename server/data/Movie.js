const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const paginate = require('mongoose-paginate')
const requiredValidationMessage = '{PATH} is required'

let movieSchema = mongoose.Schema({
  title: { type: String, required: requiredValidationMessage, trim: true },
  image: [{ path: String, alt: String, title: String }],
  year: { type: String },
  rating: { type: Number, default: 0 },
  description: { type: String, default: '' },
  cast: [{ type: String, default: [] }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: requiredValidationMessage }],
  releaseDate: { type: Date, default: Date.now }
}, {
  timestamps: true
})

movieSchema.index({ title: 1, year: 1 })
movieSchema.plugin(uniqueValidator)
movieSchema.plugin(paginate)

mongoose.model('Movie', movieSchema)
