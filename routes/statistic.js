const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const filterData = require('../public/data/filterData.json')
const category = filterData.category

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

      const categorySpend = {}
      const categorySpendArray = []
      let categorySpendData = ''
      let totalSpend = 0
      records.map(record => {
        if (categorySpend[record.category]) {
          categorySpend[record.category] += parseInt(record.amount)
        } else {
          categorySpend[record.category] = parseInt(record.amount)
        }
        totalSpend += parseInt(record.amount)
      })
      for (let key in categorySpend) {
        categorySpendArray.push(
          [category[key], 100 * categorySpend[key] / totalSpend])
      }
      categorySpendData = JSON.stringify(categorySpendArray)
      console.log(categorySpendData)
      res.render('statistic', { monthlySpend, categorySpendData, totalSpend })
    })

})

module.exports = router