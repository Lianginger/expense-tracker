const express = require('express')
const router = express.Router()
const User = require('../models/user')
const moment = require('moment')

// 個人資料
router.get('/', (req, res) => {
  const date = moment(req.user.date).format('YYYY-MM-DD')
  res.render('profile', { date })
})

// 編輯個人資料頁面
router.get('/edit', (req, res) => {
  res.render('profileEdit')
})

// 編輯個人資料
router.put('/edit', (req, res) => {
  User.findOne({ email: req.user.email }).then(user => {
    user.name = req.body.name
    user.date = moment().format('YYYY-MM-DD')
    user.save((err) => {
      if (err) return console.error(err)
      res.redirect('/profile')
    })
  })
})

module.exports = router