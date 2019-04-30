const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const filterData = require('../public/data/filterData.json')
const monthArray = filterData.month
const category = filterData.category

router.get('/', (req, res) => {
  const filterMonth = req.query.filterMonth || ''
  const filterMonthRegExp = new RegExp('2019-' + filterMonth, 'i')
  const filterCategory = req.query.filterCategory || ''
  const filterCategoryRegExp = new RegExp(filterCategory, 'i')
  const categoryChineseName = category[filterCategory]

  Record.find({
    userId: req.user._id,
    date: { $regex: filterMonthRegExp },
    category: { $regex: filterCategoryRegExp }
  })
    .sort()
    .exec((err, records) => {
      if (err) return console.log(err)
      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(item => parseInt(item.amount))
          .reduce((accumulator, currentItem) => accumulator + currentItem)
      }
      res.render('index', { records, totalAmount, filterMonth, filterCategory, categoryChineseName, monthArray })
    })
})

module.exports = router