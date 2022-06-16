const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('edit')
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userId = req.user._id
  return Restaurant.find({
    $and: [
      { userId },
      {
        $or: [
          { name: { $regex: `${keyword}`, $options: 'i' } },
          { name_en: { $regex: `${keyword}`, $options: 'i' } },
          { category: { $regex: `${keyword}`, $options: 'i' } }
        ]
      }
    ]
  })
    .lean()
    .then(restaurant => {
      res.render('index', { restaurant, keyword })
    })
    .catch(error => console.error(error))
})

router.get('/sort:type', (req, res) => {
  const sortType = req.params.type.split(':')
  const sort = sortType[1] === 'asc' ? sortType[0] : '-' + sortType[0]
  const selected = req.query.type
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort(sort)
    .then(restaurant => {
      res.render('index', { restaurant, selected })
    })
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('show', { restaurant })
    })
    .catch(error => console.error(error))
})

router.post('/', (req, res) => {
  const body = req.body
  body.userId = req.user._id
  return Restaurant.create(body)
    .then(res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
