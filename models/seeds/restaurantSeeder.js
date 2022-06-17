if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')
const list = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USER = [
  { email: 'user1@example.com', password: '12345678', restaurantId: [1, 2, 3] },
  { email: 'user2@example.com', password: '12345678', restaurantId: [4, 5, 6] }
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map(seedUser => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({ email: seedUser.email, password: hash }))
        .then(user => {
          const userId = user._id
          return Promise.all(
            list.map(data => {
              if (seedUser.restaurantId.includes(data.id)) {
                data.userId = userId
                return Restaurant.create(data)
              }
            })
          )
        })
        .then(() => {
          console.log('done')
          process.exit()
        })
    })
  )
})
