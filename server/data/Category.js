const mongoose = require('mongoose')

let CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Movies: [{
    type: String,
    default: []
  }]
})

mongoose.model('Category', CategorySchema)
