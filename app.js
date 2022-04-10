const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
require('dotenv').config()

const app = express()

const port = 3000

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
})

const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => {
      res.render('index', { restaurant })
    })
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    })
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find({
    $or: [
      { name: { $regex: `${keyword}`, $options: 'i' } },
      { name_en: { $regex: `${keyword}`, $options: 'i' } },
      { category: { $regex: `${keyword}`, $options: 'i' } }
    ]
  })
    .lean()
    .then(restaurant => {
      res.render('index', { restaurant, keyword })
    })
    .catch(error => console.error(error))
})

app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

app.post('/restaurant', (req, res) => {
  const info = req.body
  return Restaurant.create({
    name: info.name,
    name_en: info.enName,
    category: info.category,
    location: info.location,
    google_map: info.googleMap,
    phone: info.phone,
    rating: info.rating,
    description: info.description,
    image: info.image
  })
    .then(res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})
