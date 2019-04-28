const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')

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

// 設定 method-override
app.use(methodOverride('_method'))

// 處理請求與回應
// app.use('/users', require('./routes/user'))
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

app.listen(port, () => {
  console.log('Express is running')
})