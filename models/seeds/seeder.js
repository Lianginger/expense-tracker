const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const recordSeeder = require('./recordData.json')
const recordArray = recordSeeder.results
const userSeeder = require('./userData.json')
const userArray = userSeeder.results

// 設定連線到 mongoDB
mongoose.set("debug", true) // 開發時可以打開 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expense_tracker', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb is connected!')
})

userArray.map(user => {
  const seederUser = user
  User.findOne({ email: user.email }).then(user => {
    if (user) {
      console.log('Seeder data already exists.')
    } else {
      const newUser = new User(seederUser)
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          // Store hash in your password DB.
          if (err) throw err
          newUser.password = hash
          newUser.save().then(user => {
            recordArray.map(record => {
              const newRecord = new Record(record)
              newRecord.userId = user._id
              newRecord.save()
            })
          }).catch(err => console.log(err))
        })
      })
      console.log('Creating seeder data is finished!')
    }
  })
})