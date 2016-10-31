const mongoose = require('mongoose')

let movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: [{
    path: String,
    alt: String,
    title: String
  }],
  year: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  cast: [{
    type: String,
    default: []
  }],
  categories: [{
    type: String,
    required: true
  }],
  releaseDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

mongoose.model('Movie', movieSchema)
