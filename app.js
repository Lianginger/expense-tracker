const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const authenticated = require('./config/auth')
const helpers = require('handlebars-helpers')
const math = helpers.comparison()

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

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

// 設定 method-override
app.use(methodOverride('_method'))

// 提供靜態檔案
app.use(express.static('public'))

// 設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 使用 express session
app.use(session({
  secret: 'gingerfood secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())
// 載入 Passport config
require('./config/passport')(passport)

// 使用 connect-flash
app.use(flash())

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 處理請求與回應
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'))
app.use('/', authenticated, require('./routes/home'))
app.use('/records', authenticated, require('./routes/record'))
app.use('/profile', authenticated, require('./routes/profile'))
app.use('/statistic', authenticated, require('./routes/statistic'))

app.listen(process.env.PORT || port, () => {
  console.log('The Express server is running')
})