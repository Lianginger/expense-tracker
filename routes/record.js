const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 建立新資料頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 建立新資料
router.post('/new', (req, res) => {
  const newRecord = Record(req.body)
  newRecord.userId = req.user._id
  newRecord.save((err) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// 編輯特定餐廳頁面
router.get('/:id/edit', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    res.render('edit', { record })
  })
})

// 編輯特定餐廳
router.put('/:id/edit', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount

    record.save((err) => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

// 刪除特定餐廳
router.delete('/:id/', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    record.remove((err) => {
      if (err) return console.error(err)
      res.redirect('/')
    })
  })
})

module.exports = router