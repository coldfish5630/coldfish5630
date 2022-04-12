const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const list = require('../../restaurant.json').results
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  list.forEach(obj => {
    Restaurant.create({
      name: obj.name,
      name_en: obj.name_en,
      category: obj.category,
      location: obj.location,
      google_map: obj.google_map,
      phone: obj.phone,
      rating: obj.rating,
      description: obj.description,
      image: obj.image
    })
  })
  console.log('done')
})
