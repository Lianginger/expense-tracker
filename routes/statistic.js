const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  Record.find({ userId: req.user._id })
    .then(records => {
      const monthlySpend = []
      for (let i = 0; i < 12; i++) {
        monthlySpend[i] = records.filter(record => {
          return parseInt(record.date.slice(5, 7)) === (i + 1)
        }).reduce((total, item) => {
          return total + parseInt(item.amount)
        }, 0)
      }
      res.render('statistic', { monthlySpend })
      console.log(monthlySpend)
    })

})

module.exports = router