const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  Record.find({ userId: req.user._id })
    .sort()
    .exec((err, records) => {
      if (err) return console.log(err)
      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(item => parseInt(item.amount))
          .reduce((accumulator, currentItem) => accumulator + currentItem)
      }
      res.render('index', { records, totalAmount })
    })
})

module.exports = router