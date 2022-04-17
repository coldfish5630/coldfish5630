const express = require('express')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

const port = process.env.PORT || 3000

const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})
