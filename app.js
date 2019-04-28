const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

// 設定連線到 mongoDB
// 開發時可以打開 mongoose.set("debug", true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expense_tracker', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb is connected!')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log('Express is running')
})