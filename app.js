const express = require('express')
const app = express()

const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const indexRestaurant = restaurantList.find(
    restaurant => restaurant.id.toString() === req.params.id
  )
  res.render('show', { indexRestaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  const filterRestaurant = restaurantList.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.name_en.toLowerCase().includes(keyword) ||
      restaurant.category.includes(req.query.keyword.trim())
  )
  res.render('index', {
    restaurantList: filterRestaurant,
    keyword
  })
})

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})
