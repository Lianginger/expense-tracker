const express = require('express')
const router = express.Router()
const User = require('../models/user')
const moment = require('moment')
const multer = require("multer")
const cloudinary = require("cloudinary")
const cloudinaryStorage = require("multer-storage-cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "expense-tracker-user-photo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 200, height: 200, gravity: "face", crop: "thumb" }]
})

const parser = multer({ storage: storage });

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
router.put('/edit', parser.single("image"), (req, res) => {
  User.findOne({ email: req.user.email }).then(user => {
    user.name = req.body.name
    if (req.file) { user.image = req.file.url }
    user.date = moment().format('YYYY-MM-DD')
    user.save((err) => {
      if (err) return console.error(err)
      res.redirect('/profile')
    })
  })
})

module.exports = router