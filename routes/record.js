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
  newRecord.save((err) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// 編輯特定餐廳頁面
router.get('/:id/edit', (req, res) => {
  res.send('edit page')
})

// 編輯特定餐廳
router.put('/:id/edit', (req, res) => {
  res.send('edit')
})

// 刪除特定餐廳
router.delete('/:id/', (req, res) => {
  res.send('delete')
})

module.exports = router