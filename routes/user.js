const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const moment = require('moment')

// 登入頁面
router.get('/login', (req, res) => {
  let errors = []
  let errMessageArray = req.flash('error')
  if (errMessageArray.length > 0) {
    errors.push({ message: errMessageArray[0] })
  }
  res.render('login', { errors })
})

// 登入檢查
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',            // 登入成功會回到根目錄
    failureRedirect: '/users/login', // 失敗會留在原本頁面
    failureFlash: true,
  })
)

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  // 加入錯誤訊息提示
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', { errors, name, email, password, password2 })
      } else {
        const newUser = new User(req.body)
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err
            // Store hash in your password DB.
            newUser.password = hash
            newUser.save()
              .then(user => { res.redirect('/') })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('users/login')
})

// 個人資料
router.get('/profile', (req, res) => {
  const date = moment(req.user.date).format('YYYY-MM-DD')
  res.render('profile', { date })
})

// 編輯個人資料頁面
router.get('/profile/edit', (req, res) => {
  res.render('profileEdit')
})

// 編輯個人資料
router.put('/profile/edit', (req, res) => {
  User.findOne({ email: req.user.email }).then(user => {
    user.name = req.body.name
    user.date = moment().format('YYYY-MM-DD')
    user.save((err) => {
      if (err) return console.error(err)
      res.redirect('/users/profile')
    })
  })
})

module.exports = router